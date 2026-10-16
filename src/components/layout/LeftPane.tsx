import React from 'react';
import { 
  Compass, 
  DollarSign, 
  HardHat, 
  Search, 
  MapPin, 
  Users, 
  Wind, 
  Sun, 
  Droplets, 
  CheckCircle2, 
  ChevronRight,
  Calculator,
  FileText,
  Camera,
  MapPinned
} from 'lucide-react';
import type { StudioType, Project, CanvasTab } from '../../types';

interface LeftPaneProps {
  activeStudio: StudioType;
  onSelectStudio: (studio: StudioType) => void;
  activeProject: Project;
  onSelectCanvasTab: (tab: CanvasTab) => void;
  onTriggerPreset: (promptText: string, studio: StudioType) => void;
}

export const LeftPane: React.FC<LeftPaneProps> = ({
  activeStudio,
  onSelectStudio,
  activeProject,
  onSelectCanvasTab,
  onTriggerPreset
}) => {
  const studios = [
    {
      id: 'project' as StudioType,
      name: 'Projetos & Estudo',
      icon: Compass,
      defaultTab: 'floorplan' as CanvasTab,
      badge: 'NBR 15575',
      description: 'Plantas baixas por prompt, Decora Verta e insolação.',
      tools: [
        { name: 'Gerar Planta Baixa por Prompt', prompt: 'Gere uma planta baixa térrea de 120m² para terreno litorâneo com 3 quartos (1 suíte) e ventilação cruzada.', tab: 'floorplan' as CanvasTab, icon: Compass },
        { name: 'Decora Verta (Multimodal)', prompt: 'Analisar foto do cômodo em osso para revestimento com porcelanato retificado 80x80 e iluminação indireta.', tab: 'floorplan' as CanvasTab, icon: Camera },
        { name: 'Insolação e Ventos Litoral', prompt: 'Calcular carta solar e incidência de ventos Nordeste para orientação da varanda gourmet.', tab: 'floorplan' as CanvasTab, icon: Sun },
      ]
    },
    {
      id: 'cost' as StudioType,
      name: 'Custos & Suprimentos',
      icon: DollarSign,
      defaultTab: 'spreadsheet' as CanvasTab,
      badge: 'SINAPI / CUB',
      description: 'CotaCasa, quantitativos e orçamentos paramétricos.',
      tools: [
        { name: 'CotaCasa: Quantitativo Estrutural', prompt: 'Calcular quantitativo paramétrico de concreto e aço para fundação e estrutura do projeto ativo.', tab: 'spreadsheet' as CanvasTab, icon: Calculator },
        { name: 'Orçamento SINAPI & Curva ABC', prompt: 'Estruturar orçamento de fundação com base no SINAPI não-desonerado e BDI de 22.5%.', tab: 'spreadsheet' as CanvasTab, icon: FileText },
        { name: 'Cronograma Físico-Financeiro', prompt: 'Projetar desembolsos quinzenais para as etapas de fundação, alvenaria e acabamento.', tab: 'spreadsheet' as CanvasTab, icon: DollarSign },
      ]
    },
    {
      id: 'site' as StudioType,
      name: 'Gestão de Canteiro',
      icon: HardHat,
      defaultTab: 'geofence' as CanvasTab,
      badge: 'Sentinel GPS',
      description: 'Verta Ponto com geofencing e controle antifraude de insumos.',
      tools: [
        { name: 'Verta Ponto (Cerca Virtual GPS)', prompt: 'Auditar registro de presença dos operários no canteiro hoje com verificação do raio de 30m.', tab: 'geofence' as CanvasTab, icon: MapPinned },
        { name: 'Auditoria: Cimento Teórico vs Real', prompt: 'Confrontar entrada de sacos de cimento CP-II com volume teórico da laje de concreto usinado.', tab: 'geofence' as CanvasTab, icon: CheckCircle2 },
        { name: 'Diário de Obras Digital', prompt: 'Gerar ata técnica das atividades executadas hoje com registro de condições climáticas.', tab: 'geofence' as CanvasTab, icon: HardHat },
      ]
    },
    {
      id: 'inspection' as StudioType,
      name: 'Engenharia & Laudos',
      icon: Search,
      defaultTab: 'report' as CanvasTab,
      badge: 'Perícias ABNT',
      description: 'Diagnóstico de fissuras e laudos A4 com assinatura.',
      tools: [
        { name: 'Diagnóstico de Fissuras & Infiltração', prompt: 'Diagnosticar fissura a 45 graus em viga baldrame sob ambiente de maresia litorânea.', tab: 'report' as CanvasTab, icon: Search },
        { name: 'Gerar Laudo Pericial A4', prompt: 'Emitir laudo técnico pericial padronizado A4 com ART vinculada e prescrição de reparo.', tab: 'report' as CanvasTab, icon: FileText },
        { name: 'Agressividade Marítima (NBR 6118)', prompt: 'Avaliar medidas preventivas contra corrosão de armaduras para Classe de Agressividade IV.', tab: 'report' as CanvasTab, icon: Compass },
      ]
    }
  ];

  return (
    <aside className="w-80 h-full bg-[#fafaf9] border-r border-[#e5e5e2] flex flex-col justify-between text-xs overflow-hidden select-none">
      {/* Top section: Studios List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Section title */}
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#716e68] font-semibold">Estúdios Centrais</span>
          <span className="text-[10px] font-mono text-[#946f19] bg-[#fbf7ee] px-1.5 py-0.5 rounded border border-[#e5d5b0] font-semibold">
            4 Módulos
          </span>
        </div>

        {/* Studios Navigation */}
        <div className="space-y-2">
          {studios.map((studio) => {
            const Icon = studio.icon;
            const isActive = activeStudio === studio.id;

            return (
              <div 
                key={studio.id}
                className={`rounded-lg border transition duration-200 overflow-hidden ${
                  isActive 
                    ? 'bg-white border-[#121110] shadow-sm' 
                    : 'bg-white border-[#e8e8e5] hover:border-[#cbcbc5]'
                }`}
              >
                {/* Studio Header Button */}
                <button
                  onClick={() => {
                    onSelectStudio(studio.id);
                    onSelectCanvasTab(studio.defaultTab);
                  }}
                  className="w-full p-2.5 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-1.5 rounded-md transition ${
                      isActive 
                        ? 'bg-[#121110] text-white' 
                        : 'bg-[#f4f4f2] text-[#55524e] group-hover:text-[#121110]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className={`font-semibold text-xs ${isActive ? 'text-[#121110]' : 'text-[#33312e]'}`}>
                          {studio.name}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#716e68] line-clamp-1">{studio.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-[9px] font-mono text-[#946f19] bg-[#fbf7ee] px-1.5 py-0.5 rounded font-medium border border-[#ebd8b2]">
                      {studio.badge}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 transition ${isActive ? 'rotate-90 text-[#121110]' : 'text-[#8c8882]'}`} />
                  </div>
                </button>

                {/* Sub-tools (visible when studio is active) */}
                {isActive && (
                  <div className="p-2 pt-0 border-t border-[#f0f0ed] bg-[#fafaf8] space-y-1">
                    <div className="text-[9px] font-mono text-[#8c8882] px-2 py-1 uppercase font-semibold">Ações do Estúdio</div>
                    {studio.tools.map((tool, idx) => {
                      const ToolIcon = tool.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            onSelectCanvasTab(tool.tab);
                            onTriggerPreset(tool.prompt, studio.id);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded text-[11px] text-[#423f3b] hover:text-[#121110] hover:bg-white flex items-center space-x-2 transition group border border-transparent hover:border-[#e5e5e2]"
                        >
                          <ToolIcon className="w-3 h-3 text-[#946f19] group-hover:text-[#121110]" />
                          <span className="truncate">{tool.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Project Technical Telemetry Card */}
        <div className="bg-white border border-[#e5e5e2] rounded-lg p-3 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#716e68]">
            <span className="flex items-center space-x-1 font-semibold">
              <MapPin className="w-3 h-3 text-[#946f19]" />
              <span>CANTEIRO ATIVO</span>
            </span>
            <span className="text-[#16a34a] flex items-center space-x-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
              <span>Online</span>
            </span>
          </div>

          <div>
            <div className="font-semibold text-[#121110] text-xs">{activeProject.name}</div>
            <div className="text-[10px] text-[#716e68] font-mono">{activeProject.location}</div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-[#716e68]">Evolução Geral</span>
              <span className="text-[#121110] font-semibold">{activeProject.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#e8e8e5] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#121110] via-[#55524e] to-[#946f19] rounded-full transition-all duration-500" 
                style={{ width: `${activeProject.progress}%` }} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#f0f0ed] text-[10px] font-mono">
            <div>
              <span className="text-[#8c8882]">Área Total:</span>
              <div className="text-[#121110] font-medium">{activeProject.totalArea} m²</div>
            </div>
            <div>
              <span className="text-[#8c8882]">Operários Hoje:</span>
              <div className="text-[#121110] font-medium flex items-center space-x-1">
                <Users className="w-2.5 h-2.5 text-[#946f19]" />
                <span>{activeProject.activeWorkersCount} presentes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coastal Bioclimatic Telemetry Widget */}
        <div className="bg-white border border-[#e5e5e2] rounded-lg p-2.5 space-y-1.5 text-[10px] font-mono shadow-xs">
          <div className="flex items-center justify-between text-[#716e68] font-semibold">
            <span>CLIMA LITORÂNEO (ITAPEMA)</span>
            <Sun className="w-3 h-3 text-[#d97706]" />
          </div>
          <div className="flex items-center justify-between text-[#121110] font-medium">
            <div className="flex items-center space-x-1">
              <Wind className="w-3 h-3 text-[#0284c7]" />
              <span>Vento NE 18 km/h</span>
            </div>
            <div className="flex items-center space-x-1">
              <Droplets className="w-3 h-3 text-[#2563eb]" />
              <span>Umid. 76%</span>
            </div>
            <span>24°C</span>
          </div>
          <div className="text-[9px] text-[#7c5e15] bg-[#fbf7ee] p-1.5 rounded border border-[#ebd8b2] leading-tight">
            Condições ideais para cura úmida de laje de concreto.
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#e5e5e2] bg-[#f7f7f5] text-[10px] flex items-center justify-between text-[#716e68] font-mono">
        <span>VERTA Engine v2.5.0</span>
        <span className="text-[#946f19] font-medium">Sentinel Auth</span>
      </div>
    </aside>
  );
};
