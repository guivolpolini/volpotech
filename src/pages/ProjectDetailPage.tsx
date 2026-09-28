import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { useSiteData } from '@/context/SiteContext';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, config } = useSiteData();
  const project = projects.find((p) => p.id === id || p.slug === id);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="pt-40 pb-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Projeto não encontrado</h2>
        <p className="text-muted-foreground text-sm mb-6">
          O projeto que você está procurando não existe ou foi removido.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao portfólio</span>
        </Link>
      </div>
    );
  }

  const currentHeroImage = activeImage || project.main_image;

  const projectWhatsAppUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(
    `Olá! Vi o projeto "${project.title}" no portfólio da VolpoTech e gostaria de um site semelhante.`
  )}`;

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Voltar ao portfólio</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
              {project.category}
            </span>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors"
              >
                <span>Acessar demonstração</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Main Showcase Image */}
        <div className="rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl mb-8 group relative">
          <img
            src={currentHeroImage}
            alt={project.title}
            className="w-full h-auto object-cover max-h-[550px] object-top"
          />
          {project.url && (
            <div className="absolute bottom-4 right-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background/90 hover:bg-background text-white text-xs font-semibold border border-white/10 backdrop-blur-md transition-all shadow-lg"
              >
                <span>Visitar site no ar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Gallery Thumbnails */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-14">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>Galeria de telas do projeto (clique para ampliar)</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveImage(project.main_image)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all ${
                  currentHeroImage === project.main_image
                    ? 'border-primary ring-2 ring-primary/40'
                    : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={project.main_image}
                  alt="Principal"
                  className="w-full h-full object-cover object-top"
                />
              </button>
              {project.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all ${
                    currentHeroImage === img
                      ? 'border-primary ring-2 ring-primary/40'
                      : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Tela ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Problem & Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Problem */}
          <div className="p-6 rounded-2xl glass border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>O Desafio</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="p-6 rounded-2xl glass border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Nossa Solução</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Features & Technologies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {/* Features */}
          <div className="p-6 rounded-2xl glass border border-white/10 space-y-4">
            <h3 className="font-heading font-semibold text-white text-base">
              Recursos implementados
            </h3>
            <div className="space-y-2.5">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-6 rounded-2xl glass border border-white/10 space-y-4">
            <h3 className="font-heading font-semibold text-white text-base">
              Tecnologias utilizadas
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="p-8 rounded-3xl glass border border-primary/30 text-center space-y-4 bg-gradient-to-r from-primary/10 via-card to-accent/10">
          <div className="inline-flex items-center gap-2 text-accent text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Gostou deste projeto?</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Podemos criar uma presença digital semelhante para o seu negócio.
          </h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Sem taxa de criação, entrega rápida e mensalidade acessível a partir de R$ 69,90/mês.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/orcamento"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-white font-semibold text-sm shadow-xl shadow-primary/25 hover:bg-primary/90 transition-all"
            >
              <span>Solicitar orçamento</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={projectWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-all border border-white/10"
            >
              <span>Falar pelo WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
