const DATA = window.REAL_ESTATE_TYCOON_DATA;
const SAVE_KEY = "real-estate-tycoon-county-contractor-v7";

const SEVERITY_RISK = {
  routine: 0.015,
  pressure: 0.04,
  high: 0.08,
  crisis: 0.13
};

const MAX_TURNS = 90;
const MIN_TURNS_FOR_SCALE = [1, 7, 15, 22, 33, 55, 999];
const DEFAULT_PHASE_TURNS = [1, 13, 26, 39, 52, 65, 78];
const DEFAULT_PHASE_DURATION_RANGES = [[11, 15], [11, 15], [11, 15], [11, 15], [11, 14], [10, 14]];
const PROJECT_CRISIS_EVENT_IDS = new Set([
  "stoppage-video",
  "presale-supervision-account",
  "escrow-gap-screenshot",
  "escrow-ledger-audit",
  "homebuyer-lawyer-letter",
  "homebuyers-mortgage-letter",
  "mortgage-boycott-letter",
  "local-task-force-night",
  "white-list-application-review",
  "mortgage-funds-wrong-account",
  "fake-progress-drawdown",
  "supplier-blockade",
  "wage-account-deadline",
  "contractor-evidence-package",
  "planning-stop-work-order",
  "homebuyer-open-day"
]);
const PROJECT_CASH_STAGES = new Set(["presale", "delivery", "delivered"]);
const PROJECT_WORKOUT_EVENT_IDS = new Set([
  "project-sale-window",
  "final-creditor-meeting",
  "white-list-application-review",
  "state-capital-takeover",
  "bank-branch-risk-meeting",
  "local-task-force-night",
  "presale-supervision-account",
  "liquidation-petition"
]);
const SCALE_GRACE_ENDINGS = new Set(["cash_break", "debt_default", "takeover_failed", "delivery_failure", "buyer_blowup"]);
const CYCLE_SCENARIOS = [
  {
    id: "long-boom",
    title: "长上行",
    weight: 16,
    phaseTurns: [1, 16, 31, 46, 61, 75, 89],
    phaseDurationRanges: [[14, 18], [13, 17], [12, 16], [10, 14], [10, 13], [10, 13]],
    pressureAdjust: -0.018,
    priceDriftAdjust: 0.75,
    scaleBonus: 16,
    stateBoost: {
      visible: { cash: 8, sales: 8, bank: 6, government: 3, debt: 3 },
      hidden: { price_bubble: 6, political_dependency: 3, financing_cost: 2 }
    }
  },
  {
    id: "normal-cycle",
    title: "正常周期",
    weight: 45,
    phaseTurns: DEFAULT_PHASE_TURNS,
    phaseDurationRanges: DEFAULT_PHASE_DURATION_RANGES,
    pressureAdjust: 0,
    priceDriftAdjust: 0.2,
    scaleBonus: 4,
    stateBoost: { visible: { cash: 2, sales: 2 }, hidden: {} }
  },
  {
    id: "early-tighten",
    title: "提前收紧",
    weight: 20,
    phaseTurns: [1, 11, 22, 33, 44, 55, 66],
    phaseDurationRanges: [[10, 12], [10, 13], [10, 13], [10, 13], [10, 13], [10, 13]],
    pressureAdjust: 0.024,
    priceDriftAdjust: -0.15,
    scaleBonus: -4,
    stateBoost: { visible: { cash: -2, bank: -3 }, hidden: { financing_cost: 4 } }
  },
  {
    id: "sudden-freeze",
    title: "断崖转冷",
    weight: 11,
    phaseTurns: [1, 11, 21, 31, 41, 51, 61],
    phaseDurationRanges: [[10, 12], [10, 12], [10, 12], [10, 12], [10, 12], [10, 12]],
    pressureAdjust: 0.042,
    priceDriftAdjust: -0.45,
    scaleBonus: -8,
    stateBoost: { visible: { sales: -5, bank: -2 }, hidden: { price_bubble: 4, financing_cost: 3 } }
  },
  {
    id: "policy-rescue",
    title: "早救项目",
    weight: 8,
    phaseTurns: [1, 12, 24, 36, 48, 60, 72],
    phaseDurationRanges: [[11, 14], [11, 14], [11, 14], [11, 14], [10, 13], [10, 13]],
    pressureAdjust: 0.012,
    priceDriftAdjust: 0,
    scaleBonus: 2,
    stateBoost: { visible: { government: 5, delivery: 4, bank: 2 }, hidden: { political_dependency: 5, delivery_pressure: 2 } }
  }
];
const STARTING_CAPITAL_PROFILES = [
  {
    id: "clean-cash",
    title: "现金干净型",
    weight: 18,
    visible: {
      cash: [44, 56],
      debt: [0, 8],
      land_bank: [10, 18],
      sales: [18, 28],
      delivery: [36, 46],
      government: [22, 34],
      bank: [22, 32],
      public_trust: [40, 50]
    },
    hidden: {
      off_balance_debt: [0, 6],
      financing_cost: [4, 10],
      political_dependency: [8, 16],
      buyer_liability: [10, 18],
      gray_risk: [4, 10]
    }
  },
  {
    id: "balanced-start",
    title: "小盘均衡型",
    weight: 44,
    visible: {
      cash: [32, 44],
      debt: [8, 20],
      land_bank: [14, 24],
      sales: [22, 34],
      delivery: [34, 44],
      government: [26, 38],
      bank: [24, 36],
      public_trust: [38, 50]
    },
    hidden: {
      off_balance_debt: [6, 16],
      financing_cost: [8, 16],
      political_dependency: [10, 20],
      buyer_liability: [14, 24],
      gray_risk: [4, 12]
    }
  },
  {
    id: "relationship-credit",
    title: "关系信用型",
    weight: 20,
    visible: {
      cash: [36, 48],
      debt: [12, 24],
      land_bank: [16, 28],
      sales: [24, 36],
      delivery: [32, 42],
      government: [36, 48],
      bank: [28, 40],
      public_trust: [36, 48]
    },
    hidden: {
      off_balance_debt: [10, 22],
      financing_cost: [10, 18],
      political_dependency: [18, 30],
      buyer_liability: [16, 26],
      gray_risk: [8, 18]
    }
  },
  {
    id: "bill-heavy",
    title: "商票滚动型",
    weight: 18,
    visible: {
      cash: [28, 40],
      debt: [18, 32],
      land_bank: [18, 30],
      sales: [24, 38],
      delivery: [30, 40],
      government: [26, 40],
      bank: [22, 34],
      public_trust: [34, 46]
    },
    hidden: {
      off_balance_debt: [18, 32],
      financing_cost: [14, 24],
      political_dependency: [12, 22],
      buyer_liability: [18, 30],
      gray_risk: [6, 16]
    }
  }
];
const OPENING_EVENT_IDS = [
  "first-land-deposit",
  "contractor-payment",
  "county-dinner-guarantee",
  "soil-report-red-line",
  "planning-ratio-envelope",
  "first-mortgage-bank-visit",
  "agency-exclusive-contract",
  "sample-room-cost-cut",
  "buyer-lottery-room",
  "roof-waterproof-shortcut",
  "fire-acceptance-dinner",
  "land-auction-no-bid",
  "wage-account-deadline"
];
const REACTION_EVENT_IDS = new Set([
  "contractor-evidence-package",
  "earthwork-boss-blackmail",
  "public-security-tea",
  "protective-umbrella-transfer",
  "competitor-anonymous-report",
  "rival-price-raid",
  "planning-stop-work-order",
  "tax-and-construction-joint-audit",
  "channel-poaching-war"
]);
const FEEDBACK_LINE_BANK = {
  contractor: {
    speaker: "总包老板",
    relieved: [
      "这回你先保现场，我认这个账。",
      "钱不算痛快，但你没躲，我先把塔吊稳住。",
      "工人那边我去压，但下次别让我没话说。",
      "先把关键节点保住，旧账我们继续谈。",
      "你今天给了口子，我也给现场留点余地。"
    ],
    wary: [
      "老板，我不是不干，我是怕最后账都算到我头上。",
      "签证单我先让资料员整理一下，大家都留个清楚。",
      "你说下月补，我先听着，但现场不能只靠口头话。",
      "我可以再扛几天，但工人和材料商不听故事。",
      "这事别只在会议室说，现场要看到钱。"
    ],
    angry: [
      "你现在说换总包？前面垫的钱谁认？",
      "活是我干的，锅不能全是我的。",
      "你要这么谈，那我也只能按合同走。",
      "我给你抢工期的时候，你可不是这么说的。",
      "你把我逼急了，我就让现场自己说话。"
    ],
    betrayed: [
      "你这是准备把我推出去挡事？",
      "当初怎么催我抢工期的，记录可都在。",
      "你不要我了，那我也得先保自己。",
      "你切得这么干净，那就别怪我把账也算干净。",
      "我们不是没一起扛过事，你现在这样做太难看。"
    ],
    selfProtect: [
      "我让资料员把签证、聊天、付款表都封一份。",
      "明天我先去住建把现场情况说清楚。",
      "工资表、机械租赁、材料欠款，谁问我都照实说。",
      "我不闹，但材料我会准备好。",
      "后面所有话走书面，别再只靠饭桌。"
    ]
  },
  suppliers: {
    speaker: "供应商代表",
    relieved: [
      "你先清关键款，我这边还能压一压。",
      "这次到账后，材料不断。",
      "你没把我们排到最后，我记着。",
      "先保主材，我让仓库继续排货。",
      "钱到一部分，至少大家还愿意谈。"
    ],
    wary: [
      "商票我们收，但折价越来越难看。",
      "材料圈传得很快，你别让大家只认现金。",
      "再滚一次可以，但我得留凭证。",
      "你说项目没问题，可票据价格已经说明问题。",
      "这批货出不出，我要先问老板。"
    ],
    angry: [
      "你不能每次都让供应商垫底。",
      "我们不是银行，没义务给你无限展期。",
      "票再开大也不是钱。",
      "你们售楼处亮着灯，我们这边款一分没到。",
      "别只拿关系压人，材料也是现金买来的。"
    ],
    selfProtect: [
      "我准备把票据折出去，先回一点现金。",
      "后面我只能走诉讼保全。",
      "欠款表我会发给同行，大家自己判断。",
      "你不给明确时间，我就不再供货。",
      "我先把合同和送货单整理好。"
    ]
  },
  bank: {
    speaker: "银行客户经理",
    relieved: [
      "你把账拆开说，至少风控能看懂。",
      "先还一部分，额度还能留着谈。",
      "监管账户和回款路径清楚，材料就好递。",
      "这次你没藏流水，我可以帮你往上报。",
      "项目节点能对上，支行这边还有空间。"
    ],
    wary: [
      "你这个现金流口径，支行风控那边不好过。",
      "销售有数字，但回款和监管账户要分开看。",
      "我能帮你递材料，但不能替你解释流水。",
      "你别只讲资产，系统现在看的是到期现金。",
      "这笔展期要看真实回款，不看口头承诺。"
    ],
    warning: [
      "展期不是我一个人能点头了。",
      "你再把利息并进新贷款，总行会问穿透。",
      "现在不是缺一份说明，是缺能还钱的现金流。",
      "你这笔债再滚，风控会直接亮红。",
      "别再找口头协调了，系统里已经有记录。"
    ],
    selfProtect: [
      "这笔额度我得先降下来，不然责任在我。",
      "后面所有沟通走邮件和正式材料。",
      "你找领导也没用，授信系统里已经亮灯了。",
      "我会把风险意见写清楚。",
      "你得准备个人担保或资产处置方案。"
    ]
  },
  buyers: {
    speaker: "业主代表",
    relieved: [
      "只要现场真动，我们愿意再看一周。",
      "你把节点公开，至少大家知道钱去哪了。",
      "楼栋有进度，比任何说明都有用。",
      "我们不想闹，只想看到交付。",
      "这次开放日如果能看现场，群里会缓一点。"
    ],
    wary: [
      "你们说正常，可业主只能看到停工照片。",
      "销售承诺和现场进度对不上。",
      "我们要的是节点，不是公关稿。",
      "监管账户的钱到底还在不在？",
      "你们每次都说快了，但楼没长出来。"
    ],
    angry: [
      "我们还贷，你们停工，这不可能一直忍。",
      "别把业主当成只会看公告的人。",
      "样板间很漂亮，现场很难看。",
      "再没有进度，我们就找律师。",
      "你们卖的是家，不是一个说法。"
    ],
    selfProtect: [
      "群里已经有人在整理合同和贷款记录。",
      "我们准备联名发函。",
      "下次开放日我们会带第三方来看。",
      "停贷不是威胁，是最后的办法。",
      "现场照片、销售录音、宣传材料我们都留着。"
    ]
  },
  government: {
    speaker: "政府窗口",
    official: [
      "材料先补齐，现场先别扩大。",
      "保交楼是底线，企业自己的资金池先不要讲故事。",
      "这个项目现在不是你们公司内部问题，是稳定问题。",
      "后续都按会议纪要走。",
      "你们企业不要把政府协调理解成政府背书。"
    ],
    warning: [
      "你不要让我们从业主群里知道进度。",
      "预售监管账户的流水，明天上午给专班。",
      "规划变更不是你们内部会议能定的。",
      "谁签字、谁报送、谁审批，链条要清楚。",
      "地方可以协调，但不能替企业背无限责任。"
    ],
    selfProtect: [
      "这件事以后都留痕。",
      "你们先把旧承诺清一遍。",
      "别再拿口头关系解释流程问题。",
      "专班会看楼栋，不看故事。",
      "新班子不会替旧默契背书。"
    ]
  },
  underground: {
    speaker: "土方老板",
    wary: [
      "老板，当年那些事，不是只有你记得。",
      "我不想闹，但你不能让我一个人扛。",
      "你现在说切割，早干嘛去了？",
      "清场的时候你要速度，现在你要干净？",
      "我手里没别的，就一点旧材料。"
    ],
    blackmail: [
      "你给个说法，我就继续闭嘴。",
      "大家都是一条线上的人，别逼我翻旧账。",
      "我不多要，就要个安全。",
      "你不管我，我也只能找别人管我。",
      "有些录音放出去，对谁都不好看。"
    ],
    selfProtect: [
      "我先把当年的转账和现场人名单留好。",
      "如果有人问，我只能照实说。",
      "你要切割，我就先保自己。",
      "旧关系不在了，我得找新靠山。",
      "我不想进去，你也别让我进去。"
    ]
  },
  competitors: {
    speaker: "竞品老板",
    market: [
      "你现金紧，客户自然会来问我们。",
      "价格战不是我先开的，是市场给的机会。",
      "你项目有漏洞，举报信只是把漏洞照亮。",
      "渠道只认佣金和成交，不认情怀。",
      "你拿地太急，我们就从条件上卡你。"
    ],
    warning: [
      "你那边一停工，我们这边就加推。",
      "客户信心掉了，不会只掉你一家的。",
      "你别怪同行，先看看自己的监管账户。",
      "这块地不是只有你能讲故事。",
      "市场冷的时候，谁现金干净谁说话大声。"
    ]
  },
  channel: {
    speaker: "渠道经理",
    relieved: [
      "佣金清一点，带看马上回来。",
      "你给真实折扣，我就敢推。",
      "客户要的是确定性，不是口号。",
      "案场别空着，我能先补人。",
      "你别拖佣金，渠道就不拖客户。"
    ],
    wary: [
      "价格不动，只加佣金，客户会问为什么。",
      "退佣纠纷再多，没人愿意主推。",
      "你们回款慢，渠道也会先保自己。",
      "我能带人，但成交质量你自己看。",
      "竞品那边给得更快。"
    ],
    angry: [
      "你不能让渠道替你背销售承诺。",
      "佣金拖成这样，谁还敢带客？",
      "客户退房，锅不能全是渠道的。",
      "你们案场说法一天一变。",
      "再这样，我的人就去隔壁盘了。"
    ]
  },
  projectManager: {
    speaker: "项目总",
    wary: [
      "老板，节点我能压，但现场不是 PPT。",
      "你要我签这个进度，我得先看真实工程量。",
      "抢工期可以，质量和安全谁背？",
      "你让我先报好看一点，我只能说风险在现场。",
      "工程口径不能每天跟着融资口径改。"
    ],
    betrayed: [
      "现在说是我理解偏差？会议上怎么定的，你心里清楚。",
      "我可以背执行责任，但不能背老板决策。",
      "当初催我抢节点的时候，没有人说要我一个人扛。",
      "你把责任推到项目部，我就只能把流程拿出来。",
      "我不是不讲情面，是你先把我放到火线上。"
    ],
    selfProtect: [
      "我把会议纪要、审批流和现场照片都归档了。",
      "以后所有工程变更都走书面。",
      "质量、安全、进度三张表我会分开报。",
      "如果专班问，我只能按真实节点说。",
      "项目部不再替集团资金池解释。"
    ]
  },
  financeDirector: {
    speaker: "财务总监",
    relieved: [
      "你愿意卖资产还债，账终于能往回收一点。",
      "这笔钱如果进偿债和工程账户，审计口径会好很多。",
      "先把监管账户补上，后面解释成本会低一点。",
      "你这次没有把所有钱都混在一起，我能做账。",
      "现金流表难看，但至少是真表。"
    ],
    warning: [
      "老板，这不是缺一笔钱，是所有到期日撞在一起。",
      "银行贷款、预售款、商票不能再混用了。",
      "你再让我把利息滚进去，后面就是借新还旧。",
      "这张表给银行看和给专班看，口径不能再不一样。",
      "账面资产很多，但下周能动的钱不多。"
    ],
    selfProtect: [
      "这笔调拨我需要你签字。",
      "后面我只按审批流付款。",
      "监管账户的钱我不会再口头划走。",
      "如果审计问，我会按凭证解释。",
      "财务不能替战略乐观买单。"
    ]
  },
  housingBureau: {
    speaker: "住建窗口",
    official: [
      "预售、监管账户、交付节点，三件事分开报。",
      "保交楼是底线，不是企业谈判筹码。",
      "你们先把楼栋进度和资金流水对应起来。",
      "材料补齐前，不要扩大销售口径。",
      "项目问题已经不是售楼处能解释的了。"
    ],
    warning: [
      "监管账户流水明天上午给专班。",
      "你不要让我们从业主群里知道停工。",
      "预售款去了哪里，要能对应到楼栋。",
      "你们再用集团资金池解释，专班会直接盯账户。",
      "承诺交付日不是广告语，是监管表。"
    ],
    selfProtect: [
      "后续所有协调都写进会议纪要。",
      "谁报送、谁审核、谁签字，链条要清楚。",
      "政府协调不等于替企业背书。",
      "你们企业先把自查表交上来。",
      "我们只看现场进度和资金闭环。"
    ]
  },
  planningBureau: {
    speaker: "规划执法",
    official: [
      "规划条件不是项目公司内部会能改的。",
      "先停扩大施工，材料补齐再说。",
      "容积率、红线、设计变更都要重新核。",
      "你们不要把营销口径写成规划事实。",
      "现场和报批图纸对不上，就先别谈交付。"
    ],
    warning: [
      "这张图谁改的，什么时候改的，要说清楚。",
      "你找关系压下来，后面倒查更麻烦。",
      "规划口不替销售承诺背书。",
      "违规不是罚点钱就完事，可能影响验收。",
      "今天不停，明天就可能贴停工单。"
    ],
    selfProtect: [
      "我们会把现场照片和报批图纸一起留档。",
      "后续按执法流程走，不再口头协调。",
      "设计院、报批顾问、项目公司都要说明。",
      "你们内部责任先别急着往外推。",
      "材料不闭合，谁打招呼都不好用。"
    ]
  },
  taxBureau: {
    speaker: "税务稽查",
    official: [
      "发票、合同、资金流先对应起来。",
      "土地增值税口径不要和销售口径混着报。",
      "关联交易要说明定价依据。",
      "补税不是最麻烦的，口径不一致才麻烦。",
      "你们先把项目公司和集团往来拆开。"
    ],
    warning: [
      "同一笔钱在三张表里三个名字，这个解释不了。",
      "商票、咨询费、土方款都要穿透。",
      "不要等联合检查时再改口径。",
      "现金流和发票流对不上，就会继续往下查。",
      "你们说临时错配，要拿凭证证明。"
    ],
    selfProtect: [
      "后续我们按资料清单取数。",
      "你们补材料可以，但不能补故事。",
      "谁经办、谁审批、谁付款，链条要留清楚。",
      "不要把历史问题全推给财务人员。",
      "这件事会和住建、市场监管互相比对。"
    ]
  },
  publicSecurity: {
    speaker: "公安经办",
    official: [
      "我们先了解情况，你把事实链说清楚。",
      "土方、清场、催收，分别是谁联系的？",
      "商业纠纷和治安问题要分清。",
      "你不用讲项目故事，讲人、钱、授权。",
      "谁在现场，谁收钱，谁安排，按时间说。"
    ],
    warning: [
      "不要把所有事都说成下面人个人行为。",
      "你现在越绕，后面越像串供。",
      "保护伞不是你能随便拿来压事的。",
      "有些聊天记录我们已经看到了。",
      "你最好想清楚，哪些是商业安排，哪些越界了。"
    ],
    selfProtect: [
      "后续按笔录来，不按饭桌说法。",
      "你提供的材料会和对方证言核对。",
      "不要再让中间人来传话。",
      "旧项目如果牵出来，就不是一个工地的问题。",
      "你能交代清楚的，越早越好。"
    ]
  },
  stateCapital: {
    speaker: "城投/国资代表",
    official: [
      "我们看项目，不看老板故事。",
      "好资产、坏资产、债务责任要切开。",
      "接盘可以谈，控制权也要谈。",
      "保交楼优先，股东收益往后排。",
      "你们先把可交付楼栋和债务包拆出来。"
    ],
    warning: [
      "你想让我们救全部，那不现实。",
      "国资不会接一个说不清资金去向的盘。",
      "你保控制权，我们就没法保项目。",
      "地方要稳定，不一定要保原老板。",
      "你再拖，债权人会先把好资产抢走。"
    ],
    selfProtect: [
      "我们只按评估报告和专班意见走。",
      "债务黑洞不能装进接盘协议。",
      "你们旧股东要先让出一部分权利。",
      "后面所有资金进封闭账户。",
      "这不是并购，是风险处置。"
    ]
  },
  trustCreditor: {
    speaker: "信托债权人",
    warning: [
      "我们要看底层项目，不看集团口径。",
      "这笔钱到底进了哪个项目？",
      "展期可以谈，但增信在哪里？",
      "你不能一边卖房，一边说没有现金。",
      "如果再拖，我们就启动处置条款。"
    ],
    angry: [
      "你拿新资金覆盖旧流水，这不叫解决。",
      "理财客户已经在问兑付。",
      "你们每次承诺都往后推一周。",
      "抵押物价值下来了，展期条件也会变。",
      "我们不是最后一个接盘的人。"
    ],
    selfProtect: [
      "我们会要求追加担保。",
      "项目公司账户要纳入监控。",
      "后面沟通全部走债委会。",
      "资产处置窗口不能再等。",
      "如果现金流不闭合，我们就先保全。"
    ]
  },
  courtLawyer: {
    speaker: "律师/法院线",
    warning: [
      "你现在不是输赢问题，是证据链问题。",
      "反诉能拖时间，也会把材料全摊开。",
      "保全一旦启动，账户会先冻住再解释。",
      "合同、签证、付款记录要提前核。",
      "不要把商业谈判拖成司法风险。"
    ],
    selfProtect: [
      "我建议所有口头承诺停止。",
      "后续往来都留书面。",
      "资产转让要有真实价格和商业理由。",
      "如果要卖资产，先考虑债权人知情。",
      "别等冻结令到了才找证据。"
    ]
  },
  media: {
    speaker: "本地媒体",
    market: [
      "业主群的照片已经有人发来了。",
      "你们要回应，就别只发一句正常施工。",
      "现场塔吊停没停，我们会去看。",
      "老业主降价维权这条线很容易发酵。",
      "如果资金链没问题，最好拿出可验证节点。"
    ],
    warning: [
      "你们越不说，标题越难看。",
      "这不是删帖能解决的事。",
      "业主、总包、销售三边说法对不上。",
      "如果监管账户有问题，舆情会更快。",
      "别把媒体当广告位。"
    ]
  },
  workers: {
    speaker: "班组长",
    wary: [
      "老板，我们不是来听融资故事的。",
      "工资再拖，工人就不进场了。",
      "总包压我们，我们只能来找你。",
      "塔吊转不转，大家明天就看得到。",
      "你说有钱，工资表上看不出来。"
    ],
    angry: [
      "售楼处灯亮着，工人工资没着落。",
      "再拖，我们就去门口等。",
      "活干了，钱不能一直挂账。",
      "你们老板开会，我们家里等米下锅。",
      "谁让我们抢工期，谁就得给钱。"
    ],
    selfProtect: [
      "工资表我们都签了，欠多少很清楚。",
      "明天劳动监察来，我们照实说。",
      "照片和考勤都在手机里。",
      "不发钱，我们就停。",
      "别再让包工头夹在中间。"
    ]
  },
  demolitionHousehold: {
    speaker: "拆迁户代表",
    wary: [
      "你们说补偿合理，可我们看到的是催搬。",
      "街道说协调，土方的人也来，这算什么协调？",
      "我们不反对建设，但不能被吓走。",
      "协议没谈完，机器先到了。",
      "你们开发商的话和中间人的话不一样。"
    ],
    angry: [
      "别拿项目进度压我们。",
      "谁半夜来敲门，我们都记得。",
      "你们要清场，我们就去信访。",
      "这不是钱多少，是你们不把人当人。",
      "我家的窗户还亮着，不是图纸上的空地。"
    ],
    selfProtect: [
      "录音、照片、车牌我们都留着。",
      "后面只跟街道和律师谈。",
      "你们的人再来，我们直接报警。",
      "协议不清楚，我们不会签。",
      "谁承诺过什么，我们会写下来。"
    ]
  },
  designInstitute: {
    speaker: "设计院/报批顾问",
    wary: [
      "图纸怎么改的，你们项目部最清楚。",
      "我们按你们确认的条件走，不背销售承诺。",
      "报批材料不是万能遮羞布。",
      "你们要抢节点，不能最后说是设计问题。",
      "技术口径和营销口径不要混。"
    ],
    angry: [
      "现在把责任推给设计院，不合适吧？",
      "当初谁要求先出图、后补材料？",
      "你们签过确认单的。",
      "规划口问起来，我们只能按事实说。",
      "别拿顾问当挡箭牌。"
    ],
    selfProtect: [
      "我把往来邮件和确认单都整理出来。",
      "后面变更必须重新签字。",
      "我们会给规划口按技术事实说明。",
      "口头催图不再算指令。",
      "项目公司要先把授权链补齐。"
    ]
  },
  auditor: {
    speaker: "审计/评级",
    warning: [
      "认购、签约、回款、交付不能写成一个数。",
      "这笔收入确认条件不够。",
      "表外债务如果不披露，后面会更难看。",
      "估值可以讨论，现金流不能想象。",
      "你们的销售排名不等于偿债能力。"
    ],
    selfProtect: [
      "我们会出保留意见。",
      "底稿里要写清楚管理层解释。",
      "如果无法穿透，就不能按你们口径确认。",
      "评级会下调展望。",
      "后面资本市场问起来，我们只认材料。"
    ]
  }
};

const CONTACT_ROSTER_BY_SCALE = {
  contractor: {
    tiers: [
      { speaker: "总包老耿", role: "本地总包", temper: "讲义气，最怕被推出去挡雷" },
      { speaker: "县城总包老耿", role: "县城项目总包", temper: "能压工人，也会把签证单留齐" },
      { speaker: "市政总包罗总", role: "城市总包负责人", temper: "合同意识更强，不吃纯饭局" },
      { speaker: "区域工程公司袁总", role: "跨城总包", temper: "看回款计划，不看单项目情面" },
      { speaker: "央企总包项目总", role: "全国项目承包方", temper: "讲流程、讲纪要、讲责任边界" },
      { speaker: "总包债权小组", role: "停工处置方", temper: "先保工资和证据，再谈继续施工" }
    ],
    distress: { speaker: "总包债权小组", role: "停工处置方", temper: "工资、签证、保全一起上桌" }
  },
  suppliers: {
    tiers: [
      { speaker: "材料商钱老板", role: "本地供应商", temper: "认人，也认到账短信" },
      { speaker: "县城材料商钱老板", role: "县城供应商代表", temper: "怕票据折价，消息传得快" },
      { speaker: "城市供应链负责人", role: "城市材料渠道", temper: "看商票价格和同行风声" },
      { speaker: "区域供应链平台", role: "跨城供应商", temper: "按账期和授信额度行动" },
      { speaker: "战略供应商法务", role: "全国供应商", temper: "先保全，再谈折扣" },
      { speaker: "供应商债权联盟", role: "集中追偿方", temper: "小账串起来就成了大案卷" }
    ],
    distress: { speaker: "供应商债权联盟", role: "集中追偿方", temper: "不再单独谈，开始一起要账" }
  },
  bank: {
    tiers: [
      { speaker: "县支行林经理", role: "客户经理", temper: "能帮你递材料，但怕自己背锅" },
      { speaker: "县支行林经理", role: "支行客户经理", temper: "认熟人，风控亮灯后会先自保" },
      { speaker: "市分行何主任", role: "授信部主任", temper: "看监管账户、抵押物和系统指标" },
      { speaker: "省分行唐处", role: "评审处", temper: "看区域敞口，不信跨城互相遮账" },
      { speaker: "总行名单制小组", role: "地产风险名单", temper: "个人关系退后，名单和敞口上前" },
      { speaker: "债委会牵头行周组长", role: "债委会牵头行", temper: "关心谁先退出、谁先保全、谁追加担保" }
    ],
    distress: { speaker: "债委会牵头行周组长", role: "债委会牵头行", temper: "现在不是续贷，是所有债权人同步行动" }
  },
  buyers: {
    tiers: [
      { speaker: "一期业主王老师", role: "本地业主代表", temper: "要看现场，不想先闹" },
      { speaker: "县城业主代表王老师", role: "业主代表", temper: "认交付节点，也认销售承诺录音" },
      { speaker: "城市业主群管理员", role: "城市业主代表", temper: "组织性更强，会找律师和媒体" },
      { speaker: "跨城业主联络人", role: "区域业主代表", temper: "会把多个城市的停工线索串起来" },
      { speaker: "全国项目业主代表", role: "跨项目维权代表", temper: "看集团口径，不再只看单盘解释" },
      { speaker: "保交楼业主代表", role: "处置期业主代表", temper: "不关心老板，关心楼能不能交" }
    ],
    distress: { speaker: "保交楼业主代表", role: "处置期业主代表", temper: "先要交付，再谈损失" }
  },
  government: {
    tiers: [
      { speaker: "县住建老周", role: "县住建窗口", temper: "讲材料，也讲本地面子" },
      { speaker: "县政府项目专班", role: "县级专班", temper: "样板和稳定一起看" },
      { speaker: "市住建专班", role: "市级专班", temper: "看账户、舆情、预售和现场节点" },
      { speaker: "省厅协调组", role: "省级协调", temper: "看跨市传染和金融风险" },
      { speaker: "重点房企风险组", role: "省级风险名单", temper: "先稳项目，再切责任" },
      { speaker: "保交楼督导组", role: "处置督导", temper: "救项目，不替老板背书" }
    ],
    distress: { speaker: "保交楼督导组", role: "处置督导", temper: "资金封闭运行，老板空间变小" }
  },
  housingBureau: {
    tiers: [
      { speaker: "县住建老周", role: "预售窗口", temper: "先看材料，再看现场" },
      { speaker: "县住建分管领导", role: "县住建", temper: "怕业主群先爆" },
      { speaker: "市住建专班联络员", role: "市住建专班", temper: "监管账户和楼栋节点必须对上" },
      { speaker: "省住建协调处", role: "省住建", temper: "看保交楼名单和跨市风险" },
      { speaker: "重点项目督导组", role: "重点房企督导", temper: "项目优先，股东靠后" },
      { speaker: "保交楼现场组", role: "处置现场组", temper: "只认楼栋、账户和施工人数" }
    ],
    distress: { speaker: "保交楼现场组", role: "处置现场组", temper: "不听故事，只查账户和楼栋" }
  },
  planningBureau: {
    tiers: [
      { speaker: "自然资源窗口陈科", role: "县规划窗口", temper: "不喜欢口头改图纸" },
      { speaker: "县规划执法陈科", role: "规划执法", temper: "谁压流程，他就留谁的痕" },
      { speaker: "市规自局审查科", role: "市级规划审查", temper: "图纸、红线、容积率要闭合" },
      { speaker: "省厅用地审查组", role: "省级用地审查", temper: "看批文链条，不看销售承诺" },
      { speaker: "跨区规划督察组", role: "规划督察", temper: "违规会影响验收和融资" },
      { speaker: "处置期规划核验组", role: "规划核验", temper: "先锁事实，再谈整改" }
    ]
  },
  taxBureau: {
    tiers: [
      { speaker: "县税务刘组长", role: "县税务稽查", temper: "先看发票和资金流" },
      { speaker: "县税务刘组长", role: "税务稽查", temper: "补税可以谈，口径乱不行" },
      { speaker: "市税务联合检查组", role: "联合检查", temper: "会和住建、银行互相比对" },
      { speaker: "省税务风险专班", role: "省级税务风险", temper: "看关联交易和集团资金池" },
      { speaker: "重点税源稽核组", role: "重点房企税务", temper: "土增、增值税、关联交易一起看" },
      { speaker: "清算稽核组", role: "处置清算", temper: "补税和资产处置一起算" }
    ]
  },
  publicSecurity: {
    tiers: [
      { speaker: "派出所经办民警", role: "治安经办", temper: "先分清纠纷和越界" },
      { speaker: "县公安经办", role: "县公安", temper: "问人、钱、授权，不听项目故事" },
      { speaker: "市局经侦联络员", role: "市局经侦", temper: "看资金去向和证据链" },
      { speaker: "扫黑线索核查组", role: "线索核查", temper: "旧土方账会被重新串起来" },
      { speaker: "专案外围核查组", role: "专案外围", temper: "保护伞和资金链会互相印证" },
      { speaker: "专案组问询人", role: "处置问询", temper: "越晚解释，越像串供" }
    ],
    distress: { speaker: "专案组问询人", role: "处置问询", temper: "只按笔录、证据和授权链说话" }
  },
  competitors: {
    tiers: [
      { speaker: "本地同行杜总", role: "本地竞品", temper: "打法直接，抢地抢渠道" },
      { speaker: "市里下沉房企杜总", role: "市级竞品", temper: "用品牌和价格压你" },
      { speaker: "城市头部房企投拓部", role: "城市竞品", temper: "举报、价格战、渠道战一起打" },
      { speaker: "区域巨头投资部", role: "区域竞品", temper: "抢资产包，也抢地方信任" },
      { speaker: "全国房企资产团队", role: "全国竞品", temper: "等你现金紧时挑资产" },
      { speaker: "处置资产猎手", role: "困境资产买方", temper: "不打广告，只等折价" }
    ]
  },
  channel: {
    tiers: [
      { speaker: "渠道小马", role: "本地渠道", temper: "佣金到账就推，风声不好就跑" },
      { speaker: "县城渠道小马", role: "县城渠道", temper: "熟客多，消息也散得快" },
      { speaker: "城市渠道总监", role: "城市渠道平台", temper: "看佣金、折扣和退房率" },
      { speaker: "区域渠道平台主管", role: "区域渠道", temper: "把多个城市热度一起比较" },
      { speaker: "全国分销平台负责人", role: "全国渠道", temper: "流量给谁，取决于风险和佣金" },
      { speaker: "尾盘渠道清收队", role: "处置渠道", temper: "只认折扣和佣金，不认品牌" }
    ]
  },
  underground: {
    tiers: [
      { speaker: "土方阿彪", role: "本地土方", temper: "早期像捷径，后期像旧账" },
      { speaker: "土方阿彪", role: "县城土方老板", temper: "讲江湖话，也留录音" },
      { speaker: "市里土方中间人", role: "城市土方圈", temper: "要价更高，牵线更多" },
      { speaker: "外围清收中介", role: "灰色清收", temper: "帮你办事，也拿你当护身符" },
      { speaker: "旧关系中间人", role: "保护伞外围", temper: "谁要切割，他就找谁自保" },
      { speaker: "旧账证人", role: "倒查线索人", temper: "不再要钱，只求自己别进去" }
    ],
    distress: { speaker: "旧账证人", role: "倒查线索人", temper: "当年的捷径，现在变成笔录" }
  },
  stateCapital: {
    tiers: [
      { speaker: "县城投赵总", role: "县城投", temper: "能帮你接一点公共责任，也要控制权" },
      { speaker: "县城投赵总", role: "县属平台", temper: "救项目要有边界" },
      { speaker: "市城投副总", role: "市属平台", temper: "挑楼栋、挑资产、挑责任" },
      { speaker: "省属平台资本部", role: "省属平台", temper: "只接能封闭运行的项目" },
      { speaker: "国资接盘小组", role: "接盘谈判方", temper: "项目优先，原股东靠后" },
      { speaker: "资产管理公司工作组", role: "处置买方", temper: "按折价和控制权谈" }
    ],
    distress: { speaker: "资产管理公司工作组", role: "处置买方", temper: "接盘不是救老板，是买风险折扣" }
  },
  financeDirector: {
    tiers: [
      { speaker: "财务许姐", role: "项目财务", temper: "知道每笔钱去了哪里" },
      { speaker: "财务许姐", role: "项目公司财务", temper: "怕口头调账，开始要签字" },
      { speaker: "城市公司财务总", role: "城市财务", temper: "怕项目池互相遮账" },
      { speaker: "区域财务总监", role: "区域财务", temper: "现金池一乱，所有城市都传染" },
      { speaker: "集团 CFO", role: "集团财务", temper: "看债务期限和资本市场口径" },
      { speaker: "清算财务组", role: "处置财务", temper: "只按凭证和封闭账户付款" }
    ]
  },
  projectManager: {
    tiers: [
      { speaker: "项目总老赵", role: "本地项目总", temper: "知道现场真进度" },
      { speaker: "项目总老赵", role: "县城项目总", temper: "能压工期，也会留现场照片" },
      { speaker: "城市项目总赵工", role: "城市项目总", temper: "质量、安全、进度分开算" },
      { speaker: "区域工程负责人", role: "区域工程", temper: "跨城资源调度有极限" },
      { speaker: "集团工程副总", role: "集团工程", temper: "不会替销售口径背工程责任" },
      { speaker: "保交楼现场负责人", role: "处置现场", temper: "按楼栋交付，不按集团故事" }
    ]
  },
  media: {
    tiers: [
      { speaker: "县融媒记者", role: "本地媒体", temper: "先看街坊和工地照片" },
      { speaker: "本地媒体编辑", role: "县城媒体", temper: "项目停不停，一问就知道" },
      { speaker: "城市财经记者", role: "城市媒体", temper: "会把业主、银行、工地三边说法放一起" },
      { speaker: "区域地产号主编", role: "区域媒体", temper: "跨城坏消息传播更快" },
      { speaker: "财经媒体编辑", role: "全国媒体", temper: "看债券、评级、停工和老板动向" },
      { speaker: "处置报道记者", role: "危机媒体", temper: "标题只问能不能交楼" }
    ]
  }
};

