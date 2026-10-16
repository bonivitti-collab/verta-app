import type { Project, SinapiItem, InspectionData, WorkerPresence, MaterialAudit } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    name: 'Residencial Costa Esmeralda',
    code: 'VRT-LOTE-14B',
    location: 'Itapema / SC - Litoral Norte',
    type: 'Litorâneo',
    totalArea: 280.50,
    progress: 42,
    status: 'Estrutura',
    budgetTotal: 745000,
    spentSoFar: 312900,
    centerCoords: {
      lat: -27.1284,
      lng: -48.5912,
      radiusMeters: 30
    },
    activeWorkersCount: 8
  },
  {
    id: 'proj-02',
    name: 'Mansão Alpha Vitti',
    code: 'VRT-ALPH-03',
    location: 'Barueri / SP',
    type: 'Residencial',
    totalArea: 420.00,
    progress: 78,
    status: 'Acabamento',
    budgetTotal: 1850000,
    spentSoFar: 1443000,
    centerCoords: {
      lat: -23.5015,
      lng: -46.8521,
      radiusMeters: 40
    },
    activeWorkersCount: 12
  },
  {
    id: 'proj-03',
    name: 'Edifício Sentinel Business',
    code: 'VRT-COMM-07',
    location: 'Balneário Camboriú / SC',
    type: 'Comercial',
    totalArea: 1250.00,
    progress: 15,
    status: 'Fundações',
    budgetTotal: 4890000,
    spentSoFar: 733500,
    centerCoords: {
      lat: -26.9926,
      lng: -48.6347,
      radiusMeters: 60
    },
    activeWorkersCount: 19
  }
];

export const INITIAL_SINAPI_ITEMS: SinapiItem[] = [
  {
    id: 'sin-01',
    code: '92775',
    description: 'Armação de pilar ou viga de estrutura convencional de concreto armado com aço CA-50 de 10.0 mm',
    unit: 'KG',
    quantity: 2450.0,
    unitPrice: 12.85,
    total: 31482.50,
    stage: 'Estrutura',
    abcCurve: 'A'
  },
  {
    id: 'sin-02',
    code: '103670',
    description: 'Concretagem de vigas e lajes, fck=30 MPa com uso de bomba inclusive lançamento e adensamento',
    unit: 'M3',
    quantity: 48.0,
    unitPrice: 585.00,
    total: 28080.00,
    stage: 'Estrutura',
    abcCurve: 'A'
  },
  {
    id: 'sin-03',
    code: '87524',
    description: 'Alvenaria de vedação de blocos cerâmicos furados na horizontal 9x19x19 cm com argamassa 1:2:8',
    unit: 'M2',
    quantity: 320.0,
    unitPrice: 78.40,
    total: 25088.00,
    stage: 'Alvenaria',
    abcCurve: 'A'
  },
  {
    id: 'sin-04',
    code: '98546',
    description: 'Impermeabilização de viga baldrame com manta asfáltica elastomérica e imprimação com emulsão',
    unit: 'M2',
    quantity: 110.0,
    unitPrice: 94.20,
    total: 10362.00,
    stage: 'Fundações',
    abcCurve: 'B'
  },
  {
    id: 'sin-05',
    code: '87255',
    description: 'Revestimento cerâmico para piso interno e externo tipo porcelanato esmaltado 80x80cm retificado',
    unit: 'M2',
    quantity: 185.0,
    unitPrice: 115.50,
    total: 21367.50,
    stage: 'Acabamento',
    abcCurve: 'B'
  },
  {
    id: 'sin-06',
    code: '91834',
    description: 'Eletroduto flexível corrugado reforçado PVC DN 25 mm (3/4) aparente ou embutido em laje',
    unit: 'M',
    quantity: 420.0,
    unitPrice: 11.20,
    total: 4704.00,
    stage: 'Instalações',
    abcCurve: 'C'
  },
  {
    id: 'sin-07',
    code: '89356',
    description: 'Tubo de PVC rígido soldável para água fria predial DN 25 mm inclusive conexões e suportes',
    unit: 'M',
    quantity: 160.0,
    unitPrice: 19.80,
    total: 3168.00,
    stage: 'Instalações',
    abcCurve: 'C'
  }
];

