import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Smartphone, Star, ArrowRight } from 'lucide-react';
import { useSiteData } from '@/context/SiteContext';

export const PlateSection: React.FC = () => {
  const { config } = useSiteData();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass border border-white/10 p-8 sm:p-12 lg:p-16 relative overflow-hidden bg-gradient-to-br from-card/80 via-card/40 to-transparent">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[140px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Exclusividade VolpoTech</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {config.plateTitle}
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {config.plateSubtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <QrCode className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-heading font-semibold text-white text-sm mb-1">
                    QR Code
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Basta apontar a câmera do celular.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <Smartphone className="w-6 h-6 text-accent mb-2" />
                  <h4 className="font-heading font-semibold text-white text-sm mb-1">
                    NFC
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Encoste o celular e abra a tela de avaliação.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <Star className="w-6 h-6 text-yellow-400 mb-2 fill-yellow-400" />
                  <h4 className="font-heading font-semibold text-white text-sm mb-1">
                    Mais Avaliações
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Mais relevância orgânica no Google e Maps.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link
                  to="/orcamento?servico=placa"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-accent hover:bg-accent/90 text-background font-semibold text-sm transition-all shadow-xl shadow-accent/25 hover:-translate-y-0.5"
                >
                  <span>Quero uma placa</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/servicos"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all"
                >
                  <span>Conhecer serviços</span>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group max-w-sm w-full bg-card/60 backdrop-blur-sm">
                <img
                  src={config.plateImage || '/images/google_plate_real.jpg'}
                  alt="Placa Google de avaliações com QR Code e NFC"
                  className="w-full h-auto max-h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-medium text-white/90 glass p-2.5 rounded-xl border border-white/10 text-center">
                  Display físico acrílico com NFC e QR Code de alta precisão
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
