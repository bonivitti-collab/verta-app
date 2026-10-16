import React, { useState } from 'react';
import { 
  Printer, 
  ShieldCheck, 
  AlertTriangle, 
  Building, 
  FileCheck2, 
  QrCode, 
  ToggleLeft, 
  ToggleRight 
} from 'lucide-react';
import type { InspectionData } from '../../types';

interface InspectionReportA4Props {
  data: InspectionData;
  isFreeTier?: boolean;
}

export const InspectionReportA4: React.FC<InspectionReportA4Props> = ({
  data,
  isFreeTier = false,
}) => {
  const [showWatermark, setShowWatermark] = useState<boolean>(isFreeTier);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-full flex flex-col bg-[#f1f1ef] text-xs select-none overflow-hidden">
      {/* Report Controls Bar */}
      <div className="h-10 bg-white border-b border-[#e5e5e2] px-4 flex items-center justify-between text-xs shadow-2xs">
        <div className="flex items-center space-x-2">
          <FileCheck2 className="w-4 h-4 text-[#946f19]" />
          <span className="font-heading font-semibold text-[#121110]">Laudo Técnico Pericial A4</span>
          <span className="text-[10px] font-mono text-[#946f19] bg-[#fbf7ee] px-1.5 py-0.5 rounded border border-[#ebd8b2] font-medium">
            ABNT NBR 13752
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Watermark toggle (Freemium demonstration) */}
          <button
            onClick={() => setShowWatermark(!showWatermark)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition border ${
              showWatermark 
                ? 'bg-amber-50 text-amber-800 border-amber-300 font-medium' 
                : 'bg-white text-[#716e68] border-[#dededb]'
            }`}
          >
            {showWatermark ? <ToggleRight className="w-4 h-4 text-amber-600" /> : <ToggleLeft className="w-4 h-4 text-[#a8a49c]" />}
            <span>{showWatermark ? "Marca d'água: ATIVA (Plano Free)" : "Marca d'água: DESATIVADA (Pro)"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1 bg-[#121110] hover:bg-[#282624] text-white text-[11px] font-semibold rounded flex items-center space-x-1.5 transition shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Salvar PDF</span>
          </button>
        </div>
      </div>

      {/* A4 Sheet Container */}
      <div className="flex-1 overflow-auto p-6 flex justify-center bg-[#f1f1ef]">
        {/* Printable Sheet */}
        <div className="relative w-[794px] min-h-[1123px] bg-white text-[#111827] shadow-xl shadow-neutral-300/80 rounded-sm p-12 flex flex-col justify-between font-sans border border-[#e2e2df] print:border-none print:p-0 print:shadow-none print:w-full">
          {/* Watermark Overlay (if enabled) */}
          {showWatermark && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
              <div className="text-[72px] font-extrabold text-red-500/10 transform -rotate-45 select-none font-mono tracking-widest text-center border-4 border-red-500/15 p-10 rounded-2xl">
                VERTA FREE EDITION<br />
                <span className="text-2xl font-normal text-red-500/20">DOCUMENTO NÃO VÁLIDO EM JUÍZO</span>
              </div>
            </div>
          )}

          {/* Report Content */}
          <div className="space-y-6">
            {/* Header with Institutional Branding */}
            <div className="border-b-2 border-[#1e293b] pb-4 flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#0f172a] rounded flex items-center justify-center text-[#d4a359] shadow-xs">
                  <Building className="w-7 h-7 text-[#d4a359]" />
                </div>
                <div>
                  <h1 className="font-heading font-extrabold text-xl text-[#0f172a] tracking-tight">GRUPO VITTI</h1>
                  <p className="text-[10px] font-mono text-[#64748b]">SENTINEL SYSTEMS • ENGENHARIA DIAGNÓSTICA & PERÍCIAS</p>
                  <p className="text-[9px] text-[#94a3b8]">Rua das Palmeiras, 1420 - Itapema/SC | CREA/SC Registro 084.921</p>
                </div>
              </div>

              <div className="text-right font-mono text-[10px]">
                <div className="bg-[#f1f5f9] px-2 py-1 rounded text-[#0f172a] font-bold border border-[#cbd5e1]">
                  LAUDO Nº {data.reportNumber}
                </div>
                <div className="text-[#64748b] mt-1">Data: {data.inspectionDate}</div>
                <div className="text-[#16a34a] font-semibold flex items-center justify-end space-x-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-[#16a34a]" />
                  <span>ART Vinculada</span>
                </div>
              </div>
            </div>

            {/* General Identification Table */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-md p-3 text-[11px] grid grid-cols-2 gap-y-2 gap-x-4">
              <div>
                <span className="font-semibold text-[#475569]">Obra / Edificação:</span>
                <div className="text-[#0f172a] font-medium">{data.projectTitle}</div>
              </div>
              <div>
                <span className="font-semibold text-[#475569]">Local Específico da Vistoria:</span>
                <div className="text-[#0f172a] font-medium">{data.location}</div>
              </div>
              <div>
                <span className="font-semibold text-[#475569]">Responsável Técnico:</span>
                <div className="text-[#0f172a] font-medium">{data.inspectorName} ({data.inspectorCrea})</div>
              </div>
              <div>
                <span className="font-semibold text-[#475569]">Normas Técnicas Aplicadas:</span>
                <div className="text-[#0f172a] font-mono font-medium text-[10px]">{data.applicableNorm}</div>
              </div>
            </div>

            {/* Pathology Identification & Severity */}
            <div className="border border-[#e2e8f0] rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-sm text-[#0f172a]">1. Manifestação Patológica Constatada</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Severidade: {data.severity.toUpperCase()}
                </span>
              </div>

              <div className="text-xs font-semibold text-[#0f172a]">
                {data.pathologyName}
              </div>

              {/* Photo Evidence with simulated vector inspection overlays */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="border border-[#cbd5e1] rounded p-2 bg-[#f8fafc]">
                  <div className="h-44 bg-[#0f172a] rounded relative overflow-hidden flex items-center justify-center">
                    <svg viewBox="0 0 240 160" className="w-full h-full">
                      <rect width="240" height="160" fill="#334155" />
                      <line x1="20" y1="40" x2="220" y2="40" stroke="#475569" strokeWidth="1" strokeDasharray="4,4" />
                      <line x1="20" y1="120" x2="220" y2="120" stroke="#475569" strokeWidth="1" strokeDasharray="4,4" />
                      <text x="30" y="30" fill="#94a3b8" fontSize="9" fontFamily="monospace">VIGA BALDRAME VB-03</text>
                      <path d="M 60 140 Q 90 95 120 70 T 170 20" fill="none" stroke="#ef4444" strokeWidth="3" />
                      <line x1="120" y1="70" x2="150" y2="70" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="155" y="73" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">0,80 mm</text>
                    </svg>
                    <div className="absolute top-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-mono text-[#f8fafc]">
                      FISSURÔMETRO ÓTICO
                    </div>
                  </div>
                  <div className="text-[10px] text-[#64748b] mt-1 text-center font-mono">
                    Figura 1.1: Fissura inclinada a 45° por cisalhamento em viga baldrame.
                  </div>
                </div>

                <div className="border border-[#cbd5e1] rounded p-2 bg-[#f8fafc] flex flex-col justify-between">
                  <div className="h-44 bg-[#0f172a] rounded relative overflow-hidden flex items-center justify-center">
                    <svg viewBox="0 0 240 160" className="w-full h-full">
                      <rect width="240" height="160" fill="#1e293b" />
                      <rect x="0" y="80" width="240" height="80" fill="#292524" />
                      <path d="M 0 110 Q 120 130 240 105" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />
                      <text x="20" y="105" fill="#38bdf8" fontSize="8" fontFamily="monospace">NÍVEL FREÁTICO DINÂMICO</text>
                      <rect x="90" y="50" width="60" height="40" fill="#64748b" stroke="#94a3b8" />
                      <path d="M 120 20 L 120 50" stroke="#f59e0b" strokeWidth="3" />
                      <text x="125" y="40" fill="#f59e0b" fontSize="8" fontFamily="monospace">RECALQUE 3mm</text>
                    </svg>
                    <div className="absolute top-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-mono text-[#f8fafc]">
                      MODELO GEOTÉCNICO
                    </div>
                  </div>
                  <div className="text-[10px] text-[#64748b] mt-1 text-center font-mono">
                    Figura 1.2: Perfil geotécnico e variação do lençol freático litorâneo.
                  </div>
                </div>
              </div>
            </div>

            {/* Forensic Diagnosis */}
            <div className="border border-[#e2e8f0] rounded-md p-4 space-y-2">
              <h2 className="font-bold text-sm text-[#0f172a]">2. Conclusão Diagnóstica e Nexo Causal</h2>
              <p className="text-xs text-[#334155] leading-relaxed text-justify">
                {data.probableCause} Em inspeção in loco realizada com esclerometria e fissurômetro acrílico milimétrico, 
                constatou-se que a fissura encontra-se ativa, exigindo intervenção profilática imediata para evitar a perda 
                da passivação da armadura de aço provocada pela névoa salina típica da região costeira.
              </p>
            </div>

            {/* Technical Repair Prescription */}
            <div className="border border-[#e2e8f0] rounded-md p-4 space-y-2">
              <h2 className="font-bold text-sm text-[#0f172a]">3. Prescrição Técnica de Reparo e Recuperação</h2>
              <p className="text-xs text-[#334155] leading-relaxed text-justify">
                {data.recommendedTreatment}
              </p>
              <div className="mt-2 bg-[#f1f5f9] p-2.5 rounded flex justify-between items-center text-xs font-mono">
                <span className="font-semibold text-[#475569]">Estimativa de Custo de Recuperação (SINAPI):</span>
                <span className="text-[#0f172a] font-bold text-sm">
                  R$ {data.estimatedRepairCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Report Footer & Digital Signature */}
          <div className="pt-6 border-t-2 border-[#1e293b] mt-8 flex items-end justify-between">
            {/* Digital Signature Box */}
            <div className="border border-[#94a3b8] rounded p-2.5 bg-[#f8fafc] max-w-sm">
              <div className="flex items-center space-x-1.5 text-[#15803d] font-bold text-[10px]">
                <ShieldCheck className="w-4 h-4 text-[#15803d]" />
                <span>ASSINADO DIGITALMENTE VIA ICP-BRASIL</span>
              </div>
              <div className="text-[9px] font-mono text-[#64748b] mt-1 space-y-0.5">
                <div>Signatário: {data.digitalSignature.signer}</div>
                <div>Timestamp: {data.digitalSignature.timestamp}</div>
                <div className="truncate text-[8px] text-[#94a3b8]">Hash: {data.digitalSignature.hashSha256}</div>
              </div>
            </div>

            {/* QR Code and CREA Stamp */}
            <div className="flex items-center space-x-3 text-right">
              <div className="text-[9px] font-mono text-[#64748b]">
                <div className="font-bold text-[#0f172a]">VERIFICAÇÃO PÚBLICA</div>
                <div>Acesse ver.verta.io</div>
                <div>Código: 2026-VRT-9941</div>
              </div>
              <div className="w-12 h-12 bg-[#0f172a] text-white p-1 rounded flex items-center justify-center shadow-xs">
                <QrCode className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
