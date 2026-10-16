import React, { useState } from 'react';
import { X, Building2 } from 'lucide-react';
import type { Project } from '../../types';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Project) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('VRT-2026-');
  const [location, setLocation] = useState('Itapema / SC');
  const [type, setType] = useState<Project['type']>('Litorâneo');
  const [totalArea, setTotalArea] = useState('180');
  const [budgetTotal, setBudgetTotal] = useState('550000');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: name.trim(),
      code: code.trim(),
      location: location.trim(),
      type,
      totalArea: parseFloat(totalArea) || 150,
      progress: 5,
      status: 'Em Planejamento',
      budgetTotal: parseFloat(budgetTotal) || 400000,
      spentSoFar: 0,
      centerCoords: {
        lat: -27.1284 + (Math.random() - 0.5) * 0.05,
        lng: -48.5912 + (Math.random() - 0.5) * 0.05,
        radiusMeters: 30
      },
      activeWorkersCount: 0
    };

    onAddProject(newProj);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-[#e5e5e2] rounded-2xl max-w-md w-full p-6 text-xs text-[#242220] shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ededeb] pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#f0f9ff] border border-[#bae6fd] flex items-center justify-center text-[#0284c7]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#121110]">Cadastrar Nova Obra</h3>
              <p className="text-[10px] text-[#716e68]">Gerenciamento de canteiro do Grupo Vitti</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#f4f4f2] rounded text-[#716e68]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-mono text-[#55524e] font-semibold block mb-1">Nome do Empreendimento / Obra:</label>
            <input
              type="text"
              required
              placeholder="Ex: Residencial Mar Azul - Lote 08"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f8f8f6] border border-[#dcdcd8] focus:border-[#121110] focus:bg-white rounded-lg px-3 py-2 text-[#121110] text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-[#55524e] font-semibold block mb-1">Código Interno:</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#f8f8f6] border border-[#dcdcd8] focus:border-[#121110] focus:bg-white rounded-lg px-3 py-2 text-[#121110] font-mono text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-[#55524e] font-semibold block mb-1">Tipologia:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-[#f8f8f6] border border-[#dcdcd8] focus:border-[#121110] focus:bg-white rounded-lg px-3 py-2 text-[#121110] text-xs focus:outline-none"
              >
                <option value="Litorâneo">Litorâneo</option>
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
                <option value="Misto">Misto</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#55524e] font-semibold block mb-1">Localização (Cidade / Estado):</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#f8f8f6] border border-[#dcdcd8] focus:border-[#121110] focus:bg-white rounded-lg px-3 py-2 text-[#121110] text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-[#55524e] font-semibold block mb-1">Área Total (m²):</label>
              <input
                type="number"
                value={totalArea}
                onChange={(e) => setTotalArea(e.target.value)}
                className="w-full bg-[#f8f8f6] border border-[#dcdcd8] focus:border-[#121110] focus:bg-white rounded-lg px-3 py-2 text-[#121110] font-mono text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-[#55524e] font-semibold block mb-1">Orçamento Previsto (R$):</label>
              <input
                type="number"
                value={budgetTotal}
                onChange={(e) => setBudgetTotal(e.target.value)}
                className="w-full bg-[#f8f8f6] border border-[#dcdcd8] focus:border-[#121110] focus:bg-white rounded-lg px-3 py-2 text-[#121110] font-mono text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#ededeb] flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-[#f4f4f2] hover:bg-[#ededeb] border border-[#dededb] rounded-md text-[11px] font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#121110] hover:bg-black text-white font-semibold rounded-md text-[11px] transition shadow-xs"
            >
              Criar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
