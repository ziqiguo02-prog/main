window.REAL_ESTATE_TYCOON_DATA = {
  initialState: {
    visible: {
      cash: 28,
      debt: 22,
      land_bank: 16,
      sales: 24,
      delivery: 36,
      government: 30,
      bank: 24,
      public_trust: 42
    },
    hidden: {
      presale_misuse: 6,
      off_balance_debt: 12,
      political_dependency: 14,
      gray_risk: 6,
      price_bubble: 18,
      data_inflation: 4,
      diversification_fantasy: 0,
      delivery_pressure: 14,
      local_isolation: 16,
      financing_cost: 10,
      buyer_liability: 18,
      exit_preparation: 0,
      asset_freeze_risk: 0,
      legal_exposure: 4,
      control_loss: 0,
      boss_safety: 82
    }
  },
  labels: {
    cash: "现金池",
    debt: "债务压力",
    land_bank: "土储质量",
    sales: "销售热度",
    delivery: "交付信用",
    government: "政商关系",
    bank: "银行信任",
    public_trust: "业主信任",
    presale_misuse: "预售挪用",
    off_balance_debt: "体外债务",
    political_dependency: "权力依赖",
    gray_risk: "黑灰风险",
    price_bubble: "价格泡沫",
    data_inflation: "数字注水",
    diversification_fantasy: "多元化幻觉",
    delivery_pressure: "保交楼压力",
    local_isolation: "地方孤立",
    financing_cost: "融资成本",
    buyer_liability: "购房款责任",
    exit_preparation: "退出准备",
    asset_freeze_risk: "资产冻结风险",
    legal_exposure: "法律暴露",
    control_loss: "控制权流失",
    boss_safety: "老板安全"
  },
  inverseStats: ["debt", "presale_misuse", "off_balance_debt", "political_dependency", "gray_risk", "price_bubble", "data_inflation", "diversification_fantasy", "delivery_pressure", "local_isolation", "financing_cost", "buyer_liability", "asset_freeze_risk", "legal_exposure", "control_loss"],
  origins: [
    {
      id: "contractor",
      title: "县城包工头",
      intro: "你靠一个学校工程攒下第一笔钱，手上只有几支施工队和一个愿意介绍饭局的老甲方。",
      project: "云江县东郊小盘",
      startEvent: "first-land-deposit",
      stateBoost: { visible: { delivery: 6 }, hidden: { gray_risk: 2 } }
    }
  ],
  mainLine: [
    "first-land-deposit",
    "contractor-payment",
    "presale-permit",
    "fake-showroom-heat",
    "demolition-nail-house",
    "lgfv-joint-venture",
    "new-district-metro-rumor",
    "shelter-reform-boom",
    "trust-money-arrives",
    "high-turnover-meeting",
    "old-owners-price-cut",
    "presale-supervision-account",
    "bank-loan-withdrawal",
    "stoppage-video",
    "mortgage-boycott-letter",
    "state-capital-takeover",
    "high-point-exit-window"
  ],
  interruptEvents: [
    "supplier-blockade",
    "school-district-promise",
    "distressed-project-bargain",
    "offshore-bond-due",
    "diversification-circus",
    "boss-travel-ban",
    "anti-gang-investigation"
  ],
  scales: [
    { id: "nobody", title: "无名小老板", standard: "先活下来。", minScore: 0 },
    { id: "county", title: "县城开发商", standard: "能交付一个小盘，别让施工方和业主同时堵门。", minScore: 28 },
    { id: "city", title: "城市新贵", standard: "能拿核心地，也能承受核心地的现金黑洞。", minScore: 58 },
    { id: "regional", title: "区域房企", standard: "跨城扩张后还能看清每个项目的真实回款。", minScore: 92 },
    { id: "top100", title: "全国百强", standard: "融资、评级、销售、交付任何一条线断了都会传染。", minScore: 138 },
    { id: "empire", title: "地产帝国", standard: "规模本身不是护城河，可能只是更大的爆雷半径。", minScore: 260 },
    { id: "exit", title: "高点退场者", standard: "不站到最后一桌，也许才是最难的胜利。", minScore: 999 }
  ],
  phases: [
    {
      id: "early-expansion",
      title: "早期扩张",
      policy: "土地财政上行",
      market: "房价预期偏热",
      credit: "熟人信用比银行信用更有用",
      pressure: 0.02
    },
    {
      id: "shelter-reform-boom",
      title: "棚改货币化",
      policy: "去库存和新区叙事共振",
      market: "三四线突然好卖",
      credit: "渠道、银行、信托开始主动靠近",
      pressure: 0.04
    },
    {
      id: "high-turnover",
      title: "高周转时代",
      policy: "规模排名和销售额变成信仰",
      market: "热盘掩盖真实库存",
      credit: "钱越来越多，也越来越贵",
      pressure: 0.07
    },
    {
      id: "three-red-lines",
      title: "三道红线",
      policy: "融资约束变硬",
      market: "买房人开始犹豫",
      credit: "银行看指标，信托看抵押，债权人看现金",
      pressure: 0.12
    },
    {
      id: "sales-freeze",
      title: "销售冰冻",
      policy: "稳市场，但不再无条件托底房企",
      market: "降价伤老业主，不降价伤现金流",
      credit: "续贷变成谈判，抽贷变成常态",
      pressure: 0.17
    },
    {
      id: "guaranteed-delivery",
      title: "保交楼",
      policy: "资金封闭运行，专款专用",
      market: "购房人不再只看价格，先看能不能交",
      credit: "救项目，不一定救老板",
      pressure: 0.2
    },
    {
      id: "clearance",
      title: "出清接盘",
      policy: "国资挑资产，债权人挑责任",
      market: "信心很贵，坏消息很快",
      credit: "控制权比利润先被重组",
      pressure: 0.22
    }
  ],
  models: {
    "land-finance-loop": {
      name: "土地财政循环",
      note: "地方用土地、规划和基建制造预期，房企用拿地和预售承接预期；上行期互相成就，下行期互相拖累。"
    },
    "leverage-backfire": {
      name: "杠杆反噬",
      note: "借来的速度会变成还款的速度；高周转不是无风险，只是把风险压到更晚的交付和债务节点。"
    },
    "presale-cashflow-trap": {
      name: "预售现金流陷阱",
      note: "预售款看起来像现金，其实背后绑定未来交付义务。挪用得越顺，爆雷时责任越清楚。"
    },
    "political-embedded-enterprise": {
      name: "政企嵌入企业",
      note: "关系能降低进入门槛，也会把企业绑成地方稳定、财政、政绩和处置任务的一部分。"
    },
    "risk-transfer-chain": {
      name: "风险转移链条",
      note: "风险会在地方、银行、施工方、供应商、业主之间移动；移动不是消失，只是换了爆点。"
    },
    "balance-sheet-maintenance": {
      name: "资产负债表维持",
      note: "账面漂亮可能靠展期、商票、拟回款和估值维持；真正要看自由现金流和到期责任。"
    },
    "phantom-demand": {
      name: "虚假需求",
      note: "售楼处热闹、认购表好看、渠道排队，不等于人口、收入和真实按揭能力能支撑价格。"
    },
    "gray-governance": {
      name: "黑灰治理反噬",
      note: "用灰色力量解决拆迁、土方、催债能提高短期效率，但会把经营风险变成刑事和扫黑风险。"
    },
    "delivery-first": {
      name: "保交付优先",
      note: "危机后政策重点从房企利润转向交付和稳定，能动的钱会被锁进项目而不是老板手里。"
    },
    "exit-discipline": {
      name: "退出纪律",
      note: "最难的不是做大，而是在还能体面卖出时承认周期变了。高点退出常常比继续扩张更反人性。"
    },
    "data-inflation": {
      name: "数字注水",
      note: "认购、签约、回款、交付和利润不是一回事。混在一起时，组织最容易误判。"
    },
    "feedback-loop": {
      name: "反馈回路",
      note: "真实反馈越早进入决策，代价越小；等业主、银行、政府和法院替你反馈时，选择空间会急剧收窄。"
    },
    "platformized-sales": {
      name: "渠道平台化",
      note: "渠道和平台掌握流量与热度，也会把折扣、佣金和退房压力推回项目。"
    },
    "diversification-fantasy": {
      name: "多元化幻觉",
      note: "主营现金流没有修复时，文旅、汽车、足球和金融故事会把资金链拉得更长。"
    },
    "government-permit-power": {
      name: "政府卡口权力",
      note: "房地产不是普通商品生意，土地、规划、预售、监管账户、白名单、专班和国资接盘都在政府卡口上。关系太浅会被卡，关系太深会被绑定。"
    },
    "counterparty-retaliation": {
      name: "关联方反噬",
      note: "总包、供应商、银行、业主、渠道和合作方都有承受极限。反噬本身不应抽象扣现金；现金下降必须来自结清、和解、换人进场费、停工损失、保全冻结、付息到期等具体动作。"
    },
    "competitor-pressure": {
      name: "竞争对手打击",
      note: "同行不是背景板。竞品会降价、抢渠道、举报规划和资金问题、围标卡地、趁你现金紧时抢走买方和政府信任。"
    },
    "protective-umbrella-risk": {
      name: "保护伞风险",
      note: "灰色协调看似提高效率，但一旦进入扫黑、反腐或换届倒查，保护伞会变成最清楚的证据链。"
    }
  },
  events: [
    {
      id: "first-land-deposit",
      title: "保证金、工资、商票，今晚只能付一张",
      phase: ["early-expansion"],
      minScale: 0,
      maxScale: 2,
      severity: "pressure",
      sourceEpisodes: ["EP124", "EP126"],
      modelTags: ["land-finance-loop", "leverage-backfire"],
      briefing: "你第一次有机会从包工头变成开发商：云江县东郊一块小地明天交保证金。问题是账上只有一笔钱，工人工资、供应商商票、土拍保证金三件事今晚必须选一个。你签哪张付款单？",
      actors: [
        { role: "区县领导", text: "你先把地拿下来，后面配套会跟上，云江需要一个本地房企样板。" },
        { role: "施工队长", text: "老板，工资再拖两周，工人就要去售楼处拉横幅了。" },
        { role: "财务", text: "商票这周不兑，供应商以后就只认现金，不认你的脸。" }
      ],
      choices: [
        {
          id: "pay-deposit",
          label: "交保证金，先把地锁住",
          visibleEffects: { cash: -13, land_bank: 14, government: 6, delivery: -2 },
          hiddenEffects: { political_dependency: 7, delivery_pressure: 5, off_balance_debt: 4 },
          relationEffects: { local_official: 7, contractor: -5, suppliers: -4 },
          models: ["land-finance-loop", "leverage-backfire"],
          blowupRisk: 0.08,
          scaleScore: 8,
          consequence: "你拿到了第一块地，也把工资和商票问题往后挪了一格。机会开始变成现金黑洞。",
          missed: "你把土地当成资产，但它在开发完成前先是一张不断吞钱的付款表。",
          lesson: "土地财政给房企入口，也把房企绑进地方预期。第一课不是敢不敢拿地，而是拿地后谁替你续现金。"
        },
        {
          id: "pay-workers",
          label: "先发工资，地块让别人拍走",
          visibleEffects: { cash: -8, delivery: 8, public_trust: 4, government: -5, land_bank: -3 },
          hiddenEffects: { political_dependency: -3, delivery_pressure: -5 },
          relationEffects: { contractor: 9, local_official: -5 },
          models: ["delivery-first", "exit-discipline"],
          blowupRisk: 0.03,
          scaleScore: 2,
          consequence: "工地稳住了，但领导记住了你在关键机会前缩手。",
          missed: "稳是活法，但早期房地产游戏里，没有项目就没有下一轮信用。",
          lesson: "小开发商不能只谈风险厌恶。没有土地和销售故事，银行、地方和渠道都不会围着你转。"
        },
        {
          id: "roll-commercial-paper",
          label: "兑商票，保证供应商别先翻脸",
          visibleEffects: { cash: -10, bank: 1, public_trust: 1, land_bank: -1 },
          hiddenEffects: { off_balance_debt: -5, political_dependency: -1 },
          relationEffects: { suppliers: 8, local_official: -3 },
          models: ["balance-sheet-maintenance", "risk-transfer-chain"],
          blowupRisk: 0.04,
          scaleScore: 3,
          consequence: "供应商暂时信你，但你错过了地块。你保住了信用，没拿到故事。",
          missed: "商业信用也是资产，但房地产上行期的奖励通常给扩张者，不给谨慎者。",
          lesson: "保信用会让你慢一点；盲目扩张会让你死得更快。游戏会不断逼你在这两者中切换。"
        }
      ]
    },
    {
      id: "contractor-payment",
      title: "工地明早停不停，就看今晚付谁",
      phase: ["early-expansion", "shelter-reform-boom", "sales-freeze", "guaranteed-delivery"],
      minScale: 0,
      maxScale: 5,
      severity: "pressure",
      sourceEpisodes: ["EP126", "EP031"],
      modelTags: ["risk-transfer-chain", "balance-sheet-maintenance"],
      briefing: "你拿下地以后，工地开始吞钱。总包给出最后期限：今晚 12 点前不到账，明早塔吊停、工人撤、业主群会看到照片。现金只够补一半，你必须决定让谁先活下来。",
      actors: [
        { role: "总包老板", text: "不到账，明早塔吊就停。我不闹，我让现场自己说话。" },
        { role: "财务总监", text: "付工程款，售楼处推广就断；保销售费用，现场就断。" },
        { role: "工程经理", text: "停一天是协调，停一周就是事故苗头。" }
      ],
      choices: [
        {
          id: "pay-cash",
          label: "拿现金补工程款，售楼处推广先砍掉",
          visibleEffects: { cash: -12, delivery: 10, sales: -5, public_trust: 4 },
          hiddenEffects: { delivery_pressure: -7, presale_misuse: -1 },
          relationEffects: { contractor: 8, channel: -4 },
          models: ["delivery-first"],
          blowupRisk: 0.05,
          scaleScore: 4,
          consequence: "工地继续转，售楼处冷了下来。你保住工程，牺牲去化。",
          missed: "交付不是美德口号，是现金分配顺序。砍销售会让下一轮回款更慢。",
          lesson: "房地产现金流的残酷在于：保交付和保销售经常抢同一笔钱。"
        },
        {
          id: "issue-paper",
          label: "开商票给总包：账上好看，期限往后",
          visibleEffects: { cash: 1, delivery: 5, bank: 2 },
          hiddenEffects: { off_balance_debt: 9, delivery_pressure: 2, boss_safety: -2 },
          relationEffects: { contractor: 2, suppliers: -2 },
          models: ["balance-sheet-maintenance", "risk-transfer-chain"],
          blowupRisk: 0.1,
          scaleScore: 6,
          consequence: "工地继续，但真实负债从银行表内转到供应链后面。",
          missed: "商票不是魔法，它只是把“今天不给钱”改名成“以后必须给钱”。",
          lesson: "体外债务最危险的地方，是它能让老板误以为自己还有空间。"
        },
        {
          id: "replace-contractor",
          label: "威胁换总包，逼他继续垫资",
          visibleEffects: { cash: 2, delivery: -6, government: 1 },
          hiddenEffects: { gray_risk: 4, off_balance_debt: 5, delivery_pressure: 8, boss_safety: -3 },
          relationEffects: { contractor: -12, suppliers: -6 },
          models: ["risk-transfer-chain", "gray-governance"],
          blowupRisk: 0.15,
          scaleScore: 2,
          consequence: "会议散了，工地没有立刻停，但几个班组开始私下联系媒体。",
          missed: "你用甲方权力压下了付款问题，却把对手从合同桌推向舆情场。",
          lesson: "房地产链条里，被转移风险的一方迟早会找新的杠杆。"
        }
      ]
    },
    {
      id: "presale-permit",
      title: "预售证还差一层楼",
      phase: ["early-expansion", "shelter-reform-boom", "high-turnover"],
      minScale: 0,
      maxScale: 4,
      severity: "high",
      sourceEpisodes: ["EP126", "EP114"],
      modelTags: ["presale-cashflow-trap", "data-inflation"],
      briefing: "工程进度还差一层，销售团队说再不开盘客户就被隔壁抢走。住建窗口的人暗示材料可以“先走流程”，但预售款监管账户会盯得越来越紧。",
      actors: [
        { role: "销售总", text: "热度只有两周，错过就要多花三个月渠道费。" },
        { role: "住建窗口", text: "材料怎么写是你们的事，出了问题也是你们的事。" },
        { role: "工程经理", text: "楼还没到节点，照片能拍角度，混凝土骗不了人。" }
      ],
      choices: [
        {
          id: "push-presale",
          label: "先开盘回款，把工程节点补上",
          visibleEffects: { cash: 14, sales: 10, delivery: -4, government: 2 },
          hiddenEffects: { presale_misuse: 8, delivery_pressure: 10, price_bubble: 4, boss_safety: -3 },
          relationEffects: { buyers: -2, local_official: 3 },
          models: ["presale-cashflow-trap", "leverage-backfire"],
          blowupRisk: 0.16,
          scaleScore: 10,
          consequence: "回款来了，工程欠账也被你带进了未来。",
          missed: "预售款救了今天，也制造了明天必须交付的刚性责任。",
          lesson: "中国房地产的高周转依赖预售，但预售不是利润，而是带着购房人名字的负债。"
        },
        {
          id: "wait-progress",
          label: "等工程节点，不抢这一波开盘",
          visibleEffects: { cash: -5, sales: -6, delivery: 8, public_trust: 4, bank: -2 },
          hiddenEffects: { presale_misuse: -4, delivery_pressure: -5, price_bubble: -2 },
          relationEffects: { buyers: 5, channel: -5 },
          models: ["delivery-first", "exit-discipline"],
          blowupRisk: 0.04,
          scaleScore: 2,
          consequence: "你错过热度，留下更干净的交付链。",
          missed: "慢一点能减少责任，但销售窗口未必等你。",
          lesson: "保守不是永远正确。它降低刑责和烂尾概率，也会降低规模跃迁速度。"
        },
        {
          id: "vip-internal-sale",
          label: "做内部认购，先收意向金不算正式销售",
          visibleEffects: { cash: 7, sales: 6, public_trust: -2 },
          hiddenEffects: { data_inflation: 8, presale_misuse: 5, delivery_pressure: 5, boss_safety: -2 },
          relationEffects: { channel: 6, buyers: -3 },
          models: ["data-inflation", "phantom-demand"],
          blowupRisk: 0.11,
          scaleScore: 7,
          consequence: "认购表好看了，但真实网签和回款仍然隔着一道门。",
          missed: "你把意向、签约、回款混在一起，让自己也开始相信热度。",
          lesson: "EP114 的核心在这里：数字口径一乱，老板最先被自己的报表骗。"
        }
      ]
    },
    {
      id: "fake-showroom-heat",
      title: "售楼处缺的不是客户，是人气",
      phase: ["early-expansion", "shelter-reform-boom", "high-turnover"],
      minScale: 0,
      maxScale: 5,
      severity: "routine",
      sourceEpisodes: ["EP114", "EP125"],
      modelTags: ["phantom-demand", "platformized-sales"],
      briefing: "周末开盘，真实客户只登记了 37 组。渠道公司给了一个方案：雇人排队、直播间刷热度、样板间只拍局部。销售总说“先把气氛做起来，成交会自己来”。",
      actors: [
        { role: "渠道经理", text: "买房也是买信心，信心可以先搭出来。" },
        { role: "案场经理", text: "空场比降价还可怕。" },
        { role: "老销售", text: "假热度能骗客户，也能骗老板。" }
      ],
      choices: [
        {
          id: "hire-crowd",
          label: "花钱做热场，把售楼处塞满",
          visibleEffects: { cash: -5, sales: 9, public_trust: -2 },
          hiddenEffects: { price_bubble: 7, diversification_fantasy: 1 },
          relationEffects: { channel: 8, media: 2 },
          models: ["phantom-demand", "platformized-sales"],
          blowupRisk: 0.09,
          scaleScore: 6,
          consequence: "当天照片很好看，真实转化率不够好看。",
          missed: "你买到了热闹，却没有买到购买力。",
          lesson: "房地产的虚假繁荣往往不是造假一个数字，而是让所有人一起选择只看好看的数字。"
        },
        {
          id: "cut-price-now",
          label: "直接给首批客户真实折扣",
          visibleEffects: { cash: 4, sales: 8, public_trust: 2, land_bank: -2 },
          hiddenEffects: { price_bubble: -5, delivery_pressure: 2 },
          relationEffects: { buyers: 5, channel: -2 },
          models: ["exit-discipline"],
          blowupRisk: 0.06,
          scaleScore: 5,
          consequence: "真实成交变多，但价格锚被你亲手打低。",
          missed: "现金回来了，老业主和银行估值会记住这个折扣。",
          lesson: "降价是现金流工具，也是信用冲击。下行期它会变成更大的政治和舆情问题。"
        },
        {
          id: "slow-sales",
          label: "承认冷清，缩小开盘规模",
          visibleEffects: { cash: -4, sales: -2, public_trust: 4, bank: -1 },
          hiddenEffects: { price_bubble: -4, data_inflation: -3 },
          relationEffects: { channel: -4, buyers: 4 },
          models: ["data-inflation", "exit-discipline"],
          blowupRisk: 0.03,
          scaleScore: 1,
          consequence: "你少卖了一些，也少骗了自己一些。",
          missed: "真实会保护你，但也会让融资方觉得你不够会讲故事。",
          lesson: "不上头是能力，但房地产上行期会惩罚不上头的人。"
        }
      ]
    },
    {
      id: "demolition-nail-house",
      title: "三户不签，土方老板说他能处理",
      phase: ["early-expansion", "shelter-reform-boom", "high-turnover"],
      minScale: 0,
      maxScale: 3,
      severity: "high",
      sourceEpisodes: ["EP004", "EP126"],
      modelTags: ["gray-governance", "political-embedded-enterprise"],
      briefing: "项目入口还卡着三户没签。正规谈判至少两个月，贷款节点等不了。土方老板把车钥匙放在桌上，说“三天清场，不留麻烦”。街道只说别出事，银行只问什么时候开工。",
      actors: [
        { role: "土方老板", text: "给我三天，我保证现场干净。" },
        { role: "街道干部", text: "别出事。别留下视频。别让我接电话。" },
        { role: "银行客户经理", text: "开工节点卡着，贷款也卡着。" }
      ],
      choices: [
        {
          id: "gray-pressure",
          label: "让土方老板出面，三天清场",
          visibleEffects: { cash: 3, land_bank: 6, government: 3, delivery: 3 },
          hiddenEffects: { gray_risk: 16, boss_safety: -10, political_dependency: 4 },
          relationEffects: { underground: 12, local_official: 3, buyers: -3 },
          models: ["gray-governance", "political-embedded-enterprise"],
          blowupRisk: 0.24,
          scaleScore: 8,
          consequence: "现场推进很快，但你的项目从商业问题跨进了治安和信访账本。",
          missed: "你得到的是速度，付出的是未来被串案的入口。",
          lesson: "黑灰力量最像捷径的地方，就是它把短期执行力换成长期刑事风险。"
        },
        {
          id: "raise-compensation",
          label: "加补偿，砍掉项目利润",
          visibleEffects: { cash: -12, land_bank: 4, public_trust: 7, delivery: 2 },
          hiddenEffects: { gray_risk: -5, boss_safety: 3, political_dependency: -2 },
          relationEffects: { buyers: 4, underground: -6 },
          models: ["delivery-first", "exit-discipline"],
          blowupRisk: 0.05,
          scaleScore: 2,
          consequence: "你花钱买了平稳，但项目利润被压薄。",
          missed: "合法路径不是免费路径，小开发商最缺的恰恰是承受合法成本的现金。",
          lesson: "合规经常更贵。问题是你有没有足够现金支付这笔合规成本。"
        },
        {
          id: "wait-mediation",
          label: "等街道调解，开工节点顺延",
          visibleEffects: { cash: -4, delivery: -2, bank: -4, public_trust: 3 },
          hiddenEffects: { gray_risk: -4, delivery_pressure: 4, boss_safety: 2 },
          relationEffects: { local_official: -2, bank_manager: -5 },
          models: ["risk-transfer-chain"],
          blowupRisk: 0.07,
          scaleScore: 1,
          consequence: "矛盾没有激化，贷款节点也没等你。",
          missed: "慢处理能降刑事风险，也会让金融链条先失去耐心。",
          lesson: "房地产不是单线道德题，慢一点可能正确，但金融成本会继续计息。"
        }
      ]
    },
    {
      id: "lgfv-joint-venture",
      title: "城投递来一份联合开发协议",
      phase: ["early-expansion", "shelter-reform-boom", "three-red-lines", "clearance"],
      minScale: 0,
      maxScale: 5,
      severity: "pressure",
      sourceEpisodes: ["EP012", "EP037", "EP078", "EP124"],
      modelTags: ["political-embedded-enterprise", "land-finance-loop"],
      briefing: "城投愿意和你成立项目公司。好处是地、银行和审批都更顺；代价是重大事项要一起签，收益分配要让一步，项目也会带上地方任务。",
      actors: [
        { role: "城投副总", text: "我们不抢你饭碗，但项目要服务全县大局。" },
        { role: "银行行长", text: "有城投在，授信会上好说。" },
        { role: "你的律师", text: "协议里每个“原则上”，以后都可能变成你让步。" }
      ],
      choices: [
        {
          id: "accept-lgfv",
          label: "接受城投入股，先把信用做起来",
          visibleEffects: { government: 10, bank: 10, cash: 5, land_bank: 6 },
          hiddenEffects: { political_dependency: 12, boss_safety: -2 },
          relationEffects: { state_capital: 9, local_official: 7 },
          models: ["political-embedded-enterprise", "land-finance-loop"],
          blowupRisk: 0.08,
          scaleScore: 11,
          consequence: "信用突然变厚，控制权也开始变薄。",
          missed: "你以为自己借了地方信用，地方也开始把你当作风险处置工具。",
          lesson: "政企嵌入的核心不是谁占便宜，而是谁在危机时有权重新解释协议。"
        },
        {
          id: "project-level-coop",
          label: "只做单项目合作，不让城投进母公司",
          visibleEffects: { government: 4, bank: 4, land_bank: 4 },
          hiddenEffects: { political_dependency: 4, off_balance_debt: 2 },
          relationEffects: { state_capital: 3, local_official: 2 },
          models: ["political-embedded-enterprise", "exit-discipline"],
          blowupRisk: 0.05,
          scaleScore: 6,
          consequence: "你拿到一点背书，也留下边界。",
          missed: "边界会降低速度，也会让地方觉得你不够听话。",
          lesson: "和地方合作最重要的是边界。边界越清楚，爆雷时越不容易被无限追责。"
        },
        {
          id: "reject-lgfv",
          label: "拒绝入股，自己慢慢做",
          visibleEffects: { government: -7, bank: -4, cash: -2, public_trust: 2 },
          hiddenEffects: { political_dependency: -5, boss_safety: 3 },
          relationEffects: { state_capital: -5, local_official: -5 },
          models: ["exit-discipline"],
          blowupRisk: 0.04,
          scaleScore: 1,
          consequence: "你保住独立，也失去一扇门。",
          missed: "小房企如果完全拒绝地方信用，很难跨过第一道规模门槛。",
          lesson: "独立不是免费资产。它保护你，也限制你。"
        }
      ]
    },
    {
      id: "new-district-metro-rumor",
      title: "新区地铁还在图纸上",
      phase: ["early-expansion", "shelter-reform-boom", "high-turnover"],
      minScale: 1,
      maxScale: 5,
      severity: "pressure",
      sourceEpisodes: ["EP124", "EP114"],
      modelTags: ["land-finance-loop", "phantom-demand"],
      briefing: "区里递话：新区要做形象，你最好再拿一块地。销售团队已经把“地铁口生活”写进海报，但你看到的文件只有“远景研究”。",
      actors: [
        { role: "新区管委会", text: "城市要往东走，你们企业也要有城市格局。" },
        { role: "营销负责人", text: "不写地铁，客户不会来；写了地铁，客户会自己想象。" },
        { role: "投拓经理", text: "地价不低，但如果规划兑现，就是翻身。" }
      ],
      choices: [
        {
          id: "buy-new-district",
          label: "跟新区叙事走，再拿一块地",
          visibleEffects: { cash: -14, debt: 12, land_bank: 15, government: 8, sales: 4 },
          hiddenEffects: { political_dependency: 8, price_bubble: 8, delivery_pressure: 5 },
          relationEffects: { local_official: 8, bank_manager: 2 },
          models: ["land-finance-loop", "leverage-backfire"],
          blowupRisk: 0.14,
          scaleScore: 12,
          consequence: "你站上新区故事，也把现金押给一个尚未兑现的规划。",
          missed: "规划是预期，不是现金流。地铁没来之前，利息每天都来。",
          lesson: "土地财政和基建叙事会把房价预期推高，但房企承担的是实际付款和交付。"
        },
        {
          id: "wait-approval",
          label: "等正式批复，放弃首轮窗口",
          visibleEffects: { cash: 1, debt: -2, government: -4, sales: -2 },
          hiddenEffects: { price_bubble: -3, political_dependency: -2 },
          relationEffects: { local_official: -5 },
          models: ["exit-discipline"],
          blowupRisk: 0.03,
          scaleScore: 1,
          consequence: "你没有上车，也没有被车带进沟里。",
          missed: "不追新区会错过上行期的杠杆红利。",
          lesson: "房地产最难的是分辨：这是城市趋势，还是被包装成趋势的财政需求。"
        },
        {
          id: "lowball-partner",
          label: "找城投兜底，自己只出小股",
          visibleEffects: { cash: -5, land_bank: 8, government: 5, bank: 4 },
          hiddenEffects: { political_dependency: 10, off_balance_debt: 4 },
          relationEffects: { state_capital: 6, local_official: 4 },
          models: ["political-embedded-enterprise", "risk-transfer-chain"],
          blowupRisk: 0.09,
          scaleScore: 7,
          consequence: "你少出钱，多欠人情。",
          missed: "小股不等于小责任。地方项目出事，参与者都会被点名。",
          lesson: "用城投降低现金压力，会提高政治依赖和处置时的被动性。"
        }
      ]
    },
    {
      id: "shelter-reform-boom",
      title: "棚改款像潮水一样涌进县城",
      phase: ["shelter-reform-boom"],
      minScale: 1,
      maxScale: 4,
      severity: "high",
      sourceEpisodes: ["EP031", "EP126"],
      modelTags: ["phantom-demand", "leverage-backfire"],
      briefing: "拆迁户拿到货币化补偿，售楼处突然排队。隔壁项目三天涨了两次价。投拓团队建议马上复制到周边三个县，银行也愿意给更高授信。",
      actors: [
        { role: "投拓总", text: "这是窗口，窗口不会等人。" },
        { role: "银行行长", text: "你们销售起来了，授信额度可以谈。" },
        { role: "老财务", text: "补偿款是一次性的，人口不是一次性变多的。" }
      ],
      choices: [
        {
          id: "copy-to-counties",
          label: "复制到三个县，做区域房企",
          visibleEffects: { cash: 8, debt: 18, land_bank: 18, sales: 14, government: 5 },
          hiddenEffects: { price_bubble: 14, off_balance_debt: 8, delivery_pressure: 10, boss_safety: -4 },
          relationEffects: { bank_manager: 8, local_official: 6 },
          models: ["leverage-backfire", "phantom-demand"],
          blowupRisk: 0.18,
          scaleScore: 18,
          consequence: "你第一次感觉自己像个区域房企。债务也第一次像区域房企。",
          missed: "棚改需求有政策节奏，不能自动外推成长期购买力。",
          lesson: "下沉市场卖爆最容易让老板误判：这是居民真实收入，还是政策性现金流。"
        },
        {
          id: "one-city-only",
          label: "只加码本城，把交付做成样板",
          visibleEffects: { cash: 3, debt: 5, delivery: 10, public_trust: 6, sales: 5 },
          hiddenEffects: { delivery_pressure: 2, price_bubble: 2 },
          relationEffects: { buyers: 6, local_official: 3 },
          models: ["delivery-first", "exit-discipline"],
          blowupRisk: 0.07,
          scaleScore: 8,
          consequence: "你没吃完整波红利，但项目口碑变扎实。",
          missed: "稳扎稳打也可能错过融资窗口，后来的钱未必这么好借。",
          lesson: "周期红利来了，不一定要全吃；吃多少取决于你能交多少。"
        },
        {
          id: "raise-price-hold-inventory",
          label: "捂盘涨价，等补偿款继续进来",
          visibleEffects: { cash: -3, sales: 6, land_bank: 8, public_trust: -6 },
          hiddenEffects: { price_bubble: 16, data_inflation: 7, political_dependency: 2 },
          relationEffects: { buyers: -8, media: -2 },
          models: ["phantom-demand", "balance-sheet-maintenance"],
          blowupRisk: 0.15,
          scaleScore: 10,
          consequence: "报价更高，成交更慢，售楼处开始解释“惜售”。",
          missed: "你把库存当成升值资产，却忘了利息会追着库存跑。",
          lesson: "账面涨价不能替代现金回款。高价库存会在拐点变成负债。"
        }
      ]
    },
    {
      id: "trust-money-arrives",
      title: "信托经理带着快钱上门",
      phase: ["shelter-reform-boom", "high-turnover", "three-red-lines"],
      minScale: 1,
      maxScale: 5,
      severity: "high",
      sourceEpisodes: ["EP031", "EP046", "EP126"],
      modelTags: ["leverage-backfire", "balance-sheet-maintenance"],
      briefing: "信托经理说额度很紧，但看好你们项目。钱快、利率高、结构复杂。合同里有回购、担保、差额补足和一个你看不懂的优先级安排。",
      actors: [
        { role: "信托经理", text: "银行慢，我们快。好企业要抓住窗口。" },
        { role: "法务", text: "这些条款不是不能签，是签了以后不能装作没看见。" },
        { role: "投拓总", text: "没有这笔钱，下个月土拍就只能看别人举牌。" }
      ],
      choices: [
        {
          id: "take-trust",
          label: "接受信托资金，继续拿地",
          visibleEffects: { cash: 18, debt: 16, land_bank: 12, bank: 2 },
          hiddenEffects: { off_balance_debt: 14, delivery_pressure: 4, boss_safety: -4 },
          relationEffects: { trust_channel: 12, bank_manager: -1 },
          models: ["leverage-backfire", "balance-sheet-maintenance"],
          blowupRisk: 0.2,
          scaleScore: 16,
          consequence: "钱到账很快，计息也很快。",
          missed: "你把资金缺口变成更贵的资金缺口。",
          lesson: "高成本钱最适合短周转，最怕销售变慢。它能让你扩张，也会让你没有回头路。"
        },
        {
          id: "use-trust-to-finish",
          label: "只借一半，专门补工程节点",
          visibleEffects: { cash: 7, debt: 8, delivery: 9, sales: 3 },
          hiddenEffects: { off_balance_debt: 5, delivery_pressure: -3 },
          relationEffects: { trust_channel: 4, contractor: 5 },
          models: ["delivery-first", "leverage-backfire"],
          blowupRisk: 0.09,
          scaleScore: 8,
          consequence: "你用贵钱换交付进度，利润被吃掉一截。",
          missed: "贵钱用在交付上比拿地安全，但仍然会抬高现金流门槛。",
          lesson: "借钱不是原罪，关键是借来的钱流向新增风险，还是流向降低风险。"
        },
        {
          id: "refuse-trust",
          label: "拒绝信托，卖掉一块边角地回血",
          visibleEffects: { cash: 9, debt: -6, land_bank: -7, government: -2 },
          hiddenEffects: { off_balance_debt: -5, boss_safety: 3 },
          relationEffects: { trust_channel: -6, local_official: -2 },
          models: ["exit-discipline"],
          blowupRisk: 0.04,
          scaleScore: 2,
          consequence: "你被同行说保守，但账上终于有自由现金。",
          missed: "卖资产会降低未来故事，但也给你活过周期的可能。",
          lesson: "退出纪律不是等到爆雷才卖，而是在还能卖出价格时卖。"
        }
      ]
    },
    {
      id: "high-turnover-meeting",
      title: "集团会：从拿地到开盘只给你 87 天",
      phase: ["high-turnover"],
      minScale: 2,
      maxScale: 5,
      severity: "high",
      sourceEpisodes: ["EP031", "EP126", "EP114"],
      modelTags: ["leverage-backfire", "presale-cashflow-trap"],
      briefing: "你第一次像大房企一样开集团会。运营总拿出一张高周转表：87 天开盘，6 个月现金回正。工程、设计、营销、成本全都要压缩。",
      actors: [
        { role: "运营总", text: "慢就是死。标准化才能复制，复制才能排名。" },
        { role: "设计经理", text: "再压周期，图纸错漏会进现场。" },
        { role: "成本经理", text: "材料可以降一档，但售后会回来找你。" }
      ],
      choices: [
        {
          id: "full-high-turnover",
          label: "全面高周转，排名先冲上去",
          visibleEffects: { cash: 12, debt: 12, sales: 12, land_bank: 8, delivery: -8 },
          hiddenEffects: { delivery_pressure: 14, presale_misuse: 8, price_bubble: 6, boss_safety: -5 },
          relationEffects: { channel: 8, contractor: -5, buyers: -4 },
          models: ["leverage-backfire", "presale-cashflow-trap"],
          blowupRisk: 0.22,
          scaleScore: 20,
          consequence: "排名上去了，工地和交付被你压成一根弦。",
          missed: "高周转把速度变成信仰，也把错误复制到每个项目。",
          lesson: "高周转不是一个运营技巧，而是一整套借未来交付换今天现金的体系。"
        },
        {
          id: "standardize-but-keep-quality",
          label: "只标准化户型，不压工程安全节点",
          visibleEffects: { cash: 4, debt: 5, sales: 6, delivery: 5 },
          hiddenEffects: { delivery_pressure: 2, presale_misuse: 2 },
          relationEffects: { contractor: 3, channel: 2 },
          models: ["delivery-first", "leverage-backfire"],
          blowupRisk: 0.08,
          scaleScore: 9,
          consequence: "你慢了同行一步，但少埋了几颗雷。",
          missed: "中间道路不性感，也不容易拿到最高估值。",
          lesson: "复制能力有价值，前提是复制的是可交付的产品，不是可复制的风险。"
        },
        {
          id: "delay-launch",
          label: "延迟开盘，先把图纸和现场对齐",
          visibleEffects: { cash: -8, sales: -4, delivery: 10, bank: -3 },
          hiddenEffects: { delivery_pressure: -7, boss_safety: 2 },
          relationEffects: { contractor: 6, buyers: 3, channel: -4 },
          models: ["delivery-first", "exit-discipline"],
          blowupRisk: 0.05,
          scaleScore: 3,
          consequence: "你没有冲上榜单，但交付链变稳。",
          missed: "质量不是免费护身符，它会消耗现金和窗口。",
          lesson: "房地产企业的道德选择最后都会回到现金流：你有没有钱支持自己慢下来。"
        }
      ]
    },
    {
      id: "school-district-promise",
      title: "销售海报上多了一所学校",
      phase: ["shelter-reform-boom", "high-turnover"],
      minScale: 1,
      maxScale: 5,
      severity: "pressure",
      sourceEpisodes: ["EP124", "EP114"],
      modelTags: ["phantom-demand", "political-embedded-enterprise"],
      briefing: "教育配套还没落章，营销已经把“名校旁”写进海报。区里说学校会尽力协调，但不希望你写得太死。客户最在乎的又正是这个。",
      actors: [
        { role: "营销负责人", text: "不写学校，这个价撑不住。" },
        { role: "区教育口", text: "原则上会配套，但你别替我们承诺时间。" },
        { role: "客户代表", text: "我们买的是学位，不是原则上。" }
      ],
      choices: [
        {
          id: "promise-school",
          label: "写进海报：名校配套，限时认购",
          visibleEffects: { sales: 12, cash: 8, public_trust: -2 },
          hiddenEffects: { price_bubble: 9, political_dependency: 5, boss_safety: -3 },
          relationEffects: { buyers: -3, local_official: -1, media: 2 },
          models: ["phantom-demand", "data-inflation"],
          blowupRisk: 0.14,
          scaleScore: 10,
          consequence: "成交上来了，承诺也写进了未来纠纷。",
          missed: "你把不确定的公共资源卖成确定商品。",
          lesson: "房企最常见的风险之一，是把地方公共服务预期包装进房价。"
        },
        {
          id: "vague-school",
          label: "只写规划利好，不写入合同",
          visibleEffects: { sales: 5, cash: 3, public_trust: -1 },
          hiddenEffects: { price_bubble: 4, political_dependency: 3 },
          relationEffects: { buyers: -1, local_official: 2 },
          models: ["political-embedded-enterprise", "phantom-demand"],
          blowupRisk: 0.08,
          scaleScore: 5,
          consequence: "你卖了一点预期，留下了一点退路。",
          missed: "模糊口径可以减轻法律责任，但不能消除购房人的心理落差。",
          lesson: "口径越模糊，短期越顺；事后维权时，信任损耗越难修。"
        },
        {
          id: "no-school-marketing",
          label: "不卖学校，只按产品和价格卖",
          visibleEffects: { sales: -4, cash: -3, public_trust: 5 },
          hiddenEffects: { price_bubble: -5, boss_safety: 2 },
          relationEffects: { buyers: 4, channel: -4 },
          models: ["exit-discipline"],
          blowupRisk: 0.03,
          scaleScore: 1,
          consequence: "客户少了一些，纠纷也少了一些。",
          missed: "真实表达会降低溢价，这就是诚实的价格。",
          lesson: "好的商业不是永远讲满，而是知道哪些预期不能卖成承诺。"
        }
      ]
    },
    {
      id: "old-owners-price-cut",
      title: "老业主把横幅做得很专业",
      phase: ["three-red-lines", "sales-freeze", "guaranteed-delivery"],
      minScale: 1,
      maxScale: 5,
      severity: "high",
      sourceEpisodes: ["EP031", "EP101"],
      modelTags: ["risk-transfer-chain", "phantom-demand"],
      briefing: "销售腰斩，现金快断。你准备降价促销，老业主已经在群里组织“退差价”。横幅、短视频、媒体联系人都准备好了。",
      actors: [
        { role: "销售总", text: "不降价这个月回款过不了线。" },
        { role: "老业主代表", text: "你敢降，我们就让新客户看看你怎么对老客户。" },
        { role: "银行客户经理", text: "价格下去，抵押物估值也会下去。" }
      ],
      choices: [
        {
          id: "deep-discount",
          label: "大幅降价，先把现金打回来",
          visibleEffects: { cash: 15, sales: 14, public_trust: -12, bank: -5, land_bank: -4 },
          hiddenEffects: { price_bubble: -9, delivery_pressure: -2, boss_safety: -4 },
          relationEffects: { buyers: -12, bank_manager: -5, media: -5 },
          models: ["exit-discipline", "risk-transfer-chain"],
          blowupRisk: 0.18,
          scaleScore: 6,
          consequence: "新客户来了，老业主也来了。",
          missed: "降价救现金，但会刺破前期价格叙事。",
          lesson: "下行期降价是商业理性，却会触发业主、银行和地方稳定三重压力。"
        },
        {
          id: "secret-discount",
          label: "不公开降价，给渠道暗折",
          visibleEffects: { cash: 8, sales: 9, public_trust: -5 },
          hiddenEffects: { data_inflation: 6, price_bubble: 2, boss_safety: -3 },
          relationEffects: { channel: 8, buyers: -6 },
          models: ["platformized-sales", "data-inflation"],
          blowupRisk: 0.13,
          scaleScore: 6,
          consequence: "表面价格稳住，实际折扣开始在中介群里流动。",
          missed: "暗折不是真的不降价，只是把矛盾交给渠道扩散。",
          lesson: "价格体系一旦双轨，信任损耗会比公开降价更难控制。"
        },
        {
          id: "no-discount-pay-construction",
          label: "不降价，砍拿地和广告保交付",
          visibleEffects: { cash: -5, sales: -6, delivery: 10, public_trust: 5, government: 2 },
          hiddenEffects: { delivery_pressure: -8, price_bubble: 3 },
          relationEffects: { buyers: 7, contractor: 5, channel: -5 },
          models: ["delivery-first"],
          blowupRisk: 0.08,
          scaleScore: 3,
          consequence: "销售更慢，工地更稳。",
          missed: "不降价保护老业主，也可能让现金流死在账面价格上。",
          lesson: "保价格和保交付都不是绝对正确，关键看现金还能撑几个月。"
        }
      ]
    },
    {
      id: "presale-supervision-account",
      title: "监管账户锁住了你的救命钱",
      phase: ["three-red-lines", "sales-freeze", "guaranteed-delivery"],
      minScale: 1,
      maxScale: 5,
      severity: "crisis",
      sourceEpisodes: ["EP126", "EP101"],
      modelTags: ["presale-cashflow-trap", "delivery-first"],
      briefing: "预售款进入监管账户。你有一笔信托下周到期，另一个项目也等钱复工。住建专班明确说：这笔钱只能用于本项目交付。",
      actors: [
        { role: "住建专班", text: "钱在项目里，不在你集团里。" },
        { role: "信托经理", text: "你不还，我们就触发交叉违约。" },
        { role: "项目总", text: "这笔钱一走，本项目就停。" }
      ],
      choices: [
        {
          id: "respect-account",
          label: "尊重监管账户，只用于本项目复工",
          visibleEffects: { delivery: 14, public_trust: 8, cash: -2, debt: 4, bank: -3 },
          hiddenEffects: { presale_misuse: -8, delivery_pressure: -12, boss_safety: 5, off_balance_debt: 4 },
          relationEffects: { buyers: 8, contractor: 5, trust_channel: -6 },
          models: ["delivery-first", "presale-cashflow-trap"],
          blowupRisk: 0.08,
          scaleScore: 3,
          consequence: "楼动起来了，集团债务更难看了。",
          missed: "保项目可能牺牲集团信用，但危机期政策优先级就是保交付。",
          lesson: "保交楼时代救的是房子和稳定，不一定救房企老板。"
        },
        {
          id: "move-presale-money",
          label: "找关系划走一部分，先还最急的债",
          visibleEffects: { cash: 10, debt: -8, delivery: -9, bank: 2 },
          hiddenEffects: { presale_misuse: 18, delivery_pressure: 16, boss_safety: -14 },
          relationEffects: { local_official: -5, buyers: -10, trust_channel: 4 },
          models: ["presale-cashflow-trap", "risk-transfer-chain"],
          blowupRisk: 0.32,
          scaleScore: 5,
          consequence: "最急的债压下去了，最清楚的责任链也形成了。",
          missed: "你救了债权人，却把购房人的交付钱动了。",
          lesson: "预售挪用不是单纯财务动作，它会在保交楼阶段直接变成问责线索。"
        },
        {
          id: "negotiate-closed-loop",
          label: "让政府、银行、总包做封闭回款方案",
          visibleEffects: { delivery: 8, government: 4, bank: 3, cash: -4 },
          hiddenEffects: { political_dependency: 5, delivery_pressure: -6, boss_safety: 2 },
          relationEffects: { local_official: 5, bank_manager: 4, contractor: 4 },
          models: ["political-embedded-enterprise", "delivery-first"],
          blowupRisk: 0.12,
          scaleScore: 6,
          consequence: "你保住项目，但从此每笔钱都要被别人看着用。",
          missed: "封闭管理能救交付，也会削弱老板自由。",
          lesson: "危机处置的代价是控制权。你越需要协调，越不像完整的市场主体。"
        }
      ]
    },
    {
      id: "bank-loan-withdrawal",
      title: "银行说监管口径变了",
      phase: ["three-red-lines", "sales-freeze"],
      minScale: 2,
      maxScale: 5,
      severity: "crisis",
      sourceEpisodes: ["EP126", "EP031"],
      modelTags: ["leverage-backfire", "balance-sheet-maintenance"],
      briefing: "银行通知你压降房地产敞口。原本说好的续贷要重新上会，授信部要求你补现金流、降负债、解释几个项目的销售口径。",
      actors: [
        { role: "银行行长", text: "不是我不帮你，是口径变了。" },
        { role: "授信经理", text: "认购不能算回款，商票不能算现金。" },
        { role: "财务总监", text: "如果这笔续不上，下月工资和利息只能二选一。" }
      ],
      choices: [
        {
          id: "pledge-good-assets",
          label: "把最好的项目抵押出去换续贷",
          visibleEffects: { cash: 12, bank: 5, debt: 5, land_bank: -8 },
          hiddenEffects: { off_balance_debt: 3, boss_safety: -2 },
          relationEffects: { bank_manager: 6 },
          models: ["balance-sheet-maintenance", "leverage-backfire"],
          blowupRisk: 0.16,
          scaleScore: 4,
          consequence: "你续上命，也把优质资产锁给银行。",
          missed: "好资产抵押后，未来可卖资产变少。",
          lesson: "危机里最先被拿走流动性的，往往是你最好的资产。"
        },
        {
          id: "sell-project-fast",
          label: "折价卖一个项目，先降负债",
          visibleEffects: { cash: 9, debt: -12, land_bank: -9, government: -3 },
          hiddenEffects: { off_balance_debt: -5, boss_safety: 4, price_bubble: -4 },
          relationEffects: { bank_manager: 2, local_official: -4 },
          models: ["exit-discipline"],
          blowupRisk: 0.07,
          scaleScore: 1,
          consequence: "规模掉了，生存概率上来了。",
          missed: "主动收缩会伤面子、伤排名，也可能救命。",
          lesson: "高点退出不一定是卖在最高价，而是在还有买家时承认自己需要现金。"
        },
        {
          id: "dress-up-report",
          label: "把认购、拟签约和回款打包成漂亮材料",
          visibleEffects: { bank: 4, cash: 2, sales: 3 },
          hiddenEffects: { data_inflation: 12, off_balance_debt: 6, boss_safety: -6 },
          relationEffects: { bank_manager: -3 },
          models: ["data-inflation", "balance-sheet-maintenance"],
          blowupRisk: 0.21,
          scaleScore: 5,
          consequence: "材料递上去了，授信经理也把你列进了重点关注。",
          missed: "你把口径当工具，银行把口径当风险。",
          lesson: "融资变硬后，数字注水不再只是面子工程，而会影响债权人是否继续相信你。"
        }
      ]
    },
    {
      id: "supplier-blockade",
      title: "供应商把货车停在总部门口",
      phase: ["three-red-lines", "sales-freeze", "guaranteed-delivery"],
      minScale: 2,
      maxScale: 5,
      severity: "high",
      sourceEpisodes: ["EP031", "EP126"],
      modelTags: ["risk-transfer-chain", "balance-sheet-maintenance"],
      briefing: "电梯、门窗、涂料供应商联合上门。他们拿着商票逾期清单，说再不给方案，就把每个项目的业主群都发一遍。",
      actors: [
        { role: "供应商代表", text: "你们的品牌是品牌，我们的现金也是现金。" },
        { role: "公关", text: "视频已经有人拍了，热搜不贵。" },
        { role: "财务", text: "全额兑付不可能，展期会引发第二批。" }
      ],
      choices: [
        {
          id: "partial-cash",
          label: "拿现金付头部供应商，先拆联盟",
          visibleEffects: { cash: -10, delivery: 5, public_trust: 2 },
          hiddenEffects: { off_balance_debt: -4, delivery_pressure: -2 },
          relationEffects: { suppliers: 6, media: 2 },
          models: ["risk-transfer-chain"],
          blowupRisk: 0.1,
          scaleScore: 3,
          consequence: "联盟裂开了，小供应商更愤怒了。",
          missed: "选择性兑付能降一处风险，也会制造新的不公平。",
          lesson: "风险转移链条里，弱势方不一定最先爆，但爆起来最难安抚。"
        },
        {
          id: "swap-houses",
          label: "用房子抵货款，让供应商自己去卖",
          visibleEffects: { cash: 3, debt: -4, sales: -2, public_trust: -3 },
          hiddenEffects: { price_bubble: 6, off_balance_debt: -2, data_inflation: 4 },
          relationEffects: { suppliers: -2, buyers: -4 },
          models: ["balance-sheet-maintenance", "risk-transfer-chain"],
          blowupRisk: 0.16,
          scaleScore: 3,
          consequence: "债务换成库存，库存又流回市场砸价格。",
          missed: "以房抵债不是清偿完成，而是把供应商变成被迫卖房的人。",
          lesson: "房票、抵房和准现金工具能维持账面秩序，却会把折价压力转给更弱的人。"
        },
        {
          id: "public-payment-plan",
          label: "公开分期兑付表，接受舆情短痛",
          visibleEffects: { cash: -4, public_trust: 5, bank: -2, delivery: 2 },
          hiddenEffects: { off_balance_debt: -6, boss_safety: 3 },
          relationEffects: { suppliers: 4, media: 3 },
          models: ["delivery-first", "balance-sheet-maintenance"],
          blowupRisk: 0.08,
          scaleScore: 2,
          consequence: "难看，但可验证。",
          missed: "公开真实会影响融资，却能让责任链变清楚。",
          lesson: "危机中可验证的丑账，比不可验证的漂亮话更有救命价值。"
        }
      ]
    },
    {
      id: "stoppage-video",
      title: "停工视频上了本地热榜",
      phase: ["sales-freeze", "guaranteed-delivery"],
      minScale: 1,
      maxScale: 5,
      severity: "crisis",
      sourceEpisodes: ["EP101", "EP126"],
      modelTags: ["delivery-first", "risk-transfer-chain"],
      briefing: "业主翻进工地，拍到塔吊停着、材料堆着、门口只有保安。视频标题是：“买了两年，等来一片钢筋。”政府、银行、总包都在等你先表态。",
      actors: [
        { role: "业主代表", text: "我们不要解释，要看工人进场。" },
        { role: "住建局", text: "今晚必须有方案，明早不能再发酵。" },
        { role: "总包", text: "有钱我今晚就能叫人，没钱我也不能让工人白干。" }
      ],
      choices: [
        {
          id: "restart-site",
          label: "停掉新项目资金，今晚复工这个盘",
          visibleEffects: { cash: -12, delivery: 15, public_trust: 8, land_bank: -3 },
          hiddenEffects: { delivery_pressure: -12, presale_misuse: -3, boss_safety: 4 },
          relationEffects: { buyers: 9, contractor: 6, local_official: 5 },
          models: ["delivery-first"],
          blowupRisk: 0.09,
          scaleScore: 4,
          consequence: "工地亮灯了，新项目熄火了。",
          missed: "保交付不是加法，是把别处的钱挪回来。",
          lesson: "危机期的正确动作往往会降低规模，而不是扩大规模。"
        },
        {
          id: "pr-first",
          label: "先发声明和效果图，三天后再谈复工",
          visibleEffects: { public_trust: -10, government: -4, cash: 1, sales: -5 },
          hiddenEffects: { delivery_pressure: 14, boss_safety: -8, data_inflation: 5 },
          relationEffects: { buyers: -12, media: -8, local_official: -5 },
          models: ["data-inflation", "risk-transfer-chain"],
          blowupRisk: 0.3,
          scaleScore: 1,
          consequence: "声明被截图嘲讽，第二天更多业主去了现场。",
          missed: "交付问题不能用叙事覆盖，工地不会因为文案复工。",
          lesson: "当购房人已经看到现场，叙事工具会失效，甚至反过来证明你没有能力交付。"
        },
        {
          id: "government-taskforce",
          label: "请政府专班进驻，接受资金监管",
          visibleEffects: { government: 7, delivery: 8, public_trust: 4, cash: -4 },
          hiddenEffects: { political_dependency: 9, boss_safety: 1, delivery_pressure: -7 },
          relationEffects: { local_official: 8, buyers: 5, state_capital: 3 },
          models: ["political-embedded-enterprise", "delivery-first"],
          blowupRisk: 0.14,
          scaleScore: 4,
          consequence: "局面稳住，你的账户也不再完全属于你。",
          missed: "政府介入能救稳定，但会重写企业控制权。",
          lesson: "地方托底不是无限提款机，更多时候是把房企纳入处置流程。"
        }
      ]
    },
    {
      id: "mortgage-boycott-letter",
      title: "业主联名信写到了停贷",
      phase: ["guaranteed-delivery", "clearance"],
      minScale: 2,
      maxScale: 5,
      severity: "crisis",
      sourceEpisodes: ["EP101", "EP126"],
      modelTags: ["delivery-first", "risk-transfer-chain"],
      briefing: "几个项目的业主联名，措辞越来越硬：如果再不复工，就集体停贷。银行、住建和公安都开始关注。你发现这已经不是客户投诉，而是金融和稳定问题。",
      actors: [
        { role: "业主代表", text: "我们还贷款，是因为相信能交房。" },
        { role: "银行", text: "停贷会影响资产质量，你们必须拿出复工证明。" },
        { role: "属地专班", text: "项目不能再拖，资金用途要封闭。" }
      ],
      choices: [
        {
          id: "sell-assets-for-delivery",
          label: "卖掉两个未开工地块，专款复工",
          visibleEffects: { cash: 8, land_bank: -14, delivery: 16, public_trust: 9, debt: -2 },
          hiddenEffects: { delivery_pressure: -14, boss_safety: 5, price_bubble: -3 },
          relationEffects: { buyers: 10, local_official: 5, bank_manager: 2 },
          models: ["delivery-first", "exit-discipline"],
          blowupRisk: 0.08,
          scaleScore: -2,
          consequence: "你缩了规模，项目重新动了。",
          missed: "自救常常意味着承认过去扩张过度。",
          lesson: "保交楼不是增长故事，是处置故事。能卖资产换交付，说明你还有退出空间。"
        },
        {
          id: "ask-policy-loan",
          label: "申请专项借款，但接受封闭运行",
          visibleEffects: { cash: 6, delivery: 12, government: 7, bank: 3 },
          hiddenEffects: { political_dependency: 10, delivery_pressure: -9, boss_safety: 2 },
          relationEffects: { state_capital: 5, local_official: 8, buyers: 6 },
          models: ["delivery-first", "political-embedded-enterprise"],
          blowupRisk: 0.12,
          scaleScore: 3,
          consequence: "项目有钱复工，集团没有钱自由支配。",
          missed: "政策工具救的是已售逾期难交付项目，不是你的商业野心。",
          lesson: "保交楼资金的边界很硬：专款专用，封闭运行。"
        },
        {
          id: "blame-contractor",
          label: "把责任推给总包和材料涨价",
          visibleEffects: { cash: 1, public_trust: -12, delivery: -8, government: -5 },
          hiddenEffects: { delivery_pressure: 16, boss_safety: -10, off_balance_debt: 4 },
          relationEffects: { contractor: -10, buyers: -12, media: -8 },
          models: ["risk-transfer-chain"],
          blowupRisk: 0.34,
          scaleScore: 0,
          consequence: "总包把欠款清单也发了出来，业主终于看见完整责任链。",
          missed: "你想把风险推给总包，总包也有材料能把风险推回来。",
          lesson: "风险转移链条一旦公开，最怕的不是谁喊得响，而是谁留下的证据最多。"
        }
      ]
    },
    {
      id: "offshore-bond-due",
      title: "美元债投资人不接受你的新故事",
      phase: ["three-red-lines", "sales-freeze", "clearance"],
      minScale: 3,
      maxScale: 5,
      severity: "crisis",
      sourceEpisodes: ["EP126", "EP031"],
      modelTags: ["leverage-backfire", "balance-sheet-maintenance"],
      briefing: "你曾经靠境外债证明自己是大房企。现在债券到期，投资人不再听“短期流动性困难”。他们要现金、抵押、控制权，或者法庭。",
      actors: [
        { role: "境外债顾问", text: "展期可以谈，但他们要看到资产和现金。" },
        { role: "财务总监", text: "境内项目还在保交楼，现金出不去。" },
        { role: "投行朋友", text: "你上市时讲的是成长，现在要讲清偿。" }
      ],
      choices: [
        {
          id: "offer-haircut",
          label: "主动债务重组，承认债权人要打折",
          visibleEffects: { debt: -10, bank: -4, cash: -4, public_trust: 2 },
          hiddenEffects: { boss_safety: 4, off_balance_debt: -4, data_inflation: -3 },
          relationEffects: { trust_channel: -5, state_capital: 2 },
          models: ["balance-sheet-maintenance", "exit-discipline"],
          blowupRisk: 0.14,
          scaleScore: -4,
          consequence: "你失去体面，但争取了时间。",
          missed: "承认打折会伤融资信用，也可能是唯一现实。",
          lesson: "债务重组不是胜利，是用声誉换时间。越早谈，越可能保住选择权。"
        },
        {
          id: "delay-bond",
          label: "继续拖，等市场回暖和政策窗口",
          visibleEffects: { cash: 1, debt: 4, bank: -3 },
          hiddenEffects: { off_balance_debt: 8, boss_safety: -6, data_inflation: 4 },
          relationEffects: { trust_channel: -8 },
          models: ["balance-sheet-maintenance", "leverage-backfire"],
          blowupRisk: 0.28,
          scaleScore: 0,
          consequence: "时间没有免费延长，债权人耐心继续下降。",
          missed: "拖延只在你有新增现金流时有意义，没有现金流时就是放大违约。",
          lesson: "恒大式结局不是某天突然来，而是长期展期失败后的法律化。"
        },
        {
          id: "sell-offshore-assets",
          label: "卖掉海外和非核心资产，先兑一部分",
          visibleEffects: { cash: 8, debt: -8, land_bank: -4, sales: -2 },
          hiddenEffects: { diversification_fantasy: -8, boss_safety: 3 },
          relationEffects: { trust_channel: 2, state_capital: -1 },
          models: ["exit-discipline", "leverage-backfire"],
          blowupRisk: 0.1,
          scaleScore: -1,
          consequence: "你把多元化故事拆了一块，换来真实现金。",
          missed: "非核心资产在危机里卖不出好价格，但比没有价格好。",
          lesson: "多元化如果不能产生自由现金流，危机时就不是护城河，是拖累。"
        }
      ]
    },
    {
      id: "diversification-circus",
      title: "文旅城、汽车队、足球俱乐部都想找你冠名",
      phase: ["high-turnover", "three-red-lines"],
      minScale: 3,
      maxScale: 5,
      severity: "high",
      sourceEpisodes: ["EP126", "EP016"],
      modelTags: ["diversification-fantasy", "leverage-backfire"],
      briefing: "你已经不是县城老板。顾问公司说地产利润见顶，要讲“第二增长曲线”：文旅城、康养、汽车、足球、物业金融，PPT 每一页都像新世界。",
      actors: [
        { role: "战略顾问", text: "资本市场喜欢生态，不喜欢土老板。" },
        { role: "老财务", text: "现金流还在地产，故事已经飞到天上。" },
        { role: "地方领导", text: "文旅项目能带动城市形象，你们企业要有担当。" }
      ],
      choices: [
        {
          id: "go-diversified",
          label: "砸钱做文旅和汽车，讲第二曲线",
          visibleEffects: { sales: 4, government: 8, cash: -15, debt: 14, land_bank: 4 },
          hiddenEffects: { diversification_fantasy: 18, political_dependency: 8, off_balance_debt: 8, boss_safety: -4 },
          relationEffects: { local_official: 8, media: 6, bank_manager: -2 },
          models: ["leverage-backfire", "political-embedded-enterprise"],
          blowupRisk: 0.25,
          scaleScore: 16,
          consequence: "舞台变大，现金流变薄。",
          missed: "第二曲线如果不造血，只会替第一曲线多开几个出血口。",
          lesson: "恒大式多元化的风险在于：故事越大，越容易遮住主营现金流恶化。"
        },
        {
          id: "property-services",
          label: "只做物业和代建，转轻资产",
          visibleEffects: { cash: -3, debt: -4, delivery: 5, public_trust: 4, sales: -2 },
          hiddenEffects: { diversification_fantasy: -5, boss_safety: 4 },
          relationEffects: { buyers: 4, state_capital: 3 },
          models: ["exit-discipline"],
          blowupRisk: 0.07,
          scaleScore: 2,
          consequence: "故事小了，现金流更像现金流。",
          missed: "轻资产不能让你立刻暴富，但能降低周期杀伤。",
          lesson: "转型不是换一个热词，而是把现金流、风险和责任重新变轻。"
        },
        {
          id: "city-image-project",
          label: "接地方文旅城，换土地和政策支持",
          visibleEffects: { government: 12, land_bank: 12, bank: 5, cash: -10, debt: 10 },
          hiddenEffects: { political_dependency: 14, diversification_fantasy: 10, delivery_pressure: 5 },
          relationEffects: { local_official: 10, state_capital: 4 },
          models: ["political-embedded-enterprise", "land-finance-loop"],
          blowupRisk: 0.2,
          scaleScore: 14,
          consequence: "你换到政策支持，也接住城市形象包袱。",
          missed: "面子工程在上行期是资源，在下行期是责任。",
          lesson: "地方任务型项目不是普通商业投资，退出时不会只看你的利润表。"
        }
      ]
    },
    {
      id: "state-capital-takeover",
      title: "国资接盘，只挑好资产",
      phase: ["guaranteed-delivery", "clearance"],
      minScale: 2,
      maxScale: 6,
      severity: "crisis",
      sourceEpisodes: ["EP012", "EP037", "EP078", "EP101"],
      modelTags: ["political-embedded-enterprise", "delivery-first"],
      briefing: "国资平台愿意入场，但条件很清楚：优质项目装进新公司，资金封闭用于交付；坏债、商票和历史问题留在旧主体。你能保交楼，但未必保控制权。",
      actors: [
        { role: "国资代表", text: "我们救项目，不接无底洞。" },
        { role: "债权人", text: "好资产走了，我们怎么办？" },
        { role: "你的副总", text: "签了就不是我们的公司，不签可能什么都没了。" }
      ],
      choices: [
        {
          id: "accept-takeover",
          label: "接受国资控股，自己退到小股东",
          visibleEffects: { cash: 4, debt: -8, delivery: 15, government: 8, land_bank: -10 },
          hiddenEffects: { political_dependency: 8, boss_safety: 8, delivery_pressure: -13, off_balance_debt: -5 },
          relationEffects: { state_capital: 12, buyers: 8, bank_manager: 4 },
          models: ["delivery-first", "political-embedded-enterprise"],
          blowupRisk: 0.08,
          scaleScore: -8,
          endingCandidate: "state_rescue",
          consequence: "你失去控制权，但项目开始恢复秩序。",
          missed: "保住个人安全和交付，代价可能是退出老板位置。",
          lesson: "危机后期的好结局，不一定是继续控制企业，而是把责任处理到不会反噬个人。"
        },
        {
          id: "fight-control",
          label: "坚持控股权，要求国资连债务一起接",
          visibleEffects: { government: -8, bank: -6, delivery: -4, cash: -3 },
          hiddenEffects: { political_dependency: 4, boss_safety: -10, off_balance_debt: 6 },
          relationEffects: { state_capital: -12, local_official: -6, buyers: -4 },
          models: ["balance-sheet-maintenance", "political-embedded-enterprise"],
          blowupRisk: 0.29,
          scaleScore: 0,
          consequence: "谈判僵住，专班开始准备另一套处置方案。",
          missed: "到了接盘阶段，控制权已经不是你单方面能定价的资产。",
          lesson: "当企业需要被救时，老板还把控制权当核心筹码，往往会错过最后窗口。"
        },
        {
          id: "sell-best-keep-shell",
          label: "卖好项目还债，保一个空壳继续熬",
          visibleEffects: { cash: 12, debt: -14, land_bank: -16, delivery: 4 },
          hiddenEffects: { off_balance_debt: -6, boss_safety: 3, diversification_fantasy: -3 },
          relationEffects: { bank_manager: 5, state_capital: 2, buyers: 2 },
          models: ["exit-discipline", "balance-sheet-maintenance"],
          blowupRisk: 0.12,
          scaleScore: -10,
          consequence: "债务降了，未来也被卖掉一块。",
          missed: "卖好资产能活命，但旧主体可能只剩难题。",
          lesson: "资产拆卖是危机处置常态，关键看你能否用卖资产换来责任闭合，而不是只换时间。"
        }
      ]
    },
    {
      id: "boss-travel-ban",
      title: "机场贵宾厅门口，你的证件刷红了",
      phase: ["guaranteed-delivery", "clearance"],
      minScale: 3,
      maxScale: 6,
      severity: "crisis",
      sourceEpisodes: ["EP126", "EP031"],
      modelTags: ["balance-sheet-maintenance", "delivery-first"],
      briefing: "你准备飞去谈一笔资产出售，安检口让你去旁边等。律师电话很短：不是刑事结论，但你已经被限制出境。几个项目的交付、债务和预售资金问题被放在一起看。",
      actors: [
        { role: "律师", text: "现在每一句话都要当证据看。" },
        { role: "副总", text: "老板，你不在场，债权人会认为你要跑。" },
        { role: "专班联系人", text: "先回来开会，项目比航班重要。" }
      ],
      choices: [
        {
          id: "return-taskforce",
          label: "取消行程，回专班交账",
          visibleEffects: { government: 4, public_trust: 3, cash: -2 },
          hiddenEffects: { boss_safety: 7, delivery_pressure: -4, political_dependency: 4 },
          relationEffects: { local_official: 5, buyers: 3 },
          models: ["delivery-first", "political-embedded-enterprise"],
          blowupRisk: 0.1,
          scaleScore: -2,
          consequence: "你失去自由感，换来解释机会。",
          missed: "这时的老板安全来自配合处置，而不是继续讲商业故事。",
          lesson: "企业危机后期，个人安全成为独立指标。自由行动本身会被重新解释。"
        },
        {
          id: "send-lawyer-delay",
          label: "让律师拖程序，自己继续谈资产",
          visibleEffects: { cash: 3, government: -5, public_trust: -4 },
          hiddenEffects: { boss_safety: -12, off_balance_debt: 4, delivery_pressure: 6 },
          relationEffects: { local_official: -7, state_capital: -3 },
          models: ["balance-sheet-maintenance"],
          blowupRisk: 0.3,
          scaleScore: 0,
          consequence: "你争取了几天商业时间，也让处置方更不信你。",
          missed: "程序拖延在个人安全线上很危险，它会被解释成逃避责任。",
          lesson: "老板安全不是靠辩论赢来的，而是靠责任链能否闭合。"
        },
        {
          id: "open-books",
          label: "公开项目账本，换取处置谈判空间",
          visibleEffects: { bank: 2, government: 5, public_trust: 6, cash: -3 },
          hiddenEffects: { boss_safety: 8, off_balance_debt: -8, presale_misuse: -4 },
          relationEffects: { bank_manager: 4, buyers: 5, state_capital: 5 },
          models: ["balance-sheet-maintenance", "delivery-first"],
          blowupRisk: 0.09,
          scaleScore: -1,
          consequence: "账很难看，但别人终于知道洞有多大。",
          missed: "公开账本会暴露问题，也能防止别人按最坏情况处理你。",
          lesson: "危机处置里，透明不是形象工程，是降低误判和刑责风险的工具。"
        }
      ]
    },
    {
      id: "anti-gang-investigation",
      title: "土方老板被带走了",
      phase: ["three-red-lines", "sales-freeze", "guaranteed-delivery", "clearance"],
      minScale: 0,
      maxScale: 6,
      severity: "crisis",
      sourceEpisodes: ["EP004", "EP126"],
      modelTags: ["gray-governance", "political-embedded-enterprise"],
      briefing: "当年帮你清场的土方老板被带走。调查人员调取了旧改项目的付款、拆迁谈判记录和几段现场视频。你突然发现，几年前的“效率”今天成了问题清单。",
      actors: [
        { role: "法务", text: "不要补材料，不要删聊天记录。" },
        { role: "旧改村干部", text: "当时大家都知道是为了项目推进。" },
        { role: "调查人员", text: "你们公司的付款说明是谁签的？" }
      ],
      choices: [
        {
          id: "cut-gray-force",
          label: "主动切割，提交完整付款和会议记录",
          visibleEffects: { government: -2, public_trust: 2, cash: -3 },
          hiddenEffects: { gray_risk: -10, boss_safety: 5, political_dependency: -2 },
          relationEffects: { underground: -12, local_official: -2 },
          models: ["gray-governance", "balance-sheet-maintenance"],
          blowupRisk: 0.12,
          scaleScore: -1,
          consequence: "你保不住所有人，但保住了事实链。",
          missed: "切割会得罪旧关系，也可能是唯一能说清自己的方式。",
          lesson: "灰色效率的后账不能靠人情解决，只能靠证据边界。"
        },
        {
          id: "ask-local-protection",
          label: "找旧领导压一压，别扩大",
          visibleEffects: { government: 2, cash: -2 },
          hiddenEffects: { political_dependency: 10, gray_risk: 8, boss_safety: -10 },
          relationEffects: { local_official: 4, underground: 4 },
          models: ["gray-governance", "political-embedded-enterprise"],
          blowupRisk: 0.35,
          scaleScore: 0,
          consequence: "你把经营问题再次推回关系网，也把自己绑得更紧。",
          missed: "关系保护在风向没变时像伞，风向变了就像绳子。",
          lesson: "政商和黑灰风险叠加时，最危险的是继续相信旧保护还有效。"
        },
        {
          id: "blame-subordinate",
          label: "说是项目公司副总个人操作",
          visibleEffects: { cash: 0, public_trust: -3, government: -3 },
          hiddenEffects: { boss_safety: -8, gray_risk: 5, off_balance_debt: 3 },
          relationEffects: { contractor: -4, local_official: -4 },
          models: ["risk-transfer-chain", "gray-governance"],
          blowupRisk: 0.27,
          scaleScore: 0,
          consequence: "副总不愿意一个人扛，开始补充材料。",
          missed: "把锅往下推，前提是下面的人没有证据。",
          lesson: "责任链不是你说谁负责就谁负责，尤其当付款和授权都留在系统里。"
        }
      ]
    },
    {
      id: "high-point-exit-window",
      title: "高点退出窗口只开了半扇",
      phase: ["shelter-reform-boom", "high-turnover", "three-red-lines"],
      minScale: 2,
      maxScale: 5,
      severity: "pressure",
      sourceEpisodes: ["EP126", "EP031", "EP078"],
      modelTags: ["exit-discipline", "leverage-backfire"],
      briefing: "销售还热，银行还愿意谈，地方还把你当样板。一个国资平台愿意收你两个项目，价格不算最高，但能让你降杠杆。投拓团队却说下一轮地价还会涨。",
      actors: [
        { role: "国资平台", text: "现在买，是因为你还没出事。" },
        { role: "投拓总", text: "退出？现在才刚轮到我们坐主桌。" },
        { role: "财务总监", text: "卖掉这两个，现金短债比会非常舒服。" }
      ],
      choices: [
        {
          id: "sell-at-high",
          label: "卖项目降杠杆，停止追榜",
          visibleEffects: { cash: 18, debt: -18, land_bank: -12, bank: 6, delivery: 5 },
          hiddenEffects: { off_balance_debt: -8, delivery_pressure: -6, boss_safety: 8, price_bubble: -5 },
          relationEffects: { state_capital: 7, bank_manager: 6 },
          models: ["exit-discipline"],
          blowupRisk: 0.04,
          scaleScore: -4,
          endingCandidate: "high_point_exit",
          consequence: "你失去一次做大的机会，也第一次真正拥有自由现金。",
          missed: "高点退出难在它看起来像怂，不像胜利。",
          lesson: "最好的房地产结局可能不是成为最大，而是在还能卖的时候卖，在还能交的时候交。"
        },
        {
          id: "double-down-land",
          label: "不卖，反手再拿一块核心地",
          visibleEffects: { cash: -16, debt: 18, land_bank: 18, sales: 8, government: 5 },
          hiddenEffects: { price_bubble: 12, delivery_pressure: 9, off_balance_debt: 8, boss_safety: -4 },
          relationEffects: { local_official: 6, bank_manager: 4 },
          models: ["leverage-backfire", "land-finance-loop"],
          blowupRisk: 0.2,
          scaleScore: 20,
          consequence: "你抓住了上升期最后的诱惑。",
          missed: "最危险的选择通常发生在一切看起来都很好时。",
          lesson: "上行期的奖励会训练你相信扩张永远正确，这正是周期反噬的前提。"
        },
        {
          id: "partial-exit",
          label: "卖一半，另一半继续做",
          visibleEffects: { cash: 8, debt: -7, land_bank: -4, delivery: 2, sales: 2 },
          hiddenEffects: { off_balance_debt: -3, boss_safety: 4, price_bubble: -2 },
          relationEffects: { state_capital: 3, bank_manager: 3 },
          models: ["exit-discipline", "balance-sheet-maintenance"],
          blowupRisk: 0.08,
          scaleScore: 4,
          consequence: "你没有彻底退出，也没有彻底上头。",
          missed: "折中能降低风险，但如果后面继续扩张，卖资产只是延迟爆雷。",
          lesson: "部分退出只有在后续纪律跟得上时才有效，否则只是给下一轮加杠杆补弹药。"
        }
      ]
    },
    {
      id: "distressed-project-bargain",
      title: "隔壁房企暴雷，项目打六折卖你",
      phase: ["three-red-lines", "sales-freeze", "clearance"],
      minScale: 2,
      maxScale: 5,
      severity: "high",
      sourceEpisodes: ["EP031", "EP101", "EP126"],
      modelTags: ["leverage-backfire", "delivery-first"],
      briefing: "隔壁房企资金链断了，一个半停工项目打六折找接盘方。位置不错，业主怨气也很大。地方希望你出手稳局面，银行说可以协调一部分贷款。",
      actors: [
        { role: "地方专班", text: "你接下来，是企业担当；接不下来，我们再找别人。" },
        { role: "银行", text: "贷款可以谈，但原债务和新投入要分清。" },
        { role: "项目业主", text: "换了开发商也没用，我们只看什么时候复工。" }
      ],
      choices: [
        {
          id: "buy-distressed",
          label: "六折接盘，赌自己能盘活",
          visibleEffects: { cash: -12, debt: 10, land_bank: 14, government: 7, delivery: -4 },
          hiddenEffects: { delivery_pressure: 13, political_dependency: 6, off_balance_debt: 5 },
          relationEffects: { local_official: 7, buyers: -3, bank_manager: 3 },
          models: ["leverage-backfire", "political-embedded-enterprise"],
          blowupRisk: 0.22,
          scaleScore: 12,
          consequence: "你买到便宜资产，也接住别人没处理完的火。",
          missed: "折价不是免费午餐，折价里通常包含看不见的责任。",
          lesson: "危机中抄底房地产，最重要的不是便宜，而是旧债、交付和业主信任能不能切开。"
        },
        {
          id: "manage-only",
          label: "只做代建管理，不接旧债",
          visibleEffects: { cash: 2, delivery: 6, government: 3, land_bank: -1 },
          hiddenEffects: { political_dependency: 2, delivery_pressure: -3, boss_safety: 3 },
          relationEffects: { state_capital: 3, local_official: 2, buyers: 3 },
          models: ["delivery-first", "exit-discipline"],
          blowupRisk: 0.06,
          scaleScore: 3,
          consequence: "你赚得不多，但边界清楚。",
          missed: "代建拿不到土地升值，却能把风险和收益分清。",
          lesson: "下行期轻资产模式的价值，是用专业能力换有限收益，而不是用负债换规模幻觉。"
        },
        {
          id: "reject-distressed",
          label: "拒绝接盘，保自己项目",
          visibleEffects: { cash: 3, government: -4, delivery: 3, public_trust: 2 },
          hiddenEffects: { political_dependency: -3, delivery_pressure: -2 },
          relationEffects: { local_official: -5 },
          models: ["exit-discipline"],
          blowupRisk: 0.04,
          scaleScore: 0,
          consequence: "你少了一个扩张机会，也少了一个别人留下的坑。",
          missed: "拒绝地方任务会损关系，但也保住生存边界。",
          lesson: "不是所有低价资产都该买。危机里最稀缺的是处理能力，不是项目数量。"
        }
      ]
    }
  ],
  endings: {
    high_point_exit: {
      title: "高点离场",
      text: "你没有成为最大的地产帝国，但你在市场还相信、债权人还愿意谈、项目还能交付时主动收缩。你带着现金和安全离开了牌桌。"
    },
    stable_survivor: {
      title: "小而稳",
      text: "你没有站上全国榜单，但活过了周期，交了房，压住了债。这个结局不风光，但很难。"
    },
    state_rescue: {
      title: "国资接盘自保",
      text: "你失去控制权，项目进入封闭处置。企业不再像你的企业，但交付恢复，个人风险被压住。"
    },
    evergrande_style: {
      title: "恒大式塌方",
      text: "你做到了很大，也把现金、债务、交付、地方任务和多元化故事拧成一团。规模没有保护你，只扩大了爆雷半径。"
    },
    cash_break: {
      title: "资金链断裂",
      text: "自由现金见底，短债集中到期，工地和债权人同时找上门。你的公司不是没有资产，是没有能马上用的钱。"
    },
    delivery_failure: {
      title: "保交楼失败",
      text: "停工、预售款、业主维权和专班介入连成一条线。最后处理你的不是一道选择题，而是一串没有闭合的交付责任。"
    },
    buyer_blowup: {
      title: "业主维权引爆",
      text: "购房人不再听解释，他们把工地、合同、监管账户和贷款连在一起。信任破了以后，销售和融资一起塌。"
    },
    presale_misuse: {
      title: "预售款挪用被查",
      text: "你把交付的钱当成集团现金流。保交楼阶段账本被打开，责任链非常清楚。"
    },
    debt_default: {
      title: "债务重组失败",
      text: "展期、商票、美元债、信托和银行同时收紧。你需要所有人相信你，但每个人都先想退出。"
    },
    gray_case: {
      title: "扫黑线索牵连",
      text: "过去为了速度留下的灰色关系，在风向变化后变成调查材料。经营风险越过了商业边界。"
    },
    boss_controlled: {
      title: "老板被控制",
      text: "企业问题已经变成个人安全问题。你不能再用商业谈判解决它，只能进入处置和调查流程。"
    },
    clean_exit: {
      title: "合规高点离场",
      text: "你没有把退场做成跑路，而是在现金、债务、交付、银行和地方协调都还没坏死时卖项目、还债、收缩。你少赚了最后一段幻觉，也避开了后面的冻结和追责。"
    },
    runaway_caught: {
      title: "出逃失败",
      text: "你以为自己是在退出周期，但项目、债务、员工理财和预售交付没有闭合。退出动作被重新解释成逃避责任，个人安全问题先于商业谈判落地。"
    },
    asset_frozen: {
      title: "资产冻结",
      text: "债权人、供应商、业主和司法程序先动手了。账户、股权和项目收益被保全，你手里还有资产，但已经不再自由可用。"
    },
    isolated_blowup: {
      title: "孤立爆雷",
      text: "你没有深度绑定地方，但也没有形成足够的协调网络。销售、银行、供应商和业主同时抢跑时，没人愿意替你缓冲，商业问题很快变成处置问题。"
    },
    takeover_failed: {
      title: "接盘谈判破裂",
      text: "你错过最后一次把项目、债务和个人责任切开的窗口。好资产没人敢接，坏账开始回到你身上。"
    }
  },
  sources: [
    {
      name: "AEA：Fire Sales in Finance and Macroeconomics",
      url: "https://www.aeaweb.org/articles?id=10.1257/jep.25.1.29"
    },
    {
      name: "AP：恒大退市、清盘和资产处置进展",
      url: "https://apnews.com/article/china-evergrande-property-hong-xi-04aa5936f3efa338e57bbe50490c820f"
    },
    {
      name: "Nature HSS：销售排名、杠杆和中国房企财务困境",
      url: "https://www.nature.com/articles/s41599-025-05154-7"
    },
    {
      name: "国家统计局：2024年全国房地产市场基本情况",
      url: "https://www.stats.gov.cn/xxgk/sjfb/zxfb2020/202501/t20250117_1958328.html"
    },
    {
      name: "财政部：2024年全国政府性基金收入决算表",
      url: "https://yss.mof.gov.cn/2024zyjs/202509/t20250904_3971506.htm"
    },
    {
      name: "中国政府网：多部门推进保交楼、稳民生",
      url: "https://www.gov.cn/xinwen/2022-08/19/content_5706085.htm"
    },
    {
      name: "中国政府网：金融支持房地产市场平稳健康发展16条",
      url: "https://www.gov.cn/xinwen/2022-11/23/content_5728454.htm"
    },
    {
      name: "Reuters Connect：高杠杆房企被裁定清盘案例",
      url: "https://www.reutersconnect.com/item/china-evergrande-ordered-to-liquidate-owing-300-bln/dGFnOnJldXRlcnMuY29tLDIwMjQ6bmV3c21sX0xWQTAwMTU5NzQyOTAxMjAyNFJQMQ"
    },
    {
      name: "AP：高杠杆房企实控人被采取强制措施案例",
      url: "https://apnews.com/article/65c2df0510a111475e182350174a065d"
    },
    {
      name: "AP：高杠杆房企实控人庭审案例",
      url: "https://apnews.com/article/d121302f1542a0172f57ee140ea987ae"
    },
    {
      name: "CGTN/Reuters：成熟资产出售与周期交易案例",
      url: "https://news.cgtn.com/news/2020-07-24/Li-Ka-shing-s-CK-Asset-sells-Chengdu-development-project-for-1-bln-So4gO4kr0Q/index.html"
    },
    {
      name: "Reuters Breakingviews：商业地产控股权出售失败案例",
      url: "https://www.taiwannews.com.tw/news/4286054"
    },
    {
      name: "澎湃新闻：预售资金挪用和监管缝隙调查",
      url: "https://m.thepaper.cn/wifiKey_detail.jsp?contid=9737089&from=wifiKey"
    },
    {
      name: "新浪财经/时代周报：监管资金被挪用与工程方材料问题",
      url: "https://finance.sina.com.cn/chanjing/cyxw/2022-07-21/doc-imizmscv2941478.shtml"
    },
    {
      name: "21世纪经济报道：房地产商票逾期和供应商挤兑",
      url: "https://m.21jingji.com/article/20220111/herald/64cc3298fdc508a1a4c7403486fd8888_zaker.html"
    },
    {
      name: "最高人民法院：串通投标及关联犯罪典型案例",
      url: "https://www.court.gov.cn/zixun/xiangqing/465361.html"
    },
    {
      name: "Goldman Sachs：停贷潮与交付风险分析",
      url: "https://www.goldmansachs.com/insights/articles/why-some-homebuyers-in-china-are-boycotting-their-mortgage-payments"
    }
  ]
};

