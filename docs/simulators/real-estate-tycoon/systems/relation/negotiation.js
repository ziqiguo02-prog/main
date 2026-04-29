const LOAN_PROFILES = {
  "relation-friend-borrow": {
    lender: "工程圈老友",
    relationKey: "private_friends",
    base: 2,
    max: 18,
    tightness: 0.42,
    minRate: 1.2,
    maxRate: 3.6,
    style: "friend",
    replies: ["这钱我能帮一点，但你得把还款日写清楚。", "我不是银行，关系归关系，账要算明白。"]
  },
  "finance-friend-bridge-loan": {
    lender: "工程圈老友",
    relationKey: "private_friends",
    base: 3,
    max: 22,
    tightness: 0.46,
    minRate: 1.4,
    maxRate: 4.2,
    style: "friend",
    replies: ["我可以先垫一笔，别让我在工程圈丢脸。", "短钱能借，但别拖成长期债。"]
  },
  "finance-nonbank-microloan": {
    lender: "小贷老板",
    relationKey: "micro_lender",
    base: 5,
    max: 28,
    tightness: 0.28,
    minRate: 4.8,
    maxRate: 9.5,
    style: "micro",
    replies: ["钱今天能到，抵押和担保要硬。", "我不问故事，只看抵押、利息和退出。"]
  },
  "finance-underground-short-money": {
    lender: "高息短钱",
    relationKey: "underground",
    base: 6,
    max: 30,
    tightness: 0.18,
    minRate: 8.5,
    maxRate: 16,
    style: "gray",
    replies: ["钱不是问题，规矩你也懂。", "今天能给，逾期就不是电话催你了。"]
  },
  "relation-other-micro-extension": {
    lender: "小贷老板",
    relationKey: "micro_lender",
    base: 3,
    max: 16,
    tightness: 0.35,
    minRate: 5.8,
    maxRate: 11,
    style: "micro",
    replies: ["能缓一缓，但利息和抵押边界要重写。", "展期可以谈，成本不会便宜。"]
  }
};

const JOINT_PROFILES = {
  "relation-friend-joint-dev": {
    partner: "工程圈老友",
    relationKey: "private_friends",
    proposals: [
      {
        id: "balanced",
        title: "你 60%，老友 40%",
        hint: "你主导拿地和销售，他垫施工和部分工程款。",
        visibleEffects: { cash: 7, delivery: 4, debt: 2 },
        hiddenEffects: { control_loss: 5, legal_exposure: 2, off_balance_debt: 2 },
        relationEffects: { private_friends: 3, contractor: 4 },
        scaleScore: 2
      },
      {
        id: "partner-heavy",
        title: "你 45%，老友 55%",
        hint: "他出更多钱和施工资源，但成本口径、退出价和工程款优先权更强。",
        visibleEffects: { cash: 11, delivery: 5, debt: 1 },
        hiddenEffects: { control_loss: 10, legal_exposure: 3, off_balance_debt: 3 },
        relationEffects: { private_friends: 4, contractor: 5 },
        scaleScore: 3
      },
      {
        id: "player-control",
        title: "你 72%，老友 28%",
        hint: "你保控制权，他只垫一小段施工钱，资金压力仍主要在你身上。",
        visibleEffects: { cash: 4, delivery: 3, debt: 3 },
        hiddenEffects: { control_loss: 2, legal_exposure: 2, financing_cost: 2 },
        relationEffects: { private_friends: 2, contractor: 3 },
        scaleScore: 1
      }
    ]
  },
  "finance-friend-equity-sidecar": {
    partner: "同学投资人",
    relationKey: "private_friends",
    proposals: [
      {
        id: "minority-cash",
        title: "你 65%，同学 35%",
        hint: "他出现金，你操盘；分红和退出时间写进协议。",
        visibleEffects: { cash: 10, debt: -1, bank: 1 },
        hiddenEffects: { control_loss: 5, legal_exposure: 2 },
        relationEffects: { private_friends: 4 },
        scaleScore: 2
      },
      {
        id: "preferred-return",
        title: "你 75%，同学优先回本",
        hint: "你保股权比例，但对方先拿回本金和约定收益。",
        visibleEffects: { cash: 7, debt: 1, bank: 1 },
        hiddenEffects: { control_loss: 3, financing_cost: 3, legal_exposure: 2 },
        relationEffects: { private_friends: 3 },
        scaleScore: 1
      }
    ]
  }
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function relationScore(context, key) {
  return Math.round(context?.relations?.[key] || 0);
}

function pickReply(profile, amount) {
  const replies = profile.replies || [];
  if (!replies.length) return "能不能借，要看关系、抵押和还款口径。";
  return replies[Math.abs(amount + profile.lender.length) % replies.length];
}

export function loanProfileForAction(actionId) {
  return LOAN_PROFILES[actionId] || null;
}

export function buildRelationLoanOffer(actionId, context) {
  const profile = loanProfileForAction(actionId);
  if (!profile) return null;
  const relation = relationScore(context, profile.relationKey);
  const pressure = context?.cashPressure ? 2 : 0;
  const looseness = clamp((relation - 12) / 88 - profile.tightness + 0.42, 0.08, 1);
  const amount = Math.max(1, Math.round((profile.base + profile.max * looseness) * (1 + pressure * 0.03)));
  const rate = Number((profile.maxRate - (profile.maxRate - profile.minRate) * looseness).toFixed(1));
  const debt = Math.max(1, Math.round(amount * (profile.style === "friend" ? 0.82 : 0.95)));
  const financingCost = Math.max(1, Math.round(amount * rate / 12));
  return {
    lender: profile.lender,
    relation,
    amount,
    rate,
    debt,
    financingCost,
    reply: pickReply(profile, amount),
    style: profile.style
  };
}

export function jointProfileForAction(actionId) {
  return JOINT_PROFILES[actionId] || null;
}

export function buildJointDevelopmentProposals(actionId, context) {
  const profile = jointProfileForAction(actionId);
  if (!profile) return [];
  const relation = relationScore(context, profile.relationKey);
  if (relation < 80) return [];
  return profile.proposals.map((proposal) => ({
    ...proposal,
    partner: profile.partner,
    relation
  }));
}
