import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Globe,
  CalendarCheck,
  QrCode,
} from 'lucide-react';
import { ServicesList } from '@/components/ServicesList';
import { Pricing } from '@/components/Pricing';
import { CtaBanner } from '@/components/CtaBanner';

const highlights = [
  {
    icon: RefreshCw,
    title: 'Sites por assinatura',
    description:
      'Tenha um site profissional com tudo incluso: design sob medida, hospedagem ultrarrápida, domínio próprio, certificado SSL e suporte contínuo.',
    badge: 'Modelo Principal',
    benefits: [
      'Planejamento e desenvolvimento sob medida',
      'Manutenção técnica e segurança inclusas',
      'Alterações de conteúdo mensais inclusas',
      'Transparência e cancelamento sem complicação',
    ],
  },
  {
    icon: Globe,
    title: 'Presença digital completa',
    description:
      'Site, Google e redes sociais trabalhando juntos para gerar resultados. Sua empresa passa a aparecer em destaque quando clientes buscam perto de você no Google e no Maps.',
    badge: 'Visibilidade Local',
    benefits: [
      'Configuração e otimização do Perfil Google de Empresa',
      'Integração direta com o Google Maps no site',
      'Botões de WhatsApp e Instagram flutuantes',
      'Otimização de SEO local para buscas da sua região',
    ],
  },
  {
    icon: CalendarCheck,
    title: 'Agendamento e pagamento online',
    description:
      'Seus clientes marcam horário e realizam pagamentos direto pelo site, 24 horas por dia. Menos trabalho manual de atendimento, menos faltas e mais conversões imediatas.',
    badge: 'Automação',
    benefits: [
      'Sistema de agenda online 24/7',
      'Confirmação automática de horários',
      'Integração com PIX e cartões',
      'Lembretes para reduzir faltas',
    ],
  },
  {
    icon: QrCode,
    title: 'Placas Google (QR Code + NFC)',
    description:
      'Display físico personalizado em acrílico para o balcão da sua empresa. Os clientes avaliam seu negócio no Google em segundos apenas encostando o celular ou apontando a câmera.',
    badge: 'Diferencial Físico',
    benefits: [
      'Tecnologia dupla: NFC por aproximação + QR Code',
      'Display acrílico personalizado com sua marca',
      'Multiplica suas avaliações 5 estrelas no Google',
      'Gera autoridade imediata no Google Maps',
    ],
  },
];

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Nossos Serviços
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Soluções digitais simples e completas para o seu negócio.
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Da presença no Google ao pagamento online, tudo o que sua empresa precisa para ser encontrada e vender mais.
          </p>
        </div>

        {/* 4 Main Service Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl p-8 glass border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-accent">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-4 border-t border-white/5 space-y-2.5">
                    {item.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5">
                  <Link
                    to="/orcamento"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
                  >
                    <span>Solicitar proposta para este serviço</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete Catalog of Services */}
        <div className="pt-6">
          <ServicesList showHeader={true} />
        </div>

        {/* Pricing */}
        <Pricing />

        {/* Final CTA */}
        <CtaBanner />
      </div>
    </div>
  );
};
