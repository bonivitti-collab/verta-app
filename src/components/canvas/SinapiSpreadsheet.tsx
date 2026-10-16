import React, { useState } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  Search 
} from 'lucide-react';
import type { SinapiItem } from '../../types';

interface SinapiSpreadsheetProps {
  items: SinapiItem[];
  onUpdateItems: (items: SinapiItem[]) => void;
  totalArea: number;
}

export const SinapiSpreadsheet: React.FC<SinapiSpreadsheetProps> = ({
  items,
  onUpdateItems,
  totalArea
}) => {
  const [bdiRate, setBdiRate] = useState<number>(22.5); // %
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');

  // Handle cell edit
  const handleCellChange = (id: string, field: 'quantity' | 'unitPrice', val: number) => {
    const updated = items.map(item => {
      if (item.id === id) {
        const qty = field === 'quantity' ? val : item.quantity;
        const price = field === 'unitPrice' ? val : item.unitPrice;
        return {
          ...item,
          [field]: val,
          total: Number((qty * price).toFixed(2))
        };
      }
      return item;
    });
    onUpdateItems(updated);
  };

  // Calculations
  const directCost = items.reduce((acc, curr) => acc + curr.total, 0);
  const bdiValue = directCost * (bdiRate / 100);
  const totalBudget = directCost + bdiValue;
  const costPerSquareMeter = totalArea > 0 ? directCost / totalArea : 0;
  const pricePerSquareMeter = totalArea > 0 ? totalBudget / totalArea : 0;

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.code.includes(searchTerm);
    const matchesStage = selectedStage === 'all' || item.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const stages = ['all', 'Estrutura', 'Fundações', 'Alvenaria', 'Acabamento', 'Instalações'];

  const exportCsv = () => {
    const headers = ['Código SINAPI', 'Etapa', 'Descrição do Serviço', 'Unid', 'Quantidade', 'Preço Unitário (R$)', 'Total (R$)', 'Curva ABC'];
    const rows = items.map(it => [
      it.code,
      it.stage,
      `"${it.description.replace(/"/g, '""')}"`,
      it.unit,
      it.quantity.toString().replace('.', ','),
      it.unitPrice.toFixed(2).replace('.', ','),
      it.total.toFixed(2).replace('.', ','),
      it.abcCurve
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'orcamento_sinapi_verta.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-full flex flex-col bg-[#090908] text-xs select-none overflow-hidden">
      {/* Top Telemetry & BDI Control Bar */}
      <div className="bg-[#100f0d] border-b border-[#22201e] p-3 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-4 h-4 text-[#d4a359]" />
            <span className="font-heading font-semibold text-white">Planilha Orçamentária SINAPI / CotaCasa</span>
            <span className="text-[10px] font-mono text-[#8b753b] bg-[#1e190e] px-1.5 py-0.5 rounded border border-[#3b2f15]">
              Base 02/2026 Não-Desonerado
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={exportCsv}
              className="px-2.5 py-1 bg-[#1a1711] hover:bg-[#252016] border border-[#3f341d] text-[#e0b44a] text-[11px] font-medium rounded flex items-center space-x-1.5 transition"
            >
              <Download className="w-3 h-3" />
              <span>Exportar Excel (CSV)</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
          <div className="bg-[#141311] border border-[#26231f] p-2 rounded">
            <div className="text-[#78746c] text-[10px]">Custo Direto:</div>
            <div className="font-bold text-white text-xs">
              R$ {directCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[9px] text-[#8e897f]">R$ {costPerSquareMeter.toFixed(2)}/m²</div>
          </div>

          <div className="bg-[#141311] border border-[#26231f] p-2 rounded flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#78746c] text-[10px]">
              <span>Taxa BDI:</span>
              <span className="text-[#d4a359] font-bold">{bdiRate}%</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="30" 
              step="0.5"
              value={bdiRate}
              onChange={(e) => setBdiRate(parseFloat(e.target.value))}
              className="w-full h-1 bg-[#252119] rounded-lg appearance-none cursor-pointer accent-[#c59b27]"
            />
            <div className="text-[9px] text-[#8e897f]">R$ {bdiValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>

          <div className="bg-[#191611] border border-[#44381e] p-2 rounded">
            <div className="text-[#c59b27] text-[10px] font-semibold">Preço Total Sugerido:</div>
            <div className="font-bold text-[#f5c35b] text-xs">
              R$ {totalBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[9px] text-[#a19888]">R$ {pricePerSquareMeter.toFixed(2)}/m² de venda</div>
          </div>

          <div className="bg-[#141311] border border-[#26231f] p-2 rounded">
            <div className="text-[#78746c] text-[10px]">Curva ABC (Item A):</div>
            <div className="font-bold text-[#ef4444] text-xs">3 Itens Críticos</div>
            <div className="text-[9px] text-[#8e897f]">68.3% do valor da etapa</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="h-10 bg-[#0e0d0b] border-b border-[#201e1b] px-3 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-[#6c675f]" />
          <input
            type="text"
            placeholder="Filtrar por código SINAPI ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-[#58544d] focus:outline-none font-mono"
          />
        </div>

        {/* Stage Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto text-[10px] font-mono no-scrollbar">
          {stages.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStage(st)}
              className={`px-2 py-0.5 rounded capitalize transition ${
                selectedStage === st 
                  ? 'bg-[#292212] text-[#d4a359] border border-[#4d3c1c]' 
                  : 'text-[#7d7971] hover:text-white'
              }`}
            >
              {st === 'all' ? 'Todas as Etapas' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Excel-like Spreadsheet Grid */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse font-mono text-[11px] text-left">
          <thead className="sticky top-0 bg-[#12110f] border-b border-[#26231f] text-[#8c877d] text-[10px] uppercase">
            <tr>
              <th className="py-2 px-3 border-r border-[#201e1b] w-20">Código</th>
              <th className="py-2 px-3 border-r border-[#201e1b] w-24">Etapa</th>
              <th className="py-2 px-3 border-r border-[#201e1b]">Descrição do Serviço</th>
              <th className="py-2 px-2 border-r border-[#201e1b] w-14 text-center">Unid</th>
              <th className="py-2 px-3 border-r border-[#201e1b] w-24 text-right">Qtd</th>
              <th className="py-2 px-3 border-r border-[#201e1b] w-28 text-right">Unitário (R$)</th>
              <th className="py-2 px-3 border-r border-[#201e1b] w-28 text-right">Total (R$)</th>
              <th className="py-2 px-2 w-16 text-center">ABC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1c1a17]">
            {filteredItems.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-[#161411] transition group"
              >
                {/* SINAPI Code */}
                <td className="py-2 px-3 border-r border-[#1c1a17] text-[#c59b27] font-semibold">
                  {item.code}
                </td>

                {/* Stage */}
                <td className="py-2 px-3 border-r border-[#1c1a17] text-[#8c8880]">
                  {item.stage}
                </td>

                {/* Description */}
                <td className="py-2 px-3 border-r border-[#1c1a17] font-sans text-xs text-[#ddd9d0]">
                  {item.description}
                </td>

                {/* Unit */}
                <td className="py-2 px-2 border-r border-[#1c1a17] text-center text-[#7e7a72]">
                  {item.unit}
                </td>

                {/* Quantity (Editable) */}
                <td className="py-1 px-1 border-r border-[#1c1a17] text-right">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleCellChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#131210] group-hover:bg-[#1b1916] text-right font-mono text-white px-2 py-1 rounded border border-transparent focus:border-[#c59b27] focus:outline-none"
                  />
                </td>

                {/* Unit Price (Editable) */}
                <td className="py-1 px-1 border-r border-[#1c1a17] text-right">
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleCellChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#131210] group-hover:bg-[#1b1916] text-right font-mono text-white px-2 py-1 rounded border border-transparent focus:border-[#c59b27] focus:outline-none"
                  />
                </td>

                {/* Total */}
                <td className="py-2 px-3 border-r border-[#1c1a17] text-right font-bold text-[#e6b955]">
                  {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>

                {/* Curva ABC Badge */}
                <td className="py-2 px-2 text-center">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    item.abcCurve === 'A' 
                      ? 'bg-red-950/70 text-red-400 border border-red-800/60' 
                      : item.abcCurve === 'B' 
                      ? 'bg-amber-950/70 text-amber-400 border border-amber-800/60' 
                      : 'bg-[#1c1b18] text-[#7d7971] border border-[#2b2824]'
                  }`}>
                    {item.abcCurve}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Spreadsheet Bottom Status Bar */}
      <div className="h-7 bg-[#0b0b0a] border-t border-[#1e1c19] px-3 flex items-center justify-between text-[10px] font-mono text-[#6c675f]">
        <span>{filteredItems.length} composições calculadas • Edição em tempo real</span>
        <span className="text-[#c59b27]">Integração CotaCasa Ativa</span>
      </div>
    </div>
  );
};