const CONTACT_DESK_GROUPS = ["bank", "government", "contractor", "competitors"];

const COMPETITION_PROFILES = [
  {
    title: "县城熟人战",
    opponent: "本地小开发商 / 土方圈 / 县城投",
    tactics: ["熟人卡口", "本地渠道", "手续举报", "土方搅局"],
    intensity: 10,
    events: ["competitor-anonymous-report", "land-auction-enclosure", "channel-poaching-war", "earthwork-boss-blackmail"]
  },
  {
    title: "县城品牌下沉战",
    opponent: "市里下沉房企 / 县属平台 / 头部渠道",
    tactics: ["样板间对比", "价格压制", "渠道佣金", "城投联合体"],
    intensity: 16,
    events: ["rival-price-raid", "channel-poaching-war", "competitor-anonymous-report", "land-auction-enclosure"]
  },
  {
    title: "城市系统战",
    opponent: "城市头部房企 / 市属国企 / 渠道平台",
    tactics: ["预售证举报", "渠道佣金战", "规划围堵", "市属国企进场"],
    intensity: 24,
    events: ["competitor-anonymous-report", "rival-price-raid", "planning-stop-work-order", "channel-poaching-war", "state-capital-takeover"]
  },
  {
    title: "区域围堵战",
    opponent: "区域巨头 / 省属平台 / 信托资本",
    tactics: ["跨城放大坏消息", "评级风声", "白名单竞争", "省属平台压价"],
    intensity: 32,
    events: ["competitor-anonymous-report", "rival-price-raid", "redline-reporting-night", "state-capital-takeover", "project-sale-window"]
  },
  {
    title: "全国信用战",
    opponent: "全国房企 / 央国企平台 / 债权人联盟",
    tactics: ["总行名单制", "资产包争夺", "债委会话语权", "央国企逆周期拿地"],
    intensity: 42,
    events: ["redline-reporting-night", "state-capital-takeover", "project-sale-window", "liquidation-petition", "foreign-fund-takeover-review"]
  },
  {
    title: "困境资产处置战",
    opponent: "国资接盘组 / AMC / 债委会 / 法院保全申请人",
    tactics: ["折价收购", "只挑好资产", "账户保全", "控制权谈判"],
    intensity: 50,
    events: ["state-capital-takeover", "project-sale-window", "liquidation-petition", "court-freeze-account", "asset-freeze-order"]
  }
];

const elements = {
  continueBtn: document.querySelector("#continueBtn"),
  newGameBtn: document.querySelector("#newGameBtn"),
  resetBtn: document.querySelector("#resetBtn"),
  startBtn: document.querySelector("#startBtn"),
  againBtn: document.querySelector("#againBtn"),
  scaleContinueBtn: document.querySelector("#scaleContinueBtn"),
  startScreen: document.querySelector("#startScreen"),
  eventScreen: document.querySelector("#eventScreen"),
  scaleScreen: document.querySelector("#scaleScreen"),
  debriefScreen: document.querySelector("#debriefScreen"),
  turnLabel: document.querySelector("#turnLabel"),
  careerNotice: document.querySelector("#careerNotice"),
  statusSummary: document.querySelector("#statusSummary"),
  projectBrief: document.querySelector("#projectBrief"),
  visibleStats: document.querySelector("#visibleStats"),
  hiddenStatsMini: document.querySelector("#hiddenStatsMini"),
  finalVisibleStats: document.querySelector("#finalVisibleStats"),
  finalHiddenStats: document.querySelector("#finalHiddenStats"),
  bossLabel: document.querySelector("#bossLabel"),
  styleLabel: document.querySelector("#styleLabel"),
  scaleLabel: document.querySelector("#scaleLabel"),
  dangerLabel: document.querySelector("#dangerLabel"),
  eventPhase: document.querySelector("#eventPhase"),
  eventSource: document.querySelector("#eventSource"),
  feedbackList: document.querySelector("#feedbackList"),
  eventTitle: document.querySelector("#eventTitle"),
  eventBriefing: document.querySelector("#eventBriefing"),
  actorList: document.querySelector("#actorList"),
  choiceList: document.querySelector("#choiceList"),
  endingTitle: document.querySelector("#endingTitle"),
  endingText: document.querySelector("#endingText"),
  scaleTransitionKicker: document.querySelector("#scaleTransitionKicker"),
  scaleTransitionTitle: document.querySelector("#scaleTransitionTitle"),
  scaleTransitionText: document.querySelector("#scaleTransitionText"),
  scaleTransitionRole: document.querySelector("#scaleTransitionRole"),
  scaleTransitionDesk: document.querySelector("#scaleTransitionDesk"),
  scaleTransitionSafety: document.querySelector("#scaleTransitionSafety"),
  learningSummary: document.querySelector("#learningSummary"),
  modelReport: document.querySelector("#modelReport"),
  historyList: document.querySelector("#historyList"),
  scaleHistoryList: document.querySelector("#scaleHistoryList"),
  originCard: document.querySelector("#originCard"),
  cycleCard: document.querySelector("#cycleCard"),
  episodeCard: document.querySelector("#episodeCard"),
  modelCard: document.querySelector("#modelCard"),
  learningCard: document.querySelector("#learningCard")
};

let game = null;

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickWeighted(items, weightFor) {
  const weighted = items.map((item) => ({ item, weight: Math.max(0.01, weightFor(item)) }));
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let cursor = Math.random() * total;
  for (const entry of weighted) {
    cursor -= entry.weight;
    if (cursor <= 0) return entry.item;
  }
  return weighted.at(-1).item;
}

function pickCycleScenario() {
  const scenario = deepClone(pickWeighted(CYCLE_SCENARIOS, (scenario) => scenario.weight));
  scenario.phaseTurns = buildPhaseTurns(scenario);
  return scenario;
}

function pickStartingCapitalProfile() {
  return deepClone(pickWeighted(STARTING_CAPITAL_PROFILES, (profile) => profile.weight));
}

function randomInRange(range) {
  if (!Array.isArray(range)) return range;
  const [min, max] = range;
  return Math.round(min + Math.random() * (max - min));
}

function buildPhaseTurns(scenario = {}) {
  const ranges = scenario.phaseDurationRanges || DEFAULT_PHASE_DURATION_RANGES;
  const turns = [1];
  ranges.forEach((range) => {
    turns.push(turns.at(-1) + Math.max(10, randomInRange(range)));
  });
  return turns;
}

function normalizePhaseTurns(scenario = {}) {
  const turns = Array.isArray(scenario.phaseTurns) && scenario.phaseTurns.length >= DATA.phases.length
    ? scenario.phaseTurns.slice(0, DATA.phases.length)
    : buildPhaseTurns(scenario);
  for (let index = 1; index < turns.length; index += 1) {
    if (turns[index] - turns[index - 1] < 10) turns[index] = turns[index - 1] + 10;
  }
  return turns;
}

function applyStartingCapitalProfile(state, profile = {}) {
  ["visible", "hidden"].forEach((bucket) => {
    Object.entries(profile[bucket] || {}).forEach(([key, range]) => {
      state[bucket][key] = clamp(randomInRange(range));
    });
  });
}

function currentCycleScenario() {
  if (!game?.cycleScenario) return CYCLE_SCENARIOS.find((scenario) => scenario.id === "normal-cycle");
  const base = CYCLE_SCENARIOS.find((scenario) => scenario.id === game.cycleScenario.id) || {};
  return { ...base, ...game.cycleScenario };
}

function cyclePressureAdjust() {
  return currentCycleScenario()?.pressureAdjust || 0;
}

function cyclePriceDriftAdjust() {
  return currentCycleScenario()?.priceDriftAdjust || 0;
}

function applyBoost(state, boost = {}) {
  ["visible", "hidden"].forEach((bucket) => {
    Object.entries(boost[bucket] || {}).forEach(([key, delta]) => {
      state[bucket][key] = clamp((state[bucket][key] || 0) + delta);
    });
  });
}

function createRiskLedger() {
  return {
    liquidity: 0,
    debt: 0,
    delivery: 0,
    buyers: 0,
    official: 0,
    interest: 0,
    presale: 0,
    counterparty: 0,
    competitor: 0,
    government: 0,
    blackmail: 0,
    legal: 0,
    gray: 0,
    exit: 0,
    inventory: 0,
    audit: 0
  };
}

function createStakeholderStress() {
  return {
    contractor: 8,
    suppliers: 8,
    bank: 10,
    buyers: 12,
    local: 12,
    competitors: 10,
    underground: 6
  };
}

function createGoodwillLedger() {
  return {
    reputationCapital: 0,
    communityTrust: 0,
    workerTrust: 0,
    supplierTrust: 0,
    officialCredibility: 0,
    deliveryHonor: 0,
    used: 0
  };
}

function createProjectLedger() {
  return {
    marketPriceIndex: 100,
    projects: [],
    bookAssetValue: 0,
    marketAssetValue: 0,
    collateralValue: 0,
    saleableInventory: 0,
    unsoldInventory: 0,
    escrowCash: 0,
    freeCashCollected: 0,
    lastCollection: 0,
    lastFreeCash: 0,
    lastEscrowAdded: 0,
    lastDistressSale: null,
    lastNote: "还没有形成项目账本。"
  };
}

function createOpeningProject(state) {
  const land = state?.visible?.land_bank || 16;
  const bookValue = Math.max(16, Math.round(land * 1.7 + randomInRange([6, 12])));
  return normalizeProjectRecord({
    id: "P1-0",
    title: "东郊第一块地",
    sourceEventId: "opening-balance",
    acquiredTurn: 1,
    saleableTurn: randomInRange([3, 5]),
    deliveryTurn: randomInRange([16, 22]),
    stage: "land",
    bookValue,
    saleableInventory: Math.round(bookValue * 1.45),
    soldValue: 0,
    cashCollected: 0,
    freeCashCollected: 0,
    escrowCash: 0,
    lastCollection: 0,
    lastFreeCash: 0,
    lastEscrow: 0,
    lastCashTurn: null,
    constructionProgress: randomInRange([8, 16]),
    quality: clamp((state?.visible?.delivery || 36) + randomInRange([-4, 4]), 20, 82)
  });
}

function normalizeProjectRecord(project) {
  const normalized = project || {};
  const defaults = {
    freeCashCollected: 0,
    escrowCash: 0,
    cashCollected: 0,
    soldValue: 0,
    lastCollection: 0,
    lastFreeCash: 0,
    lastEscrow: 0,
    lastConstructionDraw: 0,
    lastProgressGain: 0,
    lastCashTurn: null,
    lastIssueTurn: 0,
    issueCount: 0,
    escrowUsedForConstruction: 0,
    deliveredTurn: null,
    deliverySettlementCash: 0,
    deliveryDebtPaid: 0
  };
  Object.entries(defaults).forEach(([key, value]) => {
    if (normalized[key] === undefined || normalized[key] === null) normalized[key] = value;
  });
  return normalized;
}

function seedProjectLedger(ledger, state) {
  if (ledger.projects?.length) return ledger;
  ledger.projects = [createOpeningProject(state)];
  ledger.bookAssetValue = ledger.projects[0].bookValue;
  ledger.marketAssetValue = ledger.projects[0].bookValue;
  ledger.saleableInventory = ledger.projects[0].saleableInventory;
  ledger.unsoldInventory = ledger.projects[0].saleableInventory;
  ledger.lastNote = `你手里有「${ledger.projects[0].title}」，现在只是土地资产，还没变成可售现金。`;
  return ledger;
}

function createFundingLedger() {
  return {
    seeded: false,
    bankLoan: 0,
    trustLoan: 0,
    bondDebt: 0,
    supplierCredit: 0,
    commercialPaper: 0,
    presaleCash: 0,
    mortgageFlow: 0,
    stateBridge: 0,
    assetSaleCash: 0,
    interestDue: 0,
    interestPaid: 0,
    lastInterestPaid: 0,
    lastUnpaidDue: 0,
    rolloverNeed: 0,
    collateralBorrowingRoom: 0,
    fundingStress: 0,
    lastSource: "暂无融资动作",
    lastWarning: "还没有形成融资账本。"
  };
}

function seedFundingLedger(ledger, state) {
  const visible = state.visible || {};
  const hidden = state.hidden || {};
  const debt = visible.debt || 0;
  const offBook = hidden.off_balance_debt || 0;
  ledger.bankLoan = Math.max(0, Math.round(debt * 0.52));
  ledger.trustLoan = Math.max(0, Math.round(debt * 0.2 + offBook * 0.14));
  ledger.supplierCredit = Math.max(0, Math.round(offBook * 0.45));
  ledger.commercialPaper = Math.max(0, Math.round(offBook * 0.38));
  ledger.presaleCash = Math.max(0, Math.round((hidden.buyer_liability || 0) * 0.55));
  ledger.interestDue = Math.max(0, Math.round((hidden.financing_cost || 0) * 0.18));
  ledger.rolloverNeed = Math.max(0, Math.round(offBook * 0.12));
  ledger.seeded = true;
  return ledger;
}

function pickOpeningEventId(origin) {
  const firstPhaseId = DATA.phases[0].id;
  const candidates = OPENING_EVENT_IDS
    .map((id) => DATA.events.find((event) => event.id === id))
    .filter((event) => event && event.phase.includes(firstPhaseId) && event.minScale <= 0 && event.maxScale >= 0);
  if (!candidates.length) return origin.startEvent;
  return pickWeighted(candidates, (event) => {
    const severityWeight = { routine: 8, pressure: 14, high: 10, crisis: 4 }[event.severity] || 8;
    return severityWeight + (event.id === origin.startEvent ? 2 : 0);
  }).id;
}

function createGame() {
  const origin = deepClone(DATA.origins[0]);
  const state = deepClone(DATA.initialState);
  const capitalProfile = pickStartingCapitalProfile();
  const cycleScenario = pickCycleScenario();
  applyStartingCapitalProfile(state, capitalProfile);
  applyBoost(state, origin.stateBoost);
  applyBoost(state, cycleScenario.stateBoost);
  const openingEventId = pickOpeningEventId(origin);
  const mainLineIndex = DATA.mainLine.indexOf(openingEventId);
  return {
    turn: 1,
    origin,
    project: origin.project,
    capitalProfile,
    cycleScenario,
    currentEvent: openingEventId,
    mainStep: mainLineIndex >= 0 ? mainLineIndex + 1 : 1,
    eventQueue: [],
    phaseIndex: 0,
    scaleIndex: 0,
    scaleScore: 0,
    state,
    relations: {
      local_official: 30,
      bank_manager: 24,
      trust_channel: 12,
      contractor: 38,
      suppliers: 34,
      buyers: 42,
      channel: 18,
      state_capital: 10,
      media: 20,
      underground: 8
    },
    seenEvents: {},
    incidentLog: [],
    history: [],
    feedbackQueue: [],
    activeFeedback: [],
    riskLedger: createRiskLedger(),
    stakeholderStress: createStakeholderStress(),
    goodwill: createGoodwillLedger(),
    goodwillEvents: [],
    projectLedger: seedProjectLedger(createProjectLedger(), state),
    fundingLedger: seedFundingLedger(createFundingLedger(), state),
    scaleHistory: [
      {
        turn: 1,
        title: origin.title,
        text: origin.intro
      }
    ],
    modelCounts: {},
    flags: { phaseStartTurn: 1 },
    notice: "",
    scaleTransition: null,
    pendingAdvance: null,
    ended: false,
    ending: null
  };
}

function normalizeGame(saved) {
  const normalized = saved || createGame();
  normalized.state = normalized.state || deepClone(DATA.initialState);
  normalized.state.visible = { ...DATA.initialState.visible, ...(normalized.state.visible || {}) };
  normalized.state.hidden = { ...DATA.initialState.hidden, ...(normalized.state.hidden || {}) };
  normalized.relations = {
    local_official: 30,
    bank_manager: 24,
    trust_channel: 12,
    contractor: 38,
    suppliers: 34,
    buyers: 42,
    channel: 18,
    state_capital: 10,
    media: 20,
    underground: 8,
    ...(normalized.relations || {})
  };
  normalized.origin = normalized.origin || DATA.origins[0];
  normalized.project = normalized.project || normalized.origin.project || "云江边缘项目";
  normalized.capitalProfile = normalized.capitalProfile || deepClone(STARTING_CAPITAL_PROFILES.find((profile) => profile.id === "balanced-start"));
  normalized.cycleScenario = normalized.cycleScenario || deepClone(CYCLE_SCENARIOS.find((scenario) => scenario.id === "normal-cycle"));
  normalized.cycleScenario.phaseTurns = normalizePhaseTurns(normalized.cycleScenario);
  normalized.phaseIndex = clamp(normalized.phaseIndex || 0, 0, DATA.phases.length - 1);
  normalized.scaleIndex = clamp(normalized.scaleIndex || 0, 0, DATA.scales.length - 1);
  normalized.scaleScore = normalized.scaleScore || 0;
  normalized.mainStep = normalized.mainStep || 0;
  normalized.eventQueue = (normalized.eventQueue || []).map((entry) =>
    typeof entry === "string" ? { id: entry, availableTurn: normalized.turn || 1 } : entry
  );
  normalized.incidentLog = normalized.incidentLog || [];
  normalized.feedbackQueue = normalized.feedbackQueue || [];
  normalized.activeFeedback = normalized.activeFeedback || [];
  normalized.seenEvents = normalized.seenEvents || {};
  normalized.history = normalized.history || [];
  normalized.riskLedger = { ...createRiskLedger(), ...(normalized.riskLedger || {}) };
  normalized.stakeholderStress = { ...createStakeholderStress(), ...(normalized.stakeholderStress || {}) };
  normalized.goodwill = { ...createGoodwillLedger(), ...(normalized.goodwill || {}) };
  normalized.goodwillEvents = normalized.goodwillEvents || [];
  normalized.projectLedger = { ...createProjectLedger(), ...(normalized.projectLedger || {}) };
  normalized.projectLedger.projects = normalized.projectLedger.projects || [];
  if (!normalized.projectLedger.projects.length) seedProjectLedger(normalized.projectLedger, normalized.state);
  normalized.fundingLedger = { ...createFundingLedger(), ...(normalized.fundingLedger || {}) };
  if (!normalized.fundingLedger.seeded) seedFundingLedger(normalized.fundingLedger, normalized.state);
  normalized.scaleHistory = normalized.scaleHistory || [];
  normalized.modelCounts = normalized.modelCounts || {};
  normalized.flags = normalized.flags || {};
  normalized.flags.phaseStartTurn = normalized.flags.phaseStartTurn || 1;
  normalized.notice = normalized.notice || "";
  normalized.scaleTransition = normalized.scaleTransition || null;
  normalized.pendingAdvance = normalized.pendingAdvance || null;
  normalized.ended = Boolean(normalized.ended);
  normalized.ending = normalized.ending || null;
  if (!normalized.currentEvent) normalized.currentEvent = normalized.origin.startEvent || DATA.events[0].id;
  return normalized;
}

function saveGame() {
  if (!game) return;
  localStorage.setItem(SAVE_KEY, JSON.stringify(game));
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    return normalizeGame(JSON.parse(raw));
  } catch {
    localStorage.removeItem(SAVE_KEY);
    return null;
  }
}

function screenNameFor(screen) {
  if (screen === elements.startScreen) return "start";
  if (screen === elements.eventScreen) return "event";
  if (screen === elements.scaleScreen) return "scale";
  if (screen === elements.debriefScreen) return "debrief";
  return "unknown";
}

function show(screen) {
  [elements.startScreen, elements.eventScreen, elements.scaleScreen, elements.debriefScreen].forEach((item) => item.classList.add("hidden"));
  screen.classList.remove("hidden");
  const screenName = screenNameFor(screen);
  document.body.dataset.screen = screenName;
  if (elements.newGameBtn) elements.newGameBtn.textContent = screenName === "debrief" ? "再开一局" : "新开一局";
}

function currentPhase() {
  return DATA.phases[clamp(game?.phaseIndex || 0, 0, DATA.phases.length - 1)];
}

function currentScale() {
  return DATA.scales[clamp(game?.scaleIndex || 0, 0, DATA.scales.length - 1)];
}

function contactTierIndex() {
  if (!game) return 0;
  if (game.phaseIndex >= 5 && game.scaleIndex >= 3) return 5;
  return clamp(game.scaleIndex || 0, 0, 5);
}

function contactForGroup(group) {
  const bank = FEEDBACK_LINE_BANK[group] || {};
  const roster = CONTACT_ROSTER_BY_SCALE[group];
  if (!roster) {
    return {
      speaker: bank.speaker || group,
      role: currentScale().title,
      temper: "这条线还没有完整人物档案"
    };
  }
  if (game?.phaseIndex >= 5 && roster.distress) return roster.distress;
  const tiers = roster.tiers || [];
  return tiers[contactTierIndex()] || tiers[tiers.length - 1] || {
    speaker: bank.speaker || group,
    role: currentScale().title,
    temper: "人物档案待补"
  };
}

function contactDeskSummary() {
  return CONTACT_DESK_GROUPS
    .map((group) => contactForGroup(group).speaker)
    .filter(Boolean)
    .join(" / ");
}

function competitionProfile() {
  if (!game) return COMPETITION_PROFILES[0];
  if (game.phaseIndex >= 5 && game.scaleIndex >= 3) return COMPETITION_PROFILES[5];
  return COMPETITION_PROFILES[clamp(game.scaleIndex || 0, 0, COMPETITION_PROFILES.length - 1)];
}

function competitionTacticLine() {
  const profile = competitionProfile();
  return `${profile.title}：${profile.tactics.join(" / ")}`;
}

function competitionPressureScore() {
  if (!game) return 0;
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const stress = game.stakeholderStress || createStakeholderStress();
  const profile = competitionProfile();
  return (
    profile.intensity +
    stress.competitors * 0.55 +
    Math.max(0, visible.land_bank - 24) * 0.45 +
    Math.max(0, visible.sales - 34) * 0.35 +
    Math.max(0, 42 - visible.sales) * 0.25 +
    Math.max(0, 42 - visible.government) * 0.45 +
    Math.max(0, hidden.price_bubble - 24) * 0.35 +
    game.scaleIndex * 3
  );
}

function governmentFeedbackGroup(event, choice, models) {
  const text = `${event.id || ""} ${event.title || ""} ${choice.id || ""} ${choice.label || ""}`;
  if (models.has("gray-governance") || models.has("protective-umbrella-risk") || /公安|扫黑|土方|清场|催收/.test(text)) {
    return "publicSecurity";
  }
  if (models.has("data-inflation") || models.has("audit-revenue-recognition") || /税|发票|审计|土增|口径/.test(text)) {
    return "taxBureau";
  }
  if (models.has("government-permit-power") || /规划|容积率|红线|验收|图纸/.test(text)) {
    return "planningBureau";
  }
  if (models.has("presale-cashflow-trap") || models.has("escrow-control") || models.has("delivery-first") || /预售|监管账户|保交楼|住建|交付/.test(text)) {
    return "housingBureau";
  }
  return "government";
}

function currentRole() {
  if (!game) return "无名小老板";
  const roles = [
    "无名小老板",
    "县城开发商",
    "城市新贵",
    "区域房企",
    "全国百强",
    "地产帝国",
    "高点退场者"
  ];
  if (game.phaseIndex >= 5 && game.state.visible.debt >= 70) return "债务重组中的集团实控人";
  if (game.phaseIndex >= 5 && game.state.hidden.boss_safety <= 35) return "处置名单里的房企老板";
  return roles[clamp(game.scaleIndex, 0, roles.length - 1)] || roles[0];
}

function eventById(id) {
  return DATA.events.find((event) => event.id === id) || DATA.events[0];
}

function statPercent(value) {
  return `${clamp(value)}%`;
}

function isInverseStat(key) {
  return DATA.inverseStats.includes(key);
}

function scoreForTone(key, value) {
  return isInverseStat(key) ? 100 - value : value;
}

function toneFor(key, value) {
  const score = scoreForTone(key, value);
  if (score < 25) return "bad";
  if (score < 48) return "warn";
  if (!isInverseStat(key) && value > 82 && ["sales", "government"].includes(key)) return "hot";
  return "good";
}

function bandFor(key, value) {
  const relation = relationScore();
  const bands = {
    cash: value <= 15 ? "断裂边缘" : value <= 35 ? "吃紧" : value >= 65 ? "充裕" : "能周转",
    debt: value >= 80 ? "压顶" : value >= 58 ? "偏重" : value <= 28 ? "可控" : "能谈",
    sales: value <= 20 ? "冰冷" : value <= 42 ? "慢" : value >= 75 ? "过热" : "能卖",
    delivery: value <= 20 ? "停工边缘" : value <= 45 ? "危险" : value >= 70 ? "扎实" : "能撑",
    relation: relation <= 25 ? "孤立" : relation <= 45 ? "薄" : relation >= 70 ? "过深" : "可谈"
  };
  return bands[key] || "";
}

function relationScore() {
  if (!game) return 0;
  const visible = game.state.visible;
  return clamp((visible.government + visible.bank + visible.public_trust) / 3);
}

function relationDanger() {
  if (!game) return 0;
  const visible = game.state.visible;
  const lowGovernment = Math.max(0, 34 - visible.government) * 1.45;
  const overEmbedded = Math.max(0, visible.government - 74) * 1.15;
  const bankGap = visible.bank < 28 && visible.debt > 52 ? (28 - visible.bank) * 1.25 : 0;
  const buyerGap = visible.public_trust < 28 && visible.delivery < 42 ? (28 - visible.public_trust) * 1.1 : 0;
  return clamp(lowGovernment + overEmbedded + bankGap + buyerGap);
}

function ensureFundingLedger() {
  if (!game.fundingLedger) game.fundingLedger = seedFundingLedger(createFundingLedger(), game.state || DATA.initialState);
  game.fundingLedger.seeded = true;
  return game.fundingLedger;
}

function fundingDebtExposure(ledger = ensureFundingLedger()) {
  return (
    (ledger.bankLoan || 0) +
    (ledger.trustLoan || 0) * 1.15 +
    (ledger.bondDebt || 0) * 1.05 +
    (ledger.supplierCredit || 0) * 0.72 +
    (ledger.commercialPaper || 0) * 0.9 +
    (ledger.rolloverNeed || 0) * 0.8
  );
}

function refreshFundingLedger() {
  const ledger = ensureFundingLedger();
  const projectLedger = refreshProjectLedger();
  const visible = game.state.visible;
  const securedDebt =
    (ledger.bankLoan || 0) * 0.72 +
    (ledger.trustLoan || 0) * 0.46 +
    (ledger.bondDebt || 0) * 0.18 +
    visible.debt * 0.16;
  ledger.collateralBorrowingRoom = Math.round(clampNumber(projectLedger.collateralValue - securedDebt, -90, 120));
  ledger.fundingStress = Math.round(clampNumber(
    (ledger.interestDue || 0) * 3 +
      (ledger.rolloverNeed || 0) * 2.2 +
      Math.max(0, -ledger.collateralBorrowingRoom) * 0.85 +
      (ledger.trustLoan || 0) * 0.18 +
      (ledger.commercialPaper || 0) * 0.22 +
      Math.max(0, 34 - visible.bank) * 0.9,
    0,
    160
  ));
  return ledger;
}

function fundingCarryRaw(ledger = ensureFundingLedger()) {
  return (
    (ledger.bankLoan || 0) * 0.012 +
    (ledger.trustLoan || 0) * 0.028 +
    (ledger.bondDebt || 0) * 0.022 +
    (ledger.supplierCredit || 0) * 0.014 +
    (ledger.commercialPaper || 0) * 0.024 +
    (ledger.rolloverNeed || 0) * 0.03
  );
}

function fundingShortLine() {
  if (!game) return "融资账本未开";
  const ledger = refreshFundingLedger();
  return `息${ledger.interestDue || 0}｜展${ledger.rolloverNeed || 0}｜抵${ledger.collateralBorrowingRoom}`;
}

function fundingSourceLine() {
  if (!game) return "暂无融资来源";
  const ledger = refreshFundingLedger();
  const nonBank = Math.round((ledger.trustLoan || 0) + (ledger.bondDebt || 0) + (ledger.commercialPaper || 0));
  return `银${Math.round(ledger.bankLoan || 0)}｜非标${nonBank}｜供${Math.round(ledger.supplierCredit || 0)}`;
}

function debtCarryEstimate() {
  if (!game) return { raw: 0, cashDrain: 0, debtAdd: 0 };
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const fundingLedger = refreshFundingLedger();
  const legacyRaw =
    visible.debt * 0.022 +
    hidden.off_balance_debt * 0.018 +
    (hidden.financing_cost || 0) * 0.026;
  const raw = Math.max(legacyRaw, legacyRaw * 0.55 + fundingCarryRaw(fundingLedger) * 0.78);
  const interestTick = raw >= 1.9 || ledger.interest >= 18 ? (raw >= 4.2 || ledger.interest >= 44 ? 2 : 1) : 0;
  const pressureTick = ledger.liquidity >= 18 || ledger.debt >= 22 || ledger.interest >= 26 ? 1 : 0;
  return {
    raw,
    cashDrain: interestTick + pressureTick,
    debtAdd: visible.cash <= 22 || ledger.liquidity >= 24 || ledger.debt >= 28 ? 1 : 0
  };
}

function dashboardTone(score, hot = false) {
  if (hot) return score >= 70 ? "bad" : "warn";
  if (score >= 70) return "bad";
  if (score >= 42) return "warn";
  return "good";
}

function dashboardIcon(card) {
  const tone = dashboardTone(card.score, card.hot);
  if (tone === "bad") return "🔴";
  if (tone === "warn") return "🟡";
  return "🟢";
}

function riskMeterPercent(card) {
  const score = Number(card.score || 0);
  const boosted = card.hot ? Math.max(score, 58) : score;
  return `${Math.round(clampNumber(14 + boosted, 14, 96))}%`;
}

function signalHealthDegrees(card) {
  const score = Number(card.score || 0);
  const boosted = card.hot ? Math.max(score, 58) : score;
  const health = clampNumber(100 - boosted, 4, 100);
  return `${Math.round(health * 2.7)}deg`;
}

function dashboardCards() {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const projectLedger = refreshProjectLedger();
  const fundingLedger = refreshFundingLedger();
  const carry = debtCarryEstimate();
  const relation = relationScore();
  const liquidityScore =
    Math.max(0, 42 - visible.cash) * 1.15 +
    (hidden.financing_cost || 0) * 0.5 +
    ledger.interest * 0.35 +
    Math.max(0, 32 - visible.bank) * 0.8 +
    (fundingLedger.interestDue || 0) * 0.65 +
    Math.max(0, -fundingLedger.collateralBorrowingRoom) * 0.25;
  const rolloverScore =
    Math.max(0, visible.debt - 42) * 1.05 +
    hidden.off_balance_debt * 0.55 +
    (hidden.financing_cost || 0) * 0.65 +
    Math.max(0, 36 - visible.bank) * 1.35 +
    ledger.debt * 0.32 +
    (fundingLedger.rolloverNeed || 0) * 0.9 +
    Math.max(0, -fundingLedger.collateralBorrowingRoom) * 0.45;
  const deliveryScore =
    Math.max(0, 50 - visible.delivery) * 0.9 +
    (hidden.buyer_liability || 0) * 0.62 +
    hidden.delivery_pressure * 0.68 +
    Math.max(0, 38 - visible.public_trust) * 0.8;
  const governmentScore =
    Math.max(0, 34 - visible.government) * 1.2 +
    Math.max(0, visible.government - 74) * 0.9 +
    (hidden.local_isolation || 0) * 0.72 +
    ledger.official * 0.28 +
    ledger.government * 0.32;
  const safetyScore =
    Math.max(0, 58 - hidden.boss_safety) * 1.1 +
    hidden.gray_risk * 0.55 +
    hidden.legal_exposure * 0.65 +
    hidden.asset_freeze_risk * 0.8 +
    (hidden.control_loss || 0) * 0.42 +
    ledger.blackmail * 0.35 +
    ledger.legal * 0.35;
  const salesScore =
    Math.max(0, 40 - visible.sales) * 0.9 +
    hidden.price_bubble * 0.45 +
    hidden.data_inflation * 0.45 +
    ledger.inventory * 0.35 +
    Math.max(0, 30 - visible.public_trust) * 0.4;
  const assetScore =
    Math.max(0, 94 - projectLedger.marketPriceIndex) * 1.25 +
    Math.max(0, projectLedger.unsoldInventory - 35) * 0.45 +
    Math.max(0, visible.debt * 0.42 - projectLedger.collateralValue) * 0.7 +
    (projectLedger.projects.length ? 0 : 14);

  return [
    {
      key: "cash",
      label: "现金",
      value: visible.cash,
      state: visible.cash <= 18 ? "只能短撑" : carry.cashDrain > 0 || fundingLedger.interestDue >= 4 ? "被利息咬" : visible.cash <= 35 ? "偏薄" : "能周转",
      note: `现金${visible.cash}，${fundingShortLine()}`,
      score: liquidityScore
    },
    {
      key: "rollover",
      label: "展期",
      value: visible.bank,
      state: fundingLedger.rolloverNeed >= 24 || visible.bank <= 20 ? "快关上" : fundingLedger.collateralBorrowingRoom < 0 || visible.bank <= 32 ? "变窄" : visible.debt >= 58 ? "要解释" : "还能谈",
      note: fundingSourceLine(),
      score: rolloverScore
    },
    {
      key: "delivery",
      label: "交付",
      value: visible.delivery,
      state: hidden.delivery_pressure >= 50 || (hidden.buyer_liability || 0) >= 45 ? "压上来" : visible.delivery <= 36 ? "危险" : "暂稳",
      note: `购房款${hidden.buyer_liability || 0}，业主${visible.public_trust}`,
      score: deliveryScore
    },
    {
      key: "government",
      label: "关系",
      value: visible.government,
      state: visible.government <= 28 ? "没人兜" : visible.government >= 76 ? "绑太深" : hidden.local_isolation >= 42 ? "变薄" : "能说话",
      note: `政商${visible.government}，地方孤立${hidden.local_isolation || 0}`,
      score: governmentScore,
      hot: visible.government >= 76
    },
    {
      key: "safety",
      label: "安全",
      value: hidden.boss_safety,
      state: ownerSafetyScene(),
      note: `黑灰${hidden.gray_risk}，法律${hidden.legal_exposure}`,
      score: safetyScore
    },
    {
      key: "sales",
      label: "回款",
      value: visible.sales,
      state: visible.sales <= 25 ? "偏冷" : hidden.data_inflation >= 28 || hidden.price_bubble >= 35 ? "不扎实" : "能卖",
      note: `销售${visible.sales}，泡沫${hidden.price_bubble}`,
      score: salesScore
    },
    {
      key: "asset",
      label: "资产",
      value: projectLedger.marketAssetValue,
      state: !projectLedger.projects.length ? "空桌" : projectLedger.marketPriceIndex <= 90 ? "缩水" : projectLedger.unsoldInventory >= 45 ? "压货" : projectLedger.collateralValue < visible.debt * 0.42 ? "抵押薄" : "有货值",
      note: projectLedgerSummary(),
      score: assetScore,
      hot: projectLedger.marketPriceIndex >= 122 && hidden.price_bubble >= 34
    }
  ];
}

function dashboardHeadline(card) {
  const lines = {
    cash: `现金${card.state}`,
    rollover: `银行口子${card.state}`,
    delivery: `交付${card.state}`,
    government: `地方${card.state}`,
    safety: `老板${card.state}`,
    sales: `回款${card.state}`,
    asset: `资产${card.state}`
  };
  return lines[card.key] || "桌面上有一处风险正在变硬。";
}

function dashboardGroups() {
  const cards = dashboardCards();
  const byKey = Object.fromEntries(cards.map((card) => [card.key, card]));
  const groupScore = (...keys) => Math.max(...keys.map((key) => byKey[key]?.score || 0));
  const groupHot = (...keys) => keys.some((key) => byKey[key]?.hot);
  return [
    {
      key: "funding",
      label: "资金",
      score: groupScore("cash", "rollover", "sales"),
      hot: groupHot("cash", "rollover", "sales")
    },
    {
      key: "project",
      label: "项目",
      score: groupScore("delivery", "asset"),
      hot: groupHot("delivery", "asset")
    },
    {
      key: "relation",
      label: "关系",
      score: groupScore("government"),
      hot: groupHot("government")
    },
    {
      key: "safety",
      label: "安全",
      score: groupScore("safety"),
      hot: groupHot("safety")
    }
  ];
}

function riskShortText(card) {
  if (card.hot) return "过热";
  const tone = dashboardTone(card.score, card.hot);
  if (tone === "bad") return "危险";
  if (tone === "warn") return "吃紧";
  return "稳";
}

function ownerSafetyScene() {
  if (!game) return "安全";
  const hidden = game.state.hidden;
  if (hidden.boss_safety <= 18) return "处置";
  if ((hidden.asset_freeze_risk || 0) >= 50) return "保全";
  if ((hidden.control_loss || 0) >= 55) return "失控";
  if ((hidden.legal_exposure || 0) >= 48) return "查账";
  if ((hidden.gray_risk || 0) >= 48) return "扫黑";
  if ((hidden.local_isolation || 0) >= 50) return "失护";
  if (hidden.boss_safety <= 42) return "关注";
  return "安全";
}

function ownerSafetyExplanation() {
  if (!game) return "目前没有形成个人风险。";
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const parts = [];
  if ((hidden.legal_exposure || 0) >= 42 || ledger.legal >= 42) parts.push("银行、审计、法院或经侦开始看资金流、担保和授权链");
  if ((hidden.asset_freeze_risk || 0) >= 42) parts.push("债权人可能先申请账户、股权或项目收益保全");
  if ((hidden.control_loss || 0) >= 42) parts.push("城投、国资、债委会或专班已经拿走一部分付款顺位和项目处置权");
  if ((hidden.gray_risk || 0) >= 42 || ledger.gray >= 42) parts.push("旧改、土方、清场或保护伞线索可能被倒查");
  if ((hidden.local_isolation || 0) >= 45) parts.push("地方协调变薄，监管和债权人更容易各自行动");
  if ((hidden.presale_misuse || 0) >= 42 || ledger.presale >= 42) parts.push("预售款和交付责任可能被穿透到个人决策");
  return parts.length ? parts.join("；") : "只是风险灯变黄，还没有具体处置动作。";
}

