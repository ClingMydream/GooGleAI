import React, { useState } from 'react';
import { MapPin, Navigation, Copy, ExternalLink, X, Compass, AlertCircle } from 'lucide-react';
import { copyToClipboard } from '../../utils/vcard';

interface MapNavigationModalProps {
  isOpen: boolean;
  address?: string;
  companyName: string;
  latitude?: number;
  longitude?: number;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const MapNavigationModal: React.FC<MapNavigationModalProps> = ({
  isOpen,
  address,
  companyName,
  latitude = 23.125178,
  longitude = 113.324520,
  onClose,
  onToast,
}) => {
  const [simulateError, setSimulateError] = useState(false);

  if (!isOpen || !address) return null;

  const handleCopyAddress = async () => {
    const ok = await copyToClipboard(address);
    if (ok) {
      onToast('公司详细地址已复制');
    }
  };

  const handleLaunchNavigation = (type: 'apple' | 'amap' | 'tencent') => {
    onToast(`正在准备调起${type === 'apple' ? '苹果地图' : type === 'amap' ? '高德地图' : '腾讯地图'}导航...`);
    // Example URL schema for maps
    if (type === 'apple') {
      window.open(`https://maps.apple.com/?q=${encodeURIComponent(companyName)}&ll=${latitude},${longitude}`, '_blank');
    } else if (type === 'amap') {
      window.open(`https://uri.amap.com/marker?position=${longitude},${latitude}&name=${encodeURIComponent(companyName)}`, '_blank');
    } else {
      window.open(`https://apis.map.qq.com/uri/v1/marker?marker=coord:${latitude},${longitude};title:${encodeURIComponent(companyName)};addr:${encodeURIComponent(address)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md rounded-t-[28px] sm:rounded-[28px] bg-white p-5 shadow-2xl transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                实地拜访 · 地图导航
              </h3>
              <p className="text-[11px] text-neutral-400">
                支持高德 / 腾讯 / 苹果地图无缝导航
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Map Simulation Canvas */}
        {!simulateError ? (
          <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 mb-3.5">
            {/* Apple Maps styled vector background */}
            <div className="absolute inset-0 bg-[#E8E7E0] overflow-hidden">
              {/* Roads lines */}
              <div className="absolute top-1/2 left-0 right-0 h-6 bg-white border-y border-[#D6D4CB] -rotate-6" />
              <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-white border-x border-[#D6D4CB] rotate-12" />
              <div className="absolute top-0 bottom-0 right-1/4 w-4 bg-[#FEE2D5] border-x border-[#F5C2A7]" />
              
              {/* Park green area */}
              <div className="absolute top-2 left-4 w-28 h-16 rounded-2xl bg-[#D4E8CE]/80 border border-[#BEDABA]" />
              
              {/* River blue shape */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#C2E0F2]/70" />
            </div>

            {/* Pulsing Pin Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="animate-bounce">
                <div className="px-3 py-1 rounded-full bg-neutral-900/90 text-white text-[11px] font-semibold backdrop-blur-md shadow-md border border-white/20 whitespace-nowrap mb-1">
                  {companyName}
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg mx-auto ring-4 ring-emerald-300/40">
                  <MapPin className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Quick Distance Indicator */}
            <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-neutral-800 shadow-xs border border-white/60">
              距您当前位置约 1.2 km · 驾车约 5 分钟
            </div>
          </div>
        ) : (
          /* 异常处理：定位失败时展示地址文本供手动复制 */
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/60 mb-3.5 text-center">
            <AlertCircle className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-amber-900">网络或定位权限受限</h4>
            <p className="text-[11px] text-amber-700 mt-0.5">
              暂无法获取实时路况，请复制下方详细地址至导航软件
            </p>
          </div>
        )}

        {/* Address Card */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 mb-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-medium text-neutral-400 mb-0.5">
                公司详细地址
              </div>
              <p className="text-xs font-semibold text-neutral-900 leading-relaxed select-all">
                {address}
              </p>
              <p className="text-[11px] text-neutral-500 mt-1">
                交通提示：地铁3/5号线 珠江新城站 B1出口步行 280米
              </p>
            </div>
            <button
              onClick={handleCopyAddress}
              className="p-2 rounded-xl bg-white border border-neutral-200/80 hover:bg-neutral-100 text-neutral-700 active:scale-95 transition-all shrink-0"
              title="复制地址"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation App Options */}
        <div className="space-y-2 mb-2">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleLaunchNavigation('amap')}
              className="py-2.5 px-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-95 text-xs font-semibold text-neutral-800 flex flex-col items-center gap-1 transition-all"
            >
              <Navigation className="w-4 h-4 text-blue-600" />
              <span>高德地图</span>
            </button>
            <button
              onClick={() => handleLaunchNavigation('tencent')}
              className="py-2.5 px-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-95 text-xs font-semibold text-neutral-800 flex flex-col items-center gap-1 transition-all"
            >
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span>腾讯地图</span>
            </button>
            <button
              onClick={() => handleLaunchNavigation('apple')}
              className="py-2.5 px-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 active:scale-95 text-xs font-semibold text-neutral-800 flex flex-col items-center gap-1 transition-all"
            >
              <Navigation className="w-4 h-4 text-neutral-800" />
              <span>苹果地图</span>
            </button>
          </div>

          <button
            onClick={handleCopyAddress}
            className="w-full h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <Copy className="w-4 h-4" />
            <span>复制地址并导航</span>
          </button>
        </div>

        {/* Toggle error simulation for testing specification */}
        <div className="text-center pt-2">
          <button
            onClick={() => setSimulateError(!simulateError)}
            className="text-[10px] text-neutral-400 hover:text-neutral-600 underline"
          >
            {simulateError ? '恢复地图定位视图' : '模拟定位失败兜底场景'}
          </button>
        </div>

      </div>
    </div>
  );
};
