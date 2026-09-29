export interface PlanItem {
  id: string;
  name: string;
  price: number; // valor do plano (R$/mês)
  description: string;
  featured: boolean;
  features: string[];
  additionalBenefits?: string[];
}

export const plans: PlanItem[] = [
  {
    id: 'essencial',
    name: 'Essencial',
    price: 69.9,
    description: 'Ideal para começar com presença profissional.',
    featured: false,
    features: [
      'Site personalizado e exclusivo',
      'Até 5 páginas',
      'Design 100% responsivo (celular e PC)',
      'Botões de WhatsApp e Instagram',
      'Google Maps integrado',
      'Formulário de contato',
      'Hospedagem rápida, SSL e domínio inclusos',
      'Manutenção técnica contínua',
      'Até 2 alterações/mês',
      'Suporte padrão em horário comercial',
    ],
  },
  {
    id: 'profissional',
    name: 'Profissional',
    price: 89.9,
    description: 'Para quem quer vender e se destacar mais na internet.',
    featured: true,
    features: [
      'Tudo incluído no plano Essencial',
      'Até 10 páginas completas',
      'Área administrativa simplificada',
      'Cadastro de produtos / serviços',
      'Galeria de fotos de alta resolução',
      'Catálogo online com link para WhatsApp',
      'SEO local otimizado para o Google',
      'Integração com Google Perfil de Empresa',
      'Animações modernas e interativas',
      'Até 5 alterações/mês',
      'Suporte prioritário',
    ],
    additionalBenefits: [
      'Sistema de agendamento online',
      'Pagamento online / PIX integrado',
      'Otimização contínua de velocidade',
    ],
  },
];