function safetyReply(scene) {
  const replies = {
    查账: {
      group: "bank",
      tone: "warning",
      text: pick([
        "这次不是补一份说明，授信系统要看资金流、担保和真实回款。",
        "认购、回款、监管户要分开报，混在一起就是风险意见。",
        "你再用项目故事解释现金流，我只能把风险意见写上去。"
      ])
    },
    扫黑: {
      group: "publicSecurity",
      tone: "warning",
      text: pick([
        "土方、清场、付款和授权链要按时间说，别再讲项目推进。",
        "旧关系谁联系的、谁收钱、谁在现场，材料会一项项核。",
        "你现在越绕，后面越像有人在统一口径。"
      ])
    },
    保全: {
      group: "trustCreditor",
      tone: "warning",
      text: pick([
        "我们会先保全账户和项目收益，别等你把好资产转走。",
        "展期谈不下来，就走保全。你手里有资产，不代表还能自由调。",
        "下一步看股权、账户和销售回款，别只给我们看估值表。"
      ])
    },
    失护: {
      group: "government",
      tone: "warning",
      text: pick([
        "地方可以协调，但不会替企业背无限责任。",
        "你不要让我们从业主群和银行风险单里才知道问题。",
        "项目要稳，旧承诺和旧关系先自己清一遍。"
      ])
    },
    失控: {
      group: "stateCapital",
      tone: "official",
      text: pick([
        "项目还能往前走，但重大事项不再是你一个人拍板。",
        "控制权已经让出去一部分，先保交付，再谈原股东收益。",
        "你现在更像处置对象，不是完整的出牌人。"
      ])
    },
    处置: {
      group: "publicSecurity",
      tone: "warning",
      text: pick([
        "现在先讲事实链，不讲融资故事。",
        "后面按笔录、账户和授权链走，别再让中间人传话。",
        "能说清的越早说清，越晚越像串供。"
      ])
    }
  };
  return replies[scene] || null;
}

function scheduleSafetyFeedback(choice, models) {
  const scene = ownerSafetyScene();
  const serious = ["查账", "扫黑", "保全", "失护", "失控", "处置"];
  if (!serious.includes(scene)) {
    game.flags.lastSafetySceneFeedback = scene;
    return;
  }
  const hidden = choice.hiddenEffects || {};
  const newPressure =
    (hidden.boss_safety || 0) <= -4 ||
    (hidden.legal_exposure || 0) >= 4 ||
    (hidden.asset_freeze_risk || 0) >= 4 ||
    (hidden.control_loss || 0) >= 4 ||
    (hidden.gray_risk || 0) >= 4 ||
    (hidden.local_isolation || 0) >= 4 ||
    models.has("legal-exposure") ||
    models.has("gray-governance") ||
    models.has("protective-umbrella-risk") ||
    models.has("asset-freeze-chain");
  if (game.flags.lastSafetySceneFeedback === scene && !newPressure) return;
  const reply = safetyReply(scene);
  if (reply) enqueueFeedback(reply.group, reply.tone, 6, 1, reply.text);
  game.flags.lastSafetySceneFeedback = scene;
}

function updateDerivedRiskState() {
  if (!game) return;
  const hidden = game.state.hidden;
  const danger = relationDanger();
  hidden.local_isolation = clamp(Math.max(hidden.local_isolation || 0, danger));
}

function renderStats(target, stats) {
  target.innerHTML = Object.entries(stats)
    .map(([key, value]) => `
      <div class="stat">
        <div class="stat-head">
          <span>${escapeHtml(DATA.labels[key] || key)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
        <div class="bar"><span style="width:${statPercent(value)}"></span></div>
      </div>
    `)
    .join("");
}

function renderStatusSummary() {
  if (!game) {
    const rows = ["资金", "项目", "关系", "安全"]
      .map((label) => `
        <div class="signal-row good" style="--health-deg:270deg" title="${label}">
          <span class="signal-gauge" aria-hidden="true"></span>
          <span class="signal-name">${label}</span>
        </div>
      `)
      .join("");
    elements.statusSummary.innerHTML = `<div class="signal-list">${rows}</div>`;
    return;
  }
  const items = dashboardGroups();
  const signalRows = items
    .map((item) => `
      <div class="signal-row ${dashboardTone(item.score, item.hot)}" style="--health-deg:${signalHealthDegrees(item)}" title="${escapeHtml(item.label)}：${escapeHtml(riskShortText(item))}">
        <span class="signal-gauge" aria-hidden="true"></span>
        <span class="signal-name">${escapeHtml(item.label)}</span>
      </div>
    `)
    .join("");
  elements.statusSummary.innerHTML = `<div class="signal-list">${signalRows}</div>`;
}

function severityLabel(severity) {
  const labels = {
    routine: "日常案卷",
    pressure: "压力事件",
    high: "高压事件",
    crisis: "危机事件"
  };
  return labels[severity] || "案卷线索";
}

function choiceHint(event, index) {
  if (!event?.actors?.length) return "";
  const actor = event.actors[index % event.actors.length];
  return `${actor.role}：${actor.text}`;
}

function dominantStyle() {
  if (!game || !Object.keys(game.modelCounts).length) return "经营风格未形成";
  const [top] = Object.entries(game.modelCounts).sort((a, b) => b[1] - a[1]);
  const labels = {
    "land-finance-loop": "土地叙事型",
    "leverage-backfire": "高杠杆冲刺型",
    "presale-cashflow-trap": "预售滚动型",
    "political-embedded-enterprise": "政企嵌入型",
    "risk-transfer-chain": "风险后移型",
    "balance-sheet-maintenance": "账面维持型",
    "phantom-demand": "热度幻觉型",
    "gray-governance": "灰色推进型",
    "delivery-first": "保交付生存型",
    "exit-discipline": "退出纪律型",
    "data-inflation": "数字注水型",
    "platformized-sales": "渠道热场型",
    "asset-freeze-chain": "冻结链条型",
    "legal-exposure": "个人暴露型",
    "local-isolation": "孤立失护型"
  };
  return labels[top[0]] || "混合地产商";
}

function renderShell() {
  renderStatusSummary();
  if (!game) {
    elements.turnLabel.textContent = "未开局";
    elements.bossLabel.textContent = "无名小老板";
    elements.styleLabel.textContent = "经营风格未形成";
  elements.scaleLabel.textContent = "";
    elements.dangerLabel.textContent = "";
    elements.visibleStats.innerHTML = "";
    elements.hiddenStatsMini.innerHTML = "";
    elements.projectBrief.innerHTML = "";
    elements.careerNotice.classList.add("hidden");
    return;
  }

  const scale = currentScale();
  const phase = currentPhase();
  elements.turnLabel.textContent = `第 ${game.turn} 回合`;
  updateDerivedRiskState();
  elements.bossLabel.textContent = scale.title;
  elements.styleLabel.textContent = dominantStyle();
  elements.scaleLabel.textContent = `${phase.title} · ${game.project} · 第 ${game.turn} 回合`;
  elements.dangerLabel.textContent = "";
  elements.dangerLabel.classList.toggle("bad", game.state.hidden.boss_safety < 35);
  renderStats(elements.visibleStats, game.state.visible);
  renderStats(elements.hiddenStatsMini, compactHiddenStats());
  elements.projectBrief.innerHTML = projectLedgerBrief();

  elements.careerNotice.classList.add("hidden");

  elements.originCard.innerHTML = `
    <strong>当前身份</strong>
    <p>${escapeHtml(currentRole())}<br>${escapeHtml(scale.title)}｜${escapeHtml(game.capitalProfile?.title || "小盘均衡型")}</p>
    <small>${escapeHtml(game.project)}</small>
  `;
  elements.cycleCard.innerHTML = `
    <strong>周期位置</strong>
    <p>${escapeHtml(phase.title)}｜${escapeHtml(phase.policy)}</p>
    <small>${escapeHtml(projectLedgerSummary())}</small>
  `;
}

function compactHiddenStats() {
  const hidden = game.state.hidden;
  return {
    presale_misuse: hidden.presale_misuse,
    off_balance_debt: hidden.off_balance_debt,
    financing_cost: hidden.financing_cost,
    buyer_liability: hidden.buyer_liability,
    political_dependency: hidden.political_dependency,
    gray_risk: hidden.gray_risk,
    delivery_pressure: hidden.delivery_pressure,
    exit_preparation: hidden.exit_preparation,
    local_isolation: hidden.local_isolation,
    legal_exposure: hidden.legal_exposure,
    asset_freeze_risk: hidden.asset_freeze_risk,
    control_loss: hidden.control_loss || 0,
    boss_safety: hidden.boss_safety
  };
}

function safetyText(value) {
  if (value <= 15) return "已经进处置名单";
  if (value <= 35) return "危险";
  if (value <= 55) return "被关注";
  if (value <= 75) return "还能谈";
  return "相对安全";
}

function renderEvent() {
  if (!game) return;
  if (game.ended) {
    renderDebrief();
    return;
  }

  syncPhaseForEvent(game.currentEvent);
  const event = eventById(game.currentEvent);
  const phase = currentPhase();
  show(elements.eventScreen);
  renderShell();
  elements.eventPhase.textContent = phase.title;
  elements.eventSource.textContent = severityLabel(event.severity);
  const feedbackItems = game.activeFeedback || [];
  elements.feedbackList.innerHTML = feedbackItems.length
    ? feedbackItems.map((feedback) => `
        <div class="feedback-item ${escapeHtml(feedback.tone)}">
          <strong>${escapeHtml(feedback.speaker)}</strong>
          <p>${escapeHtml(feedback.text)}</p>
        </div>
      `).join("")
    : "";
  elements.feedbackList.classList.toggle("hidden", !feedbackItems.length);
  elements.eventTitle.textContent = event.title;
  elements.eventBriefing.textContent = event.stakes ? `${event.briefing}\n\n压力：${event.stakes}` : event.briefing;
  elements.actorList.innerHTML = "";
  elements.actorList.classList.add("hidden");
  elements.choiceList.innerHTML = event.choices
    .map((choice, index) => `
      <button class="choice" type="button" data-choice="${escapeHtml(choice.id)}" data-index="${index}">${escapeHtml(choice.label)}</button>
    `)
    .join("");
  const choiceHints = event.choices.map((_, index) => choiceHint(event, index));
  let armedChoice = null;
  const showChoiceHint = (index) => {
    const hint = choiceHints[index];
    if (!hint) return;
    elements.actorList.innerHTML = `<p>${escapeHtml(hint)}</p>`;
    elements.actorList.classList.remove("hidden");
  };
  const markArmedChoice = (button) => {
    armedChoice = button.dataset.choice;
    elements.choiceList.querySelectorAll("button").forEach((item) => {
      item.classList.toggle("selected", item === button);
    });
  };
  const hideChoiceHint = () => {
    elements.actorList.innerHTML = "";
    elements.actorList.classList.add("hidden");
    armedChoice = null;
    elements.choiceList.querySelectorAll("button").forEach((item) => item.classList.remove("selected"));
  };
  elements.choiceList.querySelectorAll("button").forEach((button) => {
    const index = Number(button.dataset.index);
    button.addEventListener("mouseenter", () => {
      markArmedChoice(button);
      showChoiceHint(index);
    });
    button.addEventListener("focus", () => {
      markArmedChoice(button);
      showChoiceHint(index);
    });
    button.addEventListener("mouseleave", hideChoiceHint);
    button.addEventListener("blur", hideChoiceHint);
    button.addEventListener("click", () => {
      if (choiceHints[index] && armedChoice !== button.dataset.choice) {
        markArmedChoice(button);
        showChoiceHint(index);
        return;
      }
      choose(button.dataset.choice);
    });
  });

  elements.episodeCard.innerHTML = `
    <strong>节目线索</strong>
    <p>${escapeHtml(event.sourceEpisodes.join(" / "))}</p>
  `;
  elements.modelCard.innerHTML = `
    <strong>机制标签</strong>
    <p>${event.modelTags.map((tag) => escapeHtml(modelName(tag))).join(" / ")}</p>
  `;
  elements.learningCard.innerHTML = `
    <strong>桌面关系</strong>
    <p>${escapeHtml(contactDeskSummary())}</p>
    <small>${escapeHtml(competitionTacticLine())}</small>
  `;
}

function modelName(tag) {
  return DATA.models[tag]?.name || tag;
}

function choose(choiceId) {
  if (!game || game.ended) return;
  const event = eventById(game.currentEvent);
  const choice = event.choices.find((item) => item.id === choiceId);
  if (!choice) return;

  game.notice = "";
  applyChoice(event, choice);
  scheduleChoiceFeedback(event, choice);
  scheduleConsequences(event, choice);
  rollWorldPressure(event, choice);
  advanceProjectLedger(event, choice);
  advanceFundingLedger(event, choice);
  scheduleProjectLedgerActions(event, choice);
  updateCriticalCounters();
  tryDistressAssetSale(event, choice);

  const hardFailure = classifyHardFailure(choice);
  if (hardFailure) {
    if (deferBoomEnding(hardFailure, event, choice)) {
      advanceToNextEvent(event.id, event, choice);
      return;
    }
    if (deferScaleGraceEnding(hardFailure, event, choice)) {
      advanceToNextEvent(event.id, event, choice);
      return;
    }
    if (deferProjectEndingToActionWindow(hardFailure, event, choice)) {
      advanceToNextEvent(event.id, event, choice);
      return;
    }
    endGame(hardFailure, event, choice);
    return;
  }

  const risk = computeBlowupRisk(event, choice);
  if (Math.random() < risk) {
    const ending = classifyProbableFailure(event, choice);
    if (ending) {
      if (deferBoomEnding(ending, event, choice)) {
        advanceToNextEvent(event.id, event, choice);
        return;
      }
      if (deferScaleGraceEnding(ending, event, choice)) {
        advanceToNextEvent(event.id, event, choice);
        return;
      }
      if (deferProjectEndingToActionWindow(ending, event, choice)) {
        advanceToNextEvent(event.id, event, choice);
        return;
      }
      endGame(ending, event, choice);
      return;
    }
    recordIncident(event, choice, "risk", "这一步没有立刻炸，但它把一条暗线推到了后面。");
  }

  if (choice.endingCandidate && canTakeEnding(choice.endingCandidate)) {
    endGame(choice.endingCandidate, event, choice);
    return;
  }

  updateScale();
  updatePhase();

  if (game.scaleTransition) {
    game.pendingAdvance = { previousEventId: event.id };
    saveGame();
    renderScaleTransition();
    return;
  }

  advanceToNextEvent(event.id, event, choice);
}

function advanceToNextEvent(previousEventId, event = null, choice = null) {
  if (game.turn >= MAX_TURNS) {
    endGame(classifyLongRunEnding(), event, choice);
    return;
  }
  game.turn += 1;
  game.currentEvent = selectNextEvent(previousEventId);
  if (!game.currentEvent) {
    endGame(classifyLongRunEnding(), event, choice);
    return;
  }
  activateFeedbackForTurn();
  saveGame();
  renderEvent();
}

function applyChoice(event, choice) {
  applyEffectBucket(game.state.visible, choice.visibleEffects || {});
  applyEffectBucket(game.state.hidden, choice.hiddenEffects || {});
  applyEffectBucket(game.relations, choice.relationEffects || {});
  applyControlLoss(event, choice);
  const tradeoff = applyChoiceTradeoff(event, choice);
  const government = applyGovernmentRealism(event, choice);
  const funding = applyFundingCycle(event, choice, tradeoff);
  const project = applyProjectLedgerFromChoice(event, choice);
  updateRiskLedger(event, choice, tradeoff, funding);
  updateStakeholderStress(event, choice, tradeoff, funding);
  compoundRiskLedger();
  updateDerivedRiskState();
  game.scaleScore += choice.scaleScore || 0;
  game.seenEvents[event.id] = (game.seenEvents[event.id] || 0) + 1;
  [...(event.modelTags || []), ...(choice.models || [])].forEach((tag) => {
    game.modelCounts[tag] = (game.modelCounts[tag] || 0) + 1;
  });
  (choice.flags || []).forEach((flag) => {
    game.flags[flag] = true;
  });
  const risk = computeBlowupRisk(event, choice);
  game.history.push({
    turn: game.turn,
    phase: currentPhase().title,
    scale: currentScale().title,
    eventId: event.id,
    eventTitle: event.title,
    choiceId: choice.id,
    choiceLabel: choice.label,
    consequence: [choice.consequence, tradeoff.note, government.note, funding.note, project.note].filter(Boolean).join(" "),
    missed: choice.missed,
    lesson: choice.lesson,
    sourceEpisodes: event.sourceEpisodes,
    models: [...new Set([...(event.modelTags || []), ...(choice.models || [])])],
    risk,
    ledger: { ...game.riskLedger }
  });
}

function choiceBalance(choice) {
  const values = [];
  Object.entries(choice.visibleEffects || {}).forEach(([key, delta]) => {
    values.push(DATA.inverseStats.includes(key) ? -delta : delta);
  });
  Object.entries(choice.hiddenEffects || {}).forEach(([key, delta]) => {
    values.push(DATA.inverseStats.includes(key) ? -delta : delta);
  });
  Object.entries(choice.relationEffects || {}).forEach(([, delta]) => values.push(delta));
  return {
    good: values.filter((value) => value > 0).length,
    bad: values.filter((value) => value < 0).length
  };
}

function applyChoiceTradeoff(event, choice) {
  const balance = choiceBalance(choice);
  const visible = {};
  const hidden = {};
  const relation = {};
  const models = new Set([...(event.modelTags || []), ...(choice.models || [])]);
  const notes = [];

  if (balance.bad === 0) {
    if (models.has("delivery-first")) {
      visible.cash = -2;
      visible.sales = -1;
      hidden.local_isolation = 1;
      notes.push("它不是完美答案：你保住交付，也牺牲了现金、销售节奏和一部分关系缓冲。");
    } else if (models.has("exit-discipline") || models.has("cycle-asset-trader")) {
      visible.sales = -2;
      visible.government = -1;
      hidden.local_isolation = 1;
      notes.push("它不是完美答案：你降低风险，也放弃了继续扩张的叙事和地方期待。");
    } else if (models.has("feedback-loop") || models.has("audit-revenue-recognition")) {
      visible.sales = -1;
      hidden.data_inflation = -1;
      hidden.local_isolation = 1;
      notes.push("它不是完美答案：你让事实更清楚，也让短期数据和内部面子更难看。");
    } else {
      visible.cash = -1;
      visible.government = -1;
      hidden.local_isolation = 1;
      notes.push("它不是完美答案：你换来干净边界，也少了一点现金、关系和腾挪空间。");
    }
  }

  if (balance.good === 0) {
    visible.cash = (visible.cash || 0) + 2;
    visible.sales = (visible.sales || 0) + 1;
    relation.channel = (relation.channel || 0) + 1;
    notes.push("它也不是纯坏答案：你争取到了一点短期周转或谈判时间，但结局压力被推高。");
  }

  applyEffectBucket(game.state.visible, visible);
  applyEffectBucket(game.state.hidden, hidden);
  applyEffectBucket(game.relations, relation);

  return {
    balance,
    visible,
    hidden,
    relation,
    note: notes.join(" ")
  };
}

function applyGovernmentRealism(event, choice) {
  const text = `${event.title || ""} ${event.briefing || ""} ${choice.id || ""} ${choice.label || ""}`;
  const visibleEffects = choice.visibleEffects || {};
  const hiddenEffects = choice.hiddenEffects || {};
  const models = new Set([...(event.modelTags || []), ...(choice.models || [])]);
  const touchesGovernment =
    models.has("political-embedded-enterprise") ||
    models.has("government-permit-power") ||
    models.has("land-fiscal-pressure") ||
    /政府|领导|专班|城投|国资|住建|规划|税务|公安|派出所|关系|打招呼|协调|兜底|白名单|窗口|旧关系/.test(text);
  if (!touchesGovernment) return { note: "" };

  const visible = {};
  const hidden = {};
  const relation = {};
  const notes = [];
  const simpleFavor = /打招呼|协调|窗口|关系|旧领导|旧关系|支持/.test(text);
  const paidOrBound = /协调费|留房|入股|小股|联合|利益|补偿|红包|招待|饭局|一起接|兜底/.test(text);
  const pushesBurden = /兜底|接盘|保交楼|统一清偿|压一压|别扩大|替|背|先别停工|专班进驻|地方任务/.test(text);
  const asksForWritten = /书面|会议纪要|清单|测算|条件|公开|台账|材料|对账|说明|补充材料/.test(text);
  const rejectsTask = /拒绝|放弃|不接|不让|坚持控股|退出|卖掉|收缩/.test(text);
  const governmentGain = visibleEffects.government || 0;
  const governmentLoss = Math.max(0, -(visibleEffects.government || 0));

  if (simpleFavor && governmentGain > 0 && !paidOrBound && !pushesBurden && !asksForWritten) {
    hidden.political_dependency = (hidden.political_dependency || 0) + 1;
    notes.push("政府关系给了小便利，但也会留下一个以后要解释的人情口。");
  }
  if (paidOrBound) {
    visible.government = (visible.government || 0) + 1;
    hidden.political_dependency = (hidden.political_dependency || 0) + 3;
    hidden.boss_safety = (hidden.boss_safety || 0) - 1;
    relation.local_official = (relation.local_official || 0) + 2;
    notes.push("利益绑定会让事情更顺，也会把商业问题和地方责任绑得更深。");
  }
  if (pushesBurden) {
    hidden.local_isolation = (hidden.local_isolation || 0) + 3;
    hidden.political_dependency = (hidden.political_dependency || 0) + 2;
    hidden.boss_safety = (hidden.boss_safety || 0) - 1;
    bumpRisk("official", 4);
    bumpRisk("government", 3);
    bumpStakeholder("local", 5);
    notes.push("把难题推给政府不是免费托底，部门会先保护自己，后面会要求账户、进度和责任边界。");
  }
  if (asksForWritten) {
    visible.bank = (visible.bank || 0) + 1;
    visible.government = (visible.government || 0) - 1;
    hidden.political_dependency = (hidden.political_dependency || 0) - 2;
    hidden.legal_exposure = (hidden.legal_exposure || 0) - 1;
    notes.push("书面化会让办事慢一点、关系冷一点，但能把口头信用变成可验证边界。");
  }
  if (rejectsTask && governmentLoss > 0) {
    hidden.local_isolation = (hidden.local_isolation || 0) + Math.max(1, Math.round(governmentLoss * 0.45));
    relation.local_official = (relation.local_official || 0) - Math.max(1, Math.round(governmentLoss * 0.35));
    notes.push("拒绝地方任务能保边界，也会让下一次审批、融资协调和接盘谈判更少缓冲。");
  }
  if (game.state.visible.government <= 26 || governmentLoss >= 5) {
    bumpRisk("government", 3 + governmentLoss);
    bumpStakeholder("competitors", Math.max(1, governmentLoss * 0.5));
  }

  applyEffectBucket(game.state.visible, visible);
  applyEffectBucket(game.state.hidden, hidden);
  applyEffectBucket(game.relations, relation);
  return { visible, hidden, relation, note: notes.join(" ") };
}

function applyControlLoss(event, choice) {
  const hidden = game.state.hidden;
  const text = `${event.title || ""} ${choice.id || ""} ${choice.label || ""}`;
  const models = new Set([...(event.modelTags || []), ...(choice.models || [])]);
  let delta = 0;
  if (/接受|入股|联合|小股|控股|接盘|托管|专班|国资|城投|债委会|白名单/.test(text)) delta += 4;
  if (/信托|非标|展期|封闭资金|专项借款/.test(text) || models.has("whitelist-financing") || models.has("political-embedded-enterprise")) delta += 2;
  if (/交给|统一清偿|专班见证|封闭/.test(text)) delta += 3;
  if (delta <= 0) return;
  hidden.control_loss = clamp((hidden.control_loss || 0) + delta);
  hidden.political_dependency = clamp((hidden.political_dependency || 0) + Math.max(1, Math.round(delta * 0.45)));
  game.flags.lastControlLossTurn = game.turn;
}

function addFunding(key, amount) {
  if (!amount || amount <= 0) return 0;
  const ledger = ensureFundingLedger();
  const rounded = Math.max(0, Math.round(amount));
  ledger[key] = Math.max(0, Math.round((ledger[key] || 0) + rounded));
  return rounded;
}

function reduceFundingDebt(amount) {
  const ledger = ensureFundingLedger();
  let remaining = Math.max(0, Math.round(amount || 0));
  const order = ["commercialPaper", "supplierCredit", "trustLoan", "bondDebt", "bankLoan", "rolloverNeed"];
  order.forEach((key) => {
    if (remaining <= 0) return;
    const paid = Math.min(ledger[key] || 0, remaining);
    ledger[key] = Math.max(0, Math.round((ledger[key] || 0) - paid));
    remaining -= paid;
  });
  return amount - remaining;
}

function fundingChannelFor(event, choice, models) {
  const text = `${event.id || ""} ${event.title || ""} ${choice.id || ""} ${choice.label || ""}`;
  if (models.has("whitelist-financing") || /白名单|专项|封闭复工贷|政策贷|银行|开发贷|授信|抵押/.test(text)) return "bankLoan";
  if (models.has("shadow-banking-loop") || models.has("related-party-financing")) return "trustLoan";
  if (/信托|非标|理财/.test(text)) return "trustLoan";
  if (/美元债|境外债|债券|债委会|清盘/.test(text)) return "bondDebt";
  if (/商票|票据|供应商|材料|总包|垫资|工资/.test(text)) return "commercialPaper";
  if (/国资|城投|专项借款|地方协调|专班/.test(text)) return "stateBridge";
  if (models.has("risk-transfer-chain")) return "supplierCredit";
  return "bankLoan";
}

function recordFundingFromChoice(event, choice, models, visibleEffects, hiddenEffects, metrics) {
  const ledger = ensureFundingLedger();
  const notes = [];
  const text = `${event.id || ""} ${event.title || ""} ${choice.id || ""} ${choice.label || ""}`;
  const channel = fundingChannelFor(event, choice, models);
  const borrowedAmount = Math.max(0, metrics.cashIn + metrics.debtGain * 0.85);

  if (metrics.loanLike && borrowedAmount > 0) {
    if (channel === "commercialPaper") {
      const paper = addFunding("commercialPaper", borrowedAmount * 0.7);
      const supplier = addFunding("supplierCredit", borrowedAmount * 0.35);
      ledger.lastSource = `商票/供应链融资 ${paper + supplier}`;
      notes.push("这笔钱更像供应链信用：今天不付现金，后面会以商票折价、断供和保全回来。");
    } else if (channel === "trustLoan") {
      const amount = addFunding("trustLoan", borrowedAmount);
      ledger.lastSource = `信托/非标资金 ${amount}`;
      notes.push("这笔钱更像信托或非标：速度快，利息和展期要求也更硬。");
    } else if (channel === "bondDebt") {
      const amount = addFunding("bondDebt", borrowedAmount);
      ledger.lastSource = `债券/债委会资金 ${amount}`;
      notes.push("这笔钱会进入债权人桌面：后面看的不是故事，是清偿顺位和资产包。");
    } else if (channel === "stateBridge") {
      const amount = addFunding("stateBridge", borrowedAmount * 0.75);
      addFunding("bankLoan", borrowedAmount * 0.35);
      ledger.lastSource = `地方协调/封闭资金 ${amount}`;
      notes.push("这笔钱带有政策和处置条件：能救项目，但会锁住资金用途和老板自由度。");
    } else {
      const amount = addFunding("bankLoan", borrowedAmount);
      ledger.lastSource = `银行开发贷/续贷 ${amount}`;
      notes.push("这笔钱进入银行口子：抵押、销售、监管账户和展期条件以后都会被重估。");
    }
  }

  if (metrics.presaleLike && (metrics.cashIn > 0 || metrics.salesGain > 0)) {
    const presale = addFunding("presaleCash", Math.max(1, metrics.cashIn * 0.55 + metrics.salesGain * 0.9));
    const mortgage = addFunding("mortgageFlow", Math.max(0, metrics.cashIn * 0.22 + metrics.salesGain * 0.38));
    ledger.lastSource = `预售/按揭回款 ${presale + mortgage}`;
    notes.push("销售带来的钱会被拆成预售款和按揭流，不是天然属于集团的自由现金。");
  }

  if ((hiddenEffects.off_balance_debt || 0) > 0) {
    addFunding("supplierCredit", hiddenEffects.off_balance_debt * 0.55);
    addFunding("commercialPaper", hiddenEffects.off_balance_debt * 0.45);
  }

  if ((hiddenEffects.financing_cost || 0) > 0) {
    addFunding("rolloverNeed", hiddenEffects.financing_cost * 0.35);
  }

  if ((visibleEffects.debt || 0) < 0 || (hiddenEffects.off_balance_debt || 0) < 0 || /还债|兑付|清偿|补齐|卖/.test(text) || models.has("exit-discipline")) {
    const repaid = reduceFundingDebt(Math.max(0, -(visibleEffects.debt || 0)) + Math.max(0, -(hiddenEffects.off_balance_debt || 0)) + Math.max(0, -metrics.cashOut * 0.25));
    if (repaid > 0) notes.push(`你清掉了部分融资链 ${Math.round(repaid)}，但可用现金或未来资产也被消耗。`);
  }

  if (/卖|出售|收储|接盘|资产/.test(text) || models.has("cycle-asset-trader") || models.has("commercial-asset-exit")) {
    addFunding("assetSaleCash", Math.max(0, metrics.cashIn + Math.max(0, -(visibleEffects.land_bank || 0)) * 0.8));
  }

  refreshFundingLedger();
  if (ledger.collateralBorrowingRoom < 0) {
    ledger.lastWarning = "抵押物折扣不够覆盖融资，银行和信托会先收口。";
  } else if ((ledger.rolloverNeed || 0) >= 18) {
    ledger.lastWarning = "展期缺口正在滚厚，下一次付息日会更痛。";
  } else {
    ledger.lastWarning = notes.at(-1) || ledger.lastWarning;
  }
  return notes.join(" ");
}

function applyFundingCycle(event, choice, tradeoff) {
  const models = new Set([...(event.modelTags || []), ...(choice.models || [])]);
  const visibleEffects = { ...(choice.visibleEffects || {}), ...(tradeoff.visible || {}) };
  const hiddenEffects = { ...(choice.hiddenEffects || {}), ...(tradeoff.hidden || {}) };
  const visible = {};
  const hidden = {};
  const notes = [];
  const cashIn = Math.max(0, visibleEffects.cash || 0);
  const salesGain = Math.max(0, visibleEffects.sales || 0);
  const debtGain = Math.max(0, visibleEffects.debt || 0);
  const deliveryGain = Math.max(0, visibleEffects.delivery || 0);
  const cashOut = Math.max(0, -(visibleEffects.cash || 0));
  const loanLike =
    debtGain > 0 ||
    models.has("leverage-backfire") ||
    models.has("balance-sheet-maintenance") ||
    models.has("whitelist-financing") ||
    models.has("off-balance-sheet") ||
    models.has("risk-transfer-chain");
  const presaleLike =
    salesGain > 0 ||
    models.has("presale-cashflow-trap") ||
    models.has("phantom-demand") ||
    models.has("narrative-control") ||
    models.has("escrow-control");

  if (loanLike && cashIn > 0) {
    const debtShadow = Math.max(1, Math.ceil(cashIn * 0.22 + debtGain * 0.2));
    visible.debt = (visible.debt || 0) + debtShadow;
    hidden.financing_cost = (hidden.financing_cost || 0) + Math.max(1, Math.ceil(cashIn * 0.32 + debtGain * 0.24));
    notes.push("这笔现金不是免费的：它来自银行或信用链，后面会以利息、展期和抽贷压力回到结局里。");
  }

  if (presaleLike && (cashIn > 0 || salesGain > 0)) {
    const liability = Math.max(1, Math.ceil(cashIn * 0.25 + salesGain * 0.55));
    hidden.buyer_liability = (hidden.buyer_liability || 0) + liability;
    hidden.delivery_pressure = (hidden.delivery_pressure || 0) + Math.max(1, Math.ceil(salesGain * 0.2));
    if (cashIn > cashOut + deliveryGain) {
      hidden.presale_misuse = (hidden.presale_misuse || 0) + Math.ceil((cashIn - cashOut - deliveryGain) * 0.12);
    }
    notes.push("预售回款也不是自由现金：购房人的钱会绑定交付、停贷和维权结局。");
  }

  if (deliveryGain > 0 && cashOut > 0) {
    hidden.buyer_liability = (hidden.buyer_liability || 0) - Math.max(1, Math.ceil(deliveryGain * 0.45));
    hidden.delivery_pressure = (hidden.delivery_pressure || 0) - Math.max(1, Math.ceil(deliveryGain * 0.25));
  }

  const ledgerNote = recordFundingFromChoice(event, choice, models, visibleEffects, hiddenEffects, {
    cashIn,
    salesGain,
    debtGain,
    deliveryGain,
    cashOut,
    loanLike,
    presaleLike
  });
  if (ledgerNote) notes.push(ledgerNote);

  applyEffectBucket(game.state.visible, visible);
  applyEffectBucket(game.state.hidden, hidden);

  return {
    visible,
    hidden,
    note: notes.join(" ")
  };
}

function ensureProjectLedger() {
  if (!game.projectLedger) game.projectLedger = createProjectLedger();
  game.projectLedger.projects = (game.projectLedger.projects || []).map(normalizeProjectRecord);
  return game.projectLedger;
}

function projectTitleFromEvent(event, ledger = ensureProjectLedger()) {
  const area = ["东郊", "河湾", "新城", "老城", "南站", "北湖"][ledger.projects.length % 6];
  return `${area}${ledger.projects.length + 1}号地`;
}

function projectStageName(stage) {
  const names = {
    land: "土地储备",
    construction: "在建",
    presale: "预售",
    delivery: "交付",
    delivered: "已交付",
    impaired: "减值处置"
  };
  return names[stage] || stage;
}

function projectLifecycleLabel(project, ledger = refreshProjectLedger()) {
  const progress = Math.round(project.constructionProgress || 0);
  const soldRatio = project.saleableInventory ? (project.soldValue || 0) / project.saleableInventory : 0;
  const overdue = isProjectOverdue(project);
  const risk = projectRiskProfile(project, ledger);
  if (project.stage === "delivered") return "已交付";
  if (project.stage === "impaired") return "处置中";
  if (overdue && (project.soldValue || 0) > 0) return progress >= 82 ? "逾期待交付" : "逾期未交";
  if (project.stage === "delivery") return progress >= 92 ? "交付扫尾" : "交付冲刺";
  if (project.stage === "presale") {
    if (risk.label === "监管缺口") return "预售监管";
    if (risk.label === "卖快楼慢") return "预售压进度";
    if (game.turn >= (project.deliveryTurn || 999) - 2 || progress >= 72 || soldRatio >= 0.68) return "临近交付";
    return "预售回款";
  }
  if (project.stage === "construction") return "在建";
  if (project.stage === "land") return "土地";
  return projectStageName(project.stage);
}

function marketValueForProject(project, ledger = ensureProjectLedger()) {
  const stageFactor = {
    land: 0.86,
    construction: 0.96,
    presale: 1.08,
    delivery: 1.0,
    delivered: 0.72,
    impaired: 0.42
  }[project.stage] || 0.9;
  const unsoldRatio = project.saleableInventory ? Math.max(0, 1 - (project.soldValue || 0) / project.saleableInventory) : 1;
  return Math.max(0, Math.round((project.bookValue || 0) * (ledger.marketPriceIndex / 100) * stageFactor * (0.55 + unsoldRatio * 0.45)));
}

function refreshProjectLedger() {
  const ledger = ensureProjectLedger();
  ledger.projects = ledger.projects.filter((project) => (project.bookValue || 0) > 0 || (project.saleableInventory || 0) > (project.soldValue || 0));
  ledger.bookAssetValue = Math.round(ledger.projects.reduce((sum, project) => sum + (project.bookValue || 0), 0));
  ledger.marketAssetValue = Math.round(ledger.projects.reduce((sum, project) => sum + marketValueForProject(project, ledger), 0));
  ledger.saleableInventory = Math.round(ledger.projects.reduce((sum, project) => sum + Math.max(0, (project.saleableInventory || 0) - (project.soldValue || 0)), 0));
  ledger.unsoldInventory = ledger.saleableInventory;
  ledger.escrowCash = Math.round(ledger.projects.reduce((sum, project) => sum + (project.escrowCash || 0), 0));
  const pledgeRatio = clampNumber(0.26 + (game.state.visible.bank || 0) / 260 - Math.max(0, (game.state.visible.debt || 0) - 55) / 380, 0.18, 0.62);
  ledger.collateralValue = Math.round(ledger.marketAssetValue * pledgeRatio);
  return ledger;
}

function projectLedgerSummary() {
  if (!game) return "项目账本未开";
  const ledger = refreshProjectLedger();
  if (!ledger.projects.length) return `房价${ledger.marketPriceIndex}｜还没拿地`;
  return `房价${ledger.marketPriceIndex}｜资产${ledger.marketAssetValue}｜抵押${ledger.collateralValue}｜监管${ledger.escrowCash}`;
}

function projectLiquidityProfile(project, ledger = refreshProjectLedger()) {
  const remaining = Math.max(0, (project.saleableInventory || 0) - (project.soldValue || 0));
  if (!PROJECT_CASH_STAGES.has(project.stage) || remaining <= 0) {
    return { remaining, expectedCollection: 0, expectedFreeCash: 0, expectedEscrow: 0 };
  }
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const relation = game.relations || {};
  const priceFomo = clampNumber(((ledger.marketPriceIndex || 100) - 104) / 55, 0, 0.34);
  const boomFomo = ["early-expansion", "shelter-reform-boom", "high-turnover"].includes(currentPhase().id) ? 0.08 : 0;
  const marketingPush = clampNumber((visible.sales - 32) / 145 + Math.max(0, (relation.channel || 0) - 18) / 280, -0.08, 0.22);
  const brandTrust = clampNumber((visible.delivery - 38) / 220 + (visible.public_trust - 38) / 240, -0.16, 0.18);
  const mortgageSupport = clampNumber((visible.bank - 30) / 260, -0.08, 0.18);
  const localSupport = clampNumber((visible.government - 34) / 360 - Math.max(0, hidden.local_isolation - 32) / 260, -0.08, 0.12);
  const policyDrag = game.phaseIndex >= 3 ? 0.06 + game.phaseIndex * 0.015 : 0;
  const qualityDrag = Math.max(0, 38 - (project.quality || 55)) / 95;
  const deliveryDrag = Math.max(0, hidden.delivery_pressure - 62) / 260;
  const trustDrag = Math.max(0, 34 - visible.public_trust) / 160;
  const bankDrag = Math.max(0, 26 - visible.bank) / 180;
  const marketHeat = clampNumber(
    0.05 +
      priceFomo +
      boomFomo +
      marketingPush +
      brandTrust +
      mortgageSupport +
      localSupport +
      (project.saleHeat || 0) / 520 -
      policyDrag -
      qualityDrag -
      deliveryDrag -
      trustDrag -
      bankDrag,
    0,
    0.72
  );
  const expectedCollection = Math.min(remaining, Math.max(0, Math.round(remaining * marketHeat * (0.2 + priceFomo * 0.22))));
  const escrowRatio = clampNumber(0.24 + game.phaseIndex * 0.035 + Math.max(0, hidden.presale_misuse - 28) / 260, 0.22, 0.58);
  const freeRatio = clampNumber(0.5 - game.phaseIndex * 0.03 + Math.max(0, visible.bank - 45) / 420 - Math.max(0, hidden.presale_misuse - 34) / 360, 0.24, 0.52);
  const expectedEscrow = expectedCollection ? Math.max(1, Math.round(expectedCollection * escrowRatio)) : 0;
  const expectedFreeCash = expectedCollection ? Math.max(0, Math.min(expectedCollection - expectedEscrow, Math.round(expectedCollection * freeRatio))) : 0;
  return { remaining, expectedCollection, expectedFreeCash, expectedEscrow };
}

