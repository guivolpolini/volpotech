export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export const services: ServiceItem[] = [
  {
    id: 'sites-assinatura',
    name: 'Sites por assinatura',
    description:
      'Site profissional completo com tudo incluído: design sob medida, hospedagem rápida, domínio e suporte contínuo.',
    icon: 'RefreshCw',
    order: 0,
  },
  {
    id: 'criacao-sites',
    name: 'Criação de sites',
    description:
      'Do design ao deploy. Sites modernos, rápidos e responsivos feitos sob medida para o seu negócio.',
    icon: 'Layout',
    order: 1,
  },
  {
    id: 'landing-pages',
    name: 'Landing pages',
    description:
      'Páginas focadas em conversão para campanhas, lançamentos e captação de leads qualificados.',
    icon: 'Rocket',
    order: 2,
  },
  {
    id: 'catalogos-online',
    name: 'Catálogos online',
    description:
      'Mostre seus produtos de forma organizada e profissional, sem complicação.',
    icon: 'GalleryVerticalEnd',
    order: 3,
  },
  {
    id: 'agendamento-online',
    name: 'Agendamento online',
    description:
      'Sistema para seus clientes marcarem horário direto pelo site, 24 horas por dia.',
    icon: 'CalendarCheck',
    order: 4,
  },
  {
    id: 'pagamentos-online',
    name: 'Pagamentos online',
    description:
      'Receba pagamentos pelo site com integração de gateways seguros e confiáveis.',
    icon: 'CreditCard',
    order: 5,
  },
  {
    id: 'seo-local',
    name: 'SEO local',
    description:
      'Sua empresa aparece no Google e no Maps quando alguém busca pelos seus serviços perto de você.',
    icon: 'MapPin',
    order: 6,
  },
  {
    id: 'google-maps',
    name: 'Google / Maps',
    description:
      'Presença configurada no Perfil de Empresas do Google (Google Meu Negócio) e mapa integrado ao site.',
    icon: 'Globe',
    order: 7,
  },
  {
    id: 'placas-google',
    name: 'Placas de avaliação Google',
    description:
      'Display físico com QR Code e NFC para que seus clientes avaliem seu negócio no Google em segundos.',
    icon: 'QrCode',
    order: 8,
  },
  {
    id: 'manutencao-sites',
    name: 'Manutenção de sites',
    description:
      'Atualizações, correções e melhorias contínuas para manter seu site sempre rápido e no ar.',
    icon: 'Wrench',
    order: 9,
  },
];
