import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { Steps } from '@/components/Steps';
import { ServicesList } from '@/components/ServicesList';
import { Pricing } from '@/components/Pricing';
import { PlateSection } from '@/components/PlateSection';
import { FaqSection } from '@/components/FaqSection';
import { CtaBanner } from '@/components/CtaBanner';
import { ProjectCard } from '@/components/ProjectCard';
import { useSiteData } from '@/context/SiteContext';

export const HomePage: React.FC = () => {
  const { projects } = useSiteData();
  // Show first 3 projects on home
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Hero />
      <Steps />

      {/* Featured Portfolio Section */}
      <section className="py-20 border-t border-white/5 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Portfólio em destaque
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Projetos reais para negócios que querem crescer.
              </h2>
              <p className="text-muted-foreground text-base">
                Veja como transformamos a presença digital de comércios e prestadores de serviços no Grande ABC e em todo o Brasil.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0 group"
            >
              <span>Ver todos os projetos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <ServicesList limit={6} />
      <Pricing />
      <PlateSection />
      <FaqSection />
      <CtaBanner />
    </div>
  );
};
