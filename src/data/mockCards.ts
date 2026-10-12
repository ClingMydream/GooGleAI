import { CardData, EmployeePerson, VisitorEvent } from '../types/card';

// High-fidelity image assets generated previously
export const ASSET_PATHS = {
  coverBg: '/src/assets/images/company_cover_bg_1791598105791.jpg',
  aboutShowcase: '/src/assets/images/company_about_showcase_1791598118835.jpg',
  solutionAi: '/src/assets/images/business_solution_ai_1791598130894.jpg',
};

// 沉稳色块调色盘 (Calm, steady, executive hues: Navy, Slate, Deep Indigo, Muted Teal, Steel)
export const STEADY_AVATAR_COLORS = [
  '#1E3A8A', // 经典深藏青 (Deep Navy)
  '#1E293B', // 板岩石墨灰 (Slate Charcoal)
  '#0F766E', // 沉稳黛青 (Muted Deep Teal)
  '#3730A3', // 沉稳暗靛蓝 (Dark Indigo)
  '#334155', // 雾钢深蓝灰 (Steel Slate)
  '#2563EB', // 经典企业湛蓝 (Corporate Royal Blue)
];

// 公司相关人员列表 (对应 01 首页横滑 & 05 公司相关人员列表)
export const mockEmployees: EmployeePerson[] = [
  {
    id: 'emp_01',
    name: '张三',
    title: '商务总经理',
    department: '商务合作部',
    avatarChar: '张',
    avatarBg: '#1E3A8A', // 沉稳深藏青
    contacts: {
      phone: '135 4092 3456',
      wechatId: '2938Li@163.com',
      email: '2938Li@163.com',
      address: '广东省广州市天河区珠江新城金利来数码大厦28楼',
      latitude: 23.125178,
      longitude: 113.324520,
    },
    isSaved: false,
  },
  {
    id: 'emp_02',
    name: '李哲',
    title: '技术副总裁 / CTO',
    department: '前沿工程院',
    avatarChar: '李',
    avatarBg: '#1E293B', // 沉稳石墨灰蓝
    contacts: {
      phone: '139 2218 6600',
      wechatId: 'lizhe_tech',
      email: 'lizhe@jinglun-tech.com',
      address: '广东省广州市天河区珠江新城金利来数码大厦28楼',
      latitude: 23.125178,
      longitude: 113.324520,
    },
    isSaved: true,
  },
  {
    id: 'emp_03',
    name: '陈海峰',
    title: '商务副总经理',
    department: '华南政企业务部',
    avatarChar: '陈',
    avatarBg: '#0F766E', // 沉稳黛青
    contacts: {
      phone: '137 1928 3321',
      wechatId: 'chenhf_jinglun',
      email: 'chenhf@jinglun-tech.com',
      address: '广东省广州市天河区珠江新城金利来数码大厦28楼',
      latitude: 23.125178,
      longitude: 113.324520,
    },
    isSaved: false,
  },
  {
    id: 'emp_04',
    name: '王晓宇',
    title: '高级解决方案架构师',
    department: '系统集成部',
    avatarChar: '王',
    avatarBg: '#3730A3', // 沉稳深靛
    contacts: {
      phone: '136 8802 9910',
      wechatId: 'wangxy_arch',
      email: 'wangxy@jinglun-tech.com',
      address: '广东省广州市天河区珠江新城金利来数码大厦28楼',
      latitude: 23.125178,
      longitude: 113.324520,
    },
    isSaved: false,
  },
  {
    id: 'emp_05',
    name: '刘思远',
    title: '大客户服务总监',
    department: '客户成功部',
    avatarChar: '刘',
    avatarBg: '#334155', // 雾钢深蓝灰
    contacts: {
      phone: '138 2901 8832',
      wechatId: 'liucy_cs',
      email: 'liucy@jinglun-tech.com',
      address: '广东省广州市天河区珠江新城金利来数码大厦28楼',
      latitude: 23.125178,
      longitude: 113.324520,
    },
    isSaved: false,
  },
];

