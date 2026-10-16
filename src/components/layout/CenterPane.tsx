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
    <section className="flex-1 h-full bg-[#0a0a09] flex flex-col justify-between border-r border-[#22201e] overflow-hidden">
      {/* Center Header */}
      <div className="h-11 border-b border-[#22201e] px-4 flex items-center justify-between bg-[#0e0d0b]">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#c59b27] animate-ping" />
          <span className="font-heading font-semibold text-xs text-white">VERTA Core AI</span>
          <span className="text-[10px] font-mono text-[#8a857c] bg-[#1a1814] px-1.5 py-0.5 rounded border border-[#2b271f]">
            {activeStudio.toUpperCase()} AGENT
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-mono text-[#8c887f]">
          <span className="flex items-center space-x-1 text-[#22c55e]">
            <TrendingUp className="w-3 h-3 text-[#22c55e]" />
            <span>Margem Líquida &gt; 92%</span>
          </span>
          <span className="text-[#3a3731]">|</span>
          <span className="text-[#c59b27]">Normas ABNT Ativas</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isThoughtsOpen = expandedThoughts[msg.id] ?? true;

          return (
            <div 
              key={msg.id} 
              className={`flex flex-col space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}
            >
              {/* Message Header */}
              <div className="flex items-center space-x-2 text-[10px] font-mono text-[#78746b] px-1">
                <span>{isUser ? 'Engenheiro Responsável' : 'VERTA AI Agent'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div 
                className={`max-w-[90%] rounded-xl p-3.5 text-xs leading-relaxed transition ${
                  isUser 
                    ? 'bg-[#1f1d19] border border-[#3f382a] text-[#f2efe9]' 
                    : 'bg-[#12110f] border border-[#262420] text-[#e3e0d8] shadow-md shadow-black/30'
                }`}
              >
                {/* Attached Image Preview */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {msg.attachments.map((att, idx) => (
                      <div key={idx} className="relative rounded-lg overflow-hidden border border-[#3e382d] max-w-sm">
                        <img src={att.url} alt={att.name} className="w-full h-auto object-cover max-h-56" />
                        <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1.5 text-[10px] font-mono text-[#d4a359] truncate">
                          {att.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Chain of Thought (CoT) */}
                {msg.thoughts && msg.thoughts.length > 0 && (
                  <div className="mb-3 rounded-lg border border-[#312918] bg-[#14120e] overflow-hidden">
                    <button
                      onClick={() => toggleThought(msg.id)}
                      className="w-full px-3 py-2 flex items-center justify-between text-[11px] font-mono text-[#c59b27] hover:bg-[#1a1711] transition"
                    >
                      <div className="flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                        <span>Raciocínio Encadeado (Chain-of-Thought)</span>
                        <span className="text-[10px] text-[#7d7970]">({msg.thoughts.length} etapas)</span>
                      </div>
                      {isThoughtsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isThoughtsOpen && (
                      <div className="p-3 pt-1 space-y-2 border-t border-[#231e13] text-[11px] font-mono">
                        {msg.thoughts.map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-[#9e998e]">
                            <CheckCircle className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-white font-medium flex items-center space-x-1.5">
                                <span>{step.title}</span>
                                {step.normRef && (
                                  <span className="text-[9px] bg-[#221c0e] text-[#d4a359] px-1 py-0.2 rounded border border-[#3d3115]">
                                    {step.normRef}
                                  </span>
                                )}
                              </div>
                              <div className="text-[#878278] text-[10.5px] mt-0.5 leading-snug">{step.detail}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Main Content (Markdown formatted) */}
                <div className="whitespace-pre-wrap font-sans text-xs space-y-2">
                  {msg.content}
                </div>

                {/* Suggested Action Button (Sync with Canvas) */}
                {msg.suggestedAction && (
                  <div className="mt-3 pt-2.5 border-t border-[#23211c] flex items-center justify-between">
                    <span className="text-[10px] text-[#78746c] font-mono">Artefato interativo gerado:</span>
                    <button
                      onClick={() => onSelectCanvasTab(msg.suggestedAction!.targetTab)}
                      className="px-2.5 py-1 rounded bg-[#2a2211] hover:bg-[#382d16] border border-[#534320] text-[#e0b44a] text-[11px] font-medium flex items-center space-x-1.5 transition"
                    >
                      <span>{msg.suggestedAction.label}</span>
                      <ArrowRight className="w-3 h-3" />
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
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#78746b] px-1">
              <span>VERTA AI Agent</span>
              <span>•</span>
              <span className="text-[#c59b27] animate-pulse">Processando diretrizes normativas...</span>
            </div>
            <div className="bg-[#12110f] border border-[#2b271f] rounded-xl p-4 text-xs max-w-sm space-y-3">
              <div className="flex items-center space-x-2 text-[#c59b27]">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span className="font-mono text-[11px]">Calculando inferência no Gemini 3.8 Flash...</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 bg-[#201d18] rounded-full w-3/4 animate-pulse" />
                <div className="h-2 bg-[#201d18] rounded-full w-1/2 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Presets */}
      <div className="px-3 py-1.5 bg-[#0d0c0a] border-t border-[#1e1c19] overflow-x-auto flex items-center space-x-2 no-scrollbar">
        <span className="text-[9px] font-mono uppercase text-[#69655f] shrink-0">Prompts Rápidos:</span>
        {presetsByStudio[activeStudio].map((preset, idx) => (
          <button
            key={idx}
            onClick={() => setInputText(preset.replace(/^[^\s]+\s/, ''))}
            className="shrink-0 px-2.5 py-1 rounded-md bg-[#141311] hover:bg-[#1f1d19] border border-[#272420] hover:border-[#473f32] text-[#b0aba0] hover:text-white text-[10px] transition"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-[#0e0d0b] border-t border-[#22201e]">
        {/* Selected Image Preview Pill */}
        {selectedImage && (
          <div className="mb-2 flex items-center space-x-2 bg-[#1b1915] border border-[#383124] p-1.5 rounded-lg max-w-xs">
            <img src={selectedImage} alt="Preview" className="w-8 h-8 rounded object-cover" />
            <div className="flex-1 text-[10px] text-[#d4a359] truncate font-mono">Imagem de canteiro anexada</div>
            <button 
              onClick={() => setSelectedImage(null)} 
              className="p-1 hover:bg-[#28241e] rounded text-[#8a857b]"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <form onSubmit={handleSend} className="relative flex items-end bg-[#131210] border border-[#2b2722] focus-within:border-[#635128] rounded-xl transition p-2">
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
            className="p-2 text-[#8c887f] hover:text-[#d4a359] hover:bg-[#1e1c18] rounded-lg transition shrink-0"
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
            className="w-full bg-transparent border-0 resize-none text-xs text-white placeholder-[#5d5952] focus:ring-0 focus:outline-none px-2 py-1 leading-relaxed"
          />

          <button
            type="submit"
            disabled={(!inputText.trim() && !selectedImage) || isLoading}
            className={`p-2 rounded-lg shrink-0 transition ${
              (!inputText.trim() && !selectedImage) || isLoading
                ? 'bg-[#1c1a17] text-[#4d4a44] cursor-not-allowed'
                : 'bg-gradient-to-r from-[#c59b27] to-[#a37a1a] text-black font-semibold hover:brightness-110 shadow-lg shadow-[#c59b27]/20'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-[#5b5750] px-1">
          <span>Pressione Enter para enviar, Shift+Enter para nova linha</span>
          <span>Modelo: Gemini 2.5/3.8 Flash • Raciocínio Profundo</span>
        </div>
      </div>
    </section>
  );
};
