import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Layout,
  Rocket,
  GalleryVerticalEnd,
  CalendarCheck,
  CreditCard,
  MapPin,
  Globe,
  QrCode,
  Wrench,
} from 'lucide-react';
import { useSiteData } from '@/context/SiteContext';
import { ServicesList } from '@/components/ServicesList';
import { Pricing } from '@/components/Pricing';
import { CtaBanner } from '@/components/CtaBanner';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  RefreshCw,
  Layout,
  Rocket,
  GalleryVerticalEnd,
  CalendarCheck,
  CreditCard,
  MapPin,
  Globe,
  QrCode,
  Wrench,
};

export const ServicesPage: React.FC = () => {
  const { services } = useSiteData();

  // Show highlighted services (or top 4 services if none marked as highlight)
  const highlightedServices = services.some((s) => s.highlight)
    ? services.filter((s) => s.highlight)
    : services.slice(0, 4);

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

        {/* Dynamic Highlighted Service Pillars */}
        {highlightedServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {highlightedServices.map((item) => {
              const Icon = iconMap[item.icon] || Layout;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl p-8 glass border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      {item.badge && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-accent">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-white">
                      {item.name}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>

                    {item.benefits && item.benefits.length > 0 && (
                      <div className="pt-4 border-t border-white/5 space-y-2.5">
                        {item.benefits.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5">
                    <Link
                      to={`/orcamento?servico=${encodeURIComponent(item.name)}`}
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
        )}

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
