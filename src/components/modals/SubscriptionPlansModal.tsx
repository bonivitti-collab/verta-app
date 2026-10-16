import React from 'react';
import { Check, X, Shield, CheckCircle2 } from 'lucide-react';
import type { SubscriptionTier } from '../../types';

interface SubscriptionPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTier: SubscriptionTier;
  onSelectTier: (tier: SubscriptionTier) => void;
}

export const SubscriptionPlansModal: React.FC<SubscriptionPlansModalProps> = ({
  isOpen,
  onClose,
  currentTier,
  onSelectTier,
}) => {
  if (!isOpen) return null;

  const plans = [
    {
      id: 'free' as SubscriptionTier,
      name: 'Plano Gratuito',
      price: 'R$ 0',
      period: '/mês',
      badge: 'Degustação',
      description: 'Ideal para arquitetos e engenheiros autônomos testarem a IA.',
      features: [
        '10 créditos de IA por mês',
        'Geração de plantas baixas básicas',
        'Diagnósticos preliminares de fissuras',
        'Laudos emitidos com marca d\'água VERTA',
        '1 projeto ativo',
      ],
      notIncluded: [
        'Laudos sem marca d\'água para juízo',
        'CotaCasa e integração SINAPI completa',
        'Verta Ponto GPS e cerca virtual',
      ]
    },
    {
      id: 'pro' as SubscriptionTier,
      name: 'Plano Pro',
      price: 'R$ 97',
      period: '/mês',
      badge: 'Mais Popular',
      highlighted: true,
      description: 'Para peritos, projetistas e escritórios de arquitetura.',
      features: [
        '100 créditos de IA por mês',
        'Laudos Periciais A4 sem marca d\'água',
        'Assinatura digital com hash ICP-Brasil',
        'CotaCasa & Orçamento Paramétrico SINAPI',
        'Decora Verta (IA Multimodal de Acabamento)',
        'Até 5 projetos simultâneos',
        'Exportação em DXF e Excel (CSV)',
      ],
      notIncluded: [
        'Verta Ponto GPS para múltiplos canteiros',
        'Auditoria fotográfica pesada de insumos',
      ]
    },
    {
      id: 'construtora' as SubscriptionTier,
      name: 'Plano Construtora',
      price: 'R$ 247',
      period: '/mês',
      badge: 'Empresarial',
      description: 'Para construtoras e incorporadoras (ecossistema Grupo Vitti).',
      features: [
        'Créditos de IA ampliados para a equipe',
        'Verta Ponto GPS com cerca virtual ilimitado',
        'Controle antifraude de insumos (cimento/concreto)',
        'Laudos ilimitados e ART digitalizada',
        'Projetos e canteiros ilimitados',
        'Controle de margem de lucro com Gemini Flash',
        'Suporte prioritário de Engenharia Sentinel',
      ],
      notIncluded: []
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#0f0e0c] border border-[#2b2721] rounded-2xl max-w-4xl w-full p-6 text-xs text-[#ddd9d0] shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#23201b] pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-base text-white">Modelo de Negócio VERTA SaaS</span>
              <span className="text-[10px] font-mono text-[#c59b27] bg-[#221c0e] px-2 py-0.5 rounded border border-[#3e3215]">
                Margem Líquida &gt; 85%
              </span>
            </div>
            <p className="text-[11px] text-[#8e897e] mt-0.5">
              Escolha ou simule o plano ativo para desbloquear recursos de IA e remover marca d'água.
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#1a1917] rounded text-[#827e75]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => {
            const isCurrent = currentTier === plan.id;

            return (
              <div
                key={plan.id}
                className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-[#19150d] to-[#11100d] border-[#c59b27] shadow-xl shadow-[#c59b27]/10'
                    : 'bg-[#12110f] border-[#25221d] hover:border-[#38342d]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[#7d7971] tracking-wider">{plan.badge}</span>
                    {isCurrent && (
                      <span className="bg-[#241d0f] text-[#d4a359] border border-[#483719] text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center space-x-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>PLANO ATIVO</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-white">{plan.name}</h4>
                    <div className="flex items-baseline space-x-1 mt-1">
                      <span className="text-2xl font-bold font-mono text-white">{plan.price}</span>
                      <span className="text-[#847f75] font-mono">{plan.period}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#8e8a81] leading-snug">{plan.description}</p>

                  <div className="pt-2 border-t border-[#23201b] space-y-1.5">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start space-x-2 text-[11px] text-[#c9c5bc]">
                        <Check className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((f, i) => (
                      <div key={i} className="flex items-start space-x-2 text-[11px] text-[#5e5a52]">
                        <X className="w-3.5 h-3.5 text-[#5e5a52] shrink-0 mt-0.5" />
                        <span className="line-through">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[#1e1c18]">
                  <button
                    onClick={() => {
                      onSelectTier(plan.id);
                      onClose();
                    }}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition ${
                      isCurrent
                        ? 'bg-[#201c13] text-[#c59b27] border border-[#3e331a] cursor-default'
                        : plan.highlighted
                        ? 'bg-[#c59b27] text-black hover:bg-[#d4a359] shadow-lg shadow-[#c59b27]/20'
                        : 'bg-[#181613] hover:bg-[#22201b] text-white border border-[#2b2721]'
                    }`}
                  >
                    {isCurrent ? 'Plano Selecionado' : `Ativar ${plan.name}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Guarantee */}
        <div className="bg-[#14120e] border border-[#262014] rounded-lg p-3 flex items-center justify-between text-[11px] font-mono text-[#8a857b]">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#c59b27]" />
            <span>Infraestrutura em nuvem integrada com Google Cloud Platform e Sentinel Systems.</span>
          </div>
          <span className="text-[#d4a359]">Cancelamento a qualquer momento</span>
        </div>
      </div>
    </div>
  );
};