function projectCashFlowLine(project, ledger = refreshProjectLedger()) {
  if (project.stage === "delivered") {
    const liquidity = projectLiquidityProfile(project, ledger);
    if (liquidity.expectedFreeCash > 0) return `尾盘预计+${liquidity.expectedFreeCash}`;
    if ((project.lastCashTurn || 0) >= game.turn - 1 && (project.lastFreeCash || 0) > 0) {
      return `交付结算+${Math.round(project.lastFreeCash || 0)}`;
    }
    return "已归档";
  }
  if ((project.lastCashTurn || 0) >= game.turn - 1 && ((project.lastFreeCash || 0) > 0 || (project.lastEscrow || 0) > 0)) {
    const progress = (project.lastProgressGain || 0) > 0 ? ` 工程+${Math.round(project.lastProgressGain || 0)}%` : "";
    return `上回现金+${Math.round(project.lastFreeCash || 0)} 监管+${Math.round(project.lastEscrow || 0)}${progress}`;
  }
  const liquidity = projectLiquidityProfile(project, ledger);
  if (liquidity.expectedFreeCash > 0) return `预计现金+${liquidity.expectedFreeCash}`;
  if (PROJECT_CASH_STAGES.has(project.stage)) return "卖得慢，暂不进现金";
  return "还没到回款口";
}

function projectHandlerLine(project, risk) {
  if (risk.severity >= 4) {
    if (risk.label === "交付逾期") return "专班/项目总要出复工表";
    if (risk.label === "监管缺口") return "财务要补监管流水";
    if (risk.label === "卖快楼慢") return "工程要追进度";
    if (risk.label === "被迫折价") return "债权人会压处置价";
    return "项目总必须回桌面";
  }
  if (project.stage === "land") return "投拓/报批在跟";
  if (project.stage === "construction") return "工程在跑预售节点";
  if (PROJECT_CASH_STAGES.has(project.stage)) return "案场和财务在对回款";
  return "资产岗在处置";
}

function projectShortStatus(project, ledger = refreshProjectLedger()) {
  const unsold = Math.max(0, (project.saleableInventory || 0) - (project.soldValue || 0));
  const progress = Math.round(project.constructionProgress || 0);
  const risk = projectRiskProfile(project, ledger);
  const lifecycle = projectLifecycleLabel(project, ledger);
  const soldLine = PROJECT_CASH_STAGES.has(project.stage) ? `已售 ${Math.round(project.soldValue || 0)}/${Math.round(project.saleableInventory || 0)}` : "";
  const cashLine = projectCashFlowLine(project, ledger);
  const handler = projectHandlerLine(project, risk);
  if (project.stage === "land") return `土地｜${Math.max(0, project.saleableTurn - game.turn)} 回合后可售｜${handler}｜${risk.label}`;
  if (project.stage === "construction") return `在建 ${progress}%｜${Math.max(0, project.saleableTurn - game.turn)} 回合后预售｜${handler}｜${risk.label}`;
  if (project.stage === "presale") return `${lifecycle}｜工程 ${progress}%｜${soldLine}｜${cashLine}｜${risk.label}`;
  if (project.stage === "delivery") return `${lifecycle}｜工程 ${progress}%｜${soldLine}｜${cashLine}｜${risk.label}`;
  if (project.stage === "delivered") {
    const remaining = Math.max(0, (project.saleableInventory || 0) - (project.soldValue || 0));
    return `已交付｜剩余尾盘 ${Math.round(remaining)}｜${cashLine}｜${risk.label}`;
  }
  return `${projectStageName(project.stage)}｜剩余货值 ${Math.round(unsold)}｜${handler}｜${risk.label}`;
}

function projectCanCashLabel(project, ledger = refreshProjectLedger()) {
  const risk = projectRiskProfile(project, ledger);
  const lifecycle = projectLifecycleLabel(project, ledger);
  if (project.stage === "delivered") return risk.severity >= 3 ? "维修尾巴" : "归档";
  if (lifecycle === "逾期未交" || lifecycle === "逾期待交付") return lifecycle;
  if (risk.severity >= 4) return "拖后腿";
  if ((project.lastCashTurn || 0) >= game.turn - 1 && (project.lastFreeCash || 0) > 0) return "刚到账";
  if (PROJECT_CASH_STAGES.has(project.stage)) {
    const liquidity = projectLiquidityProfile(project, ledger);
    return liquidity.expectedFreeCash > 0 ? "回款中" : "回款慢";
  }
  if (project.stage === "construction" && (project.constructionProgress || 0) >= 42) return "快预售";
  if (project.stage === "land") return "待开发";
  return "可处置";
}

function isProjectOverdue(project) {
  if (!project || project.stage === "delivered" || project.stage === "impaired") return false;
  const progress = project.constructionProgress || 0;
  const grace = progress >= 88 ? 3 : progress >= 76 ? 2 : progress >= 64 ? 1 : 0;
  return game.turn > (project.deliveryTurn || 999) + grace;
}

function advanceProjectConstruction(project, notes) {
  if (!["presale", "delivery"].includes(project.stage)) return;
  if ((project.constructionProgress || 0) >= 100) return;

  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const escrowBefore = project.escrowCash || 0;
  const cashSupport = visible.cash > 24 ? Math.min(3, Math.round((visible.cash - 18) / 18)) : 0;
  const escrowDraw = Math.min(
    escrowBefore,
    Math.max(0, Math.round(1 + (project.lastEscrow || 0) * 0.9 + (project.cashCollected || 0) * 0.018 + Math.random() * 2))
  );
  const stagePush = project.stage === "delivery" ? 1.4 : 0.6;
  const overduePush = game.turn >= (project.deliveryTurn || 999) - 2 ? 1.2 : 0;
  const localPush = clampNumber((visible.government - 34) / 30 - Math.max(0, hidden.local_isolation - 28) / 24, -1.4, 1.8);
  const gracePush = (game.flags.scaleGraceUntilTurn || 0) >= game.turn ? 0.8 : 0;
  const pressureDrag =
    Math.max(0, hidden.delivery_pressure - 58) / 24 +
    Math.max(0, 32 - (project.quality || 55)) / 20 +
    Math.max(0, 16 - visible.cash) / 18;
  const progressGain = clampNumber(
    1.8 +
      stagePush +
      overduePush +
      visible.delivery / 42 +
      escrowDraw * 0.72 +
      cashSupport * 0.72 +
      localPush +
      gracePush +
      Math.random() * 2.2 -
      pressureDrag,
    0,
    11
  );
  if (progressGain <= 0.25) return;

  project.constructionProgress = clamp((project.constructionProgress || 0) + progressGain, 0, 100);
  project.lastProgressGain = progressGain;
  project.lastConstructionDraw = escrowDraw;
  if (escrowDraw > 0) {
    project.escrowCash = Math.max(0, Math.round((project.escrowCash || 0) - escrowDraw));
    project.escrowUsedForConstruction = Math.round((project.escrowUsedForConstruction || 0) + escrowDraw);
  }
  if (cashSupport > 0 && visible.cash > 18 && Math.random() < 0.35) {
    const cashSpend = Math.min(cashSupport, Math.max(0, visible.cash - 18));
    visible.cash = clamp(visible.cash - cashSpend);
    project.freeCashCollected = Math.max(0, Math.round((project.freeCashCollected || 0) - cashSpend * 0.15));
  }
  if (progressGain >= 2.5) {
    reduceRisk("delivery", progressGain * 0.9);
    hidden.delivery_pressure = clamp(hidden.delivery_pressure - Math.max(0, Math.round(progressGain * 0.16)));
  }
  notes.push(`「${project.title}」工程推进 ${Math.round(progressGain)}%，监管账户拨付 ${Math.round(escrowDraw)} 用到工地。`);
}

function maybeDeliverProject(project, notes) {
  if (!["presale", "delivery"].includes(project.stage)) return;
  const progress = project.constructionProgress || 0;
  const sold = project.soldValue || 0;
  const soldRatio = project.saleableInventory ? sold / project.saleableInventory : 0;
  const visible = game.state.visible;
  const hidden = game.state.hidden;

  if (project.stage === "presale" && (progress >= 82 || (game.turn >= (project.deliveryTurn || 999) - 1 && progress >= 76))) {
    project.stage = "delivery";
    notes.push(`「${project.title}」从预售进入交付冲刺。`);
  }

  if (project.stage === "delivery" && progress >= 96) {
    project.stage = "delivered";
    project.deliveredTurn = game.turn;
    const liabilityRelief = Math.max(4, Math.round(sold * 0.12 + soldRatio * 6));
    const escrowRelease = Math.min(project.escrowCash || 0, Math.max(0, Math.round((project.escrowCash || 0) * 0.45)));
    const marginRelease = Math.max(1, Math.round(sold * 0.08 + Math.max(0, (project.quality || 50) - 42) * sold * 0.002));
    const grossSettlement = escrowRelease + marginRelease;
    const fundingLedger = refreshFundingLedger();
    const debtPayRatio = clampNumber(0.24 + visible.debt / 260 + (fundingLedger.fundingStress || 0) / 520, 0.24, 0.68);
    const debtPay = Math.min(grossSettlement, Math.max(0, Math.round(grossSettlement * debtPayRatio)));
    const settlementCash = Math.max(0, grossSettlement - debtPay);
    project.escrowCash = Math.max(0, Math.round((project.escrowCash || 0) - escrowRelease));
    project.deliverySettlementCash = Math.round((project.deliverySettlementCash || 0) + settlementCash);
    project.deliveryDebtPaid = Math.round((project.deliveryDebtPaid || 0) + debtPay);
    project.freeCashCollected = Math.round((project.freeCashCollected || 0) + settlementCash);
    project.lastCollection = Math.round((project.lastCollection || 0) + grossSettlement);
    project.lastFreeCash = Math.round((project.lastFreeCash || 0) + settlementCash);
    project.lastCashTurn = game.turn;
    const ledger = ensureProjectLedger();
    ledger.freeCashCollected = Math.round((ledger.freeCashCollected || 0) + settlementCash);
    ledger.lastCollection = Math.round((ledger.lastCollection || 0) + grossSettlement);
    ledger.lastFreeCash = Math.round((ledger.lastFreeCash || 0) + settlementCash);
    visible.cash = clamp(visible.cash + settlementCash);
    if (debtPay > 0) {
      const repaid = reduceFundingDebt(debtPay);
      visible.debt = clamp(visible.debt - Math.max(0, Math.round(repaid * 0.45)));
      hidden.financing_cost = clamp((hidden.financing_cost || 0) - Math.max(0, Math.round(repaid * 0.12)));
      reduceRisk("debt", repaid * 0.5);
      reduceRisk("interest", repaid * 0.45);
    }
    visible.delivery = clamp(visible.delivery + 5);
    visible.public_trust = clamp(visible.public_trust + Math.max(2, Math.round(soldRatio * 4)));
    hidden.delivery_pressure = clamp(hidden.delivery_pressure - liabilityRelief);
    hidden.buyer_liability = clamp((hidden.buyer_liability || 0) - Math.max(3, Math.round(liabilityRelief * 0.8)));
    hidden.presale_misuse = clamp(hidden.presale_misuse - Math.max(0, Math.round(liabilityRelief * 0.25)));
    reduceRisk("delivery", 12 + sold * 0.08);
    reduceRisk("presale", 9 + sold * 0.06);
    coolStakeholder("buyers", 8);
    coolStakeholder("contractor", 5);
    notes.push(`「${project.title}」完成交付，结算 ${grossSettlement}：其中 ${debtPay} 被银行/工程款顺位截流，${settlementCash} 进入现金池。`);
  }
}

function projectRiskProfile(project, ledger = refreshProjectLedger()) {
  const progress = project.constructionProgress || 0;
  const soldRatio = project.saleableInventory ? (project.soldValue || 0) / project.saleableInventory : 0;
  const unsold = Math.max(0, (project.saleableInventory || 0) - (project.soldValue || 0));
  const marketValue = marketValueForProject(project, ledger);
  const bookValue = project.bookValue || 0;
  const escrowSupport = (project.escrowCash || 0) + (project.escrowUsedForConstruction || 0) * 0.85;
  const escrowGap = Math.max(0, (project.cashCollected || 0) * 0.28 - escrowSupport);
  const overdue = isProjectOverdue(project);
  const risks = [];

  if (project.stage === "delivered" && (project.quality || 0) > 34) {
    return { severity: 1, label: "已交付", detail: "项目已经把已售部分交出去，尾盘和维修仍会影响后续现金，但不再是保交楼压力。" };
  }
  if (project.stage === "land" || project.stage === "construction") risks.push({ severity: 2, label: "还在烧钱", detail: "还没形成稳定预售回款，利息和工程款会先跑。" });
  if (soldRatio >= 0.45 && progress < 58) risks.push({ severity: 4, label: "卖快楼慢", detail: "预售卖出去了，但工程进度没跟上，钱会变成交付责任。" });
  if (escrowGap >= 8) risks.push({ severity: 4, label: "监管缺口", detail: "项目回款和监管/工程沉淀不匹配，后面容易被业主、银行和住建穿透。" });
  if (overdue) risks.push({ severity: 5, label: "交付逾期", detail: "已过交付节点还没闭合，业主、政府和总包会同时施压。" });
  if (ledger.marketPriceIndex <= 92 && unsold >= 18) risks.push({ severity: 3, label: "库存压货", detail: "房价转冷时，剩余货值不等于现金，降价又会伤老业主。" });
  if (marketValue < bookValue * 0.78) risks.push({ severity: 3, label: "估值缩水", detail: "市场价值低于账面，银行会重估抵押物。" });
  if ((project.distressSold || 0) > 0) risks.push({ severity: 4, label: "被迫折价", detail: "已经卖过资产续命，后面买方和债权人会继续压价。" });
  if ((project.quality || 0) <= 34) risks.push({ severity: 3, label: "质量隐患", detail: "质量和维修风险会降低业主信任，并拖累交付信用。" });

  if (!risks.length) {
    if (["presale", "delivery", "delivered"].includes(project.stage)) return { severity: 1, label: "能解释", detail: "项目有回款和进度，暂时还能解释资产价值。" };
    return { severity: 1, label: "正常推进", detail: "项目还没形成明显拖累。" };
  }
  return risks.sort((a, b) => b.severity - a.severity)[0];
}

function projectDeliveryFailureReady(ledger = refreshProjectLedger()) {
  if (!ledger.projects.length) return false;
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const riskLedger = game.riskLedger || createRiskLedger();
  return ledger.projects.some((project) => {
    const progress = project.constructionProgress || 0;
    const sold = project.soldValue || 0;
    const soldRatio = project.saleableInventory ? sold / project.saleableInventory : 0;
    const risk = projectRiskProfile(project, ledger);
    const overdue = isProjectOverdue(project);
    const nearDelivery = project.stage === "delivery" || progress >= 72 || game.turn >= (project.deliveryTurn || 999) - 1;
    const stalledPresale = project.stage === "presale" && soldRatio >= 0.45 && progress < 58;
    const escrowCrisis = risk.label === "监管缺口" && sold >= 12;
    const enoughPressure =
      hidden.delivery_pressure >= 48 ||
      riskLedger.delivery >= 46 ||
      riskLedger.presale >= 52 ||
      visible.delivery <= 30 ||
      risk.severity >= 5;
    return sold >= 8 && enoughPressure && (overdue || nearDelivery || stalledPresale || escrowCrisis);
  });
}

function projectBuyerBlowupReady(ledger = refreshProjectLedger()) {
  if (!ledger.projects.length) return false;
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  return ledger.projects.some((project) => {
    const sold = project.soldValue || 0;
    const soldRatio = project.saleableInventory ? sold / project.saleableInventory : 0;
    const overdue = isProjectOverdue(project);
    return sold >= 8 && soldRatio >= 0.24 && (overdue || visible.public_trust <= 24 || hidden.buyer_liability >= 42);
  });
}

function projectFailureContribution(project, ledger = refreshProjectLedger()) {
  const value = marketValueForProject(project, ledger);
  const risk = projectRiskProfile(project, ledger);
  const sold = Math.round(project.soldValue || 0);
  const collected = Math.round(project.cashCollected || 0);
  const freeCash = Math.round(project.freeCashCollected || 0);
  const escrow = Math.round(project.escrowCash || 0);
  const progress = Math.round(project.constructionProgress || 0);
  const lastCash = project.lastCashTurn
    ? `最近第${project.lastCashTurn}回合到账：总回款${Math.round(project.lastCollection || 0)}，自由现金${Math.round(project.lastFreeCash || 0)}，监管${Math.round(project.lastEscrow || 0)}。`
    : "还没有真正产生可支配回款。";
  return `${project.title}：${projectStageName(project.stage)}，估值${value}，已售${sold}，总回款${collected}，进自由现金${freeCash}，监管${escrow}，进度${progress}%。${lastCash} 最大问题是${risk.label}：${risk.detail}`;
}

function projectLedgerBrief() {
  if (!game) return "";
  const ledger = refreshProjectLedger();
  const activeProjects = ledger.projects.filter((project) => {
    if (project.stage !== "delivered") return true;
    const risk = projectRiskProfile(project, ledger);
    return risk.severity >= 3;
  });
  const deliveredCount = ledger.projects.filter((project) => project.stage === "delivered").length;
  const projects = [...activeProjects]
    .sort((a, b) => marketValueForProject(b, ledger) - marketValueForProject(a, ledger))
    .slice(0, 3);
  const rows = projects.map((project) => {
    const value = marketValueForProject(project, ledger);
    return `
      <li>
        <span>${escapeHtml(project.title)}</span>
        <strong class="project-pill risk-${projectRiskProfile(project, ledger).severity}">${escapeHtml(projectCanCashLabel(project, ledger))}</strong>
        <small>${escapeHtml(projectShortStatus(project, ledger))}｜估值 ${value}</small>
      </li>
    `;
  }).join("");
  const fundingLedger = refreshFundingLedger();
  const empty = deliveredCount
    ? `<li><span>暂无待处理项目</span><strong>已交付 ${deliveredCount}</strong><small>已交付项目先归档；没有新地时，现金变化主要看付息 ${Math.round(fundingLedger.lastInterestPaid || 0)}、展期缺口 ${Math.round(fundingLedger.lastUnpaidDue || 0)} 和尾盘回款。</small></li>`
    : `<li><span>还没形成项目</span><strong>空</strong><small>先拿地，才有资产账本。</small></li>`;
  return `
    <div class="asset-brief">
      <div class="asset-brief-head">
        <span>项目账本</span>
        <strong>房价 ${ledger.marketPriceIndex}</strong>
      </div>
      <ol>${rows || empty}</ol>
    </div>
  `;
}

function applyProjectLedgerFromChoice(event, choice) {
  const ledger = ensureProjectLedger();
  const visibleEffects = choice.visibleEffects || {};
  const hiddenEffects = choice.hiddenEffects || {};
  const models = new Set([...(event.modelTags || []), ...(choice.models || [])]);
  const notes = [];
  const landGain = Math.max(0, visibleEffects.land_bank || 0);
  const landLoss = Math.max(0, -(visibleEffects.land_bank || 0));
  const cashOut = Math.max(0, -(visibleEffects.cash || 0));
  const debtGain = Math.max(0, visibleEffects.debt || 0);
  const salesGain = Math.max(0, visibleEffects.sales || 0);
  const deliveryGain = Math.max(0, visibleEffects.delivery || 0);

  if (landGain >= 4 && (cashOut > 0 || debtGain > 0 || models.has("land-finance-loop"))) {
    const bookValue = Math.max(8, Math.round(landGain * 1.8 + cashOut * 0.9 + debtGain * 0.65 + game.scaleIndex * 5));
    const saleableInventory = Math.max(bookValue + 6, Math.round(bookValue * (1.32 + Math.random() * 0.34)));
    const project = normalizeProjectRecord({
      id: `P${game.turn}-${ledger.projects.length + 1}`,
      title: projectTitleFromEvent(event, ledger),
      sourceEventId: event.id,
      acquiredTurn: game.turn,
      saleableTurn: game.turn + 2 + Math.floor(Math.random() * 3),
      deliveryTurn: game.turn + 12 + Math.floor(Math.random() * 7),
      stage: "land",
      bookValue,
      saleableInventory,
      soldValue: 0,
      cashCollected: 0,
      escrowCash: 0,
      constructionProgress: clamp(12 + deliveryGain * 3 + game.scaleIndex * 2, 8, 48),
      quality: clamp(game.state.visible.delivery + Math.max(0, hiddenEffects.delivery_pressure || 0) * -0.2, 20, 82)
    });
    ledger.projects.push(project);
    bumpRisk("inventory", Math.max(2, landGain * 0.55));
    bumpRisk("debt", debtGain * 0.25);
    notes.push(`项目账本新增「${project.title}」：土地变成账面资产，但还不是自由现金。`);
  }

  if ((landLoss >= 4 || models.has("cycle-asset-trader") || models.has("commercial-asset-exit") || choice.endingCandidate === "high_point_exit") && ledger.projects.length) {
    const project = [...ledger.projects].sort((a, b) => marketValueForProject(b, ledger) - marketValueForProject(a, ledger))[0];
    const saleSlice = Math.max(5, landLoss * 1.9 + (models.has("cycle-asset-trader") ? 8 : 0) + (models.has("commercial-asset-exit") ? 10 : 0));
    const marketValue = marketValueForProject(project, ledger);
    const closedValue = Math.min(marketValue, Math.round(saleSlice * (0.92 + ledger.marketPriceIndex / 260)));
    if (closedValue > 0) {
      const freeCashFromSale = Math.max(0, Math.round(closedValue * 0.18));
      project.bookValue = Math.max(0, project.bookValue - Math.round(closedValue * 0.62));
      project.saleableInventory = Math.max(project.soldValue || 0, (project.saleableInventory || 0) - closedValue);
      project.cashCollected = (project.cashCollected || 0) + closedValue;
      project.freeCashCollected = (project.freeCashCollected || 0) + freeCashFromSale;
      project.lastCollection = closedValue;
      project.lastFreeCash = freeCashFromSale;
      project.lastEscrow = 0;
      project.lastCashTurn = game.turn;
      ledger.freeCashCollected += freeCashFromSale;
      ledger.lastCollection += closedValue;
      ledger.lastFreeCash += freeCashFromSale;
      bumpRisk("exit", models.has("exit-discipline") ? 2 : 5);
      notes.push(`项目账本出售「${project.title}」一部分：资产少了，退出窗口和债权人解释同时出现。`);
    }
  }

  if (deliveryGain > 0 && ledger.projects.length) {
    const target = [...ledger.projects].filter((project) => project.stage !== "delivered").sort((a, b) => (a.constructionProgress || 0) - (b.constructionProgress || 0))[0];
    if (target) {
      target.constructionProgress = clamp((target.constructionProgress || 0) + deliveryGain * 2 + Math.random() * 4, 0, 100);
      if (target.constructionProgress >= 92 && target.stage === "delivery") target.stage = "delivered";
      notes.push(`「${target.title}」进度被推进，交付责任开始有实体支撑。`);
    }
  }

  if (salesGain > 0 && ledger.projects.length) {
    const target = [...ledger.projects].filter((project) => ["presale", "delivery"].includes(project.stage)).sort((a, b) => (b.saleableInventory || 0) - (a.saleableInventory || 0))[0];
    if (target) {
      target.saleHeat = clamp((target.saleHeat || 0) + salesGain * 2, 0, 100);
    }
  }

  refreshProjectLedger();
  ledger.lastNote = notes.at(-1) || ledger.lastNote;
  return { note: notes.join(" ") };
}

function projectDistressSaleCandidate(ledger = refreshProjectLedger()) {
  return [...(ledger.projects || [])]
    .filter((project) => marketValueForProject(project, ledger) > 0)
    .sort((a, b) => marketValueForProject(b, ledger) - marketValueForProject(a, ledger))[0] || null;
}

function distressSaleDiscount(project, ledger, fundingLedger) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const stress = game.stakeholderStress || createStakeholderStress();
  let discount = 0.82;
  discount += Math.max(0, visible.government - 45) * 0.0025;
  discount += Math.max(0, visible.bank - 40) * 0.002;
  discount += Math.max(0, (game.relations?.state_capital || 0) - 20) * 0.0018;
  discount -= Math.max(0, 42 - visible.sales) * 0.003;
  discount -= Math.max(0, 32 - visible.government) * 0.0035;
  discount -= Math.max(0, 32 - visible.bank) * 0.003;
  discount -= Math.max(0, 100 - (ledger.marketPriceIndex || 100)) * 0.004;
  discount -= Math.max(0, (fundingLedger.fundingStress || 0) - 50) * 0.0018;
  discount -= Math.max(0, (game.riskLedger?.competitor || 0) - 30) * 0.0015;
  discount -= Math.max(0, stress.competitors - 32) * 0.0012;
  discount -= Math.max(0, (hidden.asset_freeze_risk || 0) - 24) * 0.0022;
  discount -= Math.max(0, (hidden.legal_exposure || 0) - 28) * 0.0016;
  discount -= game.phaseIndex * 0.012;
  if (project.stage === "land") discount -= 0.04;
  if (project.stage === "construction") discount -= 0.05;
  if (project.stage === "impaired") discount -= 0.12;
  discount += Math.random() * 0.16 - 0.08;
  return clampNumber(discount, 0.42, 0.9);
}

function shouldAttemptDistressAssetSale(fundingLedger) {
  const visible = game.state.visible;
  const fundingPressure = (fundingLedger.interestDue || 0) + (fundingLedger.rolloverNeed || 0);
  return (
    visible.cash <= 4 ||
    (game.flags.cashZeroTurns || 0) >= 1 ||
    (visible.cash <= 12 && (fundingLedger.fundingStress || 0) >= 70) ||
    (visible.cash <= 16 && fundingPressure >= 14)
  );
}

function reduceRisk(key, amount) {
  if (!amount || amount <= 0) return;
  game.riskLedger[key] = Math.max(0, Math.round((game.riskLedger[key] || 0) - amount));
}

function latestDistressSaleIncident() {
  return [...(game.incidentLog || [])].reverse().find((entry) => entry.type === "distress-sale" || entry.type === "distress-sale-blocked");
}

function tryDistressAssetSale(event, choice) {
  const fundingLedger = refreshFundingLedger();
  if (!shouldAttemptDistressAssetSale(fundingLedger)) return false;
  if (game.flags.lastDistressSaleTurn === game.turn) return false;
  game.flags.lastDistressSaleTurn = game.turn;

  const ledger = refreshProjectLedger();
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const candidate = projectDistressSaleCandidate(ledger);
  const saleEvent = event || eventById(game.currentEvent);
  const saleChoice = choice || { label: "现金危机处置" };

  if (!candidate || (ledger.marketAssetValue || 0) <= 0) {
    recordIncident(saleEvent, saleChoice, "distress-sale-blocked", "现金已经见底，但项目账本里没有能立刻处置的资产。这里不是单纯没钱，而是流动性危机没有资产缓冲。");
    return false;
  }

  const legalBlockChance = clampNumber(
    Math.max(0, (hidden.asset_freeze_risk || 0) - 52) / 95 +
      Math.max(0, (hidden.legal_exposure || 0) - 58) / 120 +
      Math.max(0, (game.riskLedger?.legal || 0) - 60) / 140,
    0,
    0.72
  );
  if (legalBlockChance > 0.12 && Math.random() < legalBlockChance) {
    hidden.asset_freeze_risk = clamp((hidden.asset_freeze_risk || 0) + 3);
    hidden.legal_exposure = clamp((hidden.legal_exposure || 0) + 2);
    hidden.boss_safety = clamp((hidden.boss_safety || 0) - 2);
    bumpRisk("legal", 5);
    bumpRisk("exit", 5);
    recordIncident(saleEvent, saleChoice, "distress-sale-blocked", `你想处置「${candidate.title}」，但债权人保全、项目账户监管和旧合同先卡住了。账面有资产，不代表资产还能按你的顺序变现。`);
    enqueueFeedback("bank", "warning", 6, 1, "资产处置先别写进现金流。保全、抵押、监管户和债权人顺位没谈清，银行不会把它当可用钱。");
    return false;
  }

  const marketValue = marketValueForProject(candidate, ledger);
  const discount = distressSaleDiscount(candidate, ledger, fundingLedger);
  const fundingPressure = (fundingLedger.interestDue || 0) + Math.round((fundingLedger.rolloverNeed || 0) * 0.45);
  const cashGap = Math.max(0, 18 + game.scaleIndex * 3 + fundingPressure - visible.cash);
  const stressSliceRatio = clampNumber(0.22 + Math.max(0, (fundingLedger.fundingStress || 0) - 55) / 320 + game.phaseIndex * 0.018, 0.22, 0.52);
  const maxSlice = Math.max(4, Math.round(marketValue * stressSliceRatio));
  const requiredSlice = Math.ceil(cashGap / Math.max(0.32, discount * 0.58));
  const sliceMarket = Math.min(marketValue, Math.max(4, Math.min(maxSlice, requiredSlice || 4)));
  const gross = Math.max(1, Math.round(sliceMarket * discount));
  let creditorTakeRatio = clampNumber(
    0.22 +
      visible.debt / 220 +
      (fundingLedger.fundingStress || 0) / 270 +
      Math.max(0, (hidden.asset_freeze_risk || 0) - 20) / 260 -
      visible.government / 450 -
      visible.bank / 520,
    0.24,
    0.78
  );
  if ((game.relations?.state_capital || 0) >= 36 && visible.government >= 38) creditorTakeRatio += 0.04;
  const debtPay = Math.min(gross, Math.max(0, Math.round(gross * clampNumber(creditorTakeRatio, 0.24, 0.82))));
  const freeCash = Math.max(0, gross - debtPay);

  candidate.bookValue = Math.max(0, Math.round((candidate.bookValue || 0) - sliceMarket * 0.62));
  candidate.saleableInventory = Math.max(candidate.soldValue || 0, Math.round((candidate.saleableInventory || 0) - sliceMarket));
  candidate.cashCollected = Math.round((candidate.cashCollected || 0) + gross);
  candidate.freeCashCollected = Math.round((candidate.freeCashCollected || 0) + freeCash);
  candidate.lastCollection = gross;
  candidate.lastFreeCash = freeCash;
  candidate.lastEscrow = 0;
  candidate.lastCashTurn = game.turn;
  candidate.distressSold = Math.round((candidate.distressSold || 0) + sliceMarket);
  if (sliceMarket >= marketValue * 0.42 || discount <= 0.52) candidate.stage = "impaired";

  visible.cash = clamp(visible.cash + freeCash);
  visible.debt = clamp(visible.debt - Math.max(0, Math.round(debtPay * 0.55)));
  visible.land_bank = clamp(visible.land_bank - Math.max(1, Math.round(sliceMarket * 0.16)));
  visible.sales = clamp(visible.sales - Math.max(1, Math.round((1 - discount) * 6)));
  visible.bank = clamp(visible.bank + (debtPay >= gross * 0.45 ? 1 : -1));
  visible.government = clamp(visible.government + ((game.relations?.state_capital || 0) >= 36 ? 1 : -1));

  hidden.exit_preparation = clamp((hidden.exit_preparation || 0) + 4);
  hidden.local_isolation = clamp((hidden.local_isolation || 0) + Math.max(1, Math.round((1 - discount) * 4)));
  hidden.price_bubble = clamp((hidden.price_bubble || 0) - 1);
  hidden.financing_cost = clamp((hidden.financing_cost || 0) - Math.max(0, Math.round(debtPay * 0.08)));
  if (discount <= 0.58) hidden.asset_freeze_risk = clamp((hidden.asset_freeze_risk || 0) + 1);

  ledger.freeCashCollected += freeCash;
  ledger.lastCollection += gross;
  ledger.lastFreeCash += freeCash;
  ledger.lastDistressSale = {
    turn: game.turn,
    projectTitle: candidate.title,
    marketSlice: sliceMarket,
    discount,
    gross,
    debtPay,
    freeCash
  };
  addFunding("assetSaleCash", gross);
  const repaid = reduceFundingDebt(debtPay);
  reduceRisk("liquidity", freeCash * 1.2 + repaid * 0.2);
  reduceRisk("debt", repaid * 0.55);
  reduceRisk("interest", repaid * 0.4);
  reduceRisk("inventory", sliceMarket * 0.18);
  bumpRisk("exit", 3 + Math.max(0, (1 - discount) * 10));
  bumpRisk("competitor", Math.max(1, (1 - discount) * 5));
  coolStakeholder("bank", Math.min(5, repaid * 0.22));
  bumpStakeholder("competitors", Math.max(2, (1 - discount) * 8));

  refreshProjectLedger();
  refreshFundingLedger();
  if (visible.cash > 0) game.flags.cashZeroTurns = 0;

  const discountText = `${Math.round(discount * 100)}折`;
  const text = `现金见底后，你把「${candidate.title}」按约 ${discountText} 处置：成交 ${gross}，其中 ${debtPay} 先被债权人、工程款和展期条件拿走，真正回到现金池 ${freeCash}。这说明没现金不等于马上破产，但资产也不是按账面价格随时变现。`;
  ledger.lastNote = text;
  fundingLedger.lastWarning = text;
  recordIncident(saleEvent, saleChoice, "distress-sale", text);
  enqueueFeedback(
    (game.relations?.state_capital || 0) >= 36 ? "stateCapital" : "bank",
    "warning",
    6,
    1,
    "这不是正常卖项目，是流动性危机下的折价处置。价格、顺位和谁先拿钱，会决定你只是喘口气，还是把最后的好资产卖掉。"
  );
  return true;
}

function applyScaleCreditBuffer(fromScaleIndex, toScaleIndex) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const fundingLedger = refreshFundingLedger();
  const creditRoom = 11 + toScaleIndex * 4;
  const cashBuffer = Math.max(7, Math.round(creditRoom * 0.68));
  const bankBoost = 6 + toScaleIndex * 2;
  const governmentBoost = 4 + Math.min(7, toScaleIndex * 2);
  visible.cash = clamp(visible.cash + cashBuffer);
  visible.bank = clamp(visible.bank + bankBoost);
  visible.government = clamp(visible.government + governmentBoost);
  visible.public_trust = clamp(visible.public_trust + 3);
  hidden.boss_safety = clamp(hidden.boss_safety + 6);
  hidden.local_isolation = clamp((hidden.local_isolation || 0) - 8);
  hidden.financing_cost = clamp((hidden.financing_cost || 0) - 5);
  game.relations.bank_manager = clamp((game.relations.bank_manager || 0) + 4);
  game.relations.local_official = clamp((game.relations.local_official || 0) + 3);
  game.relations.state_capital = clamp((game.relations.state_capital || 0) + 2);
  coolStakeholder("bank", 8 + toScaleIndex);
  coolStakeholder("local", 7 + toScaleIndex);
  coolStakeholder("buyers", 4);
  fundingLedger.rolloverNeed = Math.max(0, Math.round((fundingLedger.rolloverNeed || 0) - (5 + toScaleIndex * 2)));
  reduceRisk("liquidity", cashBuffer * 1.2);
  reduceRisk("interest", 7 + toScaleIndex * 2);
  reduceRisk("official", 6);
  reduceRisk("government", 5);
  game.flags.scaleGraceUntilTurn = Math.max(game.flags.scaleGraceUntilTurn || 0, game.turn + 4);
  game.flags.scaleGraceCharges = Math.max(game.flags.scaleGraceCharges || 0, 2);
  refreshFundingLedger();
  const text = `升阶后新增授信和协调空间：现金缓冲 +${cashBuffer}，银行口子 +${bankBoost}，地方入口 +${governmentBoost}。接下来 ${Math.max(1, (game.flags.scaleGraceUntilTurn || game.turn) - game.turn)} 回合内，银行和地方会给你两次处置窗口，但不是免死。`;
  game.incidentLog.push({
    turn: game.turn,
    type: "scale-credit-buffer",
    eventId: game.currentEvent,
    eventTitle: "升阶缓冲",
    choiceLabel: `${DATA.scales[fromScaleIndex]?.title || ""} -> ${DATA.scales[toScaleIndex]?.title || ""}`,
    text
  });
  enqueueFeedback("bank", "positive", 5, 1, "你现在不是原来那个小盘老板了。银行会重新看连续项目、抵押物和地方协调，但窗口期很短。");
  enqueueFeedback("government", "official", 5, 1, "桌子大了，入口也大了。地方可以帮你协调一次，但项目、账户和稳定责任也会一起上来。");
}

function deferScaleGraceEnding(endingId, event, choice) {
  if (!SCALE_GRACE_ENDINGS.has(endingId)) return false;
  if ((game.flags.scaleGraceUntilTurn || 0) < game.turn) return false;
  if ((game.flags.scaleGraceCharges || 0) <= 0) return false;
  const ids = endingId === "cash_break"
    ? ["interest-rollover-friday", "bank-branch-risk-meeting", "project-sale-window", "private-fund-bridge-weekend"]
    : endingId === "delivery_failure" || endingId === "buyer_blowup"
      ? ["local-task-force-night", "white-list-application-review", "presale-supervision-account", "homebuyer-lawyer-letter"]
      : ["bank-branch-risk-meeting", "final-creditor-meeting", "project-sale-window", "trust-covenant-review"];
  recordIncident(event, choice, "scale-grace", `原本会进入「${DATA.endings[endingId]?.title || endingId}」，但刚升阶后的授信和协调窗口先把你推到银行、债权人和资产处置桌。下一题必须处理，不是免死。`);
  enqueueOneOf(ids, 0, "刚升阶后的信用窗口被用来争取一次展期、资产处置或债权人谈判。");
  game.flags.scaleGraceCharges = Math.max(0, (game.flags.scaleGraceCharges || 0) - 1);
  if (game.flags.scaleGraceCharges <= 0) game.flags.scaleGraceUntilTurn = Math.min(game.flags.scaleGraceUntilTurn || 0, game.turn);
  return true;
}

function marketPriceDrift(event, choice) {
  const phaseDrift = {
    "early-expansion": 2.4,
    "shelter-reform-boom": 2.7,
    "high-turnover": 1.35,
    "three-red-lines": -0.7,
    "sales-freeze": -1.8,
    "guaranteed-delivery": -1.0,
    clearance: -1.4
  }[currentPhase().id] || 0;
  const visible = choice.visibleEffects || {};
  const hidden = choice.hiddenEffects || {};
  let drift = phaseDrift + cyclePriceDriftAdjust() + (Math.random() * 2 - 1);
  if (["early-expansion", "shelter-reform-boom"].includes(currentPhase().id) && Math.random() < 0.22) {
    drift += 3 + Math.random() * 5.5;
  }
  if (currentPhase().id === "high-turnover" && Math.random() < 0.14) {
    drift += 2 + Math.random() * 4;
  }
  if (currentPhase().id === "three-red-lines" && Math.random() < 0.12) {
    drift -= 2 + Math.random() * 4.5;
  }
  if (["sales-freeze", "guaranteed-delivery", "clearance"].includes(currentPhase().id) && Math.random() < 0.22) {
    drift -= 3 + Math.random() * 6.5;
  }
  drift += Math.max(0, visible.sales || 0) * 0.07;
  drift -= Math.max(0, -(visible.sales || 0)) * 0.08;
  drift += Math.max(0, hidden.price_bubble || 0) * 0.035;
  drift -= Math.max(0, game.riskLedger.inventory || 0) * 0.012;
  if (event.modelTags?.includes("inventory-overhang")) drift -= 0.8;
  if (event.modelTags?.includes("state-purchase-floor")) drift += 0.4;
  return drift;
}

