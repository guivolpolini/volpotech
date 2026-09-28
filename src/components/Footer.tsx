import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, Mail, MapPin } from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '@/data/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-background/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-extrabold text-white text-lg">
                V
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Volpo<span className="text-primary">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Criamos sites modernos por assinatura para pequenos e médios negócios em todo o Brasil. Sem taxa de criação e com tudo incluído.
            </p>
          </div>

          {/* Col 2: Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide uppercase">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-muted-foreground hover:text-white transition-colors">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-muted-foreground hover:text-white transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/orcamento" className="text-muted-foreground hover:text-white transition-colors">
                  Orçamento
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-muted-foreground hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contato */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide uppercase">
              Contato
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>{siteConfig.contact.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground pt-1">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{siteConfig.contact.region}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Benefícios */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide uppercase">
              Por que a VolpoTech?
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>Sem taxa inicial de criação</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>Hospedagem rápida e SSL grátis</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>Alterações mensais inclusas</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>Suporte direto e humanizado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} VolpoTech. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com tecnologia de alta performance</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
