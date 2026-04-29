import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const artifactDir = path.join(projectRoot, ".local", "real-estate-tycoon-smoke");
const chromeUserDataDir = path.join(projectRoot, ".local", "real-estate-tycoon-chrome");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const serverPort = 4314;
const debugPort = 9225;
const baseUrl = `http://127.0.0.1:${serverPort}`;

let serverProcess = null;
let chromeProcess = null;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForHttp(url, { timeoutMs = 15000 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok || response.status < 500) return;
    } catch {}
    await sleep(150);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function spawnProcess(command, args) {
  const child = spawn(command, args, {
    cwd: projectRoot,
    stdio: ["ignore", "pipe", "pipe"]
  });
  child.stderr?.on("data", (chunk) => process.stderr.write(String(chunk)));
  child.stdout?.on("data", () => {});
  return child;
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.nextId = 1;
    this.pending = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timed out connecting to ${this.wsUrl}`)), 10000);
      this.ws.addEventListener("open", () => {
        clearTimeout(timer);
        resolve();
      }, { once: true });
      this.ws.addEventListener("error", (event) => {
        clearTimeout(timer);
        reject(event.error || new Error(`Failed to connect to ${this.wsUrl}`));
      }, { once: true });
    });
    this.ws.addEventListener("message", (event) => {
      const payload = JSON.parse(String(event.data));
      const pending = this.pending.get(payload.id);
      if (!pending) return;
      this.pending.delete(payload.id);
      if (payload.error) {
        pending.reject(new Error(payload.error.message || `CDP error in ${pending.method}`));
        return;
      }
      pending.resolve(payload.result || {});
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, method });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async close() {
    this.ws?.close();
    await sleep(100);
  }
}

async function openPageTarget(url) {
  const response = await fetch(`http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  assert(response.ok, `Failed to create Chrome target for ${url}`);
  return response.json();
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  return result.result?.value;
}

async function waitForCondition(client, conditionExpression, { timeoutMs = 10000, label = conditionExpression } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await evaluate(client, `(() => Boolean(${conditionExpression}))()`)) return;
    await sleep(120);
  }
  throw new Error(`Timed out waiting for condition: ${label}`);
}

async function setViewport(client, { width, height, mobile }) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 2,
    mobile,
    scale: 1,
    screenWidth: width,
    screenHeight: height
  });
  await client.send("Emulation.setTouchEmulationEnabled", {
    enabled: mobile,
    ...(mobile ? { maxTouchPoints: 1 } : {})
  });
}

async function navigate(client, url, readySelector) {
  await client.send("Page.navigate", { url });
  await waitForCondition(
    client,
    `document.readyState === "complete" && Boolean(document.querySelector(${JSON.stringify(readySelector)}))`,
    { timeoutMs: 15000, label: `page ready for ${url}` }
  );
}

async function clickSelector(client, selector) {
  const clicked = await evaluate(client, `(() => {
    const element = document.querySelector(${JSON.stringify(selector)});
    if (!element) return false;
    element.click();
    return true;
  })()`);
  assert(clicked, `Missing selector: ${selector}`);
}

async function captureScreenshot(client, filename) {
  const { data } = await client.send("Page.captureScreenshot", { format: "png", fromSurface: true });
  await writeFile(path.join(artifactDir, filename), Buffer.from(data, "base64"));
}

async function setupGame(client, { width, height, mobile }) {
  await setViewport(client, { width, height, mobile });
  await navigate(client, `${baseUrl}/simulators/real-estate-tycoon/`, "#startBtn");
  await clickSelector(client, "#startBtn");
  await waitForCondition(client, `Boolean(document.querySelector(".land-market-map .lot-node"))`, {
    timeoutMs: 10000,
    label: "land map opens by default"
  });
}

