# VolpoTech — Site Institucional e Plataforma

Site completo e 100% independente da **VolpoTech**

## 🚀 Destaques do Projeto

- **Assets 100% locais:** Todas as 23 imagens (hero, placa Google, logos e capturas de tela do portfólio) foram baixadas e ficam na pasta local `public/images/`.
- **Stack moderna e ultrarrápida:** Vite + React + TypeScript + Tailwind CSS + Lucide Icons + React Router.
- **Design de alta fidelidade:** Modo escuro nativo (#07070a), tipografia Sora & Inter, efeitos glassmorphism e microinterações.
- **Funil de conversão completo:**
  - **Início (`/`):** Hero, 4 passos ("Como funciona"), cases em destaque, serviços, planos com destaque para o Profissional, seção da Placa Google NFC/QR Code, FAQ interativo e CTA.
  - **Portfólio (`/portfolio`):** Filtro dinâmico por categoria (Sites, Lojas, Landing Pages, Sistemas, Outros) e cards de todos os 6 cases reais.
  - **Detalhes do Projeto (`/portfolio/:id`):** Página dedicada para cada case com galeria interativa de telas, desafio, solução, tecnologias e link para site no ar.
  - **Serviços (`/servicos`):** Detalhamento dos 4 pilares principais e dos 10 serviços oferecidos.
  - **Orçamento (`/orcamento`):** Formulário multi-step em 3 etapas (Identidade -> Negócio -> Visão) com gerador automático de mensagem para o WhatsApp.
  - **Contato (`/contato`):** Canais diretos (WhatsApp, e-mail, Instagram, localização) e formulário integrado.

---

## ⚙️ Como Configurar Contatos e Conteúdo

Todos os dados da empresa e dos serviços são centralizados na pasta `src/data/`:

- **Contatos e Textos Globais:** `src/data/siteConfig.ts` (altere o número do WhatsApp, e-mail, redes sociais e textos da hero).
- **Projetos do Portfólio:** `src/data/projects.ts` (adicione, edite ou remova cases).
- **Planos e Preços:** `src/data/plans.ts` (ajuste valores, recursos e descrições).
- **Serviços:** `src/data/services.ts`.
- **Dúvidas Frequentes (FAQ):** `src/data/faq.ts`.

---

## 🛠️ Comandos

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento (HMR rápido)
npm run dev

# Gerar build de produção otimizado
npm run build

# Pré-visualizar build localmente
npm run preview
```