function advanceProjectLedger(event, choice) {
  const ledger = ensureProjectLedger();
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const notes = [];
  ledger.lastCollection = 0;
  ledger.lastFreeCash = 0;
  ledger.lastEscrowAdded = 0;
  const previousPrice = ledger.marketPriceIndex || 100;
  ledger.marketPriceIndex = Math.round(clampNumber(previousPrice + marketPriceDrift(event, choice), 68, 142));
  ledger.lastPriceChange = ledger.marketPriceIndex - previousPrice;
  if (ledger.lastPriceChange >= 4 && isBoomPhase()) {
    visible.sales = clamp(visible.sales + 2);
    hidden.price_bubble = clamp((hidden.price_bubble || 0) + 2);
    notes.push(`房价突然上跳 ${ledger.lastPriceChange} 点，售楼处更热，抵押物更好看，泡沫也更厚。`);
  }
  if (ledger.lastPriceChange <= -4 && isDownturnPhase()) {
    visible.sales = clamp(visible.sales - 3);
    visible.bank = clamp(visible.bank - 2);
    hidden.price_bubble = clamp((hidden.price_bubble || 0) + 1);
    bumpRisk("inventory", Math.abs(ledger.lastPriceChange) * 1.2);
    notes.push(`房价急跌 ${Math.abs(ledger.lastPriceChange)} 点，客户观望、银行重估、库存压力同时上来。`);
  }

  ledger.projects.forEach((project) => {
    project.lastCollection = 0;
    project.lastFreeCash = 0;
    project.lastEscrow = 0;
    project.lastConstructionDraw = 0;
    project.lastProgressGain = 0;

    if (project.stage === "land" && game.turn > project.acquiredTurn) {
      project.stage = "construction";
      notes.push(`「${project.title}」从土地储备进入在建。`);
    }

    if (project.stage === "construction") {
      const progressGain = clampNumber(2.8 + visible.delivery / 38 + Math.random() * 4.6 - Math.max(0, hidden.delivery_pressure - 48) / 28, 0, 9);
      project.constructionProgress = clamp((project.constructionProgress || 0) + progressGain, 0, 100);
      if (game.turn >= project.saleableTurn || project.constructionProgress >= 46) {
        project.stage = "presale";
        notes.push(`「${project.title}」开始形成可售货值。`);
      }
    }

    if (project.stage === "presale" || project.stage === "delivery") {
      const liquidity = projectLiquidityProfile(project, ledger);
      const collection = Math.min(liquidity.remaining, Math.max(0, Math.round(liquidity.expectedCollection * (0.72 + Math.random() * 0.58))));
      if (collection > 0) {
        const escrowRatio = clampNumber(0.24 + game.phaseIndex * 0.035 + Math.max(0, hidden.presale_misuse - 28) / 260, 0.22, 0.58);
        const freeRatio = clampNumber(0.46 - game.phaseIndex * 0.025 + Math.max(0, visible.bank - 45) / 420, 0.24, 0.48);
        const escrow = Math.min(collection, Math.max(1, Math.round(collection * escrowRatio)));
        const freeCash = Math.max(0, Math.min(collection - escrow, Math.round(collection * freeRatio)));
        const liability = Math.max(1, collection - freeCash - Math.round(escrow * 0.45));
        project.soldValue += collection;
        project.cashCollected = (project.cashCollected || 0) + collection;
        project.freeCashCollected = (project.freeCashCollected || 0) + freeCash;
        project.escrowCash = (project.escrowCash || 0) + escrow;
        project.lastCollection = collection;
        project.lastFreeCash = freeCash;
        project.lastEscrow = escrow;
        project.lastCashTurn = game.turn;
        ledger.freeCashCollected += freeCash;
        ledger.lastCollection += collection;
        ledger.lastFreeCash += freeCash;
        ledger.lastEscrowAdded += escrow;
        addFunding("presaleCash", collection);
        addFunding("mortgageFlow", freeCash);
        visible.cash = clamp(visible.cash + freeCash);
        hidden.buyer_liability = clamp((hidden.buyer_liability || 0) + Math.max(1, Math.round(liability * 0.08)));
        hidden.delivery_pressure = clamp(hidden.delivery_pressure + Math.max(0, Math.round(collection * 0.035) - Math.round((project.constructionProgress || 0) / 60)));
        bumpRisk("presale", Math.max(1, liability * 0.12));
        bumpRisk("delivery", Math.max(1, Math.max(0, 58 - (project.constructionProgress || 0)) * 0.05));
        notes.push(`「${project.title}」回款 ${collection}，其中 ${freeCash} 变成可用现金，其余变成交付和监管责任。`);
      }
      advanceProjectConstruction(project, notes);
      maybeDeliverProject(project, notes);
    }

    const unsold = Math.max(0, (project.saleableInventory || 0) - (project.soldValue || 0));
    if (ledger.marketPriceIndex <= 92 && unsold >= 18 && project.stage !== "delivered") {
      hidden.price_bubble = clamp(hidden.price_bubble + 1);
      bumpRisk("inventory", 3 + unsold * 0.04);
    }
    if (isProjectOverdue(project)) {
      hidden.delivery_pressure = clamp(hidden.delivery_pressure + 2);
      visible.public_trust = clamp(visible.public_trust - 1);
      bumpRisk("delivery", 5);
    }
  });

  refreshProjectLedger();
  if (["early-expansion", "shelter-reform-boom", "high-turnover"].includes(currentPhase().id) && ledger.marketPriceIndex >= 108 && ledger.collateralValue >= visible.debt * 0.55 && visible.bank >= 28) {
    const roomCash = Math.max(0, Math.min(6, Math.round((ledger.collateralValue - visible.debt * 0.5) * 0.08)));
    if (roomCash > 0 && Math.random() < 0.5) {
      visible.cash = clamp(visible.cash + roomCash);
      visible.debt = clamp(visible.debt + Math.max(1, Math.round(roomCash * 0.45)));
      hidden.financing_cost = clamp((hidden.financing_cost || 0) + 1);
      addFunding("bankLoan", Math.max(1, Math.round(roomCash * 0.65)));
      notes.push(`房价上行抬高抵押空间，银行多给了 ${roomCash} 周转；这是真现金，也是新债。`);
    }
  }
  if (ledger.marketPriceIndex <= 90 && ledger.unsoldInventory >= 24) {
    enqueueOneOf(["lower-tier-inventory-night", "discount-sale-stampede", "state-purchase-inventory"], 2, "房价指数下行后，账面货值和真实回款开始分叉。");
  }
  if (ledger.collateralValue < Math.max(12, visible.debt * 0.42) && visible.debt >= 50) {
    enqueueOneOf(["bank-branch-risk-meeting", "trust-covenant-review", "bank-loan-withdrawal"], 2, "抵押物折扣不够覆盖债务，银行开始重新估值。");
  }
  if (notes.length) {
    ledger.lastNote = notes.at(-1);
    game.incidentLog.push({
      turn: game.turn,
      type: "project-ledger",
      eventId: event.id,
      eventTitle: "项目账本滚动",
      choiceLabel: choice.label,
      text: notes.join(" ")
    });
  }
}

function advanceFundingLedger(event, choice) {
  const ledger = refreshFundingLedger();
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const notes = [];
  const rawCarry = fundingCarryRaw(ledger);
  let maturityPressure = 0;
  ledger.lastInterestPaid = 0;
  ledger.lastUnpaidDue = 0;

  if (game.turn % 5 === 0 && (ledger.commercialPaper || 0) >= 10) {
    const maturity = Math.max(1, Math.round(ledger.commercialPaper * (0.1 + Math.random() * 0.08)));
    maturityPressure += maturity;
    bumpStakeholder("suppliers", maturity * 0.8);
    enqueueOneOf(["commercial-paper-maturity", "supplier-bill-discount", "supplier-blockade"], 1, "商票不是免费延期，材料圈开始按折价和到期日行动。");
    notes.push(`商票到期压力 ${maturity} 被推到本轮付款表。`);
  }

  if (game.turn % 7 === 0 && (ledger.trustLoan || 0) >= 14) {
    const maturity = Math.max(1, Math.round(ledger.trustLoan * (0.08 + Math.random() * 0.08)));
    maturityPressure += maturity;
    bumpStakeholder("bank", maturity * 0.55);
    enqueueOneOf(["trust-covenant-review", "personal-guarantee-call", "bank-branch-risk-meeting"], 1, "信托和非标资金开始查底层项目、流水和抵押。");
    notes.push(`信托/非标检查带来展期缺口 ${maturity}。`);
  }

  if (game.scaleIndex >= 3 && game.turn % 9 === 0 && (ledger.bondDebt || 0) >= 18) {
    const maturity = Math.max(2, Math.round(ledger.bondDebt * (0.08 + Math.random() * 0.06)));
    maturityPressure += maturity;
    enqueueOneOf(["offshore-bond-due", "ad-hoc-creditor-term-sheet", "liquidation-petition"], 2, "债券钱不会永远听增长故事，债权人开始要求清偿顺位。");
    notes.push(`债券/债委会压力 ${maturity} 进入展期桌面。`);
  }

  const boomRefinanceDiscount = boomMarketBuffer() ? 0.52 : 1;
  const downturnSqueeze = isDownturnPhase() && (refreshProjectLedger().lastPriceChange || 0) <= -4 ? 1.25 : 1;
  const localCoordinationFactor = clampNumber(
    1 -
      Math.max(0, visible.government - 45) / 300 -
      Math.max(0, (game.relations?.local_official || 0) - 18) / 460 +
      Math.max(0, 30 - visible.government) / 130 +
      Math.max(0, (hidden.local_isolation || 0) - 35) / 150,
    0.72,
    1.28
  );
  const scaleGraceFactor = (game.flags.scaleGraceUntilTurn || 0) >= game.turn ? 0.82 : 1;
  const carryDue = Math.max(0, Math.round(rawCarry * (0.72 + game.scaleIndex * 0.04 + Math.max(0, ledger.fundingStress - 35) / 170) * boomRefinanceDiscount * downturnSqueeze * localCoordinationFactor * scaleGraceFactor));
  const due = carryDue + maturityPressure;
  ledger.interestDue = due;

  if (due > 0) {
    const cashBuffer = game.phaseIndex >= 4 ? 8 : 6;
    const payable = Math.max(0, visible.cash - cashBuffer);
    const paid = Math.min(due, payable);
    if (paid > 0) {
      visible.cash = clamp(visible.cash - paid);
      ledger.interestPaid = Math.round((ledger.interestPaid || 0) + paid);
      ledger.lastInterestPaid = paid;
      if (paid >= due) {
        ledger.rolloverNeed = Math.max(0, Math.round((ledger.rolloverNeed || 0) - 1));
        notes.push(`本轮付息 ${paid}，融资链暂时没有失控。`);
      }
    }
    const unpaid = Math.max(0, due - paid);
    ledger.lastUnpaidDue = unpaid;
    if (unpaid > 0) {
      addFunding("rolloverNeed", unpaid);
      visible.debt = clamp(visible.debt + Math.max(1, Math.round(unpaid * 0.45)));
      visible.bank = clamp(visible.bank - Math.max(1, Math.round(unpaid * 0.18)));
      hidden.financing_cost = clamp((hidden.financing_cost || 0) + Math.max(1, Math.round(unpaid * 0.65)));
      bumpRisk("liquidity", unpaid * 1.2);
      bumpRisk("interest", unpaid * 1.4);
      bumpRisk("debt", unpaid * 0.9);
      notes.push(`本轮付息/到期缺口 ${unpaid} 被滚成展期压力。`);
    }
  }

  refreshFundingLedger();
  if (ledger.collateralBorrowingRoom < -8 && visible.debt >= 38) {
    visible.bank = clamp(visible.bank - 2);
    hidden.financing_cost = clamp((hidden.financing_cost || 0) + 2);
    bumpRisk("interest", 4);
    bumpRisk("debt", 4);
    enqueueOneOf(["bank-branch-risk-meeting", "bank-loan-withdrawal", "trust-covenant-review"], 1, "项目资产被重新打折，抵押物不够覆盖融资，银行开始收口。");
    notes.push("抵押空间转负，银行会重新看地价、房价和项目进度。");
  } else if (ledger.collateralBorrowingRoom >= 18 && visible.bank >= 35 && currentPhase().id !== "sales-freeze") {
    visible.bank = clamp(visible.bank + 1);
    ledger.rolloverNeed = Math.max(0, Math.round((ledger.rolloverNeed || 0) - 1));
    notes.push("抵押空间还有余地，银行暂时愿意继续谈。");
  }

  if ((ledger.presaleCash || 0) >= 28 && game.phaseIndex >= 3) {
    bumpRisk("presale", Math.max(1, (ledger.presaleCash || 0) * 0.035));
    if ((ledger.presaleCash || 0) > (refreshProjectLedger().escrowCash || 0) * 1.8 + 20) {
      hidden.presale_misuse = clamp(hidden.presale_misuse + 1);
      enqueueOneOf(["escrow-gap-screenshot", "escrow-ledger-audit", "presale-supervision-account"], 2, "预售回款和监管账户余额开始对不上。");
      notes.push("预售回款累计较高，但监管/工程进度没有完全解释它。");
    }
  }

  if ((ledger.stateBridge || 0) >= 10) {
    hidden.political_dependency = clamp(hidden.political_dependency + (game.turn % 4 === 0 ? 1 : 0));
  }

  refreshFundingLedger();
  if (notes.length) {
    ledger.lastWarning = notes.at(-1);
    game.incidentLog.push({
      turn: game.turn,
      type: "funding-ledger",
      eventId: event.id,
      eventTitle: "融资账本滚动",
      choiceLabel: choice.label,
      text: notes.join(" ")
    });
  }
}

function bumpRisk(key, amount) {
  if (!amount || amount <= 0) return;
  game.riskLedger[key] = Math.min(120, (game.riskLedger[key] || 0) + amount);
}

function updateRiskLedger(event, choice, tradeoff, funding = {}) {
  const visible = { ...(choice.visibleEffects || {}), ...(tradeoff.visible || {}), ...(funding.visible || {}) };
  const hidden = { ...(choice.hiddenEffects || {}), ...(tradeoff.hidden || {}), ...(funding.hidden || {}) };
  const relation = { ...(choice.relationEffects || {}), ...(tradeoff.relation || {}) };
  const models = new Set([...(event.modelTags || []), ...(choice.models || [])]);
  const severityWeight = { routine: 1, pressure: 2, high: 3, crisis: 4 }[event.severity] || 1;

  bumpRisk("liquidity", Math.max(0, -visible.cash) * 0.8 + Math.max(0, visible.debt) * 0.35 + Math.max(0, -visible.bank) * 0.5);
  bumpRisk("debt", Math.max(0, visible.debt) * 0.8 + Math.max(0, hidden.off_balance_debt) * 0.9 + Math.max(0, -visible.cash) * 0.25);
  bumpRisk("delivery", Math.max(0, -visible.delivery) * 0.8 + Math.max(0, hidden.delivery_pressure) + Math.max(0, hidden.presale_misuse) * 0.45);
  bumpRisk("buyers", Math.max(0, -visible.public_trust) + Math.max(0, hidden.price_bubble) * 0.45 + Math.max(0, -visible.sales) * 0.35);
  bumpRisk("interest", Math.max(0, hidden.financing_cost) + Math.max(0, visible.debt) * 0.25 + Math.max(0, hidden.off_balance_debt) * 0.25);
  bumpRisk("presale", Math.max(0, hidden.buyer_liability) + Math.max(0, hidden.presale_misuse) * 0.55 + Math.max(0, hidden.delivery_pressure) * 0.35);
  bumpRisk("official", Math.max(0, hidden.political_dependency) * 0.7 + Math.max(0, hidden.local_isolation) * 0.8 + Math.max(0, hidden.control_loss || 0) * 0.5 + Math.max(0, -visible.government) * 0.6 + Math.max(0, visible.government - 3) * 0.25);
  bumpRisk("legal", Math.max(0, hidden.legal_exposure) + Math.max(0, hidden.asset_freeze_risk) * 0.8 + Math.max(0, hidden.presale_misuse) * 0.25);
  bumpRisk("gray", Math.max(0, hidden.gray_risk) * 1.1 + Math.max(0, relation.underground || 0) * 0.9);
  bumpRisk("exit", Math.max(0, hidden.exit_preparation) + Math.max(0, hidden.asset_freeze_risk) * 0.35);
  bumpRisk("inventory", Math.max(0, -visible.sales) * 0.8 + Math.max(0, hidden.price_bubble) * 0.35 + Math.max(0, visible.land_bank) * 0.25);
  bumpRisk("audit", Math.max(0, hidden.data_inflation) + Math.max(0, visible.debt) * 0.15);

  if (models.has("leverage-backfire") || models.has("balance-sheet-maintenance")) {
    bumpRisk("debt", 2 + severityWeight);
    bumpRisk("interest", 2 + severityWeight);
  }
  if (models.has("presale-cashflow-trap") || models.has("escrow-control")) {
    bumpRisk("delivery", 2 + severityWeight);
    bumpRisk("presale", 2 + severityWeight);
  }
  if (models.has("delivery-first")) bumpRisk("liquidity", severityWeight);
  if (models.has("gray-governance")) {
    bumpRisk("gray", 3 + severityWeight);
    bumpRisk("blackmail", 2 + severityWeight);
  }
  if (models.has("political-embedded-enterprise") || models.has("land-fiscal-pressure")) bumpRisk("official", 2 + severityWeight);
  if (models.has("asset-freeze-chain") || models.has("legal-exposure")) bumpRisk("legal", 3 + severityWeight);
  if (models.has("cycle-asset-trader") || models.has("commercial-asset-exit")) bumpRisk("exit", 2 + severityWeight);
  if (models.has("data-inflation") || models.has("audit-revenue-recognition")) bumpRisk("audit", 2 + severityWeight);
  if (models.has("government-permit-power")) bumpRisk("government", 4 + severityWeight);
  if (models.has("counterparty-retaliation")) bumpRisk("counterparty", 4 + severityWeight);
  if (models.has("competitor-pressure")) bumpRisk("competitor", 4 + severityWeight);
  if (models.has("protective-umbrella-risk")) bumpRisk("blackmail", 4 + severityWeight);
  if (models.has("pre-sale-funds-leak")) {
    bumpRisk("presale", 4 + severityWeight);
    bumpRisk("legal", 2 + severityWeight);
    bumpRisk("buyers", 2 + severityWeight);
  }
  if (models.has("bid-rigging-chain")) {
    bumpRisk("legal", 4 + severityWeight);
    bumpRisk("government", 3 + severityWeight);
    bumpRisk("competitor", 2 + severityWeight);
  }
  if (models.has("low-bid-change-order")) {
    bumpRisk("counterparty", 4 + severityWeight);
    bumpRisk("delivery", 2 + severityWeight);
    bumpRisk("legal", 2 + severityWeight);
  }
  if (models.has("shadow-banking-loop")) {
    bumpRisk("interest", 4 + severityWeight);
    bumpRisk("debt", 3 + severityWeight);
    bumpRisk("legal", 2 + severityWeight);
  }
  if (models.has("related-party-financing")) {
    bumpRisk("audit", 4 + severityWeight);
    bumpRisk("legal", 3 + severityWeight);
    bumpRisk("debt", 2 + severityWeight);
  }
}

function bumpStakeholder(key, amount) {
  if (!amount || amount <= 0) return;
  game.stakeholderStress[key] = Math.min(120, (game.stakeholderStress[key] || 0) + amount);
}

function coolStakeholder(key, amount) {
  if (!amount || amount <= 0) return;
  game.stakeholderStress[key] = Math.max(0, (game.stakeholderStress[key] || 0) - amount);
}

function updateStakeholderStress(event, choice, tradeoff, funding = {}) {
  const visible = { ...(choice.visibleEffects || {}), ...(tradeoff.visible || {}), ...(funding.visible || {}) };
  const hidden = { ...(choice.hiddenEffects || {}), ...(tradeoff.hidden || {}), ...(funding.hidden || {}) };
  const relation = { ...(choice.relationEffects || {}), ...(tradeoff.relation || {}) };
  const models = new Set([...(event.modelTags || []), ...(choice.models || [])]);

  bumpStakeholder("contractor", Math.max(0, -visible.cash) * 0.5 + Math.max(0, -visible.delivery) + Math.max(0, hidden.delivery_pressure) * 0.5);
  bumpStakeholder("suppliers", Math.max(0, hidden.off_balance_debt) * 0.7 + Math.max(0, -visible.cash) * 0.35 + Math.max(0, -relation.suppliers || 0));
  bumpStakeholder("bank", Math.max(0, visible.debt) * 0.55 + Math.max(0, hidden.financing_cost || 0) * 0.7 + Math.max(0, -visible.bank));
  bumpStakeholder("buyers", Math.max(0, hidden.buyer_liability || 0) * 0.65 + Math.max(0, -visible.public_trust) + Math.max(0, -visible.delivery) * 0.65);
  bumpStakeholder("local", Math.max(0, hidden.local_isolation || 0) + Math.max(0, -visible.government) + Math.max(0, hidden.political_dependency) * 0.25);
  bumpStakeholder("competitors", Math.max(0, visible.sales) * 0.25 + Math.max(0, visible.land_bank) * 0.25 + Math.max(0, -visible.government) * 0.35 + competitionProfile().intensity * 0.08);
  bumpStakeholder("underground", Math.max(0, hidden.gray_risk) * 0.75 + Math.max(0, relation.underground || 0));

  if (visible.delivery > 0 && visible.cash < 0) coolStakeholder("contractor", Math.min(4, visible.delivery));
  if (visible.bank > 0) coolStakeholder("bank", visible.bank * 0.6);
  if (visible.public_trust > 0) coolStakeholder("buyers", visible.public_trust * 0.5);
  if (visible.government > 0 && (hidden.local_isolation || 0) <= 0) coolStakeholder("local", visible.government * 0.4);

  if (models.has("counterparty-retaliation")) {
    bumpStakeholder("contractor", 5);
    bumpStakeholder("suppliers", 5);
  }
  if (models.has("competitor-pressure")) bumpStakeholder("competitors", 7);
  if (models.has("government-permit-power")) bumpStakeholder("local", 6);
  if (models.has("gray-governance") || models.has("protective-umbrella-risk")) bumpStakeholder("underground", 7);
  if (models.has("pre-sale-funds-leak")) {
    bumpStakeholder("buyers", 7);
    bumpStakeholder("bank", 4);
    bumpStakeholder("local", 3);
  }
  if (models.has("bid-rigging-chain")) {
    bumpStakeholder("competitors", 7);
    bumpStakeholder("local", 4);
  }
  if (models.has("low-bid-change-order")) {
    bumpStakeholder("contractor", 7);
    bumpStakeholder("suppliers", 4);
  }
  if (models.has("shadow-banking-loop") || models.has("related-party-financing")) {
    bumpStakeholder("bank", 6);
    bumpStakeholder("local", 2);
  }
}

function updateCriticalCounters() {
  game.flags.cashZeroTurns = game.state.visible.cash <= 0 ? (game.flags.cashZeroTurns || 0) + 1 : Math.max(0, (game.flags.cashZeroTurns || 0) - 1);
}

function enqueueFeedback(group, tone, severity = 1, delay = 1, textOverride = "") {
  const bank = FEEDBACK_LINE_BANK[group];
  if (!bank) return;
  const lines = bank[tone] || bank.wary || bank.warning || bank.angry;
  if (!textOverride && !lines?.length) return;
  const line = textOverride || pick(lines);
  const contact = contactForGroup(group);
  game.feedbackQueue.push({
    group,
    tone,
    severity,
    speaker: contact.speaker || bank.speaker,
    role: contact.role || "",
    temper: contact.temper || "",
    contactTier: currentScale().title,
    text: line,
    availableTurn: game.turn + delay
  });
}

function stateCapitalReply(choice) {
  const text = `${choice.id || ""} ${choice.label || ""}`;
  if (/接受|入股|联合|小股|控股|拼联合体|一起|兜底|接盘/.test(text)) {
    return pick([
      "入股可以往前走，但项目账户、重大事项和资金用途要一起签。",
      "信用我们能补一部分，控制权和收益分配也要重新写。",
      "我们不是来给你背旧账的，先把项目、债务和交付责任切开。",
      "这张桌从今天起不只看利润，也看稳定、交付和专班口径。",
      "有城投在，银行好说一点；但你以后每一步都要能上会。"
    ]);
  }
  if (/单项目|不让|边界/.test(text)) {
    return pick([
      "只做单项目可以，但边界要写清楚，别把母公司旧账带进来。",
      "我们可以合作一块地，不等于替你兜整个盘子。",
      "你要保控制权，就要自己把现金和交付扛住。",
      "合作可以窄一点，但项目账户必须透明。",
      "我们愿意给信用，不愿意进看不清的资金池。"
    ]);
  }
  if (/拒绝|坚持控股|不要|不接|不卖/.test(text)) {
    return pick([
      "那我们先退一步看，你自己要把银行和交付稳住。",
      "你要完整控制权，就别指望地方信用无限托底。",
      "拒绝可以，但后面专班只看结果，不看面子。",
      "我们不急，项目真缺现金时，条件会比今天更硬。",
      "你不让权，就要证明你自己能把楼交出来。"
    ]);
  }
  return "";
}

function choiceImpliesBetrayal(choice) {
  const text = `${choice.id || ""} ${choice.label || ""}`;
  return /换|切割|反诉|甩锅|推给|压下|封口|威胁|个人操作|虚增|别闹/.test(text);
}

function scheduleChoiceFeedback(event, choice) {
  const visible = choice.visibleEffects || {};
  const hidden = choice.hiddenEffects || {};
  const relation = choice.relationEffects || {};
  const models = new Set([...(event.modelTags || []), ...(choice.models || [])]);
  const betrayed = choiceImpliesBetrayal(choice);
  const choiceText = `${event.title || ""} ${choice.id || ""} ${choice.label || ""}`;

  if ((relation.state_capital || 0) !== 0 || /城投|国资|接盘|小股|控股|联合体/.test(choiceText)) {
    const delta = relation.state_capital || 0;
    const tone = delta < -3 || /拒绝|坚持控股|不让|不要/.test(choiceText) ? "warning" : delta >= 6 ? "official" : "selfProtect";
    enqueueFeedback("stateCapital", tone, 5, 1, stateCapitalReply(choice));
  }

  scheduleHumanReactionFeedback(event, choice, models, betrayed);

  scheduleSafetyFeedback(choice, models);

  if ((relation.contractor || 0) > 0 || visible.delivery > 0) enqueueFeedback("contractor", "relieved", 1);
  if ((relation.contractor || 0) < -4 || (hidden.delivery_pressure || 0) >= 5 || models.has("counterparty-retaliation")) {
    enqueueFeedback("contractor", betrayed ? "betrayed" : (relation.contractor || 0) < -8 ? "angry" : "wary", betrayed ? 3 : 2);
  }

  if ((relation.suppliers || 0) > 0 || (hidden.off_balance_debt || 0) < 0) enqueueFeedback("suppliers", "relieved", 1);
  if ((relation.suppliers || 0) < -3 || (hidden.off_balance_debt || 0) >= 5) {
    enqueueFeedback("suppliers", (hidden.off_balance_debt || 0) >= 9 ? "selfProtect" : "wary", 2);
  }

  if ((visible.bank || 0) > 1) enqueueFeedback("bank", "relieved", 1);
  if ((visible.bank || 0) < -1 || (hidden.financing_cost || 0) >= 4 || (visible.debt || 0) >= 5) {
    enqueueFeedback("bank", (hidden.financing_cost || 0) >= 7 || visible.bank <= -4 ? "warning" : "wary", 2);
  }

  if ((visible.public_trust || 0) > 2 || (hidden.buyer_liability || 0) < 0) enqueueFeedback("buyers", "relieved", 1);
  if ((visible.public_trust || 0) < -2 || (hidden.buyer_liability || 0) >= 5 || (hidden.delivery_pressure || 0) >= 6) {
    enqueueFeedback("buyers", (visible.public_trust || 0) <= -6 ? "angry" : "wary", 2);
  }

  if ((visible.government || 0) !== 0 || (hidden.political_dependency || 0) >= 4 || (hidden.local_isolation || 0) >= 4) {
    const tone = (visible.government || 0) < -3 || (hidden.local_isolation || 0) >= 5 ? "warning" : "official";
    enqueueFeedback(governmentFeedbackGroup(event, choice, models), tone, tone === "warning" ? 2 : 1);
  }

  if ((hidden.gray_risk || 0) >= 5 || (relation.underground || 0) > 0 || models.has("gray-governance") || models.has("protective-umbrella-risk")) {
    enqueueFeedback("underground", betrayed ? "selfProtect" : (hidden.gray_risk || 0) >= 8 ? "blackmail" : "wary", betrayed ? 3 : 2);
  }

  if (models.has("competitor-pressure") || (visible.sales || 0) >= 6 || (visible.government || 0) < -4) {
    enqueueFeedback("competitors", (visible.government || 0) < -4 ? "warning" : "market", 1);
  }

  if ((relation.channel || 0) > 0) enqueueFeedback("channel", "relieved", 1);
  if ((relation.channel || 0) < -2 || models.has("platformized-sales")) {
    enqueueFeedback("channel", (relation.channel || 0) < -5 ? "angry" : "wary", 1);
  }
}

function scheduleHumanReactionFeedback(event, choice, models, betrayed) {
  const text = `${event.title || ""} ${choice.id || ""} ${choice.label || ""}`;
  const severe = betrayed || /威胁|换|切割|反诉|封口|别闹|拒绝|坚持控股|压价|拖住付款|甩锅|举报|清场/.test(text);
  if (severe && /总包|施工|签证|工程|班组|材料|供应商|商票/.test(text)) {
    enqueueFeedback("contractor", betrayed ? "betrayed" : "angry", 5, 1, pick([
      "你要换人可以，欠款、签证和聊天记录我会整理给该看的人。",
      "你把责任往我身上推，那我也只能把当时谁点头说清楚。",
      "工程不是一张嘴停的，工人工资和材料款会自己找出口。"
    ]));
  }
  if (severe && /银行|授信|开发贷|展期|抵押|贷款|信托|非标|债委会/.test(text)) {
    enqueueFeedback(/信托|非标|债委会/.test(text) ? "trustCreditor" : "bank", "warning", 5, 1, pick([
      "你可以讲关系，但我们要先看现金流、抵押物和清偿顺位。",
      "这一步以后，展期不是你说了算，要上风险会。",
      "你把口径改了，银行就会把抵押和回款重新打折。"
    ]));
  }
  if (severe && /业主|购房|预售|监管户|停贷|交付/.test(text)) {
    enqueueFeedback("buyers", "angry", 5, 1, pick([
      "你说现金紧，我们看的是楼栋进度和监管账户。",
      "再给承诺没有用，把钱进了哪里、楼修到哪里说清楚。",
      "业主群已经在对合同节点，下一步会找律师。"
    ]));
  }
  if (severe && /土方|清场|拆迁|钉子户|保护伞|灰|扫黑/.test(text)) {
    enqueueFeedback("underground", betrayed ? "selfProtect" : "blackmail", 5, 1, pick([
      "当年谁叫我去的、谁在现场，我手里不是没有东西。",
      "现在想切干净，没那么容易。",
      "你不认这条线，我就只能按我的方式自保。"
    ]));
  }
  if (/接受|入股|联合|小股|控股|接盘|托管|专班|国资|城投|债委会|白名单/.test(text) || (game.state.hidden.control_loss || 0) >= 8) {
    enqueueFeedback("stateCapital", "official", 5, 1, pick([
      "救项目可以，但付款顺位、项目账户和资产处置以后要一起签。",
      "你拿到信用，也交出了一部分自由裁量。",
      "从今天起，先保交付和稳定，老板的收益排在后面。"
    ]));
  }
}

function activateFeedbackForTurn() {
  const ready = [];
  const later = [];
  (game.feedbackQueue || []).forEach((entry) => {
    if ((entry.availableTurn || 0) <= game.turn) ready.push(entry);
    else later.push(entry);
  });
  const alerts = dashboardAlertFeedback();
  const important = [...ready.filter((entry) => (entry.severity || 0) >= 4), ...alerts];
  important.sort((a, b) => (b.severity || 0) - (a.severity || 0));
  game.activeFeedback = important.slice(0, 2);
  game.feedbackQueue = later;
}

function dashboardAlertFeedback() {
  if (!game) return [];
  const alerts = [];
  const cards = dashboardCards();
  const keyByGroup = {
    funding: "bank",
    project: "contractor",
    relation: "government",
    safety: "publicSecurity"
  };
  dashboardGroups().forEach((group) => {
    const tone = dashboardTone(group.score, group.hot);
    if (tone !== "bad" && !group.hot) return;
    const flagKey = `lastDeskAlert_${group.key}`;
    if ((game.flags[flagKey] || 0) >= game.turn - 1) return;
    const card = group.key === "funding"
      ? cards.find((item) => ["cash", "rollover", "sales"].includes(item.key) && dashboardTone(item.score, item.hot) === tone) || cards.find((item) => item.key === "cash")
      : group.key === "project"
        ? cards.find((item) => ["delivery", "asset"].includes(item.key) && dashboardTone(item.score, item.hot) === tone) || cards.find((item) => item.key === "asset")
        : group.key === "relation"
          ? cards.find((item) => item.key === "government")
          : cards.find((item) => item.key === "safety");
    game.flags[flagKey] = game.turn;
    alerts.push(buildDeskAlertFeedback(group, card));
  });
  return alerts.filter(Boolean);
}

function buildDeskAlertFeedback(group, card) {
  const map = {
    funding: {
      group: "bank",
      tone: "warning",
      text: pick([
        `资金灯已经红了。${card?.note || "现金、利息和展期要重新看"}，银行不会只听增长故事。`,
        "你现在不是缺一个解释，是缺能被银行承认的现金流。",
        "再拖一轮，展期条件会变成保全条件。"
      ])
    },
    project: {
      group: "contractor",
      tone: "warning",
      text: pick([
        `项目灯已经红了。${card?.note || "工地和货值对不上"}，现场的人会先找钱和进度。`,
        "你说资产还在，但工地要的是工程款、材料和复工安排。",
        "楼盘阶段说不清，业主和总包都会自己找出口。"
      ])
    },
    relation: {
      group: "government",
      tone: "warning",
      text: pick([
        `关系灯已经红了。${card?.note || "地方协调空间变薄"}，不要等专班从投诉和风险单里认识你。`,
        "地方可以协调项目，不会无限协调老板。",
        "你现在需要的是可执行处置表，不是饭局口径。"
      ])
    },
    safety: {
      group: "publicSecurity",
      tone: "warning",
      text: pick([
        `安全灯已经红了。${ownerSafetyExplanation()}`,
        "这时再讲商业压力没用，别人开始看授权链、付款链和口径链。",
        "老板风险一旦进个人线，公司账本就不是唯一问题。"
      ])
    }
  };
  const item = map[group.key];
  if (!item) return null;
  const contact = contactForGroup(item.group);
  return {
    group: item.group,
    tone: item.tone,
    severity: 4,
    speaker: contact.speaker || item.group,
    text: item.text,
    availableTurn: game.turn
  };
}

function compoundRiskLedger() {
  const ledger = game.riskLedger || createRiskLedger();
  const state = game.state;
  const visible = {};
  const hidden = {};
  const debtCarry = state.visible.debt * 0.022 + state.hidden.off_balance_debt * 0.018 + (state.hidden.financing_cost || 0) * 0.026;
  const buyerCarry = (state.hidden.buyer_liability || 0) * 0.024 + state.hidden.delivery_pressure * 0.018;

  if (debtCarry >= 1.9 || ledger.interest >= 18) {
    const interestTick = debtCarry >= 4.2 || ledger.interest >= 44 ? 2 : 1;
    visible.cash = (visible.cash || 0) - interestTick;
    visible.bank = (visible.bank || 0) - 1;
    hidden.financing_cost = (hidden.financing_cost || 0) + interestTick;
    if (state.visible.cash <= 22 || ledger.liquidity >= 24) visible.debt = (visible.debt || 0) + 1;
  }

  if (buyerCarry >= 1.8 || ledger.presale >= 18) {
    const pressureTick = buyerCarry >= 3.8 || ledger.presale >= 46 ? 2 : 1;
    hidden.buyer_liability = (hidden.buyer_liability || 0) + Math.max(0, pressureTick - 1);
    hidden.delivery_pressure = (hidden.delivery_pressure || 0) + pressureTick;
    if (state.visible.delivery <= 40 || ledger.delivery >= 22) {
      visible.public_trust = (visible.public_trust || 0) - 1;
    }
  }

  if (ledger.liquidity >= 18 || ledger.debt >= 22 || ledger.interest >= 26) {
    visible.cash = (visible.cash || 0) - 1;
    visible.bank = (visible.bank || 0) - 1;
    visible.debt = (visible.debt || 0) + (ledger.debt >= 28 ? 2 : 1);
  }
  if (ledger.delivery >= 18 || ledger.presale >= 24) {
    visible.delivery = (visible.delivery || 0) - 1;
    visible.public_trust = (visible.public_trust || 0) - 1;
    hidden.delivery_pressure = (hidden.delivery_pressure || 0) + 1;
  }
  if (ledger.buyers >= 20 || ledger.inventory >= 24) {
    visible.sales = (visible.sales || 0) - 1;
    visible.public_trust = (visible.public_trust || 0) - 1;
  }
  if (ledger.official >= 26) {
    hidden.local_isolation = (hidden.local_isolation || 0) + 1;
    hidden.political_dependency = (hidden.political_dependency || 0) + (game.state.visible.government > 70 ? 1 : 0);
  }
  if (ledger.legal >= 24 || ledger.exit >= 32 || (ledger.presale >= 52 && state.visible.delivery <= 34)) {
    hidden.asset_freeze_risk = (hidden.asset_freeze_risk || 0) + 1;
    hidden.legal_exposure = (hidden.legal_exposure || 0) + 1;
    hidden.boss_safety = (hidden.boss_safety || 0) - 1;
  }
  if (ledger.gray >= 24) {
    hidden.gray_risk = (hidden.gray_risk || 0) + 1;
    hidden.boss_safety = (hidden.boss_safety || 0) - 1;
  }
  if (ledger.audit >= 24) {
    hidden.data_inflation = (hidden.data_inflation || 0) + 1;
    visible.bank = (visible.bank || 0) - 1;
  }

  applyEffectBucket(game.state.visible, visible);
  applyEffectBucket(game.state.hidden, hidden);
}

