export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  badge?: string;
  benefits?: string[];
  highlight?: boolean;
}

export const services: ServiceItem[] = [
  {
    id: 'sites-assinatura',
    name: 'Sites por assinatura',
    description:
      'Tenha um site profissional com tudo incluso: design sob medida, hospedagem ultrarrápida, domínio próprio, certificado SSL e suporte contínuo.',
    icon: 'RefreshCw',
    order: 0,
    badge: 'Modelo Principal',
    highlight: true,
    benefits: [
      'Planejamento e desenvolvimento sob medida',
      'Manutenção técnica e segurança inclusas',
      'Alterações de conteúdo mensais inclusas',
      'Transparência e cancelamento sem complicação',
    ],
  },
  {
    id: 'presenca-digital',
    name: 'Presença digital completa',
    description:
      'Site, Google e redes sociais trabalhando juntos para gerar resultados. Sua empresa passa a aparecer em destaque quando clientes buscam perto de você no Google e no Maps.',
    icon: 'Globe',
    order: 1,
    badge: 'Visibilidade Local',
    highlight: true,
    benefits: [
      'Configuração e otimização do Perfil Google de Empresa',
      'Integração direta com o Google Maps no site',
      'Botões de WhatsApp e Instagram flutuantes',
      'Otimização de SEO local para buscas da sua região',
    ],
  },
  {
    id: 'agendamento-online',
    name: 'Agendamento e pagamento online',
    description:
      'Seus clientes marcam horário e realizam pagamentos direto pelo site, 24 horas por dia. Menos trabalho manual de atendimento, menos faltas e mais conversões imediatas.',
    icon: 'CalendarCheck',
    order: 2,
    badge: 'Automação',
    highlight: true,
    benefits: [
      'Sistema de agenda online 24/7',
      'Confirmação automática de horários',
      'Integração com PIX e cartões',
      'Lembretes para reduzir faltas',
    ],
  },
  {
    id: 'placas-google',
    name: 'Placas Google (QR Code + NFC)',
    description:
      'Display físico personalizado em acrílico para o balcão da sua empresa. Os clientes avaliam seu negócio no Google em segundos apenas encostando o celular ou apontando a câmera.',
    icon: 'QrCode',
    order: 3,
    badge: 'Diferencial Físico',
    highlight: true,
    benefits: [
      'Tecnologia dupla: NFC por aproximação + QR Code',
      'Display acrílico personalizado com sua marca',
      'Multiplica suas avaliações 5 estrelas no Google',
      'Gera autoridade imediata no Google Maps',
    ],
  },
  {
    id: 'criacao-sites',
    name: 'Criação de sites',
    description:
      'Do design ao deploy. Sites modernos, rápidos e responsivos feitos sob medida para o seu negócio.',
    icon: 'Layout',
    order: 4,
  },
  {
    id: 'landing-pages',
    name: 'Landing pages',
    description:
      'Páginas focadas em conversão para campanhas, lançamentos e captação de leads qualificados.',
    icon: 'Rocket',
    order: 5,
  },
  {
    id: 'catalogos-online',
    name: 'Catálogos online',
    description:
      'Mostre seus produtos de forma organizada e profissional, sem complicação.',
    icon: 'GalleryVerticalEnd',
    order: 6,
  },
  {
    id: 'pagamentos-online',
    name: 'Pagamentos online',
    description:
      'Receba pagamentos pelo site com integração de gateways seguros e confiáveis.',
    icon: 'CreditCard',
    order: 7,
  },
  {
    id: 'seo-local',
    name: 'SEO local',
    description:
      'Sua empresa aparece no Google e no Maps quando alguém busca pelos seus serviços perto de você.',
    icon: 'MapPin',
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
