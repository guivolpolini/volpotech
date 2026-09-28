export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: 'Sites' | 'Lojas' | 'Landing Pages' | 'Sistemas' | 'Outros';
  short_description: string;
  description: string;
  main_image: string;
  gallery: string[];
  tech_stack: string[];
  features: string[];
  problem: string;
  solution: string;
  url?: string;
}

export const projects: ProjectItem[] = [
  {
    id: '6ab1f118182771f2149c9b15',
    slug: 'otica-gg-visao',
    title: 'Ótica G&G Visão',
    category: 'Sites',
    short_description:
      'Site institucional para ótica em São Caetano do Sul, com apresentação de armações, lentes e multifocais.',
    description:
      'Site desenvolvido para a Ótica G&G Visão, com apresentação das armações, óculos de grau, lentes multifocais, confecção e ajustes, além do atendimento personalizado da loja em São Caetano do Sul.',
    main_image: '/images/project_1_main.png',
    gallery: [
      '/images/project_1_gallery_1.png',
      '/images/project_1_gallery_2.png',
      '/images/project_1_gallery_3.png',
    ],
    tech_stack: ['React', 'Tailwind CSS'],
    features: [
      'Apresentação de produtos/serviços',
      'Design responsivo',
      'Identidade visual própria',
      'Página institucional',
    ],
    problem:
      'A Ótica G&G Visão não tinha um site que apresentasse seus produtos e diferenciais (atendimento personalizado, preço justo) para atrair novos clientes online.',
    solution:
      'Criação de um site institucional destacando os produtos (armações, lentes, multifocais) e serviços (confecção e ajustes), reforçando o posicionamento de atendimento 5 estrelas e preço justo.',
    url: 'https://g-g-vis-o-optical-boutique-otlqgz.sticklight.app',
  },
  {
    id: '6ab1efd8bdcab71535fe1809',
    slug: 'barbearia-pedrao',
    title: 'Barbearia Pedrão',
    category: 'Sites',
    short_description:
      'Site institucional para barbearia em São Caetano do Sul, com apresentação de serviços de corte, barba e sobrancelha.',
    description:
      'Site desenvolvido para a Barbearia Pedrão, com foco nos serviços oferecidos — corte, barba, combo e sobrancelha — em São Caetano do Sul. O site apresenta a identidade da barbearia ("a arte do corte, o ritual do homem"), sistema de agendamento online e contato direto via WhatsApp.',
    main_image: '/images/project_2_main.png',
    gallery: [
      '/images/project_2_gallery_1.png',
      '/images/project_2_gallery_2.png',
    ],
    tech_stack: ['React', 'Tailwind CSS'],
    features: [
      'Apresentação de serviços',
      'Design responsivo',
      'Identidade visual própria',
      'Página institucional',
      'Sistema de agendamento online',
    ],
    problem:
      'A Barbearia Pedrão não tinha presença digital para apresentar seus serviços e facilitar o agendamento ou contato dos clientes.',
    solution:
      'Criação de um site institucional com apresentação dos serviços (corte, barba, combo, sobrancelha), sistema de agendamento online para os clientes marcarem horário sem precisar ligar, e botão de contato direto via WhatsApp.',
    url: 'https://barbearia-pedrao.base44.app',
  },
  {
    id: '6ab1ede69040ef15af9552a4',
    slug: 'quase-tudo',
    title: 'Quase Tudo',
    category: 'Sites',
    short_description:
      'Site institucional para loja de materiais de construção em São Caetano do Sul, com catálogo de produtos e avaliações do Google integradas.',
    description:
      'Site desenvolvido para a Quase Tudo, loja de materiais de construção (elétrica, hidráulica, ferramentas e tintas) em Santa Maria, São Caetano do Sul. Apresenta as seções de produtos, avaliações de clientes do Google (4,6/5 em 383 avaliações), informações de contato, endereço e horário de funcionamento, com contato direto via WhatsApp e telefone.',
    main_image: '/images/project_3_main.png',
    gallery: [
      '/images/project_3_gallery_1.png',
      '/images/project_3_gallery_2.png',
    ],
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Catálogo de produtos por categoria',
      'Avaliações de clientes (Google)',
      'Botão de WhatsApp',
      'Página de contato com mapa/endereço',
      'Design responsivo',
    ],
    problem:
      'A Quase Tudo, apesar de bem avaliada no Google, não tinha um site próprio que reunisse o catálogo de produtos, horários e formas de contato em um só lugar.',
    solution:
      'Criação de um site com páginas de produtos por seção (elétrica, hidráulica, ferramentas, tintas), exibição das avaliações de clientes, informações de localização/horário e contato direto via WhatsApp e telefone.',
    url: 'https://pixel-perfect-view-8834.lovable.app',
  },
  {
    id: '6ab1ed3d949dbb64d37d45a9',
    slug: 'bazar-madeira',
    title: 'Bazar Madeira',
    category: 'Sites',
    short_description:
      'Site institucional para loja de moda familiar em São Caetano do Sul, com compra direta via WhatsApp.',
    description:
      'Site desenvolvido para o Bazar Madeira, loja de roupas femininas, masculinas, infantis e para toda a família em São Caetano do Sul. Apresenta as novidades da loja com compra facilitada diretamente pelo WhatsApp.',
    main_image: '/images/project_4_main.png',
    gallery: [
      '/images/project_4_gallery_1.png',
      '/images/project_4_gallery_2.png',
    ],
    tech_stack: ['React', 'Tailwind CSS', 'shadcn/ui', 'Vite'],
    features: [
      'Vitrine de produtos',
      'Botão de WhatsApp integrado',
      'Design responsivo para todos dispositivos',
      'Categorias por público (feminino/masculino/infantil)',
      'Painel administrador',
    ],
    problem:
      'O Bazar Madeira não tinha presença online, dependendo apenas do ponto físico para atrair clientes e divulgar novidades de moda.',
    solution:
      'Criação de um site institucional com vitrine das peças e categorias (feminino, masculino, infantil), com botão de compra/contato via WhatsApp para agilizar o atendimento.',
    url: 'https://bazar-madeira-style.base44.app',
  },
  {
    id: '6ab1ec44e97abc4aa9da10d4',
    slug: 'wanda-variedades',
    title: 'Wanda Variedades',
    category: 'Sites',
    short_description:
      'Site institucional para loja de variedades com perfumes, cosméticos, bolsas e calçados de marcas conhecidas.',
    description:
      'Site institucional desenvolvido para a Wanda Variedades, loja que comercializa perfumes, cosméticos, bolsas e calçados de marcas como Natura, Eudora, Boticário, Amakha Paris e Tupperware. O site reúne o catálogo de produtos e informações da loja em um só lugar, facilitando a descoberta pelos clientes.',
    main_image: '/images/project_5_main.png',
    gallery: [
      '/images/project_5_gallery_1.png',
      '/images/project_5_gallery_2.png',
    ],
    tech_stack: ['React', 'Tailwind CSS'],
    features: [
      'Catálogo de produtos',
      'Design responsivo',
      'Página institucional',
      'Múltiplas marcas/categorias',
      'Painel administrador',
    ],
    problem:
      'A Wanda Variedades vendia produtos de diversas marcas sem um canal digital que reunisse tudo em um só lugar, dificultando que clientes soubessem a variedade de produtos disponíveis.',
    solution:
      'Criação de um site institucional apresentando o catálogo de marcas e categorias (perfumes, cosméticos, bolsas e calçados), com identidade visual própria e foco em facilitar a navegação do cliente.',
    url: 'https://wanda-variedades.sticklight.app',
  },
  {
    id: '6ab1eb228cbf460c3452dff1',
    slug: 'auto-eletrica-jf',
    title: 'Auto Elétrica JF',
    category: 'Sites',
    short_description:
      'Site institucional para oficina de elétrica automotiva em São Caetano do Sul, com foco em geração de contato via WhatsApp.',
    description:
      'Site institucional desenvolvido para a Auto Elétrico JF, especializada em serviços elétricos e diagnóstico automotivo em São Caetano do Sul. O projeto apresenta os serviços oferecidos, informações sobre a empresa e localização, com botão de contato direto via WhatsApp para agilizar orçamentos e agendamentos.',
    main_image: '/images/project_6_main.png',
    gallery: [
      '/images/project_6_gallery_1.png',
      '/images/project_6_gallery_2.png',
    ],
    tech_stack: ['React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Botão de WhatsApp',
      'Design responsivo',
      'Seção de serviços',
      'Localização/mapa',
      'Página institucional',
    ],
    problem:
      'A Auto Elétrico JF não tinha presença digital: clientes não conseguiam encontrar os serviços, horário de funcionamento ou forma de contato pela internet, dependendo só de indicação boca a boca.',
    solution:
      'Criação de um site institucional responsivo com apresentação dos serviços (elétrica automotiva e diagnóstico), botão de contato direto via WhatsApp e localização em São Caetano do Sul, facilitando o primeiro contato do cliente.',
    url: 'https://auto-jf-site.lovable.app/#inicio',
  },
];
