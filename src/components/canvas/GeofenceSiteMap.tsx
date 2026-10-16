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
    <div className="h-full flex flex-col bg-[#f8fafc] text-xs select-none overflow-hidden">
      {/* Top Bar */}
      <div className="h-10 bg-white border-b border-[#e5e5e2] px-3 flex items-center justify-between text-xs shadow-2xs shrink-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-2 shrink-0 mr-2">
          <MapPinned className="w-4 h-4 text-[#0284c7]" />
          <span className="font-heading font-semibold text-[#121110] whitespace-nowrap">Verta Ponto GPS</span>
          <span className="text-[10px] font-mono text-[#0284c7] bg-[#f0f9ff] px-1.5 py-0.5 rounded border border-[#bae6fd] font-medium whitespace-nowrap">
            Raio 30m • Portaria 671 MTE
          </span>
        </div>

        <div className="flex items-center space-x-2 font-mono text-[11px]">
          <span className="text-[#16a34a] flex items-center space-x-1 font-medium">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
            <span>{validWorkersCount} Válidos</span>
          </span>
          {outOfBoundsCount > 0 && (
            <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 flex items-center space-x-1 font-medium">
              <AlertTriangle className="w-3 h-3 text-red-600" />
              <span>{outOfBoundsCount} Fora do Lote</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Simulated GPS Radar Map (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="bg-white border border-[#e5e5e2] rounded-xl p-4 flex-1 flex flex-col shadow-xs">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="font-semibold text-[#121110] flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Radar Geofencing do Lote 14B</span>
                </div>
                <div className="text-[10px] font-mono text-[#716e68]">
                  Lat: {project.centerCoords.lat.toFixed(4)}, Lng: {project.centerCoords.lng.toFixed(4)}
                </div>
              </div>
              <div className="text-[10px] font-mono text-[#55524e] bg-[#f7f7f5] px-2 py-1 rounded border border-[#e0e0dc]">
                Tolerância GPS: ± 3 metros
              </div>
            </div>

            {/* Radar Canvas Graphic */}
            <div className="relative flex-1 min-h-[300px] bg-[#f8fafc] border border-[#cbd5e1] rounded-lg overflow-hidden flex items-center justify-center">
              {/* Radar Grid Circles */}
              <div className="absolute w-64 h-64 border border-[#e2e8f0] rounded-full pointer-events-none" />
              <div className="absolute w-44 h-44 border border-[#cbd5e1] rounded-full pointer-events-none" />
              <div className="absolute w-24 h-24 border border-[#94a3b8] rounded-full pointer-events-none" />

              {/* Geofence Perimeter Circle (30m boundary) */}
              <div className="absolute w-52 h-52 border-2 border-dashed border-[#0284c7] bg-[#0284c7]/5 rounded-full flex items-center justify-center">
                <span className="absolute -top-3 bg-white px-1.5 text-[9px] font-mono text-[#0284c7] border border-[#bae6fd] rounded font-semibold shadow-2xs">
                  Cerca Virtual (Raio 30m)
                </span>
              </div>

              {/* Construction Site Center Icon */}
              <div className="z-10 bg-[#121110] text-white font-bold p-1 rounded-full shadow-md">
                <HardHat className="w-4 h-4 text-[#38bdf8]" />
              </div>

              {/* Render Workers on Radar */}
              {workers.map((worker) => {
                const isValid = worker.status === 'valid';
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
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-red-600 text-white animate-bounce shadow-md'
                    }`}
                    title={`${worker.name} (${worker.trade}) - ${worker.distanceMeters}m`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" />
                    {/* Tooltip */}
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-[#121110] text-white text-[9px] font-mono px-2 py-1 rounded whitespace-nowrap z-30 shadow-xl">
                      {worker.name} • {worker.distanceMeters}m
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Worker Info banner */}
            {selectedWorker && (
              <div className="mt-3 bg-[#f7f7f5] border border-[#e5e5e2] p-2.5 rounded-lg flex items-center justify-between text-[11px] font-mono shadow-2xs">
                <div>
                  <div className="font-bold text-[#121110]">{selectedWorker.name} ({selectedWorker.trade})</div>
                  <div className="text-[#716e68]">Ponto batido às {selectedWorker.checkInTime} • {selectedWorker.distanceMeters}m do centro</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  selectedWorker.status === 'valid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
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
          <div className="bg-white border border-[#e5e5e2] rounded-xl p-3 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#121110] flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Registro Diário de Operários</span>
              </span>
              <span className="text-[10px] font-mono text-[#716e68] font-medium">{workers.length} Registros</span>
            </div>

            <div className="space-y-1 max-h-48 overflow-y-auto">
              {workers.map((w) => (
                <div 
                  key={w.id}
                  onClick={() => setSelectedWorker(w)}
                  className={`p-2 rounded cursor-pointer transition flex items-center justify-between font-mono text-[11px] ${
                    selectedWorker?.id === w.id 
                      ? 'bg-[#f0f9ff] border border-[#bae6fd]' 
                      : 'bg-[#fafaf9] hover:bg-[#f0f0ed] border border-transparent'
                  }`}
                >
                  <div>
                    <div className="text-[#121110] font-sans font-semibold text-xs">{w.name}</div>
                    <div className="text-[#716e68] text-[10px]">{w.trade} • {w.checkInTime}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      w.status === 'valid' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {w.distanceMeters}m
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Material Intake Audit Card */}
          <div className="bg-white border border-[#e5e5e2] rounded-xl p-3 space-y-2.5 flex-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#121110] flex items-center space-x-1.5">
                <Package className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Auditoria Inteligente de Insumos</span>
              </span>
              <span className="text-[9px] font-mono text-[#0284c7] bg-[#f0f9ff] px-1.5 py-0.5 rounded border border-[#bae6fd] font-semibold">
                IA de Pesagem
              </span>
            </div>

            <div className="text-[10px] text-[#716e68]">
              Confronto do consumo teórico da etapa com notas fiscais e registro fotográfico.
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              {materials.map((m) => {
                const isCritical = m.status === 'critical';
                return (
                  <div key={m.id} className="bg-[#fafaf9] border border-[#e5e5e2] p-2.5 rounded space-y-1 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#121110] font-sans text-xs font-semibold">{m.material}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        isCritical ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {m.variancePercentage > 0 ? `+${m.variancePercentage}%` : `${m.variancePercentage}%`}
                      </span>
                    </div>

                    <div className="flex justify-between text-[10px] text-[#716e68]">
                      <span>Teórico: {m.theoreticalConsumption} {m.unit}</span>
                      <span>Recebido: {m.physicalReceipt} {m.unit}</span>
                    </div>

                    {isCritical && (
                      <div className="text-[9px] text-red-700 bg-red-50 p-1.5 rounded border border-red-200 font-medium">
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
