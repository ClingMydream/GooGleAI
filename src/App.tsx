import React, { useState, useEffect } from 'react';
import { CardData, AttachmentItem, VisitorEvent, EmployeePerson, BusinessModule, AppScreen, CompanyEnterpriseInfo } from './types/card';
import { defaultCardData, mockEmployees, initialVisitorEvents } from './data/mockCards';
import { exportVCardFile, copyToClipboard } from './utils/vcard';

import { WeChatNavbar } from './components/WeChatNavbar';
import { BusinessCardHero } from './components/BusinessCardHero';
import { QuickActions } from './components/QuickActions';
import { CardAttachments } from './components/CardAttachments';
import { BottomActionBar } from './components/BottomActionBar';
import { InspectorPanel } from './components/InspectorPanel';
import { ToastNotification } from './components/ToastNotification';

// Screen Views corresponding to Prototype 01 ~ 12
import { HomeScreen } from './components/screens/HomeScreen';
import { AttachmentDetailScreen } from './components/screens/AttachmentDetailScreen';
import { PersonnelListScreen } from './components/screens/PersonnelListScreen';
import { BusinessDetailScreen } from './components/screens/BusinessDetailScreen';
import { ConfigMenuScreen } from './components/screens/ConfigMenuScreen';
import { ConfigCompanyScreen } from './components/screens/ConfigCompanyScreen';
import { ConfigBusinessListScreen } from './components/screens/ConfigBusinessListScreen';
import { ConfigAddBusinessScreen } from './components/screens/ConfigAddBusinessScreen';
import { ConfigAttachmentsScreen } from './components/screens/ConfigAttachmentsScreen';

// Modals
import { PhoneModal } from './components/modals/PhoneModal';
import { WeChatModal } from './components/modals/WeChatModal';
import { MapNavigationModal } from './components/modals/MapNavigationModal';
import { CompanyDetailsModal } from './components/modals/CompanyDetailsModal';
import { ShareModal } from './components/modals/ShareModal';
import { PosterModal } from './components/modals/PosterModal';
import { VisitorRadarDrawer } from './components/modals/VisitorRadarDrawer';

