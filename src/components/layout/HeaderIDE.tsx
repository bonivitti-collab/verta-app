import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Key, 
  Plus, 
  ChevronDown, 
  Coins, 
  Cpu, 
  Layers 
} from 'lucide-react';
import type { Project, SubscriptionTier } from '../../types';

interface HeaderIDEProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (p: Project) => void;
  onOpenApiKeyModal: () => void;
  onOpenPlansModal: () => void;
  onOpenNewProjectModal: () => void;
  tier: SubscriptionTier;
  credits: { used: number; total: number };
}

export const HeaderIDE: React.FC<HeaderIDEProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onOpenApiKeyModal,
  onOpenPlansModal,
  onOpenNewProjectModal,
  tier,
  credits,
}) => {
  return (
    <header className="h-13 bg-[#0a0908] border-b border-[#22201e] px-4 flex items-center justify-between text-xs select-none z-30">
      {/* Brand & Workspace */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c59b27] via-[#977317] to-[#453308] p-0.5 flex items-center justify-center shadow-lg shadow-[#c59b27]/10">
            <div className="w-full h-full bg-[#0d0c0b] rounded-[7px] flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#d4a359]" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-heading font-extrabold text-sm tracking-wider text-white">VERTA</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#201d18] text-[#d4a359] border border-[#3e3522]">IDE</span>
            </div>
            <div className="text-[9px] text-[#8c8880] tracking-tight">Grupo Vitti • Sentinel Systems</div>
          </div>
        </div>

        <div className="h-5 w-px bg-[#262422]" />

        {/* Project Selector Dropdown */}
        <div className="relative group">
          <div className="flex items-center space-x-2 bg-[#141311] hover:bg-[#1a1916] border border-[#2b2824] hover:border-[#423c34] px-2.5 py-1.5 rounded-md cursor-pointer transition">
            <Building2 className="w-3.5 h-3.5 text-[#d4a359]" />
            <div className="text-left">
              <div className="font-medium text-white flex items-center space-x-1">
                <span>{activeProject.name}</span>
                <ChevronDown className="w-3 h-3 text-[#7a766e]" />
              </div>
              <div className="text-[10px] text-[#8e8a82] font-mono">{activeProject.code} • {activeProject.status} ({activeProject.progress}%)</div>
            </div>
          </div>

          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-1 w-64 bg-[#121110] border border-[#2e2a26] rounded-md shadow-2xl p-1.5 hidden group-hover:block z-50">
            <div className="text-[10px] uppercase font-mono text-[#78746c] px-2 py-1">Obras do Ecossistema</div>
            {projects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className={`w-full text-left px-2.5 py-2 rounded text-xs flex items-center justify-between transition ${
                  proj.id === activeProject.id 
                    ? 'bg-[#242018] text-[#d4a359] border border-[#443820]' 
                    : 'text-[#d6d3ce] hover:bg-[#1a1917]'
                }`}
              >
                <div>
                  <div className="font-medium">{proj.name}</div>
                  <div className="text-[10px] text-[#7d7972]">{proj.location}</div>
                </div>
                <span className="font-mono text-[10px]">{proj.progress}%</span>
              </button>
            ))}
            <div className="mt-1 pt-1 border-t border-[#23201c]">
              <button
                onClick={onOpenNewProjectModal}
                className="w-full px-2.5 py-1.5 text-[11px] text-[#d4a359] hover:bg-[#201d17] rounded flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-3 h-3" />
                <span>Cadastrar Novo Projeto</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center status: AI Engine info */}
      <div className="hidden md:flex items-center space-x-3 bg-[#11100e] border border-[#23201c] px-3 py-1 rounded-full text-[11px]">
        <div className="flex items-center space-x-1.5 text-[#a8a39a]">
          <Cpu className="w-3.5 h-3.5 text-[#d4a359] animate-pulse" />
          <span>Core AI:</span>
          <span className="text-white font-mono font-medium">Gemini 3.8 Flash</span>
        </div>
        <div className="h-3 w-px bg-[#262422]" />
        <div className="flex items-center space-x-1 text-[#22c55e]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          <span>Streaming CoT Ativo</span>
        </div>
      </div>

      {/* Right controls: Credits, Plans, API Key, Profile */}
      <div className="flex items-center space-x-3">
        {/* Credits Badge */}
        <button 
          onClick={onOpenPlansModal}
          className="flex items-center space-x-1.5 bg-[#171512] hover:bg-[#1e1c18] border border-[#2e2a24] px-2.5 py-1 rounded-md text-[#d4a359] transition"
          title="Consumo de créditos de IA deste mês"
        >
          <Coins className="w-3.5 h-3.5 text-[#d4a359]" />
          <span className="font-mono font-semibold">{credits.total - credits.used}</span>
          <span className="text-[#847f75]">/ {credits.total} cr</span>
        </button>

        {/* Subscription Tier Badge */}
        <button
          onClick={onOpenPlansModal}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-[#2c2210] to-[#1a160d] border border-[#52411e] text-[#e0b44a] font-medium hover:border-[#7c632e] transition"
        >
          <Sparkles className="w-3 h-3 text-[#d4a359]" />
          <span className="uppercase text-[10px] tracking-wide font-mono">
            {tier === 'construtora' ? 'Plano Construtora' : tier === 'pro' ? 'Plano Pro' : 'Plano Grátis'}
          </span>
        </button>

        {/* Gemini API Key button */}
        <button
          onClick={onOpenApiKeyModal}
          className="flex items-center space-x-1.5 bg-[#141312] hover:bg-[#1d1b19] border border-[#2b2723] hover:border-[#4d453b] px-2.5 py-1 rounded-md text-[#b5b0a6] hover:text-white transition"
          title="Configurar Google Gemini API Key"
        >
          <Key className="w-3 h-3 text-[#d4a359]" />
          <span className="hidden sm:inline">Gemini API</span>
        </button>
      </div>
    </header>
  );
};
