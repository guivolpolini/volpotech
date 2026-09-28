import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useSiteData } from '@/context/SiteContext';

export const CtaBanner: React.FC = () => {
  const { config } = useSiteData();

  const whatsAppUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(
    'Olá! Vim pelo site da VolpoTech e quero saber mais sobre criação de sites.'
  )}`;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-16 overflow-hidden border border-white/15 bg-gradient-to-r from-primary/20 via-card to-accent/15 text-center shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {config.finalTitle}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {config.finalSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/orcamento"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-base transition-all shadow-xl shadow-primary/30 hover:-translate-y-0.5"
              >
                <span>{config.finalCta}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-base transition-all border border-white/10"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
