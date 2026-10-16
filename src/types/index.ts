export type StudioType = 'project' | 'cost' | 'site' | 'inspection';

export type CanvasTab = 'floorplan' | 'spreadsheet' | 'report' | 'geofence';

export type SubscriptionTier = 'free' | 'pro' | 'construtora';

export interface Project {
  id: string;
  name: string;
  code: string;
  location: string;
  type: 'Residencial' | 'Comercial' | 'Litorâneo' | 'Misto';
  totalArea: number; // m²
  progress: number; // percentage
  status: 'Em Planejamento' | 'Fundações' | 'Estrutura' | 'Acabamento';
  budgetTotal: number;
  spentSoFar: number;
  centerCoords: {
    lat: number;
    lng: number;
    radiusMeters: number;
  };
  activeWorkersCount: number;
}

export interface ThoughtStep {
  title: string;
  detail: string;
  status: 'done' | 'processing' | 'pending';
  normRef?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  studio?: StudioType;
  thoughts?: ThoughtStep[];
  attachments?: {
    name: string;
    url: string;
    type: 'image' | 'blueprint' | 'doc';
  }[];
  suggestedAction?: {
    label: string;
    targetTab: CanvasTab;
    payload?: any;
  };
}

export interface SinapiItem {
  id: string;
  code: string;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
  stage: 'Estrutura' | 'Fundações' | 'Alvenaria' | 'Cobertura' | 'Acabamento' | 'Instalações';
  abcCurve: 'A' | 'B' | 'C';
}

export interface InspectionData {
  id: string;
  reportNumber: string;
  projectTitle: string;
  inspectorName: string;
  inspectorCrea: string;
  inspectionDate: string;
  location: string;
  pathologyName: string;
  severity: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  applicableNorm: string; // Ex: NBR 15575 / NBR 6118 / NBR 9575
  probableCause: string;
  recommendedTreatment: string;
  estimatedRepairCost: number;
  digitalSignature: {
    signed: boolean;
    hashSha256: string;
    timestamp: string;
    signer: string;
  };
  hasWatermark: boolean;
}

export interface WorkerPresence {
  id: string;
  name: string;
  trade: 'Pedreiro' | 'Armador' | 'Carpinteiro' | 'Eletricista' | 'Mestre de Obras';
  checkInTime: string;
  status: 'valid' | 'out_of_bounds' | 'late';
  distanceMeters: number;
  coords: { lat: number; lng: number };
}

export interface MaterialAudit {
  id: string;
  material: string;
  theoreticalConsumption: number;
  physicalReceipt: number;
  unit: string;
  variancePercentage: number;
  status: 'ok' | 'warning' | 'critical';
  date: string;
}
