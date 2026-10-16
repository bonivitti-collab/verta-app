import React, { useState } from 'react';
import { Key, CheckCircle, AlertCircle, X, Shield, Cpu, ExternalLink } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../../services/gemini';
import { GoogleGenAI } from '@google/genai';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    setStoredApiKey(apiKey.trim());
    setStatus('success');
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      setStatus('error');
      setErrorMessage('Por favor, informe a API Key do Google Gemini.');
      return;
    }

    setStatus('testing');
    setErrorMessage('');

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Teste de conexão VERTA IDE Grupo Vitti.'
      });

      if (response && response.text) {
        setStatus('success');
        setStoredApiKey(apiKey.trim());
      } else {
        throw new Error('Resposta vazia da API.');
      }
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Falha ao autenticar com a API do Google Gemini.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-[#e5e5e2] rounded-2xl max-w-md w-full p-6 text-xs text-[#242220] shadow-2xl space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#ededeb] pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#fbf7ee] border border-[#dfc68b] flex items-center justify-center text-[#946f19]">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#121110]">Google Gemini API Key</h3>
              <p className="text-[10px] text-[#716e68]">Conexão direta oficial com o SDK @google/genai</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#f4f4f2] rounded text-[#716e68]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-[#fbf7ee] border border-[#ebd8b2] p-3 rounded-lg space-y-1 text-[11px]">
          <div className="flex items-center space-x-1.5 text-[#946f19] font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Controle de Custos e Margem Líquida</span>
          </div>
          <p className="text-[#69531e] leading-relaxed">
            O VERTA opera com tokens de alta eficiência via Gemini 3.8 / 2.5 Flash, 
            garantindo que cada inferência de engenharia custe frações de centavo e mantenha 
            a margem de lucro SaaS superior a 85%.
          </p>
        </div>

        {/* Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-[#55524e] font-semibold block">Chave de API (AI Studio / Vertex):</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-[#f8f8f6] border border-[#dcdcd8] focus:border-[#121110] focus:bg-white rounded-lg px-3 py-2 text-[#121110] font-mono text-xs focus:outline-none"
          />
        </div>

        {/* Status Feedback */}
        {status === 'testing' && (
          <div className="text-[#946f19] text-[11px] flex items-center space-x-1.5 font-mono font-medium">
            <Cpu className="w-3.5 h-3.5 animate-spin" />
            <span>Validando chave com @google/genai...</span>
          </div>
        )}

        {status === 'success' && (
          <div className="text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200 text-[11px] flex items-center space-x-1.5 font-mono font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Chave autenticada e salva com sucesso!</span>
          </div>
        )}

        {status === 'error' && (
          <div className="text-red-700 bg-red-50 p-2 rounded border border-red-200 text-[11px] flex items-center space-x-1.5 font-mono font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#ededeb]">
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#716e68] hover:text-[#121110] flex items-center space-x-1 font-mono transition"
          >
            <span>Obter chave no Google AI Studio</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleTestKey}
              className="px-3 py-1.5 bg-[#f4f4f2] hover:bg-[#ededeb] border border-[#dededb] rounded-md text-[11px] font-medium transition"
            >
              Testar Conexão
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 bg-[#121110] hover:bg-black text-white font-semibold rounded-md text-[11px] transition shadow-xs"
            >
              Salvar Chave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
