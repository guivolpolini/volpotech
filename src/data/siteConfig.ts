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
  plateTitle: string;
  plateSubtitle: string;
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
  tagline: 'Sites profissionais por assinatura sem taxa de criação',
  heroTitle: 'Sua empresa mais profissional no digital.',
  heroSubtitle:
    'Criamos sites modernos e soluções digitais para ajudar sua empresa a ser encontrada, gerar contatos e vender mais.',
  heroBadge: 'Site profissional sem taxa de criação. A partir de R$ 69,90/mês.',
  heroCtaPrimary: 'Quero meu site',
  heroCtaSecondary: 'Ver portfólio',
  finalTitle: 'Sua empresa já está preparada para ser encontrada na internet?',
  finalSubtitle:
    'Comece hoje. Sem taxa de criação, sem complicação. Apenas a mensalidade do seu plano.',
  finalCta: 'Começar agora',
  plansDisclaimer: 'Sem taxa de criação. Você paga apenas a mensalidade.',
  plateTitle: 'Placa Google de Avaliações',
  plateSubtitle:
    'Display personalizado com QR Code e NFC para que seus clientes avaliem seu negócio no Google em segundos.',
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

export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMsg =
    'Olá! Vim pelo site da VolpoTech e quero saber mais sobre criação de sites.';
  const msg = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${msg}`;
}
