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
    <header className="h-13 bg-white border-b border-[#e5e5e2] px-4 flex items-center justify-between text-xs select-none z-30 shadow-xs">
      {/* Brand & Workspace */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c59b27] via-[#977317] to-[#5a440a] p-0.5 flex items-center justify-center shadow-xs">
            <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#946f19]" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-heading font-extrabold text-sm tracking-wider text-[#121110]">VERTA</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#f4f3ec] text-[#946f19] border border-[#e0d6be] font-semibold">IDE</span>
            </div>
            <div className="text-[9px] text-[#716e68] tracking-tight">Grupo Vitti • Sentinel Systems</div>
          </div>
        </div>

        <div className="h-5 w-px bg-[#e5e5e2]" />

        {/* Project Selector Dropdown */}
        <div className="relative group">
          <div className="flex items-center space-x-2 bg-[#f7f7f5] hover:bg-[#ededeb] border border-[#e0e0dc] hover:border-[#cbcbc5] px-2.5 py-1.5 rounded-md cursor-pointer transition">
            <Building2 className="w-3.5 h-3.5 text-[#946f19]" />
            <div className="text-left">
              <div className="font-medium text-[#121110] flex items-center space-x-1">
                <span>{activeProject.name}</span>
                <ChevronDown className="w-3 h-3 text-[#716e68]" />
              </div>
              <div className="text-[10px] text-[#716e68] font-mono">{activeProject.code} • {activeProject.status} ({activeProject.progress}%)</div>
            </div>
          </div>

          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#e5e5e2] rounded-md shadow-xl p-1.5 hidden group-hover:block z-50">
            <div className="text-[10px] uppercase font-mono text-[#8c8882] px-2 py-1">Obras do Ecossistema</div>
            {projects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className={`w-full text-left px-2.5 py-2 rounded text-xs flex items-center justify-between transition ${
                  proj.id === activeProject.id 
                    ? 'bg-[#fbf7ee] text-[#946f19] border border-[#e8d5a8] font-semibold' 
                    : 'text-[#33312e] hover:bg-[#f7f7f5]'
                }`}
              >
                <div>
                  <div className="font-medium">{proj.name}</div>
                  <div className="text-[10px] text-[#716e68] font-normal">{proj.location}</div>
                </div>
                <span className="font-mono text-[10px]">{proj.progress}%</span>
              </button>
            ))}
            <div className="mt-1 pt-1 border-t border-[#ededeb]">
              <button
                onClick={onOpenNewProjectModal}
                className="w-full px-2.5 py-1.5 text-[11px] text-[#946f19] hover:bg-[#fbf7ee] rounded flex items-center justify-center space-x-1.5 font-medium transition"
              >
                <Plus className="w-3 h-3" />
                <span>Cadastrar Novo Projeto</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center status: AI Engine info */}
      <div className="hidden md:flex items-center space-x-3 bg-[#f7f7f5] border border-[#e5e5e2] px-3 py-1 rounded-full text-[11px]">
        <div className="flex items-center space-x-1.5 text-[#55524e]">
          <Cpu className="w-3.5 h-3.5 text-[#946f19] animate-pulse" />
          <span>Core AI:</span>
          <span className="text-[#121110] font-mono font-medium">Gemini 3.8 Flash</span>
        </div>
        <div className="h-3 w-px bg-[#e0e0dc]" />
        <div className="flex items-center space-x-1 text-[#16a34a] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
          <span>Streaming CoT Ativo</span>
        </div>
      </div>

      {/* Right controls: Credits, Plans, API Key */}
      <div className="flex items-center space-x-3">
        {/* Credits Badge */}
        <button 
          onClick={onOpenPlansModal}
          className="flex items-center space-x-1.5 bg-[#f7f7f5] hover:bg-[#ededeb] border border-[#e0e0dc] px-2.5 py-1 rounded-md text-[#946f19] transition"
          title="Consumo de créditos de IA deste mês"
        >
          <Coins className="w-3.5 h-3.5 text-[#946f19]" />
          <span className="font-mono font-semibold">{credits.total - credits.used}</span>
          <span className="text-[#716e68]">/ {credits.total} cr</span>
        </button>

        {/* Subscription Tier Badge */}
        <button
          onClick={onOpenPlansModal}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#fbf7ee] hover:bg-[#f7efe0] border border-[#dfc68b] text-[#946f19] font-medium transition"
        >
          <Sparkles className="w-3 h-3 text-[#b8860b]" />
          <span className="uppercase text-[10px] tracking-wide font-mono font-semibold">
            {tier === 'construtora' ? 'Plano Construtora' : tier === 'pro' ? 'Plano Pro' : 'Plano Grátis'}
          </span>
        </button>

        {/* Gemini API Key button */}
        <button
          onClick={onOpenApiKeyModal}
          className="flex items-center space-x-1.5 bg-[#f7f7f5] hover:bg-[#ededeb] border border-[#e0e0dc] hover:border-[#cbcbc5] px-2.5 py-1 rounded-md text-[#423f3b] hover:text-[#121110] transition"
          title="Configurar Google Gemini API Key"
        >
          <Key className="w-3 h-3 text-[#946f19]" />
          <span className="hidden sm:inline font-medium">Gemini API</span>
        </button>
      </div>
    </header>
  );
};
