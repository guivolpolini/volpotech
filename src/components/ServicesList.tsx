import React from 'react';
import { Link } from 'react-router-dom';
import {
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
  ArrowRight,
} from 'lucide-react';
import { services } from '@/data/services';

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

export const ServicesList: React.FC<{ limit?: number; showHeader?: boolean }> = ({
  limit,
  showHeader = true,
}) => {
  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Serviços
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Tudo o que sua empresa precisa para crescer no digital.
              </h2>
              <p className="text-muted-foreground text-base">
                Soluções completas, integradas e projetadas para atrair clientes locais e converter visitantes em vendas.
              </p>
            </div>
            {limit && (
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0 group"
              >
                <span>Ver todos os serviços</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service) => {
            const Icon = iconMap[service.icon] || Layout;
            return (
              <div
                key={service.id}
                className="p-6 rounded-2xl glass border border-white/10 hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
