const CHAT_GROUPS = [
  { id: "local-boss", label: "本地老板", icon: "商", brief: "谈退让、换地、联合项目公司。" },
  { id: "gov-window", label: "政府窗口", icon: "政", brief: "问规划、配建、城投和保护边界。" },
  { id: "bank-window", label: "银行窗口", icon: "银", brief: "问保证金、授信、监管户和抵押口径。" }
];

const CHAT_CONTACTS = [
  {
    id: "chat-wang",
    group: "local-boss",
    name: "王振北",
    org: "本地熟人盘",
    stance: "势在必得",
    relationKeys: ["competitors"],
    intimacyBias: -8,
    toughness: 0.66,
    moneyPower: 0.46,
    brief: "他想拿老城和东郊，资金不厚，但关系深。",
    options: [
      {
        id: "wang-exit-fee",
        label: "问他退让要什么好处",
        minIntimacy: -8,
        hint: "现金补偿、工程份额或下一块地互相让路；倒查风险高。",
        message: "王振北不愿白退，只愿意把补偿写进工程、渠道或下一块地的人情账。",
        visibleEffects: { cash: -2 },
        hiddenEffects: { legal_exposure: 5, gray_risk: 4, local_isolation: -1 },
        relationEffects: { competitors: 4 },
        effect: "boss-truce"
      },
      {
        id: "wang-project-company",
        label: "谈项目公司一起做",
        minIntimacy: 8,
        hint: "联合竞买后设项目公司，按出资、操盘和风险分利润。",
        message: "王振北愿意谈项目公司，但要求保留一部分收益和工程口。",
        visibleEffects: { cash: -1, government: 1 },
        hiddenEffects: { control_loss: 3, legal_exposure: 2, political_dependency: 1 },
        relationEffects: { competitors: 3 },
        effect: "boss-truce"
      },
      {
        id: "wang-swap-lot",
        label: "提议这块归你、下块归他",
        minIntimacy: 16,
        hint: "能降低当场抬价，但属于高风险口头默契。",
        message: "王振北没有明说答应，只开始重新盘算这块地是不是值得硬顶。",
        visibleEffects: { cash: -1 },
        hiddenEffects: { legal_exposure: 6, gray_risk: 3 },
        relationEffects: { competitors: 2 },
        effect: "boss-truce"
      }
    ]
  },
  {
    id: "chat-xu",
    group: "local-boss",
    name: "许恒远",
    org: "高周转同行",
    stance: "硬抢地王",
    relationKeys: ["competitors", "bank_manager"],
    intimacyBias: -18,
    toughness: 0.92,
    moneyPower: 0.86,
    brief: "他看重规模和速度，容易把价格推过安全线。",
    options: [
      {
        id: "xu-avoid-war",
        label: "问他真正想要哪块地",
        minIntimacy: -2,
        hint: "探出偏好后避开硬碰硬，少一点抬价损耗。",
        message: "许恒远只对能快开盘的地块有执念，别的地可以谈。",
        visibleEffects: { cash: -1 },
        hiddenEffects: { local_isolation: -1, legal_exposure: 1 },
        relationEffects: { competitors: 2 },
        effect: "boss-truce"
      },
      {
        id: "xu-profit-split",
        label: "谈联合拿地后利润分账",
        minIntimacy: 24,
        hint: "能换来资金和速度，但对方会要求更强控制权。",
        message: "许恒远愿意一起冲，但条件是他主导融资和开盘节奏。",
        visibleEffects: { cash: -1, sales: 1 },
        hiddenEffects: { control_loss: 5, financing_cost: 2, legal_exposure: 2 },
        relationEffects: { competitors: 3, bank_manager: 1 },
        effect: "boss-truce"
      },
      {
        id: "xu-pressure",
        label: "请他别把价格顶穿",
        minIntimacy: 34,
        hint: "只有亲密度很高时才可能给面子，否则他会反向抬价。",
        message: "许恒远口头说不顶穿，但会看现场有没有别人抬价。",
        visibleEffects: { cash: -1 },
        hiddenEffects: { legal_exposure: 3, gray_risk: 2 },
        relationEffects: { competitors: 4 },
        effect: "boss-truce"
      }
    ]
  },
  {
    id: "chat-zhao",
    group: "gov-window",
    name: "赵主任",
    org: "县城投联系人",
    stance: "要稳地方盘",
    relationKeys: ["local_official", "state_capital"],
    intimacyBias: -4,
    toughness: 0.58,
    moneyPower: 0.34,
    brief: "不出资，但能影响城投、配建、审批和被刁难的概率。",
    options: [
      {
        id: "zhao-planning-tone",
        label: "问规划和配建口径",
        minIntimacy: -10,
        hint: "减少误判，但会留下找窗口的关系痕迹。",
        message: "赵主任把配建、限高和产业口径说清了，这块地的真实边界更清楚。",
        visibleEffects: { cash: -1, government: 2 },
        hiddenEffects: { political_dependency: 2, legal_exposure: 1 },
        relationEffects: { local_official: 3, state_capital: 1 },
        effect: "gov-window"
      },
      {
        id: "zhao-platform",
        label: "请他牵线城投平台",
        minIntimacy: 10,
        hint: "不直接借钱，但可能带来平台信用和共同用章约束。",
        message: "赵主任愿意让城投窗口听一听，但平台不会无条件替你兜底。",
        visibleEffects: { cash: -1, government: 1, bank: 1 },
        hiddenEffects: { control_loss: 3, political_dependency: 4 },
        relationEffects: { state_capital: 3, local_official: 2 },
        effect: "gov-window"
      },
      {
        id: "zhao-dry-share",
        label: "暗示留干股换保护",
        minIntimacy: 28,
        hint: "能减少被卡，但政治依赖和法律风险会明显上升。",
        message: "赵主任没有接话，只提醒你以后项目用章和付款口径要干净。",
        visibleEffects: { government: 3 },
        hiddenEffects: { political_dependency: 7, legal_exposure: 6, gray_risk: 4 },
        relationEffects: { local_official: 4 },
        effect: "gov-window"
      }
    ]
  },
  {
    id: "chat-he",
    group: "gov-window",
    name: "何科长",
    org: "自然资源窗口",
    stance: "讲指标边界",
    relationKeys: ["local_official"],
    intimacyBias: -2,
    toughness: 0.52,
    moneyPower: 0.2,
    brief: "他不帮你拿钱，主要讲用地性质、规划指标和闲置风险。",
    options: [
      {
        id: "he-land-use",
        label: "问用地性质会不会变",
        minIntimacy: -12,
        hint: "能提前知道农地、工业、商住转换的口径，但不能当承诺。",
        message: "何科长把近期用地转换口径说清了：便宜地能不能涨，关键看规划和配套落地。",
        visibleEffects: { cash: -1, government: 1 },
        hiddenEffects: { political_dependency: 1, legal_exposure: 1 },
        relationEffects: { local_official: 2 },
        effect: "gov-window"
      },
      {
        id: "he-idle-risk",
        label: "摸清闲置土地红线",
        minIntimacy: -4,
        hint: "适合想捂地的人，能知道多久不开发会被盯上。",
        message: "何科长提醒你别只算涨价，闲置、开工和投资强度都有红线。",
        visibleEffects: { government: 1 },
        hiddenEffects: { delivery_pressure: -1, political_dependency: 2 },
        relationEffects: { local_official: 2 },
        effect: "gov-window"
      },
      {
        id: "he-index-side",
        label: "请他指出不能碰的指标",
        minIntimacy: 12,
        hint: "少踩雷，但会让窗口知道你在盯哪块地。",
        message: "何科长只说了不能碰的边界，没给你任何保证。",
        visibleEffects: { government: 2 },
        hiddenEffects: { political_dependency: 3, local_isolation: -1 },
        relationEffects: { local_official: 3 },
        effect: "gov-window"
      }
    ]
  },
  {
    id: "chat-qian",
    group: "gov-window",
    name: "钱副总",
    org: "县建投平台",
    stance: "要封闭运行",
    relationKeys: ["state_capital", "local_official"],
    intimacyBias: -6,
    toughness: 0.72,
    moneyPower: 0.56,
    brief: "平台可以带信用和一点钱，但项目公司、用章、监管户和分配顺位都要写清。",
    options: [
      {
        id: "qian-platform-jv",
        label: "谈平台共同项目公司",
        minIntimacy: 4,
        hint: "能补信用和保证金，但控制权、用章和利润分配会受约束。",
        message: "钱副总愿意把方案拿回去看，但平台不会只听你的故事。",
        visibleEffects: { cash: -1, bank: 1, government: 1 },
        hiddenEffects: { control_loss: 4, political_dependency: 4, legal_exposure: 2 },
        relationEffects: { state_capital: 3, local_official: 1 },
        effect: "gov-window"
      },
      {
        id: "qian-escrow-seal",
        label: "问监管户和用章边界",
        minIntimacy: -6,
        hint: "提前知道哪些钱不能乱动，避免后面账户被卡。",
        message: "钱副总把监管户、付款顺位和共同用章说得很硬。",
        visibleEffects: { bank: 1, government: 1 },
        hiddenEffects: { data_inflation: -1, control_loss: 2 },
        relationEffects: { state_capital: 2 },
        effect: "gov-window"
      },
      {
        id: "qian-buyout",
        label: "试探以后让平台接盘",
        minIntimacy: 18,
        hint: "能留退路，但对方会挑资产、挑楼栋、挑责任。",
        message: "钱副总没有承诺接盘，只说项目现金流必须能封闭。",
        visibleEffects: { government: 1, bank: 1 },
        hiddenEffects: { control_loss: 3, political_dependency: 3 },
        relationEffects: { state_capital: 3 },
        effect: "gov-window"
      }
    ]
  },
  {
    id: "chat-ma",
    group: "gov-window",
    name: "马主任",
    org: "住建审批口",
    stance: "怕交付出事",
    relationKeys: ["local_official"],
    intimacyBias: 0,
    toughness: 0.64,
    moneyPower: 0.18,
    brief: "他管报建、预售、验收和停工风险，核心是责任边界。",
    options: [
      {
        id: "ma-permit-path",
        label: "问报建和预售路径",
        minIntimacy: -10,
        hint: "能知道什么时候能卖、什么时候容易被卡。",
        message: "马主任把报建、预售和验收节点按顺序讲了一遍。",
        visibleEffects: { government: 1, sales: 1 },
        hiddenEffects: { data_inflation: -1, political_dependency: 1 },
        relationEffects: { local_official: 2 },
        effect: "gov-window"
      },
      {
        id: "ma-quality-redline",
        label: "问质量和交付红线",
        minIntimacy: -2,
        hint: "不能直接帮你拿地，但能少踩后续停工和验收雷。",
        message: "马主任提醒你，交付和质量一旦闹大，谁也不愿替你背。",
        visibleEffects: { government: 1, sales: -1 },
        hiddenEffects: { buyer_liability: -2, delivery_pressure: -1 },
        relationEffects: { local_official: 2 },
        effect: "gov-window"
      },
      {
        id: "ma-special-meeting",
        label: "请他拉一次会商",
        minIntimacy: 16,
        hint: "能把住建、银行、平台拉到一桌，但你会被要求更多材料。",
        message: "马主任愿意帮你问一次会商，但所有口径都要留痕。",
        visibleEffects: { government: 2, bank: 1 },
        hiddenEffects: { data_inflation: -1, political_dependency: 4 },
        relationEffects: { local_official: 3, state_capital: 1 },
        effect: "gov-window"
      }
    ]
  },
  {
    id: "chat-lin",
    group: "bank-window",
    name: "林经理",
    org: "县支行客户经理",
    stance: "风控谨慎",
    relationKeys: ["bank_manager"],
    intimacyBias: 2,
    toughness: 0.62,
    moneyPower: 0.44,
    brief: "不能替你举牌，但能告诉你授信、保证金和监管户边界。",
    options: [
      {
        id: "lin-margin",
        label: "确认保证金和授信材料",
        minIntimacy: -12,
        hint: "减少资金误判，但银行会要求更多材料。",
        message: "林经理把保证金、授信材料和账户解释口径说清了。",
        visibleEffects: { cash: -1, bank: 2 },
        hiddenEffects: { data_inflation: -1, financing_cost: 1 },
        relationEffects: { bank_manager: 3 },
        effect: "bank-margin"
      },
      {
        id: "lin-escrow",
        label: "预沟通监管户回款路径",
        minIntimacy: 8,
        hint: "方便后面开发贷和预售款安排，但银行穿透会更深。",
        message: "林经理提醒你监管户不能随便挪，但材料完整时展期更好谈。",
        visibleEffects: { bank: 2, sales: 1 },
        hiddenEffects: { data_inflation: -2, political_dependency: 1 },
        relationEffects: { bank_manager: 3 },
        effect: "bank-margin"
      },
      {
        id: "lin-collateral",
        label: "问土地抵押预沟通",
        minIntimacy: 18,
        hint: "可以提前知道抵押折扣，避免拍完才发现贷不出来。",
        message: "林经理给了一个保守抵押折扣，价格太高银行不会只听故事。",
        visibleEffects: { bank: 2 },
        hiddenEffects: { financing_cost: -1, data_inflation: -1 },
        relationEffects: { bank_manager: 2 },
        effect: "bank-margin"
      }
    ]
  },
  {
    id: "chat-sun",
    group: "bank-window",
    name: "孙行长",
    org: "县支行分管行长",
    stance: "只看闭环",
    relationKeys: ["bank_manager"],
    intimacyBias: -6,
    toughness: 0.78,
    moneyPower: 0.62,
    brief: "他说话少，核心是额度、抵押率、监管户和总行窗口。",
    options: [
      {
        id: "sun-credit-window",
        label: "问开发贷额度窗口",
        minIntimacy: -2,
        hint: "银行不只看你，还看项目能不能和主体风险切开。",
        message: "孙行长只说一句：项目好可以看，主体故事不能盖过现金流。",
        visibleEffects: { bank: 2 },
        hiddenEffects: { data_inflation: -1, financing_cost: 1 },
        relationEffects: { bank_manager: 3 },
        effect: "bank-margin"
      },
      {
        id: "sun-collateral-haircut",
        label: "问土地抵押折扣",
        minIntimacy: 8,
        hint: "能知道拍完以后能贷多少，避免地价拍穿融资空间。",
        message: "孙行长给了一个保守折扣：价格越热，银行越不会按你故事里的货值放款。",
        visibleEffects: { bank: 2 },
        hiddenEffects: { financing_cost: -1 },
        relationEffects: { bank_manager: 2 },
        effect: "bank-margin"
      },
      {
        id: "sun-rollover-side",
        label: "试探展期口径",
        minIntimacy: 18,
        hint: "关系好才愿意讲，但会要求监管户、销售回款和付款顺位都能解释。",
        message: "孙行长没有答应展期，只让你先把监管户流水和付款表补齐。",
        visibleEffects: { bank: 2, cash: -1 },
        hiddenEffects: { data_inflation: -2, political_dependency: 1 },
        relationEffects: { bank_manager: 3 },
        effect: "bank-margin"
      }
    ]
  },
  {
    id: "chat-risk",
    group: "bank-window",
    name: "周经理",
    org: "分行风控",
    stance: "穿透材料",
    relationKeys: ["bank_manager"],
    intimacyBias: -14,
    toughness: 0.9,
    moneyPower: 0.5,
    brief: "他不讲人情，专看证照、担保链、销售回款和监管账户闭环。",
    options: [
      {
        id: "risk-document-list",
        label: "请他列材料清单",
        minIntimacy: -12,
        hint: "会暴露短板，但知道银行真正看什么。",
        message: "周经理把证照、抵押、销售回款、监管户和债务表逐项列出来。",
        visibleEffects: { bank: 1 },
        hiddenEffects: { data_inflation: -2, financing_cost: 1 },
        relationEffects: { bank_manager: 2 },
        effect: "bank-margin"
      },
      {
        id: "risk-project-separate",
        label: "争取项目和主体分开看",
        minIntimacy: 6,
        hint: "如果项目账户能封闭，银行可能少被你旧债吓退。",
        message: "周经理说可以把项目单独测算，但资金流必须闭环，不能拿销售回款补别的洞。",
        visibleEffects: { bank: 2, sales: 1 },
        hiddenEffects: { data_inflation: -2, control_loss: 1 },
        relationEffects: { bank_manager: 2 },
        effect: "bank-margin"
      },
      {
        id: "risk-covenant-reset",
        label: "谈重设风控条件",
        minIntimacy: 24,
        hint: "能换时间，但银行会拿走更多账户解释权。",
        message: "周经理愿意把条件拿回去评审，但监管户和付款顺位要更硬。",
        visibleEffects: { bank: 3, cash: -1 },
        hiddenEffects: { control_loss: 2, data_inflation: -2 },
        relationEffects: { bank_manager: 3 },
        effect: "bank-margin"
      }
    ]
  }
];

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function effectCopy(effects = {}) {
  return Object.fromEntries(Object.entries(effects).map(([key, value]) => [key, value]));
}

