import React, { useState } from 'react';
import {
  User,
  Building,
  Palette,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  Loader2,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useSiteData, BriefingData } from '@/context/SiteContext';

const AVAILABLE_PAGES = [
  'Início / Home (com destaques e chamada para ação)',
  'Sobre Nós / Quem Somos (história, valores e equipe)',
  'Serviços / Especialidades (detalhamento do que oferece)',
  'Catálogo / Portfólio / Projetos Realizados',
  'Depoimentos de Clientes & Prova Social',
  'Contato & Localização (com mapa integrado)',
  'Dúvidas Frequentes (FAQ interativo)',
  'Blog / Notícias / Artigos',
];

const AVAILABLE_FEATURES = [
  'Botão flutuante de WhatsApp com mensagem personalizada',
  'Formulário de contato / orçamento direto por e-mail',
  'Localização interativa no Google Maps',
  'Integração com Placa NFC / Avaliações Google 5 Estrelas',
  'Sistema de Agendamento online ou link Cal.com/Calendly',
  'Galeria de fotos com zoom / Antes e Depois',
  'Catálogo de produtos ou tabela de preços em PDF',
  'Botões de chamada rápida para ligação telefônica',
];

const VISUAL_STYLES = [
  { id: 'moderno', label: 'Moderno & Clean', desc: 'Visual leve, espaçoso, tipografia elegante e minimalista' },
  { id: 'tecnologico', label: 'Tecnológico & Dark', desc: 'Visual futurista, tons escuros, luzes neon e visual tech' },
  { id: 'corporativo', label: 'Corporativo & Tradicional', desc: 'Visual sóbrio, formal, transmita autoridade e solidez' },
  { id: 'acolhedor', label: 'Acolhedor & Humanizado', desc: 'Tons quentes, foco em pessoas, atendimento e proximidade' },
  { id: 'criativo', label: 'Criativo & Ousado', desc: 'Cores vibrantes, contrastes marcantes e design diferenciado' },
];

