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
    <div className="h-full flex flex-col bg-white text-xs select-none overflow-hidden">
      {/* Top Telemetry & BDI Control Bar */}
      <div className="bg-[#fafaf9] border-b border-[#e5e5e2] p-3 space-y-2 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-4 h-4 text-[#0284c7]" />
            <span className="font-heading font-semibold text-[#121110]">Planilha Orçamentária SINAPI / CotaCasa</span>
            <span className="text-[10px] font-mono text-[#0284c7] bg-[#f0f9ff] px-1.5 py-0.5 rounded border border-[#bae6fd] font-medium">
              Base 02/2026 Não-Desonerado
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={exportCsv}
              className="px-2.5 py-1 bg-white hover:bg-[#f4f4f2] border border-[#dcdcd8] text-[#121110] text-[11px] font-medium rounded flex items-center space-x-1.5 transition shadow-2xs whitespace-nowrap"
            >
              <Download className="w-3 h-3 text-[#716e68]" />
              <span>Exportar Excel (CSV)</span>
            </button>
          </div>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
          <div className="bg-white border border-[#e5e5e2] p-2.5 rounded shadow-2xs">
            <div className="text-[#716e68] text-[10px] font-sans">Custo Direto:</div>
            <div className="font-bold text-[#121110] text-xs">
              R$ {directCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[9px] text-[#8c8882]">R$ {costPerSquareMeter.toFixed(2)}/m²</div>
          </div>

          <div className="bg-white border border-[#e5e5e2] p-2.5 rounded flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between text-[#716e68] text-[10px] font-sans">
              <span>Taxa BDI:</span>
              <span className="text-[#0284c7] font-bold font-mono">{bdiRate}%</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="30" 
              step="0.5"
              value={bdiRate}
              onChange={(e) => setBdiRate(parseFloat(e.target.value))}
              className="w-full h-1 bg-[#e5e5e2] rounded-lg appearance-none cursor-pointer accent-[#121110]"
            />
            <div className="text-[9px] text-[#8c8882]">R$ {bdiValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          </div>

          <div className="bg-[#f0f9ff] border border-[#bae6fd] p-2.5 rounded shadow-2xs">
            <div className="text-[#0284c7] text-[10px] font-semibold font-sans">Preço Total Sugerido:</div>
            <div className="font-bold text-[#0369a1] text-xs">
              R$ {totalBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[9px] text-[#0284c7]">R$ {pricePerSquareMeter.toFixed(2)}/m² de venda</div>
          </div>

          <div className="bg-white border border-[#e5e5e2] p-2.5 rounded shadow-2xs">
            <div className="text-[#716e68] text-[10px] font-sans">Curva ABC (Item A):</div>
            <div className="font-bold text-red-600 text-xs">3 Itens Críticos</div>
            <div className="text-[9px] text-[#8c8882]">68.3% do valor da etapa</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="h-10 bg-white border-b border-[#e5e5e2] px-3 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center space-x-2 flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-[#8c8882] shrink-0" />
          <input
            type="text"
            placeholder="Filtrar por código SINAPI ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-[#121110] placeholder-[#8c8882] focus:outline-none font-mono"
          />
        </div>

        {/* Stage Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto text-[10px] font-mono no-scrollbar shrink-0">
          {stages.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStage(st)}
              className={`px-2 py-0.5 rounded capitalize transition font-medium shrink-0 whitespace-nowrap ${
                selectedStage === st 
                  ? 'bg-[#121110] text-white' 
                  : 'text-[#716e68] hover:text-[#121110] hover:bg-[#f4f4f2]'
              }`}
            >
              {st === 'all' ? 'Todas as Etapas' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Excel-like Spreadsheet Grid */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full border-collapse font-mono text-[11px] text-left">
          <thead className="sticky top-0 bg-[#f4f4f2] border-b border-[#e5e5e2] text-[#55524e] text-[10px] uppercase font-semibold">
            <tr>
              <th className="py-2.5 px-3 border-r border-[#e5e5e2] w-20">Código</th>
              <th className="py-2.5 px-3 border-r border-[#e5e5e2] w-24">Etapa</th>
              <th className="py-2.5 px-3 border-r border-[#e5e5e2]">Descrição do Serviço</th>
              <th className="py-2.5 px-2 border-r border-[#e5e5e2] w-14 text-center">Unid</th>
              <th className="py-2.5 px-3 border-r border-[#e5e5e2] w-24 text-right">Qtd</th>
              <th className="py-2.5 px-3 border-r border-[#e5e5e2] w-28 text-right">Unitário (R$)</th>
              <th className="py-2.5 px-3 border-r border-[#e5e5e2] w-28 text-right">Total (R$)</th>
              <th className="py-2.5 px-2 w-16 text-center">ABC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ededeb]">
            {filteredItems.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-[#fbfbf9] transition group"
              >
                {/* SINAPI Code */}
                <td className="py-2 px-3 border-r border-[#ededeb] text-[#0284c7] font-bold">
                  {item.code}
                </td>

                {/* Stage */}
                <td className="py-2 px-3 border-r border-[#ededeb] text-[#716e68]">
                  {item.stage}
                </td>

                {/* Description */}
                <td className="py-2 px-3 border-r border-[#ededeb] font-sans text-xs text-[#242220]">
                  {item.description}
                </td>

                {/* Unit */}
                <td className="py-2 px-2 border-r border-[#ededeb] text-center text-[#716e68]">
                  {item.unit}
                </td>

                {/* Quantity (Editable) */}
                <td className="py-1 px-1 border-r border-[#ededeb] text-right">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleCellChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#f7f7f5] group-hover:bg-white text-right font-mono text-[#121110] px-2 py-1 rounded border border-[#e5e5e2] focus:border-[#121110] focus:outline-none"
                  />
                </td>

                {/* Unit Price (Editable) */}
                <td className="py-1 px-1 border-r border-[#ededeb] text-right">
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleCellChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#f7f7f5] group-hover:bg-white text-right font-mono text-[#121110] px-2 py-1 rounded border border-[#e5e5e2] focus:border-[#121110] focus:outline-none"
                  />
                </td>

                {/* Total */}
                <td className="py-2 px-3 border-r border-[#ededeb] text-right font-bold text-[#121110]">
                  {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>

                {/* Curva ABC Badge */}
                <td className="py-2 px-2 text-center">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    item.abcCurve === 'A' 
                      ? 'bg-red-50 text-red-700 border border-red-200' 
                      : item.abcCurve === 'B' 
                      ? 'bg-sky-50 text-sky-700 border border-sky-200' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
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
      <div className="h-7 bg-[#fafaf9] border-t border-[#e5e5e2] px-3 flex items-center justify-between text-[10px] font-mono text-[#716e68]">
        <span>{filteredItems.length} composições calculadas • Edição em tempo real</span>
        <span className="text-[#0284c7] font-medium">Integração CotaCasa Ativa</span>
      </div>
    </div>
  );
};
