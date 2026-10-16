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
        'Controle inteligente de consumo de tokens com alta margem de lucro',
        'Suporte prioritário de Engenharia Sentinel',
      ],
      notIncluded: []
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-[#e5e5e2] rounded-2xl max-w-4xl w-full p-6 text-xs text-[#242220] shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ededeb] pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-base text-[#121110]">Modelo de Negócio VERTA SaaS</span>
              <span className="text-[10px] font-mono text-[#946f19] bg-[#fbf7ee] px-2 py-0.5 rounded border border-[#ebd8b2] font-semibold">
                Margem Líquida &gt; 85%
              </span>
            </div>
            <p className="text-[11px] text-[#716e68] mt-0.5">
              Escolha ou simule o plano ativo para desbloquear recursos de IA e remover marca d'água.
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#f4f4f2] rounded text-[#716e68]">
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
                    ? 'bg-[#fdfbf7] border-[#dfc68b] shadow-md'
                    : 'bg-white border-[#e5e5e2] hover:border-[#cbcbc5]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[#716e68] tracking-wider font-semibold">{plan.badge}</span>
                    {isCurrent && (
                      <span className="bg-[#fbf7ee] text-[#946f19] border border-[#dfc68b] text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center space-x-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>PLANO ATIVO</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-[#121110]">{plan.name}</h4>
                    <div className="flex items-baseline space-x-1 mt-1">
                      <span className="text-2xl font-bold font-mono text-[#121110]">{plan.price}</span>
                      <span className="text-[#716e68] font-mono">{plan.period}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#55524e] leading-snug">{plan.description}</p>

                  <div className="pt-2 border-t border-[#f0f0ed] space-y-1.5">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start space-x-2 text-[11px] text-[#33312e]">
                        <Check className="w-3.5 h-3.5 text-[#16a34a] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((f, i) => (
                      <div key={i} className="flex items-start space-x-2 text-[11px] text-[#a8a49c]">
                        <X className="w-3.5 h-3.5 text-[#a8a49c] shrink-0 mt-0.5" />
                        <span className="line-through">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-[#f0f0ed]">
                  <button
                    onClick={() => {
                      onSelectTier(plan.id);
                      onClose();
                    }}
                    className={`w-full py-2 rounded-lg text-xs font-semibold transition ${
                      isCurrent
                        ? 'bg-[#f4f4f2] text-[#716e68] border border-[#e0e0dc] cursor-default'
                        : plan.highlighted
                        ? 'bg-[#121110] text-white hover:bg-black shadow-xs'
                        : 'bg-[#f7f7f5] hover:bg-[#ededeb] text-[#121110] border border-[#dededb]'
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
        <div className="bg-[#f7f7f5] border border-[#e5e5e2] rounded-lg p-3 flex items-center justify-between text-[11px] font-mono text-[#716e68]">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-[#946f19]" />
            <span>Infraestrutura em nuvem integrada com Google Cloud Platform e Sentinel Systems.</span>
          </div>
          <span className="text-[#946f19] font-medium">Cancelamento a qualquer momento</span>
        </div>
      </div>
    </div>
  );
};