(() => {
  const DATA = window.REAL_ESTATE_TYCOON_DATA;
  const actor = (role, text) => ({ role, text });
  const choice = (id, label, visibleEffects, hiddenEffects, models, consequence, lesson, extra = {}) => ({
    id,
    label,
    visibleEffects,
    hiddenEffects,
    relationEffects: extra.relationEffects || {},
    models,
    blowupRisk: extra.blowupRisk ?? 0.06,
    scaleScore: extra.scaleScore ?? 0,
    consequence,
    missed: extra.missed || "你不是在选好坏，而是在选把哪条风险留到后面。",
    lesson,
    followUps: extra.followUps || [],
    endingCandidate: extra.endingCandidate,
    instantEnding: extra.instantEnding,
    flags: extra.flags || []
  });
  const event = (id, title, phase, severity, sourceEpisodes, modelTags, briefing, actors, choices, minScale = 0, maxScale = 6, extra = {}) => ({
    id,
    title,
    phase: Array.isArray(phase) ? phase : [phase],
    minScale,
    maxScale,
    severity,
    sourceEpisodes,
    modelTags,
    briefing,
    actors,
    choices,
    ...extra
  });

  DATA.models["narrative-control"] = DATA.models["narrative-control"] || {
    name: "叙事管控",
    note: "你优先处理口径和情绪，短期能降噪，但如果事实链没有闭合，叙事会反过来变成证据。"
  };
  DATA.models["value-capture"] = DATA.models["value-capture"] || {
    name: "价值截留",
    note: "用户支付的价格和实际获得的价值之间，被渠道、品牌、配套和金融安排重新分配。"
  };
  DATA.models["asset-freeze-chain"] = DATA.models["asset-freeze-chain"] || {
    name: "资产冻结链条",
    note: "当债务、诉讼、预售责任和个人资产转移动作叠加时，风险会从公司账本追到股权、账户和老板个人。"
  };
  DATA.models["legal-exposure"] = DATA.models["legal-exposure"] || {
    name: "个人法律暴露",
    note: "房企风险不是永远停留在公司层面；理财、预售款、虚假披露和灰色操作会把企业危机推向个人责任。"
  };
  DATA.models["local-isolation"] = DATA.models["local-isolation"] || {
    name: "地方孤立风险",
    note: "政商关系过深会被嵌入，过浅也不安全。危机期没有地方协调、银行缓冲和债权人谈判空间，风险会更快从商业问题变成处置问题。"
  };
  DATA.models["whitelist-financing"] = DATA.models["whitelist-financing"] || {
    name: "白名单项目融资",
    note: "白名单救的是合规在建项目和交付闭环，不是给集团还旧债。项目风险、集团风险和老板风险会被切开审查。"
  };
  DATA.models["escrow-control"] = DATA.models["escrow-control"] || {
    name: "预售资金封闭",
    note: "预售资金被重新锁回项目后，它就不再是老板的自由现金，而是购房人交付责任的资金凭证。"
  };
  DATA.models["inventory-overhang"] = DATA.models["inventory-overhang"] || {
    name: "库存与人口错配",
    note: "下沉城市的热销可能来自棚改、渠道和价格预期；人口、收入和真实去化撑不住时，库存会把现金流拖成慢性病。"
  };
  DATA.models["land-fiscal-pressure"] = DATA.models["land-fiscal-pressure"] || {
    name: "土地财政压力",
    note: "地方需要土地成交和项目开工来维持叙事，但当市场转冷，地方信用本身也会变薄。房企不能把地方压力误当成地方兜底。"
  };
  DATA.models["worker-wage-risk"] = DATA.models["worker-wage-risk"] || {
    name: "工资专户与工地稳定",
    note: "拖欠工资会让账本问题直接进入劳动监察、住建和舆情系统，工人不是成本项，而是最早把停工变成公共事件的人。"
  };
  DATA.models["audit-revenue-recognition"] = DATA.models["audit-revenue-recognition"] || {
    name: "收入确认与审计倒查",
    note: "认购、网签、回款、交付和收入确认不是一件事。财报里的口径会在危机后成为倒查路径。"
  };
  DATA.models["share-pledge-chain"] = DATA.models["share-pledge-chain"] || {
    name: "股权质押连锁",
    note: "上市和股权质押能放大融资能力，也会在股价下跌、补仓和控制权风险中把公司危机推向实控人。"
  };
  DATA.models["state-purchase-floor"] = DATA.models["state-purchase-floor"] || {
    name: "国资收储底价",
    note: "国资收购存量房或项目能托住一部分现金流，但通常挑现房、低价、可交付资产，不会按开发商账面估值买故事。"
  };
  DATA.models["cycle-asset-trader"] = DATA.models["cycle-asset-trader"] || {
    name: "周期资产交易",
    note: "成熟资产在高价时卖出能保现金和安全，但会被市场和地方重新解释为撤退；不卖则保面子和规模，承担下行估值风险。"
  };
  DATA.models["commercial-asset-exit"] = DATA.models["commercial-asset-exit"] || {
    name: "商业地产退出",
    note: "核心写字楼和商业资产账面漂亮，但租金、空置率、审批和买方资金决定能否真正退出。"
  };
  DATA.models["control-right-risk"] = DATA.models["control-right-risk"] || {
    name: "控制权交易风险",
    note: "出售控股权不是普通卖楼，交易对手、审批、舆论和资金用途都会影响它是体面退出还是失败信号。"
  };
  DATA.models["pre-sale-funds-leak"] = DATA.models["pre-sale-funds-leak"] || {
    name: "预售资金逃离监管",
    note: "明面规则要求预售资金进监管账户，但真实风险常发生在未入账、异常拨付、工程进度材料和银行监管责任之间。"
  };
  DATA.models["bid-rigging-chain"] = DATA.models["bid-rigging-chain"] || {
    name: "围标串标链条",
    note: "招投标不只是报价竞争，关联公司陪标、模板雷同、操控评委和定制条件会把工程利润、关系和刑事风险连起来。"
  };
  DATA.models["low-bid-change-order"] = DATA.models["low-bid-change-order"] || {
    name: "低价中标签证回补",
    note: "低价中标看似省钱，后面可能通过设计变更、工程签证、停工索赔和材料替换把利润重新拿回来。"
  };
  DATA.models["shadow-banking-loop"] = DATA.models["shadow-banking-loop"] || {
    name: "影子融资循环",
    note: "过桥、私募、咨询费、关联公司借款能暂时补现金，但成本更高、期限更短，也更容易穿透到个人和法律风险。"
  };
  DATA.models["related-party-financing"] = DATA.models["related-party-financing"] || {
    name: "关联融资穿透",
    note: "绕一层公司或关系银行能让钱进来，但危机后银行、审计和法院会重新追问真实借款人和资金用途。"
  };

  const newEvents = [
    event(
      "design-change-cheap-material",
      "设计变更单：少一面石材，多一行利润",
      "three-red-lines",
      "pressure",
      ["EP114", "EP126"],
      ["balance-sheet-maintenance", "delivery-first"],
      "成本部递来一张设计变更单：外立面石材改真石漆，公共区灯具降一档。每户合同没有明写品牌，但效果图里看得很清楚。",
      [
        actor("成本经理", "不改，现金流过不了月。"),
        actor("设计师", "效果会差，但不一定违约。"),
        actor("客服", "业主看的是效果图，不是成本表。")
      ],
      [
        choice("downgrade-visible", "改材料，现金先活下来", { cash: 7, delivery: -3, public_trust: -4 }, { delivery_pressure: 5, data_inflation: 3 }, ["balance-sheet-maintenance"], "现金回来了，交付落差也回来了。", "降标最危险的是它常常合法，却不被用户接受。", { scaleScore: 3, followUps: [{ id: "homebuyer-open-day", delay: 5 }] }),
        choice("keep-visible-cut-hidden", "保外立面，砍看不见的机电余量", { cash: 4, public_trust: 1, delivery: -4 }, { delivery_pressure: 6, boss_safety: -1 }, ["risk-transfer-chain"], "表面效果保住，维护风险后移。", "看不见的成本削减，最后会从维修和安全边界上回来。", { scaleScore: 2 }),
        choice("tell-buyers-upfront", "公开调整，给业主补偿选择", { cash: -4, public_trust: 6, delivery: 2 }, { data_inflation: -4, boss_safety: 2 }, ["delivery-first"], "你少省了一些钱，多保了一点信任。", "困难可以说，但要给对方可选择的补偿，而不是只给解释。", { scaleScore: 1 })
      ]
    ),
    event(
      "quality-inspection-crack",
      "质检站抽查，地下车库裂缝上了照片",
      "three-red-lines",
      "crisis",
      ["EP101", "EP126"],
      ["delivery-first", "risk-transfer-chain"],
      "质检站临时抽查地下车库，裂缝照片被工作人员发进群。工程说能修，销售说别让客户知道，住建窗口说先停一停。",
      [
        actor("质检站", "先查原因，再谈复工。"),
        actor("工程经理", "能修，但别再赶节点。"),
        actor("销售总", "一停，客户就会以为楼要烂尾。")
      ],
      [
        choice("stop-and-repair", "停工检测，修完再说", { delivery: 6, cash: -7, sales: -5, public_trust: 3 }, { delivery_pressure: -4, boss_safety: 3 }, ["delivery-first"], "现场慢了，但风险被技术处理。", "质量问题不能只看舆情速度，要看技术闭环。", { scaleScore: -1 }),
        choice("repair-at-night", "夜里修补，白天继续带看", { sales: 4, cash: 2, delivery: -4 }, { data_inflation: 5, delivery_pressure: 6, boss_safety: -3 }, ["narrative-control"], "白天看起来没事，夜里知道的人更多。", "遮盖质量问题会把技术风险变成诚信风险。", { blowupRisk: 0.12, scaleScore: 3 }),
        choice("third-party-report", "请第三方出报告，同步给客户", { cash: -5, public_trust: 6, bank: 2 }, { data_inflation: -3, boss_safety: 2 }, ["balance-sheet-maintenance"], "报告不便宜，但银行和客户都有了抓手。", "可验证报告比老板保证更有信用。", { scaleScore: 1 })
      ]
    ),
    event(
      "county-dinner-guarantee",
      "饭桌上，区领导让你先把话说满",
      "early-expansion",
      "pressure",
      ["EP124", "EP126"],
      ["political-embedded-enterprise", "land-finance-loop"],
      "第一块地还没摘牌，区里已经在饭桌上谈投资额、税收和示范项目。领导没有写进合同，只看着你说：云江需要本地企业站出来。",
      [
        actor("区领导", "你先表态，后面的手续我们一起想办法。"),
        actor("老甲方", "饭桌上的话不是合同，但有时候比合同重。"),
        actor("财务", "老板，承诺一说出去，预算就不是预算了。")
      ],
      [
        choice("promise-big", "承诺做成县里样板盘", { government: 8, bank: 3, sales: 2 }, { political_dependency: 9, delivery_pressure: 3 }, ["political-embedded-enterprise"], "你拿到第一层地方信用，也把项目变成县里的面子工程。", "政商关系不是单纯资源，它会把商业项目变成地方任务。", { scaleScore: 6, followUps: [{ id: "county-media-praise", delay: 3 }] }),
        choice("promise-small", "只承诺按期交付，不承诺投资额", { government: 1, public_trust: 3 }, { political_dependency: -2, boss_safety: 2 }, ["exit-discipline"], "饭桌气氛冷了一点，但你的边界清楚了一点。", "边界会降低资源，也会降低未来被无限追责的概率。", { scaleScore: 1 }),
        choice("ask-written-support", "让对方把支持政策写进会议纪要", { government: -2, bank: 2 }, { political_dependency: -1, data_inflation: -1 }, ["balance-sheet-maintenance"], "领导觉得你不够爽快，银行却更愿意看可验证材料。", "房地产商要学会把口头信用转成可核验文件。", { scaleScore: 2 })
      ]
    ),
    event(
      "soil-report-red-line",
      "地勘报告：地下有条旧河道",
      "early-expansion",
      "pressure",
      ["EP114", "EP126"],
      ["balance-sheet-maintenance", "risk-transfer-chain"],
      "地勘报告出来，项目东侧地下有旧河道，基础成本要增加。投拓说报告可以先不进董事会，工程说现在不改设计，以后沉降就不是小钱。",
      [
        actor("工程经理", "现在改图贵，交付后返修更贵。"),
        actor("投拓经理", "报告一上会，这块地的利润表就不好看了。"),
        actor("设计院", "能压，但不能当不存在。")
      ],
      [
        choice("change-foundation", "改基础方案，利润先砍一刀", { cash: -8, delivery: 8, public_trust: 2 }, { delivery_pressure: -6, boss_safety: 2 }, ["delivery-first"], "账面利润变薄，工程风险变实。", "真实成本早进账，能减少后期交付事故。", { scaleScore: 2 }),
        choice("hide-report", "报告先放抽屉，等融资过会", { bank: 4, cash: 2 }, { data_inflation: 8, delivery_pressure: 8, boss_safety: -3 }, ["data-inflation", "balance-sheet-maintenance"], "融资材料好看了，地下问题还在地下。", "被报表藏起来的工程风险，最后会从现场冒出来。", { blowupRisk: 0.09, scaleScore: 5, followUps: [{ id: "quality-inspection-crack", delay: 7 }] }),
        choice("renegotiate-land-price", "拿报告去谈地价和配套", { government: -3, cash: 1, land_bank: 2 }, { political_dependency: -1 }, ["land-finance-loop"], "区里不高兴，但你把技术问题变成价格问题。", "真正懂项目的人，会把风险翻译成交易条件。", { scaleScore: 1 })
      ]
    ),
    event(
      "planning-ratio-envelope",
      "容积率多 0.3，附带一栋幼儿园",
      "early-expansion",
      "pressure",
      ["EP124", "EP016"],
      ["land-finance-loop", "risk-transfer-chain"],
      "规划口说可以把容积率往上调一点，但条件是你配建幼儿园和社区中心。销售测算很好看，现金流表很难看。",
      [
        actor("规划口", "城市功能要完整，不能只盖房子。"),
        actor("营销负责人", "多出来的面积都是钱。"),
        actor("成本经理", "配建是先花钱，回款不一定跟得上。")
      ],
      [
        choice("accept-ratio", "接受配建，换更高货值", { land_bank: 10, sales: 5, cash: -6 }, { delivery_pressure: 7, political_dependency: 4 }, ["land-finance-loop"], "货值变大，现金缺口也变大。", "高货值不是高现金，配建会先吃掉开发资金。", { scaleScore: 7 }),
        choice("reject-ratio", "不加容积率，按小盘做完", { delivery: 4, cash: 1, government: -2 }, { delivery_pressure: -4 }, ["exit-discipline"], "你放弃一部分货值，换来更低复杂度。", "小不是失败，过度复杂才可能把小老板拖死。", { scaleScore: 1 }),
        choice("delay-public-facility", "先卖住宅，配建后置", { sales: 6, cash: 5, government: 1 }, { delivery_pressure: 6, political_dependency: 5 }, ["risk-transfer-chain"], "住宅回款先来了，公共承诺被你放到后面。", "把公共配套后置，会把购房人和政府都变成未来债权人。", { blowupRisk: 0.08, scaleScore: 5, followUps: [{ id: "school-district-promise", delay: 5 }] })
      ]
    ),
    event(
      "first-mortgage-bank-visit",
      "银行只认回款，不认你的人情",
      "early-expansion",
      "pressure",
      ["EP126", "EP031"],
      ["balance-sheet-maintenance", "leverage-backfire"],
      "你第一次正式去银行谈开发贷。行长很客气，授信经理很冷：自有资金、销售节点、抵押物、预售监管，一项项往下问。",
      [
        actor("银行行长", "地方支持是一回事，授信材料是另一回事。"),
        actor("授信经理", "认购不等于回款，意向不等于合同。"),
        actor("你的财务", "我们缺的不是故事，是银行愿意承认的现金流。")
      ],
      [
        choice("real-report", "按真实现金流报，额度少一点", { bank: 5, cash: 4, sales: -1 }, { data_inflation: -3, boss_safety: 2 }, ["balance-sheet-maintenance"], "额度不高，但银行知道你没乱报。", "早期信用不是把材料做满，而是让债权人知道你可验证。", { scaleScore: 2 }),
        choice("inflate-sales", "把意向客户写成准回款", { bank: 6, cash: 8 }, { data_inflation: 9, price_bubble: 3, boss_safety: -2 }, ["data-inflation"], "额度好看了，未来对账也更难看。", "融资材料里的口径，会在市场下行时变成追责材料。", { scaleScore: 6 }),
        choice("pledge-family-assets", "拿家里资产追加担保", { bank: 8, cash: 6 }, { boss_safety: -4, political_dependency: 1 }, ["leverage-backfire"], "银行点头了，你的个人安全线也被拉进公司。", "小老板最容易忽视的是：企业风险会穿透到个人和家庭。", { scaleScore: 5 })
      ]
    ),
    event(
      "agency-exclusive-contract",
      "渠道要独家，佣金翻倍",
      "early-expansion",
      "routine",
      ["EP125", "EP114"],
      ["platformized-sales", "phantom-demand"],
      "售楼处冷清，渠道公司提出独家代理：他们保证人气，但佣金翻倍，折扣口径由他们控制。",
      [
        actor("渠道经理", "人我能带来，价格你别管太细。"),
        actor("案场经理", "没有渠道，这个盘就像没人知道。"),
        actor("财务", "佣金先走，利润后算。")
      ],
      [
        choice("exclusive-channel", "给独家，先把人带进来", { sales: 10, cash: 4, public_trust: -2 }, { price_bubble: 5, data_inflation: 4 }, ["platformized-sales"], "售楼处热了，真实客户和凑数客户混在一起。", "渠道能给速度，也能让你失去价格和客户质量控制。", { scaleScore: 5 }),
        choice("split-channels", "分三家渠道互相制衡", { sales: 5, cash: 1 }, { data_inflation: 1 }, ["platformized-sales"], "热度没那么猛，但你看得见每家质量。", "流量不能只看总数，还要看来源和转化。", { scaleScore: 2 }),
        choice("build-own-sales", "不用独家，自己慢慢养案场", { sales: -2, cash: -3, public_trust: 4 }, { price_bubble: -2 }, ["exit-discipline"], "你慢了，但客户资料留在自己手里。", "自有销售慢，但能减少渠道制造的虚假繁荣。", { scaleScore: 1 })
      ]
    ),
    event(
      "sample-room-cost-cut",
      "样板间像豪宅，交付标准写在小字里",
      "early-expansion",
      "routine",
      ["EP114", "EP125"],
      ["phantom-demand", "data-inflation"],
      "样板间预算超了。营销说样板间必须惊艳，法务说交付标准要写清楚，工程说客户看到的和拿到的差太多会闹。",
      [
        actor("营销负责人", "样板间不梦幻，客户不会掏钱。"),
        actor("法务", "小字可以写，但小字挡不住怒气。"),
        actor("工程经理", "效果图卖房，交付现场还债。")
      ],
      [
        choice("luxury-sample", "样板间拉满，合同小字兜底", { sales: 8, cash: 3, public_trust: -2 }, { data_inflation: 5, price_bubble: 4 }, ["phantom-demand"], "客户被打动，未来对比也会更刺眼。", "视觉承诺不是法律承诺，却会变成信任承诺。", { scaleScore: 5 }),
        choice("same-standard", "样板间按真实交付做", { sales: -2, public_trust: 6, delivery: 4 }, { data_inflation: -3 }, ["delivery-first"], "没那么惊艳，但少一层未来落差。", "真实交付标准会牺牲短期转化，换长期信任。", { scaleScore: 1 }),
        choice("upgrade-package", "基础交付普通，另卖升级包", { cash: 4, sales: 3 }, { price_bubble: 2, delivery_pressure: 3 }, ["value-capture", "platformized-sales"], "你把落差变成收费项，也增加了交付复杂度。", "把差异商品化能赚钱，也会让交付边界更碎。", { scaleScore: 3 })
      ]
    ),
    event(
      "buyer-lottery-room",
      "摇号名单里，多了三个关系户",
      "early-expansion",
      "pressure",
      ["EP004", "EP124"],
      ["political-embedded-enterprise", "risk-transfer-chain"],
      "小盘第一次开盘，房源紧俏。有人递来三个名字，说都是“要照顾的人”。你知道名单一动，客户群早晚会听到风声。",
      [
        actor("关系人", "三套房，不影响大局。"),
        actor("案场经理", "客户排了一夜，真闹起来我压不住。"),
        actor("你自己", "第一盘就得罪人，后面怎么办？")
      ],
      [
        choice("reserve-rooms", "留三套，换关系顺畅", { government: 5, sales: 2, public_trust: -4 }, { political_dependency: 6, boss_safety: -1 }, ["political-embedded-enterprise"], "关系人满意，客户公平感被掏了一块。", "小特权会把市场交易变成关系账。", { scaleScore: 4 }),
        choice("public-lottery", "公开摇号，不留房源", { public_trust: 7, government: -4, sales: 2 }, { political_dependency: -3 }, ["exit-discipline"], "客户信你，关系人记你。", "透明会得罪人，但能形成自己的市场信用。", { scaleScore: 2 }),
        choice("raise-price-filter", "提高首付门槛，让名单自然出局", { cash: 5, sales: -2, public_trust: -2 }, { price_bubble: 5, data_inflation: 2 }, ["phantom-demand"], "你没有直接插队，却用价格筛掉了一批人。", "规则看似中立，也可能把风险转给弱势客户。", { scaleScore: 3 })
      ]
    ),
    event(
      "roof-waterproof-shortcut",
      "雨季前，防水层要不要省一道",
      "early-expansion",
      "pressure",
      ["EP126", "EP114"],
      ["delivery-first", "balance-sheet-maintenance"],
      "雨季快到，防水分包说按图施工来不及。成本部给你两个方案：省一道工序能赶节点，补全工序会错过预售节奏。",
      [
        actor("防水分包", "省一道，不一定漏；不省，肯定慢。"),
        actor("工程经理", "漏水不是今天爆，是交房后爆。"),
        actor("销售总", "预售节点错过，现金流先漏。")
      ],
      [
        choice("skip-layer", "省一道，先赶预售节点", { sales: 5, cash: 5, delivery: -4 }, { delivery_pressure: 7, boss_safety: -2 }, ["leverage-backfire"], "节点赶上了，质量账往后记。", "工程偷出来的时间，常常在交付后加倍还。", { scaleScore: 5, followUps: [{ id: "homebuyer-open-day", delay: 8 }] }),
        choice("full-waterproof", "补全工序，推迟开盘", { delivery: 7, cash: -5, sales: -4 }, { delivery_pressure: -4 }, ["delivery-first"], "雨季不怕了，销售窗口窄了。", "质量选择也是融资选择，因为慢会影响回款。", { scaleScore: 1 }),
        choice("shift-to-subcontractor", "让分包签质量承诺，节点照旧", { sales: 4, cash: 3 }, { delivery_pressure: 5, off_balance_debt: 4 }, ["risk-transfer-chain"], "文件上责任转出去了，客户只认识开发商。", "对外转移责任，不等于从用户心里转移责任。", { scaleScore: 3 })
      ]
    ),
    event(
      "fire-acceptance-dinner",
      "消防验收前，顾问要一笔协调费",
      "early-expansion",
      "pressure",
      ["EP004", "EP126"],
      ["political-embedded-enterprise", "gray-governance"],
      "消防验收卡在几个整改项。一个顾问说他熟，费用不开发票，能让你赶上开盘。",
      [
        actor("顾问", "不是买结果，是买沟通效率。"),
        actor("工程经理", "整改能做，就是要时间和钱。"),
        actor("法务", "不开票的钱，最后都可能开成问题。")
      ],
      [
        choice("pay-consultant", "付协调费，先过节点", { sales: 5, cash: -3, government: 2 }, { gray_risk: 7, boss_safety: -3 }, ["gray-governance"], "节点过了，灰线多了一笔。", "小额灰色费用最危险的是它让你习惯用非正式路径。", { scaleScore: 4 }),
        choice("fix-items", "按项整改，开盘延后", { delivery: 6, cash: -5, sales: -3 }, { gray_risk: -3, boss_safety: 2 }, ["delivery-first"], "钱花得难看，账留得清楚。", "合规成本越早支付，后期解释成本越低。", { scaleScore: 1 }),
        choice("ask-window-written-list", "要求窗口列书面整改清单", { government: -2, delivery: 4 }, { gray_risk: -2, data_inflation: -2 }, ["balance-sheet-maintenance"], "对方嫌你麻烦，但整改边界清楚。", "书面清单能降低模糊寻租空间，也会降低办事速度。", { scaleScore: 2 })
      ]
    ),
    event(
      "county-media-praise",
      "县融媒要拍你：本土房企样板",
      "shelter-reform-boom",
      "routine",
      ["EP114", "EP124"],
      ["narrative-control", "political-embedded-enterprise"],
      "县融媒准备做一期专题，把你包装成本土企业转型样板。宣传能带来客户，也会把你绑定成县里的成功案例。",
      [
        actor("融媒记者", "老板讲讲情怀，最好带一点城市梦想。"),
        actor("营销负责人", "这是免费广告。"),
        actor("财务", "讲得越满，后面越难退。")
      ],
      [
        choice("hero-story", "讲大故事：云江人盖云江好房", { sales: 7, government: 5, public_trust: 2 }, { political_dependency: 6, data_inflation: 3 }, ["political-embedded-enterprise"], "你成了样板，也更难承认困难。", "叙事一旦公共化，企业问题就会变成地方脸面。", { scaleScore: 5 }),
        choice("project-facts", "只讲工期、户型和交付标准", { public_trust: 5, sales: 2 }, { data_inflation: -2 }, ["delivery-first"], "专题没那么燃，但客户更清楚你卖什么。", "产品事实比宏大叙事更不刺激，但更抗反噬。", { scaleScore: 2 }),
        choice("avoid-media", "婉拒专题，不当样板", { government: -3, sales: -1, boss_safety: 2 }, { political_dependency: -3 }, ["exit-discipline"], "你少了曝光，也少了一层政治绑定。", "不上台面有时是保护，但也会错过信用放大。", { scaleScore: 0 })
      ]
    ),
    event(
      "land-parcel-bundle",
      "好地块旁边，绑着一块安置房硬骨头",
      "shelter-reform-boom",
      "high",
      ["EP124", "EP101"],
      ["land-finance-loop", "risk-transfer-chain"],
      "县里把一块好地和一块安置房项目打包。好地能赚钱，安置房现金流差但关系重。你不接，可能进不了下一轮。",
      [
        actor("自然资源口", "打包是综合平衡，不是单个项目买卖。"),
        actor("投拓经理", "好地难得，硬骨头只能一起吞。"),
        actor("工程经理", "安置房最怕拖，拖了都是实名投诉。")
      ],
      [
        choice("take-bundle", "一起接，先拿好地", { land_bank: 12, government: 8, debt: 8, cash: -8 }, { delivery_pressure: 9, political_dependency: 7 }, ["land-finance-loop"], "你拿到好地，也接住公共责任。", "打包出让把商业收益和公共责任绑在一起。", { scaleScore: 9 }),
        choice("joint-with-lgfv", "拉城投一起接安置房", { government: 5, bank: 5, land_bank: 6 }, { political_dependency: 8, off_balance_debt: 3 }, ["political-embedded-enterprise"], "现金压力小了，控制权也分出去。", "用城投分担风险，会换来更深的处置绑定。", { scaleScore: 6 }),
        choice("walk-away", "放弃好地，不吃打包风险", { cash: 2, government: -6, land_bank: -3 }, { delivery_pressure: -4, boss_safety: 3 }, ["exit-discipline"], "你错过机会，也避开一条责任链。", "不是每块好地都值得拿，尤其当它附带不可定价责任。", { scaleScore: -1 })
      ]
    ),
    event(
      "cashflow-week",
      "周五四笔钱，同时到期",
      "shelter-reform-boom",
      "high",
      ["EP126", "EP031"],
      ["leverage-backfire", "risk-transfer-chain"],
      "周五要付银行利息、工人工资、渠道佣金和材料商欠款。你现金只够两项。付谁，谁就暂时闭嘴；不付谁，谁就可能换战场。",
      [
        actor("财务", "这不是缺钱，是缺顺序。"),
        actor("渠道经理", "佣金不付，下周没人带看。"),
        actor("材料商", "我们不懂你们宏观，只看到账。")
      ],
      [
        choice("pay-bank-workers", "付银行和工资，拖渠道和材料", { bank: 4, delivery: 3, sales: -5, cash: -10 }, { off_balance_debt: 5 }, ["risk-transfer-chain"], "银行和工地稳住，销售端和供应端开始结怨。", "付款顺序就是风险排序，没被付的人会寻找新杠杆。", { followUps: [{ id: "supplier-blockade", delay: 4 }] }),
        choice("pay-channel-materials", "付渠道和材料，拖银行利息", { sales: 5, delivery: 3, bank: -7, cash: -9 }, { off_balance_debt: 2, boss_safety: -1 }, ["leverage-backfire"], "售楼处和现场稳住，银行把你列进关注名单。", "债权人被拖一次，下一次会先保护自己。", { followUps: [{ id: "bank-loan-withdrawal", delay: 5 }] }),
        choice("partial-all", "每家付一点，谁都不满意", { cash: -7, public_trust: 1 }, { off_balance_debt: 4, data_inflation: 2 }, ["balance-sheet-maintenance"], "你买到一周时间，也让所有人知道你紧。", "平均撒钱不是解决，只是延迟所有矛盾。", { scaleScore: 1 })
      ]
    ),
    event(
      "channel-refund-fight",
      "客户退认购，渠道说佣金不退",
      "shelter-reform-boom",
      "routine",
      ["EP125", "EP114"],
      ["platformized-sales", "risk-transfer-chain"],
      "一批客户退认购，渠道已经拿走佣金。销售说不能开这个口子，客户说销售当时承诺能退。",
      [
        actor("客户", "没网签，凭什么不退？"),
        actor("渠道经理", "人是我带来的，佣金按到访和认购算。"),
        actor("案场经理", "话术是渠道讲的，骂名是项目背。")
      ],
      [
        choice("refund-buyers", "先退客户，和渠道慢慢扯", { cash: -6, public_trust: 6, sales: -2 }, { data_inflation: -2 }, ["delivery-first"], "客户情绪下去了，渠道开始不配合。", "先保客户信任会伤渠道效率，但能保护长期口碑。", { scaleScore: 1 }),
        choice("hold-deposits", "按合同不退，稳现金", { cash: 5, public_trust: -7, sales: -2 }, { boss_safety: -2 }, ["risk-transfer-chain"], "现金留住，投诉也留下。", "合同正确不一定情绪正确，购房人会用舆情重开谈判。", { followUps: [{ id: "online-rumor-crane-stop", delay: 3 }] }),
        choice("split-loss", "项目、渠道、客户三方各退一步", { cash: -3, public_trust: 3, sales: 1 }, { data_inflation: -1 }, ["platformized-sales"], "没人完全满意，但没有人立刻掀桌。", "平台化销售的治理难点，是让拿收益的人也承担一部分售后。", { scaleScore: 2 })
      ]
    ),
    event(
      "online-rumor-crane-stop",
      "本地群在传：你们塔吊停了",
      "shelter-reform-boom",
      "pressure",
      ["EP114", "EP125"],
      ["narrative-control", "delivery-first"],
      "本地业主群突然传出照片，说你工地停了。照片是上周雨天拍的，但现在现场确实人不多。你要不要回应？怎么回应？",
      [
        actor("公关", "先辟谣，不能让恐慌扩散。"),
        actor("工程经理", "现场这两天确实少人，别说太满。"),
        actor("业主", "你发声明没用，我明天自己去看。")
      ],
      [
        choice("open-site-video", "直接开工地直播，能看多少看多少", { public_trust: 6, delivery: 2, sales: 1 }, { data_inflation: -3 }, ["delivery-first"], "现场不完美，但比谣言可信。", "危机沟通最有力的是可验证现场，不是漂亮声明。", { scaleScore: 2 }),
        choice("deny-hard", "强硬辟谣：恶意造谣，保留追责", { public_trust: -4, government: 1 }, { data_inflation: 5, boss_safety: -1 }, ["narrative-control"], "声明压住一小时，截图传了一整天。", "事实没有闭合时，强硬叙事会变成新证据。", { followUps: [{ id: "stoppage-video", delay: 4 }] }),
        choice("private-appease", "私下安抚业主代表，暂不公开", { public_trust: 2, cash: -2 }, { political_dependency: 2 }, ["risk-transfer-chain"], "核心业主暂时安静，普通客户更不确定。", "私下稳定能降低噪音，但会制造信息不对称。", { scaleScore: 1 })
      ]
    ),
    event(
      "price-control-window",
      "住建局约谈：别涨太猛，也别降太狠",
      "shelter-reform-boom",
      "pressure",
      ["EP101", "EP124"],
      ["political-embedded-enterprise", "balance-sheet-maintenance"],
      "市场热的时候，住建局不让你涨太快；市场冷的时候，又不希望你降太狠。价格不只是商业决策，也变成稳定工具。",
      [
        actor("住建窗口", "价格要稳，预期也要稳。"),
        actor("销售总", "不涨损失利润，不降损失现金。"),
        actor("老业主", "你敢降，我就拉横幅。")
      ],
      [
        choice("keep-official-price", "表价稳定，暗中做优惠", { sales: 5, cash: 4, public_trust: -3 }, { data_inflation: 5, price_bubble: 3 }, ["balance-sheet-maintenance"], "表面稳住，真实价格开始双轨。", "价格双轨会保护表面秩序，也会腐蚀市场信任。", { scaleScore: 4 }),
        choice("report-real-cut", "报备真实降价，换现金", { cash: 8, sales: 7, government: -3, public_trust: -3 }, { price_bubble: -5 }, ["exit-discipline"], "现金回来，关系和老业主都不舒服。", "下行期真实出清会伤很多人的账面。", { scaleScore: 2 }),
        choice("hold-price", "不降价，等下一波行情", { sales: -6, cash: -4, public_trust: 2 }, { price_bubble: 6, delivery_pressure: 3 }, ["phantom-demand"], "价格守住，回款掉下去。", "守价格可能只是守住幻觉，现金流不会等你。", { scaleScore: 0 })
      ]
    ),
    event(
      "second-city-temptation",
      "邻县招商局请你去看地",
      "shelter-reform-boom",
      "high",
      ["EP031", "EP101"],
      ["leverage-backfire", "political-embedded-enterprise"],
      "邻县招商局派车来接，说他们也缺本地标杆房企。你的第一个盘还没交付，第二个县已经把酒倒满。",
      [
        actor("邻县招商局", "来看看，不拿地也交个朋友。"),
        actor("投拓经理", "跨县以后，我们就是区域房企。"),
        actor("工程经理", "第一个盘还没跑通，第二个项目会把管理摊薄。")
      ],
      [
        choice("enter-second-county", "去邻县拿地，抢窗口", { land_bank: 12, government: 5, debt: 8, cash: -8 }, { delivery_pressure: 6, political_dependency: 5 }, ["leverage-backfire"], "你开始像区域房企，也开始有区域房企的管理半径。", "跨城扩张最难的是复制能力，而不是复制胆量。", { scaleScore: 10 }),
        choice("option-only", "只签意向，不交保证金", { government: 2, land_bank: 3, cash: -1 }, { data_inflation: 2 }, ["balance-sheet-maintenance"], "你保留可能性，也没有真下注。", "意向可以换关系，但不能当资产。", { scaleScore: 2 }),
        choice("finish-first", "拒绝扩张，先交第一个盘", { delivery: 7, public_trust: 4, government: -3 }, { delivery_pressure: -4 }, ["delivery-first"], "你错过一个饭局，项目更稳一点。", "经营纪律往往表现为拒绝看起来很香的机会。", { scaleScore: 1 })
      ]
    ),
    event(
      "employee-sales-target",
      "销售冠军用亲戚名额刷流水",
      "high-turnover",
      "routine",
      ["EP114", "EP125"],
      ["data-inflation", "phantom-demand"],
      "月度销售冲刺，销售冠军让亲戚先交认购，月底再退。报表很好看，现金流一般，渠道也开始学。",
      [
        actor("销售冠军", "行业都这么冲刺，不做就输。"),
        actor("财务", "认购进来又退，现金预测会失真。"),
        actor("渠道经理", "你们自己刷流水，就别说渠道假。")
      ],
      [
        choice("allow-flush", "默许冲刺，先保月报", { sales: 8, bank: 3 }, { data_inflation: 9, price_bubble: 2 }, ["data-inflation"], "月报过线，真实需求更难看清。", "虚假销售最先骗到的不是银行，而是老板自己。", { scaleScore: 5 }),
        choice("ban-and-correct", "撤销假认购，月报难看", { sales: -6, bank: -2, public_trust: 3 }, { data_inflation: -6, boss_safety: 2 }, ["balance-sheet-maintenance"], "数字难看，但质量变清楚。", "真实数据会痛，但能帮你早一点刹车。", { scaleScore: 0 }),
        choice("separate-quality", "保留认购，但另列退订率", { sales: 3, bank: 1 }, { data_inflation: -2 }, ["data-inflation"], "表面指标保住，内部多了一张真表。", "如果不得不讲故事，至少内部要保留真实仪表。", { scaleScore: 2 })
      ]
    ),
    event(
      "material-substitution",
      "门窗报价便宜 18%，质保少五年",
      "high-turnover",
      "pressure",
      ["EP126", "EP114"],
      ["delivery-first", "balance-sheet-maintenance"],
      "成本部找到一家便宜供应商，门窗报价低 18%，但质保年限短，售后口碑一般。省下来的钱能补销售费用。",
      [
        actor("成本经理", "不省成本，利润表没法看。"),
        actor("工程经理", "门窗坏得慢，骂名来得久。"),
        actor("销售总", "省下来的钱能买一个月流量。")
      ],
      [
        choice("cheap-material", "换便宜门窗，先保利润", { cash: 6, sales: 2, delivery: -4 }, { delivery_pressure: 5, boss_safety: -1 }, ["balance-sheet-maintenance"], "利润表好看一点，交付售后难看一点。", "成本压缩不是免费利润，它会变成售后和口碑债。", { scaleScore: 4 }),
        choice("keep-quality", "维持原供应商，砍营销费用", { cash: -4, delivery: 6, sales: -3 }, { delivery_pressure: -3 }, ["delivery-first"], "你保住质量，牺牲获客。", "保交付通常会让短期销售难看。", { scaleScore: 1 }),
        choice("tiered-standard", "高低配分楼栋，合同写清楚", { cash: 2, sales: 1 }, { data_inflation: 2, delivery_pressure: 2 }, ["data-inflation"], "你把质量差异写进合同，也增加解释成本。", "透明分级比偷换材料好，但客户未必接受复杂解释。", { scaleScore: 2 })
      ]
    ),
    event(
      "workers-injury-night",
      "夜间赶工，一个工人从脚手架摔下",
      "high-turnover",
      "crisis",
      ["EP004", "EP126"],
      ["delivery-first", "risk-transfer-chain"],
      "为了赶预售节点，工地夜间施工。凌晨两点，一个工人摔下脚手架。总包想私了，工程经理说必须停工排查。",
      [
        actor("总包", "先把人送医院，别扩大。"),
        actor("工程经理", "不停工排查，下一次就是更大事故。"),
        actor("家属", "人还在医院，你们先问影响开盘？")
      ],
      [
        choice("stop-investigate", "停工排查，公开处理", { delivery: 4, public_trust: 4, cash: -7, sales: -4 }, { boss_safety: 4, gray_risk: -2 }, ["delivery-first"], "开盘推迟，但事故没有被压成隐患。", "安全事故不能用进度逻辑处理。", { scaleScore: -1 }),
        choice("private-settle", "私下补偿，节点照旧", { sales: 5, cash: -4, delivery: -4 }, { gray_risk: 8, boss_safety: -6 }, ["gray-governance"], "节点保住，家属和工人都记住了处理方式。", "私了不是消失，而是把事故变成未来证据。", { blowupRisk: 0.12, scaleScore: 4, followUps: [{ id: "anti-gang-investigation", delay: 10 }] }),
        choice("blame-contractor-safety", "追责总包，项目不出面", { cash: 1, delivery: -3, public_trust: -3 }, { off_balance_debt: 3, boss_safety: -2 }, ["risk-transfer-chain"], "总包背锅，但工地合作气氛裂了。", "责任可以按合同分，公众不会按合同分情绪。", { scaleScore: 1 })
      ]
    ),
    event(
      "commercial-paper-maturity",
      "第一批商票到期，微信群开始点名",
      "high-turnover",
      "high",
      ["EP031", "EP126"],
      ["balance-sheet-maintenance", "risk-transfer-chain"],
      "半年前开的商票到期。供应商建了群，把票据、合同、现场照片都发了出来。你可以兑一部分，也可以继续展期。",
      [
        actor("供应商", "票是你开的，楼是你卖的，别让我们替你垫。"),
        actor("财务", "全兑现金断，展期信用断。"),
        actor("公关", "群截图已经流出去了。")
      ],
      [
        choice("cash-top-suppliers", "兑付头部供应商，拆群", { cash: -10, delivery: 4, public_trust: 2 }, { off_balance_debt: -5 }, ["risk-transfer-chain"], "大供应商安静，小供应商更愤怒。", "选择性兑付能止血，也会制造新的不公平。", { followUps: [{ id: "supplier-blockade", delay: 4 }] }),
        choice("roll-paper", "统一展期三个月", { cash: 2, bank: 1 }, { off_balance_debt: 9, boss_safety: -2 }, ["balance-sheet-maintenance"], "现金留下了，信任被展期。", "展期是时间工具，不是清偿工具。", { scaleScore: 4 }),
        choice("swap-houses-early", "用折扣房抵一部分票", { debt: -4, sales: -2, cash: 2 }, { price_bubble: 4, data_inflation: 3 }, ["risk-transfer-chain"], "供应商变成被迫卖房的人。", "以房抵债会把债务压力转成市场价格压力。", { scaleScore: 2 })
      ]
    ),
    event(
      "trust-covenant-review",
      "信托来查：钱到底进了哪个项目",
      "high-turnover",
      "high",
      ["EP031", "EP046"],
      ["leverage-backfire", "presale-cashflow-trap"],
      "信托资金合同约定专款专用。对方突然要查流水，你发现有几笔钱被集团临时调去补了另一个项目。",
      [
        actor("信托经理", "我们要看流水，不看解释。"),
        actor("财务", "调款时说两周还，现在已经六周。"),
        actor("项目总", "钱回来之前，我这边没法复工。")
      ],
      [
        choice("return-money-fast", "卖车位和商铺，把钱补回项目", { cash: -6, delivery: 6, debt: -2 }, { presale_misuse: -4, boss_safety: 3 }, ["delivery-first"], "你用资产折价换回合规。", "补窟窿越早，刑责味道越淡。", { scaleScore: 0 }),
        choice("explain-temporary", "解释为临时调剂，争取宽限", { bank: -2, cash: 1 }, { presale_misuse: 6, off_balance_debt: 4 }, ["balance-sheet-maintenance"], "对方没当场翻脸，但把你列入重点跟踪。", "临时调剂如果没有现金回流，就会变成挪用。", { scaleScore: 2 }),
        choice("new-trust-cover-old", "找新资金覆盖旧流水", { cash: 8, debt: 8 }, { off_balance_debt: 9, boss_safety: -3 }, ["leverage-backfire"], "流水圆上了，杠杆更高了。", "用新钱解释旧钱，会把资金链做成接力赛。", { scaleScore: 6 })
      ]
    ),
    event(
      "group-loan-guarantee",
      "兄弟公司让你互保：不签他今天就爆",
      "high-turnover",
      "high",
      ["EP031", "EP126"],
      ["risk-transfer-chain", "leverage-backfire"],
      "一个合作过的兄弟房企快断贷，希望你给他做互保。他说熬过这个月就能卖地回款。你知道互保一签，他的雷也可能变成你的雷。",
      [
        actor("兄弟老板", "今天你帮我，明天我帮你。"),
        actor("银行", "有你们互保，续贷会好看。"),
        actor("财务", "这不是人情，是或有负债。")
      ],
      [
        choice("sign-guarantee", "签互保，保住关系网", { government: 3, bank: 3 }, { off_balance_debt: 10, boss_safety: -3 }, ["risk-transfer-chain"], "关系保住了，别人的债务影子进了你的账本。", "互保最危险的是雷不在你手里，却能炸在你账上。", { scaleScore: 4, followUps: [{ id: "distressed-project-bargain", delay: 6 }] }),
        choice("reject-guarantee", "拒绝互保，按项目切割", { bank: -2, government: -2, cash: 1 }, { off_balance_debt: -2, boss_safety: 3 }, ["exit-discipline"], "你得罪了圈子，保住了边界。", "金融关系不是越多越好，能切割才是真信用。", { scaleScore: 0 }),
        choice("asset-backed-help", "只接受资产抵押，不做人情担保", { bank: 2, government: 1, cash: -3 }, { off_balance_debt: 2 }, ["balance-sheet-maintenance"], "你帮了一半，也留了抓手。", "救别人前先问：我拿到的是资产，还是故事？", { scaleScore: 2 })
      ]
    ),
    event(
      "guarantee-letter-template",
      "政府要你签一份保交付承诺书",
      "three-red-lines",
      "pressure",
      ["EP101", "EP126"],
      ["delivery-first", "political-embedded-enterprise"],
      "融资收紧后，县里要求重点房企签保交付承诺书。内容不只是按期交房，还包括资金封闭、重大事项报备和舆情响应。",
      [
        actor("住建局", "签了，是态度；不签，也是态度。"),
        actor("法务", "这份承诺会改变你后面的自由度。"),
        actor("销售总", "客户看到承诺，会放心一点。")
      ],
      [
        choice("sign-full", "全部签，换政府和客户信心", { government: 7, public_trust: 5, sales: 2 }, { political_dependency: 8, delivery_pressure: -2 }, ["delivery-first"], "信心回来一点，自由少了一点。", "保交付承诺能稳市场，也会把老板拉进处置体系。", { scaleScore: 3 }),
        choice("sign-with-budget", "附上资金测算和条件", { government: 2, bank: 2, public_trust: 2 }, { data_inflation: -2 }, ["balance-sheet-maintenance"], "政府觉得你不够积极，但文件更真实。", "承诺必须和资金来源绑定，否则就是下一张空头支票。", { scaleScore: 1 }),
        choice("delay-sign", "拖一拖，先看同行怎么签", { government: -5, public_trust: -2 }, { political_dependency: -1, boss_safety: -1 }, ["risk-transfer-chain"], "你保留空间，也被列为不积极。", "观望能减少承诺，但会损害处置时的信任。", { scaleScore: -1 })
      ]
    ),
    event(
      "local-election-change",
      "县里换届，新领导先看旧账",
      "three-red-lines",
      "high",
      ["EP012", "EP037", "EP078"],
      ["political-embedded-enterprise", "balance-sheet-maintenance"],
      "新领导到任，第一件事是梳理前任招商和土地项目。你过去的饭局承诺、会议纪要和优惠政策都要重新解释。",
      [
        actor("新领导秘书", "历史项目要重新摸底。"),
        actor("老关系人", "先别急，我帮你问问。"),
        actor("法务", "口头承诺现在最难解释。")
      ],
      [
        choice("open-files", "主动交项目台账和风险清单", { government: 2, bank: 1 }, { political_dependency: -3, boss_safety: 3 }, ["balance-sheet-maintenance"], "账难看，但你先定义了问题边界。", "换届时，事实链比旧关系更可靠。", { scaleScore: 1 }),
        choice("use-old-network", "找旧关系人继续协调", { government: 1, cash: -2 }, { political_dependency: 8, boss_safety: -4 }, ["political-embedded-enterprise"], "你暂时打通一条线，也更像旧账的一部分。", "靠旧关系解释新问题，会把你绑进更大的政治叙事。", { scaleScore: 2 }),
        choice("pause-investment", "暂停新投入，等风向清楚", { cash: 3, sales: -2, government: -2 }, { delivery_pressure: 2, boss_safety: 2 }, ["exit-discipline"], "你保住现金，但被看成态度不明。", "不下注也是选择，代价是资源方可能先离你远一点。", { scaleScore: 0 })
      ]
    ),
    event(
      "homebuyer-open-day",
      "业主开放日，楼板裂缝被拍到",
      "three-red-lines",
      "crisis",
      ["EP101", "EP126"],
      ["delivery-first", "risk-transfer-chain"],
      "为了稳信心，你开放工地给业主看。结果有人拍到楼板裂缝，视频配文：还没交房就这样？工程说是表面收缩，业主不信。",
      [
        actor("工程经理", "不是结构问题，但需要专业说明。"),
        actor("业主代表", "你们每次都说不是大问题。"),
        actor("公关", "别让工程师说太专业，没人听得懂。")
      ],
      [
        choice("third-party-test", "请第三方检测，结果公开", { cash: -5, public_trust: 6, delivery: 4 }, { boss_safety: 2, data_inflation: -2 }, ["delivery-first"], "检测花钱，但信任有了抓手。", "技术问题要用可验证机制解决，不要只靠解释。", { scaleScore: 1 }),
        choice("pr-explain", "发说明：正常收缩，不影响安全", { public_trust: -5, cash: 1 }, { data_inflation: 4, delivery_pressure: 3 }, ["narrative-control"], "说明没人转，质疑一直转。", "现场证据出现后，空泛说明很难恢复信任。", { followUps: [{ id: "stoppage-video", delay: 3 }] }),
        choice("compensate-quietly", "给核心业主补偿，别扩大", { cash: -4, public_trust: 2 }, { political_dependency: 2, boss_safety: -1 }, ["risk-transfer-chain"], "代表安静了，普通业主觉得被区别对待。", "私下补偿能买短期安静，也会制造新不公平。", { scaleScore: 0 })
      ]
    ),
    event(
      "sales-data-meeting",
      "月报上，认购、网签、回款差了三张表",
      "three-red-lines",
      "pressure",
      ["EP114", "EP031"],
      ["data-inflation", "balance-sheet-maintenance"],
      "董事会上，销售说认购完成 96%，财务说回款只到 54%，银行要看网签。三张表都没错，但讲的是三个世界。",
      [
        actor("销售总", "认购代表市场热度。"),
        actor("财务", "回款才进账户。"),
        actor("银行", "网签才是我能认的抵押逻辑。")
      ],
      [
        choice("use-sales-number", "对外只讲认购 96%", { sales: 6, bank: 1 }, { data_inflation: 8, boss_safety: -2 }, ["data-inflation"], "故事好听，现金不跟。", "把不同口径混用，会让所有人高估安全边际。", { scaleScore: 4 }),
        choice("show-three-tables", "三张表一起上，承认缺口", { bank: 3, sales: -2, public_trust: 2 }, { data_inflation: -5 }, ["balance-sheet-maintenance"], "会议难看，但问题变清楚。", "真实口径让组织痛，却能避免错误扩张。", { scaleScore: 1 }),
        choice("push-collections", "暂停新认购，集中催回款", { cash: 7, sales: -4, bank: 2 }, { delivery_pressure: -1 }, ["delivery-first"], "销售排名掉了，现金回来一点。", "回款比热度更像生命线。", { scaleScore: 2 })
      ]
    ),
    event(
      "unfinished-neighbor",
      "隔壁烂尾盘业主来你售楼处讨说法",
      "three-red-lines",
      "pressure",
      ["EP101", "EP126"],
      ["risk-transfer-chain", "delivery-first"],
      "隔壁项目停工，业主跑到你售楼处问：你们会不会也一样？这不是你的盘，但情绪已经进了你的案场。",
      [
        actor("隔壁业主", "你们开发商都一个样。"),
        actor("你的客户", "我想买，但我怕烂尾。"),
        actor("销售总", "再不稳住，今天成交全没了。")
      ],
      [
        choice("open-progress-ledger", "公开工程进度和监管账户节点", { public_trust: 6, sales: 2, cash: -1 }, { data_inflation: -3 }, ["delivery-first"], "客户看到证据，情绪缓下来。", "同行爆雷时，你需要可验证事实证明自己不是同类风险。", { scaleScore: 2 }),
        choice("distance-neighbor", "强调隔壁和你无关", { public_trust: -2, sales: -2 }, { boss_safety: -1 }, ["risk-transfer-chain"], "逻辑上没错，情绪上没用。", "行业信任塌的时候，单个企业很难靠切割恢复信任。", { scaleScore: 0 }),
        choice("offer-delivery-insurance", "推出延期赔付承诺", { sales: 5, public_trust: 4 }, { delivery_pressure: 6, off_balance_debt: 2 }, ["delivery-first"], "客户安心一点，你多了一张未来赔付表。", "承诺能换信心，但必须问：如果真的延期，钱从哪里来？", { scaleScore: 3 })
      ]
    ),
    event(
      "court-freeze-account",
      "供应商申请冻结项目账户",
      "sales-freeze",
      "crisis",
      ["EP031", "EP126"],
      ["risk-transfer-chain", "balance-sheet-maintenance"],
      "一个小供应商先动手了，向法院申请冻结项目公司账户。金额不大，但账户一冻，工地付款和监管审核都会卡。",
      [
        actor("供应商律师", "我们只依法保全。"),
        actor("财务", "金额小，影响大。"),
        actor("项目总", "今天付不了款，明天现场就慢。")
      ],
      [
        choice("settle-fast", "马上和解，解除冻结", { cash: -6, delivery: 3, public_trust: 1 }, { off_balance_debt: -3 }, ["risk-transfer-chain"], "账户解了，其他供应商看见了路径。", "快速和解能止损，也可能鼓励更多保全。", { scaleScore: 0 }),
        choice("fight-in-court", "走诉讼，不开先例", { cash: 1, delivery: -4, public_trust: -2 }, { boss_safety: -2, off_balance_debt: 3 }, ["balance-sheet-maintenance"], "你保住姿态，账户继续卡。", "法律正确和经营可行不是同一回事。", { scaleScore: 1 }),
        choice("payment-waterfall", "公布付款顺位，分批清偿", { cash: -3, delivery: 2, public_trust: 3 }, { off_balance_debt: -2, data_inflation: -2 }, ["delivery-first"], "不够爽快，但可预期。", "危机支付要让每个人知道自己排在哪里。", { scaleScore: 1 })
      ]
    ),
    event(
      "special-loan-conditions",
      "专项借款下来了，但只能进楼栋",
      "guaranteed-delivery",
      "high",
      ["EP101", "EP126"],
      ["delivery-first", "political-embedded-enterprise"],
      "保交楼专项借款终于批了一部分。文件写得很清楚：封闭运行、专款专用、按楼栋拨付。你不能拿它还信托，也不能补总部工资。",
      [
        actor("专班", "钱救楼，不救老板。"),
        actor("信托经理", "你有钱复工，为什么没钱还我？"),
        actor("项目总", "只要钱进楼栋，我能把现场拉起来。")
      ],
      [
        choice("use-for-building", "严格进楼栋，先复工", { delivery: 12, public_trust: 6, cash: -1 }, { delivery_pressure: -9, boss_safety: 4 }, ["delivery-first"], "楼动起来了，集团债更难谈。", "保交楼资金的目标是交付，不是恢复老板自由。", { scaleScore: 1 }),
        choice("pressure-diversion", "找关系挪一部分还急债", { cash: 6, debt: -4, delivery: -7 }, { presale_misuse: 10, boss_safety: -8 }, ["presale-cashflow-trap"], "急债松了，专款边界被你踩穿。", "专项资金一旦被挪，问题性质会立刻变化。", { blowupRisk: 0.16, scaleScore: 3 }),
        choice("negotiate-creditors", "拿拨付计划去和债权人谈展期", { bank: 4, delivery: 6, cash: -2 }, { off_balance_debt: -2, boss_safety: 2 }, ["balance-sheet-maintenance"], "债权人不开心，但看见了项目现金路径。", "处置期谈判靠的不是情绪，而是可执行现金流。", { scaleScore: 2 })
      ]
    ),
    event(
      "final-creditor-meeting",
      "债权人会议：谁先拿钱，谁先闭嘴",
      "clearance",
      "crisis",
      ["EP031", "EP126"],
      ["balance-sheet-maintenance", "delivery-first"],
      "银行、信托、供应商、总包、业主代表坐在同一间会议室。所有人都说自己最急，但你的现金只能覆盖一个顺位。",
      [
        actor("银行", "没有金融稳定，项目也稳不了。"),
        actor("总包", "没有工地复工，所有纸都白写。"),
        actor("业主代表", "我们不是债权人，我们是买房的人。")
      ],
      [
        choice("delivery-first-waterfall", "先保交付顺位，债务展期", { delivery: 10, public_trust: 6, bank: -4, debt: 3 }, { delivery_pressure: -8, boss_safety: 4 }, ["delivery-first"], "业主和工地稳住，金融债权人不满。", "危机后期最现实的排序通常是保楼，不是保利润。", { scaleScore: -2 }),
        choice("financial-first", "先稳银行和信托，换展期", { bank: 6, debt: -5, delivery: -8, public_trust: -5 }, { delivery_pressure: 8, boss_safety: -3 }, ["balance-sheet-maintenance"], "金融桌面稳了，工地桌面翻了。", "只保金融信用会让交付责任反噬回来。", { scaleScore: 1 }),
        choice("state-platform-plan", "交给国资平台做统一清偿表", { government: 6, delivery: 7, bank: 2, land_bank: -8 }, { political_dependency: 6, boss_safety: 5 }, ["political-embedded-enterprise"], "秩序回来了，控制权走了。", "统一处置能救项目，代价是企业不再完全属于你。", { scaleScore: -4 })
      ]
    ),
    event(
      "redline-reporting-night",
      "三道红线报表今晚上报，你差一条过线",
      "three-red-lines",
      "crisis",
      ["EP114", "EP126"],
      ["data-inflation", "balance-sheet-maintenance", "legal-exposure"],
      "财务把表放到你面前：现金短债比差一点、净负债率差一点、剔除预收款后的资产负债率也差一点。明天银行、评级和地方金融办都会看这张表。",
      [
        actor("财务总监", "真报，授信会很难；调口径，后面每个签字人都在表上。"),
        actor("投行顾问", "同行都做报表管理，不做才像不懂资本市场。"),
        actor("审计合伙人", "你可以解释，但不能让我替你发明现金。")
      ],
      [
        choice("report-real-redline", "按真实口径报，接受授信收缩", { bank: -6, cash: -2, debt: 2, public_trust: 2 }, { data_inflation: -8, legal_exposure: -3, boss_safety: 4 }, ["balance-sheet-maintenance"], "报表难看，但签字链干净。", "三道红线不是文字游戏，口径越真实，后面的协商越有底。", { scaleScore: -2, blowupRisk: 0.06 }),
        choice("adjust-caliber", "把合作款和拟回款调进口径", { bank: 4, sales: 3, cash: 2 }, { data_inflation: 12, legal_exposure: 8, asset_freeze_risk: 3, boss_safety: -5 }, ["data-inflation", "legal-exposure"], "你过了今晚，未来每一次倒查都会先翻这张表。", "最危险的数字不是假的，而是半真半假到连老板也开始信。", { scaleScore: 5, blowupRisk: 0.2, followUps: [{ id: "founder-police-inquiry", delay: 7 }] }),
        choice("sell-asset-before-report", "连夜卖掉一个项目，把指标打下来", { cash: 14, debt: -8, land_bank: -10, bank: 2 }, { exit_preparation: 12, asset_freeze_risk: 5, data_inflation: -2 }, ["exit-discipline", "asset-freeze-chain"], "表好看了，土储少了，市场开始猜你是不是在撤。", "卖资产可以是纪律，也可能被解释成抢跑，关键看钱去了哪里。", { scaleScore: -1, followUps: [{ id: "project-sale-window", delay: 2 }] })
      ],
      2,
      6,
      { stakes: "23:59 前必须上报。今晚签出去的每一个口径，后面都可能变成调查材料。" }
    ),
    event(
      "wealth-product-redemption",
      "员工理财到期，前台被自己人堵了",
      "three-red-lines",
      "crisis",
      ["EP046", "EP126"],
      ["risk-transfer-chain", "legal-exposure", "balance-sheet-maintenance"],
      "集团内部理财本来是给员工和供应商的“过桥产品”。现在第一批到期，客服大厅坐满了销售、司机、老员工和供应商家属。",
      [
        actor("老员工", "我卖了五年房，最后把钱借给自己公司？"),
        actor("财务", "兑员工，供应商会冲；兑供应商，员工会直播。"),
        actor("法务", "这不是普通债务，它会问谁设计、谁审批、谁宣传。")
      ],
      [
        choice("redeem-staff-first", "先兑普通员工，小额刚兑", { cash: -14, public_trust: 4, bank: 1 }, { legal_exposure: -3, off_balance_debt: -5, asset_freeze_risk: 2 }, ["risk-transfer-chain"], "大厅先安静了，供应商开始问为什么自己排后面。", "危机支付不是只看金额，还要看社会稳定和事实链。", { scaleScore: -2, blowupRisk: 0.1 }),
        choice("roll-wealth-products", "统一展期，利息再加两个点", { cash: 5, debt: 4, public_trust: -6 }, { off_balance_debt: 10, legal_exposure: 9, asset_freeze_risk: 4, boss_safety: -6 }, ["balance-sheet-maintenance", "legal-exposure"], "现金留住了，员工从债权人变成证人。", "理财展期会把金融风险和劳动关系搅在一起。", { scaleScore: 2, blowupRisk: 0.24, followUps: [{ id: "founder-police-inquiry", delay: 5 }] }),
        choice("open-asset-list", "公布资产处置清单，按顺位兑付", { cash: -4, bank: 3, public_trust: 3 }, { off_balance_debt: -3, legal_exposure: -2, exit_preparation: 5 }, ["balance-sheet-maintenance", "exit-discipline"], "没有人满意，但每个人知道自己排在哪里。", "危机中最有价值的不是承诺，而是可执行的清偿顺位。", { scaleScore: 0, blowupRisk: 0.09 })
      ],
      2,
      6,
      { stakes: "这不是外部讨债，是公司内部信任塌方。处理错了，员工会比债权人更清楚你的账。" }
    ),
    event(
      "project-sale-window",
      "有人愿意买你的好项目，但只给七折",
      ["three-red-lines", "sales-freeze", "clearance"],
      "high",
      ["EP078", "EP101", "EP126"],
      ["exit-discipline", "asset-freeze-chain"],
      "一家国资平台愿意买你最好的项目公司，但报价只有账面估值七折。卖了，现金回来；不卖，你还能讲全国布局；卖完再转走钱，可能会被债权人追。",
      [
        actor("国资平台", "我们买项目，不买你的帝国故事。"),
        actor("投拓总", "七折卖掉，好项目就没了。"),
        actor("债权人代表", "卖了可以，钱先进偿债和保交付账户。")
      ],
      [
        choice("sell-and-repay", "七折卖，资金进偿债和保交付账户", { cash: 18, debt: -15, land_bank: -16, delivery: 6, bank: 4 }, { exit_preparation: 16, asset_freeze_risk: -4, legal_exposure: -2, boss_safety: 5 }, ["exit-discipline", "delivery-first"], "你承认周期变了，少了规模，多了生路。", "真正的高点离场通常不好看，因为它发生在故事还没彻底破的时候。", { scaleScore: -6, blowupRisk: 0.07, endingCandidate: "clean_exit" }),
        choice("refuse-low-price", "拒绝七折：好项目不能贱卖", { land_bank: 4, sales: 2, cash: -3, debt: 4, bank: -3 }, { price_bubble: 4, exit_preparation: -4 }, ["phantom-demand"], "你保住估值，也错过一个愿意付现金的人。", "危机里估值不是你认为值多少，而是谁愿意带现金进场。", { scaleScore: 4, blowupRisk: 0.14 }),
        choice("sell-then-move-cash", "先卖掉，再把现金转去家族账户", { cash: 10, land_bank: -16, bank: -6, public_trust: -4 }, { exit_preparation: 20, asset_freeze_risk: 18, legal_exposure: 12, boss_safety: -10 }, ["asset-freeze-chain", "legal-exposure"], "钱离你更近，债权人和法院也离你更近。", "退出和逃避责任的边界，常常就在资金流向上。", { scaleScore: -2, blowupRisk: 0.3, followUps: [{ id: "asset-freeze-order", delay: 2 }, { id: "airport-control-window", delay: 4 }] })
      ],
      2,
      6,
      { stakes: "这是退出窗口，也是证据窗口。卖给谁、卖多少钱、钱进哪里，会决定它是自救还是转移。" }
    ),
    event(
      "family-office-transfer",
      "家办顾问建议：先把家族资产隔离",
      ["sales-freeze", "guaranteed-delivery", "clearance"],
      "high",
      ["EP031", "EP126"],
      ["asset-freeze-chain", "legal-exposure", "exit-discipline"],
      "家办顾问拿出一张结构图：境内股权、境外账户、家族信托、亲属代持。听起来都合法，但你的项目还有未交楼、理财和供应商欠款。",
      [
        actor("家办顾问", "先隔离，后面才有谈判空间。"),
        actor("法务", "合规隔离和恶意转移，差在时间、价格和债务状态。"),
        actor("项目总", "工地今天还缺两千万。")
      ],
      [
        choice("legal-ringfence", "只做合规隔离，公开披露关联交易", { cash: -3, bank: 1 }, { exit_preparation: 8, legal_exposure: -1, asset_freeze_risk: 1, boss_safety: 2 }, ["exit-discipline"], "动作慢，但经得起问。", "合规退出不是不能安排资产，而是不能让债权人和业主突然看不见资产。", { scaleScore: -1, blowupRisk: 0.08 }),
        choice("rapid-transfer", "先转走能转的，后面再解释", { cash: 4, bank: -6, public_trust: -5 }, { exit_preparation: 18, asset_freeze_risk: 20, legal_exposure: 14, boss_safety: -12 }, ["asset-freeze-chain", "legal-exposure"], "你动作很快，外面反应也很快。", "危机后的快速转移，会把商业失败改写成个人风险。", { scaleScore: -2, blowupRisk: 0.32, followUps: [{ id: "asset-freeze-order", delay: 1 }, { id: "founder-police-inquiry", delay: 5 }] }),
        choice("pause-transfer-pay-workers", "暂停隔离，先补工地和员工理财", { cash: -12, delivery: 7, public_trust: 4 }, { exit_preparation: -3, legal_exposure: -4, asset_freeze_risk: -2, boss_safety: 4 }, ["delivery-first"], "你没能先保自己，但责任链干净了一点。", "老板安全有时来自先处理别人看得见的损失。", { scaleScore: -3, blowupRisk: 0.09 })
      ],
      3,
      6,
      { stakes: "这一步不会立刻决定生死，但会决定后面别人怎么看你的每一笔资产处置。" }
    ),
    event(
      "asset-freeze-order",
      "法院保全裁定到了：账户先冻三千万",
      ["sales-freeze", "guaranteed-delivery", "clearance"],
      "crisis",
      ["EP031", "EP126"],
      ["asset-freeze-chain", "risk-transfer-chain", "balance-sheet-maintenance"],
      "一个供应商先拿到财产保全。金额不算最大，但账户一冻，项目监管账户、工资、总包付款和银行续贷全被卡住。",
      [
        actor("供应商律师", "我们不闹，我们依法先冻。"),
        actor("财务", "冻结金额三千万，影响的是一个月所有付款顺序。"),
        actor("专班联系人", "你先把保交付的钱解释清楚。")
      ],
      [
        choice("settle-freeze", "立刻和解，换解除冻结", { cash: -12, delivery: 4, public_trust: 2 }, { asset_freeze_risk: -7, off_balance_debt: -3, legal_exposure: -1 }, ["risk-transfer-chain"], "账户动了，其他供应商也学会了这条路。", "冻结最可怕的是示范效应，不只是金额。", { scaleScore: -2, blowupRisk: 0.12 }),
        choice("challenge-freeze", "申请复议，坚决不开先例", { cash: 1, delivery: -6, bank: -3, public_trust: -4 }, { asset_freeze_risk: 8, legal_exposure: 3, boss_safety: -4 }, ["asset-freeze-chain"], "姿态保住了，工地先卡住了。", "法律上能争，不等于经营上扛得住。", { scaleScore: 0, blowupRisk: 0.22 }),
        choice("taskforce-waterfall", "请专班见证付款顺位，分批清偿", { cash: -5, delivery: 5, government: 4, bank: 2 }, { political_dependency: 5, asset_freeze_risk: -3, legal_exposure: -2 }, ["delivery-first", "political-embedded-enterprise"], "秩序回来一点，处置权也进来一点。", "危机期的秩序通常来自让渡部分自由。", { scaleScore: -1, blowupRisk: 0.11 })
      ],
      2,
      6,
      { stakes: "账户被冻结以后，你不是没资产，而是资产不能按你的顺序用。" }
    ),
    event(
      "homebuyers-mortgage-letter",
      "业主公开信写到：不停工复工，我们就停贷",
      ["sales-freeze", "guaranteed-delivery"],
      "crisis",
      ["EP101", "EP126"],
      ["delivery-first", "risk-transfer-chain", "presale-cashflow-trap"],
      "业主代表整理了工地照片、监管账户截图和合同节点，公开信最后一句很刺眼：再不复工，我们集体停贷。银行客户经理先给你打电话，不是关心你，是关心按揭资产。",
      [
        actor("业主代表", "我们买的是房，不是你的资金链故事。"),
        actor("银行客户经理", "按揭出问题，分行会先问开发商。"),
        actor("项目总", "要复工就给钱，不要只给通稿。")
      ],
      [
        choice("restart-with-proof", "把钱打进楼栋，直播复工节点", { cash: -16, delivery: 14, public_trust: 10, bank: 2 }, { delivery_pressure: -12, presale_misuse: -3, boss_safety: 4 }, ["delivery-first"], "现场动起来，现金更紧。", "保交楼阶段，最有效的公关就是可验证的实物进度。", { scaleScore: -4, blowupRisk: 0.1 }),
        choice("promise-date-again", "再承诺一个交付日期，先压热搜", { cash: 2, sales: 1, public_trust: -8, bank: -3 }, { delivery_pressure: 10, data_inflation: 5, legal_exposure: 4, boss_safety: -4 }, ["narrative-control", "legal-exposure"], "热搜降了一点，业主把承诺截图存了下来。", "没有现场进度的承诺，会变成下一次追责证据。", { scaleScore: 1, blowupRisk: 0.26, followUps: [{ id: "founder-police-inquiry", delay: 4 }] }),
        choice("bank-bridge-loan", "拉银行和专班做封闭复工贷", { cash: 8, delivery: 8, bank: 4, government: 3 }, { political_dependency: 5, delivery_pressure: -5, boss_safety: 1 }, ["delivery-first", "political-embedded-enterprise"], "钱来了，但只能进楼栋。", "救项目的钱通常不救老板自由。", { scaleScore: -1, blowupRisk: 0.14 })
      ],
      1,
      6,
      { stakes: "业主把合同、贷款和现场连成一条线以后，销售问题会迅速变成金融和稳定问题。" }
    ),
    event(
      "airport-control-window",
      "凌晨航班前，秘书说边检可能有名单",
      ["guaranteed-delivery", "clearance"],
      "crisis",
      ["EP126", "EP031"],
      ["asset-freeze-chain", "legal-exposure"],
      "你准备飞出去谈一笔境外资产处置。秘书低声说，今晚边检可能有名单。你还没有被正式定性，但外面已经开始猜：老板是不是要走？",
      [
        actor("秘书", "票还在，车也在楼下。"),
        actor("境外顾问", "你人不到，交易很难推进。"),
        actor("法务", "这个时候出境，可能被重新解释。")
      ],
      [
        choice("fly-anyway", "照飞：先把境外交易签了", { cash: 6, bank: -6, public_trust: -6, government: -5 }, { exit_preparation: 14, legal_exposure: 10, asset_freeze_risk: 12, boss_safety: -18 }, ["asset-freeze-chain", "legal-exposure"], "你可能签到钱，也可能让所有人确认你要离场。", "危机中的离境动作，会被放进责任链里解释。", { scaleScore: -2, blowupRisk: 0.36, followUps: [{ id: "founder-police-inquiry", delay: 2 }] }),
        choice("cancel-and-report", "取消行程，主动向专班说明资产处置", { government: 4, bank: 2, public_trust: 1, cash: -2 }, { legal_exposure: -4, asset_freeze_risk: -3, exit_preparation: 4, boss_safety: 5 }, ["exit-discipline", "political-embedded-enterprise"], "你慢了，但没有把自己送进更坏的叙事。", "高压期最贵的是可解释性。", { scaleScore: -1, blowupRisk: 0.09 }),
        choice("send-team-not-self", "让团队飞，自己留在本地谈专班", { cash: 2, government: 2, bank: 1 }, { exit_preparation: 7, legal_exposure: 2, asset_freeze_risk: 3 }, ["balance-sheet-maintenance"], "交易不断，风险没有完全消失。", "让公司动作和个人动作分开，是危机治理的基本边界。", { scaleScore: 0, blowupRisk: 0.16 })
      ],
      3,
      6,
      { stakes: "这里没有教你怎么跑，只有一个问题：你的动作能不能被解释成负责任的处置？" }
    ),
    event(
      "founder-police-inquiry",
      "经侦电话：集团理财和预售资金谁拍板？",
      ["guaranteed-delivery", "clearance"],
      "crisis",
      ["EP031", "EP046", "EP126"],
      ["legal-exposure", "presale-cashflow-trap", "balance-sheet-maintenance"],
      "电话里没有情绪，只问三件事：理财产品谁批准宣传，预售监管账户谁批准调款，三道红线报表谁签字。每个问题都能在文件上找到名字。",
      [
        actor("经侦来电", "我们先了解情况，请你把资料准备好。"),
        actor("财务总监", "很多单子最后都是你口头拍板。"),
        actor("律师", "现在最危险的不是承认困难，是文件和说法对不上。")
      ],
      [
        choice("open-documents", "交出完整台账，把口头审批补成事实链", { bank: 1, government: 2, public_trust: 1, cash: -2 }, { legal_exposure: -6, data_inflation: -4, boss_safety: 5 }, ["balance-sheet-maintenance"], "你很难看，但前后说法开始一致。", "事实链不好看，仍然比临时编口径安全。", { scaleScore: -3, blowupRisk: 0.12 }),
        choice("blame-finance-team", "说是财务团队误判，自己不知情", { cash: 1, bank: -4, public_trust: -4 }, { legal_exposure: 12, data_inflation: 6, boss_safety: -12 }, ["legal-exposure", "data-inflation"], "你把锅推出去，也把内部人推成证人。", "危机里甩锅会制造更多证人，而不是制造安全。", { scaleScore: -1, blowupRisk: 0.34 }),
        choice("seek-local-buffer", "先找地方协调，争取按风险处置走", { government: 5, bank: 2 }, { political_dependency: 8, legal_exposure: 3, boss_safety: -2 }, ["political-embedded-enterprise"], "你争取到缓冲，也欠下更深的处置账。", "地方协调能改变节奏，不会消灭事实。", { scaleScore: 0, blowupRisk: 0.2 })
      ],
      3,
      6,
      { stakes: "问话不是审判，但说明风险已经从企业账本靠近个人责任。" }
    ),
    event(
      "liquidation-petition",
      "境外债权人递交清盘申请",
      "clearance",
      "crisis",
      ["EP031", "EP126"],
      ["balance-sheet-maintenance", "asset-freeze-chain", "risk-transfer-chain"],
      "境外债权人不再接受下一版重组方案，递交了清盘申请。境内项目还要保交楼，境外债权人要看资产清单，国资只挑能交付的项目。",
      [
        actor("境外债权人律师", "我们已经等过三版方案。"),
        actor("境内专班", "清盘不能影响保交楼。"),
        actor("重组顾问", "现在要切开境内项目、境外债和个人责任。")
      ],
      [
        choice("court-restructuring", "接受法院框架下重组，交出资产清单", { bank: 3, government: 2, debt: -8, cash: -4 }, { asset_freeze_risk: -3, legal_exposure: -2, exit_preparation: 6, boss_safety: 3 }, ["balance-sheet-maintenance"], "控制权难看，但秩序变清楚。", "重组的价值不是体面，而是让不同债权人回到同一张表。", { scaleScore: -5, blowupRisk: 0.14 }),
        choice("separate-onshore", "把境内保交楼资产切出来，境外慢慢谈", { delivery: 8, public_trust: 5, bank: -2, debt: -3 }, { political_dependency: 5, asset_freeze_risk: 3, legal_exposure: 1 }, ["delivery-first", "political-embedded-enterprise"], "境内稳一点，境外更愤怒。", "保交楼优先会重排债权顺位，也会激怒被排后的钱。", { scaleScore: -3, blowupRisk: 0.18 }),
        choice("fight-liquidation", "反对清盘，继续拖谈判", { cash: 2, debt: 4, bank: -5, public_trust: -3 }, { asset_freeze_risk: 10, legal_exposure: 5, boss_safety: -6 }, ["risk-transfer-chain"], "你争取了时间，也让更多人相信你只是在拖。", "拖延只有在现金流改善时才叫谈判，否则只是扩大损失。", { scaleScore: 1, blowupRisk: 0.3 })
      ],
      4,
      6,
      { stakes: "清盘不是一个债权人的情绪，而是所有人重新抢资产顺位的信号。" }
    ),
    event(
      "local-protection-gap",
      "区里不接电话了：你已经没人替你缓冲",
      ["three-red-lines", "sales-freeze", "guaranteed-delivery", "clearance"],
      "crisis",
      ["EP012", "EP078", "EP126"],
      ["local-isolation", "risk-transfer-chain", "political-embedded-enterprise"],
      "你以为自己关系浅，所以干净。现在供应商申请保全、银行压降敞口、业主找媒体，区里只回一句：企业依法自主解决。",
      [
        actor("区里联系人", "不是不管，是不能替企业兜底。"),
        actor("银行客户经理", "地方不表态，我们只能先压风险。"),
        actor("供应商", "没人协调，那我们就先起诉。")
      ],
      [
        choice("show-clean-ledger", "拿真实账本求市场化展期", { bank: 3, public_trust: 2, cash: -2 }, { local_isolation: -6, data_inflation: -4, legal_exposure: -1 }, ["balance-sheet-maintenance"], "没人替你说话，你只能让账本替你说话。", "关系浅时，事实链就是唯一缓冲垫。", { scaleScore: -1, blowupRisk: 0.12 }),
        choice("buy-late-relationship", "临时找中间人打点关系", { government: 3, cash: -5, bank: -1 }, { political_dependency: 8, legal_exposure: 4, boss_safety: -4 }, ["political-embedded-enterprise", "legal-exposure"], "电话有人接了，但新问题也进来了。", "危机后补关系最贵，也最容易被重新解释。", { scaleScore: 0, blowupRisk: 0.24 }),
        choice("let-creditors-race", "不协调，按谁先起诉谁先谈", { cash: 2, government: -5, bank: -5, delivery: -5, public_trust: -5 }, { local_isolation: 14, asset_freeze_risk: 8, off_balance_debt: 5, boss_safety: -8 }, ["local-isolation", "risk-transfer-chain"], "所有人都开始抢跑。", "没有协调机制时，理性的单方自救会合成整体踩踏。", { scaleScore: -2, blowupRisk: 0.34, followUps: [{ id: "asset-freeze-order", delay: 2 }] })
      ],
      1,
      6,
      { stakes: "政商关系不是越低越安全。低到没人协调，危机传播速度会变快。" }
    )
  ];

  newEvents.push(
    event(
      "white-list-application-review",
      "白名单会审：救项目，不救集团",
      ["sales-freeze", "guaranteed-delivery"],
      "crisis",
      ["EP101", "EP126"],
      ["whitelist-financing", "delivery-first", "balance-sheet-maintenance"],
      "城市融资协调机制开会，你的项目有机会进白名单。银行先问三个问题：项目是不是在建，资金能不能闭环，集团有没有查封冻结和逃废债嫌疑。",
      [
        actor("住建专班", "我们推项目，不替集团兜底。"),
        actor("银行风控", "钱可以进项目，但不能绕去总部。"),
        actor("集团财务", "总部这周也有一笔债到期。")
      ],
      [
        choice("ringfence-project", "切开项目账，贷款只进楼栋", { cash: 8, delivery: 9, bank: 5, government: 3 }, { delivery_pressure: -8, legal_exposure: -2, political_dependency: 3 }, ["whitelist-financing", "delivery-first"], "项目活了，总部更难受。", "白名单的核心是把项目现金流从集团风险里切出来。", { scaleScore: -1, blowupRisk: 0.09 }),
        choice("bundle-group-debt", "把集团急债也塞进融资需求", { cash: 10, debt: -4, bank: -4 }, { data_inflation: 7, legal_exposure: 5, asset_freeze_risk: 4, boss_safety: -4 }, ["balance-sheet-maintenance", "legal-exposure"], "材料看起来完整，风控开始怀疑你想借项目救集团。", "政策工具不是无限提款机，混用用途会让项目也失去信用。", { scaleScore: 1, blowupRisk: 0.22, followUps: [{ id: "founder-police-inquiry", delay: 5 }] }),
        choice("hide-freeze-history", "不提旧诉讼和冻结，先争取入库", { bank: 3, cash: 5 }, { asset_freeze_risk: 9, legal_exposure: 7, data_inflation: 5, boss_safety: -5 }, ["whitelist-financing", "asset-freeze-chain"], "表先递上去了，旧案卷也会一起被查到。", "白名单审查最怕信息不一致，隐藏风险会让融资变成反向审计。", { scaleScore: 2, blowupRisk: 0.26, followUps: [{ id: "asset-freeze-order", delay: 4 }] })
      ],
      1,
      6,
      { stakes: "这题不是问能不能借钱，而是问项目、集团和老板能不能被切开。" }
    ),
    event(
      "escrow-ledger-audit",
      "预售监管账户盘账，差额刚好是总部借走的",
      ["three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "crisis",
      ["EP101", "EP126"],
      ["escrow-control", "presale-cashflow-trap", "legal-exposure"],
      "住建和银行联合盘监管账户。账上应该够两栋楼封顶，但差额刚好等于总部上季度借去兑商票的钱。项目总说再给两个月，财务说两个月后也不一定回来。",
      [
        actor("监管银行", "钱去哪了，不看解释，看流水。"),
        actor("项目总", "没有这笔钱，我不敢承诺复工。"),
        actor("集团财务", "当时是临时调剂，不是挪用。")
      ],
      [
        choice("fill-escrow-gap", "卖车位和商铺，把监管账户补齐", { cash: -12, delivery: 8, bank: 4, public_trust: 4 }, { presale_misuse: -9, legal_exposure: -4, boss_safety: 4 }, ["escrow-control", "delivery-first"], "现金很痛，但责任链断了一截。", "预售资金的窟窿越早补，性质越接近经营失误；越晚补，越像责任事故。", { scaleScore: -2, blowupRisk: 0.08 }),
        choice("temporary-adjustment-story", "坚持说是临时调剂，先让项目继续卖", { cash: 4, sales: 3, bank: -4 }, { presale_misuse: 12, legal_exposure: 8, data_inflation: 4, boss_safety: -6 }, ["presale-cashflow-trap", "legal-exposure"], "销售还在走，监管账户的洞更显眼。", "临时调剂只有在钱回来时才叫临时。", { scaleScore: 2, blowupRisk: 0.25, followUps: [{ id: "homebuyers-mortgage-letter", delay: 4 }] }),
        choice("ask-taskforce-bridge", "请专班协调封闭桥接资金", { cash: 7, delivery: 7, government: 5, bank: 3 }, { political_dependency: 6, presale_misuse: -3, delivery_pressure: -4 }, ["whitelist-financing", "delivery-first"], "楼能动，处置权也进来了。", "封闭资金能救交付，但会改变老板对钱的支配权。", { scaleScore: -1, blowupRisk: 0.12 })
      ],
      1,
      6,
      { stakes: "监管账户不是账面科目，是购房人交付权利的现金凭证。" }
    ),
    event(
      "land-auction-no-bid",
      "土拍大厅没人举牌，县里看向你",
      ["early-expansion", "shelter-reform-boom", "high-turnover"],
      "pressure",
      ["EP124", "EP126"],
      ["land-fiscal-pressure", "political-embedded-enterprise", "land-finance-loop"],
      "县里新地块挂出来，底价不低，现场冷得只剩矿泉水。领导没有明说让你托底，只说本地企业要有信心。你知道这块地成交，县里的年度故事会好看一点。",
      [
        actor("县里领导", "市场越冷，越要有人带头。"),
        actor("投拓经理", "没人举牌就是价格信号。"),
        actor("银行行长", "你真拿，我们也要重新看敞口。")
      ],
      [
        choice("bid-to-support-local", "举牌托底，换地方态度", { land_bank: 12, government: 8, cash: -12, debt: 8 }, { political_dependency: 10, local_isolation: -4, price_bubble: 5 }, ["land-fiscal-pressure", "political-embedded-enterprise"], "地成交了，你也成了县里周期压力的一部分。", "地方需要成交，不代表项目能赚钱。", { scaleScore: 7, blowupRisk: 0.16 }),
        choice("walk-away-auction", "不举牌，按市场信号撤", { cash: 2, debt: -2, government: -7, bank: 1 }, { local_isolation: 7, political_dependency: -3, price_bubble: -2 }, ["exit-discipline", "local-isolation"], "你躲过一块贵地，也让县里记住你没接盘。", "看懂价格信号是能力，但关系成本会在下一次融资里出现。", { scaleScore: -1, blowupRisk: 0.08 }),
        choice("form-consortium", "拉城投和别家拼联合体，自己做小股", { land_bank: 6, government: 4, cash: -5, bank: 2 }, { political_dependency: 6, off_balance_debt: 3 }, ["land-fiscal-pressure", "risk-transfer-chain"], "大家都有台阶，责任也变得更难切。", "联合体能分摊现金压力，也会制造复杂责任链。", { scaleScore: 3, blowupRisk: 0.11 })
      ],
      0,
      4,
      { stakes: "无人举牌不是小事，它说明土地财政、银行风控和市场预期已经开始互相试探。" }
    ),
    event(
      "lower-tier-inventory-night",
      "夜里巡盘：三公里八个竞品都亮着空窗",
      ["shelter-reform-boom", "high-turnover", "three-red-lines"],
      "high",
      ["EP114", "EP124", "EP126"],
      ["inventory-overhang", "phantom-demand", "data-inflation"],
      "营销说本月到访不错，但你夜里开车绕了一圈：新区路灯很亮，楼也很多，真正住人的窗户不多。下周董事会还要看增长目标。",
      [
        actor("营销总", "夜里看窗户不科学，白天案场才算数。"),
        actor("司机", "老板，这边晚上外卖都没几单。"),
        actor("财务", "库存去化慢，利息不会慢。")
      ],
      [
        choice("accept-inventory-truth", "承认库存过剩，暂停周边拿地", { cash: 3, debt: -3, sales: -4, government: -3 }, { price_bubble: -6, data_inflation: -4, delivery_pressure: -2 }, ["inventory-overhang", "exit-discipline"], "增长故事变难，生存边界变清楚。", "库存问题不能靠热场解决，真实人口和收入才是底层需求。", { scaleScore: -2, blowupRisk: 0.07 }),
        choice("channel-push-harder", "加渠道佣金，先把月报做上去", { sales: 9, cash: -5, public_trust: -2 }, { price_bubble: 8, data_inflation: 7, off_balance_debt: 3 }, ["phantom-demand", "platformized-sales"], "月报热了，真实去化没那么热。", "渠道能提前透支需求，但不能创造长期居住人口。", { scaleScore: 4, blowupRisk: 0.18 }),
        choice("discount-openly", "公开降价清库存，换现金回笼", { cash: 8, sales: 6, land_bank: -5, public_trust: -5 }, { price_bubble: -7, delivery_pressure: -1 }, ["inventory-overhang"], "现金回来，老业主也开始算账。", "降价是下行期的现金工具，也是信任和估值冲击。", { scaleScore: 1, blowupRisk: 0.14, followUps: [{ id: "old-owners-price-cut", delay: 3 }] })
      ],
      1,
      5,
      { stakes: "这不是一道销售题，是人口、库存、价格和融资成本同时在问你：需求是真的吗？" }
    ),
    event(
      "wage-account-deadline",
      "工资专户今晚要补足，工人实名系统已经预警",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "crisis",
      ["EP031", "EP126"],
      ["worker-wage-risk", "delivery-first", "risk-transfer-chain"],
      "总包说工人工资专户差一笔钱，实名制平台已经预警。你手里现金还能撑广告投放，或者补工人工资，不能两边都付。",
      [
        actor("总包", "工资不是工程款，拖了就进系统。"),
        actor("营销总", "广告停一周，案场就冷。"),
        actor("人社窗口", "先把工资专户补足，其他事你们自己谈。")
      ],
      [
        choice("pay-wage-account", "补工资专户，砍广告和样板活动", { cash: -9, delivery: 5, sales: -5, public_trust: 3 }, { delivery_pressure: -4, legal_exposure: -2, boss_safety: 3 }, ["worker-wage-risk", "delivery-first"], "工地稳住，案场变冷。", "工资是最不能被包装的现金缺口，它会最快进入公共系统。", { scaleScore: -1, blowupRisk: 0.08 }),
        choice("delay-wage-pay-marketing", "先保营销，工资下周补", { sales: 6, cash: -3, delivery: -5, public_trust: -4 }, { legal_exposure: 5, delivery_pressure: 7, off_balance_debt: 4, boss_safety: -5 }, ["worker-wage-risk", "risk-transfer-chain"], "案场有人，工地有人准备拍视频。", "把工人工资让位给销售，会把内部现金排序暴露给所有人。", { scaleScore: 2, blowupRisk: 0.22, followUps: [{ id: "stoppage-video", delay: 2 }] }),
        choice("contractor-advance-wages", "让总包先垫，给他后续项目承诺", { cash: 1, delivery: 2, government: 1 }, { off_balance_debt: 8, delivery_pressure: 3 }, ["balance-sheet-maintenance", "worker-wage-risk"], "今天没炸，债务换了名字。", "垫资能缓一口气，但会让总包从合作方变成债权人。", { scaleScore: 2, blowupRisk: 0.15, followUps: [{ id: "supplier-blockade", delay: 5 }] })
      ],
      0,
      6,
      { stakes: "工人工资不是普通应付款，它最容易把经营问题变成监管和舆情问题。" }
    ),
    event(
      "annual-audit-revenue-cut",
      "年审现场：这批房不能确认收入",
      ["three-red-lines", "sales-freeze", "guaranteed-delivery", "clearance"],
      "high",
      ["EP114", "EP126"],
      ["audit-revenue-recognition", "data-inflation", "legal-exposure"],
      "审计团队把一批“已售项目”打回来：没有达到交付条件，不能确认收入。财报利润少一大块，三道红线指标也会变难看。",
      [
        actor("审计经理", "卖了不等于交付，回款不等于收入。"),
        actor("董秘", "利润一砍，评级和股价都要问。"),
        actor("工程总", "现场差的是消防和配套，不是盖章。")
      ],
      [
        choice("accept-audit-cut", "接受调减利润，重新披露风险", { bank: -4, sales: -2, public_trust: 3 }, { data_inflation: -10, legal_exposure: -3, boss_safety: 3 }, ["audit-revenue-recognition"], "数字难看，但底稿能对上。", "财报真实会伤短期信用，但能减少后续倒查风险。", { scaleScore: -3, blowupRisk: 0.09 }),
        choice("pressure-auditor", "压审计接受管理层判断", { bank: 3, sales: 2 }, { data_inflation: 12, legal_exposure: 10, boss_safety: -7 }, ["audit-revenue-recognition", "legal-exposure"], "财报过了，底稿没过。", "被审计意见遮住的问题，会在危机后变成责任目录。", { scaleScore: 3, blowupRisk: 0.28, followUps: [{ id: "founder-police-inquiry", delay: 6 }] }),
        choice("finish-fire-facilities", "砍总部费用，先补消防和配套达交付", { cash: -10, delivery: 9, public_trust: 4 }, { data_inflation: -5, delivery_pressure: -5, legal_exposure: -1 }, ["delivery-first", "audit-revenue-recognition"], "利润靠工程兑现，不靠口径兑现。", "最硬的收入确认，是让房子真正达到交付条件。", { scaleScore: -1, blowupRisk: 0.1 })
      ],
      2,
      6,
      { stakes: "这题表面是财报，实质是你能不能区分销售故事、现金回款和真正交付。" }
    ),
    event(
      "share-pledge-margin-call",
      "股价跌到质押线，券商要求补保证金",
      ["three-red-lines", "sales-freeze", "guaranteed-delivery", "clearance"],
      "crisis",
      ["EP031", "EP126"],
      ["share-pledge-chain", "legal-exposure", "balance-sheet-maintenance"],
      "上市平台股价连续下跌，实控人质押的股票触及预警线。券商要你补保证金，银行也开始问控制权会不会变。",
      [
        actor("券商", "不补仓，我们要按合同处置。"),
        actor("银行", "控制权不稳，授信也要重评。"),
        actor("家族办公室", "可以调个人资金，但会暴露更多资产。")
      ],
      [
        choice("use-personal-cash", "用个人资金补仓，保控制权", { bank: 3, cash: -5 }, { boss_safety: -3, asset_freeze_risk: 3, legal_exposure: 2 }, ["share-pledge-chain"], "控制权稳一点，个人风险更深一点。", "股权质押会把公司风险和个人资产绑在一起。", { scaleScore: 0, blowupRisk: 0.16 }),
        choice("let-pledge-unwind", "不补仓，接受部分股权被处置", { bank: -6, government: -2, cash: 1 }, { boss_safety: 2, asset_freeze_risk: -1, exit_preparation: 4 }, ["exit-discipline", "share-pledge-chain"], "你丢了面子和控制权，少了一条追保链。", "控制权不是永远值得保，尤其当保控制权要吞掉最后现金。", { scaleScore: -3, blowupRisk: 0.14 }),
        choice("pledge-property-unit", "拿物业公司股权再质押补仓", { bank: 2, cash: 6, debt: 5 }, { off_balance_debt: 6, asset_freeze_risk: 8, legal_exposure: 4 }, ["balance-sheet-maintenance", "share-pledge-chain"], "你把一个洞补成两个洞。", "用新质押救旧质押，会把优质资产也拖进风险链。", { scaleScore: 2, blowupRisk: 0.26, followUps: [{ id: "asset-freeze-order", delay: 5 }] })
      ],
      4,
      6,
      { stakes: "上市和质押让你拿到更大杠杆，也让控制权成为债权人的新按钮。" }
    ),
    event(
      "state-purchase-inventory",
      "国企收储存量房：只收现房，价格很低",
      ["sales-freeze", "guaranteed-delivery", "clearance"],
      "high",
      ["EP078", "EP101", "EP126"],
      ["state-purchase-floor", "inventory-overhang", "exit-discipline"],
      "地方平台准备收购一批存量房做保障性住房。名单只看现房、清晰产权和低折扣。你的库存能换现金，但价格会把周边售价打下来。",
      [
        actor("国企平台", "我们托底，不托你的利润表。"),
        actor("营销总", "这个价一公布，剩下的房更难卖。"),
        actor("财务", "现金是真的低，面子是真的贵。")
      ],
      [
        choice("sell-inventory-to-state", "低价卖现房给国企，先回现金", { cash: 16, sales: -5, land_bank: -10, bank: 4 }, { price_bubble: -8, exit_preparation: 8, delivery_pressure: -3 }, ["state-purchase-floor", "exit-discipline"], "利润薄了，现金厚了。", "下行期托底价格就是新锚，愿不愿接受决定你能不能活。", { scaleScore: -4, blowupRisk: 0.08 }),
        choice("reject-low-state-price", "拒绝低价收储，继续市场销售", { sales: -3, cash: -3, government: -3 }, { price_bubble: 4, local_isolation: 5 }, ["inventory-overhang"], "你保住账面价格，库存继续占用现金。", "不接受低价，不代表市场会给你高价。", { scaleScore: 1, blowupRisk: 0.18 }),
        choice("sell-worst-units-only", "只拿最差楼栋去申报收储", { cash: 5, government: -2, bank: -2 }, { data_inflation: 5, legal_exposure: 2, price_bubble: 2 }, ["state-purchase-floor", "data-inflation"], "平台看出你想把坏库存甩给它。", "政策工具会筛项目质量，不会无条件接开发商的尾货。", { scaleScore: 1, blowupRisk: 0.2 })
      ],
      2,
      6,
      { stakes: "托底不是按账面估值买单，而是在低价和现金之间重写市场锚。" }
    ),
    event(
      "property-service-cashbox",
      "物业公司账上还有现金，集团想先借走",
      ["three-red-lines", "sales-freeze", "guaranteed-delivery", "clearance"],
      "high",
      ["EP031", "EP126"],
      ["risk-transfer-chain", "legal-exposure", "balance-sheet-maintenance"],
      "物业公司还有一笔经营现金和业主预缴费用。集团总部想先借走两个月，承诺后面归还。物业总提醒你，这钱对应保洁、维修、电梯和业主服务。",
      [
        actor("集团财务", "只是内部拆借，两个月就还。"),
        actor("物业总", "电梯坏了，业主不会去找集团财务。"),
        actor("法务", "物业资金和开发资金的边界不能乱。")
      ],
      [
        choice("do-not-touch-property-cash", "不碰物业现金，砍总部费用", { cash: -5, public_trust: 5, bank: 1 }, { legal_exposure: -3, boss_safety: 2 }, ["exit-discipline"], "总部难受，边界清楚。", "危机中最能保命的，是知道哪些钱绝不能碰。", { scaleScore: -2, blowupRisk: 0.08 }),
        choice("short-term-borrow-property", "借物业现金补集团缺口", { cash: 8, debt: -2, public_trust: -4 }, { legal_exposure: 8, off_balance_debt: 5, boss_safety: -5 }, ["risk-transfer-chain", "legal-exposure"], "集团缓过一口气，小区服务开始变差。", "把业主服务的钱挪走，会让购房人从合同关系变成持续监督者。", { scaleScore: 2, blowupRisk: 0.24, followUps: [{ id: "homebuyers-mortgage-letter", delay: 5 }] }),
        choice("pledge-property-fees", "用未来物业费做质押融资", { cash: 6, debt: 4, bank: 1 }, { off_balance_debt: 6, legal_exposure: 3, asset_freeze_risk: 3 }, ["balance-sheet-maintenance"], "你没有直接拿钱，但把未来现金流提前卖了。", "未来收入质押能救今天，也会让明天没有缓冲。", { scaleScore: 1, blowupRisk: 0.18 })
      ],
      2,
      6,
      { stakes: "物业不是提款机，它连接的是已交付业主的持续信任。" }
    ),
    event(
      "urban-village-renewal-package",
      "城中村改造大包：周期长、关系多、现金慢",
      ["high-turnover", "three-red-lines", "sales-freeze"],
      "high",
      ["EP004", "EP124", "EP126"],
      ["land-fiscal-pressure", "gray-governance", "political-embedded-enterprise"],
      "市里推出城中村改造包，地段很好，但拆迁、安置、集体资产、土方和多部门审批都缠在一起。你能拿到入场券，但现金要压很久。",
      [
        actor("街道", "群众工作要细，不能只算货值。"),
        actor("土方老板", "这活儿没人催，三年；有人催，三个月。"),
        actor("财务", "这是好项目，但不是快钱。")
      ],
      [
        choice("take-renewal-slow", "接下，但按慢周期和安置优先做", { land_bank: 10, government: 4, cash: -8, delivery: 3 }, { gray_risk: -2, political_dependency: 4, delivery_pressure: 3 }, ["land-fiscal-pressure", "delivery-first"], "项目很慢，但不容易变成旧改事故。", "城更不是普通拿地，它先是群众工作，再是开发利润。", { scaleScore: 3, blowupRisk: 0.12 }),
        choice("use-gray-accelerator", "让土方线加速，把拆迁节点抢出来", { land_bank: 14, government: 5, cash: -4 }, { gray_risk: 15, legal_exposure: 5, boss_safety: -8 }, ["gray-governance", "political-embedded-enterprise"], "进度漂亮，线索也漂亮。", "旧改里的灰色效率，最容易在后期扫黑和信访里回头。", { scaleScore: 7, blowupRisk: 0.3, followUps: [{ id: "anti-gang-investigation", delay: 8 }] }),
        choice("partner-with-state-capital", "让国资控股，你做操盘和小股", { government: 6, bank: 4, land_bank: 6, cash: -3 }, { political_dependency: 5, exit_preparation: 2 }, ["political-embedded-enterprise", "exit-discipline"], "你少赚，也少背一点总风险。", "重项目可以让渡控制权换生存边界。", { scaleScore: 1, blowupRisk: 0.11 })
      ],
      2,
      6,
      { stakes: "好地段不等于好现金流，尤其当它先经过拆迁和安置。" }
    ),
    event(
      "ad-hoc-creditor-term-sheet",
      "境外债委会发来条款清单：先换董事，再谈展期",
      ["three-red-lines", "sales-freeze", "guaranteed-delivery", "clearance"],
      "crisis",
      ["EP031", "EP126"],
      ["balance-sheet-maintenance", "asset-freeze-chain", "exit-discipline"],
      "境外债委会不再只要利息表，他们要求资产出售监督、董事会席位、信息披露和现金扫款机制。你还想保控制权，但他们只想保回收率。",
      [
        actor("境外债委会", "我们不买你的宏大叙事，只看现金扫款。"),
        actor("投行顾问", "接受条款很难看，不接受可能直接清盘。"),
        actor("董事会成员", "让他们进董事会，集团就不是原来的集团了。")
      ],
      [
        choice("accept-creditor-oversight", "接受监督和现金扫款，换展期", { debt: -10, bank: 3, cash: -3 }, { exit_preparation: 6, asset_freeze_risk: -3, boss_safety: 2 }, ["balance-sheet-maintenance", "exit-discipline"], "你丢了自由，买到时间。", "债务重组的本质是用控制权换可执行现金流。", { scaleScore: -4, blowupRisk: 0.13 }),
        choice("reject-control-rights", "拒绝董事会席位，继续谈软条件", { debt: 4, bank: -5, cash: 1 }, { asset_freeze_risk: 7, legal_exposure: 3, boss_safety: -4 }, ["asset-freeze-chain"], "你保住姿态，清盘风险升高。", "控制权如果不能创造现金，就只剩下象征意义。", { scaleScore: 1, blowupRisk: 0.27, followUps: [{ id: "liquidation-petition", delay: 4 }] }),
        choice("sell-assets-under-monitor", "在债委会监督下卖资产还债", { cash: 8, debt: -12, land_bank: -12, bank: 2 }, { exit_preparation: 10, asset_freeze_risk: -2, legal_exposure: -1 }, ["exit-discipline", "balance-sheet-maintenance"], "卖得不体面，但钱的去向清楚。", "可监督的卖资产更像重组，不可解释的卖资产更像转移。", { scaleScore: -5, blowupRisk: 0.1, endingCandidate: "clean_exit" })
      ],
      3,
      6,
      { stakes: "债委会要的不是你的承诺，而是能把现金锁住的治理权。" }
    )
  );

  newEvents.push(
    event(
      "interest-rollover-friday",
      "周五下午五点，付息表比售楼日报先到",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "high",
      ["EP031", "EP124", "EP126"],
      ["leverage-backfire", "balance-sheet-maintenance"],
      "银行客户经理没有催你还本金，只发来一张付息和续贷条件表：监管账户余额、销售回款、抵押物重估、项目进度，都要在今晚前补齐。",
      [
        actor("银行客户经理", "本金可以谈，利息和条件不能空着。"),
        actor("财务总监", "钱在项目上，不在集团账上。"),
        actor("营销负责人", "本周认购很好看，但实际到账没那么快。")
      ],
      [
        choice("pay-interest-cut-site", "先付利息，压工程款一周", { cash: -7, bank: 6, delivery: -4 }, { financing_cost: -2, delivery_pressure: 7, buyer_liability: 3 }, ["balance-sheet-maintenance", "leverage-backfire"], "银行稳住，工地开始发冷。", "银行钱有利息，工程款有现场；你保住一边，另一边会把结局推回来。", { scaleScore: 1, blowupRisk: 0.18, followUps: [{ id: "supplier-blockade", delay: 3 }, { id: "stoppage-video", delay: 4 }] }),
        choice("roll-interest-into-new-loan", "把利息并进新贷款，保现场不停", { cash: 3, debt: 7, delivery: 4, bank: -2 }, { financing_cost: 9, off_balance_debt: 4 }, ["leverage-backfire"], "今天看起来都能过，明天的利息更厚。", "借新钱付旧利息不是解决，是把时间买贵。", { scaleScore: 3, blowupRisk: 0.24, followUps: [{ id: "bank-branch-risk-meeting", delay: 4 }] }),
        choice("open-books-to-bank", "拆开回款、监管账户和施工节点给银行看", { cash: -3, bank: 3, sales: -2 }, { data_inflation: -4, financing_cost: 2, local_isolation: 2 }, ["data-inflation", "audit-revenue-recognition"], "口径变难看，但银行知道你没有藏。", "真实口径会伤短期面子，但能减少后期被穿透时的断崖。", { scaleScore: -1, blowupRisk: 0.1 })
      ],
      0,
      6,
      { stakes: "地产商最紧张的不是账面资产，而是付息日和自由现金不在同一张表上。" }
    ),
    event(
      "escrow-gap-screenshot",
      "监管账户截图流出来：余额不够盖到封顶",
      ["three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "crisis",
      ["EP124", "EP126"],
      ["presale-cashflow-trap", "escrow-control", "legal-exposure"],
      "业主群里流出一张预售监管账户截图。截图不完整，但足够让人看见：这笔钱如果只按现有余额走，楼栋撑不到封顶。",
      [
        actor("业主代表", "我们买的是房，不是你的集团周转。"),
        actor("监管专班", "先说明钱去了哪里，再说怎么补。"),
        actor("财务总监", "有些支出当时确实从项目走了。")
      ],
      [
        choice("replenish-escrow-by-selling-land", "卖一块地，先把监管账户补上", { cash: 2, land_bank: -12, delivery: 8, public_trust: 6, bank: 2 }, { buyer_liability: -6, presale_misuse: -5, asset_freeze_risk: 2 }, ["delivery-first", "escrow-control"], "你砍掉未来，先救眼前楼栋。", "预售款责任最硬，能补回项目账户，比讲集团故事更有用。", { scaleScore: -4, blowupRisk: 0.12 }),
        choice("explain-temporary-mismatch", "说是临时错配，等销售回款补齐", { sales: -2, public_trust: -5, bank: -2 }, { buyer_liability: 7, presale_misuse: 8, legal_exposure: 4 }, ["narrative-control", "presale-cashflow-trap"], "你争取到几天，但大家开始盯账户。", "监管账户不是公关问题，越解释成时间差，后面越要给流水。", { scaleScore: 1, blowupRisk: 0.26, followUps: [{ id: "homebuyer-lawyer-letter", delay: 2 }, { id: "escrow-ledger-audit", delay: 3 }] }),
        choice("ask-local-task-force-bridge", "请地方协调专项借款补缺口", { cash: 6, delivery: 5, government: 4, bank: 1 }, { political_dependency: 7, buyer_liability: -2, local_isolation: -2 }, ["political-embedded-enterprise", "delivery-first"], "楼栋稳住，你被地方任务锁住。", "地方能救项目，也会把企业变成稳定任务的一部分。", { scaleScore: 0, blowupRisk: 0.18, followUps: [{ id: "local-task-force-night", delay: 3 }] })
      ],
      1,
      6,
      { stakes: "预售款一旦被看成监管责任，就不再是老板能自由调度的现金。" }
    ),
    event(
      "supplier-bill-discount",
      "供应商把商票贴现，折价单传遍材料圈",
      ["high-turnover", "three-red-lines", "sales-freeze"],
      "high",
      ["EP031", "EP124"],
      ["balance-sheet-maintenance", "risk-transfer-chain", "leverage-backfire"],
      "你开给供应商的商票开始被低价转让。材料商不说你违约，但他们开始把你的票当成风险资产报价，下一批货要现款。",
      [
        actor("材料商", "票我们收过，但现在只能按折价算。"),
        actor("总包", "材料断了，节点就断了。"),
        actor("财务", "表上不是银行债，可市场已经当成债了。")
      ],
      [
        choice("cash-settle-key-suppliers", "现金清掉关键材料商，其他继续排队", { cash: -9, delivery: 5, bank: 1 }, { off_balance_debt: -4, delivery_pressure: -2, local_isolation: 3 }, ["delivery-first", "balance-sheet-maintenance"], "关键材料不断，非关键供应商记仇。", "保节点要分轻重，但被排到后面的人会进入后续债权人队列。", { scaleScore: -1, blowupRisk: 0.13 }),
        choice("issue-bigger-bills", "开更大商票换继续供货", { cash: 4, delivery: 4, debt: 2 }, { off_balance_debt: 10, financing_cost: 6, legal_exposure: 2 }, ["balance-sheet-maintenance", "leverage-backfire"], "工地继续转，真实债务变厚。", "商票是延迟付款，不是免费融资；折价率就是市场给你的利息。", { scaleScore: 3, blowupRisk: 0.27, followUps: [{ id: "personal-guarantee-call", delay: 4 }] }),
        choice("stop-one-building", "停一栋楼，把资源集中到能交付的楼栋", { cash: -2, delivery: 3, sales: -6, public_trust: -5 }, { delivery_pressure: 5, buyer_liability: 4 }, ["delivery-first", "exit-discipline"], "你保住一部分交付，也承认另一部分危险。", "集中资源是理性选择，但被停下来的楼栋会变成新的维权中心。", { scaleScore: -3, blowupRisk: 0.2, followUps: [{ id: "homebuyers-mortgage-letter", delay: 3 }] })
      ],
      0,
      6,
      { stakes: "表外债最可怕的地方，是它会先在交易价格里暴露。" }
    ),
    event(
      "bank-branch-risk-meeting",
      "分行风控会：你的项目被放进观察名单",
      ["three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "crisis",
      ["EP031", "EP114", "EP126"],
      ["leverage-backfire", "audit-revenue-recognition", "local-isolation"],
      "分行通知你补材料，不是为了增加授信，而是为了决定要不要抽贷、压额度、锁监管账户。你带着销售日报去，对方先问实际回款。",
      [
        actor("分行风控", "认购不是回款，拟签不是现金。"),
        actor("客户经理", "我想帮你，但表要过风控。"),
        actor("财务总监", "如果额度被压，月底至少三处会断。")
      ],
      [
        choice("accept-credit-cut", "接受降额，换不抽贷和账户白名单", { cash: -5, debt: -4, bank: 3, delivery: 2 }, { financing_cost: -2, local_isolation: 2 }, ["balance-sheet-maintenance", "whitelist-financing"], "规模变小，信用没断。", "降规模有时是保命，不是失败；真正失败是硬撑到银行先跑。", { scaleScore: -4, blowupRisk: 0.11 }),
        choice("pressure-manager-by-relationship", "找领导打招呼，让客户经理顶住额度", { cash: 4, bank: -2, government: 3 }, { political_dependency: 7, financing_cost: 5, local_isolation: 4 }, ["political-embedded-enterprise", "leverage-backfire"], "额度暂时稳住，银行内部开始留痕。", "关系能争取时间，也会把普通信贷问题变成责任问题。", { scaleScore: 2, blowupRisk: 0.24, followUps: [{ id: "local-election-change", delay: 5 }] }),
        choice("sell-project-to-repay-bank", "卖掉边缘项目，先还银行敞口", { cash: 8, debt: -9, land_bank: -10, bank: 5, sales: -3 }, { exit_preparation: 7, buyer_liability: 1 }, ["cycle-asset-trader", "exit-discipline"], "你割掉一块肉，保住银行通道。", "能卖时卖，能还时还，地产商的生存不是每块地都做到最后。", { scaleScore: -5, blowupRisk: 0.1 })
      ],
      1,
      6,
      { stakes: "银行不是最后一个知道风险的人，常常是第一个选择保护自己的人。" }
    ),
    event(
      "homebuyer-lawyer-letter",
      "业主律师函：要的不是道歉，是资金流水",
      ["sales-freeze", "guaranteed-delivery", "clearance"],
      "crisis",
      ["EP124", "EP126"],
      ["presale-cashflow-trap", "legal-exposure", "data-inflation"],
      "业主代表请了律师。律师函没有骂人，只列了四项：监管账户余额、工程节点、预售款用途、逾期交付责任。每一项都能对应到你过去几轮选择。",
      [
        actor("业主律师", "请说明资金用途，不接受情绪安抚。"),
        actor("项目总", "现场能赶，但钱要先到。"),
        actor("客服负责人", "群里已经不信口头承诺了。")
      ],
      [
        choice("publish-ledger-and-schedule", "公开资金台账和楼栋节点，接受监督", { cash: -4, delivery: 5, public_trust: 6, bank: 1 }, { data_inflation: -4, buyer_liability: -4, legal_exposure: -2 }, ["data-inflation", "delivery-first"], "短期难看，信任有了抓手。", "学习点不是透明必胜，而是没有可验证证据时，所有承诺都会被当成拖延。", { scaleScore: -1, blowupRisk: 0.09 }),
        choice("offer-compensation-coupons", "发延期补偿券，暂不公开流水", { cash: -2, public_trust: -1, sales: 1 }, { buyer_liability: 5, legal_exposure: 5, data_inflation: 3 }, ["narrative-control", "risk-transfer-chain"], "部分业主收下，核心问题没动。", "补偿不能替代交付和资金解释，尤其当对方已经请律师。", { scaleScore: 1, blowupRisk: 0.22, followUps: [{ id: "escrow-ledger-audit", delay: 3 }] }),
        choice("prioritize-vocal-owners", "先处理最活跃业主的小额诉求", { cash: -3, public_trust: 2 }, { local_isolation: 4, legal_exposure: 4, buyer_liability: 3 }, ["risk-transfer-chain"], "群里安静一点，公平性问题开始出现。", "只安抚最吵的人，会把单点维权变成群体比较。", { scaleScore: 0, blowupRisk: 0.19 })
      ],
      1,
      6,
      { stakes: "业主进入法律语言后，剧情就从情绪管理切到证据管理。" }
    ),
    event(
      "local-task-force-night",
      "专班夜会：你不是来谈利润，是来交保交楼方案",
      ["sales-freeze", "guaranteed-delivery", "clearance"],
      "crisis",
      ["EP004", "EP124", "EP126"],
      ["political-embedded-enterprise", "delivery-first", "local-isolation"],
      "晚上十点，专班把银行、住建、街道、总包和你叫到一张桌上。问题不再是你赚不赚钱，而是这个盘能不能稳住。",
      [
        actor("专班负责人", "利润以后再说，先把交付责任切出来。"),
        actor("银行", "资金可以闭环，但不能再进集团池。"),
        actor("总包", "没有现金计划，我们不敢复工。")
      ],
      [
        choice("accept-ringfenced-project", "接受项目资金闭环，集团不得抽水", { delivery: 8, public_trust: 5, bank: 3, cash: -6 }, { buyer_liability: -5, presale_misuse: -4, political_dependency: 5 }, ["delivery-first", "escrow-control"], "项目得救，集团自由度下降。", "保交楼的代价是现金不再属于老板，而属于楼栋。", { scaleScore: -4, blowupRisk: 0.1 }),
        choice("argue-group-cash-pool", "坚持集团统筹资金，否则全盘都断", { cash: 4, government: -5, bank: -3 }, { buyer_liability: 6, presale_misuse: 6, local_isolation: 8, legal_exposure: 3 }, ["presale-cashflow-trap", "local-isolation"], "你保住集团调度，专班开始防你。", "当地方进入保交楼视角，集团资金池会被看成风险源。", { scaleScore: 1, blowupRisk: 0.28, followUps: [{ id: "asset-freeze-order", delay: 4 }] }),
        choice("hand-one-project-to-state", "交出一个项目处置权，保其他项目", { cash: -2, land_bank: -8, delivery: 6, government: 5, bank: 2 }, { political_dependency: 6, exit_preparation: 4, boss_safety: 2 }, ["state-purchase-floor", "exit-discipline"], "你少了一块地，换回喘息。", "让渡控制权是痛苦选择，但有时比让所有项目一起烂尾更真实。", { scaleScore: -5, blowupRisk: 0.13, endingCandidate: "state_rescue" })
      ],
      1,
      6,
      { stakes: "专班不是来帮你赚钱，是来重新分配控制权和责任。" }
    ),
    event(
      "discount-sale-stampede",
      "降价海报发出去，老业主和新客户同时挤进售楼处",
      ["three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "high",
      ["EP014", "EP124"],
      ["phantom-demand", "inventory-overhang", "data-inflation"],
      "营销团队把特价海报发出去了。新客户问还能不能再低，老业主问为什么自己买贵了，地方问是不是扰乱价格预期。",
      [
        actor("营销总", "不降价没有现金，降价至少有来访。"),
        actor("老业主", "你们说过不会跌。"),
        actor("住建窗口", "价格波动别引发群体投诉。")
      ],
      [
        choice("targeted-discount-with-compensation", "定向去库存，同时给老业主补偿包", { cash: 6, sales: 5, public_trust: -1, government: -1 }, { price_bubble: -4, buyer_liability: 3 }, ["inventory-overhang", "data-inflation"], "现金回来一些，补偿成本留下来。", "降价不是不能做，关键是承认旧承诺的代价。", { scaleScore: 1, blowupRisk: 0.16 }),
        choice("flash-sale-no-explanation", "直接闪降抢现金，不解释旧价", { cash: 12, sales: 8, public_trust: -8, government: -4 }, { price_bubble: -6, buyer_liability: 7, local_isolation: 5 }, ["phantom-demand", "inventory-overhang"], "现金最爽，售楼处最乱。", "现金流改善可能同时制造业主、价格和监管三条压力线。", { scaleScore: 3, blowupRisk: 0.29, followUps: [{ id: "old-owners-price-cut", delay: 2 }, { id: "homebuyer-lawyer-letter", delay: 4 }] }),
        choice("hold-price-cut-marketing", "不降价，只加渠道佣金和首付分期", { sales: 3, cash: -3, bank: -1 }, { data_inflation: 5, price_bubble: 5, financing_cost: 3 }, ["phantom-demand", "data-inflation"], "价格体面，回款不体面。", "不降价不等于价格稳定，渠道佣金和首付分期会把风险藏到回款质量里。", { scaleScore: 2, blowupRisk: 0.22 })
      ],
      1,
      6,
      { stakes: "降价能救现金，也能点燃旧业主、价格锚和监管压力。" }
    ),
    event(
      "personal-guarantee-call",
      "信托经理电话：续期可以，老板个人担保补上",
      ["high-turnover", "three-red-lines", "sales-freeze"],
      "crisis",
      ["EP031", "EP126"],
      ["leverage-backfire", "legal-exposure", "asset-freeze-chain"],
      "信托经理语气很客气：项目抵押不够，续期要补个人担保、家庭资产说明和核心项目收益权。你知道签了就能续命，也知道这条线会从公司走向个人。",
      [
        actor("信托经理", "不是不信你，是风控要求穿透。"),
        actor("家人", "公司债怎么变成家里的事？"),
        actor("法务", "签了之后，退出窗口会明显变窄。")
      ],
      [
        choice("sign-personal-guarantee", "签个人担保，先保集团不断链", { cash: 8, debt: 3, bank: 2 }, { legal_exposure: 9, asset_freeze_risk: 6, boss_safety: -9, financing_cost: 5 }, ["leverage-backfire", "legal-exposure"], "公司活过一关，老板安全掉一层。", "个人担保把企业风险改写成老板风险，后面不是只看项目赚不赚钱。", { scaleScore: 3, blowupRisk: 0.31, followUps: [{ id: "boss-travel-ban", delay: 6 }] }),
        choice("refuse-guarantee-sell-assets", "拒绝个人担保，卖资产还信托", { cash: 3, debt: -9, land_bank: -9, bank: 2 }, { exit_preparation: 8, boss_safety: 4, asset_freeze_risk: -1 }, ["exit-discipline", "balance-sheet-maintenance"], "集团瘦身，个人线保住一点。", "拒绝担保不是没有代价，它通常意味着卖资产和降规模。", { scaleScore: -5, blowupRisk: 0.12 }),
        choice("move-assets-before-signing", "签之前先把部分资产转出去", { cash: 3, bank: -4, government: -3 }, { legal_exposure: 12, asset_freeze_risk: 14, boss_safety: -12, exit_preparation: 8 }, ["asset-freeze-chain", "legal-exposure"], "你以为在留后路，债权人会把它看成转移。", "危机期资产动作会被倒看：商业安排和逃避责任之间只隔着证据链。", { scaleScore: -1, blowupRisk: 0.38, followUps: [{ id: "asset-freeze-order", delay: 2 }, { id: "founder-police-inquiry", delay: 5 }] })
      ],
      1,
      6,
      { stakes: "融资续命最危险的节点，是公司债开始穿透到老板个人。" }
    )
  );

  newEvents.push(
    event(
      "planning-stop-work-order",
      "规划局一纸停工：你多出来的半层被人举报了",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines"],
      "high",
      ["EP012", "EP037", "EP124"],
      ["government-permit-power", "competitor-pressure", "data-inflation"],
      "早上工地刚开门，规划执法车到了。举报材料很细：容积率、地下车位、人防面积、样板间口径，连你上次饭局上说过的话都被写进附件。",
      [
        actor("规划执法", "先停，手续和现场不一致的地方一项项核。"),
        actor("项目总", "多出来的面积当时是按口头意见做的。"),
        actor("同行销售", "谁让你这周抢了我们三组客户。")
      ],
      [
        choice("submit-correction-stop", "停工整改，补手续和罚款", { cash: -8, delivery: -5, government: 2, bank: -1 }, { legal_exposure: -2, data_inflation: -3, buyer_liability: 2 }, ["government-permit-power"], "你付出现金和工期，换回手续闭合。", "政府卡口不是摆设，规划、预售和验收决定项目能不能继续变成现金。", { scaleScore: -2, blowupRisk: 0.13 }),
        choice("ask-patron-to-press", "找老关系压下执法，先别停工", { delivery: 3, cash: -3, government: 2 }, { political_dependency: 8, legal_exposure: 5, local_isolation: 3 }, ["political-embedded-enterprise", "government-permit-power"], "工地没停，留痕更重。", "关系能让卡口晚一点落下，但会把商业问题改写成权力问题。", { scaleScore: 2, blowupRisk: 0.26, followUps: [{ id: "protective-umbrella-transfer", delay: 5 }] }),
        choice("blame-design-institute", "把责任压给设计院和报批顾问", { cash: 1, bank: -1, government: -1 }, { legal_exposure: 5, local_isolation: 5 }, ["risk-transfer-chain", "counterparty-retaliation"], "你短期没掏整改钱，但顾问、设计院和报批链开始留底自保。", "把责任压给专业方不会立刻烧现金，真正的代价是后面材料、证词和审批口径反咬。", { scaleScore: 0, blowupRisk: 0.22, followUps: [{ id: "tax-and-construction-joint-audit", delay: 4 }] })
      ],
      0,
      4,
      { stakes: "开发商不是只跟市场打交道，规划卡口能把项目从现金机器变成证据现场。" }
    ),
    event(
      "tax-and-construction-joint-audit",
      "税务、住建、市场监管一起进场：他们说只是例行检查",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "crisis",
      ["EP037", "EP078", "EP124"],
      ["government-permit-power", "data-inflation", "legal-exposure"],
      "你以为是税务查发票，结果住建要工程变更台账，市场监管要广告承诺，银行也被抄送。检查不一定说明你完了，但说明地方不再替你挡风。",
      [
        actor("税务专员", "总包发票、咨询费、渠道费分开看。"),
        actor("住建窗口", "变更签证是谁签的？"),
        actor("银行客户经理", "我们也要更新授信材料。")
      ],
      [
        choice("open-all-ledgers", "一次性交出台账，承认补税和整改", { cash: -9, bank: 2, government: 2, sales: -2 }, { data_inflation: -6, legal_exposure: -3, financing_cost: 2 }, ["government-permit-power", "data-inflation"], "账难看，但口径开始统一。", "被穿透时，最要命的不是数据差，而是每个口径都不一样。", { scaleScore: -3, blowupRisk: 0.12 }),
        choice("split-the-files", "分口径给材料，别让部门串起来", { cash: -2, bank: -3, government: -3 }, { data_inflation: 9, legal_exposure: 7, local_isolation: 5 }, ["data-inflation", "government-permit-power"], "当下少痛，后面一串。", "政府多部门联动时，信息差会迅速消失，拆口径会变成倒查入口。", { scaleScore: 1, blowupRisk: 0.31, followUps: [{ id: "founder-police-inquiry", delay: 6 }] }),
        choice("offer-local-stability-plan", "拿保交楼和稳就业方案换检查节奏", { cash: -5, delivery: 4, government: 4, bank: 1 }, { political_dependency: 5, buyer_liability: -2 }, ["delivery-first", "political-embedded-enterprise"], "地方愿意放缓，但你被稳就业和保交楼绑定。", "政府支持不是免费的，它常常用项目稳定和责任闭环来换。", { scaleScore: -1, blowupRisk: 0.17, followUps: [{ id: "local-task-force-night", delay: 4 }] })
      ],
      1,
      6,
      { stakes: "检查不是单一事件，它会把税、工程、广告、银行和交付串成一张网。" }
    ),
    event(
      "competitor-anonymous-report",
      "匿名举报信写得太专业，不像业主写的",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines"],
      "pressure",
      ["EP012", "EP101", "EP124"],
      ["competitor-pressure", "government-permit-power", "risk-transfer-chain"],
      "住建收到了匿名举报，指你预售宣传、学校承诺、资金监管和施工节点都有问题。举报信连附件编号都很懂行，像是隔壁项目的报批经理写的。",
      [
        actor("住建窗口", "不一定属实，但我们要核。"),
        actor("渠道经理", "对面这周被我们抢了不少客户。"),
        actor("法务", "如果材料真有漏洞，对方只是点火的人。")
      ],
      [
        choice("fix-real-gaps-first", "先补真实漏洞，再追举报来源", { cash: -5, sales: -2, government: 2 }, { data_inflation: -3, legal_exposure: -2 }, ["competitor-pressure", "feedback-loop"], "你没立刻反击，但把靶子缩小了。", "竞争举报可怕，是因为它借你的真实漏洞发力。先修漏洞，才有资格反击。", { scaleScore: -1, blowupRisk: 0.1 }),
        choice("counter-report-rival", "反手举报竞品违规降价和无证蓄客", { sales: 2, government: -1 }, { local_isolation: 3, legal_exposure: 2 }, ["competitor-pressure", "government-permit-power"], "市场更乱，监管更烦。", "互相举报能拖住对手，也会让监管把整个片区放进显微镜。", { scaleScore: 1, blowupRisk: 0.2, followUps: [{ id: "rival-price-raid", delay: 3 }] }),
        choice("mobilize-local-media", "找本地媒体讲你是被恶意竞争", { public_trust: 2, sales: 1, cash: -2 }, { data_inflation: 3, local_isolation: 2 }, ["narrative-control", "competitor-pressure"], "舆论暂时站你，材料还在那里。", "叙事能争取时间，但不能替代许可证、账户和交付证据。", { scaleScore: 1, blowupRisk: 0.18 })
      ],
      0,
      5,
      { stakes: "同行最懂你的漏洞，他们的举报不是道德攻击，而是产业内战。" }
    ),
    event(
      "rival-price-raid",
      "隔壁盘夜里降价十五个点，还送车位",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "high",
      ["EP014", "EP101", "EP124"],
      ["competitor-pressure", "phantom-demand", "inventory-overhang"],
      "你早上看销售日报，竞品一夜之间降价、送车位、佣金翻倍。你的客户开始退认购，渠道问你跟不跟。地方又提醒：不要引发老业主维权。",
      [
        actor("销售总", "不跟，客户走；跟，老业主炸。"),
        actor("渠道头部", "谁给佣金快，我就先带谁。"),
        actor("住建窗口", "价格战别变成群体事件。")
      ],
      [
        choice("follow-price-with-open-policy", "跟降，但同步给老业主补偿规则", { cash: 5, sales: 5, public_trust: -2, government: -1 }, { buyer_liability: 4, price_bubble: -4 }, ["competitor-pressure", "feedback-loop"], "回款回来一些，补偿成本留下。", "降价不是简单好坏，关键是旧承诺如何补偿，否则现金会换成维权。", { scaleScore: 1, blowupRisk: 0.18 }),
        choice("hold-price-raise-commission", "不降价，偷偷加渠道佣金", { sales: 2, cash: -3, bank: -1 }, { data_inflation: 5, financing_cost: 3, price_bubble: 5 }, ["platformized-sales", "phantom-demand"], "价格体面，真实回款更差。", "渠道佣金能遮住价格战，但遮不住现金质量。", { scaleScore: 2, blowupRisk: 0.23 }),
        choice("ask-government-price-guidance", "请住建约谈竞品，压住价格战", { government: 2, sales: -1, cash: -2 }, { political_dependency: 4, local_isolation: 3 }, ["government-permit-power", "competitor-pressure"], "价格战缓了，政府账上多了你一笔人情。", "用政府压竞争对手，本质是把市场问题交给关系系统，后面会收利息。", { scaleScore: 0, blowupRisk: 0.2 })
      ],
      1,
      6,
      { stakes: "竞争对手不需要打败你的楼，只要打断你的回款节奏。" }
    ),
    event(
      "land-auction-enclosure",
      "土拍规则改了：竞品质押了你最想要的配建条件",
      ["early-expansion", "shelter-reform-boom", "high-turnover"],
      "high",
      ["EP012", "EP037", "EP101"],
      ["land-finance-loop", "competitor-pressure", "government-permit-power"],
      "新地块公告出来，配建条件像给竞品量身定制：指定产业导入、学校捐建、区域总部承诺。你能硬上，但现金和政府信用都要押进去。",
      [
        actor("招商局", "谁能带产业，谁更适合这块地。"),
        actor("竞品老板", "规则公开透明，你也可以投。"),
        actor("财务", "这不是地价问题，是后续义务太厚。")
      ],
      [
        choice("walk-away-from-tailored-land", "放弃这块地，保现金等下一轮", { cash: 2, land_bank: -2, government: -2, sales: -1 }, { local_isolation: 2, financing_cost: -1 }, ["exit-discipline"], "你少了故事，也少了坑。", "不是每块地都值得拿，尤其当条件已经把你未来现金锁死。", { scaleScore: -2, blowupRisk: 0.07 }),
        choice("bid-to-prove-strength", "硬投，证明你还能和强手掰腕子", { land_bank: 12, government: 3, cash: -12, debt: 5 }, { financing_cost: 7, political_dependency: 5 }, ["land-finance-loop", "competitor-pressure"], "地拿到了，义务也拿到了。", "土地不是奖杯，配建和承诺会变成未来现金流的固定扣款。", { scaleScore: 5, blowupRisk: 0.26, followUps: [{ id: "local-task-force-night", delay: 8 }] }),
        choice("joint-bid-with-rival", "和竞品联合拿地，各退一步", { land_bank: 6, government: 2, cash: -5 }, { legal_exposure: 3, local_isolation: 4 }, ["risk-transfer-chain", "competitor-pressure"], "冲突变成合作，未来分账更复杂。", "联合拿地能降火，也会把对手请进你的账本。", { scaleScore: 2, blowupRisk: 0.16 })
      ],
      0,
      4,
      { stakes: "土地市场里的竞争，常常发生在公告条件写出来之前。" }
    ),
    event(
      "contractor-evidence-package",
      "总包递上证据包：签证、聊天、欠款表，一样不少",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze", "guaranteed-delivery", "clearance"],
      "crisis",
      ["EP031", "EP124", "EP126"],
      ["counterparty-retaliation", "risk-transfer-chain", "legal-exposure"],
      "总包没有再堵门，而是把工程签证、设计变更、欠款表、微信群语音整理成一套材料，递给住建、法院和银行。你以前压给他的责任，现在以证据形式回来了。",
      [
        actor("总包老板", "我不闹，我依法维权。"),
        actor("项目总", "很多变更当时只是口头同意。"),
        actor("银行", "这些材料会影响我们对项目现金流的判断。")
      ],
      [
        choice("settle-core-claims", "先结清关键签证和工资，换总包复工声明", { cash: -12, delivery: 7, bank: 2, public_trust: 2 }, { legal_exposure: -4, delivery_pressure: -4 }, ["counterparty-retaliation", "delivery-first"], "现金下降，是因为你真把签证、工资和复工款付出去了；证据链因此变短。", "总包反噬不是情绪问题，核心是证据、欠款和复工能力。", { scaleScore: -3, blowupRisk: 0.12 }),
        choice("challenge-contract-validity", "反诉总包虚增签证，拖住付款", { cash: 4, delivery: -4, bank: -3 }, { legal_exposure: 8, delivery_pressure: 7, local_isolation: 4 }, ["risk-transfer-chain", "counterparty-retaliation"], "钱保住，现场和法院都更冷。", "用诉讼拖付款会把工程问题变成司法和舆情问题。", { scaleScore: 1, blowupRisk: 0.3, followUps: [{ id: "court-freeze-account", delay: 3 }] }),
        choice("replace-contractor", "换总包，找新队伍接盘", { cash: -6, delivery: -2, sales: -2 }, { delivery_pressure: 6, legal_exposure: 5 }, ["delivery-first", "counterparty-retaliation"], "现金下降，是新总包进场费、旧账磨合和复工保证金的价格；旧账没有清零。", "换人不是清零，旧总包的证据包仍然在，新的总包还要重新信任你。", { scaleScore: -1, blowupRisk: 0.22 })
      ],
      0,
      6,
      { stakes: "你压给总包的每一项责任，最后都可能变成他手里的证据。" }
    ),
    event(
      "earthwork-boss-blackmail",
      "土方老板说：当年那些事，我也留了底",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "crisis",
      ["EP004", "EP037", "EP126"],
      ["gray-governance", "protective-umbrella-risk", "legal-exposure"],
      "当年帮你清场、协调、催人的土方老板突然要一笔补偿。他没有威胁，只说自己手里有饭局照片、转账记录和几段录音。",
      [
        actor("土方老板", "老板，我们是一起把事办成的。"),
        actor("法务", "给钱也可能是新证据，不给钱他可能先动。"),
        actor("老关系", "这条线别闹大，最近查得紧。")
      ],
      [
        choice("cut-ties-report-facts", "切割土方线，主动交代可核事实", { government: -2, cash: -3, bank: 1 }, { gray_risk: -6, legal_exposure: 3, boss_safety: 1 }, ["protective-umbrella-risk", "exit-discipline"], "短期难看，黑灰链变短。", "黑灰线最怕拖，越晚切割，越像共同体。", { scaleScore: -3, blowupRisk: 0.16 }),
        choice("pay-to-keep-quiet", "付一笔封口费，让他别闹", { cash: -8, government: 1 }, { gray_risk: 8, legal_exposure: 7, boss_safety: -6 }, ["gray-governance", "protective-umbrella-risk"], "今天安静了，明天更贵。", "黑灰线的成本会复利，封口费常常只是下一轮勒索的报价。", { scaleScore: 1, blowupRisk: 0.34, followUps: [{ id: "public-security-tea", delay: 4 }] }),
        choice("use-another-force-to-pressure", "找另一条社会关系压他回去", { cash: -4, delivery: 1 }, { gray_risk: 14, legal_exposure: 8, boss_safety: -10 }, ["gray-governance", "protective-umbrella-risk"], "冲突被压下，刑事风险被抬高。", "用灰色关系处理灰色关系，只会把经营风险推向扫黑风险。", { scaleScore: 2, blowupRisk: 0.42, followUps: [{ id: "anti-gang-investigation", delay: 5 }] })
      ],
      0,
      6,
      { stakes: "黑灰线不是一次性工具，它会记账、要价、留证、反噬。" }
    ),
    event(
      "protective-umbrella-transfer",
      "老领导调走，新班子开始翻旧项目",
      ["high-turnover", "three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "crisis",
      ["EP037", "EP078", "EP126"],
      ["political-embedded-enterprise", "protective-umbrella-risk", "government-permit-power"],
      "你最熟的老领导调走了，新班子要做土地、规划和保交楼专项梳理。以前那些口头意见、协调费、配建承诺，现在都要重新写成材料。",
      [
        actor("新分管领导", "历史问题也要有闭环。"),
        actor("老关系", "我现在不方便再出面。"),
        actor("财务", "很多账当时就是按关系走的。")
      ],
      [
        choice("clean-history-ledger", "把旧项目、旧承诺、旧资金一次性清表", { cash: -10, government: 2, bank: 1 }, { political_dependency: -5, legal_exposure: -2, data_inflation: -3 }, ["government-permit-power", "exit-discipline"], "你交了学费，减少倒查。", "政商关系最大的风险，是换届后旧默契变成新材料。", { scaleScore: -4, blowupRisk: 0.12 }),
        choice("wait-for-new-patron", "先观望，找新班子的入口", { cash: -2, government: -3, sales: -1 }, { local_isolation: 6, political_dependency: 3 }, ["political-embedded-enterprise", "government-permit-power"], "你等关系，项目等不了。", "关系真空期不是中性状态，审批、银行和竞争对手都会趁空窗重定价。", { scaleScore: 0, blowupRisk: 0.24, followUps: [{ id: "competitor-anonymous-report", delay: 3 }] }),
        choice("offer-takeover-troubled-project", "主动接一个烂尾盘，换新班子信任", { government: 6, bank: 2, cash: -8, delivery: -2 }, { political_dependency: 8, buyer_liability: 6 }, ["delivery-first", "political-embedded-enterprise"], "你换来入口，也背上别人的坑。", "接烂尾盘是典型政商交换：它能换信任，也会把别人的责任接到你身上。", { scaleScore: 2, blowupRisk: 0.25, followUps: [{ id: "local-task-force-night", delay: 4 }] })
      ],
      2,
      6,
      { stakes: "关系不是资产负债表外的免费资产，换届时它会重新估值。" }
    ),
    event(
      "public-security-tea",
      "派出所请你喝茶：土方、催收、清场，谁授权的？",
      ["three-red-lines", "sales-freeze", "guaranteed-delivery", "clearance"],
      "crisis",
      ["EP004", "EP037", "EP126"],
      ["gray-governance", "protective-umbrella-risk", "legal-exposure"],
      "一场看似普通的问话，从几年前的清场开始，问到土方合同、付款路径、现场视频和谁给谁打过电话。你突然发现，项目效率的每一步都有名字。",
      [
        actor("办案民警", "我们只核事实，不听商业解释。"),
        actor("法务", "不要把不知道说成知道，也不要把授权说成个人行为。"),
        actor("项目旧员工", "当时很多事都是口头安排。")
      ],
      [
        choice("provide-factual-chain", "按事实链说明授权和付款，不甩锅", { cash: -2, government: -1 }, { legal_exposure: -2, gray_risk: -3, boss_safety: 2 }, ["protective-umbrella-risk"], "难看但可核。", "刑事风险里，最危险的是用商业话术替代事实链。", { scaleScore: -2, blowupRisk: 0.14 }),
        choice("blame-project-manager", "说是项目经理个人操作", { cash: 1, government: -2 }, { legal_exposure: 7, gray_risk: 5, boss_safety: -5 }, ["risk-transfer-chain", "protective-umbrella-risk"], "你先轻一点，旧员工开始自保。", "把锅压给执行层，会让执行层拿出更多上级授权证据。", { scaleScore: 0, blowupRisk: 0.32, followUps: [{ id: "contractor-evidence-package", delay: 3 }] }),
        choice("ask-old-umbrella-help", "找旧保护伞问能不能压一压", { government: 1, cash: -4 }, { political_dependency: 8, legal_exposure: 8, gray_risk: 8, boss_safety: -8 }, ["protective-umbrella-risk", "political-embedded-enterprise"], "你把问话升级成保护伞线索。", "保护伞一旦被触发，问题就不是项目，而是权力网络。", { scaleScore: 1, blowupRisk: 0.4, followUps: [{ id: "anti-gang-investigation", delay: 3 }] })
      ],
      2,
      6,
      { stakes: "灰色效率的终点，常常不是财务报表，而是询问笔录。" }
    ),
    event(
      "channel-poaching-war",
      "渠道反水：你的客户名单被带到竞品售楼处",
      ["shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "pressure",
      ["EP101", "EP124"],
      ["platformized-sales", "competitor-pressure", "risk-transfer-chain"],
      "头部渠道拿着你的客户名单去了隔壁盘。竞品给更高佣金、更快结算，还承诺帮客户退你的认购。你突然发现，客户关系不是你的，是渠道的。",
      [
        actor("渠道头部", "我们只跟回款最快的人合作。"),
        actor("销售总", "名单、到访、认购都在他们系统里。"),
        actor("竞品销售", "客户只关心谁便宜、谁能交。")
      ],
      [
        choice("pay-channel-arrears", "先结清渠道旧佣金，换回名单和带看", { cash: -7, sales: 6 }, { financing_cost: 2 }, ["platformized-sales"], "销售回来一点，现金又少一截。", "渠道不是忠诚体系，是现金和佣金体系。", { scaleScore: 1, blowupRisk: 0.14 }),
        choice("build-direct-owner-list", "自建客户池，慢慢脱离渠道", { cash: -4, sales: -3, public_trust: 3 }, { data_inflation: -2 }, ["exit-discipline", "platformized-sales"], "短期难，长期少被卡脖子。", "脱离渠道会牺牲速度，但能减少平台化销售的反噬。", { scaleScore: -1, blowupRisk: 0.09 }),
        choice("promise-higher-commission", "给更高佣金抢回渠道", { sales: 5, cash: -2, bank: -1 }, { financing_cost: 5, data_inflation: 3 }, ["platformized-sales", "competitor-pressure"], "客户回来了，回款质量更差。", "佣金战像价格战，会把利润和现金流一起打薄。", { scaleScore: 2, blowupRisk: 0.22, followUps: [{ id: "discount-sale-stampede", delay: 3 }] })
      ],
      1,
      6,
      { stakes: "渠道掌握流量时，竞争对手可以不抢地，先抢你的客户。" }
    )
  );

  newEvents.push(
    event(
      "mature-asset-sale-rumor",
      "核心项目有人出高价，外面开始传你要撤",
      ["high-turnover", "three-red-lines", "sales-freeze"],
      "high",
      ["EP078", "EP101", "EP126"],
      ["cycle-asset-trader", "exit-discipline", "political-embedded-enterprise"],
      "你手里最成熟的综合体有人出价，价格不错，能覆盖一大截短债。问题是它也是你在这座城市的门面。消息一漏，地方、银行、员工都在问：你是不是不看好后面了？",
      [
        actor("买方代表", "我们买的是稳定现金流，不买你的未来故事。"),
        actor("地方联系人", "你卖可以，但别让市场以为你撤了。"),
        actor("财务总监", "卖掉它，现金短债比会非常舒服。")
      ],
      [
        choice("sell-mature-repay", "卖成熟资产，钱进偿债和交付账户", { cash: 18, debt: -14, bank: 4, government: -3, land_bank: -10 }, { exit_preparation: 12, asset_freeze_risk: -3, legal_exposure: -2, boss_safety: 4 }, ["cycle-asset-trader", "exit-discipline"], "你丢掉门面，换回安全边际。", "周期交易者的能力是敢在资产还好卖时卖，而不是等没人要时卖。", { scaleScore: -4, blowupRisk: 0.08, endingCandidate: "clean_exit" }),
        choice("hold-for-signal", "不卖，保住城市门面和市场信心", { government: 4, sales: 3, bank: 1, cash: -3 }, { price_bubble: 5, exit_preparation: -4 }, ["phantom-demand", "cycle-asset-trader"], "市场觉得你有信心，现金表觉得你在硬撑。", "保信心和保现金经常冲突，门面资产也会消耗流动性。", { scaleScore: 3, blowupRisk: 0.16 }),
        choice("sell-quietly-offshore", "悄悄卖给境外基金，少披露用途", { cash: 12, government: -7, bank: -4, public_trust: -3 }, { exit_preparation: 14, legal_exposure: 8, asset_freeze_risk: 8, local_isolation: 7 }, ["cycle-asset-trader", "control-right-risk", "legal-exposure"], "交易看似漂亮，解释成本很高。", "退出不是只看成交价，还看审批、舆论和资金用途能不能说清楚。", { scaleScore: -2, blowupRisk: 0.28, followUps: [{ id: "foreign-fund-takeover-review", delay: 3 }] })
      ],
      2,
      6,
      { stakes: "同一笔卖资产，可以是高点纪律，也可以被解释成撤退和转移。" }
    ),
    event(
      "office-vacancy-rent-roll",
      "写字楼租金表很好看，空置层也很好看",
      ["high-turnover", "three-red-lines", "sales-freeze"],
      "pressure",
      ["EP114", "EP126"],
      ["commercial-asset-exit", "audit-revenue-recognition", "balance-sheet-maintenance"],
      "你转型持有核心写字楼，希望用租金替代卖房收入。年报里平均租金还不错，但招商团队知道，几个大租户明年要退，空置层已经不太好藏。",
      [
        actor("招商总", "租金不能降，一降估值就掉。"),
        actor("审计经理", "免租期、空置率和真实回款要分开披露。"),
        actor("银行", "我们看租金覆盖，不看楼有多漂亮。")
      ],
      [
        choice("cut-rent-keep-tenants", "主动降租保入住率", { cash: -4, sales: -2, bank: 2, public_trust: 2 }, { data_inflation: -4, price_bubble: -3 }, ["commercial-asset-exit"], "估值不好看，现金流更真实。", "商业地产的安全来自真实租金，不是标牌上的报价。", { scaleScore: -1, blowupRisk: 0.07 }),
        choice("hide-vacancy-free-rent", "用长免租期撑表面租金", { bank: 2, sales: 2, cash: -2 }, { data_inflation: 9, legal_exposure: 3, price_bubble: 4 }, ["audit-revenue-recognition", "data-inflation"], "报表租金稳住，现金回款没稳住。", "免租期不是收入，空置率也不是能靠口径消失的东西。", { scaleScore: 2, blowupRisk: 0.2, followUps: [{ id: "annual-audit-revenue-cut", delay: 5 }] }),
        choice("sell-office-block", "趁租约还在，打包卖掉一栋楼", { cash: 14, debt: -8, land_bank: -8, bank: 3 }, { exit_preparation: 10, asset_freeze_risk: 2 }, ["cycle-asset-trader", "commercial-asset-exit"], "你少了租金故事，多了现金。", "商业资产退出窗口常常开在坏消息完全显性之前。", { scaleScore: -3, blowupRisk: 0.1 })
      ],
      2,
      6,
      { stakes: "从开发销售转成持有收租，不是风险消失，而是风险换成租户和估值。" }
    ),
    event(
      "foreign-fund-takeover-review",
      "外资要买控股权，审批一直没有落章",
      ["three-red-lines", "sales-freeze", "clearance"],
      "crisis",
      ["EP078", "EP126"],
      ["control-right-risk", "commercial-asset-exit", "local-isolation"],
      "外资基金愿意收你的控股权，价格不算差。协议签了很久，审批前置条件迟迟没有全部满足。股票市场每天都在猜：这是体面退出，还是卖不出去？",
      [
        actor("外资基金", "条件不满足，我们不能无限等。"),
        actor("监管沟通顾问", "交易不是商业双方同意就结束。"),
        actor("小股东", "你到底是要转型，还是要离场？")
      ],
      [
        choice("extend-review-open-books", "延长审查期，公开补充材料", { bank: 1, government: 2, cash: -2 }, { legal_exposure: -2, data_inflation: -2, exit_preparation: 4 }, ["control-right-risk"], "慢，但可解释。", "控制权交易越大，越需要把资金用途、资产质量和审批路径讲清楚。", { scaleScore: -1, blowupRisk: 0.11 }),
        choice("cancel-deal-pivot-rental", "取消交易，转向租金和代建自救", { cash: -4, sales: -2, public_trust: 2 }, { exit_preparation: -4, local_isolation: -2, boss_safety: 2 }, ["commercial-asset-exit", "exit-discipline"], "退出失败，但你没有继续赌审批。", "卖不掉时，体面承认比反复讲故事更安全。", { scaleScore: -2, blowupRisk: 0.12 }),
        choice("push-deal-politically", "找关系催审批，要求尽快放行", { government: 2, cash: -4, bank: -2 }, { political_dependency: 8, legal_exposure: 4, local_isolation: 4, boss_safety: -3 }, ["political-embedded-enterprise", "control-right-risk"], "你把商业交易推回关系系统。", "越是想体面退出，越不能让退出看起来像被特殊放行。", { scaleScore: 0, blowupRisk: 0.23 })
      ],
      3,
      6,
      { stakes: "控股权出售不是卖一栋楼，它会被监管、市场和舆论同时审查。" }
    ),
    event(
      "mortgage-funds-wrong-account",
      "按揭款没进监管户，业主拿到流水",
      ["three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "crisis",
      ["EP101", "EP126", "EP031"],
      ["pre-sale-funds-leak", "escrow-control", "legal-exposure"],
      "业主代表拿着银行流水进门：几笔按揭款没有进入项目监管户，而是先进了集团往来账户。银行说拨付流程复杂，住建窗口说要先核材料，你的项目经理一句话也不敢接。",
      [
        actor("业主代表", "我们买的是房子，不是你们集团的资金池。"),
        actor("银行支行", "账户流转要看审批链，不是只看截图。"),
        actor("项目财务", "当时只是临时调拨，问题是现在补不上。")
      ],
      [
        choice("force-bank-reconcile", "要求银行、住建和项目三方对账，先补监管户", { cash: -6, bank: -3, government: -2, delivery: 4, public_trust: 6 }, { presale_misuse: -6, legal_exposure: -3, buyer_liability: -4, boss_safety: 2 }, ["pre-sale-funds-leak", "feedback-loop"], "你把伤口摊开，短期很难看，但证据链开始变清楚。", "预售款的核心不是有没有钱，而是这笔钱有没有被项目交付锁住。", { scaleScore: -1, blowupRisk: 0.1, relationEffects: { bank_manager: -5, buyers: 7, local_official: -2 }, followUps: [{ id: "white-list-application-review", delay: 4 }] }),
        choice("patch-with-new-sales", "用新认购先把旧监管户窟窿补上", { cash: 8, sales: 3, bank: -2, delivery: -2 }, { presale_misuse: 10, buyer_liability: 7, legal_exposure: 5, data_inflation: 3 }, ["pre-sale-funds-leak", "presale-cashflow-trap"], "今天账户平了，后面的购房款责任变厚了。", "用下一批购房人的钱补上一批缺口，本质是把交付责任往后滚。", { scaleScore: 2, blowupRisk: 0.26, relationEffects: { buyers: -5, bank_manager: -3 }, followUps: [{ id: "escrow-gap-screenshot", delay: 3 }, { id: "homebuyer-lawyer-letter", delay: 6 }] }),
        choice("blame-branch-clerk", "说是支行经办理解偏差，先让基层背锅", { cash: 1, government: 1, bank: -5, public_trust: -5 }, { legal_exposure: 9, data_inflation: 4, asset_freeze_risk: 3, boss_safety: -6 }, ["legal-exposure", "risk-transfer-chain"], "你争取到几天沉默，也多了一个最懂流水的人。", "把责任压给知道细节的人，后期常常变成证词和倒查入口。", { scaleScore: 0, blowupRisk: 0.34, relationEffects: { bank_manager: -10, buyers: -4 }, followUps: [{ id: "founder-police-inquiry", delay: 5 }] })
      ],
      2,
      6,
      { stakes: "监管户不是装饰，它决定购房款是项目责任还是集团现金池。" }
    ),
    event(
      "fake-progress-drawdown",
      "工程进度照片，比现场快了两层",
      ["high-turnover", "three-red-lines", "sales-freeze"],
      "high",
      ["EP101", "EP124", "EP126"],
      ["pre-sale-funds-leak", "audit-revenue-recognition", "delivery-first"],
      "为了申请监管资金拨付，工程部交来一套照片：塔吊角度刚好避开停工楼栋，进度说明写得很满。总包说不盖章就没钱买材料，监理说照片不是他拍的。",
      [
        actor("总包项目经理", "钱不到，楼更盖不起来。"),
        actor("监理", "你要我盖章，就别让我以后一个人解释。"),
        actor("财务总监", "监管户里有钱，但节点没到，账面和现场卡住了。")
      ],
      [
        choice("correct-progress-delay", "按真实进度重报，先少拿一笔", { cash: -7, delivery: 2, bank: 2, public_trust: 2 }, { presale_misuse: -4, legal_exposure: -3, data_inflation: -5, buyer_liability: -2 }, ["delivery-first", "feedback-loop"], "现金更紧，材料更少，但证据没有继续变脏。", "监管资金拨付看起来是手续，实质是交付责任和现金自由度的分界。", { scaleScore: -2, blowupRisk: 0.09, relationEffects: { contractor: -3, bank_manager: 2 } }),
        choice("submit-old-photos", "用旧照片凑节点，先把拨付拿出来", { cash: 9, delivery: -3, bank: -2 }, { presale_misuse: 8, data_inflation: 8, legal_exposure: 6, buyer_liability: 5 }, ["pre-sale-funds-leak", "data-inflation"], "钱出来了，现场没有跟上。", "工程进度一旦被写假，后面就不是施工慢，而是材料、监管和审计一起反问。", { scaleScore: 2, blowupRisk: 0.28, relationEffects: { contractor: 4, bank_manager: -5 }, followUps: [{ id: "escrow-ledger-audit", delay: 4 }] }),
        choice("make-contractor-stamp", "让总包盖章：要钱可以，字也一起签", { cash: 7, delivery: 1, public_trust: -2 }, { legal_exposure: 5, presale_misuse: 5, off_balance_debt: 3 }, ["counterparty-retaliation", "pre-sale-funds-leak"], "你把一部分责任推给总包，也把总包推成了证人。", "责任共担不是风险消失，承包商被逼急后会拿盖章材料谈条件。", { scaleScore: 1, blowupRisk: 0.24, relationEffects: { contractor: -8, suppliers: 2 }, followUps: [{ id: "contractor-evidence-package", delay: 5 }] })
      ],
      2,
      6,
      { stakes: "监管资金能不能拨，取决于现场、材料和人愿不愿意替你签字。" }
    ),
    event(
      "bid-companion-companies",
      "三家陪标公司，用的是同一个报价模板",
      ["early-expansion", "shelter-reform-boom", "high-turnover"],
      "high",
      ["EP004", "EP026", "EP126"],
      ["bid-rigging-chain", "government-permit-power", "competitor-pressure"],
      "新地块的土建招标刚开，法务就发现三家投标公司的报价表格式、错别字、联系人手机归属地都像一个人做的。地方熟人提醒你：别把老关系晾在外面，同行也在盯。",
      [
        actor("招采经理", "按规矩重开，进度至少慢一个月。"),
        actor("地方熟人", "大家都这么配合，太干净反而不好办事。"),
        actor("竞争对手", "你要是中标，我们也会看看过程。")
      ],
      [
        choice("cancel-tender-open", "废标重开，公开补充招标记录", { cash: -4, delivery: -2, government: -3, bank: 1 }, { legal_exposure: -4, local_isolation: 3, boss_safety: 2 }, ["bid-rigging-chain", "feedback-loop"], "你损失时间，也让一些熟人觉得你不懂规矩。", "清理围标能降低刑事风险，但会牺牲地方默契和项目节奏。", { scaleScore: -1, blowupRisk: 0.1, relationEffects: { local_official: -4, competitors: -2 } }),
        choice("proceed-friendly-bidders", "照旧走流程，让熟人队伍中标", { cash: 5, delivery: 4, government: 3 }, { legal_exposure: 8, political_dependency: 5, data_inflation: 2, boss_safety: -3 }, ["bid-rigging-chain", "political-embedded-enterprise"], "进度很顺，文件也很顺，只是太顺。", "围标的收益是确定性，代价是每一个知道过程的人都成了未来变量。", { scaleScore: 3, blowupRisk: 0.3, relationEffects: { local_official: 5, competitors: -6, contractor: 3 }, followUps: [{ id: "competitor-anonymous-report", delay: 4 }] }),
        choice("split-packages-reopen", "拆成小标段重开，保一部分熟人也留竞争", { cash: -1, delivery: 1, government: 1, bank: 1 }, { legal_exposure: 1, political_dependency: 2, local_isolation: 1 }, ["bid-rigging-chain", "risk-transfer-chain"], "你没有完全得罪熟人，也没有完全清干净。", "现实里常见的折中，会降低单点爆雷，却留下多条解释成本。", { scaleScore: 1, blowupRisk: 0.18, relationEffects: { local_official: 2, competitors: -2, contractor: 1 } })
      ],
      0,
      4,
      { stakes: "招投标是房地产灰色成本的入口，低价、关系、工期和刑事风险常在这里交换。" }
    ),
    event(
      "low-bid-change-order-night",
      "低价中标后，签证单一页页长出来",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines"],
      "pressure",
      ["EP101", "EP114", "EP126"],
      ["low-bid-change-order", "counterparty-retaliation", "risk-transfer-chain"],
      "当初总包低价中标，你以为省了钱。现在施工方拿来一沓签证：地基处理、临水临电、材料涨价、雨季窝工，每一张都不大，加起来刚好把利润补回去。",
      [
        actor("总包老板", "不是我要加，是当初那个价根本干不下来。"),
        actor("成本经理", "全拒会停工，全认现金会死。"),
        actor("监理", "签不签都要留痕，别让我最后一个扛。")
      ],
      [
        choice("approve-critical-change", "认关键签证，要求换交付节点", { cash: -6, delivery: 5, public_trust: 2 }, { off_balance_debt: -2, delivery_pressure: -3, legal_exposure: 1 }, ["low-bid-change-order", "delivery-first"], "你多花钱买确定性，但利润被吃掉。", "低价中标省下的钱，常常会在签证和索赔里重新出现。", { scaleScore: 0, blowupRisk: 0.12, relationEffects: { contractor: 6, suppliers: 2 } }),
        choice("reject-and-litigate", "全部打回，准备反诉虚增签证", { cash: 5, delivery: -6, government: -2, public_trust: -3 }, { legal_exposure: 7, delivery_pressure: 8, off_balance_debt: 4, boss_safety: -3 }, ["counterparty-retaliation", "low-bid-change-order"], "账上轻了一点，工地和证据都重了。", "把承包商压到极限，后面可能换来停工、保全、举报和证据包。", { scaleScore: 1, blowupRisk: 0.32, relationEffects: { contractor: -12, suppliers: -4 }, followUps: [{ id: "contractor-evidence-package", delay: 3 }, { id: "wage-account-deadline", delay: 5 }] }),
        choice("third-party-audit", "请第三方审价，边审边付一部分", { cash: -3, delivery: 2, bank: 1, government: -1 }, { legal_exposure: -2, delivery_pressure: -1, off_balance_debt: 1 }, ["feedback-loop", "low-bid-change-order"], "你没有省最多的钱，也没有把对方逼到桌外。", "第三方审价的价值不是完美公平，而是让后续争议有可解释的证据。", { scaleScore: 0, blowupRisk: 0.13, relationEffects: { contractor: 1, suppliers: 1, local_official: -1 } })
      ],
      0,
      6,
      { stakes: "低价中标只是第一回合，真正的利润和风险会在施工签证里重写。" }
    ),
    event(
      "land-auction-bond-borrowed",
      "保证金是过桥钱，明天就开始计息",
      ["early-expansion", "shelter-reform-boom", "high-turnover"],
      "high",
      ["EP101", "EP110", "EP124"],
      ["shadow-banking-loop", "land-fiscal-pressure", "leverage-backfire"],
      "城南地块今晚交保证金。你自己的现金不够，中间人说有一笔过桥资金能进来，三天一算息，拿下地后银行就好谈。问题是地还没拍，利息已经开始跑。",
      [
        actor("资金中间人", "地拿下来，利息就不是问题。"),
        actor("财务总监", "如果没拍到，保证金退回来也慢。"),
        actor("自然资源窗口", "报名时间不等人。")
      ],
      [
        choice("borrow-bridge-bid", "借过桥钱冲进去，先把牌桌坐上", { cash: 7, debt: 7, land_bank: 8, government: 2, bank: -2 }, { financing_cost: 10, off_balance_debt: 6, political_dependency: 3 }, ["shadow-banking-loop", "leverage-backfire"], "你拿到机会，也拿到一只按天吃现金的表。", "土地上行时过桥像加速器，下行或流拍时它会先变成短债。", { scaleScore: 5, blowupRisk: 0.3, relationEffects: { bank_manager: -2, local_official: 2 }, followUps: [{ id: "interest-rollover-friday", delay: 3 }] }),
        choice("bring-partner-split", "拉国企小股东一起进，分掉地块和控制权", { cash: -2, land_bank: 5, government: 5, bank: 3 }, { political_dependency: 6, local_isolation: -2, financing_cost: 2 }, ["political-embedded-enterprise", "land-fiscal-pressure"], "你少赚一块，也少背一块。", "有地方或国资缓冲能降低融资难度，但会让项目处置权不再完全属于你。", { scaleScore: 3, blowupRisk: 0.17, relationEffects: { state_capital: 7, local_official: 5 } }),
        choice("skip-auction", "放弃报名，把现金留给在建项目", { cash: 3, delivery: 2, government: -5, sales: -2, land_bank: -4 }, { financing_cost: -2, local_isolation: 5, exit_preparation: 2 }, ["exit-discipline", "delivery-first"], "你保住现金，也错过一轮地方叙事。", "不拿地是风险控制，也可能被银行和地方解释成增长停了。", { scaleScore: -3, blowupRisk: 0.1, relationEffects: { local_official: -6, bank_manager: 1 } })
      ],
      0,
      5,
      { stakes: "土地保证金不是押金那么简单，它决定你是用自由现金拿地，还是用短债赌周期。" }
    ),
    event(
      "private-fund-bridge-weekend",
      "周末过桥资金，合同写成咨询费",
      ["high-turnover", "three-red-lines", "sales-freeze"],
      "high",
      ["EP004", "EP101", "EP126"],
      ["shadow-banking-loop", "related-party-financing", "legal-exposure"],
      "周五晚，信托展期还差一笔钱。朋友介绍的私募愿意周末先进款，但合同不能写借款，只能写咨询服务费。财务问：这笔钱进来后，周一怎么出表？",
      [
        actor("私募经理", "我们只看抵押和担保，不看你的故事。"),
        actor("审计顾问", "咨询费没有服务内容，后面很难解释。"),
        actor("老朋友", "我把人带来了，别让我夹在中间。")
      ],
      [
        choice("accept-consulting-bridge", "签咨询费合同，周一先过桥", { cash: 10, debt: 5, bank: -3 }, { financing_cost: 12, off_balance_debt: 7, legal_exposure: 8, boss_safety: -4 }, ["shadow-banking-loop", "related-party-financing"], "周一过了，后面每个周五都更贵。", "把借款写成服务费，能救现金表，却会把资金性质和个人责任变脏。", { scaleScore: 2, blowupRisk: 0.36, relationEffects: { bank_manager: -4 }, followUps: [{ id: "personal-guarantee-call", delay: 3 }] }),
        choice("reject-bridge-call-bank", "拒绝灰色过桥，直接找银行谈展期", { cash: -5, bank: -2, government: 1 }, { financing_cost: 2, legal_exposure: -3, boss_safety: 2 }, ["feedback-loop", "balance-sheet-maintenance"], "你把坏消息提前给银行，价格不好但性质干净。", "展期谈判最怕迟，越晚越需要用更贵、更脏的钱补洞。", { scaleScore: -1, blowupRisk: 0.15, relationEffects: { bank_manager: -1 } }),
        choice("disclose-high-cost-loan", "按借款披露，接受高息和担保条件", { cash: 7, debt: 6, bank: 1 }, { financing_cost: 8, legal_exposure: -1, asset_freeze_risk: 2 }, ["shadow-banking-loop", "balance-sheet-maintenance"], "钱贵，但至少没有伪装成别的东西。", "高息借款的风险在成本和担保，不在账面口径；写清楚不等于安全，只是少一层假账。", { scaleScore: 1, blowupRisk: 0.24, relationEffects: { bank_manager: 1 } })
      ],
      2,
      6,
      { stakes: "危机里的钱越快，通常越贵、越短、越容易追到个人。" }
    ),
    event(
      "earthwork-subcontract-chain",
      "土方分包换了三层，最后一层来要账",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "high",
      ["EP004", "EP026", "EP126"],
      ["gray-governance", "counterparty-retaliation", "protective-umbrella-risk"],
      "工地门口来了十几个人，说自己是最末端的土方队。合同不是跟你签的，活却是在你地块上干的。带头的人没有砸东西，只把当年清场的照片一张张摆出来。",
      [
        actor("末端土方队", "钱可以慢慢谈，照片先给你看看。"),
        actor("总包老板", "这是他下面的人，别直接找我。"),
        actor("派出所熟人", "别把普通纠纷拖成治安问题。")
      ],
      [
        choice("pay-last-layer", "直接付末端队一部分，换走照片和人", { cash: -5, delivery: 2, public_trust: 1 }, { gray_risk: 4, off_balance_debt: -2, legal_exposure: 2 }, ["gray-governance", "protective-umbrella-risk"], "人走了，但你承认了这条链知道你是谁。", "给钱能降现场风险，也可能证明你和多层分包有事实关系。", { scaleScore: 0, blowupRisk: 0.22, relationEffects: { underground: 4, contractor: -2 }, followUps: [{ id: "earthwork-boss-blackmail", delay: 5 }] }),
        choice("push-to-main-contractor", "让总包处理：合同找谁签就找谁", { cash: 3, delivery: -3, government: -2 }, { gray_risk: 7, legal_exposure: 5, delivery_pressure: 4 }, ["counterparty-retaliation", "risk-transfer-chain"], "你守住合同边界，也把现场推到总包和末端之间。", "合同边界能保护你，但人被压急后会用举报、堵门和照片重开边界。", { scaleScore: 1, blowupRisk: 0.31, relationEffects: { contractor: -8, underground: -4 }, followUps: [{ id: "public-security-tea", delay: 4 }] }),
        choice("local-mediator", "请镇里和派出所熟人做调解，分期付款", { cash: -3, government: 2, delivery: 1 }, { political_dependency: 4, gray_risk: 3, local_isolation: -1 }, ["political-embedded-enterprise", "protective-umbrella-risk"], "现场降温，关系账加厚。", "基层调解能把事按住，但会让地方和熟人更清楚你的旧账。", { scaleScore: 1, blowupRisk: 0.2, relationEffects: { local_official: 4, underground: 1 } })
      ],
      0,
      6,
      { stakes: "土方和拆迁线的风险不在合同文本，而在人、照片、欠款和谁能把谁供出来。" }
    ),
    event(
      "related-bank-spv-loan",
      "银行朋友说额度能走，但要绕一层公司",
      ["shelter-reform-boom", "high-turnover", "three-red-lines"],
      "pressure",
      ["EP101", "EP124", "EP126"],
      ["related-party-financing", "shadow-banking-loop", "balance-sheet-maintenance"],
      "你在主银行的额度被卡住，支行朋友给了一个方案：先让关联公司做贸易背景，再把钱通过项目服务费转回来。表面不是开发贷，实际还是给项目续命。",
      [
        actor("支行朋友", "别写房地产用途，系统就不会卡那么死。"),
        actor("财务总监", "贸易背景要有货、有票、有流转。"),
        actor("审计经理", "绕一层公司，不等于别人看不出来。")
      ],
      [
        choice("refuse-spv-loan", "拒绝绕道，接受额度变小", { cash: -4, bank: 2, debt: -1 }, { legal_exposure: -3, data_inflation: -3, financing_cost: -1 }, ["feedback-loop", "balance-sheet-maintenance"], "钱少了，性质干净一点。", "房地产融资被卡时，最危险的不是借不到，而是为了借到把用途写假。", { scaleScore: -1, blowupRisk: 0.1, relationEffects: { bank_manager: -2 } }),
        choice("use-spv-trade-loop", "走关联公司贸易背景，把钱转回项目", { cash: 9, debt: 5, bank: 2 }, { off_balance_debt: 8, data_inflation: 7, legal_exposure: 6, financing_cost: 5 }, ["related-party-financing", "shadow-banking-loop"], "钱进来了，穿透链也进来了。", "关联融资能维持账面，但银行、审计和法院会追真实用途、货物流和控制关系。", { scaleScore: 3, blowupRisk: 0.3, relationEffects: { bank_manager: 5 }, followUps: [{ id: "tax-and-construction-joint-audit", delay: 5 }] }),
        choice("cap-and-document", "只借小额，补齐贸易、担保和资金用途材料", { cash: 4, debt: 2, bank: 1 }, { financing_cost: 3, legal_exposure: 1, data_inflation: 1 }, ["related-party-financing", "balance-sheet-maintenance"], "你拿了不便宜的钱，也给后续审查留了路。", "现实里的折中不是无风险，而是把风险限制在能解释、能偿还、能穿透的范围。", { scaleScore: 1, blowupRisk: 0.18, relationEffects: { bank_manager: 2 } })
      ],
      1,
      6,
      { stakes: "关系银行能给入口，但资金用途一旦写假，入口就会变成倒查路径。" }
    ),
    event(
      "branch-president-rotation",
      "支行换行长：旧口头承诺不算数",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "pressure",
      ["EP031", "EP078", "EP124"],
      ["balance-sheet-maintenance", "feedback-loop"],
      "原来拍胸口支持你的支行行长调走了。新行长把授信材料退回来，只认真实回款、抵押折扣和监管账户流水。",
      [
        actor("新行长", "我不接上一任的口头承诺，只看可穿透现金流。"),
        actor("旧客户经理", "材料能补，但别让我背你以前讲过的故事。"),
        actor("财务总监", "关系换人以后，最先掉价的是不能写进合同的信用。")
      ],
      [
        choice("clean-credit-file", "重做现金流表，接受额度缩水", { cash: -2, debt: -2, bank: 5, sales: -1 }, { data_inflation: -4, financing_cost: -2, legal_exposure: -1 }, ["balance-sheet-maintenance", "feedback-loop"], "额度少了，账更硬了。", "关系信用会换人，项目信用要靠可验证现金流。", { scaleScore: 1, blowupRisk: 0.08, relationEffects: { bank_manager: 4 } }),
        choice("ask-old-president", "找旧行长打招呼，把材料先压过去", { cash: 3, bank: 2, government: 1 }, { political_dependency: 5, data_inflation: 3, financing_cost: 3, legal_exposure: 2 }, ["political-embedded-enterprise", "data-inflation"], "钱暂时续上，旧关系也变成新行长的把柄。", "金融关系能续命，但换人后最容易被重新定性。", { scaleScore: 3, blowupRisk: 0.18, relationEffects: { bank_manager: -2, local_official: 2 }, followUps: [{ id: "related-bank-spv-loan", delay: 4 }] }),
        choice("pledge-next-land", "拿下一块地的故事换新增授信", { cash: 6, debt: 6, land_bank: 5, bank: 2, sales: 2 }, { financing_cost: 6, price_bubble: 3, buyer_liability: 2 }, ["land-finance-loop", "leverage-backfire"], "银行重新相信你，也重新绑住你。", "用未来土地讲现金流，本质是把银行风险押到下一轮销售。", { scaleScore: 5, blowupRisk: 0.22, relationEffects: { bank_manager: 3 }, followUps: [{ id: "interest-rollover-friday", delay: 3 }] })
      ],
      0,
      5,
      { stakes: "银行换人会把关系信用折回项目信用，过去能说过去的事，今天要重新证明。" }
    ),
    event(
      "tax-invoice-chain",
      "税务局抽到一串砂石发票",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "high",
      ["EP004", "EP026", "EP126"],
      ["feedback-loop", "legal-exposure", "bid-rigging-chain"],
      "税务系统抽查材料发票，上游砂石公司、运输公司和劳务分包的票据抬头绕了几层。财务说金额不大，问题是链条太像一个圈。",
      [
        actor("税务稽查员", "金额不是唯一问题，真实交易、资金回流和受益人也要看。"),
        actor("财务经理", "补税能压住一部分，但票据链解释不了。"),
        actor("材料商", "当时大家都这么开，现在别只找我。")
      ],
      [
        choice("pay-tax-reconcile", "补税重做台账，先把链条摊开", { cash: -5, bank: 1, government: -1 }, { legal_exposure: -4, data_inflation: -4, boss_safety: 2 }, ["feedback-loop", "balance-sheet-maintenance"], "现金疼，证据链变短。", "补税不是买平安，但把假口径改回真实口径能降低后续刑责。", { scaleScore: -1, blowupRisk: 0.09, relationEffects: { local_official: -1 } }),
        choice("push-to-supplier", "让材料商补票，合同责任推回去", { cash: 2, delivery: -2 }, { legal_exposure: 4, off_balance_debt: 3, boss_safety: -2 }, ["counterparty-retaliation", "risk-transfer-chain"], "你省了现金，也把供应商推成证人。", "把责任压给知道细节的人，会换来反咬、证据包或停供。", { scaleScore: 1, blowupRisk: 0.22, relationEffects: { suppliers: -9 }, followUps: [{ id: "supplier-bill-discount", delay: 3 }] }),
        choice("find-local-mediator", "找熟人协调口径，先别扩大", { cash: -2, government: 2, bank: 1 }, { political_dependency: 5, legal_exposure: 3, data_inflation: 3 }, ["political-embedded-enterprise", "legal-exposure"], "事小了，关系账厚了。", "协调能降温，但不能改变票据和资金的真实路径。", { scaleScore: 2, blowupRisk: 0.2, relationEffects: { local_official: 4 } })
      ],
      0,
      5,
      { stakes: "票据不是后台小事，它能把工程利润、围标、税务和个人责任串到一起。" }
    ),
    event(
      "rainstorm-basement-flood",
      "暴雨夜，地下车库开始进水",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "pressure",
      ["EP102", "EP114", "EP126"],
      ["delivery-first", "risk-transfer-chain"],
      "雨下到后半夜，项目群里传来视频：地下车库积水，排水泵报警，业主开始问是不是偷工减料。",
      [
        actor("项目经理", "先抽水能压住视频，真查管网要停几天。"),
        actor("业主代表", "我们买的是房，不是解释。"),
        actor("工程总", "排水系统不修，以后每场雨都替你复盘。")
      ],
      [
        choice("stop-repair-drainage", "停工排查排水系统，公开维修计划", { cash: -6, delivery: 5, public_trust: 4, sales: -2 }, { delivery_pressure: -5, legal_exposure: -1, boss_safety: 2 }, ["delivery-first", "feedback-loop"], "慢下来，风险被工程处理。", "质量问题越早按技术问题处理，越少变成舆情和法律问题。", { scaleScore: 0, blowupRisk: 0.08, relationEffects: { buyers: 5, contractor: 2 } }),
        choice("pump-overnight-clean", "连夜抽水清场，第二天照常开放", { cash: -2, sales: 2, public_trust: -2 }, { delivery_pressure: 5, data_inflation: 3, buyer_liability: 3 }, ["narrative-control", "risk-transfer-chain"], "现场看起来恢复了，地下问题留下了。", "压住画面不等于修好系统，后面会在开放日、交付和维修基金里回来。", { scaleScore: 2, blowupRisk: 0.18, followUps: [{ id: "homebuyer-open-day", delay: 4 }] }),
        choice("blame-city-pipe", "说是市政管网倒灌，要求政府出面", { government: -3, cash: 1, public_trust: -1 }, { local_isolation: 4, legal_exposure: 2 }, ["government-permit-power", "risk-transfer-chain"], "你把锅推到外面，也把政府拖进你的项目。", "外部原因可能存在，但没有工程证据时，推责会消耗地方缓冲。", { scaleScore: 1, blowupRisk: 0.17, relationEffects: { local_official: -4, buyers: -2 }, followUps: [{ id: "local-task-force-night", delay: 4 }] })
      ],
      0,
      5,
      { stakes: "极端天气会把纸面质量变成现场证据，房企不能只靠口径过雨季。" }
    ),
    event(
      "owner-livestream-site-check",
      "业主开直播：镜头怼到工地围挡",
      ["shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "high",
      ["EP110", "EP114", "EP126"],
      ["feedback-loop", "delivery-first", "narrative-control"],
      "几个业主约好周末直播看工地。镜头不听公关话术，只拍塔吊动不动、材料到不到、工人有多少。",
      [
        actor("客服主管", "删帖很难，直播间都在录屏。"),
        actor("项目经理", "能看的地方不怕看，怕的是现在没法解释。"),
        actor("业主", "我们每个月还房贷，你给我看现场。")
      ],
      [
        choice("open-site-timeline", "开放一段工区，给出复工节点表", { cash: -3, delivery: 4, public_trust: 6, sales: -1 }, { buyer_liability: -4, delivery_pressure: -3, data_inflation: -2 }, ["feedback-loop", "delivery-first"], "不好看，但可信一点。", "面对业主时，时间表和账户说明比公关稿更重要。", { scaleScore: 0, blowupRisk: 0.1, relationEffects: { buyers: 6, local_official: 1 } }),
        choice("block-camera-security", "让保安挡镜头，先别让它扩散", { sales: 1, public_trust: -6, government: -2 }, { legal_exposure: 4, buyer_liability: 5, boss_safety: -2 }, ["narrative-control", "risk-transfer-chain"], "视频少了一段，冲突多了一层。", "围挡能挡镜头，挡不住贷款账单和购房合同。", { scaleScore: 1, blowupRisk: 0.26, relationEffects: { buyers: -9, local_official: -3 }, followUps: [{ id: "homebuyer-lawyer-letter", delay: 3 }] }),
        choice("invite-influencer-tour", "请本地大号参观，讲复工故事", { cash: -3, sales: 3, public_trust: 1 }, { data_inflation: 4, buyer_liability: 2 }, ["narrative-control", "platformized-sales"], "故事好听了，事实链更要跟上。", "第三方背书能短期稳定预期，但现场进度跟不上会反噬得更快。", { scaleScore: 2, blowupRisk: 0.18, relationEffects: { channel: 3 }, followUps: [{ id: "media-real-estate-account", delay: 4 }] })
      ],
      0,
      5,
      { stakes: "社媒让交付风险从合同争议变成公共证据，镜头会逼你解释真实进度。" }
    ),
    event(
      "rival-drone-video",
      "隔壁盘无人机拍到你的空工地",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "pressure",
      ["EP078", "EP110", "EP126"],
      ["competitor-pressure", "narrative-control", "delivery-first"],
      "网上突然流出航拍视频：你的工地吊臂不动，隔壁盘却灯火通明。销售说客户已经拿着视频来退定。",
      [
        actor("销售经理", "他们不说你烂尾，只说让客户自己看。"),
        actor("竞争对手", "市场信息透明一点，对大家都好。"),
        actor("项目总", "工地不动，营销再会讲也没用。")
      ],
      [
        choice("publish-real-progress", "发布真实进度和资金安排", { cash: -2, delivery: 3, public_trust: 4, sales: -1 }, { data_inflation: -3, buyer_liability: -2 }, ["feedback-loop", "delivery-first"], "你承认慢，也给客户可验证抓手。", "被竞争对手递刀时，最稳的反击不是更大声，而是证据更硬。", { scaleScore: 0, blowupRisk: 0.1, relationEffects: { buyers: 4, bank_manager: 1 } }),
        choice("counter-report-rival", "举报对方违规航拍和恶意竞争", { government: 2, sales: 1, cash: -1 }, { local_isolation: 3, data_inflation: 2 }, ["competitor-pressure", "government-permit-power"], "你让对方收敛，也把战场推到监管口。", "找监管能压竞争对手，但如果自己工地问题是真的，监管也会顺手看你。", { scaleScore: 1, blowupRisk: 0.17, relationEffects: { competitors: -6, local_official: 2 }, followUps: [{ id: "planning-stop-work-order", delay: 4 }] }),
        choice("launch-price-cut", "马上降价促销，把客户抢回来", { cash: 4, sales: 5, public_trust: -3 }, { price_bubble: 3, buyer_liability: 4 }, ["inventory-overhang", "platformized-sales"], "售楼处热了，老业主也醒了。", "降价能救短期回款，也会触发老业主、渠道和价格预期的连锁反应。", { scaleScore: 2, blowupRisk: 0.22, relationEffects: { channel: 4, buyers: -4 }, followUps: [{ id: "old-owners-price-cut", delay: 3 }] })
      ],
      0,
      5,
      { stakes: "竞争对手不一定正面打你，最有效的方式是把你的真实弱点放到客户眼前。" }
    ),
    event(
      "steel-cement-price-jump",
      "钢筋水泥三天涨了两轮",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines"],
      "routine",
      ["EP014", "EP114", "EP124"],
      ["low-bid-change-order", "balance-sheet-maintenance"],
      "材料群里一夜刷屏：钢筋、水泥、铝模都涨。总包说原合同扛不住，供应商说不加钱就按旧价排队。",
      [
        actor("总包老板", "低价中标不是让我替你扛周期。"),
        actor("供应商", "现款现货，商票另说。"),
        actor("成本经理", "今天省下来的钱，可能明天变成停工。")
      ],
      [
        choice("lock-material-price", "补一笔现金，锁核心材料价", { cash: -5, delivery: 4, bank: 1 }, { delivery_pressure: -3, off_balance_debt: -1 }, ["balance-sheet-maintenance", "delivery-first"], "利润薄了，工期稳了。", "材料上涨时，现金买到的是确定性，不只是材料。", { scaleScore: 0, blowupRisk: 0.09, relationEffects: { contractor: 4, suppliers: 4 } }),
        choice("issue-commercial-paper", "开商票让供应商继续供货", { cash: 3, delivery: 2, debt: 2 }, { off_balance_debt: 7, financing_cost: 4, legal_exposure: 1 }, ["shadow-banking-loop", "low-bid-change-order"], "工地没停，票据链加厚。", "商票像缓冲垫，也像倒计时；供应商会按贴现价重新判断你。", { scaleScore: 2, blowupRisk: 0.22, relationEffects: { suppliers: 2 }, followUps: [{ id: "supplier-bill-discount", delay: 3 }] }),
        choice("force-original-contract", "按合同价压回去，谁违约谁赔", { cash: 2, delivery: -4 }, { legal_exposure: 4, delivery_pressure: 6, off_balance_debt: 2 }, ["counterparty-retaliation", "low-bid-change-order"], "账上省钱，现场变硬。", "合同能保护价格，但压到极限会换来停供、索赔和证据包。", { scaleScore: 1, blowupRisk: 0.24, relationEffects: { contractor: -7, suppliers: -8 }, followUps: [{ id: "contractor-evidence-package", delay: 4 }] })
      ],
      0,
      4,
      { stakes: "开发商赚的是周期差，但材料周期会先从现金、合同和工期上要钱。" }
    ),
    event(
      "tower-crane-near-miss",
      "塔吊擦过隔壁小学围墙",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "high",
      ["EP102", "EP114", "EP126"],
      ["worker-wage-risk", "delivery-first", "legal-exposure"],
      "下午放学前，塔吊吊臂擦过隔壁小学围墙。没人受伤，但家长群、教育局和住建站同时知道了。",
      [
        actor("安全员", "今天没伤人，是运气，不是制度。"),
        actor("校方", "我们不接受口头保证。"),
        actor("项目经理", "停塔整改会拖进度，不停就没人敢签字。")
      ],
      [
        choice("full-safety-stop", "停塔整改，请第三方验收", { cash: -6, delivery: 4, public_trust: 4, sales: -2 }, { legal_exposure: -5, boss_safety: 3, delivery_pressure: -2 }, ["delivery-first", "feedback-loop"], "工期慢了，责任边界清楚了。", "安全事故边缘不能赌概率，第三方验收是给未来留证据。", { scaleScore: -1, blowupRisk: 0.08, relationEffects: { local_official: 2, buyers: 3 } }),
        choice("night-adjust-continue", "夜里调整设备，白天继续施工", { cash: 1, delivery: 2, public_trust: -2 }, { legal_exposure: 5, boss_safety: -3, delivery_pressure: 3 }, ["narrative-control", "legal-exposure"], "进度保住，签字的人少了。", "把安全问题当进度问题处理，会把企业风险推向个人签字风险。", { scaleScore: 2, blowupRisk: 0.26, relationEffects: { contractor: 2, local_official: -3 }, followUps: [{ id: "tax-and-construction-joint-audit", delay: 4 }] }),
        choice("replace-safety-team", "换安全负责人，公开处罚", { cash: -3, delivery: 1, public_trust: 2 }, { legal_exposure: 1, boss_safety: 1 }, ["risk-transfer-chain", "feedback-loop"], "你给了社会一个交代，也让内部知道有人会被切割。", "换人能止血，但如果制度和工期压力不变，责任还会换个名字回来。", { scaleScore: 0, blowupRisk: 0.16, relationEffects: { contractor: -3, local_official: 1 } })
      ],
      0,
      5,
      { stakes: "安全事故的可怕之处在于，它会把施工、学校、监管和个人签字同时拉到台前。" }
    ),
    event(
      "delivered-wall-crack-repair",
      "已交付小区墙面裂缝又上群了",
      ["shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze", "guaranteed-delivery", "clearance"],
      "pressure",
      ["EP102", "EP114", "EP126"],
      ["delivery-first", "feedback-loop", "risk-transfer-chain"],
      "一个已经交付的小区突然在业主群刷屏：墙面裂缝、地下室渗水、维修没人接。旧项目从归档里回来了。",
      [
        actor("物业经理", "他们不找物业，直接找开发商。"),
        actor("老业主", "你卖新盘的时候怎么承诺的？"),
        actor("工程客服", "保修金不够，施工队也换了。")
      ],
      [
        choice("set-repair-fund", "拿钱设专项维修组，逐户销项", { cash: -5, public_trust: 5, delivery: 3 }, { buyer_liability: -4, legal_exposure: -2, boss_safety: 2 }, ["delivery-first", "feedback-loop"], "旧账花钱，新信用回来一点。", "交付后的维修不是售后小事，它决定老业主会不会成为新项目的风险源。", { scaleScore: 0, blowupRisk: 0.08, relationEffects: { buyers: 5 } }),
        choice("blame-decoration", "说多半是业主装修造成，先鉴定", { cash: 1, public_trust: -4, delivery: -1 }, { buyer_liability: 5, legal_exposure: 3 }, ["risk-transfer-chain", "narrative-control"], "你省了维修款，也把对抗拉长。", "责任鉴定可以做，但如果先定调推责，业主会把证据越攒越硬。", { scaleScore: 1, blowupRisk: 0.2, relationEffects: { buyers: -7 }, followUps: [{ id: "homebuyer-lawyer-letter", delay: 3 }] }),
        choice("ask-contractor-back", "找原总包返修，先扣质保金", { cash: 2, delivery: 2 }, { legal_exposure: 3, delivery_pressure: 2 }, ["counterparty-retaliation", "delivery-first"], "钱暂时不用你出，总包的旧账又翻出来。", "扣质保金是权利，但如果旧签证和欠款没清，总包会用返修重新谈判。", { scaleScore: 1, blowupRisk: 0.18, relationEffects: { contractor: -6, buyers: 2 }, followUps: [{ id: "contractor-evidence-package", delay: 4 }] })
      ],
      0,
      5,
      { stakes: "已交付项目不是消失了，只是进入保修、物业和口碑账本。" }
    ),
    event(
      "county-finance-road-advance",
      "县里让你先垫一段配套路",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines"],
      "pressure",
      ["EP004", "EP031", "EP124"],
      ["land-fiscal-pressure", "political-embedded-enterprise", "government-permit-power"],
      "县里说小区门口那段路今年财政排不开，但路不修，你的交付和下一块地都会不好看。意思很清楚：你先垫。",
      [
        actor("县住建口", "这条路也是你项目价值的一部分。"),
        actor("财务总监", "垫了就是现金流，不垫就是审批和交付风险。"),
        actor("同行", "县里让你垫，说明你已经坐上桌了。")
      ],
      [
        choice("advance-road-money", "先垫路钱，换审批和口碑", { cash: -7, government: 5, delivery: 3, sales: 2 }, { political_dependency: 5, local_isolation: -2 }, ["political-embedded-enterprise", "land-fiscal-pressure"], "路通了，地方账也更深了。", "垫资能换项目价值和地方信用，但也会把企业绑进地方财政缺口。", { scaleScore: 3, blowupRisk: 0.16, relationEffects: { local_official: 5, buyers: 2 } }),
        choice("ask-written-offset", "要求写进会议纪要，抵扣后续费用", { cash: -2, government: -2, bank: 1 }, { political_dependency: -1, legal_exposure: -1 }, ["feedback-loop", "balance-sheet-maintenance"], "地方不爽，但账能解释。", "政商交易最怕口头承诺，能写进文件的支持才有债权价值。", { scaleScore: 1, blowupRisk: 0.1, relationEffects: { local_official: -3, bank_manager: 2 } }),
        choice("refuse-road-delay", "不垫，按合同边界来", { cash: 2, government: -6, delivery: -2, sales: -2 }, { local_isolation: 7, boss_safety: 1 }, ["exit-discipline", "government-permit-power"], "现金保住了，地方入口冷了。", "边界能保现金，但在地方财政压力下，审批、验收和下一块地会重新定价。", { scaleScore: -2, blowupRisk: 0.18, relationEffects: { local_official: -8 }, followUps: [{ id: "local-protection-gap", delay: 3 }] })
      ],
      0,
      4,
      { stakes: "房地产不是只盖楼，地方配套、财政缺口和审批权会一起进入项目现金流。" }
    ),
    event(
      "escrow-bank-weekend-freeze",
      "周五下午，监管户拨付被银行按住",
      ["high-turnover", "three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "high",
      ["EP031", "EP124", "EP126"],
      ["escrow-control", "pre-sale-funds-leak", "balance-sheet-maintenance"],
      "项目本来等着周五拨一笔工程款，银行突然要求补工程节点、监管账户明细和住建确认。总包已经在门口等钱。",
      [
        actor("银行经办", "不是不给，是材料不够让我签不了。"),
        actor("总包老板", "你们内部流程，不能让我工人下周没饭吃。"),
        actor("财务总监", "监管户的钱不是现金池，这是现在最疼的一课。")
      ],
      [
        choice("three-party-reconcile", "银行、住建、总包三方对账后拨付", { cash: -3, delivery: 4, bank: 2, government: 1 }, { presale_misuse: -4, buyer_liability: -3, legal_exposure: -2 }, ["escrow-control", "feedback-loop"], "慢了一天，钱的性质清楚了。", "监管户拨付不是技术流程，而是购房款责任、工程进度和银行签字的交叉点。", { scaleScore: 0, blowupRisk: 0.08, relationEffects: { bank_manager: 3, contractor: 3 } }),
        choice("move-money-around", "先从别的项目调钱垫上", { cash: 3, delivery: 2, bank: -2 }, { presale_misuse: 7, buyer_liability: 5, data_inflation: 3 }, ["pre-sale-funds-leak", "risk-transfer-chain"], "这边工地没停，那边监管户变薄。", "跨项目挪钱最像救急，也最容易把多个购房人群体连成一条责任链。", { scaleScore: 2, blowupRisk: 0.26, relationEffects: { contractor: 2, bank_manager: -4 }, followUps: [{ id: "escrow-gap-screenshot", delay: 3 }] }),
        choice("pressure-branch-sign", "找关系让支行先签，材料后补", { cash: 5, delivery: 2, government: 1 }, { legal_exposure: 6, data_inflation: 5, financing_cost: 2 }, ["political-embedded-enterprise", "legal-exposure"], "钱出来了，签字人也被你带进来了。", "让银行先签字能救现场，但危机后会追问谁明知材料不全还放款。", { scaleScore: 2, blowupRisk: 0.28, relationEffects: { bank_manager: -6, local_official: 2 }, followUps: [{ id: "mortgage-funds-wrong-account", delay: 4 }] })
      ],
      1,
      5,
      { stakes: "监管账户让预售款从自由现金变成交付责任，周五下午最能看出谁在承担签字风险。" }
    ),
    event(
      "channel-rebate-blackmail",
      "渠道经理把返佣表发到你手机",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "pressure",
      ["EP110", "EP125", "EP126"],
      ["platformized-sales", "counterparty-retaliation", "data-inflation"],
      "渠道经理说尾佣拖太久了。他发来一张表：客户电话、假到访、返佣承诺、聊天记录，一样不少。",
      [
        actor("渠道经理", "你不给，我也只能让客户知道自己被怎么带来的。"),
        actor("销售总", "渠道能给热度，也能把热度变成把柄。"),
        actor("财务", "这笔钱没写进明面成本。")
      ],
      [
        choice("pay-core-rebate", "付核心返佣，换客户资料和封口", { cash: -4, sales: 2 }, { data_inflation: 2, legal_exposure: 2 }, ["platformized-sales", "counterparty-retaliation"], "人先安静，灰账还在。", "给钱能压住短期反咬，但也承认了渠道链知道你的真实销售质量。", { scaleScore: 1, blowupRisk: 0.18, relationEffects: { channel: 4 } }),
        choice("audit-channel-list", "审渠道名单，砍虚假到访和水分", { cash: -1, sales: -3, public_trust: 2 }, { data_inflation: -5, price_bubble: -2 }, ["feedback-loop", "platformized-sales"], "销量难看，客户质量清楚。", "去水分会伤增长叙事，但能减少未来销售数据倒查。", { scaleScore: -1, blowupRisk: 0.1, relationEffects: { channel: -5, bank_manager: 1 } }),
        choice("replace-channel", "换渠道公司，让新人接盘", { sales: 3, cash: 1, public_trust: -2 }, { legal_exposure: 4, data_inflation: 4 }, ["risk-transfer-chain", "platformized-sales"], "新渠道进来了，旧渠道也没消失。", "切割合作方最容易触发反咬，因为对方手里只剩证据和怨气。", { scaleScore: 2, blowupRisk: 0.24, relationEffects: { channel: -9 }, followUps: [{ id: "channel-poaching-war", delay: 3 }] })
      ],
      0,
      5,
      { stakes: "渠道不是流量机器，它有记忆、账本和反咬能力。" }
    ),
    event(
      "media-real-estate-account",
      "本地房产号问你要一个说法",
      ["shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "routine",
      ["EP110", "EP125", "EP126"],
      ["narrative-control", "feedback-loop", "platformized-sales"],
      "本地房产号发来提纲：施工进度、降价传闻、监管账户、老业主投诉。他们说今晚发稿，给你一个回应窗口。",
      [
        actor("房产号编辑", "不回应，我们就按业主和渠道说法写。"),
        actor("公关", "买稿能压一篇，压不住所有截图。"),
        actor("销售总", "这篇出来，明天案场就会被问爆。")
      ],
      [
        choice("open-documents", "给节点表、监管户说明和现场照片", { cash: -1, public_trust: 4, bank: 1, sales: -1 }, { data_inflation: -3, buyer_liability: -2 }, ["feedback-loop", "balance-sheet-maintenance"], "文章不漂亮，但问题可核验。", "公开不是表演，必须拿出能被业主、银行和监管同时核对的材料。", { scaleScore: 0, blowupRisk: 0.09, relationEffects: { buyers: 3, bank_manager: 1 } }),
        choice("buy-soft-article", "投一笔广告，换温和标题", { cash: -3, sales: 3, public_trust: -1 }, { data_inflation: 4, price_bubble: 2 }, ["narrative-control", "platformized-sales"], "标题温和了，事实没变。", "舆论投放可以争取时间，但如果现场没有改善，下一次会更贵更难压。", { scaleScore: 2, blowupRisk: 0.16, relationEffects: { channel: 2 } }),
        choice("lawyer-letter-media", "发律师函，要求停止传播", { cash: -2, public_trust: -3, government: -1 }, { legal_exposure: 3, local_isolation: 2 }, ["narrative-control", "legal-exposure"], "对方收敛一点，业主更想知道你怕什么。", "用法律动作处理事实争议，可能把讨论从房子带到证据。", { scaleScore: 0, blowupRisk: 0.2, relationEffects: { buyers: -4 }, followUps: [{ id: "owner-livestream-site-check", delay: 3 }] })
      ],
      0,
      5,
      { stakes: "媒体不是单纯好坏，它会把散落的业主、渠道和工地信息整合成公共叙事。" }
    ),
    event(
      "dust-control-stop-work",
      "扬尘红牌挂到围挡上",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "routine",
      ["EP014", "EP102", "EP124"],
      ["government-permit-power", "delivery-first"],
      "环保和住建联合巡查，围挡外泥浆、裸土和渣土车被拍了个正着。红牌挂上去，售楼处客户也看见了。",
      [
        actor("住建站", "停几天还是停半个月，看你整改材料。"),
        actor("项目经理", "喷淋、覆盖、洗车槽都要钱。"),
        actor("客户", "连工地都管不好，楼能管好吗？")
      ],
      [
        choice("standardize-site", "按标准整改工地，补设备和台账", { cash: -4, delivery: 2, public_trust: 2, government: 1 }, { legal_exposure: -2, local_isolation: -1 }, ["delivery-first", "feedback-loop"], "现场像样了，现金少了。", "工地标准化不是装样子，它会影响验收、客户信任和事故概率。", { scaleScore: 0, blowupRisk: 0.08, relationEffects: { local_official: 2 } }),
        choice("relationship-warning", "找熟人先摘红牌，整改慢慢补", { cash: 1, government: 2, delivery: 1 }, { political_dependency: 4, legal_exposure: 3, data_inflation: 2 }, ["political-embedded-enterprise", "government-permit-power"], "红牌摘得快，账本补得慢。", "关系能缩短处罚时间，但不能替你完成现场治理。", { scaleScore: 2, blowupRisk: 0.18, relationEffects: { local_official: 3 }, followUps: [{ id: "tax-and-construction-joint-audit", delay: 5 }] }),
        choice("push-to-contractor-site", "罚总包现场管理费，让他们整改", { cash: 2, delivery: -1 }, { legal_exposure: 2, delivery_pressure: 3 }, ["counterparty-retaliation", "risk-transfer-chain"], "你把成本推下去，也把总包怨气推上来。", "现场责任可以分包，但停工和舆情最后仍会回到开发商。", { scaleScore: 1, blowupRisk: 0.17, relationEffects: { contractor: -5 }, followUps: [{ id: "contractor-evidence-package", delay: 4 }] })
      ],
      0,
      4,
      { stakes: "监管卡口常常不是大案，而是用小问题卡住项目节奏。" }
    ),
    event(
      "old-demolition-video-resurfaces",
      "旧改清场视频突然被翻出来",
      ["shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze", "guaranteed-delivery"],
      "high",
      ["EP004", "EP110", "EP126"],
      ["gray-governance", "legal-exposure", "narrative-control"],
      "几年前旧改清场的视频被重新剪出来：土方车、拉横幅的人、一个熟悉的村干部。评论区开始问你和当年的清场队是什么关系。",
      [
        actor("土方老板", "那时候谁让谁去的，大家心里都有数。"),
        actor("公关", "这不是普通舆情，它有人名和车牌。"),
        actor("法务", "删视频不是唯一问题，原始证据在哪里更重要。")
      ],
      [
        choice("settle-old-household", "找当事户补偿和解，留下书面闭环", { cash: -5, public_trust: 2, government: -1 }, { gray_risk: -3, legal_exposure: -3, boss_safety: 2 }, ["gray-governance", "feedback-loop"], "钱花在旧账上，风险往回收一点。", "灰色旧账要闭合，不能只靠删帖；补偿、文件和当事人态度都重要。", { scaleScore: -1, blowupRisk: 0.1, relationEffects: { underground: -1, local_official: -1 } }),
        choice("ask-earthwork-delete", "让土方老板找人删视频", { cash: -2, public_trust: -2 }, { gray_risk: 6, legal_exposure: 5, boss_safety: -3 }, ["gray-governance", "protective-umbrella-risk"], "视频可能少了，土方老板更知道你怕什么。", "继续用灰色力量处理灰色旧账，会把对方从工具人变成债权人。", { scaleScore: 1, blowupRisk: 0.28, relationEffects: { underground: 3, buyers: -2 }, followUps: [{ id: "earthwork-boss-blackmail", delay: 3 }] }),
        choice("public-compensation-ledger", "公开旧改补偿台账和第三方复核", { cash: -3, government: -2, public_trust: 4 }, { data_inflation: -3, legal_exposure: -2, gray_risk: -2 }, ["feedback-loop", "legal-exposure"], "地方不一定高兴，但证据更清楚。", "把灰色争议拉回文件和第三方复核，是把刑事化风险往民事和行政边界推。", { scaleScore: 0, blowupRisk: 0.12, relationEffects: { local_official: -3, buyers: 3 } })
      ],
      0,
      5,
      { stakes: "旧改时代留下的人和视频，会在企业变大或市场变坏时重新找回来。" }
    ),
    event(
      "state-owned-rival-bid-support",
      "国企对手拿着白名单方案进场",
      ["high-turnover", "three-red-lines", "sales-freeze", "guaranteed-delivery", "clearance"],
      "pressure",
      ["EP031", "EP078", "EP124"],
      ["state-purchase-floor", "competitor-pressure", "political-embedded-enterprise"],
      "你还在谈展期，国企对手已经带着白名单、代建团队和低息资金来找地方。话说得客气：共同保交付，实质是接你的盘面。",
      [
        actor("国企项目总", "我们不抢，只是地方需要一个更稳的主体。"),
        actor("银行", "谁能交楼，谁的方案就更像方案。"),
        actor("你的人", "他们拿的是稳定牌，我们拿的是老板牌。")
      ],
      [
        choice("invite-jv", "让国企小股进入，换白名单和融资", { cash: 6, bank: 5, government: 4, delivery: 4, land_bank: -4 }, { control_loss: 7, political_dependency: 5, boss_safety: 2 }, ["state-purchase-floor", "political-embedded-enterprise"], "钱和信用来了，控制权少了。", "国资进场能救交付，但它救的是项目，不一定救老板的控制权。", { scaleScore: 1, blowupRisk: 0.12, relationEffects: { state_capital: 8, local_official: 4 } }),
        choice("outbid-state-rival", "自己加码保交付承诺，别让盘被接走", { cash: -5, debt: 4, government: 2, delivery: 2 }, { financing_cost: 5, political_dependency: 4, buyer_liability: 3 }, ["leverage-backfire", "political-embedded-enterprise"], "你保住牌桌，也把承诺写得更重。", "危机里抢回控制权很贵，因为你要同时向地方、银行和业主证明自己还能撑。", { scaleScore: 3, blowupRisk: 0.24, relationEffects: { local_official: 2, bank_manager: -1 }, followUps: [{ id: "white-list-application-review", delay: 3 }] }),
        choice("sell-one-project-to-state", "把最难项目交给国企，保其他盘", { cash: 8, debt: -6, land_bank: -8, delivery: 3, government: 2 }, { exit_preparation: 7, control_loss: 4, local_isolation: -1 }, ["cycle-asset-trader", "state-purchase-floor"], "你丢掉一块难骨头，换回时间。", "主动让渡问题项目可能保住整体，但成交价和处置权不会按你最理想的方式来。", { scaleScore: -3, blowupRisk: 0.1, relationEffects: { state_capital: 6, bank_manager: 3 } })
      ],
      2,
      5,
      { stakes: "国企不是简单救星，也是竞争者、处置者和地方稳定工具。" }
    ),
    event(
      "presale-cash-next-parcel",
      "第一批按揭款刚到，土拍群已经发新地",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines"],
      "pressure",
      ["EP031", "EP101", "EP124"],
      ["land-finance-loop", "leverage-backfire", "cycle-asset-trader"],
      "你这个盘还没交付，但预售回款和银行按揭已经让账面好看起来。自然资源群里推了一块新地，报名期很短，地方也希望你继续举牌。",
      [
        actor("投拓经理", "现在不拿，等第一个盘交完，好地早没了。"),
        actor("财务总监", "这笔回款不是全都自由，监管户和工程款都盯着。"),
        actor("县里窗口", "你第一个盘卖得动，第二块地才有故事。")
      ],
      [
        choice("use-presale-as-deposit", "用可动用回款交保证金", { cash: -6, debt: 5, land_bank: 10, government: 3, bank: 2, sales: 2 }, { buyer_liability: 4, financing_cost: 4, delivery_pressure: 3, price_bubble: 3 }, ["land-finance-loop", "presale-cashflow-trap"], "你把回款变成下一块地，也把交付责任往后压了一层。", "房地产滚动扩张的核心不是等交付，而是用预售回款、按揭和抵押空间提前上下一张桌。", { scaleScore: 7, blowupRisk: 0.2, relationEffects: { local_official: 3, bank_manager: 2 }, followUps: [{ id: "escrow-bank-weekend-freeze", delay: 4 }] }),
        choice("reserve-cash-build-first", "先把钱留给工程进度，地块只跟踪", { cash: 2, delivery: 4, government: -2, sales: -1 }, { delivery_pressure: -3, financing_cost: -1, exit_preparation: 2 }, ["delivery-first", "exit-discipline"], "你慢了一步，但项目更像能交。", "不拿地也是选择：它会降低增长叙事，却提高第一个盘闭合的概率。", { scaleScore: 0, blowupRisk: 0.08, relationEffects: { local_official: -2, bank_manager: 1 } }),
        choice("bring-financial-partner", "拉金融小股东垫保证金，收益分成", { cash: 2, debt: 3, land_bank: 7, bank: 3, government: 1 }, { financing_cost: 5, control_loss: 4, legal_exposure: 2 }, ["related-party-financing", "land-finance-loop"], "你少出现金，也多了分账和控制权问题。", "外部资金能提高拿地速度，但会让项目未来收益、控制权和清偿顺位更复杂。", { scaleScore: 5, blowupRisk: 0.18, relationEffects: { bank_manager: 3, state_capital: 2 } })
      ],
      0,
      5,
      { stakes: "房地产常常不是交完一个再做下一个，而是还没交付就用回款和信用去滚下一块地。" }
    ),
    event(
      "bank-credit-after-presale",
      "银行看了网签表，主动问你要不要加额度",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines"],
      "pressure",
      ["EP031", "EP078", "EP124"],
      ["balance-sheet-maintenance", "land-finance-loop", "leverage-backfire"],
      "支行看到网签、按揭和抵押物估值都在变好，主动给你一个新增授信窗口。钱可以进来，但银行问得很细：是补工程、还短债，还是拿下一块地？",
      [
        actor("授信经理", "卖得动，我们可以谈额度；用途不同，价格也不同。"),
        actor("财务总监", "补工程是慢钱，拿地是快故事。"),
        actor("投拓经理", "银行主动开口的时候，市场窗口不会太差。")
      ],
      [
        choice("borrow-for-next-land", "新增授信用来拿下一块地", { cash: 8, debt: 9, land_bank: 9, bank: 2, sales: 3, government: 2 }, { financing_cost: 5, price_bubble: 4, buyer_liability: 2 }, ["land-finance-loop", "leverage-backfire"], "现金进来了，债和货值一起膨胀。", "银行额度会放大顺周期能力，也会放大下行期债务和交付责任。", { scaleScore: 8, blowupRisk: 0.22, relationEffects: { bank_manager: 4, local_official: 2 }, followUps: [{ id: "interest-rollover-friday", delay: 4 }] }),
        choice("borrow-for-construction", "新增授信只补工程和交付节点", { cash: 4, debt: 4, delivery: 5, bank: 2, sales: 1 }, { delivery_pressure: -4, financing_cost: 2, buyer_liability: -1 }, ["delivery-first", "balance-sheet-maintenance"], "规模没猛涨，但项目更能闭合。", "同样是贷款，用途决定它是扩张燃料还是交付保险。", { scaleScore: 2, blowupRisk: 0.12, relationEffects: { bank_manager: 3, contractor: 3 } }),
        choice("keep-credit-unused", "额度先批下来，不马上提款", { bank: 5, government: -1, sales: -1 }, { financing_cost: -1, exit_preparation: 3 }, ["exit-discipline", "balance-sheet-maintenance"], "你保留弹药，也让增长故事变淡。", "授信不是必须马上花掉；真正稀缺的是能在需要时提款，而不是一拿到钱就扩张。", { scaleScore: 1, blowupRisk: 0.08, relationEffects: { bank_manager: 4, local_official: -1 } })
      ],
      0,
      5,
      { stakes: "上行期银行会把销售和抵押物重新定价，开发商的诱惑是把信用窗口误认为利润。" }
    ),
    event(
      "split-team-next-site",
      "项目还没交，投拓已经要第二支队伍",
      ["early-expansion", "shelter-reform-boom", "high-turnover"],
      "pressure",
      ["EP101", "EP114", "EP126"],
      ["land-finance-loop", "delivery-first", "risk-transfer-chain"],
      "现有项目还在施工，投拓说下一块地必须提前准备：要么扩项目团队，要么把当前项目的一部分人抽走，要么找外部代建。",
      [
        actor("投拓经理", "等第一个盘交了再招人，第二块地就晚了。"),
        actor("工程经理", "把人抽走，当前项目质量和工期都会掉。"),
        actor("代建公司", "我们能接，但控制权和管理费要写清楚。")
      ],
      [
        choice("hire-second-team", "花钱组第二支项目队伍", { cash: -5, land_bank: 6, delivery: 2, government: 2 }, { financing_cost: 2, political_dependency: 2 }, ["land-finance-loop", "delivery-first"], "管理半径变大，现金先变薄。", "扩张不只是拿地，还要有能同时跑多个项目的组织能力。", { scaleScore: 5, blowupRisk: 0.14, relationEffects: { contractor: 2, local_official: 2 } }),
        choice("pull-current-team", "从当前项目抽骨干去看新地", { cash: 1, land_bank: 7, sales: 2, delivery: -5 }, { delivery_pressure: 6, buyer_liability: 3 }, ["risk-transfer-chain", "leverage-backfire"], "新地推进快了，老盘开始松。", "高周转最危险的是把同一套人马当成无限产能。", { scaleScore: 6, blowupRisk: 0.24, relationEffects: { contractor: -3 }, followUps: [{ id: "owner-livestream-site-check", delay: 4 }] }),
        choice("use-asset-light-partner", "让代建伙伴接新地前期，自己保操盘权", { cash: -2, land_bank: 5, bank: 2, delivery: 1 }, { control_loss: 3, political_dependency: 2, financing_cost: 1 }, ["political-embedded-enterprise", "exit-discipline"], "你降低现金压力，也让新项目多了一个主人。", "轻资产能扩半径，但会牺牲一部分控制权和利润。", { scaleScore: 3, blowupRisk: 0.13, relationEffects: { state_capital: 3, bank_manager: 2 } })
      ],
      0,
      4,
      { stakes: "从小老板变开发商，不只看胆量，还看组织能不能同时承受多个项目。" }
    ),
    event(
      "post-delivery-capital-desk",
      "三盘交完，银行反而问你下一块地",
      ["early-expansion", "shelter-reform-boom", "high-turnover", "three-red-lines", "sales-freeze"],
      "pressure",
      ["EP031", "EP078", "EP124", "EP126"],
      ["cycle-asset-trader", "land-finance-loop", "exit-discipline"],
      "工地安静下来，已交付项目归档。账上没有待处理楼盘，银行客户经理却把授信表推回来：你到底是继续滚下一块地、还债空窗、接代建小股，还是趁责任闭合退出？",
      [
        actor("银行客户经理", "项目交了是信用，不是未来现金流。明年的货值在哪里？"),
        actor("县住建口", "你要继续做，就别让售楼处和工地断档；你要退，也要把尾账说清楚。"),
        actor("财务总监", "空账本不是安全，它只是让我们第一次能选择不上桌。")
      ],
      [
        choice("roll-next-land", "再拿一块地，让现金继续转", { cash: -8, debt: 8, land_bank: 12, sales: 4, government: 3, bank: 2 }, { financing_cost: 5, price_bubble: 5, buyer_liability: 2, delivery_pressure: 3 }, ["land-finance-loop", "leverage-backfire"], "牌桌继续转，货值和债务一起回来。", "房地产顺周期赚钱靠滚动，但滚动不是利润本身；下一块地会把自由现金重新锁进土地和工程。", { scaleScore: 8, blowupRisk: 0.18, relationEffects: { local_official: 3, bank_manager: 2 }, followUps: [{ id: "land-auction-bond-borrowed", delay: 3 }] }),
        choice("deleverage-window", "先还债，保一年空窗", { cash: -4, debt: -10, delivery: 3, bank: 4, government: -2, sales: -3 }, { financing_cost: -5, exit_preparation: 8, local_isolation: 3, boss_safety: 3 }, ["exit-discipline", "balance-sheet-maintenance"], "你把风险降下来，也让地方和渠道觉得你不够进取。", "空窗期能救资产负债表，但会牺牲增长故事；真正的纪律是不在干净时又把自己推回高杠杆。", { scaleScore: -4, blowupRisk: 0.08, relationEffects: { bank_manager: 4, local_official: -2 }, followUps: [{ id: "voluntary-exit-window", delay: 3 }] }),
        choice("asset-light-management", "接代建小股，赚管理费不重拿地", { cash: 3, debt: 2, land_bank: 4, delivery: 5, government: 3, bank: 2 }, { political_dependency: 3, financing_cost: 1, buyer_liability: 1 }, ["delivery-first", "political-embedded-enterprise", "exit-discipline"], "现金压力轻一点，控制权也轻一点。", "代建和小股模式能降低资产负担，但你赚的是管理费和关系信用，不再完全控制项目命运。", { scaleScore: 3, blowupRisk: 0.1, relationEffects: { state_capital: 4, local_official: 3, bank_manager: 2 } })
      ],
      0,
      5,
      { stakes: "项目交付不是终点，而是资本重新配置的窗口。继续、收缩、轻资产和退出都不是完美答案。", repeatable: true, repeatCooldown: 5 }
    ),
    event(
      "voluntary-exit-window",
      "你忽然发现：现在收手也许还能睡着",
      ["shelter-reform-boom", "high-turnover", "three-red-lines"],
      "pressure",
      ["EP031", "EP078", "EP126"],
      ["exit-discipline", "cycle-asset-trader", "feedback-loop"],
      "第一个项目没有完全失控，银行还愿意谈，地方也没有把你放进处置名单。财务总监把一张表推过来：卖掉剩余权益、还掉一部分债、退出本县，你可能赚不了最肥的一段，但也许能把自己从后面的牌桌上摘出来。",
      [
        actor("财务总监", "现在卖，叫收缩；出事后卖，就可能叫转移。"),
        actor("老朋友", "你才刚摸到门道，这时候退，不甘心吧？"),
        actor("银行客户经理", "能还债、能交付、能说清资金用途，我们就认。")
      ],
      [
        choice("close-loop-exit", "卖掉剩余权益，还债交楼，退出本县", { cash: 10, debt: -14, land_bank: -12, sales: -5, delivery: 5, bank: 4, government: -2, public_trust: 3 }, { exit_preparation: 24, financing_cost: -6, buyer_liability: -5, delivery_pressure: -5, legal_exposure: -2, boss_safety: 5 }, ["exit-discipline", "cycle-asset-trader"], "你少赚了下一轮上涨，也把债、楼和人先闭合。", "主动退出不是逃跑，前提是项目、债务、购房款和人员责任都能闭合。", { scaleScore: -8, blowupRisk: 0.06, endingCandidate: "clean_exit", relationEffects: { bank_manager: 5, buyers: 4, local_official: -2, state_capital: 2 } }),
        choice("keep-one-project", "只卖一半，留一个项目等下一波", { cash: 5, debt: -6, land_bank: -5, delivery: 2, bank: 2, sales: 1 }, { exit_preparation: 9, price_bubble: 2, financing_cost: -2, buyer_liability: -1 }, ["exit-discipline", "balance-sheet-maintenance"], "你给自己留了退路，也留下继续上桌的念头。", "半退场最考验纪律：卖资产只是第一步，后面不再加杠杆才算真的降风险。", { scaleScore: -1, blowupRisk: 0.1, relationEffects: { bank_manager: 3, local_official: -1 } }),
        choice("stay-and-buy-next", "不退，拿这张干净表去拍下一块地", { cash: -8, debt: 10, land_bank: 13, sales: 5, government: 4, bank: 2 }, { exit_preparation: -8, price_bubble: 8, political_dependency: 4, financing_cost: 5, buyer_liability: 3 }, ["leverage-backfire", "land-finance-loop"], "干净资产表没有让你离场，反而让你更敢借钱。", "房地产最反人性的地方是：越接近安全退出，越容易把安全边际误认为下一轮本金。", { scaleScore: 10, blowupRisk: 0.2, relationEffects: { local_official: 4, bank_manager: 2 }, followUps: [{ id: "land-auction-bond-borrowed", delay: 3 }] })
      ],
      0,
      3,
      { stakes: "退出不是只有跑路和发财两种。真正稀缺的是在还能闭合责任时承认自己不必再上桌。" }
    )
  );

  DATA.events.push(...newEvents);
  DATA.mainLine = [
    "first-land-deposit",
    "county-dinner-guarantee",
    "contractor-payment",
    "soil-report-red-line",
    "planning-ratio-envelope",
    "first-mortgage-bank-visit",
    "agency-exclusive-contract",
    "sample-room-cost-cut",
    "buyer-lottery-room",
    "roof-waterproof-shortcut",
    "fire-acceptance-dinner",
    "fake-showroom-heat",
    "county-media-praise",
    "land-parcel-bundle",
    "cashflow-week",
    "channel-refund-fight",
    "online-rumor-crane-stop",
    "price-control-window",
    "second-city-temptation",
    "shelter-reform-boom",
    "trust-money-arrives",
    "employee-sales-target",
    "material-substitution",
    "workers-injury-night",
    "commercial-paper-maturity",
    "trust-covenant-review",
    "group-loan-guarantee",
    "high-turnover-meeting",
    "new-district-metro-rumor",
    "school-district-promise",
    "design-change-cheap-material",
    "quality-inspection-crack",
    "sales-data-meeting",
    "redline-reporting-night",
    "guarantee-letter-template",
    "local-election-change",
    "homebuyer-open-day",
    "unfinished-neighbor",
    "wealth-product-redemption",
    "old-owners-price-cut",
    "post-delivery-capital-desk",
    "project-sale-window",
    "supplier-blockade",
    "presale-supervision-account",
    "bank-loan-withdrawal",
    "family-office-transfer",
    "court-freeze-account",
    "asset-freeze-order",
    "stoppage-video",
    "mortgage-boycott-letter",
    "homebuyers-mortgage-letter",
    "special-loan-conditions",
    "state-capital-takeover",
    "distressed-project-bargain",
    "final-creditor-meeting",
    "airport-control-window",
    "founder-police-inquiry",
    "liquidation-petition",
    "boss-travel-ban",
    "high-point-exit-window"
  ];
  DATA.interruptEvents = [
    "supplier-blockade",
    "school-district-promise",
    "distressed-project-bargain",
    "offshore-bond-due",
    "diversification-circus",
    "boss-travel-ban",
    "anti-gang-investigation",
    "court-freeze-account",
    "homebuyer-open-day",
    "redline-reporting-night",
    "wealth-product-redemption",
    "project-sale-window",
    "family-office-transfer",
    "asset-freeze-order",
    "homebuyers-mortgage-letter",
    "interest-rollover-friday",
    "escrow-gap-screenshot",
    "supplier-bill-discount",
    "bank-branch-risk-meeting",
    "homebuyer-lawyer-letter",
    "local-task-force-night",
    "discount-sale-stampede",
    "personal-guarantee-call",
    "planning-stop-work-order",
    "tax-and-construction-joint-audit",
    "competitor-anonymous-report",
    "rival-price-raid",
    "land-auction-enclosure",
    "contractor-evidence-package",
    "earthwork-boss-blackmail",
    "protective-umbrella-transfer",
    "public-security-tea",
    "channel-poaching-war",
    "airport-control-window",
    "founder-police-inquiry",
    "liquidation-petition",
    "local-protection-gap",
    "mature-asset-sale-rumor",
    "post-delivery-capital-desk",
    "voluntary-exit-window",
    "office-vacancy-rent-roll",
    "foreign-fund-takeover-review",
    "mortgage-funds-wrong-account",
    "fake-progress-drawdown",
    "bid-companion-companies",
    "low-bid-change-order-night",
    "land-auction-bond-borrowed",
    "private-fund-bridge-weekend",
    "earthwork-subcontract-chain",
    "related-bank-spv-loan",
    "branch-president-rotation",
    "presale-cash-next-parcel",
    "bank-credit-after-presale",
    "split-team-next-site",
    "tax-invoice-chain",
    "rainstorm-basement-flood",
    "owner-livestream-site-check",
    "rival-drone-video",
    "steel-cement-price-jump",
    "tower-crane-near-miss",
    "delivered-wall-crack-repair",
    "county-finance-road-advance",
    "escrow-bank-weekend-freeze",
    "channel-rebate-blackmail",
    "media-real-estate-account",
    "dust-control-stop-work",
    "old-demolition-video-resurfaces",
    "state-owned-rival-bid-support"
  ];
})();