function relationRaw(contact, context = {}) {
  const relations = context.relations || {};
  const keys = contact.relationKeys || [];
  if (!keys.length) return 56;
  const raw = Math.max(...keys.map((key) => Number(relations[key] || 0)));
  const groupFloor = {
    "local-boss": 42,
    "gov-window": 44,
    "bank-window": 46
  }[contact.group] || 42;
  return Math.max(raw, groupFloor);
}

function contactStatus(intimacy) {
  if (intimacy <= -28) return "仇敌";
  if (intimacy <= -10) return "冷淡";
  if (intimacy < 18) return "一般";
  if (intimacy < 40) return "熟络";
  return "亲近";
}

export function auctionChatGroups() {
  return CHAT_GROUPS;
}

export function auctionChatGroupById(groupId) {
  return CHAT_GROUPS.find((group) => group.id === groupId) || CHAT_GROUPS[0];
}

export function auctionChatContactProfiles(context = {}, groupId = "local-boss") {
  const contacts = CHAT_CONTACTS
    .filter((contact) => contact.group === groupId)
    .map((contact) => {
      const raw = relationRaw(contact, context);
      const intimacy = clampNumber(Math.round(raw - 42 + (contact.intimacyBias || 0)), -80, 80);
      const resistance = clampNumber(Math.round(contact.toughness * 42 + contact.moneyPower * 24 - intimacy * 0.52), 0, 100);
      return {
        ...contact,
        rawRelation: raw,
        intimacy,
        intimacyLabel: contactStatus(intimacy),
        resistance
      };
    });
  const hasUsableContact = contacts.some((contact) => contact.intimacy >= -4);
  if (!hasUsableContact && contacts.length) {
    contacts[0].intimacy = -2;
    contacts[0].intimacyLabel = contactStatus(contacts[0].intimacy);
    contacts[0].resistance = clampNumber(Math.round(contacts[0].toughness * 42 + contacts[0].moneyPower * 24 - contacts[0].intimacy * 0.52), 0, 100);
  }
  return contacts;
}

