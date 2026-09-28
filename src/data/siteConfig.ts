export interface SiteConfig {
  name: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  finalTitle: string;
  finalSubtitle: string;
  finalCta: string;
  plansDisclaimer: string;
  hidePrices?: boolean;
  plansCtaDestination?: 'whatsapp' | 'orcamento';
  plateTitle: string;
  plateSubtitle: string;
  plateImage?: string;
  contact: {
    whatsapp: string; // Ex: '5511999999999' - trocar pelo número real
    whatsappDisplay: string;
    email: string;
    instagram: string;
    instagramHandle: string;
    city: string;
    region: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'VolpoTech',
  tagline: 'Sites profissionais e soluções digitais sob medida',
  heroTitle: 'Sua empresa mais profissional no digital.',
  heroSubtitle:
    'Criamos sites modernos e soluções digitais para ajudar sua empresa a ser encontrada, gerar contatos e vender mais.',
  heroBadge: 'Sites profissionais com orçamento sob medida para o seu negócio.',
  heroCtaPrimary: 'Solicitar orçamento',
  heroCtaSecondary: 'Ver portfólio',
  finalTitle: 'Sua empresa já está preparada para ser encontrada na internet?',
  finalSubtitle:
    'Transforme sua presença digital com um projeto sob medida para os seus objetivos.',
  finalCta: 'Solicitar proposta',
  plansDisclaimer: 'Orçamento sob medida de acordo com o escopo do seu projeto.',
  hidePrices: true,
  plansCtaDestination: 'whatsapp',
  plateTitle: 'Placa Google de Avaliações',
  plateSubtitle:
    'Display personalizado com QR Code e NFC para que seus clientes avaliem seu negócio no Google em segundos.',
  plateImage: '/images/google_plate_real.jpg',
  contact: {
    whatsapp: '5511999999999', // Configure o WhatsApp real da VolpoTech aqui
    whatsappDisplay: '(11) 99999-9999',
    email: 'contato@volpotech.com.br',
    instagram: 'https://instagram.com/volpotech',
    instagramHandle: '@volpotech',
    city: 'São Caetano do Sul',
    region: 'ABC Paulista — Atendemos todo o Brasil',
  },
};

export function getWhatsAppUrl(customMessage?: string, phoneNumber?: string): string {
  const number = phoneNumber || siteConfig.contact.whatsapp;
  const defaultMsg =
    'Olá! Vim pelo site da VolpoTech e quero saber mais sobre criação de sites.';
  const msg = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${number}?text=${msg}`;
}
