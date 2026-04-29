const AUCTION_COMPETITOR_ARCHETYPES = [
  { id: "shi-rock", name: "石万山", org: "万岭系", tier: [0, 5], personality: "长期主义、爱核心地块", style: "像老派职业经理人，算品牌和长期现金流", bidStyle: "核心", cash: [54, 150], aggression: 0.56, patience: 0.82, relation: 0.58, growth: 1.05 },
  { id: "li-harbor", name: "李长和", org: "长和港资", tier: [2, 5], personality: "耐心极强、只买安全边际", style: "像港资财团，慢、准、重折扣", bidStyle: "低吸", cash: [96, 260], aggression: 0.34, patience: 0.95, relation: 0.72, growth: 1.02 },
  { id: "pan-glass", name: "潘东阳", org: "SO城系", tier: [1, 5], personality: "爱城市核心和商业叙事", style: "喜欢地标、写字楼和媒体关注", bidStyle: "地标", cash: [58, 176], aggression: 0.58, patience: 0.62, relation: 0.48, growth: 1 },
  { id: "xu-speed", name: "许恒远", org: "恒远高周转", tier: [1, 5], personality: "激进、敢加杠杆", style: "先抢地，再靠预售和融资滚盘", bidStyle: "硬顶", cash: [70, 220], aggression: 0.9, patience: 0.34, relation: 0.42, growth: 1.18 },
  { id: "yang-garden", name: "杨碧森", org: "碧林园", tier: [1, 5], personality: "下沉市场、规模优先", style: "喜欢新区和郊区大盘，算周转速度", bidStyle: "快抢", cash: [62, 190], aggression: 0.76, patience: 0.5, relation: 0.46, growth: 1.12 },
  { id: "sun-merge", name: "孙宏城", org: "融城并购", tier: [2, 5], personality: "胆大、擅长并购救火", style: "喜欢别人扛不住时接盘，也敢在牌桌上压价", bidStyle: "并购", cash: [68, 210], aggression: 0.72, patience: 0.58, relation: 0.5, growth: 1.08 },
  { id: "wang-local", name: "王振北", org: "本地熟人盘", tier: [0, 2], personality: "关系深、资金不厚", style: "卡保证金，爱找关系压价", bidStyle: "压价", cash: [24, 68], aggression: 0.46, patience: 0.72, relation: 0.76, growth: 0.96 },
  { id: "chen-builder", name: "陈土生", org: "工程老板", tier: [0, 2], personality: "懂工地、怕高地价", style: "会算施工利润，不愿为面子追价", bidStyle: "算账", cash: [28, 82], aggression: 0.34, patience: 0.62, relation: 0.52, growth: 0.98 },
  { id: "zhao-platform", name: "赵城川", org: "城投平台", tier: [0, 4], personality: "稳、政策敏感", style: "不急，但能等政策和白名单", bidStyle: "慢等", cash: [58, 160], aggression: 0.42, patience: 0.88, relation: 0.86, growth: 1.03 },
  { id: "lin-trust", name: "林启融", org: "信托资金盘", tier: [1, 5], personality: "资金贵、报价狠", style: "后面资金成本也狠，喜欢短期套利", bidStyle: "硬顶", cash: [54, 180], aggression: 0.86, patience: 0.38, relation: 0.32, growth: 1.07 },
  { id: "zhou-channel", name: "周渠海", org: "渠道热钱盘", tier: [0, 3], personality: "追热度、退得快", style: "看热度，不看交付", bidStyle: "追涨", cash: [38, 126], aggression: 0.82, patience: 0.32, relation: 0.28, growth: 1.04 },
  { id: "guo-statebuilder", name: "郭建安", org: "国企施工局", tier: [2, 5], personality: "稳、低成本、看地方绑定", style: "成本低，喜欢和地方绑定", bidStyle: "稳拿", cash: [78, 230], aggression: 0.52, patience: 0.82, relation: 0.8, growth: 1.04 }
];