async function runAuctionRoundTripCheck(client) {
  await setupGame(client, { width: 430, height: 720, mobile: true });
  const initial = await evaluate(client, `(() => ({
    hasIdleCopy: document.body.textContent.includes("先选一个经营入口"),
    lots: document.querySelectorAll(".land-market-map .lot-node.auction").length,
    mapHeight: Math.round(document.querySelector(".land-market-map")?.getBoundingClientRect().height || 0),
    statusBottom: Math.round(document.querySelector(".status-panel")?.getBoundingClientRect().bottom || 0)
  }))()`);
  assert(!initial.hasIdleCopy, "Office screen should not show the old idle copy");
  assert(initial.lots >= 6, "Land map should be the default office screen with at least six lots");
  assert(initial.mapHeight <= 380, "Mobile land map should stay compact");

  await clickSelector(client, ".land-market-map .lot-node.auction");
  await waitForCondition(client, `Boolean(document.querySelector('[data-auction-control="start"]'))`, {
    timeoutMs: 4000,
    label: "prep controls appear after selecting a lot"
  });
  const prep = await evaluate(client, `(() => ({
    buttons: [...document.querySelectorAll(".auction-prep-controls button")].map((button) => button.textContent.trim()),
    soldStripVisible: Boolean(document.querySelector(".sold-lot-strip") && getComputedStyle(document.querySelector(".sold-lot-strip")).display !== "none"),
    panelBottom: Math.round(document.querySelector(".auction-prep-panel")?.getBoundingClientRect().bottom || 0),
    mapVisible: Boolean(document.querySelector(".land-market-map")),
    mapHeight: Math.round(document.querySelector(".land-market-map")?.getBoundingClientRect().height || 0),
    toggleText: document.querySelector("[data-auction-control='toggle-map']")?.textContent.trim() || ""
  }))()`);
  assert(JSON.stringify(prep.buttons) === JSON.stringify(["圈内沟通", "联合竞标", "进入拍卖"]), "Prep controls should show exactly three compact buttons");
  assert(!prep.soldStripVisible, "Mobile land desk should hide recent sales strip");
  assert(prep.mapVisible && prep.mapHeight <= 220 && prep.toggleText === "展开地图", "Selected lot prep should keep a compact expandable map preview");
  await captureScreenshot(client, "mobile-land-prep.png");

  await clickSelector(client, "[data-auction-control='toggle-map']");
  await sleep(150);
  const expandedMap = await evaluate(client, `(() => ({
    mapHeight: Math.round(document.querySelector(".land-market-map")?.getBoundingClientRect().height || 0),
    toggleText: document.querySelector("[data-auction-control='toggle-map']")?.textContent.trim() || ""
  }))()`);
  assert(expandedMap.mapHeight > prep.mapHeight && expandedMap.toggleText === "缩小地图", "Map toggle should expand the selected-lot preview");
  await clickSelector(client, "[data-auction-control='toggle-map']");
  await sleep(150);

  await clickSelector(client, '[data-auction-control="chat"]');
  await waitForCondition(client, `Boolean(document.querySelector(".auction-chat-shell"))`, {
    timeoutMs: 4000,
    label: "two-level chat shell appears"
  });
  const chat = await evaluate(client, `(() => ({
    groups: [...document.querySelectorAll("[data-auction-chat-group]")].map((button) => button.textContent.trim()),
    contacts: [...document.querySelectorAll("[data-auction-chat-contact]")].map((button) => button.textContent.trim()),
    hasIntimacy: document.querySelector(".auction-chat-shell")?.textContent.includes("亲密") || false,
    mapVisible: Boolean(document.querySelector(".land-market-map")),
    mapHeight: Math.round(document.querySelector(".land-market-map")?.getBoundingClientRect().height || 0),
    visibleOptions: Math.floor((document.querySelector(".auction-chat-actions")?.getBoundingClientRect().height || 0) / Math.max(1, document.querySelector(".auction-option-card")?.getBoundingClientRect().height || 1))
  }))()`);
  assert(chat.groups.length === 3 && chat.hasIntimacy && chat.contacts.length >= 2, "Chat should have groups, contacts, and intimacy");
  assert(chat.mapVisible && chat.mapHeight <= 220, "Chat should keep a compact land map preview");
  assert(chat.visibleOptions >= 2, "Chat action window should expose multiple options before internal scrolling");
  const chatCopyBefore = await evaluate(client, `(() => ({
    optionText: document.querySelector(".auction-chat-actions [data-auction-chat]:not([disabled])")?.textContent || "",
    contactText: document.querySelector("[data-auction-chat-contact].active")?.textContent || ""
  }))()`);
  assert(chatCopyBefore.optionText.includes("套话") || chatCopyBefore.optionText.includes("半句"), "Low-intimacy chat options should not promise specific intel");
  await clickSelector(client, ".auction-chat-actions [data-auction-chat]:not([disabled])");
  await waitForCondition(client, `Boolean(document.querySelector(".auction-intel-strip"))`, {
    timeoutMs: 4000,
    label: "chat intel appears after low-intimacy talk"
  });
  const lowIntimacyIntel = await evaluate(client, `(() => document.querySelector(".auction-intel-strip")?.textContent || "")()`);
  assert(
    !/(建议上限|拍穿|预计可谈额度|抵押折扣|真正盯|现金、工程份额|下一块地互让)/.test(lowIntimacyIntel),
    `Low-intimacy chat leaked concrete intel: ${lowIntimacyIntel}`
  );
  await captureScreenshot(client, "mobile-land-chat.png");

  await clickSelector(client, '[data-auction-control="joint"]');
  await waitForCondition(client, `Boolean(document.querySelector("[data-auction-partner-contact]"))`, {
    timeoutMs: 4000,
    label: "joint partner focus shell appears"
  });
  const joint = await evaluate(client, `(() => ({
    groups: [...document.querySelectorAll("[data-auction-partner-group]")].map((button) => button.textContent.trim()),
    contacts: [...document.querySelectorAll("[data-auction-partner-contact]")].map((button) => button.textContent.trim()),
    options: [...document.querySelectorAll("[data-auction-partner-variant]")].map((button) => button.textContent.trim()),
    mapVisible: Boolean(document.querySelector(".land-market-map")),
    mapHeight: Math.round(document.querySelector(".land-market-map")?.getBoundingClientRect().height || 0)
  }))()`);
  assert(joint.groups.length === 3 && joint.contacts.length >= 1 && joint.options.length >= 2, "Joint bidding should use the focus shell with contacts and proposal options");
  assert(joint.mapVisible && joint.mapHeight <= 220, "Joint bidding should keep a compact land map preview");

  await clickSelector(client, '[data-auction-control="start"]');
  await waitForCondition(client, `Boolean(document.querySelector('[data-auction-control="raise-small"]'))`, {
    timeoutMs: 4000,
    label: "live auction controls appear"
  });
  const liveStart = await evaluate(client, `(() => ({
    mapVisible: Boolean(document.querySelector(".land-market-map")),
    mapHeight: Math.round(document.querySelector(".land-market-map")?.getBoundingClientRect().height || 0),
    toggleText: document.querySelector("[data-auction-control='toggle-map']")?.textContent.trim() || ""
  }))()`);
  assert(liveStart.mapVisible && liveStart.mapHeight <= 220 && liveStart.toggleText === "展开地图", "Live auction should keep the selected lot map collapsed by default");
  await clickSelector(client, '[data-auction-control="raise-small"]');
  await sleep(200);
  const afterFirstBid = await evaluate(client, `(() => ({
    isResult: Boolean(document.querySelector(".auction-result-panel")),
    hasRaise: Boolean(document.querySelector('[data-auction-control="raise-small"]')),
    text: document.querySelector(".auction-live-panel, .auction-result-panel")?.textContent || ""
  }))()`);
  assert(!afterFirstBid.isResult || afterFirstBid.text.includes("拿地成功"), "First bid should not immediately lose the auction");
  assert(afterFirstBid.hasRaise || afterFirstBid.text.includes("拿地成功"), "After a rival leads, player should still be able to raise or have won");

  await captureScreenshot(client, "mobile-land-auction.png");
}

async function cleanup() {
  await sleep(150);
  chromeProcess?.kill("SIGTERM");
  serverProcess?.kill("SIGTERM");
}

async function main() {
  assert(existsSync(chromePath), `Google Chrome not found at ${chromePath}`);
  await mkdir(artifactDir, { recursive: true });
  await rm(chromeUserDataDir, { recursive: true, force: true });

  serverProcess = spawnProcess("python3", ["-m", "http.server", String(serverPort), "-d", "dist"]);
  await waitForHttp(`${baseUrl}/index.html`);

  chromeProcess = spawnProcess(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${chromeUserDataDir}`,
    "about:blank"
  ]);
  await waitForHttp(`http://127.0.0.1:${debugPort}/json/version`);

  const pageTarget = await openPageTarget("about:blank");
  const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await client.connect();
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("DOM.enable");

  await runAuctionRoundTripCheck(client);
  await client.close();
  console.log("Real estate tycoon smoke passed.");
  console.log(`Artifacts: ${artifactDir}`);
}

try {
  await main();
} finally {
  await cleanup();
}
