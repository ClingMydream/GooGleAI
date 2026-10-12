export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  wechatId?: string;
  wechatQrUrl?: string;
  latitude?: number;
  longitude?: number;
}

export interface VerificationBadge {
  type: 'employed' | 'real_name' | 'expert';
  label: string;
  verifiedDate?: string;
}

export interface AttachmentItem {
  id: string;
  title: string;
  fileType: 'pdf' | 'doc' | 'image' | 'ppt' | 'video';
  fileSize: string;
  uploadDate: string;
  downloadUrl: string;
  previewPages?: string[];
  summary?: string;
  coverImage?: string;
  content?: string;
}

export interface BusinessModule {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tags?: string[];
  highlightMetric?: string;
  bannerImage?: string;
  detailContent?: string;
}

export interface CompanyEnterpriseInfo {
  fullName: string;
  shortName: string;
  logo: string;
  bannerImage: string;
  aboutTitle: string;
  aboutIntro: string;
  aboutImage: string;
  moreInfoUrl?: string;
  tenItems: {
    creditCode: string; // 统一社会信用代码
    legalPerson: string; // 法定代表人
    registeredCapital: string; // 注册资本
    establishedDate: string; // 成立日期
    industry: string; // 行业分类
    enterpriseType: string; // 企业类型
    operatingStatus: string; // 经营状态
    businessScope: string; // 经营范围
    officialWebsite: string; // 官方网址
    hotline: string; // 服务热线
  };
}

export interface EmployeePerson {
  id: string;
  name: string;
  title: string;
  department: string;
  avatarChar: string; // 沉稳色块中的单字/双字
  avatarBg: string;   // 沉稳色块背景颜色（如深蓝、深灰蓝、黛青、深靛蓝等）
  contacts: ContactInfo;
  isSaved?: boolean;
}

export interface CardData {
  id: string;
  name: string;
  title: string;
  department: string;
  avatarChar: string; // 沉稳色块单字
  avatarBg: string;   // 沉稳色块底色
  coverImage: string;
  isSaved: boolean; // 是否已存入通讯录
  verifications: VerificationBadge[];
  contacts: ContactInfo;
  attachments?: AttachmentItem[];
  businessModules?: BusinessModule[];
  company: CompanyEnterpriseInfo;
  viewCount: number;
  saveCount: number;
}

export interface VisitorEvent {
  id: string;
  visitorName: string;
  visitorCompany: string;
  action: 'view' | 'save_contact' | 'copy_wechat' | 'call' | 'download_attachment' | 'share';
  target?: string;
  timestamp: string;
  avatarChar: string;
  avatarBg: string;
}

// 页面导航路由枚举（对应设计图 01 ~ 12）
export type AppScreen =
  | '01_home'                 // 01 首页 (广东京伦)
  | '02_card'                 // 02/03 名片页 (名片信息)
  | '04_attachment_detail'    // 04 名片附件展示
  | '05_personnel_list'       // 05 公司相关人员列表
  | '06_business_detail'      // 06 业务介绍详情
  | '07_config_menu'          // 07 信息配置菜单
  | '08_config_company'       // 08/09 公司信息配置
  | '10_config_business_list' // 10 企业介绍配置列表
  | '11_config_add_business'  // 11 添加/编辑企业介绍
  | '12_config_attachments';  // 12 个人名片附件配置