export default function App() {
  // Navigation screen state (Default 01_home as in standard mini program entry)
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('01_home');
  
  // Data state
  const [card, setCard] = useState<CardData>(defaultCardData);
  const [employees, setEmployees] = useState<EmployeePerson[]>(mockEmployees);
  const [visitorEvents, setVisitorEvents] = useState<VisitorEvent[]>(initialVisitorEvents);
  
  // Selected items for detail view
  const [activeAttachment, setActiveAttachment] = useState<AttachmentItem>(
    defaultCardData.attachments?.[0] || {
      id: 'att_01',
      title: '企业简介',
      fileType: 'pdf',
      fileSize: '14.2 MB',
      uploadDate: '2025-08-16',
      downloadUrl: '#',
    }
  );
  const [activeBusinessModule, setActiveBusinessModule] = useState<BusinessModule>(
    defaultCardData.businessModules?.[0] || {
      id: 'bm_01',
      title: '行业应用软件研制',
      description: '提供政企级核心业务系统定制研发',
      iconName: 'LayoutGrid',
    }
  );
  const [editingBusinessModule, setEditingBusinessModule] = useState<BusinessModule | null>(null);

  // Field toggles for testing "空值隐藏规则"
  const [showEmail, setShowEmail] = useState(true);
  const [showWechat, setShowWechat] = useState(true);
  const [showAttachments, setShowAttachments] = useState(true);

  // Modals state
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isCompanyDetailsModalOpen, setIsCompanyDetailsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isRadarDrawerOpen, setIsRadarDrawerOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Log user activity into Visitor Radar
  const logVisitorActivity = (
    action: VisitorEvent['action'],
    target?: string
  ) => {
    const newEvent: VisitorEvent = {
      id: `ve_${Date.now()}`,
      visitorName: '当前微信访客',
      visitorCompany: '华南政企客户终端',
      action,
      target,
      timestamp: '刚刚',
      avatarChar: '客',
      avatarBg: '#0F766E',
    };
    setVisitorEvents((prev) => [newEvent, ...prev]);
  };

  // Switch employees
  const handleSelectEmployee = (emp: EmployeePerson) => {
    setCard((prev) => ({
      ...prev,
      id: emp.id,
      name: emp.name,
      title: emp.title,
      department: emp.department,
      avatarChar: emp.avatarChar,
      avatarBg: emp.avatarBg,
      contacts: {
        ...prev.contacts,
        ...emp.contacts,
      },
      isSaved: Boolean(emp.isSaved),
    }));
    setCurrentScreen('02_card');
    showToast(`已进入 ${emp.name} 的名片页`);
  };

  // 1. 存入通讯录
  const handleSaveToContacts = () => {
    const success = exportVCardFile(card);
    if (success) {
      setCard((prev) => ({
        ...prev,
        isSaved: true,
        saveCount: prev.isSaved ? prev.saveCount : prev.saveCount + 1,
      }));
      // Also update in employees list
      setEmployees((prev) =>
        prev.map((e) => (e.id === card.id ? { ...e, isSaved: true } : e))
      );
      logVisitorActivity('save_contact', '手机系统通讯录 (.vcf)');
      showToast('已存入手机通讯录！名片已标记为「已存」');
    }
  };

  // 2. 发邮件
  const handleEmailAction = async () => {
    if (!card.contacts.email) return;
    logVisitorActivity('view', `联系邮箱: ${card.contacts.email}`);
    await copyToClipboard(card.contacts.email);
    window.location.href = `mailto:${card.contacts.email}`;
    showToast(`已复制邮箱: ${card.contacts.email}，并调起邮件客户端`);
  };

  // 3. 复制微信
  const handleCopyWechatAction = async () => {
    if (!card.contacts.wechatId) return;
    logVisitorActivity('copy_wechat', card.contacts.wechatId);
    await copyToClipboard(card.contacts.wechatId);
    showToast(`微信号已复制: ${card.contacts.wechatId}`);
  };

  // Company info update from Screen 08
  const handleUpdateCompanyInfo = (updated: Partial<CompanyEnterpriseInfo>) => {
    setCard((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        ...updated,
      },
    }));
    setCurrentScreen('07_config_menu');
  };

  // Add / edit business module from Screen 11
  const handleSaveBusinessModule = (newModule: BusinessModule) => {
    setCard((prev) => {
      const exists = prev.businessModules?.some((m) => m.id === newModule.id);
      const updatedList = exists
        ? prev.businessModules?.map((m) => (m.id === newModule.id ? newModule : m))
        : [...(prev.businessModules || []), newModule];
      return {
        ...prev,
        businessModules: updatedList,
      };
    });
    setEditingBusinessModule(null);
    setCurrentScreen('10_config_business_list');
  };

  const handleDeleteBusinessModule = (id: string) => {
    setCard((prev) => ({
      ...prev,
      businessModules: prev.businessModules?.filter((m) => m.id !== id),
    }));
    showToast('该企业介绍已移除');
  };

  // Add / delete attachment from Screen 12
  const handleAddAttachment = (newAtt: AttachmentItem) => {
    setCard((prev) => ({
      ...prev,
      attachments: [newAtt, ...(prev.attachments || [])],
    }));
  };

  const handleDeleteAttachment = (id: string) => {
    setCard((prev) => ({
      ...prev,
      attachments: prev.attachments?.filter((a) => a.id !== id),
    }));
    showToast('名片附件已删除');
  };

  // Reset to default
  const handleReset = () => {
    setCard({ ...defaultCardData });
    setEmployees(mockEmployees);
    setShowEmail(true);
    setShowWechat(true);
    setShowAttachments(true);
    setCurrentScreen('01_home');
    showToast('已重置回初始数据并返回首页');
  };

  // Effective card with empty-rule toggles
  const effectiveCard: CardData = {
    ...card,
    contacts: {
      ...card.contacts,
      email: showEmail ? card.contacts.email : undefined,
      wechatId: showWechat ? card.contacts.wechatId : undefined,
    },
    attachments: showAttachments ? card.attachments : [],
  };

  // Navbar Title & Back handler resolution
  const getNavbarConfig = () => {
    switch (currentScreen) {
      case '01_home':
        return {
          title: effectiveCard.company.shortName || '广东京伦',
          showBack: false,
          onBack: undefined,
        };
      case '02_card':
        return {
          title: '名片信息',
          showBack: true,
          onBack: () => setCurrentScreen('01_home'),
        };
      case '04_attachment_detail':
        return {
          title: '名片附件',
          showBack: true,
          onBack: () => setCurrentScreen('02_card'),
        };
      case '05_personnel_list':
        return {
          title: '公司相关人员',
          showBack: true,
          onBack: () => setCurrentScreen('01_home'),
        };
      case '06_business_detail':
        return {
          title: '业务介绍',
          showBack: true,
          onBack: () => setCurrentScreen('01_home'),
        };
      case '07_config_menu':
        return {
          title: '信息配置',
          showBack: true,
          onBack: () => setCurrentScreen('01_home'),
        };
      case '08_config_company':
        return {
          title: '公司信息配置',
          showBack: true,
          onBack: () => setCurrentScreen('07_config_menu'),
        };
      case '10_config_business_list':
        return {
          title: '企业介绍',
          showBack: true,
          onBack: () => setCurrentScreen('07_config_menu'),
        };
      case '11_config_add_business':
        return {
          title: editingBusinessModule ? '编辑企业介绍' : '添加企业介绍',
          showBack: true,
          onBack: () => setCurrentScreen('10_config_business_list'),
        };
      case '12_config_attachments':
        return {
          title: '个人名片附件',
          showBack: true,
          onBack: () => setCurrentScreen('07_config_menu'),
        };
      default:
        return {
          title: '广东京伦',
          showBack: false,
          onBack: undefined,
        };
    }
  };

  const navConfig = getNavbarConfig();

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-neutral-900 flex flex-col items-center justify-start lg:py-6 lg:px-4">
      {/* Toast Notification */}
      <ToastNotification message={toastMessage} />

      {/* Main Responsive Layout Wrapper: Mobile-first centered phone frame, Desktop inspector beside */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
        
        {/* =========================================================================
            PHONE CHASSIS (Apple iPhone 16 Pro Container on Desktop, Native on Mobile)
           ========================================================================= */}
        <div className="w-full max-w-[430px] lg:rounded-[54px] lg:p-3.5 lg:bg-neutral-900 lg:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.15)] transition-all">
          
          {/* Inner Screen Glass Container */}
          <div className="w-full bg-[#F5F6F8] lg:rounded-[44px] overflow-hidden flex flex-col relative min-h-screen lg:min-h-[880px] lg:max-h-[890px] shadow-inner">
            
            {/* Dynamic Island (Desktop Simulator Top Feature) */}
            <div className="hidden lg:flex justify-center pt-2 pb-1 bg-white/80 backdrop-blur-md sticky top-0 z-40">
              <div className="h-6 w-28 bg-black rounded-full flex items-center justify-between px-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 ring-1 ring-neutral-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#0052D9]/80 animate-pulse" />
              </div>
            </div>

            {/* WeChat Navigation Bar */}
            <WeChatNavbar
              title={navConfig.title}
              showBack={navConfig.showBack}
              onBack={navConfig.onBack}
              onShareClick={() => setIsShareModalOpen(true)}
              onMenuClick={() => setCurrentScreen('07_config_menu')}
            />

            {/* Scrollable Viewport Body for Current Active Screen */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
              
              {/* ---------------- 01 首页 (广东京伦) ---------------- */}
              {currentScreen === '01_home' && (
                <HomeScreen
                  card={effectiveCard}
                  employees={employees}
                  onSelectEmployee={handleSelectEmployee}
                  onViewAllPersonnel={() => setCurrentScreen('05_personnel_list')}
                  onViewBusinessDetail={(mod) => {
                    setActiveBusinessModule(mod);
                    setCurrentScreen('06_business_detail');
                  }}
                  onOpenCompanyDetails={() => setIsCompanyDetailsModalOpen(true)}
                />
              )}

              {/* ---------------- 02/03 名片页 (名片信息) ---------------- */}
              {currentScreen === '02_card' && (
                <div className="pb-4 space-y-2 animate-fade-in">
                  {/* 名片信息卡片 (带沉稳色块头像) */}
                  <BusinessCardHero
                    card={effectiveCard}
                    onCallClick={() => setIsPhoneModalOpen(true)}
                    onEmailClick={handleEmailAction}
                    onAddressClick={() => setIsMapModalOpen(true)}
                    onCopyWechat={handleCopyWechatAction}
                  />

                  {/* 五大快捷操作 */}
                  <QuickActions
                    card={effectiveCard}
                    onCall={() => setIsPhoneModalOpen(true)}
                    onEmail={handleEmailAction}
                    onVisitMap={() => setIsMapModalOpen(true)}
                    onAddWeChat={() => setIsWeChatModalOpen(true)}
                    onGeneratePoster={() => setIsPosterModalOpen(true)}
                  />

                  {/* 名片附件 */}
                  <CardAttachments
                    attachments={effectiveCard.attachments}
                    onPreview={(att) => {
                      setActiveAttachment(att);
                      setCurrentScreen('04_attachment_detail');
                      logVisitorActivity('download_attachment', att.title);
                    }}
                    onForward={(att) => {
                      setIsShareModalOpen(true);
                      logVisitorActivity('share', att.title);
                    }}
                  />
                </div>
              )}

              {/* ---------------- 04 名片附件展示 ---------------- */}
              {currentScreen === '04_attachment_detail' && (
                <AttachmentDetailScreen
                  attachment={activeAttachment}
                  onForward={() => setIsShareModalOpen(true)}
                  onDownload={(att) => {
                    showToast(`已开始下载附件: ${att.title}`);
                    logVisitorActivity('download_attachment', att.title);
                  }}
                />
              )}

              {/* ---------------- 05 公司相关人员列表 ---------------- */}
              {currentScreen === '05_personnel_list' && (
                <PersonnelListScreen
                  employees={employees}
                  onSelectEmployee={handleSelectEmployee}
                />
              )}

              {/* ---------------- 06 业务介绍详情 ---------------- */}
              {currentScreen === '06_business_detail' && (
                <BusinessDetailScreen
                  module={activeBusinessModule}
                  onConsult={() => {
                    setCurrentScreen('02_card');
                    showToast(`已为您对接负责该业务的顾问: ${card.name}`);
                  }}
                  onShare={() => setIsShareModalOpen(true)}
                />
              )}

              {/* ---------------- 07 信息配置 ---------------- */}
              {currentScreen === '07_config_menu' && (
                <ConfigMenuScreen
                  onNavigate={(target) => {
                    if (target === 'company') setCurrentScreen('08_config_company');
                    else if (target === 'business') setCurrentScreen('10_config_business_list');
                    else if (target === 'attachments') setCurrentScreen('12_config_attachments');
                  }}
                />
              )}

              {/* ---------------- 08/09 公司信息配置 ---------------- */}
              {currentScreen === '08_config_company' && (
                <ConfigCompanyScreen
                  company={effectiveCard.company}
                  onSave={handleUpdateCompanyInfo}
                  onToast={showToast}
                />
              )}

              {/* ---------------- 10 企业介绍配置列表 ---------------- */}
              {currentScreen === '10_config_business_list' && (
                <ConfigBusinessListScreen
                  modules={effectiveCard.businessModules || []}
                  onAddNew={() => {
                    setEditingBusinessModule(null);
                    setCurrentScreen('11_config_add_business');
                  }}
                  onEdit={(mod) => {
                    setEditingBusinessModule(mod);
                    setCurrentScreen('11_config_add_business');
                  }}
                  onDelete={handleDeleteBusinessModule}
                />
              )}

              {/* ---------------- 11 添加/编辑企业介绍 ---------------- */}
              {currentScreen === '11_config_add_business' && (
                <ConfigAddBusinessScreen
                  initialData={editingBusinessModule}
                  onSave={handleSaveBusinessModule}
                  onToast={showToast}
                />
              )}

              {/* ---------------- 12 个人名片附件配置 ---------------- */}
              {currentScreen === '12_config_attachments' && (
                <ConfigAttachmentsScreen
                  attachments={effectiveCard.attachments || []}
                  onAddAttachment={handleAddAttachment}
                  onDeleteAttachment={handleDeleteAttachment}
                  onToast={showToast}
                />
              )}

            </main>

            {/* Bottom Fixed Action Bar: In 02/03 Card Screen */}
            {currentScreen === '02_card' && (
              <BottomActionBar
                isSaved={effectiveCard.isSaved}
                onSaveToContacts={handleSaveToContacts}
                onShareCard={() => setIsShareModalOpen(true)}
                onGeneratePoster={() => setIsPosterModalOpen(true)}
              />
            )}

          </div>
        </div>

        {/* =========================================================================
            DESKTOP INSPECTOR & NAVIGATION SWITCHER PANEL
           ========================================================================= */}
        <aside className="w-full max-w-sm shrink-0 px-4 lg:px-0 lg:sticky lg:top-6 pb-12 lg:pb-0">
          <InspectorPanel
            currentScreen={currentScreen}
            onNavigateScreen={(scr) => setCurrentScreen(scr)}
            card={effectiveCard}
            employees={employees}
            onToggleSaved={() => {
              setCard((prev) => ({ ...prev, isSaved: !prev.isSaved }));
              showToast(`已${!effectiveCard.isSaved ? '标记为已保存名片 (03)' : '设为未保存名片 (02)'}`);
            }}
            onToggleEmail={() => {
              setShowEmail(!showEmail);
              showToast(!showEmail ? '已恢复显示邮箱' : '已清空邮箱（验证空值隐藏）');
            }}
            onToggleWechat={() => {
              setShowWechat(!showWechat);
              showToast(!showWechat ? '已恢复微信号入口' : '已隐藏微信号入口（验证未配置隐藏）');
            }}
            onToggleAttachments={() => {
              setShowAttachments(!showAttachments);
              showToast(!showAttachments ? '已恢复附件列表' : '已清空附件（验证无附件隐藏）');
            }}
            onSwitchEmployee={handleSelectEmployee}
            onOpenRadar={() => setIsRadarDrawerOpen(true)}
            onReset={handleReset}
            hasEmail={showEmail}
            hasWechat={showWechat}
            hasAttachments={showAttachments}
          />
        </aside>

      </div>

      {/* =========================================================================
          INTERACTIVE MODALS & ACTION SHEETS
         ========================================================================= */}
      
      {/* 1. Phone Modal */}
      <PhoneModal
        isOpen={isPhoneModalOpen}
        phone={effectiveCard.contacts.phone}
        name={effectiveCard.name}
        onClose={() => setIsPhoneModalOpen(false)}
        onCallLogged={() => logVisitorActivity('call', effectiveCard.contacts.phone)}
        onToast={showToast}
      />

      {/* 2. WeChat Modal */}
      <WeChatModal
        isOpen={isWeChatModalOpen}
        wechatId={effectiveCard.contacts.wechatId}
        name={effectiveCard.name}
        companyName={effectiveCard.company.fullName}
        onClose={() => setIsWeChatModalOpen(false)}
        onCopyLogged={() => logVisitorActivity('copy_wechat', effectiveCard.contacts.wechatId)}
        onToast={showToast}
      />

      {/* 3. Map Navigation Modal */}
      <MapNavigationModal
        isOpen={isMapModalOpen}
        address={effectiveCard.contacts.address}
        companyName={effectiveCard.company.fullName}
        latitude={effectiveCard.contacts.latitude}
        longitude={effectiveCard.contacts.longitude}
        onClose={() => setIsMapModalOpen(false)}
        onToast={showToast}
      />

      {/* 4. Company 10 Items Modal */}
      <CompanyDetailsModal
        isOpen={isCompanyDetailsModalOpen}
        company={effectiveCard.company}
        onClose={() => setIsCompanyDetailsModalOpen(false)}
        onToast={showToast}
      />

      {/* 5. Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        card={effectiveCard}
        onClose={() => setIsShareModalOpen(false)}
        onOpenPoster={() => setIsPosterModalOpen(true)}
        onShareLogged={() => logVisitorActivity('share', '微信好友卡片')}
        onToast={showToast}
      />

      {/* 6. Poster Modal */}
      <PosterModal
        isOpen={isPosterModalOpen}
        card={effectiveCard}
        onClose={() => setIsPosterModalOpen(false)}
        onToast={showToast}
      />

      {/* 7. Visitor Radar Drawer */}
      <VisitorRadarDrawer
        isOpen={isRadarDrawerOpen}
        events={visitorEvents}
        viewCount={effectiveCard.viewCount}
        saveCount={effectiveCard.saveCount}
        onClose={() => setIsRadarDrawerOpen(false)}
      />

    </div>
  );
}
