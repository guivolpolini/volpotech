import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, Smartphone, Search, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-accent/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Location pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              <span>São Caetano do Sul — Atendendo todo o Brasil</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Sua empresa mais{' '}
              <span className="bg-gradient-to-r from-blue-400 via-primary to-accent bg-clip-text text-transparent">
                profissional
              </span>{' '}
              no digital.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {siteConfig.heroSubtitle}
            </p>

            {/* Value Proposition Box */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 max-w-lg mx-auto lg:mx-0 flex items-center gap-3 text-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 font-bold">
                R$
              </div>
              <div className="text-left">
                <span className="font-semibold text-white block">
                  Site profissional sem taxa de criação
                </span>
                <span className="text-xs text-muted-foreground">
                  A partir de apenas <strong className="text-emerald-400 font-semibold">R$ 69,90/mês</strong> com tudo incluso.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/orcamento"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-base transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                <span>{siteConfig.heroCtaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-base transition-all hover:-translate-y-0.5"
              >
                <span>{siteConfig.heroCtaSecondary}</span>
              </Link>
            </div>

            {/* Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary" />
                <span>100% Responsivo</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-accent" />
                <span>SEO Local no Google</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Google Maps Integrado</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative gradient glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary to-accent rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              {/* Showcase Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-card shadow-2xl">
                <div className="h-9 bg-white/[0.04] border-b border-white/10 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-[11px] text-muted-foreground/60 font-mono">volpotech.com.br</span>
                  <div className="w-10"></div>
                </div>

                <img
                  src="/images/hero_showcase.webp"
                  alt="Site profissional criado pela VolpoTech"
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                  loading="eager"
                />

                {/* Floating pill badge */}
                <div className="absolute bottom-4 left-4 right-4 glass p-3 rounded-xl border border-white/15 flex items-center justify-between text-xs backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-medium">Hospedagem & Domínio inclusos</span>
                  </div>
                  <span className="text-accent font-semibold">Sem taxa inicial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
