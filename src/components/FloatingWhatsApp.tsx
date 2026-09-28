import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSiteData } from '@/context/SiteContext';

export const FloatingWhatsApp: React.FC = () => {
  const { config } = useSiteData();

  const whatsAppUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(
    'Olá! Vim pelo site da VolpoTech e quero saber mais sobre criação de sites.'
  )}`;

  return (
    <aside aria-label="Atendimento rápido" className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
        aria-label="Falar no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline font-medium text-sm">Falar no WhatsApp</span>
      </a>
    </aside>
  );
};
