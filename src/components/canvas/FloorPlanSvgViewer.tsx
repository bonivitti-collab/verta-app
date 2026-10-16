import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Sun, 
  Ruler 
} from 'lucide-react';

export const FloorPlanSvgViewer: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showSolarPath, setShowSolarPath] = useState(true);
  const [showLabels] = useState(true);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 2.0));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.6));
  const handleReset = () => setZoom(1);

  const handleExportSvg = () => {
    const svgElement = document.getElementById('verta-floorplan-svg');
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'verta_planta_baixa_124m2.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-[#080807] overflow-hidden select-none">
      {/* Canvas Toolbar */}
      <div className="h-10 bg-[#0f0e0c] border-b border-[#22201e] px-4 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-heading font-semibold text-white">Planta Baixa Arquitetônica 2D</span>
          <span className="text-[10px] font-mono text-[#c59b27] bg-[#211a0c] px-1.5 py-0.5 rounded border border-[#3e3215]">
            124.50 m² • NBR 15575
          </span>
        </div>

        {/* Action controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setShowSolarPath(!showSolarPath)}
            className={`px-2 py-1 rounded text-[11px] font-mono flex items-center space-x-1 transition ${
              showSolarPath ? 'bg-[#2b2210] text-[#e0b44a] border border-[#52401c]' : 'bg-[#151412] text-[#7d7971] border border-[#262420]'
            }`}
            title="Alternar Trajetória Solar e Brisa Marinha"
          >
            <Sun className="w-3 h-3 text-[#eab308]" />
            <span className="hidden sm:inline">Carta Solar</span>
          </button>

          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`px-2 py-1 rounded text-[11px] font-mono flex items-center space-x-1 transition ${
              showDimensions ? 'bg-[#2b2210] text-[#e0b44a] border border-[#52401c]' : 'bg-[#151412] text-[#7d7971] border border-[#262420]'
            }`}
            title="Alternar Cotas em Metros"
          >
            <Ruler className="w-3 h-3 text-[#38bdf8]" />
            <span className="hidden sm:inline">Cotas</span>
          </button>

          <div className="h-4 w-px bg-[#262422]" />

          <button onClick={handleZoomOut} className="p-1.5 bg-[#141311] hover:bg-[#1c1a17] text-[#9c978e] hover:text-white rounded border border-[#262420] transition">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-[#8a857b] px-1">{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} className="p-1.5 bg-[#141311] hover:bg-[#1c1a17] text-[#9c978e] hover:text-white rounded border border-[#262420] transition">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button onClick={handleReset} className="p-1.5 bg-[#141311] hover:bg-[#1c1a17] text-[#9c978e] hover:text-white rounded border border-[#262420] transition" title="Redefinir Zoom">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleExportSvg}
            className="ml-2 px-2.5 py-1 bg-[#1a1711] hover:bg-[#252016] border border-[#443820] text-[#d4a359] text-[11px] font-medium rounded flex items-center space-x-1.5 transition"
          >
            <Download className="w-3 h-3" />
            <span>Exportar SVG</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="flex-1 canvas-blueprint relative overflow-auto flex items-center justify-center p-6">
        <div 
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.15s ease-out' }}
          className="shadow-2xl shadow-black/80 rounded-lg overflow-hidden border border-[#1e2a3a]"
        >
          <svg
            id="verta-floorplan-svg"
            width="820"
            height="580"
            viewBox="0 0 820 580"
            className="bg-[#0b0f17]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Wall Hatch Pattern */}
              <pattern id="wall-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#334155" strokeWidth="1.2" />
              </pattern>
              {/* Floor Wood Texture Pattern */}
              <pattern id="floor-tile" width="24" height="24" patternUnits="userSpaceOnUse">
                <rect width="24" height="24" fill="#0d1420" stroke="#162338" strokeWidth="0.5" />
              </pattern>
              {/* Wet Area Tile Pattern */}
              <pattern id="bwc-tile" width="12" height="12" patternUnits="userSpaceOnUse">
                <rect width="12" height="12" fill="#0f1929" stroke="#1b2e4b" strokeWidth="0.5" />
              </pattern>
            </defs>

            {/* Background Grid & Outer Boundary */}
            <rect x="40" y="40" width="740" height="500" fill="url(#floor-tile)" rx="4" />

            {/* Room fills */}
            {/* Living & Cozinha Integrada */}
            <rect x="60" y="60" width="360" height="260" fill="#0f172a" opacity="0.6" />
            {/* Varanda Gourmet */}
            <rect x="60" y="320" width="360" height="200" fill="#131e33" opacity="0.7" />
            {/* Suíte Master */}
            <rect x="420" y="60" width="340" height="220" fill="#0f1926" opacity="0.8" />
            {/* BWC Suíte */}
            <rect x="620" y="60" width="140" height="120" fill="url(#bwc-tile)" />
            {/* Dormitório 01 */}
            <rect x="420" y="280" width="180" height="140" fill="#0f172a" opacity="0.6" />
            {/* Dormitório 02 */}
            <rect x="600" y="280" width="160" height="140" fill="#0f172a" opacity="0.6" />
            {/* BWC Social */}
            <rect x="520" y="420" width="120" height="100" fill="url(#bwc-tile)" />
            {/* Circulação / Hall íntimo */}
            <rect x="420" y="420" width="100" height="100" fill="#0c1322" />

            {/* External Walls (Double line with hatch) */}
            {/* Outer Box */}
            <rect x="50" y="50" width="720" height="480" fill="none" stroke="#64748b" strokeWidth="14" />
            <rect x="50" y="50" width="720" height="480" fill="none" stroke="#94a3b8" strokeWidth="1" />

            {/* Internal Dividing Walls (12px) */}
            {/* Living / Intimate Zone divider */}
            <line x1="420" y1="50" x2="420" y2="530" stroke="#64748b" strokeWidth="12" />
            {/* Suíte Master bottom wall */}
            <line x1="420" y1="280" x2="770" y2="280" stroke="#64748b" strokeWidth="10" />
            {/* Bedroom 1 and 2 divider */}
            <line x1="600" y1="280" x2="600" y2="420" stroke="#64748b" strokeWidth="10" />
            {/* Living / Gourmet divider with large glass opening */}
            <line x1="50" y1="320" x2="420" y2="320" stroke="#64748b" strokeWidth="12" />
            {/* BWC Suíte divider */}
            <line x1="620" y1="50" x2="620" y2="180" stroke="#64748b" strokeWidth="10" />
            <line x1="620" y1="180" x2="770" y2="180" stroke="#64748b" strokeWidth="10" />
            {/* Lower corridor walls */}
            <line x1="420" y1="420" x2="770" y2="420" stroke="#64748b" strokeWidth="10" />
            <line x1="520" y1="420" x2="520" y2="530" stroke="#64748b" strokeWidth="10" />
            <line x1="640" y1="420" x2="640" y2="530" stroke="#64748b" strokeWidth="10" />

            {/* Windows (Blue double lines) */}
            {/* Suíte Window (East) */}
            <rect x="764" y="90" width="12" height="80" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            {/* Dorm 1 Window (East) */}
            <rect x="764" y="310" width="12" height="70" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            {/* Living Front Window (North) */}
            <rect x="140" y="44" width="120" height="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
            {/* Gourmet Sliding Glass Door (Large span) */}
            <rect x="90" y="316" width="220" height="8" fill="#38bdf8" opacity="0.8" />

            {/* Door Swings */}
            {/* Entrance Door */}
            <path d="M 50 160 A 60 60 0 0 1 110 100" fill="none" stroke="#e0b44a" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="50" y1="160" x2="50" y2="100" stroke="#e0b44a" strokeWidth="2.5" />

            {/* Suíte Master Door */}
            <path d="M 426 120 A 45 45 0 0 1 471 165" fill="none" stroke="#e0b44a" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="426" y1="120" x2="471" y2="120" stroke="#e0b44a" strokeWidth="2.5" />

            {/* Dorm 1 Door */}
            <path d="M 426 340 A 45 45 0 0 1 471 385" fill="none" stroke="#e0b44a" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="426" y1="340" x2="471" y2="340" stroke="#e0b44a" strokeWidth="2.5" />

            {/* Room Labels and Area Tags */}
            {showLabels && (
              <g className="font-sans text-center">
                {/* Living */}
                <text x="210" y="170" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">LIVING & COZINHA GOURMET</text>
                <text x="210" y="188" fill="#d4a359" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">42.80 m² • Pé Direito 3.80m</text>

                {/* Varanda */}
                <text x="220" y="410" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">VARANDA GOURMET & DECK</text>
                <text x="220" y="428" fill="#d4a359" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">24.00 m² • Churrasqueira</text>

                {/* Suíte Master */}
                <text x="520" y="150" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">SUÍTE MASTER</text>
                <text x="520" y="168" fill="#d4a359" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">16.20 m² • Sol da Manhã</text>

                {/* BWC Suíte */}
                <text x="690" y="115" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">BWC SUÍTE</text>
                <text x="690" y="130" fill="#d4a359" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">4.50 m²</text>

                {/* Dormitório 01 */}
                <text x="510" y="340" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">DORMITÓRIO 01</text>
                <text x="510" y="356" fill="#d4a359" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">12.00 m²</text>

                {/* Dormitório 02 */}
                <text x="680" y="340" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">DORMITÓRIO 02</text>
                <text x="680" y="356" fill="#d4a359" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">11.50 m²</text>

                {/* BWC Social */}
                <text x="580" y="470" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">BWC SOCIAL</text>
                <text x="580" y="485" fill="#d4a359" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">3.80 m²</text>
              </g>
            )}

            {/* Dimension Lines (Cotas) */}
            {showDimensions && (
              <g stroke="#38bdf8" strokeWidth="1" opacity="0.8" className="font-mono text-[9px]">
                {/* Horizontal Top Full Span */}
                <line x1="50" y1="26" x2="770" y2="26" />
                <line x1="50" y1="20" x2="50" y2="32" />
                <line x1="770" y1="20" x2="770" y2="32" />
                <text x="410" y="22" fill="#38bdf8" textAnchor="middle">14.40 m (Comprimento Total)</text>

                {/* Vertical Left Full Span */}
                <line x1="26" y1="50" x2="26" y2="530" />
                <line x1="20" y1="50" x2="32" y2="50" />
                <line x1="20" y1="530" x2="32" y2="530" />
                <text x="22" y="295" fill="#38bdf8" textAnchor="middle" transform="rotate(-90 22 295)">9.60 m (Largura Total)</text>
              </g>
            )}

            {/* Solar Path & Wind Compass Rose (Top Right) */}
            {showSolarPath && (
              <g transform="translate(740, 80)">
                {/* Compass Circle */}
                <circle cx="0" cy="0" r="28" fill="#111827" stroke="#d4a359" strokeWidth="1" />
                {/* Cardinal Points */}
                <text x="0" y="-14" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">N</text>
                <text x="18" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">L</text>
                <text x="0" y="20" fill="#94a3b8" fontSize="9" textAnchor="middle">S</text>
                <text x="-18" y="4" fill="#94a3b8" fontSize="9" textAnchor="middle">O</text>
                
                {/* Sun Trajectory Arc */}
                <path d="M -22 10 A 24 24 0 0 1 22 10" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
                <circle cx="16" cy="-8" r="4" fill="#fbbf24" />

                {/* Coastal Wind Arrow (NE) */}
                <path d="M 18 -18 L 4 -4" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="0" y="38" fill="#38bdf8" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Vento NE (18 km/h)</text>
              </g>
            )}
          </svg>
        </div>

        {/* Floating Quick Legend */}
        <div className="absolute bottom-4 left-6 bg-[#0c0d10]/90 backdrop-blur border border-[#1e2a3a] px-3 py-2 rounded-lg text-[10px] font-mono text-[#94a3b8] flex items-center space-x-4 shadow-xl">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-[#64748b] rounded-sm" />
            <span>Alvenaria 15cm</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-[#0284c7] rounded-sm" />
            <span>Esquadrias Alumínio</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-[#e0b44a] rounded-sm" />
            <span>Portas Maciças</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-[#f59e0b] rounded-sm" />
            <span>Sol Leste (Quartos)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
