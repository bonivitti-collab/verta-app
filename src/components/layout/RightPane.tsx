import React from 'react';
import { 
  Compass, 
  FileSpreadsheet, 
  FileCheck2, 
  MapPinned, 
  Maximize2, 
  Minimize2, 
  RotateCcw 
} from 'lucide-react';
import type { CanvasTab, Project, SinapiItem, InspectionData, WorkerPresence, MaterialAudit, SubscriptionTier } from '../../types';
import { FloorPlanSvgViewer } from '../canvas/FloorPlanSvgViewer';
import { SinapiSpreadsheet } from '../canvas/SinapiSpreadsheet';
import { InspectionReportA4 } from '../canvas/InspectionReportA4';
import { GeofenceSiteMap } from '../canvas/GeofenceSiteMap';

interface RightPaneProps {
  activeTab: CanvasTab;
  onSelectTab: (tab: CanvasTab) => void;
  activeProject: Project;
  sinapiItems: SinapiItem[];
  onUpdateSinapiItems: (items: SinapiItem[]) => void;
  inspectionData: InspectionData;
  workers: WorkerPresence[];
  materials: MaterialAudit[];
  tier: SubscriptionTier;
  width?: number;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  onResetPanels?: () => void;
}

export const RightPane: React.FC<RightPaneProps> = ({
  activeTab,
  onSelectTab,
  activeProject,
  sinapiItems,
  onUpdateSinapiItems,
  inspectionData,
  workers,
  materials,
  tier,
  width,
  isMaximized = false,
  onToggleMaximize,
  onResetPanels
}) => {
  const tabs = [
    { id: 'floorplan' as CanvasTab, label: 'Planta Baixa 2D', icon: Compass, badge: 'Vetor' },
    { id: 'spreadsheet' as CanvasTab, label: 'Orçamento SINAPI', icon: FileSpreadsheet, badge: 'CotaCasa' },
    { id: 'report' as CanvasTab, label: 'Laudo Pericial A4', icon: FileCheck2, badge: 'ICP-Brasil' },
    { id: 'geofence' as CanvasTab, label: 'Canteiro & GPS', icon: MapPinned, badge: 'Verta Ponto' },
  ];

  return (
    <section 
      style={{ width: isMaximized ? '100%' : width ? `${width}px` : undefined }}
      className="h-full bg-white flex flex-col justify-between overflow-hidden select-none shrink-0"
    >
      {/* Right Canvas Tab Bar - Pixel-perfect IDE Header */}
      <div className="h-10 bg-[#fafaf9] border-b border-[#e5e5e2] px-2.5 flex items-center justify-between text-xs overflow-hidden shrink-0">
        {/* Tabs Row (Flex-1, never wrap, single line, no scrollbar clipping) */}
        <div className="flex items-center h-full space-x-1 overflow-x-auto no-scrollbar flex-1 min-w-0 mr-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`h-full px-3 border-b-2 flex items-center space-x-1.5 text-xs font-medium shrink-0 whitespace-nowrap transition cursor-pointer ${
                  isActive 
                    ? 'bg-white text-[#121110] border-[#121110] font-semibold' 
                    : 'text-[#615e58] hover:text-[#121110] hover:bg-[#f2f2ef] border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#946f19]' : 'text-[#8c8882]'}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-medium whitespace-nowrap shrink-0 ${
                  isActive ? 'bg-[#fbf7ee] text-[#946f19] border border-[#ebd8b2]' : 'bg-[#ededeb] text-[#716e68]'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Tools: Reset Layout, Maximize Canvas, Live Sync */}
        <div className="flex items-center space-x-1.5 pl-2 shrink-0">
          {onResetPanels && (
            <button
              onClick={onResetPanels}
              className="p-1 hover:bg-[#ededeb] rounded text-[#716e68] hover:text-[#121110] transition"
              title="Redefinir largura dos 3 painéis para o padrão"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {onToggleMaximize && (
            <button
              onClick={onToggleMaximize}
              className="p-1 hover:bg-[#ededeb] rounded text-[#716e68] hover:text-[#121110] transition"
              title={isMaximized ? "Restaurar layout de 3 painéis" : "Maximizar visualização do Canvas"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}

          <div className="hidden lg:flex items-center space-x-1.5 text-[10px] font-mono text-[#716e68] pl-1 border-l border-[#e5e5e2]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            <span>Live Sync</span>
          </div>
        </div>
      </div>

      {/* Dynamic Tab Body */}
      <div className="flex-1 overflow-hidden relative bg-[#fafaf9]">
        {activeTab === 'floorplan' && <FloorPlanSvgViewer />}
        {activeTab === 'spreadsheet' && (
          <SinapiSpreadsheet 
            items={sinapiItems} 
            onUpdateItems={onUpdateSinapiItems} 
            totalArea={activeProject.totalArea} 
          />
        )}
        {activeTab === 'report' && (
          <InspectionReportA4 
            data={inspectionData} 
            isFreeTier={tier === 'free'} 
          />
        )}
        {activeTab === 'geofence' && (
          <GeofenceSiteMap 
            workers={workers} 
            materials={materials} 
            project={activeProject} 
          />
        )}
      </div>
    </section>
  );
};