function randomInRange(range) {
  if (!Array.isArray(range)) return Number(range) || 0;
  const [min, max] = range;
  return Math.round(min + Math.random() * (max - min));
}

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function createCompetitorRoster() {
  return AUCTION_COMPETITOR_ARCHETYPES.map((item) => {
    const baseCash = randomInRange(item.cash);
    return {
      ...item,
      baseId: item.id,
      cash: baseCash,
      reputation: Math.round(45 + item.patience * 20 + Math.random() * 18),
      status: "active",
      wins: 0,
      losses: 0,
      lastTurn: 1,
      mood: "观望"
    };
  });
}

export function normalizeCompetitorRoster(roster = []) {
  const byId = Object.fromEntries((roster || []).map((item) => [item.baseId || item.id, item]));
  return createCompetitorRoster().map((fresh) => {
    const saved = byId[fresh.baseId] || {};
    return {
      ...fresh,
      ...saved,
      baseId: fresh.baseId,
      id: saved.id || fresh.baseId,
      status: saved.status || "active",
      cash: Math.max(0, Math.round(saved.cash ?? fresh.cash)),
      wins: saved.wins || 0,
      losses: saved.losses || 0,
      mood: saved.mood || "观望"
    };
  });
}

function updateCompetitorLifecycle(game, market = {}) {
  if (!game?.competitorRoster) game.competitorRoster = createCompetitorRoster();
  game.competitorRoster.forEach((person) => {
    if (person.status === "retired") return;
    const elapsed = Math.max(0, (game.turn || 1) - (person.lastTurn || 1));
    if (elapsed > 0) {
      const cycle = market.isBoom ? 1.05 : market.isDownturn ? 0.92 : 1;
      person.cash = Math.max(0, Math.round(person.cash * (1 + (person.growth || 1) * 0.008 * elapsed) * cycle));
      person.lastTurn = game.turn || 1;
    }
    if (person.cash <= 12 && market.isDownturn) {
      person.status = "distressed";
      person.mood = "出清";
    }
    if (person.cash <= 5 || person.losses >= 5) {
      person.status = "retired";
      person.mood = "退场";
    }
  });
}

export function generateAuctionCompetitors(game, market = {}) {
  updateCompetitorLifecycle(game, market);
  const scale = game.scaleIndex || 0;
  const count = clamp(4 + Math.floor(scale / 2) + (Math.random() < 0.45 ? 1 : 0), 4, 6);
  const eligible = (game.competitorRoster || [])
    .filter((item) => item.status !== "retired")
    .filter((item) => scale >= item.tier[0] && scale <= item.tier[1])
    .sort(() => Math.random() - 0.5);
  const pool = eligible.slice(0, count);
  return pool.map((item, index) => {
    const cash = Math.round(item.cash + scale * randomInRange([10, 22]));
    return {
      ...item,
      id: `${item.baseId}-${game.turn}-${index}`,
      rosterId: item.baseId,
      cash,
      budgetBias: clampNumber(0.88 + item.aggression * 0.28 + Math.random() * 0.22, 0.82, item.status === "distressed" ? 1.05 : 1.35),
      active: true,
      lastBid: 0,
      mood: item.status === "distressed" ? "出清" : item.mood || "观望"
    };
  });
}

export function recordCompetitorAuctionOutcome(game, state, winner, finalPrice) {
  if (!game?.competitorRoster || !state?.rivals) return;
  state.rivals.forEach((rival) => {
    const person = game.competitorRoster.find((item) => item.baseId === rival.rosterId);
    if (!person) return;
    if (winner && rival.name === winner) {
      person.wins = (person.wins || 0) + 1;
      person.cash = Math.max(0, Math.round((person.cash || rival.cash) - finalPrice * 0.22));
      person.reputation = clamp((person.reputation || 50) + 3);
      person.mood = "扩张";
    } else if (rival.lastBid > 0 || rival.active === false) {
      person.losses = (person.losses || 0) + 1;
      person.cash = Math.max(0, Math.round((person.cash || rival.cash) - Math.max(1, rival.lastBid * 0.025)));
      person.mood = person.losses >= 3 ? "保守" : "观望";
    }
    if (person.cash <= 5 || person.losses >= 5) {
      person.status = "retired";
      person.mood = "退场";
    } else if (person.cash <= 16) {
      person.status = "distressed";
      person.mood = "出清";
    }
  });
}
