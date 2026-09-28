import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { useSiteData } from '@/context/SiteContext';

export const Pricing: React.FC = () => {
  const { plans, config } = useSiteData();

  return (
    <section className="py-20 bg-white/[0.01] border-t border-white/5 relative overflow-hidden" id="planos">
      {/* Background glow behind featured card */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-primary/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Planos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Escolha o plano ideal para o seu momento.
          </h2>
          <p className="text-muted-foreground text-base">
            {config.plansDisclaimer}
          </p>
        </div>

        <div
          className={`grid gap-8 ${
            plans.length === 1
              ? 'max-w-md mx-auto grid-cols-1'
              : plans.length === 2
              ? 'max-w-5xl mx-auto grid-cols-1 lg:grid-cols-2'
              : 'max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                plan.featured
                  ? 'glass border-2 border-primary/50 shadow-2xl shadow-primary/20 bg-gradient-to-b from-primary/10 to-transparent'
                  : 'glass border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 right-8 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary text-white text-xs font-semibold shadow-md shadow-primary/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mais escolhido</span>
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-white/10">
                  <span className="text-sm text-muted-foreground font-medium">R$</span>
                  <span className="text-5xl font-heading font-extrabold text-white tracking-tight">
                    {plan.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>

                <div className="space-y-3.5 mb-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                    O que está incluso:
                  </span>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.additionalBenefits && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2 mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent block">
                      Recursos adicionais inclusos:
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Sistema de agendamento, pagamento online, catálogo, SEO local avançado e integrações personalizadas — inclusos no plano, sem custo extra.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Link
                  to={`/orcamento?plano=${plan.id}`}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all ${
                    plan.featured
                      ? 'bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 hover:-translate-y-0.5'
                      : 'bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:-translate-y-0.5'
                  }`}
                >
                  <span>Assinar agora</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