export function auctionChatContactById(context = {}, contactId) {
  const contact = CHAT_CONTACTS.find((item) => item.id === contactId) || CHAT_CONTACTS[0];
  return auctionChatContactProfiles(context, contact.group).find((item) => item.id === contact.id) || contact;
}

export function auctionChatActionProfile(contact, actionId) {
  const action = (contact.options || []).find((item) => item.id === actionId) || contact.options?.[0];
  if (!action) return null;
  const intimacy = Number(contact.intimacy || 0);
  const minIntimacy = Number(action.minIntimacy || 0);
  const hostile = intimacy < -20;
  const hardOpponent = contact.group === "local-boss" && contact.moneyPower >= 0.75 && contact.toughness >= 0.8;
  const locked = intimacy < minIntimacy || hostile;
  const visibleEffects = effectCopy(action.visibleEffects);
  const hiddenEffects = effectCopy(action.hiddenEffects);
  const relationEffects = effectCopy(action.relationEffects);
  if (intimacy >= 35 && visibleEffects.cash < 0) visibleEffects.cash += 1;
  if (intimacy < 0 && hiddenEffects.legal_exposure > 0) hiddenEffects.legal_exposure += 1;
  if (hardOpponent && intimacy < 28 && relationEffects.competitors > 0) relationEffects.competitors = Math.max(0, relationEffects.competitors - 2);
  return {
    ...action,
    minIntimacy,
    locked,
    lockedReason: hostile
      ? `${contact.name}现在是${contact.intimacyLabel}，你开口他只会反向抬价。`
      : `亲密度 ${intimacy}，低于这个谈法需要的 ${minIntimacy}。`,
    visibleEffects,
    hiddenEffects,
    relationEffects,
    quality: clampNumber(Math.round(intimacy - contact.resistance / 2), -80, 80)
  };
}