function scheduleConsequences(event, choice) {
  (choice.followUps || []).forEach((entry) => {
    if (typeof entry === "string") {
      enqueueEvent(entry, 2, `你在「${event.title}」的选择留下了后续问题。`);
    } else if (entry?.id) {
      enqueueEvent(entry.id, entry.delay || 2, entry.reason || `你在「${event.title}」的选择留下了后续问题。`);
    }
  });

  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const visibleEffects = choice.visibleEffects || {};
  const hiddenEffects = choice.hiddenEffects || {};

  if ((hiddenEffects.off_balance_debt || 0) >= 5 || hidden.off_balance_debt >= 38) {
    enqueueEvent("supplier-blockade", 3, "供应链欠款开始从账本走到门口。");
  }
  if ((hiddenEffects.presale_misuse || 0) >= 6 || hidden.presale_misuse >= 38) {
    enqueueEvent("presale-supervision-account", 4, "预售回款和交付责任开始被放到同一张表里。");
  }
  if ((hiddenEffects.delivery_pressure || 0) >= 8 || hidden.delivery_pressure >= 42 || visible.delivery <= 28) {
    enqueueEvent("stoppage-video", 3, "工程进度开始变成业主能拍到的问题。");
  }
  if (hidden.delivery_pressure >= 34 || visible.delivery <= 38) {
    enqueueEvent("homebuyers-mortgage-letter", 4, "业主开始把合同、贷款和现场照片连成停贷威胁。");
  }
  if ((hiddenEffects.gray_risk || 0) >= 8 || hidden.gray_risk >= 52) {
    enqueueEvent("anti-gang-investigation", 8, "旧改和土方线索被埋进了更晚的风险。");
  }
  if ((hiddenEffects.political_dependency || 0) >= 8 || hidden.political_dependency >= 55) {
    enqueueEvent("state-capital-takeover", 7, "地方信用越深，后面越可能变成处置权。");
  }
  if ((visibleEffects.sales || 0) >= 8 && hidden.price_bubble >= 35) {
    enqueueEvent("old-owners-price-cut", 5, "高价和热销会把老业主价格锚做硬。");
  }
  if (visible.cash <= 12 || visible.debt >= 58) {
    enqueueEvent("bank-loan-withdrawal", 4, "银行会比你更早重估现金流。");
  }
  if ((hiddenEffects.exit_preparation || 0) >= 8 || hidden.exit_preparation >= 42) {
    enqueueEvent("airport-control-window", 5, "你开始准备退场，处置方也会开始判断你是不是要离场。");
  }
  if ((hiddenEffects.asset_freeze_risk || 0) >= 8 || hidden.asset_freeze_risk >= 42) {
    enqueueEvent("asset-freeze-order", 4, "资产转移、诉讼和债权人动作开始接近冻结线。");
  }
  if ((hiddenEffects.legal_exposure || 0) >= 8 || hidden.legal_exposure >= 50) {
    enqueueEvent("founder-police-inquiry", 5, "资金流、理财兑付和交付责任开始进入个人风险视角。");
  }
  if (hidden.data_inflation >= 30 && game.phaseIndex >= 3) {
    enqueueEvent("redline-reporting-night", 3, "销售、回款和债务口径开始被银行和评级重新审视。");
  }
  if (hidden.off_balance_debt >= 34 && game.phaseIndex >= 3) {
    enqueueEvent("wealth-product-redemption", 4, "体外融资会先从最熟的人那里讨说法。");
  }
  if (visible.debt >= 64 && game.scaleIndex >= 4 && game.phaseIndex >= 5) {
    enqueueEvent("liquidation-petition", 5, "债权人等待展期的耐心开始消失。");
  }
  if (visible.government <= 24 || hidden.local_isolation >= 45) {
    enqueueEvent("local-protection-gap", 3, "政商关系过浅，地方、银行和债权人开始判断你有没有缓冲垫。");
  }
  scheduleLedgerConsequences();
  scheduleDarkLineConsequences(event, choice);
  scheduleStakeholderReactions();
}

function enqueueDarkLineWindow(key, threshold, ids, reason, feedback = null, delay = 1) {
  const flag = `darkLine_${key}_${threshold}`;
  if (game.flags[flag]) return;
  const candidates = ids
    .map((id) => eventById(id))
    .filter((event) => event && !game.seenEvents[event.id] && !game.eventQueue.some((entry) => entry.id === event.id) && canFireEvent(event));
  if (!candidates.length) return;
  const picked = pickWeighted(candidates, eventBankWeight);
  enqueueEvent(picked.id, delay, reason);
  const queued = game.eventQueue.find((entry) => entry.id === picked.id);
  if (queued) queued.priority = "dark-line";
  game.flags[flag] = game.turn;
  game.scaleHistory.push({ turn: game.turn, title: "暗线显影", text: reason });
  if (feedback) enqueueFeedback(feedback.group, feedback.tone || "warning", feedback.severity || 5, 1, feedback.text);
}

function scheduleDarkLineConsequences(event, choice) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const fundingLedger = refreshFundingLedger();
  const projectLedger = refreshProjectLedger();

  if (hidden.presale_misuse >= 20 || ledger.presale >= 20) {
    enqueueDarkLineWindow(
      "presale",
      20,
      ["mortgage-funds-wrong-account", "fake-progress-drawdown", "escrow-gap-screenshot", "presale-supervision-account"],
      "预售款责任已经不是暗数值：它会从监管户、工程进度、按揭流水和业主证据里显影。",
      { group: "buyers", tone: "warning", text: "预售款不是集团现金池。下一次别人会拿监管户、楼栋进度和按揭流水问你。" }
    );
  }
  if ((hidden.buyer_liability || 0) >= 30 || hidden.delivery_pressure >= 32) {
    enqueueDarkLineWindow(
      "buyerLiability",
      30,
      ["homebuyer-lawyer-letter", "homebuyers-mortgage-letter", "stoppage-video", "local-task-force-night"],
      "购房款责任开始找具体出口：业主、银行、住建和工地会把同一笔钱连起来看。",
      { group: "buyers", tone: "angry", text: "我们不是问你集团怎么周转，我们问哪栋楼、哪笔钱、哪天复工。" }
    );
  }
  if (hidden.political_dependency >= 28 || ledger.official >= 24 || ledger.government >= 20) {
    enqueueDarkLineWindow(
      "politicalDependency",
      28,
      ["protective-umbrella-transfer", "local-task-force-night", "state-capital-takeover", "planning-stop-work-order", "tax-and-construction-joint-audit"],
      "权力依赖开始变成具体部门：规划、住建、税务、专班、城投会从不同卡口重新定价你。",
      { group: "government", tone: "warning", text: "关系不是一张总卡。预售、规划、税务、专班和城投各看一套责任。" }
    );
  }
  if ((hidden.local_isolation || 0) >= 28 || visible.government <= 28) {
    enqueueDarkLineWindow(
      "localIsolation",
      28,
      ["local-protection-gap", "planning-stop-work-order", "tax-and-construction-joint-audit", "competitor-anonymous-report"],
      "地方缓冲变薄后，同行举报、部门卡口和债权人动作会更容易同时进来。",
      { group: "government", tone: "warning", text: "地方协调空间变薄以后，别人会各自行动，不会等你把故事讲完。" }
    );
  }
  if (hidden.gray_risk >= 18 || ledger.gray >= 14 || ledger.blackmail >= 14) {
    enqueueDarkLineWindow(
      "gray",
      18,
      ["earthwork-subcontract-chain", "earthwork-boss-blackmail", "protective-umbrella-transfer", "public-security-tea"],
      "黑灰线不能只在结算页出现：土方、清场、保护伞和末端分包会先用人和证据回来。",
      { group: "underground", tone: "blackmail", text: "当年的事不是只有你记得。钱、照片、授权和谁在现场，都有人留着。" }
    );
  }
  if (hidden.off_balance_debt >= 22 || ledger.counterparty >= 18 || (game.stakeholderStress?.contractor || 0) >= 24 || (game.stakeholderStress?.suppliers || 0) >= 24) {
    enqueueDarkLineWindow(
      "counterparty",
      22,
      ["contractor-evidence-package", "low-bid-change-order-night", "supplier-bill-discount", "supplier-blockade"],
      "你压给总包和供应商的风险开始反咬：签证、商票、断供、证据包会把账本变成现场。",
      { group: "contractor", tone: "warning", text: "不是你说换人就结束。欠款、签证、聊天记录和实名工资都会自己找出口。" }
    );
  }
  if ((hidden.financing_cost || 0) >= 22 || fundingLedger.rolloverNeed >= 16 || fundingLedger.interestDue >= 6) {
    enqueueDarkLineWindow(
      "financingCost",
      22,
      ["interest-rollover-friday", "private-fund-bridge-weekend", "related-bank-spv-loan", "bank-branch-risk-meeting"],
      "利息和展期不是背景音：付息日、过桥钱、绕道融资和银行风控会强制回到桌面。",
      { group: "bank", tone: "warning", text: "你缺的不是一份说明，是能覆盖付息日和展期缺口的现金流。" }
    );
  }
  if (hidden.data_inflation >= 22 || ledger.audit >= 18) {
    enqueueDarkLineWindow(
      "dataInflation",
      22,
      ["sales-data-meeting", "redline-reporting-night", "annual-audit-revenue-cut", "fake-progress-drawdown"],
      "数字口径开始被拆开：认购、网签、回款、监管户、收入确认不会再被合成一个好故事。",
      { group: "bank", tone: "warning", text: "认购不是回款，回款不是自由现金，工程照片也不是交付。" }
    );
  }
  if ((hidden.exit_preparation || 0) >= 18 || isVoluntaryExitWindowOpen()) {
    enqueueDarkLineWindow(
      "exit",
      18,
      ["voluntary-exit-window", "mature-asset-sale-rumor", "project-sale-window", "family-office-transfer", "high-point-exit-window"],
      "退出准备必须变成选择题：现在离桌、部分卖、继续赌，后面会被债权人和地方重新解释。",
      { group: "stateCapital", tone: "official", text: "现在卖是收缩，拖到出事再卖就可能被解释成转移资产。" }
    );
  }
  if ((hidden.legal_exposure || 0) >= 30 || hidden.asset_freeze_risk >= 30 || ledger.legal >= 26) {
    enqueueDarkLineWindow(
      "legal",
      30,
      ["court-freeze-account", "asset-freeze-order", "founder-police-inquiry", "tax-and-construction-joint-audit"],
      "法律暴露开始具体化：账户、股权、项目收益、税务材料和个人授权链会进入下一桌。",
      { group: "publicSecurity", tone: "warning", text: "这时别人看的不是商业压力，是账户、授权、担保和谁签过字。" },
      2
    );
  }
  if (projectLedger.marketPriceIndex >= 124 && hidden.price_bubble >= 28) {
    enqueueDarkLineWindow(
      "priceBubble",
      28,
      ["old-owners-price-cut", "school-district-promise", "sales-data-meeting", "high-point-exit-window"],
      "房价上行会制造更好的销售，也会制造更硬的价格锚和退出诱惑。",
      { group: "buyers", tone: "wary", text: "涨价时大家抢房，降价时老业主会把合同和承诺一条条拿出来。" }
    );
  }
}

function scheduleStakeholderReactions() {
  const stress = game.stakeholderStress || createStakeholderStress();
  const pressure = computeSystemPressure();
  const baseDelay = pressure > 0.45 ? 0 : 1;
  if (stress.contractor >= 22 || stress.suppliers >= 24) {
    enqueueOneOf(["contractor-evidence-package", "supplier-bill-discount", "wage-account-deadline", "supplier-blockade"], baseDelay, "总包和供应商的忍耐度被压到临界点，他们开始准备证据、停工或保全。");
  }
  if (stress.bank >= 38) {
    enqueueOneOf(["bank-branch-risk-meeting", "interest-rollover-friday", "bank-loan-withdrawal", "personal-guarantee-call"], baseDelay, "银行不再只看关系和口头承诺，风控开始把你放进观察名单。");
  }
  if (stress.buyers >= 38) {
    enqueueOneOf(["homebuyer-lawyer-letter", "escrow-gap-screenshot", "homebuyers-mortgage-letter", "mortgage-boycott-letter"], baseDelay, "业主忍耐度见底，问题从客服投诉变成证据、律师函和停贷威胁。");
  }
  if (stress.local >= 34 || game.state.visible.government <= 22) {
    enqueueOneOf(["planning-stop-work-order", "tax-and-construction-joint-audit", "local-task-force-night", "local-protection-gap"], baseDelay, "地方关系不够硬，卡口开始从审批、税务、住建和专班同时出现。");
  }
  const competitorScore = competitionPressureScore();
  if (competitorScore >= 38) {
    const profile = competitionProfile();
    enqueueOneOf(profile.events, baseDelay + 1, `${profile.title}升温：${profile.opponent}开始用${profile.tactics.join("、")}打你的漏洞。`);
  }
  if ((game.turn >= 4 && stress.underground >= 12) || game.state.hidden.gray_risk >= 18) {
    enqueueOneOf(["earthwork-boss-blackmail", "protective-umbrella-transfer", "public-security-tea", "anti-gang-investigation"], baseDelay + 1, "黑灰线不是工具人，它会在要钱、留痕、保护伞倒查和扫黑里反噬。");
  }
}

function projectIssueEventIds(project, risk) {
  if (risk.label === "交付逾期") return ["stoppage-video", "homebuyer-lawyer-letter", "homebuyers-mortgage-letter", "local-task-force-night", "white-list-application-review"];
  if (risk.label === "监管缺口") return ["presale-supervision-account", "escrow-gap-screenshot", "escrow-ledger-audit", "mortgage-funds-wrong-account", "local-task-force-night"];
  if (risk.label === "卖快楼慢") return ["fake-progress-drawdown", "stoppage-video", "homebuyer-open-day", "wage-account-deadline", "local-task-force-night"];
  if (risk.label === "质量隐患") return ["homebuyer-open-day", "stoppage-video", "planning-stop-work-order"];
  if (risk.label === "被迫折价") return ["project-sale-window", "bank-branch-risk-meeting", "local-task-force-night"];
  if (risk.label === "库存压货" || risk.label === "估值缩水") return ["discount-sale-stampede", "lower-tier-inventory-night", "state-purchase-inventory", "bank-branch-risk-meeting"];
  if (project.stage === "land" || project.stage === "construction") return ["wage-account-deadline", "supplier-blockade", "planning-stop-work-order"];
  return ["stoppage-video", "homebuyer-lawyer-letter", "local-task-force-night"];
}

function projectIssueFeedback(project, risk) {
  if (risk.label === "交付逾期") {
    return { group: "buyers", tone: "angry", text: `「${project.title}」已经过了交付节点。业主不想再听集团故事，只问哪栋楼、哪天复工、钱在哪个账户。` };
  }
  if (risk.label === "监管缺口") {
    return { group: "government", tone: "warning", text: `「${project.title}」的回款和监管沉淀对不上。住建口不会把它当普通现金流问题处理。` };
  }
  if (risk.label === "卖快楼慢") {
    return { group: "contractor", tone: "warning", text: `「${project.title}」卖得比盖得快。项目总说再不补工程款，预售热度会变成交付责任。` };
  }
  if (risk.label === "质量隐患") {
    return { group: "contractor", tone: "wary", text: `「${project.title}」的质量问题不能只放在卡片上。工程口要么修，要么以后开放日被业主拍出来。` };
  }
  return { group: "contractor", tone: "warning", text: `「${project.title}」不是静态资产。${risk.detail}` };
}

function enqueueProjectAction(ids, delay, reason) {
  const existing = (game.eventQueue || []).find((entry) => ids.includes(entry.id));
  if (existing) {
    existing.availableTurn = Math.min(existing.availableTurn || game.turn, game.turn + delay);
    existing.reason = reason || existing.reason;
    existing.priority = "project";
    return existing.id;
  }
  const candidates = ids
    .map((id) => eventById(id))
    .filter((event) => event && ids.includes(event.id) && !game.seenEvents[event.id] && canFireEvent(event));
  if (!candidates.length) return "";
  const picked = pickWeighted(candidates, eventBankWeight);
  enqueueEvent(picked.id, delay, reason);
  const queued = game.eventQueue.find((entry) => entry.id === picked.id);
  if (queued) queued.priority = "project";
  return picked.id;
}

function scheduleProjectLedgerActions(event, choice) {
  const ledger = refreshProjectLedger();
  if (!ledger.projects.length) return;
  const severeProjects = ledger.projects
    .map((project) => ({ project, risk: projectRiskProfile(project, ledger) }))
    .filter(({ risk }) => risk.severity >= 4)
    .sort((a, b) => b.risk.severity - a.risk.severity || marketValueForProject(b.project, ledger) - marketValueForProject(a.project, ledger));
  const maxActions = computeSystemPressure() >= 0.58 ? 2 : 1;
  let scheduled = 0;
  severeProjects.forEach(({ project, risk }) => {
    if (scheduled >= maxActions) return;
    if ((project.lastIssueTurn || 0) >= game.turn - 1) return;
    const ids = projectIssueEventIds(project, risk);
    const reason = `${project.title}变成项目待办：${risk.label}。这不是报表标签，后面会进复工、监管、业主或债权人桌面。`;
    const pickedId = enqueueProjectAction(ids, scheduled === 0 ? 0 : 1, reason);
    if (!pickedId) return;
    project.lastIssueTurn = game.turn;
    project.issueCount = (project.issueCount || 0) + 1;
    const feedback = projectIssueFeedback(project, risk);
    enqueueFeedback(feedback.group, feedback.tone, 5, 1, feedback.text);
    recordIncident(event, choice, "project-action", reason);
    scheduled += 1;
  });
}

function scheduleLedgerConsequences() {
  const ledger = game.riskLedger || createRiskLedger();
  const fundingLedger = refreshFundingLedger();
  let scheduled = 0;
  const maxScheduled = 1 + (computeSystemPressure() > 0.55 ? 1 : 0) + (game.turn > 20 && computeSystemPressure() > 0.72 ? 1 : 0);
  const schedule = (ids, delay, reason) => {
    if (scheduled >= maxScheduled) return;
    const before = game.eventQueue.length;
    enqueueOneOf(ids, delay, reason);
    if (game.eventQueue.length > before) scheduled += 1;
  };
  if (ledger.liquidity >= 16) {
    schedule(["cashflow-week", "supplier-blockade", "supplier-bill-discount", "bank-loan-withdrawal", "commercial-paper-maturity", "private-fund-bridge-weekend"], 2, "现金压力没有消失，只是换成了下一轮付款、抽贷或堵门。");
  }
  if (ledger.debt >= 18) {
    schedule(["interest-rollover-friday", "commercial-paper-maturity", "wealth-product-redemption", "trust-covenant-review", "personal-guarantee-call", "offshore-bond-due", "liquidation-petition", "related-bank-spv-loan"], 3, "债务没有被处理，只会从银行、商票、信托、境外债和清盘申请里换一种形式回来。");
  }
  if (ledger.interest >= 16) {
    schedule(["interest-rollover-friday", "first-mortgage-bank-visit", "bank-branch-risk-meeting", "bank-loan-withdrawal", "trust-covenant-review", "commercial-paper-maturity", "redline-reporting-night", "land-auction-bond-borrowed", "private-fund-bridge-weekend"], 2, "银行钱按天计息，利息和展期会把短期现金拖成长期结局。");
  }
  if ((fundingLedger.rolloverNeed || 0) >= 18 || (fundingLedger.interestDue || 0) >= 7) {
    schedule(["interest-rollover-friday", "commercial-paper-maturity", "trust-covenant-review", "personal-guarantee-call", "bank-branch-risk-meeting", "private-fund-bridge-weekend", "related-bank-spv-loan"], 1, "融资账本已经不是债务总额问题，而是付息日、展期缺口和谁先退出的问题。");
  }
  if (fundingLedger.collateralBorrowingRoom < -8) {
    schedule(["bank-branch-risk-meeting", "bank-loan-withdrawal", "trust-covenant-review", "redline-reporting-night"], 1, "抵押空间转负后，银行会把房价、土地和在建工程重新打折。");
  }
  if (ledger.delivery >= 16) {
    schedule(["stoppage-video", "homebuyer-open-day", "homebuyers-mortgage-letter", "homebuyer-lawyer-letter", "local-task-force-night", "mortgage-boycott-letter", "white-list-application-review"], 3, "交付问题会从工程现场、业主群和监管表格里继续发酵。");
  }
  if (ledger.presale >= 16) {
    schedule(["presale-supervision-account", "escrow-gap-screenshot", "escrow-ledger-audit", "homebuyer-lawyer-letter", "homebuyers-mortgage-letter", "mortgage-boycott-letter", "white-list-application-review", "mortgage-funds-wrong-account", "fake-progress-drawdown"], 2, "购房人的钱不是股东资金，预售款责任会在监管账户、交付现场和停贷信里变成结局压力。");
  }
  if (ledger.buyers >= 16 || ledger.inventory >= 22) {
    schedule(["discount-sale-stampede", "old-owners-price-cut", "channel-refund-fight", "lower-tier-inventory-night", "online-rumor-crane-stop", "state-purchase-inventory"], 3, "销售和库存压力会把价格、渠道、老业主和收储窗口一起拖进来。");
  }
  if (ledger.official >= 16) {
    schedule(["local-task-force-night", "local-protection-gap", "local-election-change", "state-capital-takeover", "urban-village-renewal-package", "land-auction-no-bid", "bid-companion-companies"], 4, "政商关系不会保持中性，它会在换届、保交楼和地方财政压力里重新定价。");
  }
  if (ledger.legal >= 14) {
    schedule(["court-freeze-account", "asset-freeze-order", "founder-police-inquiry", "boss-travel-ban", "bid-companion-companies", "related-bank-spv-loan"], 4, "法律风险会把企业问题慢慢推向账户、股权和个人责任。");
  }
  if (ledger.gray >= 14) {
    schedule(["anti-gang-investigation", "court-freeze-account", "founder-police-inquiry", "earthwork-subcontract-chain"], 5, "黑灰捷径会留下人、钱和授权记录，后期容易被重新翻账。");
  }
  if (ledger.exit >= 16) {
    schedule(["project-sale-window", "family-office-transfer", "airport-control-window", "asset-freeze-order", "foreign-fund-takeover-review"], 4, "退出动作会被债权人、地方和监管重新解释：是收缩、处置，还是转移。");
  }
  if (ledger.audit >= 14) {
    schedule(["sales-data-meeting", "redline-reporting-night", "annual-audit-revenue-cut", "share-pledge-margin-call", "fake-progress-drawdown", "related-bank-spv-loan"], 3, "数据口径会在银行、审计和资本市场那里被重新核对。");
  }
}

function rollWorldPressure(event, choice) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const systemicPressure =
    currentPhase().pressure + cyclePressureAdjust() +
    game.scaleIndex * 0.035 +
    (ledger.liquidity + ledger.debt + ledger.interest + ledger.presale + ledger.legal) / 950 +
    Math.max(0, 45 - visible.cash) / 900 +
    Math.max(0, visible.debt - 45) / 900;

  if (Math.random() > Math.min(0.68, 0.12 + systemicPressure * 0.75)) return;

  const shocks = [
    {
      id: "bank-reprice",
      title: "银行临时重估",
      text: "你没有新增一笔坏选择，但授信经理把利率、抵押物和回款账户重新算了一遍。",
      visible: { cash: -2, bank: -3, debt: 1 },
      hidden: { financing_cost: 4 },
      ledger: { interest: 8, debt: 4, liquidity: 3, audit: 2 },
      events: ["interest-rollover-friday", "bank-branch-risk-meeting", "bank-loan-withdrawal", "trust-covenant-review", "redline-reporting-night"],
      weight: 12 + ledger.interest + Math.max(0, 60 - visible.bank) + visible.debt * 0.35
    },
    {
      id: "buyer-group",
      title: "业主群发酵",
      text: "工地照片、贷款账单和销售承诺被拼在一起，购房人的钱开始要求一个明确结局。",
      visible: { public_trust: -4, sales: -2 },
      hidden: { buyer_liability: 5, delivery_pressure: 4 },
      ledger: { presale: 9, delivery: 5, buyers: 4, legal: 2 },
      events: ["escrow-gap-screenshot", "homebuyer-lawyer-letter", "homebuyers-mortgage-letter", "mortgage-boycott-letter", "stoppage-video", "escrow-ledger-audit"],
      weight: 10 + ledger.presale + hidden.buyer_liability + Math.max(0, 48 - visible.delivery)
    },
    {
      id: "contractor-payroll",
      title: "工资和材料款到点",
      text: "总包没有闹事，只是把实名工资、材料欠款和机械租赁单摆到同一张桌上。",
      visible: { cash: -4, delivery: -2 },
      hidden: { delivery_pressure: 3, legal_exposure: 1 },
      ledger: { liquidity: 8, delivery: 4, debt: 2 },
      events: ["wage-account-deadline", "supplier-blockade", "supplier-bill-discount", "cashflow-week", "commercial-paper-maturity"],
      weight: 12 + ledger.liquidity + Math.max(0, 45 - visible.cash)
    },
    {
      id: "contractor-files",
      title: "总包开始整理证据",
      text: "他没有再拍桌子，而是让资料员把签证、变更、欠款、聊天记录按时间线排好。",
      visible: { delivery: -2, bank: -1 },
      hidden: { legal_exposure: 3, delivery_pressure: 3 },
      ledger: { counterparty: 9, legal: 4, delivery: 3 },
      events: ["contractor-evidence-package", "supplier-bill-discount", "court-freeze-account"],
      weight: 9 + (game.stakeholderStress?.contractor || 0) + (game.stakeholderStress?.suppliers || 0) + hidden.delivery_pressure
    },
    {
      id: "local-pressure",
      title: "地方要稳住盘面",
      text: "地方不关心你账上怎么分类，关心售楼处、工地、信访和银行有没有同时失控。",
      visible: { government: -2, bank: -1 },
      hidden: { local_isolation: 3, political_dependency: 2 },
      ledger: { official: 7, legal: 2 },
      events: ["local-task-force-night", "local-protection-gap", "state-capital-takeover", "white-list-application-review", "urban-village-renewal-package"],
      weight: 9 + ledger.official + Math.abs(visible.government - 50) * 0.35 + hidden.local_isolation
    },
    {
      id: "underground-collect",
      title: "土方线开始要价",
      text: "过去替你清场、催人、协调的人开始提醒你：当年的事不是只有你记得。",
      visible: { cash: -2, government: -1 },
      hidden: { gray_risk: 4, legal_exposure: 3, boss_safety: -2 },
      ledger: { blackmail: 10, gray: 6, legal: 3 },
      events: ["earthwork-boss-blackmail", "public-security-tea", "protective-umbrella-transfer"],
      weight: 8 + (game.stakeholderStress?.underground || 0) * 1.4 + hidden.gray_risk
    },
    {
      id: "rival-knife",
      title: `${competitionProfile().title}从侧面递刀`,
      text: `${competitionProfile().opponent}没有公开攻击你，只是用${competitionProfile().tactics.join("、")}把你的价格、工期、资金和监管问题送到最合适的窗口。`,
      visible: { sales: -2, government: -2 },
      hidden: { local_isolation: 3, data_inflation: 2 },
      ledger: { competitor: 9, government: 4, audit: 3 },
      events: competitionProfile().events,
      weight: 8 + competitionPressureScore() * 0.75 + Math.max(0, 42 - visible.government)
    },
    {
      id: "court-preservation",
      title: "债权人先保全",
      text: "有人不再等你解释商业模式，先去申请冻结账户、股权或项目收益权。",
      visible: { cash: -2, bank: -2 },
      hidden: { asset_freeze_risk: 5, legal_exposure: 3, boss_safety: -2 },
      ledger: { legal: 10, liquidity: 3, exit: 3 },
      events: ["personal-guarantee-call", "court-freeze-account", "asset-freeze-order", "founder-police-inquiry", "boss-travel-ban"],
      weight: 7 + ledger.legal + hidden.asset_freeze_risk + Math.max(0, visible.debt - 55)
    },
    {
      id: "sales-cold",
      title: "售楼处突然冷下来",
      text: "不是没人看房，而是客户开始问：能不能交、会不会降价、银行还放不放款。",
      visible: { sales: -5, cash: -1, public_trust: -2 },
      hidden: { price_bubble: 2, buyer_liability: 2 },
      ledger: { inventory: 8, buyers: 4, presale: 3 },
      events: ["discount-sale-stampede", "lower-tier-inventory-night", "channel-refund-fight", "old-owners-price-cut", "state-purchase-inventory"],
      weight: 10 + ledger.inventory + Math.max(0, 44 - visible.sales) + hidden.price_bubble
    },
    {
      id: "audit-recheck",
      title: "口径被重新核对",
      text: "拟签约、认购、回款、监管账户余额被拆开看，故事不再自动等于现金。",
      visible: { bank: -2 },
      hidden: { data_inflation: 4, financing_cost: 2 },
      ledger: { audit: 8, interest: 3, debt: 2 },
      events: ["sales-data-meeting", "redline-reporting-night", "annual-audit-revenue-cut", "share-pledge-margin-call"],
      weight: 7 + ledger.audit + hidden.data_inflation + visible.debt * 0.2
    }
  ];

  const shock = pickWeighted(shocks, (item) => item.weight * (0.75 + Math.random() * 0.7));
  applyEffectBucket(game.state.visible, shock.visible);
  applyEffectBucket(game.state.hidden, shock.hidden);
  Object.entries(shock.ledger).forEach(([key, amount]) => bumpRisk(key, amount));
  enqueueOneOf(shock.events, Math.floor(Math.random() * 2), `${shock.title}：${shock.text}`);
  game.incidentLog.push({
    turn: game.turn,
    type: "shock",
    eventId: event.id,
    eventTitle: shock.title,
    choiceLabel: choice.label,
    text: shock.text
  });
}

function enqueueOneOf(ids, delay = 2, reason = "") {
  const candidates = ids.filter((id) => DATA.events.some((event) => event.id === id) && !game.seenEvents[id] && !game.eventQueue.some((entry) => entry.id === id));
  if (!candidates.length) return;
  enqueueEvent(pick(candidates), delay + Math.floor(Math.random() * 3), reason);
}

function enqueueEvent(id, delay = 2, reason = "") {
  if (!DATA.events.some((event) => event.id === id)) return;
  if (game.seenEvents[id]) return;
  if (game.eventQueue.some((entry) => entry.id === id)) return;
  game.eventQueue.push({
    id,
    availableTurn: game.turn + delay,
    reason
  });
}

function recordIncident(event, choice, type, text) {
  game.incidentLog.push({
    turn: game.turn,
    type,
    eventId: event.id,
    eventTitle: event.title,
    choiceLabel: choice.label,
    text
  });
}

function randomizedEffect(delta) {
  if (!delta) return delta;
  const spread = Math.max(1, Math.ceil(Math.abs(delta) * 0.25));
  const jitter = Math.floor(Math.random() * (spread * 2 + 1)) - spread;
  if (Math.sign(delta) !== Math.sign(delta + jitter) && Math.abs(delta) <= spread) return delta;
  return delta + jitter;
}

function applyEffectBucket(bucket, effects) {
  Object.entries(effects).forEach(([key, delta]) => {
    bucket[key] = clamp((bucket[key] || 0) + randomizedEffect(delta));
  });
}

function computeBlowupRisk(event, choice) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const projectLedger = refreshProjectLedger();
  const fundingLedger = refreshFundingLedger();
  const relationStress = relationDanger();
  const riskyHidden =
    hidden.presale_misuse * 0.18 +
    hidden.off_balance_debt * 0.16 +
    hidden.political_dependency * 0.12 +
    hidden.gray_risk * 0.16 +
    hidden.price_bubble * 0.1 +
    hidden.delivery_pressure * 0.2 +
    (hidden.local_isolation || 0) * 0.18 +
    (hidden.financing_cost || 0) * 0.18 +
    (hidden.buyer_liability || 0) * 0.18 +
    hidden.legal_exposure * 0.2 +
    hidden.asset_freeze_risk * 0.16 +
    (100 - hidden.boss_safety) * 0.18;
  const ledgerPressure =
    ledger.liquidity * 0.18 +
    ledger.debt * 0.2 +
    ledger.delivery * 0.18 +
    ledger.buyers * 0.12 +
    ledger.official * 0.13 +
    ledger.interest * 0.2 +
    ledger.presale * 0.2 +
    ledger.counterparty * 0.16 +
    ledger.competitor * 0.14 +
    ledger.government * 0.18 +
    ledger.blackmail * 0.18 +
    ledger.legal * 0.18 +
    ledger.gray * 0.16 +
    ledger.exit * 0.12 +
    ledger.inventory * 0.1 +
    ledger.audit * 0.12;
  let risk = (choice.blowupRisk || 0) + (SEVERITY_RISK[event.severity] || 0.06) + currentPhase().pressure + cyclePressureAdjust();
  risk += riskyHidden / 1000;
  risk += ledgerPressure / 1200;
  risk += relationStress / 900;
  risk += game.scaleIndex * 0.03;
  if (visible.cash < 24) risk += 0.035;
  if (visible.cash < 14) risk += 0.08;
  if (visible.cash < 7) risk += 0.12;
  if (visible.debt > 58) risk += 0.04;
  if (visible.debt > 76) risk += 0.09;
  if (visible.delivery < 34) risk += 0.045;
  if (visible.public_trust < 28) risk += 0.04;
  if (visible.government < 22) risk += 0.075;
  if (visible.government > 78) risk += 0.055;
  if (visible.bank < 24 && visible.debt > 48) risk += 0.06;
  if (hidden.gray_risk > 65 && event.modelTags.includes("gray-governance")) risk += 0.16;
  if (hidden.presale_misuse > 58 && event.modelTags.includes("presale-cashflow-trap")) risk += 0.14;
  if (hidden.asset_freeze_risk > 60 && event.modelTags.includes("asset-freeze-chain")) risk += 0.12;
  if (hidden.legal_exposure > 60 && event.modelTags.includes("legal-exposure")) risk += 0.12;
  if ((hidden.local_isolation || 0) > 58 && event.modelTags.includes("local-isolation")) risk += 0.12;
  if (ledger.debt > 38 && visible.cash < 28) risk += 0.05;
  if (ledger.delivery > 38 && visible.delivery < 36) risk += 0.05;
  if (ledger.legal > 34 && hidden.boss_safety < 46) risk += 0.06;
  if (ledger.interest > 34 && visible.cash < 30) risk += 0.05;
  if (ledger.presale > 34 && visible.delivery < 42) risk += 0.06;
  if ((fundingLedger.rolloverNeed || 0) >= 24 && visible.cash < 30) risk += 0.045;
  if ((fundingLedger.interestDue || 0) >= 8 && visible.cash < 28) risk += 0.04;
  if (fundingLedger.collateralBorrowingRoom < -12 && visible.debt >= 44) risk += 0.055;
  if (projectLedger.marketPriceIndex < 92 && projectLedger.unsoldInventory > 22) risk += 0.03;
  if (visible.debt >= 50 && projectLedger.collateralValue < visible.debt * 0.36) risk += 0.035;
  if (boomMarketBuffer()) {
    const legalOrGray = event.modelTags?.some((tag) => ["gray-governance", "legal-exposure", "asset-freeze-chain", "protective-umbrella-risk"].includes(tag));
    if (!legalOrGray) risk -= 0.065;
    risk -= Math.max(0, (projectLedger.marketPriceIndex - 108) / 520);
  }
  if (isDownturnPhase() && (projectLedger.marketPriceIndex <= 96 || (projectLedger.lastPriceChange || 0) <= -4)) {
    risk += 0.035 + Math.max(0, -(projectLedger.lastPriceChange || 0)) / 180;
  }
  if ((game.flags.scaleGraceUntilTurn || 0) >= game.turn) {
    const legalOrGray = event.modelTags?.some((tag) => ["gray-governance", "legal-exposure", "asset-freeze-chain", "protective-umbrella-risk"].includes(tag));
    risk -= legalOrGray ? 0.025 : 0.075;
  }
  return Math.max(0.02, Math.min(0.55, risk));
}

function classifyHardFailure(choice) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const fundingLedger = refreshFundingLedger();
  const projectLedger = refreshProjectLedger();
  const deliveryFailureReady = projectDeliveryFailureReady(projectLedger);
  const buyerBlowupReady = projectBuyerBlowupReady(projectLedger);
  if ((game.flags.cashZeroTurns || 0) >= 2) return classifyCashZeroEnding();
  if (hidden.boss_safety <= 5) return "boss_controlled";
  if (hidden.asset_freeze_risk >= 92 && hidden.legal_exposure >= 65) return "asset_frozen";
  if ((hidden.local_isolation || 0) >= 90 && visible.government <= 14 && (visible.cash <= 20 || visible.bank <= 18)) return "isolated_blowup";
  if (hidden.gray_risk >= 92) return "gray_case";
  if (hidden.presale_misuse >= 88 && hidden.delivery_pressure >= 55) return "presale_misuse";
  if (visible.cash <= 0 && visible.debt >= 70 && game.turn >= 8) return "cash_break";
  if ((ledger.debt >= 70 || ledger.interest >= 70) && ledger.liquidity >= 55 && visible.cash <= 18 && visible.debt >= 62) return "cash_break";
  if (deliveryFailureReady && visible.delivery <= 5 && hidden.delivery_pressure >= 55) return "delivery_failure";
  if (deliveryFailureReady && (ledger.delivery >= 72 || ledger.presale >= 72) && visible.delivery <= 18 && hidden.delivery_pressure >= 50) return "delivery_failure";
  if (buyerBlowupReady && visible.public_trust <= 5 && visible.delivery <= 32) return "buyer_blowup";
  if (visible.debt >= 96 && visible.cash <= 22) return "debt_default";
  if ((fundingLedger.rolloverNeed >= 46 || fundingLedger.fundingStress >= 105) && visible.cash <= 22 && visible.bank <= 28 && game.turn >= 10) return "debt_default";
  if (ledger.legal >= 78 && hidden.asset_freeze_risk >= 62 && hidden.boss_safety <= 35) return "asset_frozen";
  if (game.scaleIndex >= 4 && visible.debt >= 86 && visible.cash <= 24 && visible.delivery <= 38) return "evergrande_style";
  return choice.instantEnding || null;
}

function hasProjectWorkoutAsset(ledger = refreshProjectLedger()) {
  if (!ledger.projects.length) return false;
  return ledger.projects.some((project) => {
    const value = marketValueForProject(project, ledger);
    const unsold = Math.max(0, (project.saleableInventory || 0) - (project.soldValue || 0));
    const severe = projectRiskProfile(project, ledger).severity;
    return value >= 8 && (unsold >= 4 || project.stage === "land" || project.stage === "construction" || severe <= 4);
  });
}

function classifyCashZeroEnding() {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const fundingLedger = refreshFundingLedger();
  if (projectDeliveryFailureReady() && (ledger.presale >= 38 || hidden.buyer_liability >= 42 || hidden.delivery_pressure >= 42) && visible.delivery <= 42) return "delivery_failure";
  if ((ledger.legal >= 32 || hidden.asset_freeze_risk >= 34 || hidden.legal_exposure >= 34) && hidden.boss_safety <= 58) return "asset_frozen";
  if ((fundingLedger.rolloverNeed >= 22 || fundingLedger.interestDue >= 8 || fundingLedger.collateralBorrowingRoom < -8) && visible.debt >= 36) return "debt_default";
  if ((ledger.debt >= 34 || ledger.interest >= 34 || visible.bank <= 24) && visible.debt >= 44) return "debt_default";
  return "cash_break";
}