export const defaultCardData: CardData = {
  id: 'emp_01',
  name: '张三',
  title: '商务总经理',
  department: '商务合作部',
  avatarChar: '张',
  avatarBg: '#1E3A8A', // 沉稳深藏青
  coverImage: ASSET_PATHS.coverBg,
  isSaved: false,
  verifications: [
    { type: 'employed', label: '在职认证', verifiedDate: '企业微信认证' },
    { type: 'real_name', label: '已实名认证', verifiedDate: '公安可信身份' },
  ],
  contacts: {
    phone: '135 4092 3456',
    wechatId: '2938Li@163.com',
    email: '2938Li@163.com',
    address: '广东省广州市天河区珠江新城金利来数码大厦28楼',
    latitude: 23.125178,
    longitude: 113.324520,
  },
  attachments: [
    {
      id: 'att_01',
      title: '广东京伦信息科技有限公司企业简介 (2025版)',
      fileType: 'pdf',
      fileSize: '14.2 MB',
      uploadDate: '2025-08-16',
      downloadUrl: '#',
      summary: '全面阐述京伦科技十五载技术积累、核心自研专利矩阵与标杆客户落地实践。',
      content: '京伦信息科技致力于政企核心业务数字化改造，赋能智能治理与产业协同升级。',
      previewPages: [
        '第 1 页：京伦信息概览与企业愿景',
        '第 2 页：核心研发团队与战略布局',
        '第 3 页：政企智能解决方案总览',
        '第 4 页：全国服务网点与成功案例'
      ],
    },
    {
      id: 'att_02',
      title: 'AI 大模型产业赋能与软硬件一体化解决方案白皮书',
      fileType: 'pdf',
      fileSize: '8.6 MB',
      uploadDate: '2025-09-02',
      downloadUrl: '#',
      summary: '面向制造业与智慧政务的高可用多模态大模型落地架构蓝图与投资回报分析。',
      content: '详细剖析企业私有知识库Agent、AI边缘盒子与工业质检多模态算力协同落地。',
      previewPages: [
        '第 1 页：行业数智化转型趋势洞察',
        '第 2 页：本地私有化算力部署架构',
        '第 3 页：音视频协同会议硬软件适配清单'
      ],
    },
    {
      id: 'att_03',
      title: '国家高新技术企业资质及核心发明专利证书汇总',
      fileType: 'pdf',
      fileSize: '5.1 MB',
      uploadDate: '2025-07-28',
      downloadUrl: '#',
      summary: 'ISO27001、CMMI5认证、68项国家计算机软件著作权与信创兼容性互认证文件。',
      content: '国家认可技术高地证明，具备军工及央企涉密集成高规格合规资质。',
      previewPages: [
        '第 1 页：CMMI Level 5 国际评估证书',
        '第 2 页：国家级高新技术企业证书',
        '第 3 页：信息安全管理体系认证证书'
      ],
    },
  ],
  businessModules: [
    {
      id: 'bm_01',
      title: '行业应用软件研制',
      description: '提供高内聚、微服务架构的政企级核心业务系统定制研发，支撑千万级高并发与全业务流程数字化闭环。',
      iconName: 'LayoutGrid',
      tags: ['高并发微服务', '信创适配', '数据中台'],
      highlightMetric: '99.99% 系统可用性',
      detailContent: '以云原生和微服务架构为基座，自主研发支撑全省政务大厅、大型集团企业资金流转及审批流转的核心业务平台。完全兼容信创麒麟、统信UOS操作系统及达梦数据库。',
    },
    {
      id: 'bm_02',
      title: 'AI 智能应用与私有大模型',
      description: '聚焦垂直行业大模型智能体（Agent）落地，赋能企业智能客服、政务知识库检索与自动流程问答决策。',
      iconName: 'Cpu',
      bannerImage: ASSET_PATHS.solutionAi,
      tags: ['私有化部署', '知识库Agent', '多模态感知'],
      highlightMetric: '<1.2s 实时推理响应',
      detailContent: '构建开箱即用的政企大模型知识库检索增强生成（RAG）平台，支持在本地私有算力中离线安全推理，保障企业商业数据资产零外泄。',
    },
    {
      id: 'bm_03',
      title: '数字化协同服务硬件',
      description: '提供自主研发的边缘智能计算终端、智慧物联采集网关与工业级高可靠工控主机，实现端边云一体协同。',
      iconName: 'HardDrive',
      tags: ['端边协同', '工业级网关', '低功耗芯片'],
      highlightMetric: '7×24h 持续工业运行',
      detailContent: '深度整合自主硬件主板与低功耗嵌入式操作系统，适用于交通枢纽、变电站、政企智慧机房的智能状态监控与多协议传感器信号采集。',
    },
    {
      id: 'bm_04',
      title: '会议音视频协同系统',
      description: '4K超清极简会议空间、自研波束成形数字麦克风阵列与无感低延时交互屏，重构高管决策与跨国协作场景。',
      iconName: 'Video',
      tags: ['4K 超低延时', 'AI环境降噪', '多端无缝流转'],
      highlightMetric: '99% 噪音智能抑制',
      detailContent: '覆盖智能会控、无感人脸签到、电子白板同步标注与分布式音视频传输，全面赋能跨城市多分支机构高效同屏协同。',
    },
  ],
  company: {
    fullName: '广东京伦信息科技有限公司',
    shortName: '广东京伦',
    logo: '京伦',
    bannerImage: ASSET_PATHS.coverBg,
    aboutTitle: '以科技匠心 赋能数字中国',
    aboutIntro: '广东京伦信息科技有限公司成立于2011年，是华南地区领先的政企数智化基础设施与行业智能解决方案服务商。我们深耕人工智能、边缘硬件计算与企业数字化协作领域，累计服务超过300家政企与世界500强客户。',
    aboutImage: ASSET_PATHS.aboutShowcase,
    moreInfoUrl: 'https://modao.cc/',
    tenItems: {
      creditCode: '91440101MA59KXXXX6',
      legalPerson: '陈京伦',
      registeredCapital: '5,000 万元人民币',
      establishedDate: '2011-04-18',
      industry: '软件和信息技术服务业',
      enterpriseType: '有限责任公司（自然人投资或控股）',
      operatingStatus: '正常在营（已核准）',
      businessScope: '软件开发;人工智能行业应用系统集成服务;信息系统集成服务;计算机软硬件及外围设备制造;智能控制系统集成;互联网安全服务;云计算设备技术服务;数据处理和存储支持服务。',
      officialWebsite: 'https://www.jinglun-tech.com',
      hotline: '400-880-9928 / 020-85589920',
    },
  },
  viewCount: 1428,
  saveCount: 382,
};

export const initialVisitorEvents: VisitorEvent[] = [
  {
    id: 've_01',
    visitorName: '李总',
    visitorCompany: '南方电网智能调度中心',
    action: 'save_contact',
    target: '手机通讯录',
    timestamp: '10分钟前',
    avatarChar: '李',
    avatarBg: '#1E293B',
  },
  {
    id: 've_02',
    visitorName: '王经理',
    visitorCompany: '广汽数字化协同研究院',
    action: 'download_attachment',
    target: 'AI 大模型产业赋能白皮书',
    timestamp: '25分钟前',
    avatarChar: '王',
    avatarBg: '#3730A3',
  },
  {
    id: 've_03',
    visitorName: '陈总监',
    visitorCompany: '越秀资本创新投资部',
    action: 'copy_wechat',
    target: '微信号',
    timestamp: '1小时前',
    avatarChar: '陈',
    avatarBg: '#0F766E',
  },
];
