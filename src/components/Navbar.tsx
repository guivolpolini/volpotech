import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useSiteData } from '@/context/SiteContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { config } = useSiteData();

  const navLinks = [
    { label: 'Início', path: '/' },
    { label: 'Portfólio', path: '/portfolio' },
    { label: 'Serviços', path: '/servicos' },
    { label: 'Orçamento', path: '/orcamento' },
    { label: 'Contato', path: '/contato' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const whatsAppUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(
    'Olá! Vim pelo site da VolpoTech e quero saber mais sobre criação de sites.'
  )}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass bg-background/80 border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-extrabold text-white text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            V
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl text-white tracking-tight">
              Volpo<span className="text-primary">Tech</span>
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest -mt-1">
              Sites & Soluções
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive(link.path)
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            <span>Quero meu site</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Abrir menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden glass border-b border-white/10 px-4 pt-3 pb-6 space-y-2 bg-background/95">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-medium text-center shadow-lg shadow-primary/25"
            >
              <span>Quero meu site</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
