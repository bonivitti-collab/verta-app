import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  AlertTriangle, 
  HardHat, 
  Package, 
  MapPinned 
} from 'lucide-react';
import type { WorkerPresence, MaterialAudit, Project } from '../../types';

interface GeofenceSiteMapProps {
  workers: WorkerPresence[];
  materials: MaterialAudit[];
  project: Project;
}

export const GeofenceSiteMap: React.FC<GeofenceSiteMapProps> = ({
  workers,
  materials,
  project
}) => {
  const [selectedWorker, setSelectedWorker] = useState<WorkerPresence | null>(null);

  const validWorkersCount = workers.filter(w => w.status === 'valid').length;
  const outOfBoundsCount = workers.filter(w => w.status === 'out_of_bounds').length;

  return (
    <div className="h-full flex flex-col bg-[#090908] text-xs select-none overflow-hidden">
      {/* Top Bar */}
      <div className="h-10 bg-[#0e0d0b] border-b border-[#22201e] px-4 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <MapPinned className="w-4 h-4 text-[#d4a359]" />
          <span className="font-heading font-semibold text-white">Verta Ponto GPS & Auditoria de Insumos</span>
          <span className="text-[10px] font-mono text-[#8b753a] bg-[#1d170c] px-1.5 py-0.5 rounded border border-[#3b2d13]">
            Cerca Virtual Raio 30m • Portaria 671 MTE
          </span>
        </div>

        <div className="flex items-center space-x-2 font-mono text-[11px]">
          <span className="text-[#22c55e] flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span>{validWorkersCount} Válidos</span>
          </span>
          {outOfBoundsCount > 0 && (
            <span className="text-[#ef4444] bg-red-950/50 px-2 py-0.5 rounded border border-red-800/60 flex items-center space-x-1">
              <AlertTriangle className="w-3 h-3 text-[#ef4444]" />
              <span>{outOfBoundsCount} Fora do Lote</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Simulated GPS Radar Map (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="bg-[#100f0d] border border-[#23201c] rounded-xl p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="font-semibold text-white flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>Radar Geofencing do Lote 14B</span>
                </div>
                <div className="text-[10px] font-mono text-[#78746c]">
                  Lat: {project.centerCoords.lat.toFixed(4)}, Lng: {project.centerCoords.lng.toFixed(4)}
                </div>
              </div>
              <div className="text-[10px] font-mono text-[#8e8a81] bg-[#181613] px-2 py-1 rounded border border-[#2b2721]">
                Tolerância GPS: ± 3 metros
              </div>
            </div>

            {/* Radar Canvas Graphic */}
            <div className="relative flex-1 min-h-[300px] bg-[#0c0d10] border border-[#1c222d] rounded-lg overflow-hidden flex items-center justify-center">
              {/* Radar Grid Circles */}
              <div className="absolute w-64 h-64 border border-[#1e293b] rounded-full pointer-events-none" />
              <div className="absolute w-44 h-44 border border-[#233550] rounded-full pointer-events-none" />
              <div className="absolute w-24 h-24 border border-[#334e75] rounded-full pointer-events-none" />

              {/* Geofence Perimeter Circle (30m boundary) */}
              <div className="absolute w-52 h-52 border-2 border-dashed border-[#c59b27] bg-[#c59b27]/5 rounded-full flex items-center justify-center">
                <span className="absolute -top-3 bg-[#0a0a09] px-1.5 text-[9px] font-mono text-[#d4a359] border border-[#4d3c1a] rounded">
                  Cerca Virtual (Raio 30m)
                </span>
              </div>

              {/* Construction Site Center Icon */}
              <div className="z-10 bg-[#c59b27] text-black font-bold p-1 rounded-full shadow-lg shadow-[#c59b27]/30">
                <HardHat className="w-4 h-4" />
              </div>

              {/* Render Workers on Radar */}
              {workers.map((worker) => {
                const isValid = worker.status === 'valid';
                // Simulated radial positions
                const angle = (parseInt(worker.id.replace('w-', '')) * 45) * (Math.PI / 180);
                const distanceFactor = isValid ? 50 + (worker.distanceMeters * 1.5) : 130;
                const x = Math.cos(angle) * distanceFactor;
                const y = Math.sin(angle) * distanceFactor;

                return (
                  <button
                    key={worker.id}
                    onClick={() => setSelectedWorker(worker)}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className={`absolute z-20 group p-1 rounded-full transition-transform hover:scale-125 ${
                      isValid 
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30' 
                        : 'bg-red-500 text-white animate-bounce shadow-lg shadow-red-500/40'
                    }`}
                    title={`${worker.name} (${worker.trade}) - ${worker.distanceMeters}m`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" />
                    {/* Tooltip */}
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-[#12110f] border border-[#302c25] text-white text-[9px] font-mono px-2 py-1 rounded whitespace-nowrap z-30 shadow-xl">
                      {worker.name} • {worker.distanceMeters}m
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Worker Info banner */}
            {selectedWorker && (
              <div className="mt-3 bg-[#181613] border border-[#3b3425] p-2.5 rounded-lg flex items-center justify-between text-[11px] font-mono">
                <div>
                  <div className="font-bold text-white">{selectedWorker.name} ({selectedWorker.trade})</div>
                  <div className="text-[#8e897f]">Ponto batido às {selectedWorker.checkInTime} • {selectedWorker.distanceMeters}m do centro</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  selectedWorker.status === 'valid' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                }`}>
                  {selectedWorker.status === 'valid' ? 'DENTRO DA CERCA' : 'PONTO BLOQUEADO (FORA)'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Workers List & Material Inflow Audit (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col">
          {/* Workers Presence List */}
          <div className="bg-[#100f0d] border border-[#23201c] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Registro Diário de Operários</span>
              </span>
              <span className="text-[10px] font-mono text-[#827e75]">{workers.length} Registros</span>
            </div>

            <div className="space-y-1 max-h-48 overflow-y-auto">
              {workers.map((w) => (
                <div 
                  key={w.id}
                  onClick={() => setSelectedWorker(w)}
                  className={`p-2 rounded cursor-pointer transition flex items-center justify-between font-mono text-[11px] ${
                    selectedWorker?.id === w.id 
                      ? 'bg-[#221c0e] border border-[#4a3916]' 
                      : 'bg-[#141311] hover:bg-[#1a1815] border border-transparent'
                  }`}
                >
                  <div>
                    <div className="text-[#e2ded6] font-sans font-medium text-xs">{w.name}</div>
                    <div className="text-[#7c776f] text-[10px]">{w.trade} • {w.checkInTime}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      w.status === 'valid' 
                        ? 'bg-emerald-950/60 text-emerald-400' 
                        : 'bg-red-950/80 text-red-400 border border-red-800'
                    }`}>
                      {w.distanceMeters}m
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Material Intake Audit Card */}
          <div className="bg-[#100f0d] border border-[#23201c] rounded-xl p-3 space-y-2.5 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center space-x-1.5">
                <Package className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>Auditoria Inteligente de Insumos</span>
              </span>
              <span className="text-[9px] font-mono text-[#c59b27] bg-[#221c0e] px-1.5 py-0.5 rounded border border-[#3e3215]">
                IA de Pesagem
              </span>
            </div>

            <div className="text-[10px] text-[#7a766e]">
              Confronto do consumo teórico da etapa com notas fiscais e registro fotográfico.
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              {materials.map((m) => {
                const isCritical = m.status === 'critical';
                return (
                  <div key={m.id} className="bg-[#141311] border border-[#23201c] p-2 rounded space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-sans text-xs font-medium">{m.material}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        isCritical ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-emerald-950 text-emerald-400'
                      }`}>
                        {m.variancePercentage > 0 ? `+${m.variancePercentage}%` : `${m.variancePercentage}%`}
                      </span>
                    </div>

                    <div className="flex justify-between text-[10px] text-[#8c887f]">
                      <span>Teórico: {m.theoreticalConsumption} {m.unit}</span>
                      <span>Recebido: {m.physicalReceipt} {m.unit}</span>
                    </div>

                    {isCritical && (
                      <div className="text-[9px] text-red-400 bg-red-950/30 p-1 rounded border border-red-900/40">
                        Alerta: Desvio negativo detectado! Risco de subdimensionamento ou desvio.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
