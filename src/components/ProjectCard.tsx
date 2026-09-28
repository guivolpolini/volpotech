import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '@/data/projects';

export const ProjectCard: React.FC<{ project: ProjectItem }> = ({ project }) => {
  return (
    <Link
      to={`/portfolio/${project.id}`}
      className="group rounded-3xl glass border border-white/10 hover:border-primary/50 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1.5 shadow-xl hover:shadow-primary/10"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-card/60">
        <img
          src={project.main_image}
          alt={project.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-background/80 text-primary border border-white/10 backdrop-blur-md">
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-primary transition-all duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-xl font-heading font-bold text-white group-hover:text-primary transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project.short_description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
          {project.tech_stack.map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] text-muted-foreground border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