export const BriefingPage: React.FC = () => {
  const { config, addLead } = useSiteData();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState<BriefingData>({
    contactName: '',
    companyName: '',
    whatsapp: '',
    email: '',
    cityState: '',
    instagram: '',
    businessSegment: '',
    businessSummary: '',
    targetAudience: '',
    mainDifferentials: '',
    siteGoal: 'Gerar mais contatos e pedidos de orçamento pelo WhatsApp',
    hasDomain: 'preciso_ajuda',
    domainName: '',
    hasLogo: 'vetor_alta',
    pagesNeeded: [
      'Início / Home (com destaques e chamada para ação)',
      'Sobre Nós / Quem Somos (história, valores e equipe)',
      'Serviços / Especialidades (detalhamento do que oferece)',
      'Contato & Localização (com mapa integrado)'
    ],
    featuresNeeded: [
      'Botão flutuante de WhatsApp com mensagem personalizada',
      'Formulário de contato / orçamento direto por e-mail',
      'Localização interativa no Google Maps'
    ],
    preferredColors: '',
    visualStyle: 'Moderno & Clean',
    referenceWebsites: '',
    dislikedItems: '',
    hasContentReady: 'parcial',
    deadlineExpectation: 'Normal (1 a 2 semanas)',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = (field: keyof BriefingData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePage = (page: string) => {
    setFormData((prev) => {
      const exists = prev.pagesNeeded.includes(page);
      return {
        ...prev,
        pagesNeeded: exists
          ? prev.pagesNeeded.filter((p) => p !== page)
          : [...prev.pagesNeeded, page],
      };
    });
  };

  const toggleFeature = (feat: string) => {
    setFormData((prev) => {
      const exists = prev.featuresNeeded.includes(feat);
      return {
        ...prev,
        featuresNeeded: exists
          ? prev.featuresNeeded.filter((f) => f !== feat)
          : [...prev.featuresNeeded, feat],
      };
    });
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.contactName.trim()) {
        alert('Por favor, informe seu nome.');
        return false;
      }
      if (!formData.companyName.trim()) {
        alert('Por favor, informe o nome da sua empresa.');
        return false;
      }
      if (!formData.whatsapp.trim()) {
        alert('Por favor, informe seu WhatsApp para contato.');
        return false;
      }
      if (!formData.email.trim()) {
        alert('Por favor, informe seu e-mail.');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.businessSegment.trim()) {
        alert('Por favor, informe o ramo de atuação do seu negócio.');
        return false;
      }
      if (!formData.businessSummary.trim()) {
        alert('Por favor, resuma brevemente o que sua empresa oferece.');
        return false;
      }
    }
    if (step === 3) {
      if (formData.pagesNeeded.length === 0) {
        alert('Selecione pelo menos 1 página para o site.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const generateSummaryText = () => {
    return `📋 *BRIEFING DE PROJETO - VOLPOTECH*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *1. Responsável & Empresa*
• Nome: ${formData.contactName}
• Empresa: ${formData.companyName}
• WhatsApp: ${formData.whatsapp}
• E-mail: ${formData.email}
• Cidade/UF: ${formData.cityState || 'Não informado'}
• Instagram: ${formData.instagram || 'Não informado'}

💼 *2. Sobre o Negócio*
• Ramo: ${formData.businessSegment}
• Resumo: ${formData.businessSummary}
• Público-Alvo: ${formData.targetAudience || 'Geral'}
• Diferenciais: ${formData.mainDifferentials || 'Não informado'}
• Objetivo do Site: ${formData.siteGoal}

🌐 *3. Estrutura do Site*
• Domínio: ${formData.hasDomain === 'sim' ? `Já possui (${formData.domainName})` : formData.hasDomain === 'nao' ? 'Não possui' : 'Precisa de ajuda'}
• Logotipo: ${formData.hasLogo === 'vetor_alta' ? 'Tem vetor/alta resolução' : formData.hasLogo === 'imagem_simples' ? 'Tem imagem simples' : 'Precisa criar'}
• Páginas Desejadas (${formData.pagesNeeded.length}):
${formData.pagesNeeded.map((p) => `  - ${p}`).join('\n')}
• Recursos Selecionados:
${formData.featuresNeeded.map((f) => `  - ${f}`).join('\n')}

🎨 *4. Identidade & Estilo*
• Estilo Visual: ${formData.visualStyle}
• Cores de Preferência: ${formData.preferredColors || 'A critério da VolpoTech'}
• Sites de Referência: ${formData.referenceWebsites || 'Nenhum informado'}
• O que NÃO quer: ${formData.dislikedItems || 'Nenhuma restrição'}

⏳ *5. Conteúdo & Prazos*
• Textos e Fotos: ${formData.hasContentReady === 'tudo_pronto' ? 'Tudo pronto' : formData.hasContentReady === 'parcial' ? 'Parcialmente pronto' : 'Precisa de ajuda com criação'}
• Prazo Desejado: ${formData.deadlineExpectation}
• Observações Adicionais: ${formData.additionalNotes || 'Nenhuma'}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) return;

    setIsSubmitting(true);

    const fullSummary = generateSummaryText();

    // 1. Salvar no contexto e painel administrativo local
    addLead({
      name: formData.contactName,
      company: formData.companyName,
      whatsapp: formData.whatsapp,
      email: formData.email,
      city: formData.cityState,
      type: 'briefing',
      message: `Briefing recebido: ${formData.companyName} (${formData.businessSegment}) - Estilo: ${formData.visualStyle}`,
      briefingData: formData,
    });

    // 2. Disparar e-mail diretamente para volpootech@gmail.com via FormSubmit
    try {
      await fetch('https://formsubmit.co/ajax/volpootech@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `🚀 Novo Briefing de Site: ${formData.companyName} (${formData.contactName})`,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false',
          'Nome do Responsável': formData.contactName,
          'Empresa': formData.companyName,
          'WhatsApp': formData.whatsapp,
          'E-mail': formData.email,
          'Cidade e Estado': formData.cityState || 'Não informado',
          'Instagram': formData.instagram || 'Não informado',
          'Ramo de Atuação': formData.businessSegment,
          'O que a Empresa Faz': formData.businessSummary,
          'Público-Alvo': formData.targetAudience || 'Não informado',
          'Diferencial Competitivo': formData.mainDifferentials || 'Não informado',
          'Objetivo do Site': formData.siteGoal,
          'Situação do Domínio': formData.hasDomain + (formData.domainName ? ` (${formData.domainName})` : ''),
          'Situação do Logotipo': formData.hasLogo,
          'Páginas Selecionadas': formData.pagesNeeded.join('; '),
          'Recursos Selecionados': formData.featuresNeeded.join('; '),
          'Estilo Visual Escolhido': formData.visualStyle,
          'Cores Preferidas': formData.preferredColors || 'Livre / VolpoTech',
          'Sites de Referência': formData.referenceWebsites || 'Nenhum',
          'O que Evitar no Site': formData.dislikedItems || 'Nenhum',
          'Situação do Conteúdo': formData.hasContentReady,
          'Expectativa de Prazo': formData.deadlineExpectation,
          'Observações Finais': formData.additionalNotes || 'Nenhuma',
          'Resumo Completo Formatado': fullSummary,
        }),
      });
    } catch (err) {
      console.warn('FormSubmit envio automático finalizado com fallback:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsAppUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(
    `Olá Guilherme! Acabei de enviar o briefing pelo site para o projeto da empresa *${formData.companyName}*.\n\nFico no aguardo do contato!`
  )}`;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Briefing de Criação de Site</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            Conte tudo sobre o seu projeto
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Preencha este formulário para que possamos entender o seu negócio, desenhar a estrutura ideal e criar um site sob medida que gera resultados.
          </p>
        </div>

        {submitted ? (
          /* TELA DE SUCESSO */
          <div className="p-8 sm:p-12 rounded-3xl glass border border-emerald-500/30 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                Briefing enviado com sucesso!
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Todas as informações do projeto da <strong className="text-white">{formData.companyName}</strong> foram registradas e enviadas para nossa equipe em <strong className="text-emerald-400">volpootech@gmail.com</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 max-w-lg mx-auto text-xs text-muted-foreground text-left space-y-1">
              <p className="font-semibold text-white">Próximos passos:</p>
              <p>1. Analisamos detalhadamente seus objetivos e referências.</p>
              <p>2. Entramos em contato via WhatsApp ({formData.whatsapp}) para alinhar os detalhes e apresentar a proposta ideal.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Avisar no WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={copyToClipboard}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass border border-white/10 hover:border-white/20 text-white font-medium text-sm transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Resumo copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-primary" />
                    <span>Copiar resumo do briefing</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* FORMULÁRIO MULTI-ETAPAS */
          <div className="rounded-3xl glass border border-white/10 shadow-2xl overflow-hidden">
            {/* Barra de Progresso */}
            <div className="bg-white/[0.02] border-b border-white/10 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold text-primary uppercase tracking-wider">
                  Etapa {currentStep} de {totalSteps}
                </span>
                <span className="text-muted-foreground">
                  {currentStep === 1 && 'Identificação & Contato'}
                  {currentStep === 2 && 'Sobre o Negócio'}
                  {currentStep === 3 && 'Estrutura & Recursos'}
                  {currentStep === 4 && 'Identidade Visual & Estilo'}
                  {currentStep === 5 && 'Materiais, Prazos & Envio'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>

              {/* Indicadores de Etapas */}
              <div className="grid grid-cols-5 gap-1 mt-4 text-center">
                {[
                  { num: 1, label: 'Contato', icon: User },
                  { num: 2, label: 'Negócio', icon: Building },
                  { num: 3, label: 'Estrutura', icon: Layers },
                  { num: 4, label: 'Estilo', icon: Palette },
                  { num: 5, label: 'Prazo', icon: Clock },
                ].map((s) => {
                  const Icon = s.icon;
                  const isDone = currentStep > s.num;
                  const isCurrent = currentStep === s.num;
                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => {
                        if (s.num < currentStep) setCurrentStep(s.num);
                      }}
                      className={`flex flex-col items-center gap-1 transition-all ${
                        isCurrent
                          ? 'text-primary font-bold'
                          : isDone
                          ? 'text-white cursor-pointer'
                          : 'text-muted-foreground/50 cursor-not-allowed'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                          isCurrent
                            ? 'bg-primary text-white ring-2 ring-primary/40'
                            : isDone
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white/5 text-muted-foreground'
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-[10px] hidden sm:inline">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Conteúdo da Etapa */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              {/* ETAPA 1: CONTATO */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      <span>Identificação e Contato</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Quem é o responsável pelo projeto e como podemos entrar em contato.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => updateField('contactName', e.target.value)}
                        placeholder="Ex: Guilherme Silva"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Nome da Empresa ou Negócio *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => updateField('companyName', e.target.value)}
                        placeholder="Ex: Clínica Sorriso / Loja Elegance"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        WhatsApp com DDD *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => updateField('whatsapp', e.target.value)}
                        placeholder="Ex: (11) 98765-4321"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Seu Melhor E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="Ex: contato@empresa.com.br"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Cidade e Estado (UF)
                      </label>
                      <input
                        type="text"
                        value={formData.cityState}
                        onChange={(e) => updateField('cityState', e.target.value)}
                        placeholder="Ex: São Paulo - SP"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Instagram da Empresa (opcional)
                      </label>
                      <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => updateField('instagram', e.target.value)}
                        placeholder="Ex: @suaempresa"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 2: SOBRE O NEGÓCIO */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      <span>Sobre o seu Negócio</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Conte o que você vende, quem compra e o que torna sua empresa especial.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Ramo de Atuação / Segmento *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.businessSegment}
                        onChange={(e) => updateField('businessSegment', e.target.value)}
                        placeholder="Ex: Advocacia tributária, Barbearia premium, Consultório odontológico, Construtora..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        O que a sua empresa faz e quais os principais serviços ou produtos? *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.businessSummary}
                        onChange={(e) => updateField('businessSummary', e.target.value)}
                        placeholder="Descreva resumidamente os serviços mais importantes que você deseja destacar no site..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Quem é o seu Público-Alvo?
                        </label>
                        <textarea
                          rows={2}
                          value={formData.targetAudience}
                          onChange={(e) => updateField('targetAudience', e.target.value)}
                          placeholder="Ex: Homens e mulheres de 25 a 50 anos, donos de empresas locais, famílias..."
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Quais são os diferenciais do seu negócio?
                        </label>
                        <textarea
                          rows={2}
                          value={formData.mainDifferentials}
                          onChange={(e) => updateField('mainDifferentials', e.target.value)}
                          placeholder="Ex: 10 anos de mercado, garantia total, atendimento rápido, tecnologia exclusiva..."
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm resize-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Qual é o principal objetivo do novo site?
                      </label>
                      <select
                        value={formData.siteGoal}
                        onChange={(e) => updateField('siteGoal', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:outline-none focus:border-primary text-sm"
                      >
                        <option value="Gerar mais contatos e pedidos de orçamento pelo WhatsApp">
                          Gerar mais contatos e pedidos de orçamento pelo WhatsApp
                        </option>
                        <option value="Apresentar a empresa com autoridade e credibilidade institucional">
                          Apresentar a empresa com autoridade e credibilidade institucional
                        </option>
                        <option value="Agendamento online de consultas ou serviços">
                          Agendamento online de consultas ou horários
                        </option>
                        <option value="Exibir portfólio completo de trabalhos realizados">
                          Exibir portfólio completo de trabalhos realizados
                        </option>
                        <option value="Vender produtos online / Loja virtual">
                          Vender produtos online / Loja virtual
                        </option>
                        <option value="Outro objetivo">Outro objetivo</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 3: ESTRUTURA & RECURSOS */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-primary" />
                      <span>Estrutura e Recursos do Site</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Defina as páginas e funcionalidades essenciais que o seu site terá.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Domínio */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                      <label className="block text-xs font-semibold text-white">
                        Já possui Domínio (ex: www.suaempresa.com.br)?
                      </label>
                      <select
                        value={formData.hasDomain}
                        onChange={(e) => updateField('hasDomain', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-white/10 text-white text-xs"
                      >
                        <option value="sim">Sim, já tenho registrado</option>
                        <option value="nao">Não tenho ainda</option>
                        <option value="preciso_ajuda">Preciso de ajuda da VolpoTech para registrar</option>
                      </select>
                      {formData.hasDomain === 'sim' && (
                        <input
                          type="text"
                          value={formData.domainName}
                          onChange={(e) => updateField('domainName', e.target.value)}
                          placeholder="Informe seu domínio (ex: clinicaexemplo.com.br)"
                          className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs mt-2"
                        />
                      )}
                    </div>

                    {/* Logotipo */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                      <label className="block text-xs font-semibold text-white">
                        Situação do Logotipo da Empresa:
                      </label>
                      <select
                        value={formData.hasLogo}
                        onChange={(e) => updateField('hasLogo', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-white/10 text-white text-xs"
                      >
                        <option value="vetor_alta">Tenho em alta resolução (PNG transparente / vetor / PDF)</option>
                        <option value="imagem_simples">Tenho apenas foto simples / JPG comum</option>
                        <option value="preciso_criacao">Não tenho logotipo, preciso de criação</option>
                      </select>
                      <p className="text-[11px] text-muted-foreground">
                        Arquivos em vetor ou PNG transparente garantem a melhor qualidade visual no site.
                      </p>
                    </div>
                  </div>

                  {/* Páginas do Site */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-semibold text-white">
                      Quais seções ou páginas você gostaria no site? (Selecione as que deseja):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {AVAILABLE_PAGES.map((page) => {
                        const isChecked = formData.pagesNeeded.includes(page);
                        return (
                          <div
                            key={page}
                            onClick={() => togglePage(page)}
                            className={`p-3 rounded-xl border text-xs cursor-pointer flex items-start gap-2.5 transition-all select-none ${
                              isChecked
                                ? 'bg-primary/10 border-primary/40 text-white'
                                : 'bg-white/[0.02] border-white/10 text-muted-foreground hover:border-white/20'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                                isChecked
                                  ? 'bg-primary border-primary text-white'
                                  : 'border-white/20 bg-white/5'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3" />}
                            </div>
                            <span>{page}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recursos Essenciais */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-semibold text-white">
                      Recursos e Funcionalidades desejadas:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {AVAILABLE_FEATURES.map((feat) => {
                        const isChecked = formData.featuresNeeded.includes(feat);
                        return (
                          <div
                            key={feat}
                            onClick={() => toggleFeature(feat)}
                            className={`p-3 rounded-xl border text-xs cursor-pointer flex items-start gap-2.5 transition-all select-none ${
                              isChecked
                                ? 'bg-accent/10 border-accent/40 text-white'
                                : 'bg-white/[0.02] border-white/10 text-muted-foreground hover:border-white/20'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                                isChecked
                                  ? 'bg-accent border-accent text-white'
                                  : 'border-white/20 bg-white/5'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3" />}
                            </div>
                            <span>{feat}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 4: IDENTIDADE & REFERÊNCIAS */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                      <Palette className="w-5 h-5 text-primary" />
                      <span>Identidade Visual & Referências</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Ajude-nos a acertar no visual exato que mais agrada você e seu público.
                    </p>
                  </div>

                  {/* Estilo Visual */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-semibold text-white">
                      Qual estilo visual melhor representa o que você quer?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {VISUAL_STYLES.map((style) => {
                        const isSelected = formData.visualStyle === style.label;
                        return (
                          <div
                            key={style.id}
                            onClick={() => updateField('visualStyle', style.label)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all select-none ${
                              isSelected
                                ? 'bg-primary/10 border-primary text-white ring-1 ring-primary/40'
                                : 'bg-white/[0.02] border-white/10 text-muted-foreground hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-heading font-semibold text-sm text-white">
                                {style.label}
                              </span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                              {style.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Cores de Preferência ou Paleta da Marca
                    </label>
                    <input
                      type="text"
                      value={formData.preferredColors}
                      onChange={(e) => updateField('preferredColors', e.target.value)}
                      placeholder="Ex: Azul marinho e dourado, Preto fosco com detalhes verdes, Tons pastéis..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Sites que você gosta como referência (concorrentes ou outros segmentos)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.referenceWebsites}
                      onChange={(e) => updateField('referenceWebsites', e.target.value)}
                      placeholder="Cole links de 1 a 3 sites que você acha bonitos, modernos ou organizados..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Existe algo que você NÃO gostaria de ver no seu site?
                    </label>
                    <input
                      type="text"
                      value={formData.dislikedItems}
                      onChange={(e) => updateField('dislikedItems', e.target.value)}
                      placeholder="Ex: Cores muito chamativas, excesso de texto, pop-ups chatos, etc."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>
              )}

              {/* ETAPA 5: MATERIAIS & PRAZO */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Conteúdo, Prazos & Envio</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Última etapa para recebermos o projeto e enviarmos tudo ao e-mail da VolpoTech.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Você já possui textos e fotos prontos?
                      </label>
                      <select
                        value={formData.hasContentReady}
                        onChange={(e) => updateField('hasContentReady', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:outline-none focus:border-primary text-sm"
                      >
                        <option value="tudo_pronto">Sim, tenho todos os textos e fotos organizados</option>
                        <option value="parcial">Tenho fotos e ideias, mas preciso de apoio nos textos</option>
                        <option value="preciso_criacao">Não tenho nada, preciso de criação completa pela VolpoTech</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Qual a sua expectativa de prazo para o lançamento?
                      </label>
                      <select
                        value={formData.deadlineExpectation}
                        onChange={(e) => updateField('deadlineExpectation', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-white/10 text-white focus:outline-none focus:border-primary text-sm"
                      >
                        <option value="Normal (1 a 2 semanas)">Normal (1 a 2 semanas) - Prazo padrão</option>
                        <option value="Urgente (menos de 7 dias)">Urgente (menos de 7 dias) - Tenho pressa</option>
                        <option value="Sem pressa (1 mês ou mais)">Sem pressa (1 mês ou mais) - Em planejamento</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Observações ou detalhes adicionais importantes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.additionalNotes}
                      onChange={(e) => updateField('additionalNotes', e.target.value)}
                      placeholder="Algum detalhe específico, horário de atendimento, integração com sistema externo ou dúvida..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm resize-none"
                    />
                  </div>

                  {/* Resumo Rápido antes do Envio */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs">
                    <span className="font-semibold text-white uppercase tracking-wider text-[11px] block">
                      Resumo da Solicitação:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-muted-foreground">
                      <div>
                        <strong className="text-gray-300">Empresa:</strong> {formData.companyName || '-'}
                      </div>
                      <div>
                        <strong className="text-gray-300">Responsável:</strong> {formData.contactName || '-'}
                      </div>
                      <div>
                        <strong className="text-gray-300">WhatsApp:</strong> {formData.whatsapp || '-'}
                      </div>
                      <div>
                        <strong className="text-gray-300">Páginas:</strong> {formData.pagesNeeded.length} selecionadas
                      </div>
                      <div>
                        <strong className="text-gray-300">Estilo:</strong> {formData.visualStyle}
                      </div>
                      <div>
                        <strong className="text-gray-300">Destino:</strong> volpootech@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Botões de Ação */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 hover:border-white/20 text-white font-medium text-xs transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar etapa</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs transition-all shadow-lg shadow-primary/20"
                  >
                    <span>Próxima etapa</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white font-bold text-sm transition-all shadow-xl shadow-primary/25 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enviando briefing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Finalizar e Enviar Briefing</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BriefingPage;
