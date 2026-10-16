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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#100f0d] border border-[#2b2721] rounded-2xl max-w-md w-full p-6 text-xs text-[#ddd9d0] shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#23201b] pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#201c10] border border-[#44381e] flex items-center justify-center text-[#d4a359]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-white">Cadastrar Nova Obra</h3>
              <p className="text-[10px] text-[#7a766e]">Gerenciamento de canteiro do Grupo Vitti</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#1a1917] rounded text-[#827e75]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-mono text-[#8a857b] block mb-1">Nome do Empreendimento / Obra:</label>
            <input
              type="text"
              required
              placeholder="Ex: Residencial Mar Azul - Lote 08"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#141311] border border-[#2e2a24] focus:border-[#c59b27] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-[#8a857b] block mb-1">Código Interno:</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#141311] border border-[#2e2a24] focus:border-[#c59b27] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-[#8a857b] block mb-1">Tipologia:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-[#141311] border border-[#2e2a24] focus:border-[#c59b27] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
              >
                <option value="Litorâneo">Litorâneo</option>
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
                <option value="Misto">Misto</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#8a857b] block mb-1">Localização (Cidade / Estado):</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#141311] border border-[#2e2a24] focus:border-[#c59b27] rounded-lg px-3 py-2 text-white text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-[#8a857b] block mb-1">Área Total (m²):</label>
              <input
                type="number"
                value={totalArea}
                onChange={(e) => setTotalArea(e.target.value)}
                className="w-full bg-[#141311] border border-[#2e2a24] focus:border-[#c59b27] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-[#8a857b] block mb-1">Orçamento Previsto (R$):</label>
              <input
                type="number"
                value={budgetTotal}
                onChange={(e) => setBudgetTotal(e.target.value)}
                className="w-full bg-[#141311] border border-[#2e2a24] focus:border-[#c59b27] rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#23201b] flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-[#181613] hover:bg-[#201e1a] border border-[#2e2a24] rounded-md text-[11px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#c59b27] hover:bg-[#d4a359] text-black font-semibold rounded-md text-[11px] transition shadow-lg shadow-[#c59b27]/20"
            >
              Criar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
