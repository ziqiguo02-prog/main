const DEFAULT_ESCAPE = (value) => String(value ?? "");

function blockRects(items, className = "city-block") {
  return items.map(([x, y, w, h, r = 3]) => (
    `<rect class="${className}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" />`
  )).join("");
}

const CORE_BLOCKS = [
  [408, 198, 58, 40], [474, 198, 48, 40], [530, 198, 56, 40],
  [392, 248, 66, 46], [466, 248, 54, 46], [528, 248, 70, 46],
  [414, 304, 52, 42], [474, 304, 56, 42], [538, 304, 54, 42]
];

const NEW_TOWN_BLOCKS = [
  [98, 92, 88, 56], [198, 92, 78, 56], [288, 92, 72, 56],
  [112, 164, 76, 48], [202, 164, 86, 48], [302, 164, 64, 48],
  [92, 228, 96, 54], [204, 228, 74, 54], [292, 228, 86, 54]
];

const EAST_BLOCKS = [
  [658, 158, 88, 58], [762, 158, 94, 58], [868, 158, 72, 58],
  [644, 236, 78, 52], [738, 236, 92, 52], [846, 236, 96, 52],
  [664, 306, 74, 48], [754, 306, 86, 48], [856, 306, 74, 48]
];

const SOUTH_BLOCKS = [
  [330, 452, 86, 54], [430, 452, 84, 54], [530, 452, 92, 54],
  [352, 524, 76, 46], [444, 524, 96, 46], [556, 524, 80, 46]
];

const INDUSTRIAL_SHEDS = [
  [674, 420, 92, 56, 2], [784, 420, 96, 56, 2], [892, 420, 58, 56, 2],
  [690, 492, 80, 50, 2], [786, 492, 110, 50, 2], [910, 492, 48, 50, 2]
];

const FARM_FIELDS = [
  [48, 408, 92, 62, 0], [152, 408, 82, 62, 0], [248, 408, 90, 62, 0],
  [64, 486, 96, 58, 0], [174, 486, 84, 58, 0], [272, 486, 70, 58, 0]
];

function districtClass(planning, key) {
  const stage = planning?.districts?.[key]?.stage;
  return stage ? `stage-${stage}` : "";
}

function districtLabel(planning, key, fallback) {
  return planning?.districts?.[key]?.label || fallback;
}

function planningBadges(planning, escapeHtml) {
  const badges = planning?.badges || [];
  return badges.map((badge) => `
    <g class="planning-badge ${escapeHtml(badge.tone || "info")}" transform="translate(${badge.x} ${badge.y})">
      <rect width="${badge.width || 116}" height="28" rx="14" />
      <text x="12" y="19">${escapeHtml(badge.text)}</text>
    </g>
  `).join("");
}

