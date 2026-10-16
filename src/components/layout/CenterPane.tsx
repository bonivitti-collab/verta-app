import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Sparkles, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  X,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import type { StudioType, ChatMessage, CanvasTab } from '../../types';

interface CenterPaneProps {
  activeStudio: StudioType;
  messages: ChatMessage[];
  onSendMessage: (text: string, image?: string) => Promise<void>;
  isLoading: boolean;
  onSelectCanvasTab: (tab: CanvasTab) => void;
  presetText?: string;
  onClearPreset?: () => void;
}

export const CenterPane: React.FC<CenterPaneProps> = ({
  activeStudio,
  messages,
  onSendMessage,
  isLoading,
  onSelectCanvasTab,
  presetText,
  onClearPreset
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedThoughts, setExpandedThoughts] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (presetText) {
      setInputText(presetText);
      if (onClearPreset) onClearPreset();
    }
  }, [presetText, onClearPreset]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleThought = (msgId: string) => {
    setExpandedThoughts(prev => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!inputText.trim() && !selectedImage) || isLoading) return;

    const textToSend = inputText;
    const imageToSend = selectedImage || undefined;
    
    setInputText('');
    setSelectedImage(null);
    await onSendMessage(textToSend, imageToSend);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const presetsByStudio: Record<StudioType, string[]> = {
    project: [
      '📐 Gerar planta baixa térrea 120m² litorânea com 3 quartos',
      '🖼️ Decora Verta: Simular piso porcelanato 80x80 em cômodo em osso',
      '☀️ Calcular insolação da varanda gourmet para sol da manhã'
    ],
    cost: [
      '💰 Orçamento paramétrico SINAPI para fundações e alvenaria',
      '📊 Curva ABC com BDI de 22.5% para obra residencial',
      '📅 Cronograma físico-financeiro com desembolsos quinzenais'
    ],
    site: [
      '📍 Auditar ponto eletrônico com geofencing (raio 30m)',
      '🧱 Confrontar cimento entregue vs consumo teórico da laje',
      '📋 Emitir resumo do Diário de Obras para o cliente'
    ],
    inspection: [
      '🔍 Diagnosticar fissura a 45° em viga baldrame costeira',
      '📄 Gerar Laudo Pericial A4 com assinatura e ART vinculada',
      '🌊 Prescrever recuperação contra maresia sob NBR 6118'
    ]
  };

  return (
    <section className="flex-1 h-full bg-white flex flex-col justify-between border-r border-[#e5e5e2] overflow-hidden">
      {/* Center Header */}
      <div className="h-11 border-b border-[#e5e5e2] px-4 flex items-center justify-between bg-[#fafaf9]">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#121110] animate-ping" />
          <span className="font-heading font-semibold text-xs text-[#121110]">VERTA Core AI</span>
          <span className="text-[10px] font-mono text-[#716e68] bg-[#f0f0ed] px-1.5 py-0.5 rounded border border-[#dededb] font-medium">
            {activeStudio.toUpperCase()} AGENT
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-[#716e68]">
          <span className="flex items-center space-x-1 text-[#16a34a] font-medium">
            <TrendingUp className="w-3 h-3 text-[#16a34a]" />
            <span>Margem Líquida &gt; 92%</span>
          </span>
          <span className="text-[#dededb]">|</span>
          <span className="text-[#946f19] font-medium">Normas ABNT Ativas</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isThoughtsOpen = expandedThoughts[msg.id] ?? true;

          return (
            <div 
              key={msg.id} 
              className={`flex flex-col space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}
            >
              {/* Message Header */}
              <div className="flex items-center space-x-2 text-[10px] font-mono text-[#8c8882] px-1">
                <span className="font-medium text-[#55524e]">{isUser ? 'Engenheiro Responsável' : 'VERTA AI Agent'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div 
                className={`max-w-[90%] rounded-xl p-3.5 text-xs leading-relaxed transition ${
                  isUser 
                    ? 'bg-[#121110] text-white shadow-xs' 
                    : 'bg-[#fafaf9] border border-[#e5e5e2] text-[#242220] shadow-xs'
                }`}
              >
                {/* Attached Image Preview */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {msg.attachments.map((att, idx) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden border border-[#dededb] max-w-sm shadow-xs">
                        <img src={att.url} alt={att.name} className="w-full h-auto object-cover max-h-56" />
                        <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-xs p-1.5 text-[10px] font-mono text-[#121110] truncate border-t border-[#e5e5e2]">
                          {att.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Chain of Thought (CoT) */}
                {msg.thoughts && msg.thoughts.length > 0 && (
                  <div className="mb-3 rounded-lg border border-[#e8dcb9] bg-[#fbf9f4] overflow-hidden">
                    <button
                      onClick={() => toggleThought(msg.id)}
                      className="w-full px-3 py-2 flex items-center justify-between text-[11px] font-mono text-[#8c6712] hover:bg-[#f7f2e6] transition font-semibold"
                    >
                      <div className="flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#946f19]" />
                        <span>Raciocínio Encadeado (Chain-of-Thought)</span>
                        <span className="text-[10px] text-[#8a857b]">({msg.thoughts.length} etapas)</span>
                      </div>
                      {isThoughtsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isThoughtsOpen && (
                      <div className="p-3 pt-1 space-y-2 border-t border-[#f0e6ce] text-[11px] font-mono">
                        {msg.thoughts.map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-[#423f3b]">
                            <CheckCircle className="w-3.5 h-3.5 text-[#16a34a] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-[#121110] font-semibold flex items-center space-x-1.5">
                                <span>{step.title}</span>
                                {step.normRef && (
                                  <span className="text-[9px] bg-white text-[#946f19] px-1.5 py-0.2 rounded border border-[#dfc68b] font-medium">
                                    {step.normRef}
                                  </span>
                                )}
                              </div>
                              <div className="text-[#55524e] text-[10.5px] mt-0.5 leading-snug">{step.detail}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Main Content */}
                <div className="whitespace-pre-wrap font-sans text-xs space-y-2">
                  {msg.content}
                </div>

                {/* Suggested Action Button (Sync with Canvas) */}
                {msg.suggestedAction && (
                  <div className="mt-3 pt-2.5 border-t border-[#e8e8e5] flex items-center justify-between">
                    <span className="text-[10px] text-[#716e68] font-mono">Artefato gerado no Canvas:</span>
                    <button
                      onClick={() => onSelectCanvasTab(msg.suggestedAction!.targetTab)}
                      className="px-2.5 py-1 rounded bg-[#121110] hover:bg-[#2b2926] text-white text-[11px] font-medium flex items-center space-x-1.5 transition shadow-xs"
                    >
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight className="w-3 h-3 text-[#d4a359]" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-start space-y-2">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#8c8882] px-1">
              <span className="font-medium text-[#121110]">VERTA AI Agent</span>
              <span>•</span>
              <span className="text-[#946f19] font-medium animate-pulse">Processando diretrizes normativas...</span>
            </div>
            <div className="bg-[#fafaf9] border border-[#e5e5e2] rounded-xl p-4 text-xs max-w-sm space-y-3 shadow-xs">
              <div className="flex items-center space-x-2 text-[#946f19]">
                <Sparkles className="w-4 h-4 animate-spin text-[#946f19]" />
                <span className="font-mono text-[11px] font-medium">Calculando inferência no Gemini 3.8 Flash...</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 bg-[#e8e8e5] rounded-full w-3/4 animate-pulse" />
                <div className="h-2 bg-[#e8e8e5] rounded-full w-1/2 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Presets */}
      <div className="px-3 py-1.5 bg-[#fafaf9] border-t border-[#e5e5e2] overflow-x-auto flex items-center space-x-2 no-scrollbar">
        <span className="text-[9px] font-mono uppercase text-[#716e68] shrink-0 font-semibold">Prompts Rápidos:</span>
        {presetsByStudio[activeStudio].map((preset, idx) => (
          <button
            key={idx}
            onClick={() => setInputText(preset.replace(/^[^\s]+\s/, ''))}
            className="shrink-0 px-2.5 py-1 rounded-md bg-white hover:bg-[#f4f4f2] border border-[#dededb] hover:border-[#121110] text-[#423f3b] hover:text-[#121110] text-[10px] font-medium transition shadow-2xs"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-[#e5e5e2]">
        {/* Selected Image Preview Pill */}
        {selectedImage && (
          <div className="mb-2 flex items-center space-x-2 bg-[#fbf7ee] border border-[#e5d5b0] p-1.5 rounded-lg max-w-xs shadow-xs">
            <img src={selectedImage} alt="Preview" className="w-8 h-8 rounded object-cover" />
            <div className="flex-1 text-[10px] text-[#946f19] truncate font-mono font-medium">Imagem de canteiro anexada</div>
            <button 
              onClick={() => setSelectedImage(null)} 
              className="p-1 hover:bg-[#f0e4c6] rounded text-[#716e68]"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <form onSubmit={handleSend} className="relative flex items-end bg-[#fafaf9] border border-[#dcdcd8] focus-within:border-[#121110] focus-within:bg-white rounded-xl transition p-2 shadow-2xs">
          {/* File Upload Hidden Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*,.pdf" 
            className="hidden" 
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-[#716e68] hover:text-[#121110] hover:bg-[#ededeb] rounded-lg transition shrink-0"
            title="Anexar foto do canteiro ou rascunho de planta"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Instrua o VERTA AI para ${activeStudio.toUpperCase()} (ex: gerar planta, orçar SINAPI, laudo de patologia)...`}
            rows={2}
            className="w-full bg-transparent border-0 resize-none text-xs text-[#121110] placeholder-[#8c8882] focus:ring-0 focus:outline-none px-2 py-1 leading-relaxed"
          />

          <button
            type="submit"
            disabled={(!inputText.trim() && !selectedImage) || isLoading}
            className={`p-2 rounded-lg shrink-0 transition ${
              (!inputText.trim() && !selectedImage) || isLoading
                ? 'bg-[#e8e8e5] text-[#a8a49c] cursor-not-allowed'
                : 'bg-[#121110] text-white hover:bg-black font-semibold shadow-xs'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-[#8c8882] px-1">
          <span>Pressione Enter para enviar, Shift+Enter para nova linha</span>
          <span>Modelo: Gemini 2.5/3.8 Flash • Raciocínio Profundo</span>
        </div>
      </div>
    </section>
  );
};
