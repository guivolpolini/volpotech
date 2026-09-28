import React from 'react';
import { MessageSquare, Lightbulb, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Você entra em contato',
    description: 'Você fala com a gente pelo WhatsApp ou pelo formulário do site. Sem burocracia nem compromisso.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Entendemos seu negócio',
    description: 'Conversamos sobre seus objetivos, público-alvo, produtos ou serviços e o que você precisa no digital.',
    icon: Lightbulb,
  },
  {
    number: '03',
    title: 'Criamos seu site',
    description: 'Desenvolvemos um site profissional, moderno, ultrarrápido e responsivo, adaptado à sua marca.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Colocamos sua empresa no ar',
    description: 'Publicamos com domínio próprio, hospedagem de ponta e SSL. Pronto para gerar novos contatos e clientes.',
    icon: Rocket,
  },
];

export const Steps: React.FC = () => {
  return (
    <section className="py-20 border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Como funciona
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Do primeiro contato ao site no ar, em 4 passos.
          </h2>
          <p className="text-muted-foreground text-base">
            Processo ágil e transparente para você focar no seu negócio enquanto nós cuidamos de toda a tecnologia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl p-6 glass border border-white/10 hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-heading font-extrabold text-white/20 group-hover:text-primary transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-white/10 z-20 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