export function renderCityPlanBase({ centerLabel = "县城中心", escapeHtml = DEFAULT_ESCAPE, planning = {} } = {}) {
  const safeCenter = escapeHtml(centerLabel);
  const phaseClass = planning.phaseClass || "phase-opening";
  return `
    <svg class="city-map-svg ${escapeHtml(phaseClass)}" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="cityWater" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#cfe1dc" stop-opacity="0.58" />
          <stop offset="0.5" stop-color="#a9c8c0" stop-opacity="0.72" />
          <stop offset="1" stop-color="#dbe8e3" stop-opacity="0.52" />
        </linearGradient>
        <linearGradient id="cityPaper" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#fffdf8" />
          <stop offset="1" stop-color="#f7f1e7" />
        </linearGradient>
        <pattern id="farmPattern" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
          <path d="M0 8H28M0 20H28" stroke="#8fa46d" stroke-width="2" opacity="0.28" />
        </pattern>
        <pattern id="industrialPattern" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V22" stroke="#7d858f" stroke-width="3" opacity="0.24" />
        </pattern>
      </defs>

      <rect class="city-plan-bg" width="1000" height="620" />
      <g class="city-grid">
        ${Array.from({ length: 12 }, (_, index) => `<path d="M${80 + index * 76} 0V620" />`).join("")}
        ${Array.from({ length: 7 }, (_, index) => `<path d="M0 ${76 + index * 78}H1000" />`).join("")}
      </g>

      <path class="city-district district-new ${districtClass(planning, "new")}" d="M84 64H372V286H86Z" />
      <path class="city-district district-core ${districtClass(planning, "core")}" d="M384 154H624V360H386Z" />
      <path class="city-district district-east ${districtClass(planning, "east")}" d="M624 112H958V374H628Z" />
      <path class="city-district district-riverbend ${districtClass(planning, "riverbend")}" d="M66 354H386V564H72Z" />
      <path class="city-district district-south ${districtClass(planning, "south")}" d="M314 430H642V590H318Z" />
      <path class="city-district district-industrial ${districtClass(planning, "industrial")}" d="M652 390H968V576H656Z" />
      <path class="city-district district-agri ${districtClass(planning, "agri")}" d="M34 386H352V586H38Z" />

      <path class="city-river river-shadow" d="M-42 400C134 366 238 374 362 350C488 326 598 316 724 322C838 328 918 302 1042 286" />
      <path class="city-river" d="M-42 390C134 356 238 364 362 340C488 316 598 306 724 312C838 318 918 292 1042 276" />

      <ellipse class="city-lake" cx="644" cy="106" rx="74" ry="42" />
      <path class="city-rail" d="M108 486C260 472 368 468 512 486C654 504 780 500 946 468" />
      <path class="city-road road-casing" d="M78 238C216 258 338 278 476 292C642 308 770 318 946 356" />
      <path class="city-road road-main" d="M78 238C216 258 338 278 476 292C642 308 770 318 946 356" />
      <path class="city-road road-casing" d="M502 40C494 180 486 286 476 402C468 486 458 544 452 600" />
      <path class="city-road road-main" d="M502 40C494 180 486 286 476 402C468 486 458 544 452 600" />
      <path class="city-road road-ring" d="M360 298C384 206 462 162 556 180C648 198 708 276 686 356C660 454 546 486 444 444C382 418 344 364 360 298Z" />
      <path class="city-road road-secondary" d="M184 142H356M116 214H360M656 214H946M636 296H948M680 432H960M324 524H626" />
      <path class="city-road road-secondary" d="M164 76V292M272 72V294M720 128V368M846 118V374M552 164V352M408 438V588M552 432V586" />

      <g class="city-blocks core">${blockRects(CORE_BLOCKS)}</g>
      <g class="city-blocks new-town">${blockRects(NEW_TOWN_BLOCKS)}</g>
      <g class="city-blocks east-town">${blockRects(EAST_BLOCKS)}</g>
      <g class="city-blocks south-town">${blockRects(SOUTH_BLOCKS)}</g>
      <g class="city-blocks industrial">${blockRects(INDUSTRIAL_SHEDS, "city-block shed")}</g>
      <g class="city-blocks farm">${blockRects(FARM_FIELDS, "city-block field")}</g>

      <path class="planning-boundary core-boundary" d="M390 164H616V356H390Z" />
      <path class="planning-boundary expansion-boundary" d="M628 118H956V372H628Z" />
      <g class="planning-badges">${planningBadges(planning, escapeHtml)}</g>

      <g class="city-labels">
        <text class="city-label city-label-center" x="506" y="282">${safeCenter}</text>
        <text class="city-label" x="462" y="208">老城</text>
        <text class="city-label" x="164" y="142">${escapeHtml(districtLabel(planning, "new", "新区"))}</text>
        <text class="city-label" x="816" y="188">${escapeHtml(districtLabel(planning, "east", "东郊"))}</text>
        <text class="city-label" x="462" y="538">南站</text>
        <text class="city-label" x="186" y="456">河湾</text>
        <text class="city-label" x="846" y="540">临港</text>
        <text class="city-label" x="758" y="462">${escapeHtml(districtLabel(planning, "industrial", "工业区"))}</text>
        <text class="city-label" x="130" y="526">${escapeHtml(districtLabel(planning, "agri", "农业区"))}</text>
      </g>
    </svg>
  `;
}