function deferProjectEndingToActionWindow(endingId, event, choice) {
  const projectEndings = new Set(["delivery_failure", "buyer_blowup", "presale_misuse"]);
  const workoutEndings = new Set(["debt_default", "cash_break", "evergrande_style", "takeover_failed"]);
  if (!projectEndings.has(endingId) && !workoutEndings.has(endingId)) return false;
  if (PROJECT_CRISIS_EVENT_IDS.has(event.id) || PROJECT_WORKOUT_EVENT_IDS.has(event.id)) return false;
  if ((game.flags.projectCrisisWindowsUsed || 0) >= 2) return false;
  if ((game.flags.lastProjectCrisisWindowTurn || 0) >= game.turn - 2) return false;
  const ledger = refreshProjectLedger();
  if (workoutEndings.has(endingId) && !hasProjectWorkoutAsset(ledger)) return false;
  const worst = ledger.projects
    .map((project) => ({ project, risk: projectRiskProfile(project, ledger) }))
    .sort((a, b) => b.risk.severity - a.risk.severity)[0];
  const ids = workoutEndings.has(endingId)
    ? ["project-sale-window", "final-creditor-meeting", "white-list-application-review", "state-capital-takeover", "bank-branch-risk-meeting", "local-task-force-night"]
    : worst ? projectIssueEventIds(worst.project, worst.risk) : ["stoppage-video", "homebuyer-lawyer-letter", "local-task-force-night"];
  const reason = workoutEndings.has(endingId)
    ? "债务已经接近结局，但项目账本还有可处置资产。先进入资产处置桌：卖项目、抵押、国资接盘、白名单或债委会顺位。"
    : "项目风险已经足以结局，但系统先把你推到处置桌：复工、监管账户、业主或专班必须正面处理。";
  const pickedId = enqueueProjectAction(ids, 0, reason);
  if (!pickedId) return false;
  game.flags.projectCrisisWindowsUsed = (game.flags.projectCrisisWindowsUsed || 0) + 1;
  game.flags.lastProjectCrisisWindowTurn = game.turn;
  if (worst) {
    worst.project.lastIssueTurn = game.turn;
    worst.project.issueCount = (worst.project.issueCount || 0) + 1;
  }
  recordIncident(event, choice, "project-crisis-window", `原本会进入「${DATA.endings[endingId]?.title || endingId}」，但项目账本先触发处置窗口。${reason}`);
  enqueueFeedback("government", "warning", 6, 1, workoutEndings.has(endingId)
    ? "你不是没有资产，是资产已经要被重新排顺位。下一题必须谈卖项目、抵押、白名单、国资或债委会。"
    : "项目已经接近结局线。下一题不是普通经营选择，是保交楼、监管账户、业主和专班的处置桌。");
  return true;
}

function classifyProbableFailure(event, choice) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const fundingLedger = refreshFundingLedger();
  const projectLedger = refreshProjectLedger();
  const deliveryFailureReady = projectDeliveryFailureReady(projectLedger);
  const buyerBlowupReady = projectBuyerBlowupReady(projectLedger);
  const cashCrisis = (visible.cash <= 0 && visible.debt >= 70 && game.turn >= 8) || (game.turn >= 12 && visible.cash <= 6) || (game.turn >= 14 && visible.cash <= 15 && visible.debt >= 58);
  const financingCrisis =
    game.turn >= 10 &&
    (
      (ledger.liquidity >= 48 && (ledger.debt >= 42 || ledger.interest >= 40)) ||
      fundingLedger.fundingStress >= 82 ||
      fundingLedger.rolloverNeed >= 34 ||
      (fundingLedger.collateralBorrowingRoom < -16 && visible.bank <= 34)
    ) &&
    visible.cash <= 24 &&
    visible.debt >= 48;
  if ((hidden.boss_safety <= 24 || (ledger.legal >= 58 && hidden.boss_safety <= 36)) && game.phaseIndex >= 4) return "boss_controlled";
  if ((hidden.asset_freeze_risk >= 54 || ledger.legal >= 54) && hidden.legal_exposure >= 42 && hidden.boss_safety <= 55 && game.phaseIndex >= 4) return "asset_frozen";
  if ((hidden.gray_risk >= 70 || ledger.gray >= 56) && game.phaseIndex >= 3 && (game.seenEvents["anti-gang-investigation"] || event.id === "anti-gang-investigation")) return "gray_case";
  if ((hidden.local_isolation || 0) >= 66 && visible.government <= 22 && (visible.cash <= 32 || visible.bank <= 25) && game.phaseIndex >= 3) return "isolated_blowup";
  if (visible.debt >= 82 && (visible.cash <= 28 || hidden.off_balance_debt >= 64)) return "debt_default";
  if ((ledger.debt >= 56 || ledger.interest >= 58) && visible.debt >= 66 && visible.bank <= 32) return "debt_default";
  if ((cashCrisis || financingCrisis) && (ledger.debt >= 42 || ledger.interest >= 42 || visible.bank <= 24) && visible.debt >= 48) return "debt_default";
  if (hidden.presale_misuse >= 70 && hidden.delivery_pressure >= 52 && game.phaseIndex >= 3) return "presale_misuse";
  if (deliveryFailureReady && ((visible.delivery <= 16 && hidden.delivery_pressure >= 55) || ((ledger.delivery >= 50 || ledger.presale >= 50) && visible.delivery <= 28) || (event.id === "mortgage-boycott-letter" && hidden.delivery_pressure >= 48))) {
    return "delivery_failure";
  }
  if (deliveryFailureReady && (cashCrisis || financingCrisis) && (ledger.presale >= 36 || hidden.buyer_liability >= 42 || hidden.delivery_pressure >= 42) && visible.delivery <= 42) return "delivery_failure";
  if (buyerBlowupReady && ((visible.public_trust <= 18 && visible.delivery <= 36 && game.phaseIndex >= 3) || (ledger.buyers >= 48 && visible.public_trust <= 26 && visible.sales <= 30))) return "buyer_blowup";
  if ((hidden.gray_risk >= 72 || ledger.gray >= 58) && game.phaseIndex >= 3 && (game.seenEvents["anti-gang-investigation"] || event.id === "anti-gang-investigation")) {
    return "gray_case";
  }
  if ((hidden.boss_safety <= 20 || (ledger.legal >= 62 && hidden.boss_safety <= 32)) && game.phaseIndex >= 4) return "boss_controlled";
  if ((hidden.asset_freeze_risk >= 76 && hidden.legal_exposure >= 54 && game.phaseIndex >= 4) || (ledger.legal >= 64 && hidden.asset_freeze_risk >= 52 && game.phaseIndex >= 4)) return "asset_frozen";
  if ((cashCrisis || financingCrisis) && (ledger.legal >= 36 || hidden.asset_freeze_risk >= 38 || hidden.legal_exposure >= 38)) return "asset_frozen";
  if ((hidden.local_isolation || 0) >= 66 && visible.government <= 22 && (visible.cash <= 32 || visible.bank <= 25) && game.phaseIndex >= 3) return "isolated_blowup";
  if (
    hidden.exit_preparation >= 78 &&
    game.turn <= 38 &&
    game.scaleIndex <= 3 &&
    visible.cash >= 48 &&
    visible.debt <= 48 &&
    visible.delivery >= 58 &&
    visible.government >= 38 &&
    visible.government <= 68 &&
    visible.bank >= 48 &&
    visible.public_trust >= 54 &&
    (hidden.financing_cost || 0) <= 32 &&
    (hidden.buyer_liability || 0) <= 32 &&
    hidden.legal_exposure <= 32 &&
    hidden.asset_freeze_risk <= 30 &&
    (hidden.local_isolation || 0) <= 32 &&
    ledger.debt <= 34 &&
    ledger.interest <= 32 &&
    ledger.presale <= 32 &&
    ledger.legal <= 26
  ) return "clean_exit";
  if (hidden.exit_preparation >= 65 && hidden.legal_exposure >= 58 && hidden.asset_freeze_risk >= 50) return "runaway_caught";
  if (game.scaleIndex >= 4 && visible.debt >= 78 && visible.cash <= 32 && visible.delivery <= 42) return "evergrande_style";
  if (financingCrisis || cashCrisis) return "cash_break";
  return null;
}

function canTakeEnding(endingId) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  if (endingId === "high_point_exit") {
    const ledger = game.riskLedger || createRiskLedger();
    return game.turn <= 38 && game.scaleIndex <= 4 && visible.cash >= 50 && visible.debt <= 48 && visible.delivery >= 58 && visible.government >= 38 && visible.government <= 68 && visible.bank >= 50 && visible.public_trust >= 54 && hidden.boss_safety >= 62 && (hidden.financing_cost || 0) <= 32 && (hidden.buyer_liability || 0) <= 32 && hidden.legal_exposure <= 30 && hidden.asset_freeze_risk <= 28 && (hidden.local_isolation || 0) <= 32 && ledger.debt <= 34 && ledger.interest <= 32 && ledger.presale <= 32 && ledger.legal <= 26;
  }
  if (endingId === "clean_exit") {
    const ledger = game.riskLedger || createRiskLedger();
    const projectLedger = refreshProjectLedger();
    const hasClosedLoop = projectLedger.projects.some((project) => project.stage === "delivered" || (project.distressSold || 0) > 0 || (project.freeCashCollected || 0) >= 8);
    return (
      hasClosedLoop &&
      hidden.exit_preparation >= 38 &&
      game.turn <= 42 &&
      game.scaleIndex <= 3 &&
      visible.cash >= 28 &&
      visible.debt <= 64 &&
      visible.delivery >= 44 &&
      visible.government >= 28 &&
      visible.government <= 72 &&
      visible.bank >= 32 &&
      visible.public_trust >= 38 &&
      hidden.boss_safety >= 48 &&
      (hidden.financing_cost || 0) <= 46 &&
      (hidden.buyer_liability || 0) <= 48 &&
      hidden.legal_exposure <= 44 &&
      hidden.asset_freeze_risk <= 40 &&
      (hidden.local_isolation || 0) <= 46 &&
      ledger.debt <= 56 &&
      ledger.interest <= 54 &&
      ledger.presale <= 56 &&
      ledger.legal <= 42
    );
  }
  if (endingId === "state_rescue") {
    return visible.delivery >= 25 && hidden.boss_safety >= 22 && game.phaseIndex >= 4 && (hidden.control_loss || 0) >= 12;
  }
  return true;
}

function buildScaleTransition(type, from, to) {
  const isUp = type === "up";
  const pressure = isUp
    ? [
        "银行开始看连续项目和抵押物，而不是只看熟人介绍。",
        "地方会给你更大的入口，也会把更多稳定责任放到你桌上。",
        "同行不再把你当小角色，举报、渠道战和拿地卡口会更频繁。"
      ]
    : [
        "原来的桌子坐不住了，项目、团队和债权人会重新给你定价。",
        "关系不会立刻消失，但它会先保护自己。",
        "现在最重要的不是面子，而是能不能把现金和责任切开。"
      ];
  return {
    type,
    from: from.title,
    to: to.title,
    kicker: isUp ? "升阶" : "收缩",
    title: isUp ? `升到${to.title}` : `退回${to.title}`,
    text: isUp
      ? `你从「${from.title}」坐到「${to.title}」这张桌。不是简单变强，而是对手、银行、政府部门和项目责任一起换了级别。`
      : `你从「${from.title}」退回「${to.title}」。不是游戏惩罚，而是现金、债务或个人风险不再支撑原来的牌桌。`,
    role: to.title,
    desk: contactDeskSummary(),
    safety: pick(pressure)
  };
}

function renderScaleTransition() {
  if (!game?.scaleTransition) {
    renderEvent();
    return;
  }
  renderShell();
  const transition = game.scaleTransition;
  show(elements.scaleScreen);
  elements.scaleTransitionKicker.textContent = transition.kicker;
  elements.scaleTransitionTitle.textContent = transition.title;
  elements.scaleTransitionText.textContent = transition.text;
  elements.scaleTransitionRole.textContent = transition.role;
  elements.scaleTransitionDesk.textContent = transition.desk;
  elements.scaleTransitionSafety.textContent = transition.safety;
}

function continueScaleTransition() {
  if (!game?.scaleTransition) return;
  const previousEventId = game.pendingAdvance?.previousEventId || game.currentEvent;
  const previousEvent = eventById(previousEventId);
  game.scaleTransition = null;
  game.pendingAdvance = null;
  game.notice = "";
  advanceToNextEvent(previousEventId, previousEvent, null);
}

function scaleProgressBonus() {
  const ledger = refreshProjectLedger();
  const delivered = ledger.projects.filter((project) => project.stage === "delivered").length;
  const deliveryPipeline = ledger.projects.filter((project) => ["presale", "delivery"].includes(project.stage) && (project.constructionProgress || 0) >= 70).length;
  const assetBase = Math.min(5, Math.round((ledger.marketAssetValue || 0) / 42));
  const cashBase = Math.min(4, Math.round((ledger.freeCashCollected || 0) / 22));
  return delivered * 3 + deliveryPipeline + assetBase + cashBase;
}

function updateScale() {
  const oldScale = game.scaleIndex;
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const scenario = currentCycleScenario();
  const minTurnAdjust = { "long-boom": -2, "normal-cycle": -1, "early-tighten": 1, "sudden-freeze": 2, "policy-rescue": 0 }[scenario.id] || 0;
  const effectiveScaleScore = game.scaleScore + (scenario.scaleBonus || 0) + scaleProgressBonus();
  const next = DATA.scales[game.scaleIndex + 1];
  const minTurn = Math.max(1, (MIN_TURNS_FOR_SCALE[game.scaleIndex + 1] || 999) + minTurnAdjust);

  if (
    next &&
    game.turn >= minTurn &&
    effectiveScaleScore >= next.minScore &&
    visible.cash > 18 + game.scaleIndex * 2 &&
    visible.debt < 82 &&
    visible.delivery > 32 &&
    visible.bank > 24 &&
    visible.public_trust > 26 &&
    hidden.boss_safety > 28 &&
    (hidden.local_isolation || 0) < 78
  ) {
    game.scaleIndex += 1;
    applyScaleCreditBuffer(oldScale, game.scaleIndex);
    game.state.visible.debt = clamp(game.state.visible.debt + 3 + game.scaleIndex * 2);
    game.state.hidden.delivery_pressure = clamp(game.state.hidden.delivery_pressure + 4 + game.scaleIndex);
    game.state.hidden.political_dependency = clamp(game.state.hidden.political_dependency + 2);
    game.notice = "";
    game.scaleTransition = buildScaleTransition("up", DATA.scales[oldScale], currentScale());
    game.scaleHistory.push({
      turn: game.turn,
      title: `升阶：${DATA.scales[oldScale].title} -> ${currentScale().title}`,
      text: `${currentScale().standard} 新桌面：${contactDeskSummary()}。`
    });
    return;
  }

  const currentMin = currentScale().minScore;
  if (game.scaleIndex > 0 && (game.scaleScore < currentMin - 22 || (visible.cash < 12 && visible.debt > 68) || hidden.boss_safety < 18)) {
    game.scaleIndex -= 1;
    game.notice = "";
    game.scaleTransition = buildScaleTransition("down", DATA.scales[oldScale], currentScale());
    game.scaleHistory.push({
      turn: game.turn,
      title: `收缩：${DATA.scales[oldScale].title} -> ${currentScale().title}`,
      text: `现金和债务不支持原有规模，项目被卖、团队被砍，市场开始重新给你定价。新桌面：${contactDeskSummary()}。`
    });
  }
}

function updatePhase() {
  let target = game.phaseIndex;
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const phaseTurns = currentCycleScenario()?.phaseTurns || DEFAULT_PHASE_TURNS;
  for (let index = 1; index < phaseTurns.length; index += 1) {
    if (game.turn >= phaseTurns[index]) target = Math.max(target, index);
  }
  if (game.turn >= 12 && (visible.debt >= 58 || hidden.data_inflation >= 32)) target = Math.max(target, 3);
  if ((game.turn >= 18 && visible.cash <= 12) || (game.turn >= 18 && visible.sales <= 16)) target = Math.max(target, 4);
  if ((game.turn >= 22 && hidden.delivery_pressure >= 50) || (game.turn >= 22 && visible.delivery <= 24)) target = Math.max(target, 5);
  if (game.turn >= 28 && (hidden.asset_freeze_risk >= 60 || hidden.legal_exposure >= 60)) target = Math.max(target, 6);
  target = Math.min(target, game.phaseIndex + 1);
  if (game.turn - (game.flags.phaseStartTurn || 1) < 10) target = game.phaseIndex;

  if (target > game.phaseIndex) {
    const old = currentPhase();
    game.phaseIndex = clamp(target, 0, DATA.phases.length - 1);
    game.flags.phaseStartTurn = game.turn;
    const next = currentPhase();
    game.notice = `${game.notice ? `${game.notice}；` : ""}周期切换：${old.title} -> ${next.title}`;
    game.scaleHistory.push({
      turn: game.turn,
      title: `周期切换：${next.title}`,
      text: `${next.policy}。${next.market}。`
    });
  }
}

function selectNextEvent(previousId) {
  const candidates = [];

  queuedEventCandidates(previousId).forEach((entry) => {
    const overdue = Math.max(0, game.turn - entry.availableTurn);
    const isReaction = REACTION_EVENT_IDS.has(entry.id);
    const isProjectPriority = entry.priority === "project";
    candidates.push({
      id: entry.id,
      kind: "queued",
      entry,
      weight: (isProjectPriority ? 86 : isReaction ? 46 : 14) +
        overdue * (isProjectPriority ? 9 : isReaction ? 7 : 4) +
        eventBankWeight(eventById(entry.id)) * (isProjectPriority ? 0.42 : isReaction ? 0.32 : 0.18)
    });
  });

  interruptCandidates().forEach((event) => {
    const pressure = currentPhase().pressure + cyclePressureAdjust() + game.scaleIndex * 0.025 + game.turn * 0.004;
    if (Math.random() <= Math.min(0.72, 0.12 + pressure + computeSystemPressure() * 0.35)) {
      candidates.push({
        id: event.id,
        kind: "interrupt",
        weight: 20 + interruptWeight(event) * 0.8
      });
    }
  });

  questionBankCandidates(previousId).forEach((event) => {
    candidates.push({
      id: event.id,
      kind: "bank",
      weight: eventBankWeight(event) * (0.65 + Math.random() * 0.7)
    });
  });

  const main = nextMainLineCandidate(previousId);
  if (main) {
    candidates.push({
      id: main.id,
      kind: "main",
      mainIndex: main.index,
      weight: 9 + game.turn * 0.2
    });
  }

  if (!candidates.length) return null;

  const picked = pickWeighted(candidates, (candidate) => candidate.weight);
  if (picked.kind === "queued") {
    removeQueuedEntry(picked.entry);
    if (picked.entry.reason) {
      game.scaleHistory.push({ turn: game.turn, title: "暗线发酵", text: picked.entry.reason });
    }
  }
  if (picked.kind === "main") {
    game.mainStep = Math.max(game.mainStep, picked.mainIndex + 1);
  }
  advanceMainStep(picked.id);
  return picked.id;
}

function pickRandomQuestionBankEvent(previousId) {
  const candidates = questionBankCandidates(previousId);
  if (!candidates.length) return null;
  return pickWeighted(candidates, eventBankWeight).id;
}

function questionBankCandidates(previousId) {
  return DATA.events.filter((event) => {
    if (!event || event.id === previousId || game.seenEvents[event.id]) return false;
    if (event.id === game.origin.startEvent) return false;
    return canFireEvent(event);
  });
}

function eventBankWeight(event) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const severityWeight = { routine: 6, pressure: 14, high: 24, crisis: 36 }[event.severity] || 12;
  let weight = severityWeight + (currentPhase().pressure + cyclePressureAdjust()) * 120 + game.turn * 0.35 + game.scaleIndex * 4;
  const tags = event.modelTags || [];
  if (tags.includes("presale-cashflow-trap")) weight += hidden.presale_misuse + hidden.delivery_pressure * 0.5;
  if (tags.includes("delivery-first")) weight += Math.max(0, 48 - visible.delivery) + hidden.delivery_pressure;
  if (tags.includes("balance-sheet-maintenance")) weight += visible.debt * 0.55 + hidden.off_balance_debt * 0.65;
  if (tags.includes("leverage-backfire")) weight += visible.debt * 0.7 + Math.max(0, 45 - visible.cash);
  if (tags.includes("risk-transfer-chain")) weight += hidden.off_balance_debt * 0.5 + Math.max(0, 45 - visible.public_trust);
  if (tags.includes("political-embedded-enterprise")) weight += hidden.political_dependency + Math.abs(visible.government - 52) * 0.5;
  if (tags.includes("gray-governance")) weight += hidden.gray_risk;
  if (tags.includes("phantom-demand")) weight += hidden.price_bubble + Math.max(0, visible.sales - 62);
  if (tags.includes("data-inflation")) weight += hidden.data_inflation;
  if (tags.includes("asset-freeze-chain")) weight += hidden.asset_freeze_risk + hidden.legal_exposure * 0.4;
  if (tags.includes("legal-exposure")) weight += hidden.legal_exposure + (100 - hidden.boss_safety) * 0.35;
  if (tags.includes("local-isolation")) weight += (hidden.local_isolation || 0) + Math.max(0, 34 - visible.government);
  if (tags.includes("whitelist-financing")) weight += Math.max(0, 45 - visible.cash) + hidden.delivery_pressure * 0.7;
  if (tags.includes("escrow-control")) weight += hidden.presale_misuse + hidden.delivery_pressure;
  if (tags.includes("inventory-overhang")) weight += Math.max(0, 45 - visible.sales) + hidden.price_bubble;
  if (tags.includes("land-fiscal-pressure")) weight += Math.max(0, 70 - visible.government) + game.phaseIndex * 4;
  if (tags.includes("worker-wage-risk")) weight += Math.max(0, 45 - visible.cash) + hidden.off_balance_debt * 0.45;
  if (tags.includes("audit-revenue-recognition")) weight += hidden.data_inflation + Math.max(0, 65 - visible.delivery);
  if (tags.includes("share-pledge-chain")) weight += visible.debt * 0.4 + Math.max(0, 45 - visible.bank);
  if (tags.includes("state-purchase-floor")) weight += Math.max(0, 42 - visible.sales) + Math.max(0, 55 - visible.cash);
  if (tags.includes("cycle-asset-trader")) weight += hidden.exit_preparation + Math.max(0, 70 - visible.cash) + game.phaseIndex * 6;
  if (tags.includes("commercial-asset-exit")) weight += Math.max(0, 58 - visible.sales) + game.scaleIndex * 6;
  if (tags.includes("control-right-risk")) weight += hidden.exit_preparation + hidden.legal_exposure * 0.45 + Math.max(0, 45 - visible.bank);
  if (tags.includes("government-permit-power")) weight += Math.max(0, 38 - visible.government) + (game.riskLedger?.government || 0) + (game.stakeholderStress?.local || 0) * 0.35;
  if (tags.includes("counterparty-retaliation")) weight += (game.riskLedger?.counterparty || 0) + (game.stakeholderStress?.contractor || 0) * 0.35 + (game.stakeholderStress?.suppliers || 0) * 0.35;
  if (tags.includes("competitor-pressure")) weight += (game.riskLedger?.competitor || 0) + (game.stakeholderStress?.competitors || 0) * 0.55 + Math.max(0, visible.sales - 38) + competitionProfile().intensity * 0.55;
  if (tags.includes("protective-umbrella-risk")) weight += (game.riskLedger?.blackmail || 0) + (game.stakeholderStress?.underground || 0) * 0.65 + hidden.gray_risk;
  if (tags.includes("pre-sale-funds-leak")) weight += hidden.presale_misuse + (hidden.buyer_liability || 0) + Math.max(0, 45 - visible.delivery);
  if (tags.includes("bid-rigging-chain")) weight += competitionPressureScore() * 0.45 + hidden.legal_exposure + Math.max(0, 45 - visible.government);
  if (tags.includes("low-bid-change-order")) weight += (game.stakeholderStress?.contractor || 0) * 0.6 + (game.stakeholderStress?.suppliers || 0) * 0.4 + hidden.delivery_pressure;
  if (tags.includes("shadow-banking-loop")) weight += (hidden.financing_cost || 0) + visible.debt * 0.45 + Math.max(0, 40 - visible.cash);
  if (tags.includes("related-party-financing")) weight += hidden.data_inflation + hidden.legal_exposure + hidden.off_balance_debt;
  weight += darkLineEventFit(event) * 0.72;
  return Math.max(1, weight);
}

function darkLineEventFit(event) {
  if (!event || !game) return 0;
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const tags = new Set(event.modelTags || []);
  let fit = 0;
  if (tags.has("pre-sale-funds-leak") || tags.has("presale-cashflow-trap") || tags.has("escrow-control")) {
    fit += hidden.presale_misuse * 0.7 + (hidden.buyer_liability || 0) * 0.45 + ledger.presale * 0.38;
  }
  if (tags.has("political-embedded-enterprise") || tags.has("government-permit-power") || tags.has("local-isolation")) {
    fit += hidden.political_dependency * 0.45 + (hidden.local_isolation || 0) * 0.55 + Math.max(0, 36 - visible.government) * 1.1 + ledger.official * 0.35;
  }
  if (tags.has("gray-governance") || tags.has("protective-umbrella-risk")) {
    fit += hidden.gray_risk * 0.75 + ledger.gray * 0.45 + ledger.blackmail * 0.45 + (game.stakeholderStress?.underground || 0) * 0.6;
  }
  if (tags.has("shadow-banking-loop") || tags.has("related-party-financing") || tags.has("balance-sheet-maintenance")) {
    fit += (hidden.financing_cost || 0) * 0.65 + hidden.off_balance_debt * 0.5 + ledger.interest * 0.38 + ledger.debt * 0.28;
  }
  if (tags.has("counterparty-retaliation") || tags.has("low-bid-change-order")) {
    fit += (game.stakeholderStress?.contractor || 0) * 0.55 + (game.stakeholderStress?.suppliers || 0) * 0.4 + ledger.counterparty * 0.45;
  }
  if (tags.has("exit-discipline") || tags.has("cycle-asset-trader") || tags.has("commercial-asset-exit") || tags.has("control-right-risk")) {
    fit += (hidden.exit_preparation || 0) * 0.7 + ledger.exit * 0.5 + Math.max(0, visible.cash - 32) * 0.35 + Math.max(0, 62 - visible.debt) * 0.2;
  }
  if (tags.has("data-inflation") || tags.has("audit-revenue-recognition")) {
    fit += hidden.data_inflation * 0.7 + ledger.audit * 0.55;
  }
  if (tags.has("asset-freeze-chain") || tags.has("legal-exposure")) {
    fit += hidden.legal_exposure * 0.6 + hidden.asset_freeze_risk * 0.6 + ledger.legal * 0.45 + Math.max(0, 60 - hidden.boss_safety) * 0.35;
  }
  return fit;
}

function syncPhaseForEvent(id) {
  const event = eventById(id);
  const phaseId = event.phase?.[0];
  const index = DATA.phases.findIndex((phase) => phase.id === phaseId);
  if (index >= 0) game.phaseIndex = Math.max(game.phaseIndex, index);
}

function advanceMainStep(previousId) {
  const index = DATA.mainLine.indexOf(previousId);
  if (index >= 0 && game.mainStep <= index) {
    game.mainStep = index + 1;
  }
}

function nextMainLineCandidate(previousId) {
  for (let index = game.mainStep; index < DATA.mainLine.length; index += 1) {
    const id = DATA.mainLine[index];
    if (id === previousId || game.seenEvents[id]) continue;
    const event = eventById(id);
    if (canFireMainEvent(event)) return { id, index };
  }
  return null;
}

function queuedEventCandidates(previousId) {
  return game.eventQueue
    .filter((entry) => entry.availableTurn <= game.turn && entry.id !== previousId)
    .filter((entry) => {
      const event = eventById(entry.id);
      return !game.seenEvents[event.id] && canFireEvent(event);
    });
}

function removeQueuedEntry(entry) {
  const index = game.eventQueue.indexOf(entry);
  if (index >= 0) game.eventQueue.splice(index, 1);
}

function maybePickInterrupt() {
  const candidates = interruptCandidates();
  if (!candidates.length) return null;
  const pressure = currentPhase().pressure + cyclePressureAdjust() + game.scaleIndex * 0.025 + game.turn * 0.004;
  if (Math.random() > Math.min(0.34, pressure)) return null;
  return pickWeighted(candidates, interruptWeight).id;
}

function interruptCandidates() {
  return DATA.interruptEvents
    .map((id) => eventById(id))
    .filter((event) => !game.seenEvents[event.id] && canFireEvent(event) && interruptCondition(event));
}

function computeSystemPressure() {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const projectLedger = refreshProjectLedger();
  const fundingLedger = refreshFundingLedger();
  return Math.min(
    1,
    currentPhase().pressure + cyclePressureAdjust() +
      game.scaleIndex * 0.04 +
      (ledger.liquidity + ledger.debt + ledger.interest + ledger.presale + ledger.legal + ledger.official + ledger.government + ledger.counterparty + ledger.competitor + ledger.blackmail) / 880 +
      (fundingLedger.fundingStress || 0) / 520 +
      Math.max(0, -fundingLedger.collateralBorrowingRoom) / 180 +
      Math.max(0, 38 - visible.cash) / 120 +
      Math.max(0, visible.debt - 55) / 140 +
      Math.max(0, 40 - visible.delivery) / 140 +
      ((hidden.financing_cost || 0) + (hidden.buyer_liability || 0)) / 260 +
      Math.max(0, 94 - projectLedger.marketPriceIndex) / 210 +
      Math.max(0, visible.debt * 0.42 - projectLedger.collateralValue) / 260
  );
}

function isBoomPhase() {
  return ["early-expansion", "shelter-reform-boom", "high-turnover"].includes(currentPhase().id);
}

function isDownturnPhase() {
  return ["three-red-lines", "sales-freeze", "guaranteed-delivery", "clearance"].includes(currentPhase().id);
}

function boomMarketBuffer() {
  if (!game || !isBoomPhase()) return false;
  const ledger = refreshProjectLedger();
  const visible = game.state.visible;
  return (
    ledger.marketPriceIndex >= 108 &&
    visible.sales >= 30 &&
    (ledger.marketAssetValue >= Math.max(22, visible.debt * 0.55) || ledger.collateralValue >= visible.debt * 0.32)
  );
}

function deferBoomEnding(endingId, event, choice) {
  if (!["cash_break", "debt_default", "delivery_failure", "takeover_failed"].includes(endingId)) return false;
  if (!boomMarketBuffer()) return false;
  if ((game.flags.lastBoomDeferralTurn || 0) >= game.turn - 3) return false;
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = refreshProjectLedger();
  const fundingLedger = refreshFundingLedger();
  const bridgeCash = Math.max(4, Math.min(12, Math.round((ledger.collateralValue + ledger.marketAssetValue * 0.08) / 12)));
  visible.cash = clamp(visible.cash + bridgeCash);
  visible.debt = clamp(visible.debt + Math.max(2, Math.round(bridgeCash * 0.55)));
  visible.bank = clamp(visible.bank + 2);
  visible.sales = clamp(visible.sales + 2);
  hidden.price_bubble = clamp((hidden.price_bubble || 0) + 5);
  hidden.financing_cost = clamp((hidden.financing_cost || 0) + 3);
  hidden.buyer_liability = clamp((hidden.buyer_liability || 0) + 2);
  addFunding("bankLoan", Math.round(bridgeCash * 0.6));
  addFunding("trustLoan", Math.round(bridgeCash * 0.25));
  fundingLedger.lastWarning = "上行期没有解决风险，只是用涨价、抵押和新钱把风险往后推。";
  game.flags.lastBoomDeferralTurn = game.turn;
  recordIncident(event, choice, "boom-deferral", `原本会进入「${DATA.endings[endingId]?.title || endingId}」，但房价上行和销售热度让银行、信托和买房人暂时愿意继续相信你。新增周转 ${bridgeCash}，但泡沫、利息和购房款责任同步加厚。`);
  enqueueOneOf(["trust-money-arrives", "high-turnover-meeting", "interest-rollover-friday", "bank-branch-risk-meeting", "redline-reporting-night"], 2, "上行期把问题往后推：销售、抵押和新融资暂时接住了你，但下一次收紧会更疼。");
  return true;
}

function projectCrisisPhaseOverride(event) {
  if (!PROJECT_CRISIS_EVENT_IDS.has(event.id) && !PROJECT_WORKOUT_EVENT_IDS.has(event.id)) return false;
  if (!game || game.turn < 3) return false;
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const projectLedger = refreshProjectLedger();
  if (PROJECT_WORKOUT_EVENT_IDS.has(event.id)) {
    return hasProjectWorkoutAsset(projectLedger) && (
      visible.cash <= 18 ||
      visible.debt >= 58 ||
      visible.bank <= 28 ||
      fundingDebtExposure(refreshFundingLedger()) >= 54 ||
      ledger.debt >= 36 ||
      ledger.interest >= 34 ||
      (event.id === "project-sale-window" && ((hidden.exit_preparation || 0) >= 24 || visible.cash <= 24))
    );
  }
  const hasSevereProject = projectLedger.projects.some((project) => projectRiskProfile(project, projectLedger).severity >= 4);
  return (
    hasSevereProject ||
    hidden.delivery_pressure >= 34 ||
    (hidden.buyer_liability || 0) >= 34 ||
    ledger.delivery >= 22 ||
    ledger.presale >= 22 ||
    visible.delivery <= 34 ||
    visible.public_trust <= 32
  );
}

function canFireEvent(event) {
  const phaseId = currentPhase().id;
  if (!event.phase.includes(phaseId) && !projectCrisisPhaseOverride(event)) return false;
  if (game.scaleIndex < event.minScale || game.scaleIndex > event.maxScale) return false;
  if (event.id === "high-point-exit-window" && !isExitWindowOpen()) return false;
  if (event.id === "voluntary-exit-window" && !isVoluntaryExitWindowOpen()) return false;
  if (event.id === "anti-gang-investigation") {
    return game.turn >= 10 && game.phaseIndex >= 3 && game.state.hidden.gray_risk >= 52 && Boolean(game.seenEvents["demolition-nail-house"]);
  }
  if (event.id === "boss-travel-ban") {
    return game.turn >= 14 && game.phaseIndex >= 4 && game.state.hidden.boss_safety <= 45;
  }
  if (event.id === "airport-control-window") {
    return game.turn >= 18 && game.phaseIndex >= 4 && (game.state.hidden.exit_preparation >= 38 || game.state.hidden.asset_freeze_risk >= 45);
  }
  if (event.id === "asset-freeze-order") {
    return game.phaseIndex >= 4 && game.state.hidden.asset_freeze_risk >= 45;
  }
  if (event.id === "founder-police-inquiry") {
    return game.phaseIndex >= 4 && game.state.hidden.legal_exposure >= 50;
  }
  if (event.id === "local-protection-gap") {
    return game.turn >= 12 && game.phaseIndex >= 3 && (game.state.visible.government <= 28 || (game.state.hidden.local_isolation || 0) >= 45);
  }
  if (event.id === "liquidation-petition") {
    return game.scaleIndex >= 4 && game.phaseIndex >= 5 && game.state.visible.debt >= 58;
  }
  if (event.id === "offshore-bond-due") {
    return game.scaleIndex >= 3 && game.state.visible.debt >= 52;
  }
  if (event.id === "diversification-circus") {
    return game.scaleIndex >= 3;
  }
  return true;
}

function canFireMainEvent(event) {
  if (!event || game.seenEvents[event.id]) return false;
  if (event.id === "high-point-exit-window") return isExitWindowOpen();
  return canFireEvent(event);
}

function interruptCondition(event) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const relation = game.relations;
  const rules = {
    "supplier-blockade": hidden.off_balance_debt >= 32 || relation.suppliers <= 24,
    "school-district-promise": visible.sales >= 38 && hidden.price_bubble >= 24,
    "distressed-project-bargain": game.phaseIndex >= 3 && visible.cash >= 18,
    "offshore-bond-due": game.scaleIndex >= 3 && visible.debt >= 52,
    "diversification-circus": game.scaleIndex >= 3 && visible.government >= 45,
    "boss-travel-ban": hidden.boss_safety <= 45 && game.phaseIndex >= 4,
    "airport-control-window": (hidden.exit_preparation >= 38 || hidden.asset_freeze_risk >= 45) && game.phaseIndex >= 4,
    "asset-freeze-order": hidden.asset_freeze_risk >= 45 && game.phaseIndex >= 4,
    "founder-police-inquiry": hidden.legal_exposure >= 50 && game.phaseIndex >= 4,
    "local-protection-gap": (visible.government <= 28 || (hidden.local_isolation || 0) >= 45) && game.phaseIndex >= 3,
    "redline-reporting-night": game.phaseIndex >= 3 && (visible.debt >= 50 || hidden.data_inflation >= 30),
    "wealth-product-redemption": game.phaseIndex >= 3 && (hidden.off_balance_debt >= 34 || visible.debt >= 56),
    "project-sale-window": game.phaseIndex >= 3 && visible.cash >= 18,
    "family-office-transfer": game.phaseIndex >= 4 && (hidden.exit_preparation >= 24 || hidden.boss_safety <= 62 || visible.debt >= 62),
    "homebuyers-mortgage-letter": game.phaseIndex >= 4 && (hidden.delivery_pressure >= 34 || visible.delivery <= 38),
    "interest-rollover-friday": visible.debt >= 38 || (hidden.financing_cost || 0) >= 22 || visible.cash <= 24,
    "escrow-gap-screenshot": game.phaseIndex >= 3 && ((hidden.buyer_liability || 0) >= 28 || hidden.presale_misuse >= 28 || hidden.delivery_pressure >= 32),
    "supplier-bill-discount": hidden.off_balance_debt >= 24 || visible.cash <= 24 || game.relations.suppliers <= 30,
    "bank-branch-risk-meeting": game.phaseIndex >= 3 && (visible.bank <= 34 || visible.debt >= 50 || (hidden.financing_cost || 0) >= 30),
    "homebuyer-lawyer-letter": game.phaseIndex >= 4 && ((hidden.buyer_liability || 0) >= 32 || visible.public_trust <= 35 || visible.delivery <= 36),
    "local-task-force-night": game.phaseIndex >= 4 && (hidden.delivery_pressure >= 34 || visible.government <= 34 || (hidden.local_isolation || 0) >= 36),
    "discount-sale-stampede": game.phaseIndex >= 3 && (visible.sales <= 36 || hidden.price_bubble >= 30),
    "personal-guarantee-call": game.phaseIndex >= 2 && (visible.debt >= 48 || (hidden.financing_cost || 0) >= 34 || hidden.off_balance_debt >= 32),
    "planning-stop-work-order": visible.government <= 32 || (hidden.local_isolation || 0) >= 30 || (game.stakeholderStress?.competitors || 0) >= 34,
    "tax-and-construction-joint-audit": game.phaseIndex >= 1 && (visible.government <= 30 || hidden.data_inflation >= 24 || (game.stakeholderStress?.local || 0) >= 36),
    "competitor-anonymous-report": competitionPressureScore() >= 34 || visible.sales >= 38 || visible.government <= 30,
    "rival-price-raid": game.phaseIndex >= 1 && (competitionPressureScore() >= 36 || visible.sales <= 34 || hidden.price_bubble >= 28),
    "land-auction-enclosure": game.phaseIndex <= 3 && (competitionPressureScore() >= 36 || visible.government <= 34),
    "contractor-evidence-package": (game.stakeholderStress?.contractor || 0) >= 34 || (game.stakeholderStress?.suppliers || 0) >= 38 || hidden.delivery_pressure >= 38,
    "earthwork-boss-blackmail": (game.stakeholderStress?.underground || 0) >= 30 || hidden.gray_risk >= 42,
    "protective-umbrella-transfer": game.phaseIndex >= 2 && (hidden.political_dependency >= 38 || hidden.gray_risk >= 35 || (game.stakeholderStress?.local || 0) >= 40),
    "public-security-tea": game.phaseIndex >= 3 && (hidden.gray_risk >= 45 || (game.stakeholderStress?.underground || 0) >= 38 || hidden.legal_exposure >= 45),
    "channel-poaching-war": game.phaseIndex >= 1 && (competitionPressureScore() >= 34 || game.relations.channel <= 16 || visible.sales <= 34),
    "liquidation-petition": game.scaleIndex >= 4 && game.phaseIndex >= 5 && visible.debt >= 58,
    "anti-gang-investigation": hidden.gray_risk >= 52 && game.phaseIndex >= 3 && Boolean(game.seenEvents["demolition-nail-house"]),
    "mortgage-funds-wrong-account": game.phaseIndex >= 3 && (hidden.presale_misuse >= 24 || (hidden.buyer_liability || 0) >= 34 || visible.delivery <= 38),
    "fake-progress-drawdown": game.phaseIndex >= 2 && (hidden.presale_misuse >= 18 || hidden.data_inflation >= 24 || hidden.delivery_pressure >= 30),
    "bid-companion-companies": game.phaseIndex <= 3 && (competitionPressureScore() >= 30 || visible.government <= 36 || (game.riskLedger?.government || 0) >= 16),
    "low-bid-change-order-night": (game.stakeholderStress?.contractor || 0) >= 24 || hidden.delivery_pressure >= 26 || visible.cash <= 30,
    "land-auction-bond-borrowed": game.phaseIndex <= 2 && (visible.cash <= 36 || visible.government >= 32 || visible.land_bank <= 34),
    "private-fund-bridge-weekend": game.phaseIndex >= 2 && (visible.cash <= 28 || (hidden.financing_cost || 0) >= 26 || visible.debt >= 48),
    "earthwork-subcontract-chain": (hidden.gray_risk >= 18 || (game.stakeholderStress?.underground || 0) >= 18 || (game.stakeholderStress?.contractor || 0) >= 28),
    "related-bank-spv-loan": game.phaseIndex >= 1 && (visible.bank <= 38 || hidden.off_balance_debt >= 24 || (hidden.financing_cost || 0) >= 24)
    ,
    "voluntary-exit-window": isVoluntaryExitWindowOpen()
  };
  return Boolean(rules[event.id]);
}

