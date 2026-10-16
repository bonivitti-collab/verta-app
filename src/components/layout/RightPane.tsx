import React from 'react';
import { 
  Compass, 
  FileSpreadsheet, 
  FileCheck2, 
  MapPinned 
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
  tier
}) => {
  const tabs = [
    { id: 'floorplan' as CanvasTab, label: 'Planta Baixa (SVG 2D)', icon: Compass, badge: 'Vetor' },
    { id: 'spreadsheet' as CanvasTab, label: 'Orçamento SINAPI', icon: FileSpreadsheet, badge: 'CotaCasa' },
    { id: 'report' as CanvasTab, label: 'Laudo Pericial A4', icon: FileCheck2, badge: 'ICP-Brasil' },
    { id: 'geofence' as CanvasTab, label: 'Canteiro & GPS', icon: MapPinned, badge: 'Verta Ponto' },
  ];

  return (
    <section className="flex-1 h-full bg-[#0a0a09] flex flex-col justify-between overflow-hidden select-none">
      {/* Right Canvas Tab Bar */}
      <div className="h-11 bg-[#0d0c0a] border-b border-[#22201e] px-2 flex items-center justify-between text-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-1.5 rounded-md flex items-center space-x-2 text-xs transition ${
                  isActive 
                    ? 'bg-[#1e1a12] text-[#e0b44a] border border-[#483719] shadow-sm font-medium' 
                    : 'text-[#8a857b] hover:text-[#d4a359] hover:bg-[#141310] border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#c59b27]' : 'text-[#6c675e]'}`} />
                <span>{tab.label}</span>
                <span className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                  isActive ? 'bg-[#31250f] text-[#f0c563]' : 'bg-[#161513] text-[#69645c]'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono text-[#78746c] pr-2">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span>Live Sync</span>
          </span>
        </div>
      </div>

      {/* Dynamic Tab Body */}
      <div className="flex-1 overflow-hidden relative">
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
