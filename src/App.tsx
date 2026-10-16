import React, { useState, useEffect, useRef } from 'react';
import { HeaderIDE } from './components/layout/HeaderIDE';
import { LeftPane } from './components/layout/LeftPane';
import { CenterPane } from './components/layout/CenterPane';
import { RightPane } from './components/layout/RightPane';
import { PanelResizer } from './components/layout/PanelResizer';
import { ApiKeyModal } from './components/modals/ApiKeyModal';
import { SubscriptionPlansModal } from './components/modals/SubscriptionPlansModal';
import { NewProjectModal } from './components/modals/NewProjectModal';

import type { 
  StudioType, 
  CanvasTab, 
  SubscriptionTier, 
  Project, 
  ChatMessage, 
  SinapiItem, 
  InspectionData, 
  WorkerPresence, 
  MaterialAudit 
} from './types';

import { 
  INITIAL_PROJECTS, 
  INITIAL_SINAPI_ITEMS, 
  INITIAL_INSPECTION_DATA, 
  INITIAL_WORKERS, 
  INITIAL_MATERIAL_AUDITS 
} from './services/mockData';

import { generateEngineeringSolution } from './services/gemini';

export const App: React.FC = () => {
  // Projects and active context
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeProject, setActiveProject] = useState<Project>(INITIAL_PROJECTS[0]);
  const [activeStudio, setActiveStudio] = useState<StudioType>('project');
  const [activeCanvasTab, setActiveCanvasTab] = useState<CanvasTab>('floorplan');

  // Panel resizing states (customizable widths with persistence)
  const [leftWidth, setLeftWidth] = useState<number>(() => {
    const saved = localStorage.getItem('verta_panel_left_width');
    return saved ? Math.max(180, Math.min(parseInt(saved, 10), 480)) : 280;
  });

  const [rightWidth, setRightWidth] = useState<number>(() => {
    const saved = localStorage.getItem('verta_panel_right_width');
    return saved ? Math.max(340, Math.min(parseInt(saved, 10), 960)) : 600;
  });

  const [isLeftCollapsed, setIsLeftCollapsed] = useState<boolean>(false);
  const [isCanvasMaximized, setIsCanvasMaximized] = useState<boolean>(false);
  const [activeResizer, setActiveResizer] = useState<'left' | 'right' | null>(null);

  const activeResizerRef = useRef<'left' | 'right' | null>(null);
  activeResizerRef.current = activeResizer;

  const leftWidthRef = useRef(leftWidth);
  leftWidthRef.current = leftWidth;

  const rightWidthRef = useRef(rightWidth);
  rightWidthRef.current = rightWidth;

  const isLeftCollapsedRef = useRef(isLeftCollapsed);
  isLeftCollapsedRef.current = isLeftCollapsed;

  // Global mousemove and mouseup listeners for smooth panel dragging
  useEffect(() => {
    if (!activeResizer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const mode = activeResizerRef.current;
      if (!mode) return;

      if (mode === 'left') {
        const minLeft = 180;
        const maxLeft = Math.min(480, window.innerWidth - rightWidthRef.current - 260);
        const newLeft = Math.max(minLeft, Math.min(e.clientX, maxLeft));
        setLeftWidth(newLeft);
      } else if (mode === 'right') {
        const minRight = 340;
        const currentLeftW = isLeftCollapsedRef.current ? 48 : leftWidthRef.current;
        const maxRight = Math.max(340, window.innerWidth - currentLeftW - 260);
        const newRight = Math.max(minRight, Math.min(window.innerWidth - e.clientX, maxRight));
        setRightWidth(newRight);
      }
    };

    const handleMouseUp = () => {
      const mode = activeResizerRef.current;
      if (mode === 'left') {
        localStorage.setItem('verta_panel_left_width', leftWidthRef.current.toString());
      } else if (mode === 'right') {
        localStorage.setItem('verta_panel_right_width', rightWidthRef.current.toString());
      }
      setActiveResizer(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeResizer]);

  const handleToggleLeftCollapse = () => {
    setIsLeftCollapsed(prev => !prev);
  };

  const handleToggleMaximize = () => {
    setIsCanvasMaximized(prev => !prev);
  };

  const handleResetPanels = () => {
    setLeftWidth(280);
    setRightWidth(600);
    setIsLeftCollapsed(false);
    setIsCanvasMaximized(false);
    localStorage.setItem('verta_panel_left_width', '280');
    localStorage.setItem('verta_panel_right_width', '600');
  };

  // Business Model & Credits
  const [tier, setTier] = useState<SubscriptionTier>('construtora');
  const [credits, setCredits] = useState({ used: 16, total: 100 });

  // Data states
  const [sinapiItems, setSinapiItems] = useState<SinapiItem[]>(INITIAL_SINAPI_ITEMS);
  const [inspectionData] = useState<InspectionData>(INITIAL_INSPECTION_DATA);
  const [workers] = useState<WorkerPresence[]>(INITIAL_WORKERS);
  const [materials] = useState<MaterialAudit[]>(INITIAL_MATERIAL_AUDITS);

  // Modals
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Prompt trigger pipe
  const [presetText, setPresetText] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Initial chat messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      role: 'assistant',
      content: `Olá, Engenheiro! Sou o **VERTA Core AI**, seu copiloto de Inteligência Artificial para Engenharia Civil, Arquitetura e Gestão de Obras do **Grupo Vitti / Sentinel Systems**.

Estou sincronizado com a obra ativa **${activeProject.name}** (${activeProject.code}) e calibrado segundo as normas vigentes:
- 📐 **NBR 15575 / NBR 9050:** Desempenho habitacional e conforto térmico litorâneo.
- 💰 **SINAPI / CUB 2026:** Composições unitárias e cálculo automático de BDI.
- 👷 **Portaria 671 MTE:** Verta Ponto GPS com cerca virtual (geofencing) e antifraude de insumos.
- 🔍 **NBR 6118 / NBR 13752:** Engenharia diagnóstica, patologias e emissão de Laudos Periciais A4 com assinatura ICP-Brasil.

*Selecione um dos 4 Estúdios Centrais no painel esquerdo ou digite um comando abaixo para começarmos.*`,
      timestamp: '14:35',
      studio: 'project',
      thoughts: [
        {
          title: 'Inicialização de Contexto Técnico',
          detail: 'Carregamento de dados geotécnicos e climáticos de Itapema/SC (Maresia Classe IV).',
          status: 'done',
          normRef: 'NBR 6118'
        },
        {
          title: 'Sincronização de Canteiro',
          detail: '8 operários conectados via Verta Ponto GPS. 1 alerta de geofencing ativo no lote.',
          status: 'done',
          normRef: 'Portaria 671'
        }
      ],
      suggestedAction: {
        label: 'Ver Planta Baixa 2D no Canvas',
        targetTab: 'floorplan'
      }
    }
  ]);

  const handleSendMessage = async (text: string, image?: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      studio: activeStudio,
      attachments: image ? [{ name: 'Foto de Canteiro / Planta', url: image, type: 'image' }] : undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const result = await generateEngineeringSolution(text, activeStudio, image);

      // Decrement credits
      setCredits(prev => ({
        ...prev,
        used: Math.min(prev.used + 1, prev.total)
      }));

      // Determine suggested tab target
      let targetTab: CanvasTab = 'floorplan';
      let actionLabel = 'Abrir no Canvas';

      if (activeStudio === 'cost' || text.toLowerCase().includes('orçamento') || text.toLowerCase().includes('sinapi')) {
        targetTab = 'spreadsheet';
        actionLabel = 'Ver Planilha SINAPI';
      } else if (activeStudio === 'site' || text.toLowerCase().includes('ponto') || text.toLowerCase().includes('canteiro')) {
        targetTab = 'geofence';
        actionLabel = 'Ver Radar GPS do Canteiro';
      } else if (activeStudio === 'inspection' || text.toLowerCase().includes('laudo') || text.toLowerCase().includes('fissura')) {
        targetTab = 'report';
        actionLabel = 'Exibir Laudo A4 Diagramado';
      } else {
        targetTab = 'floorplan';
        actionLabel = 'Visualizar Vetor da Planta';
      }

      const assistantMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        role: 'assistant',
        content: result.text,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        studio: activeStudio,
        thoughts: result.thoughts,
        suggestedAction: {
          label: actionLabel,
          targetTab
        }
      };

      setMessages(prev => [...prev, assistantMsg]);
      // Auto-switch canvas to relevant tab
      setActiveCanvasTab(targetTab);
    } catch (err) {
      console.error('Error generating AI response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTriggerPreset = (promptText: string, studio: StudioType) => {
    setActiveStudio(studio);
    setPresetText(promptText);
  };

  const handleAddProject = (newProj: Project) => {
    setProjects(prev => [newProj, ...prev]);
    setActiveProject(newProj);
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden text-[#121110] font-sans">
      {/* Top IDE Header Bar */}
      <HeaderIDE
        projects={projects}
        activeProject={activeProject}
        onSelectProject={setActiveProject}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenPlansModal={() => setIsPlansModalOpen(true)}
        onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
        tier={tier}
        credits={credits}
      />

      {/* Main Three-Pane Layout */}
      <main className={`flex-1 flex overflow-hidden relative ${activeResizer ? 'cursor-col-resize select-none pointer-events-auto' : ''}`}>
        {!isCanvasMaximized && (
          <>
            {/* Left Pane (Workspace, 4 Studios, Telemetry) */}
            <LeftPane
              activeStudio={activeStudio}
              onSelectStudio={setActiveStudio}
              activeProject={activeProject}
              onSelectCanvasTab={setActiveCanvasTab}
              onTriggerPreset={handleTriggerPreset}
              width={isLeftCollapsed ? 48 : leftWidth}
              isCollapsed={isLeftCollapsed}
              onToggleCollapse={handleToggleLeftCollapse}
            />

            {/* Left-Center Panel Splitter */}
            {!isLeftCollapsed && (
              <PanelResizer
                isDragging={activeResizer === 'left'}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setActiveResizer('left');
                }}
                onDoubleClick={handleToggleLeftCollapse}
                title="Arraste para redimensionar (clique duplo para recolher estúdios)"
              />
            )}

            {/* Center Pane (Verta AI Agent, CoT streaming, Multimodal) */}
            <CenterPane
              activeStudio={activeStudio}
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              onSelectCanvasTab={setActiveCanvasTab}
              presetText={presetText}
              onClearPreset={() => setPresetText(undefined)}
            />

            {/* Center-Right Panel Splitter */}
            <PanelResizer
              isDragging={activeResizer === 'right'}
              onMouseDown={(e) => {
                e.preventDefault();
                setActiveResizer('right');
              }}
              onDoubleClick={() => {
                setRightWidth(600);
                localStorage.setItem('verta_panel_right_width', '600');
              }}
              title="Arraste para redimensionar Canvas (clique duplo para redefinir para 600px)"
            />
          </>
        )}

        {/* Right Pane (Dynamic Canvas & Live Preview) */}
        <RightPane
          activeTab={activeCanvasTab}
          onSelectTab={setActiveCanvasTab}
          activeProject={activeProject}
          sinapiItems={sinapiItems}
          onUpdateSinapiItems={setSinapiItems}
          inspectionData={inspectionData}
          workers={workers}
          materials={materials}
          tier={tier}
          width={isCanvasMaximized ? undefined : rightWidth}
          isMaximized={isCanvasMaximized}
          onToggleMaximize={handleToggleMaximize}
          onResetPanels={handleResetPanels}
        />
      </main>

      {/* Modals */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      <SubscriptionPlansModal
        isOpen={isPlansModalOpen}
        onClose={() => setIsPlansModalOpen(false)}
        currentTier={tier}
        onSelectTier={setTier}
      />

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
};

export default App;
