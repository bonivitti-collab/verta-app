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
    <section className="flex-1 h-full bg-white flex flex-col justify-between overflow-hidden select-none">
      {/* Right Canvas Tab Bar */}
      <div className="h-11 bg-[#fafaf9] border-b border-[#e5e5e2] px-2 flex items-center justify-between text-xs overflow-x-auto no-scrollbar">
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
                    ? 'bg-white text-[#121110] border border-[#dcdcd8] shadow-xs font-semibold' 
                    : 'text-[#716e68] hover:text-[#121110] hover:bg-[#f2f2ef] border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#946f19]' : 'text-[#8c8882]'}`} />
                <span>{tab.label}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-medium ${
                  isActive ? 'bg-[#fbf7ee] text-[#946f19] border border-[#ebd8b2]' : 'bg-[#ededeb] text-[#716e68]'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono text-[#716e68] pr-2">
          <span className="flex items-center space-x-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            <span>Live Sync</span>
          </span>
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