function interruptWeight(event) {
  const hidden = game.state.hidden;
  const visible = game.state.visible;
  const weights = {
    "supplier-blockade": hidden.off_balance_debt + (100 - game.relations.suppliers),
    "school-district-promise": visible.sales + hidden.price_bubble,
    "distressed-project-bargain": game.phaseIndex * 12 + visible.cash,
    "offshore-bond-due": visible.debt + hidden.off_balance_debt,
    "diversification-circus": hidden.diversification_fantasy + game.scaleIndex * 20,
    "boss-travel-ban": 100 - hidden.boss_safety,
    "airport-control-window": hidden.exit_preparation + hidden.asset_freeze_risk,
    "asset-freeze-order": hidden.asset_freeze_risk + hidden.legal_exposure,
    "founder-police-inquiry": hidden.legal_exposure + hidden.presale_misuse,
    "local-protection-gap": (hidden.local_isolation || 0) + Math.max(0, 40 - visible.government) + Math.max(0, 34 - visible.bank),
    "redline-reporting-night": visible.debt + hidden.data_inflation,
    "wealth-product-redemption": hidden.off_balance_debt + visible.debt,
    "project-sale-window": game.phaseIndex * 12 + hidden.exit_preparation + Math.max(0, 60 - visible.cash),
    "family-office-transfer": hidden.exit_preparation + (100 - hidden.boss_safety) + hidden.asset_freeze_risk,
    "homebuyers-mortgage-letter": hidden.delivery_pressure + Math.max(0, 50 - visible.delivery) + Math.max(0, 40 - visible.public_trust),
    "interest-rollover-friday": visible.debt + (hidden.financing_cost || 0) + Math.max(0, 40 - visible.cash),
    "escrow-gap-screenshot": (hidden.buyer_liability || 0) + hidden.presale_misuse + hidden.delivery_pressure,
    "supplier-bill-discount": hidden.off_balance_debt + Math.max(0, 45 - visible.cash) + (100 - game.relations.suppliers),
    "bank-branch-risk-meeting": visible.debt + (hidden.financing_cost || 0) + Math.max(0, 45 - visible.bank),
    "homebuyer-lawyer-letter": (hidden.buyer_liability || 0) + Math.max(0, 48 - visible.delivery) + Math.max(0, 45 - visible.public_trust),
    "local-task-force-night": hidden.delivery_pressure + (hidden.local_isolation || 0) + Math.max(0, 45 - visible.government),
    "discount-sale-stampede": hidden.price_bubble + Math.max(0, 45 - visible.sales) + Math.max(0, 45 - visible.cash),
    "personal-guarantee-call": visible.debt + (hidden.financing_cost || 0) + hidden.off_balance_debt + Math.max(0, 70 - hidden.boss_safety),
    "planning-stop-work-order": Math.max(0, 45 - visible.government) + (hidden.local_isolation || 0) + competitionPressureScore() * 0.35,
    "tax-and-construction-joint-audit": Math.max(0, 45 - visible.government) + hidden.data_inflation + (game.stakeholderStress?.local || 0),
    "competitor-anonymous-report": competitionPressureScore() + Math.max(0, visible.sales - 30) + Math.max(0, 40 - visible.government),
    "rival-price-raid": competitionPressureScore() + Math.max(0, 42 - visible.sales) + hidden.price_bubble,
    "land-auction-enclosure": competitionPressureScore() + Math.max(0, 45 - visible.government) + visible.land_bank,
    "contractor-evidence-package": (game.stakeholderStress?.contractor || 0) + (game.stakeholderStress?.suppliers || 0) + hidden.delivery_pressure,
    "earthwork-boss-blackmail": (game.stakeholderStress?.underground || 0) + hidden.gray_risk + hidden.legal_exposure,
    "protective-umbrella-transfer": hidden.political_dependency + hidden.gray_risk + (game.stakeholderStress?.local || 0),
    "public-security-tea": hidden.gray_risk + hidden.legal_exposure + (game.stakeholderStress?.underground || 0),
    "channel-poaching-war": competitionPressureScore() + Math.max(0, 45 - visible.sales) + (100 - game.relations.channel),
    "liquidation-petition": visible.debt + hidden.off_balance_debt + game.scaleIndex * 12,
    "anti-gang-investigation": hidden.gray_risk + hidden.political_dependency,
    "mortgage-funds-wrong-account": hidden.presale_misuse + (hidden.buyer_liability || 0) + Math.max(0, 50 - visible.delivery),
    "fake-progress-drawdown": hidden.presale_misuse + hidden.data_inflation + hidden.delivery_pressure,
    "bid-companion-companies": competitionPressureScore() + Math.max(0, 45 - visible.government) + (game.riskLedger?.government || 0),
    "low-bid-change-order-night": (game.stakeholderStress?.contractor || 0) + (game.stakeholderStress?.suppliers || 0) + hidden.delivery_pressure,
    "land-auction-bond-borrowed": Math.max(0, 45 - visible.cash) + Math.max(0, 42 - visible.land_bank) + visible.government,
    "private-fund-bridge-weekend": Math.max(0, 42 - visible.cash) + (hidden.financing_cost || 0) + visible.debt,
    "earthwork-subcontract-chain": hidden.gray_risk + (game.stakeholderStress?.underground || 0) + (game.stakeholderStress?.contractor || 0) * 0.4,
    "related-bank-spv-loan": Math.max(0, 45 - visible.bank) + hidden.off_balance_debt + (hidden.financing_cost || 0) + hidden.data_inflation
    ,
    "voluntary-exit-window": (hidden.exit_preparation || 0) + Math.max(0, visible.cash - 28) + Math.max(0, 66 - visible.debt) + Math.max(0, visible.bank - 30)
  };
  return weights[event.id] || 10;
}

function isExitWindowOpen() {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  return (
    game.scaleIndex >= 2 &&
    game.scaleIndex <= 5 &&
    visible.sales >= 44 &&
    visible.cash >= 24 &&
    visible.debt <= 72 &&
    visible.government >= 34 &&
    visible.bank >= 34 &&
    visible.public_trust >= 36 &&
    hidden.legal_exposure <= 55 &&
    (hidden.local_isolation || 0) <= 45 &&
    hidden.boss_safety >= 35
  );
}

function isVoluntaryExitWindowOpen() {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = refreshProjectLedger();
  const hasRealAsset = ledger.projects.some((project) => project.stage === "delivered" || marketValueForProject(project, ledger) >= 22);
  const hasCleanEnoughDesk =
    visible.cash >= 30 &&
    visible.debt <= 64 &&
    visible.delivery >= 44 &&
    visible.bank >= 32 &&
    visible.public_trust >= 38 &&
    visible.government >= 28 &&
    hidden.boss_safety >= 48 &&
    (hidden.financing_cost || 0) <= 46 &&
    (hidden.buyer_liability || 0) <= 48 &&
    hidden.legal_exposure <= 44 &&
    hidden.asset_freeze_risk <= 40 &&
    (hidden.local_isolation || 0) <= 46;
  return game.turn >= 8 && game.scaleIndex <= 3 && hasRealAsset && hasCleanEnoughDesk;
}

function classifyLongRunEnding() {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  if ((hidden.asset_freeze_risk >= 58 || ledger.legal >= 56) && hidden.boss_safety <= 48) return "asset_frozen";
  if (projectDeliveryFailureReady() && (ledger.presale >= 54 || hidden.buyer_liability >= 58) && visible.delivery <= 38) return "delivery_failure";
  if ((ledger.interest >= 56 || ledger.debt >= 56) && visible.cash <= 30 && visible.bank <= 36) return "debt_default";
  if ((ledger.liquidity >= 56 || hidden.financing_cost >= 58) && visible.cash <= 22) return "cash_break";
  if (game.scaleIndex >= 4 && visible.debt > 72 && visible.cash < 35) return "evergrande_style";
  if (visible.delivery >= 45 && game.phaseIndex >= 5 && visible.government >= 48 && (hidden.control_loss || 0) >= 16) return "state_rescue";
  if (
    visible.cash >= 36 &&
    visible.delivery >= 62 &&
    visible.debt <= 42 &&
    visible.bank >= 44 &&
    visible.public_trust >= 52 &&
    hidden.boss_safety >= 62 &&
    hidden.financing_cost <= 30 &&
    hidden.buyer_liability <= 34 &&
    hidden.legal_exposure <= 28 &&
    ledger.interest <= 28 &&
    ledger.presale <= 30 &&
    ledger.legal <= 24
  ) return "stable_survivor";
  const probable = classifyProbableFailure({ id: "long-run" }, {});
  if (probable) return probable;
  if (visible.government >= 42 && (hidden.control_loss || 0) >= 16 && (visible.delivery < 50 || visible.bank < 38 || hidden.buyer_liability > 42)) return "state_rescue";
  if (visible.cash < 34 || visible.bank < 38 || hidden.financing_cost > 42 || hidden.legal_exposure > 36) return "takeover_failed";
  return "stable_survivor";
}

function endGame(endingId, event, choice) {
  game.ended = true;
  game.ending = {
    id: endingId,
    turn: game.turn,
    eventTitle: event?.title || "",
    choiceLabel: choice?.label || ""
  };
  game.notice = "";
  saveGame();
  renderDebrief();
}

function renderDebrief() {
  if (!game) return;
  const ending = DATA.endings[game.ending?.id] || DATA.endings.cash_break;
  show(elements.debriefScreen);
  renderShell();
  elements.endingTitle.textContent = ending.title;
  elements.endingText.textContent = ending.text;
  renderStats(elements.finalVisibleStats, game.state.visible);
  renderStats(elements.finalHiddenStats, game.state.hidden);
  renderModelReport();
  renderLearningSummary(ending);
  renderHistory();
  renderScaleHistory();
}

function renderModelReport() {
  const entries = Object.entries(game.modelCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  if (!entries.length) {
    elements.modelReport.innerHTML = "<p>这一局太短，还没有形成稳定机制。</p>";
    return;
  }
  elements.modelReport.innerHTML = entries
    .map(([tag, count]) => {
      const model = DATA.models[tag] || { name: tag, note: "该机制还没有写入完整解释。" };
      return `
        <div class="model-item">
          <strong>${escapeHtml(model.name)} · ${count} 次</strong>
          <p>${escapeHtml(model.note)}</p>
        </div>
      `;
    })
    .join("");
}

function renderLearningSummary(ending) {
  const risky = [...game.history].sort((a, b) => b.risk - a.risk).slice(0, 4);
  const topModels = Object.entries(game.modelCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => modelName(tag));
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const facts = buildProblemFacts(visible, hidden);
  const evidence = endingEvidence(game.ending?.id);
  const episodeLine = buildEpisodeLine(risky);
  const riskChain = buildRiskChain(risky);
  const pressureLine = buildPressureLedgerLine();
  const projectLine = buildProjectDebriefLine();
  const fundingLine = buildFundingDebriefLine();
  const mechanismLesson = buildMechanismLesson(ending);
  const archetype = pathArchetype();
  const trigger = game.ending?.eventTitle
    ? `第 ${game.ending.turn} 回合「${game.ending.eventTitle}」选择了「${game.ending.choiceLabel}」`
    : "没有单一导火索，是周期走完后的综合结算";

  elements.learningSummary.innerHTML = `
    <p><strong>结局判断：</strong>${escapeHtml(ending.text)}</p>
    <p><strong>为什么这个结局成立：</strong>${escapeHtml(evidence)}</p>
    <p><strong>导火索：</strong>${escapeHtml(trigger)}。</p>
    <p><strong>结局压力账本：</strong>${escapeHtml(pressureLine)}</p>
    <p><strong>融资资金账本：</strong>${escapeHtml(fundingLine)}</p>
    <p><strong>项目资产账本：</strong>${escapeHtml(projectLine)}</p>
    <p><strong>累计问题：</strong>${escapeHtml(riskChain)}</p>
    <p><strong>你的路径原型：</strong>${escapeHtml(archetype.title)}。${escapeHtml(archetype.text)}</p>
    <p><strong>你哪里出了问题：</strong>${escapeHtml(facts.join(" "))}</p>
    <p><strong>节目怎么解释：</strong>${escapeHtml(mechanismLesson)}</p>
    <p><strong>对应节目线索：</strong>${escapeHtml(episodeLine)}。这一局最强机制是 ${escapeHtml(topModels.join(" / ") || "尚未形成")}。</p>
    <p><strong>下次先问：</strong>${escapeHtml(nextQuestionsForEnding(game.ending?.id))}</p>
    ${risky.length ? `<p><strong>最危险的几步：</strong>${escapeHtml(risky.map((entry) => `第${entry.turn}回合「${entry.eventTitle}」`).join("，"))}。</p>` : ""}
  `;
}

function pathArchetype() {
  const counts = game.modelCounts || {};
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const score = {
    cycleTrader: (counts["cycle-asset-trader"] || 0) * 3 + (counts["exit-discipline"] || 0) * 2 + hidden.exit_preparation * 0.08 + Math.max(0, 70 - visible.debt) * 0.03,
    leverageEmpire: (counts["leverage-backfire"] || 0) * 2 + (counts["presale-cashflow-trap"] || 0) * 2 + (counts["data-inflation"] || 0) * 2 + visible.debt * 0.08 + hidden.off_balance_debt * 0.08,
    commercialExit: (counts["commercial-asset-exit"] || 0) * 4 + (counts["control-right-risk"] || 0) * 2 + (counts["audit-revenue-recognition"] || 0),
    localPartner: (counts["political-embedded-enterprise"] || 0) * 2 + (counts["land-fiscal-pressure"] || 0) * 3 + hidden.political_dependency * 0.08,
    lightAsset: (counts["state-purchase-floor"] || 0) * 2 + (counts["delivery-first"] || 0) + Math.max(0, 60 - visible.debt) * 0.04
  };
  const [top] = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const archetypes = {
    cycleTrader: {
      title: "周期资产交易者",
      text: "你更接近低杠杆、重现金、敢卖成熟资产的路径。优点是安全边际，代价是会被质疑撤退，也可能错过最后一段上涨。"
    },
    leverageEmpire: {
      title: "高杠杆预售扩张者",
      text: "你更接近用预售、融资、商票和规模排名滚动扩张的路径。优点是上行期速度极快，代价是下行期债务、交付和个人责任会一起回头。"
    },
    commercialExit: {
      title: "商业地产退出者",
      text: "你更接近持有核心商业资产、再寻找出售或控股权交易的路径。优点是资产质量和租金故事，代价是空置率、审批、舆论和买方资金会决定你能不能真正退出。"
    },
    localPartner: {
      title: "地方深度合伙人",
      text: "你更接近和地方、城投、旧改、新区绑定的路径。优点是拿地、审批和协调，代价是换届旧账、保交楼任务和控制权让渡。"
    },
    lightAsset: {
      title: "轻资产保交付转型者",
      text: "你更接近放弃暴利扩张、转向交付、代建、收储和现金回收的路径。优点是活得久，代价是旧债不会因为故事变轻而自动消失。"
    }
  };
  return archetypes[top[0]] || archetypes.leverageEmpire;
}

function buildRiskChain(entries) {
  if (!entries.length) return "这一局太短，还没有形成稳定责任链。";
  return entries
    .slice(0, 4)
    .map((entry) => `第${entry.turn}回合你在「${entry.eventTitle}」选择「${entry.choiceLabel}」`)
    .join("；") + "。这些选择不是单题错误，而是共同改变了现金、交付、债务、关系和个人安全的解释方式。";
}

function buildPressureLedgerLine() {
  const ledger = game.riskLedger || createRiskLedger();
  const labels = {
    liquidity: "自由现金被挤压",
    debt: "债务滚动",
    interest: "银行利息和展期成本",
    presale: "购房款交付责任",
    government: "政府卡口压力",
    counterparty: "关联方忍耐反噬",
    competitor: "竞争对手打击",
    blackmail: "黑灰保护伞反噬",
    delivery: "停工和保交楼压力",
    buyers: "业主与销售反噬",
    official: "地方协调压力",
    legal: "诉讼冻结和个人责任",
    gray: "黑灰旧账",
    exit: "退出被重新解释",
    inventory: "库存和降价压力",
    audit: "数据口径穿透"
  };
  const entries = Object.entries(ledger)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, value]) => `${labels[key] || key} ${Math.round(value)}`);
  return entries.length ? entries.join("，") : "这一局还没有形成明显压力账本。";
}

function buildProjectDebriefLine() {
  const ledger = refreshProjectLedger();
  if (!ledger.projects.length) return "你这一局没有真正形成项目资产，所以现金、关系和债务会直接决定生死。";
  const active = ledger.projects
    .slice()
    .sort((a, b) => projectRiskProfile(b, ledger).severity - projectRiskProfile(a, ledger).severity || marketValueForProject(b, ledger) - marketValueForProject(a, ledger))
    .slice(0, 3)
    .map((project) => projectFailureContribution(project, ledger));
  const cashGap = game.state.visible.cash <= 26 && ledger.marketAssetValue >= game.state.visible.cash * 2
    ? "账面有资产，但自由现金偏薄。"
    : "资产和现金还没有明显脱节。";
  return `${projectLedgerSummary()}。${cashGap} 主要项目：${active.join("；")}。`;
}

function buildFundingDebriefLine() {
  const ledger = refreshFundingLedger();
  const parts = [
    `银行开发贷 ${Math.round(ledger.bankLoan || 0)}`,
    `信托/非标 ${Math.round(ledger.trustLoan || 0)}`,
    `债券 ${Math.round(ledger.bondDebt || 0)}`,
    `商票 ${Math.round(ledger.commercialPaper || 0)}`,
    `供应商垫资 ${Math.round(ledger.supplierCredit || 0)}`,
    `预售/按揭 ${Math.round((ledger.presaleCash || 0) + (ledger.mortgageFlow || 0))}`
  ];
  const warning = ledger.collateralBorrowingRoom < 0
    ? `抵押空间为 ${ledger.collateralBorrowingRoom}，说明资产估值已经不够支持继续借钱。`
    : `抵押空间还有 ${ledger.collateralBorrowingRoom}，但它不是现金，只是谈判余地。`;
  const rollover = (ledger.rolloverNeed || 0) > 0 || (ledger.interestDue || 0) > 0
    ? `当前付息/展期压力：利息 ${ledger.interestDue || 0}，展期缺口 ${ledger.rolloverNeed || 0}。`
    : "当前没有明显付息缺口，但融资账本仍会随周期滚动。";
  return `${parts.join("，")}。${rollover}${warning} ${ledger.lastWarning || ""}`;
}

function buildMechanismLesson(ending) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const ledger = game.riskLedger || createRiskLedger();
  const stress = game.stakeholderStress || createStakeholderStress();
  const dominant = Object.entries({
    government: ledger.government + stress.local * 0.7 + Math.max(0, 35 - visible.government),
    counterparty: ledger.counterparty + stress.contractor * 0.5 + stress.suppliers * 0.5,
    competitor: ledger.competitor + stress.competitors * 0.8,
    blackmail: ledger.blackmail + stress.underground * 0.8 + hidden.gray_risk,
    debt: ledger.debt + ledger.interest + visible.debt,
    presale: ledger.presale + hidden.buyer_liability + hidden.delivery_pressure
  }).sort((a, b) => b[1] - a[1])[0]?.[0];
  const lessons = {
    government: "这一局的重点不是市场选择，而是政府卡口权力。土地、规划、预售证、监管账户、白名单、专班和国资接管决定了你能不能把资产变成现金。政商关系太低会被卡，太深会被绑定，换届后旧默契会变成新证据。",
    counterparty: "这一局的重点是关联方反噬。你把现金压力压给总包、供应商、渠道或顾问时，他们不会无限承受；忍耐度穿透后，他们会用停工、举报、保全、证据包和舆论把风险推回给你。",
    competitor: "这一局的重点是竞争对手不是背景板。同行会在你现金紧、关系弱、销售焦虑时降价、抢渠道、写举报、围标卡地。你的漏洞越真实，对手越容易把它变成政府或市场事件。",
    blackmail: "这一局的重点是黑灰和保护伞反噬。土方、拆迁、清场和催收的灰色效率，短期像执行力，后期会变成转账、录音、饭局、授权和保护伞倒查。",
    debt: "这一局的重点是银行钱会滚利息。地产商的现金多来自贷款、商票、信托和展期，付息日会不断把未来现金提前拿走；账面资产再多，没有自由现金也会违约。",
    presale: "这一局的重点是购房款不是自由现金。预售款背后是交付、停贷、监管账户和业主律师函；只要没有变成可验证工程进度，它就不是你的利润，而是你的责任。"
  };
  const endingLine = {
    cash_break: "你的结局说明自由现金先被打穿。",
    debt_default: "你的结局说明债务和利息先失去展期空间。",
    delivery_failure: "你的结局说明预售款责任没有转成交付。",
    buyer_blowup: "你的结局说明业主从消费者变成了组织化债权人。",
    asset_frozen: "你的结局说明商业风险已经进入司法保全和个人责任。",
    gray_case: "你的结局说明灰色执行力被重新定义为扫黑线索。",
    state_rescue: "你的结局说明项目比老板更重要，控制权被拿去保稳定。",
    takeover_failed: "你的结局说明你还没死，但已经失去重组议价权。"
  };
  return `${lessons[dominant] || lessons.debt} ${endingLine[game.ending?.id] || ending.text}`;
}

function buildEpisodeLine(entries) {
  const episodes = [
    ...new Set(
      entries
        .flatMap((entry) => entry.sourceEpisodes || [])
        .concat(game.history.flatMap((entry) => entry.sourceEpisodes || []).slice(0, 6))
    )
  ].slice(0, 8);
  return episodes.length ? episodes.join(" / ") : "本局还没有足够节目线索";
}

function buildProblemFacts(visible, hidden) {
  const facts = [];
  const stress = game.stakeholderStress || createStakeholderStress();
  const projectLedger = refreshProjectLedger();
  const fundingLedger = refreshFundingLedger();
  if (visible.cash <= 18) facts.push(`现金只有 ${visible.cash}，已经接近无法同时付工程、销售和到期款的区间。`);
  if ((fundingLedger.interestDue || 0) >= 5) facts.push(`本轮融资账本利息/到期压力为 ${fundingLedger.interestDue}，这说明钱不是“借到就结束”，而是每几轮都会回来吃现金。`);
  if ((fundingLedger.rolloverNeed || 0) >= 18) facts.push(`展期缺口到 ${fundingLedger.rolloverNeed}，说明你已经开始用下一笔钱解释上一笔钱。`);
  if (fundingLedger.collateralBorrowingRoom < 0) facts.push(`抵押空间为 ${fundingLedger.collateralBorrowingRoom}，银行会觉得资产打折后不够覆盖贷款。`);
  if (visible.cash <= 28 && projectLedger.marketAssetValue >= visible.cash * 2) facts.push(`账面项目资产有 ${projectLedger.marketAssetValue}，但可用现金只有 ${visible.cash}，说明资产不能自动替你付利息、工资和工程款。`);
  if (projectLedger.marketPriceIndex <= 92 && projectLedger.unsoldInventory >= 24) facts.push(`房价指数降到 ${projectLedger.marketPriceIndex}，未售货值还有 ${projectLedger.unsoldInventory}，银行会重新打折抵押物，买房人会等更低价格。`);
  if (projectLedger.escrowCash >= 12 && visible.cash <= 32) facts.push(`监管/项目资金里还有 ${projectLedger.escrowCash}，但这不是老板自由现金，动它会变成交付和法律问题。`);
  const riskyProjects = projectLedger.projects
    .slice()
    .sort((a, b) => projectRiskProfile(b, projectLedger).severity - projectRiskProfile(a, projectLedger).severity)
    .filter((project) => projectRiskProfile(project, projectLedger).severity >= 3)
    .slice(0, 2)
    .map((project) => `${project.title}是${projectRiskProfile(project, projectLedger).label}`);
  if (riskyProjects.length) facts.push(`项目拖累来自：${riskyProjects.join("，")}。这说明你不是抽象地“钱少了”，而是具体楼盘把现金、监管、交付和抵押卡住了。`);
  if (visible.debt >= 58) facts.push(`债务压力到 ${visible.debt}，银行和信托会开始先保护自己。`);
  if (visible.sales <= 30) facts.push(`销售热度只有 ${visible.sales}，说明回款慢，后续每个付款选择都会更痛。`);
  if (visible.delivery <= 38) facts.push(`交付信用只有 ${visible.delivery}，业主、政府和银行会把你当成潜在烂尾风险。`);
  if (visible.government <= 28) facts.push(`政商关系只有 ${visible.government}，这不是“更干净就更安全”，而是地方协调、银行续贷和债权人缓冲都变薄。`);
  if (visible.government >= 76) facts.push(`政商关系到 ${visible.government}，你已经不只是市场主体，也可能被地方任务、换届旧账和稳定责任重新定义。`);
  if (hidden.presale_misuse >= 40) facts.push(`预售挪用到 ${hidden.presale_misuse}，回款已经不再只是现金，而是交付责任。`);
  if (hidden.off_balance_debt >= 40) facts.push(`体外债务到 ${hidden.off_balance_debt}，说明真实债务比台面债务更重。`);
  if ((hidden.financing_cost || 0) >= 32) facts.push(`融资成本到 ${hidden.financing_cost}，说明银行贷款、展期、商票或信用链已经开始吞掉自由现金。`);
  if ((hidden.buyer_liability || 0) >= 35) facts.push(`购房款责任到 ${hidden.buyer_liability}，说明预售款已经变成必须交付、必须解释、不能随便挪用的钱。`);
  if (hidden.political_dependency >= 45) facts.push(`权力依赖到 ${hidden.political_dependency}，项目越来越靠关系解释，而不是靠现金流解释。`);
  if ((hidden.control_loss || 0) >= 35) facts.push(`控制权流失到 ${hidden.control_loss || 0}，说明城投、国资、债委会、信托或专班已经开始影响付款顺位、资产处置和项目账户。`);
  if (hidden.gray_risk >= 45) facts.push(`黑灰风险到 ${hidden.gray_risk}，旧改、土方或催收线会在后期被重新翻账。`);
  if (hidden.delivery_pressure >= 42) facts.push(`保交楼压力到 ${hidden.delivery_pressure}，未来资金会被锁进项目，老板可支配空间变小。`);
  if ((hidden.local_isolation || 0) >= 45) facts.push(`地方孤立到 ${hidden.local_isolation}，说明你没有足够协调网络承受抽贷、保全、停工和维权同时到来。`);
  if (hidden.exit_preparation >= 45) facts.push(`退出准备到 ${hidden.exit_preparation}，你已经开始给自己找退路；这是机会，也会被债权人和处置方重新解释。`);
  if (hidden.asset_freeze_risk >= 45) facts.push(`资产冻结风险到 ${hidden.asset_freeze_risk}，说明股权、账户或个人资产可能被债权人和司法程序盯上。`);
  if (hidden.legal_exposure >= 45) facts.push(`法律暴露到 ${hidden.legal_exposure}，企业风险正在向个人责任移动。`);
  if (hidden.boss_safety <= 45) facts.push(`老板安全只有 ${hidden.boss_safety}，具体不是“有人盯着你”这句空话，而是：${ownerSafetyExplanation()}。`);
  if (stress.local >= 40) facts.push(`地方压力到 ${Math.round(stress.local)}，说明政府卡口已经从支持变成审批、监管、专班和处置压力。`);
  if (stress.competitors >= 40) facts.push(`竞争对手压力到 ${Math.round(stress.competitors)}，同行会通过降价、抢渠道、举报和围标改变你的生存空间。`);
  if (stress.contractor >= 40 || stress.suppliers >= 40) facts.push(`总包/供应商忍耐度已经被压穿，他们不是被动承压方，而是可能拿证据包、停工和保全反噬的主动方。`);
  if (stress.underground >= 36) facts.push(`黑灰线压力到 ${Math.round(stress.underground)}，说明土方、拆迁或保护伞已经从效率工具变成倒查风险。`);
  if (!facts.length) {
    facts.push("这一局没有形成足够严重的单点风险，系统不应该硬判重结局；如果仍然出现重结局，就是判定逻辑错误。");
  }
  return facts;
}

function endingEvidence(endingId) {
  const visible = game.state.visible;
  const hidden = game.state.hidden;
  const projectLedger = refreshProjectLedger();
  const fundingLedger = refreshFundingLedger();
  const distressSale = latestDistressSaleIncident();
  const distressSaleLine = distressSale ? ` 最近资产处置：${distressSale.text}` : " 本局没有形成有效资产处置窗口，或者资产已经不足以变成现金缓冲。";
  const evidence = {
    cash_break: `现金破裂不是因为没有资产，而是自由现金被利息、工程款和到期债同时吃掉；能卖的资产也会被打折、被债权人截流或被保全。当前现金 ${visible.cash}，债务 ${visible.debt}，本轮利息/到期 ${fundingLedger.interestDue || 0}，展期缺口 ${fundingLedger.rolloverNeed || 0}，项目资产 ${projectLedger.marketAssetValue}，监管资金 ${projectLedger.escrowCash}。${distressSaleLine}`,
    debt_default: `债务违约不是账面负债一个数，而是银行信任、体外债务、抵押折扣、展期成本和资产处置价格一起破位。当前债务 ${visible.debt}，现金 ${visible.cash}，体外债务 ${hidden.off_balance_debt}，融资成本 ${hidden.financing_cost || 0}，抵押空间 ${fundingLedger.collateralBorrowingRoom}，可抵押项目价值 ${projectLedger.collateralValue}。${distressSaleLine}`,
    delivery_failure: `交付失败来自预售款责任和现场进度脱节。当前交付 ${visible.delivery}，保交楼压力 ${hidden.delivery_pressure}，购房款责任 ${hidden.buyer_liability || 0}。`,
    buyer_blowup: `业主信任和交付同时破位时才成立。当前业主信任 ${visible.public_trust}，交付 ${visible.delivery}。`,
    presale_misuse: `预售挪用成立时，问题不是“现金用去哪了”这么简单，而是购房人的钱没有转成可验证交付。当前预售挪用 ${hidden.presale_misuse}，购房款责任 ${hidden.buyer_liability || 0}，保交楼压力 ${hidden.delivery_pressure}。`,
    gray_case: `扫黑线必须有旧改/土方事件、黑灰风险超过 72，并进入三道红线之后才成立。当前黑灰风险 ${hidden.gray_risk}，周期 ${currentPhase().title}。`,
    boss_controlled: `老板安全低于 20 且进入后期处置阶段才成立。当前老板安全 ${hidden.boss_safety}。`,
    asset_frozen: `资产冻结风险超过 76 且法律暴露超过 54 后才成立。当前资产冻结风险 ${hidden.asset_freeze_risk}，法律暴露 ${hidden.legal_exposure}。`,
    runaway_caught: `退出准备很高，但法律暴露和资产冻结风险也很高时才成立。当前退出准备 ${hidden.exit_preparation}，法律暴露 ${hidden.legal_exposure}，资产冻结风险 ${hidden.asset_freeze_risk}。`,
    clean_exit: `退出准备足够还不够，必须在银行利息、购房款责任、交付、地方关系和法律线都没追上来之前离场。当前退出准备 ${hidden.exit_preparation}，现金 ${visible.cash}，债务 ${visible.debt}，融资成本 ${hidden.financing_cost || 0}，购房款责任 ${hidden.buyer_liability || 0}，法律暴露 ${hidden.legal_exposure}。`,
    isolated_blowup: `政商关系过低、地方孤立过高，同时现金或银行信任不足时才成立。当前政商关系 ${visible.government}，地方孤立 ${hidden.local_isolation || 0}，现金 ${visible.cash}，银行信任 ${visible.bank}。`,
    evergrande_style: `只有规模较大、债务高、现金低、交付弱同时出现才成立。当前规模 ${currentScale().title}，现金 ${visible.cash}，债务 ${visible.debt}，交付 ${visible.delivery}。`,
    high_point_exit: `你在现金、债务、交付、银行、业主和政商关系都还没有破位时主动卖出或收缩，所以这是纪律胜利。政商关系过浅或过深都不算安全退出。`,
    stable_survivor: `你没有继续追求规模，且现金、债务、交付和老板安全没有同时破位。`,
    state_rescue: `国资或专班接走项目处置权，代价是控制权下降，但个人风险和交付风险被压住。当前控制权流失 ${hidden.control_loss || 0}。`,
    takeover_failed: `接盘谈判中控制权、债务和交付责任没有切开，导致最后窗口关闭。当前控制权流失 ${hidden.control_loss || 0}。`
  };
  return evidence[endingId] || "这是综合结算，需要看现金、债务、交付、业主信任和老板安全是否同时恶化。";
}

function nextQuestionsForEnding(endingId) {
  const questions = {
    cash_break: "我手里的钱是不是自由现金？银行利息、工程款、工资、商票和监管账户哪个先吞掉它？",
    debt_default: "这笔债能不能展期？展期靠真实现金流，还是靠继续借更贵的钱？",
    delivery_failure: "预售款有没有变成楼栋进度？如果今天少付工程款，三周后现场会不会被业主拍到？",
    buyer_blowup: "我是在修复交付，还是只是在安抚情绪？业主能看到的证据是什么？",
    presale_misuse: "这笔预售款属于集团自由现金，还是属于这个项目未来交付？如果被监管账户穿透，我能解释吗？",
    gray_case: "我为了速度用了谁？谁留下了付款、聊天、视频或授权记录？",
    boss_controlled: "现在是商业谈判，还是个人风险处置？我还剩什么事实链可以交代？",
    asset_frozen: "我卖资产是在清偿和保交付，还是在把资产从债权人面前移走？每一笔转移有没有商业理由和公开价格？",
    runaway_caught: "我是在合规退出，还是在逃避责任？项目、债务、员工理财和预售交付有没有闭合？",
    clean_exit: "我能否在市场还没崩、债务还没炸、交付还有信用、地方还愿意协调时退出，而不是等到没人接盘？",
    isolated_blowup: "我是不是把不依赖关系误解成不需要协调？银行、地方、业主和供应商同时抢跑时谁还能替我缓冲？",
    evergrande_style: "规模是不是已经超过现金流能解释的范围？哪些资产能卖，哪些责任不能卖？",
    high_point_exit: "我是不是正在把最好的退出窗口误认为下一轮扩张窗口？",
    stable_survivor: "我能不能少赚一点，但把债、交付和关系边界做干净？"
  };
  return questions[endingId] || "这笔钱是不是自由现金？这个销售是不是实际回款？如果销售下滑 30%，我还能不能交楼？";
}

function renderHistory() {
  const important = [...game.history]
    .sort((a, b) => b.risk - a.risk)
    .slice(0, 10)
    .sort((a, b) => a.turn - b.turn);
  elements.historyList.innerHTML = important
    .map((entry) => `
      <li>
        <strong>第 ${entry.turn} 回合｜${escapeHtml(entry.eventTitle)}</strong><br />
        你选择了：${escapeHtml(entry.choiceLabel)}<br />
        后果：${escapeHtml(entry.consequence || "这一步改变了账本和关系网。")}<br />
        学习点：${escapeHtml(entry.lesson || "看选择如何改变长期风险。")}<br />
        节目：${escapeHtml(entry.sourceEpisodes.join(" / "))}
      </li>
    `)
    .join("");
}

function renderScaleHistory() {
  elements.scaleHistoryList.innerHTML = game.scaleHistory
    .map((entry) => `
      <li>
        <strong>第 ${entry.turn} 回合｜${escapeHtml(entry.title)}</strong><br />
        ${escapeHtml(entry.text)}
      </li>
    `)
    .join("");
}

function startNewGame() {
  game = createGame();
  saveGame();
  renderEvent();
}

function continueGame() {
  const saved = loadGame();
  if (!saved) {
    startNewGame();
    return;
  }
  game = saved;
  if (game.ended) renderDebrief();
  else if (game.scaleTransition) renderScaleTransition();
  else renderEvent();
}

function returnToKnowledgeHome() {
  window.location.href = "../../#/";
}

function resetGame() {
  localStorage.removeItem(SAVE_KEY);
  game = null;
  show(elements.startScreen);
  renderShell();
}

elements.startBtn.addEventListener("click", startNewGame);
elements.newGameBtn.addEventListener("click", startNewGame);
elements.againBtn.addEventListener("click", startNewGame);
elements.scaleContinueBtn.addEventListener("click", continueScaleTransition);
elements.continueBtn.addEventListener("click", returnToKnowledgeHome);
elements.resetBtn.addEventListener("click", resetGame);

const saved = loadGame();
if (saved) {
  game = saved;
  if (game.ended) renderDebrief();
  else if (game.scaleTransition) renderScaleTransition();
  else renderEvent();
} else {
  show(elements.startScreen);
  renderShell();
}