export const INITIAL_INSPECTION_DATA: InspectionData = {
  id: 'insp-2026-041',
  reportNumber: 'LVT-VRT-2026/041',
  projectTitle: 'Residencial Costa Esmeralda - Lote 14B',
  inspectorName: 'Eng. Roberto Vitti da Silva',
  inspectorCrea: 'CREA/SC 084.921-8 | RRT 10492-4',
  inspectionDate: '16/10/2026',
  location: 'Setor Sul da Obra - Viga Baldrame VB-03 e Alvenaria Externa',
  pathologyName: 'Fissuração em 45° associada a Recalque Diferencial de Sapata em Solo Costeiro',
  severity: 'Alta',
  applicableNorm: 'ABNT NBR 6118:2023, NBR 15575 e NBR 13752',
  probableCause: 'Variação rápida do lençol freático decorrente de ressacas e saturação do subleito arenoso, gerando recalque pontual milimétrico na sapata S-02 e fissura de cisalhamento em viga baldrame.',
  recommendedTreatment: 'Reforço do subleito com injeção de cimento microfino, selagem estrutural das fissuras com resina epóxi de alta aderência, repintura com acabamento elastomérico hidrorrepelente para proteção contra cloretos.',
  estimatedRepairCost: 14850.00,
  digitalSignature: {
    signed: true,
    hashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    timestamp: '16/10/2026 14:32:09 BRT',
    signer: 'SENTINEL TRUST CA - ICP-BRASIL CERTIFICATE'
  },
  hasWatermark: false
};

export const INITIAL_WORKERS: WorkerPresence[] = [
  { id: 'w-1', name: 'Antônio Marcos Santos', trade: 'Mestre de Obras', checkInTime: '06:54:12', status: 'valid', distanceMeters: 4.2, coords: { lat: -27.12841, lng: -48.59118 } },
  { id: 'w-2', name: 'Valdir Ferreira Lima', trade: 'Armador', checkInTime: '06:58:30', status: 'valid', distanceMeters: 9.8, coords: { lat: -27.12845, lng: -48.59122 } },
  { id: 'w-3', name: 'José Claudemir Rocha', trade: 'Armador', checkInTime: '07:01:15', status: 'valid', distanceMeters: 12.1, coords: { lat: -27.12838, lng: -48.59126 } },
  { id: 'w-4', name: 'Mauro Sérgio Batista', trade: 'Pedreiro', checkInTime: '07:04:44', status: 'valid', distanceMeters: 6.5, coords: { lat: -27.12842, lng: -48.59115 } },
  { id: 'w-5', name: 'Geraldo Magela Pires', trade: 'Pedreiro', checkInTime: '07:09:02', status: 'valid', distanceMeters: 14.3, coords: { lat: -27.12835, lng: -48.59119 } },
  { id: 'w-6', name: 'Elton Nascimento', trade: 'Eletricista', checkInTime: '07:14:28', status: 'valid', distanceMeters: 18.0, coords: { lat: -27.12830, lng: -48.59112 } },
  { id: 'w-7', name: 'Reginaldo de Souza', trade: 'Carpinteiro', checkInTime: '07:22:11', status: 'valid', distanceMeters: 22.4, coords: { lat: -27.12848, lng: -48.59130 } },
  { id: 'w-8', name: 'Carlos Eduardo Silva', trade: 'Carpinteiro', checkInTime: '07:35:40', status: 'out_of_bounds', distanceMeters: 42.6, coords: { lat: -27.12870, lng: -48.59145 } },
];

export const INITIAL_MATERIAL_AUDITS: MaterialAudit[] = [
  { id: 'm-1', material: 'Cimento Portland CP-II-F 32 (Sacos 50kg)', theoreticalConsumption: 145, physicalReceipt: 150, unit: 'sacos', variancePercentage: 3.4, status: 'ok', date: '16/10/2026' },
  { id: 'm-2', material: 'Areia Média Lavada de Rio', theoreticalConsumption: 18.5, physicalReceipt: 18.0, unit: 'm³', variancePercentage: -2.7, status: 'ok', date: '16/10/2026' },
  { id: 'm-3', material: 'Aço CA-50 10.0mm Cortado/Dobrado', theoreticalConsumption: 2450, physicalReceipt: 2450, unit: 'kg', variancePercentage: 0.0, status: 'ok', date: '15/10/2026' },
  { id: 'm-4', material: 'Brita 1 Granítica', theoreticalConsumption: 24.0, physicalReceipt: 21.0, unit: 'm³', variancePercentage: -12.5, status: 'critical', date: '15/10/2026' },
];
