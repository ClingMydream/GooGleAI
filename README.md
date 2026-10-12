# 微脉电子名片小程序 (Enterprise Business Card Mini Program)

遵循苹果设计语言（Apple Design Language）的高端企业电子名片小程序。采用简约留白、Squircle 圆角卡片、自然磨砂毛玻璃质感，以商务蓝（#0052D9）为主色调，公司人员头像采用沉稳内敛的色块表达。

---

## 🌟 核心特性与技术亮点

- **苹果设计美学**：自然留白、毛玻璃背景模糊（Backdrop Blur）、平滑微圆角、触感反馈动效。
- **沉稳色块头像**：采用深藏青（#1E3A8A）、石墨灰蓝（#1E293B）、黛青（#0F766E）等商务沉稳配色表达人员单字头像。
- **12 个页面完整闭环**：
  1. `01 首页`：企业门面、公司简介、环境大图、相关人员横滑、核心业务板块
  2. `02/03 名片页`：名片卡信息、五大快捷操作、名片附件、底部保存通讯录（支持已存/未存状态切换）
  3. `04 名片附件展示`：PDF 资料多页预览、文档摘要、转发与本地保存
  4. `05 公司相关人员列表`：全员沉稳色块卡片列表，一键进入对应成员名片
  5. `06 业务介绍详情`：核心业务大图、方案背景、指标与落地实践
  6. `07 信息配置总览`：后台配置中心菜单入口
  7. `08/09 公司信息配置`：编辑企业名称、企业 Logo 与外部链接
  8. `10 企业介绍列表`：企业图文业务列表管理与维护
  9. `11 添加企业介绍`：图文表单新增/编辑企业介绍
  10. `12 个人名片附件`：上传、管理供客户在线查阅的 PDF 资料
- **全真实交互能力**：
  - **存入通讯录**：真实生成 RFC 标准 vCard (`.vcf`) 文件并调起写入手机通讯录
  - **一键拨打电话**：自动规范呼叫并提供复制
  - **地图导航**：内置高保真交互地图，支持联动苹果、高德、腾讯地图并提供地址复制
  - **加微信**：微信号一键复制与微信二维码展示
  - **名片海报**：生成带小程序太阳码的高精美名片海报
  - **获客雷达**：实时记录微信访客足迹、浏览偏好与转化率分析

---

## 🚀 本地运行指南

### 1. 安装依赖
```bash
npm install
```

### 2. 启动本地开发服务
```bash
npm run dev
```
启动后在浏览器中打开：`http://localhost:3000` (或控制台显示的端口)。

### 3. 构建生产版本
```bash
npm run build
```
编译产物将输出在 `dist/` 目录下。

---

## 📂 项目结构概览

```text
├── index.html                  # 应用入口 HTML，内置 iOS 视口与字体优化
├── package.json                # 项目依赖配置
├── vite.config.ts              # Vite 构建配置（支持 React 与 Tailwind CSS v4）
├── tsconfig.json               # TypeScript 严格配置
├── public/                     # 静态资源与打包下载文件
└── src/
    ├── main.tsx                # 应用启动入口
    ├── index.css               # 全局样式与 Apple Frosted Glass 毛玻璃实用类
    ├── App.tsx                 # 根组件：页面路由、视口容器与状态枢纽
    ├── types/
    │   └── card.ts             # 核心数据模型与路由类型定义
    ├── data/
    │   └── mockCards.ts        # 沉稳色块员工库、企业资料与业务板块数据
    ├── utils/
    │   └── vcard.ts            # vCard (.vcf) 导出与剪贴板工具函数
    ├── components/
    │   ├── WeChatNavbar.tsx    # 微信小程序胶囊导航栏与 iOS 状态栏
    │   ├── BusinessCardHero.tsx# 02/03 名片卡（沉稳色块头像与联系方式）
    │   ├── QuickActions.tsx    # 五大快捷操作（拨号/邮件/拜访/微信/海报）
    │   ├── CardAttachments.tsx # 附件列表展示
    │   ├── BottomActionBar.tsx # 底部固定操作栏（未存/已存状态）
    │   ├── InspectorPanel.tsx  # 桌面端 12 页面导航切换与规则验证台
    │   ├── ToastNotification.tsx# 苹果风格悬浮 Toast 提示胶囊
    │   ├── common/
    │   │   └── SteadyAvatar.tsx# 沉稳色块头像复用组件
    │   ├── screens/            # 01~12 原型页面视图
    │   │   ├── HomeScreen.tsx
    │   │   ├── AttachmentDetailScreen.tsx
    │   │   ├── PersonnelListScreen.tsx
    │   │   ├── BusinessDetailScreen.tsx
    │   │   ├── ConfigMenuScreen.tsx
    │   │   ├── ConfigCompanyScreen.tsx
    │   │   ├── ConfigBusinessListScreen.tsx
    │   │   ├── ConfigAddBusinessScreen.tsx
    │   │   └── ConfigAttachmentsScreen.tsx
    │   └── modals/             # 交互弹窗（电话、微信、地图、海报、获客雷达）
    └── assets/                 # 高保真企业环境展示与大模型解决方案视觉图
```
