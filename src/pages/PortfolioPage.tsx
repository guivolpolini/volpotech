import React, { useState } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import { CtaBanner } from '@/components/CtaBanner';
import { useSiteData } from '@/context/SiteContext';

const categories = ['Todos', 'Sites', 'Lojas', 'Landing Pages', 'Sistemas', 'Outros'] as const;

export const PortfolioPage: React.FC = () => {
  const { projects } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const filteredProjects =
    selectedCategory === 'Todos'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Portfólio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Projetos que ajudam negócios a crescer no digital.
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Uma seleção de sites, lojas e sistemas criados pela VolpoTech para empresas de todo o Brasil.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-3xl border border-white/10 max-w-md mx-auto">
            <p className="text-muted-foreground text-sm">
              Nenhum projeto encontrado nesta categoria no momento.
            </p>
          </div>
        )}
      </div>

      <div className="mt-12">
        <CtaBanner />
      </div>
    </div>
  );
};
