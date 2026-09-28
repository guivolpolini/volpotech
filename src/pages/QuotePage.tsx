import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { useSiteData } from '@/context/SiteContext';

export const QuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPlan = searchParams.get('plano') || searchParams.get('servico') || '';
  const { config, addLead } = useSiteData();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    whatsapp: '',
    email: '',
    instagram: '',
    city: config.contact.city,
    businessType: '',
    hasWebsite: 'Não',
    selectedPlan: initialPlan.includes('prof')
      ? 'Plano Profissional'
      : initialPlan.includes('placa')
      ? 'Placa Google de Avaliações'
      : 'Plano Essencial',
    urgency: 'Nas próximas 2 semanas',
    features: [] as string[],
    goals: '',
  });

  const handleTextChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feat: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feat)
        ? prev.features.filter((f) => f !== feat)
        : [...prev.features, feat],
    }));
  };

  const featureOptions = [
    'Catálogo de Produtos',
    'Agendamento Online 24h',
    'Recebimento PIX / Cartão',
    'Placa Google com QR Code e NFC',
    'Integração Google Maps e SEO Local',
    'Galeria de Fotos / Antes e Depois',
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!formData.name.trim() || !formData.whatsapp.trim()) {
        alert('Por favor, preencha pelo menos seu Nome e WhatsApp para continuarmos.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Save lead to local context/storage for admin dashboard
      addLead({
        name: formData.name,
        company: formData.company,
        whatsapp: formData.whatsapp,
        email: formData.email,
        city: formData.city,
        plan: formData.selectedPlan,
        type: 'orcamento',
        message: `Ramo: ${formData.businessType} | Prazo: ${formData.urgency} | Recursos: ${formData.features.join(', ')} | Objetivo: ${formData.goals}`,
      });
      setSubmitted(true);
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `*Nova Solicitação de Orçamento - VolpoTech*
---------------------------------------
*Nome:* ${formData.name}
*Empresa:* ${formData.company || 'Não informada'}
*WhatsApp:* ${formData.whatsapp}
*E-mail:* ${formData.email || 'Não informado'}
*Instagram:* ${formData.instagram || 'Não informado'}
*Cidade:* ${formData.city}

*Plano/Interesse:* ${formData.selectedPlan}
*Ramo/Atividade:* ${formData.businessType || 'Não informado'}
*Já possui site:* ${formData.hasWebsite}
*Prazo:* ${formData.urgency}
*Recursos Desejados:* ${formData.features.length > 0 ? formData.features.join(', ') : 'Padrão do plano'}

*Objetivo/Observações:*
${formData.goals || 'Gostaria de saber mais informações e iniciar o projeto.'}`;
    return text;
  };

  const dynamicWhatsAppUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(
    generateWhatsAppMessage()
  )}`;

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Solicite sua proposta
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Seu novo site pronto em poucos passos.
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Leva menos de 2 minutos. Sem compromisso e sem custo inicial.
          </p>
        </div>

        {/* Stepper Indicators */}
        {!submitted && (
          <div className="flex items-center justify-between max-w-md mx-auto mb-10 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
            {[
              { num: 1, label: 'Identidade' },
              { num: 2, label: 'Negócio' },
              { num: 3, label: 'Visão' },
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;
              return (
                <div key={step.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      isPast
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : isActive
                        ? 'bg-primary text-white ring-4 ring-primary/20 shadow-lg shadow-primary/25'
                        : 'bg-card text-muted-foreground border border-white/10'
                    }`}
                  >
                    {isPast ? <Check className="w-5 h-5" /> : step.num}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      isActive ? 'text-white font-semibold' : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Form Card */}
        <div className="rounded-3xl glass border border-white/10 p-6 sm:p-10 shadow-2xl relative">
          {!submitted ? (
            <form onSubmit={handleNext} className="space-y-6">
              {/* STEP 1: Identidade */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Seu nome *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleTextChange('name', e.target.value)}
                        placeholder="Ex: Guilherme"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Nome da sua empresa
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleTextChange('company', e.target.value)}
                        placeholder="Ex: Barbearia do Centro"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        WhatsApp comercial *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => handleTextChange('whatsapp', e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleTextChange('email', e.target.value)}
                        placeholder="contato@suaempresa.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={formData.instagram}
                        onChange={(e) => handleTextChange('instagram', e.target.value)}
                        placeholder="@suaempresa"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Cidade / Região
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleTextChange('city', e.target.value)}
                        placeholder="São Caetano do Sul - SP"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Negócio */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Qual é o seu ramo de atuação?
                    </label>
                    <input
                      type="text"
                      value={formData.businessType}
                      onChange={(e) => handleTextChange('businessType', e.target.value)}
                      placeholder="Ex: Ótica, Oficina mecânica, Loja de roupas, Consultório..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Plano ou serviço desejado
                      </label>
                      <select
                        value={formData.selectedPlan}
                        onChange={(e) => handleTextChange('selectedPlan', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      >
                        <option value="Plano Essencial">Plano Essencial</option>
                        <option value="Plano Profissional">Plano Profissional</option>
                        <option value="Placa Google de Avaliações">Placa Google de Avaliações</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Projeto Sob Medida">Projeto Sob Medida</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Já possui algum site atualmente?
                      </label>
                      <select
                        value={formData.hasWebsite}
                        onChange={(e) => handleTextChange('hasWebsite', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-card border border-white/10 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                      >
                        <option value="Não, será meu primeiro site">Não, será meu primeiro site</option>
                        <option value="Sim, mas quero renovar completamente">Sim, mas quero renovar</option>
                        <option value="Tenho apenas redes sociais">Tenho apenas redes sociais</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">
                      Recursos que gostaria de ter no site:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {featureOptions.map((feat) => {
                        const checked = formData.features.includes(feat);
                        return (
                          <button
                            type="button"
                            key={feat}
                            onClick={() => toggleFeature(feat)}
                            className={`p-3 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${
                              checked
                                ? 'bg-primary/15 border-primary text-white font-medium'
                                : 'bg-white/[0.02] border-white/10 text-muted-foreground hover:border-white/20'
                            }`}
                          >
                            <span>{feat}</span>
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center border ${
                                checked ? 'bg-primary border-primary text-white' : 'border-white/20'
                              }`}
                            >
                              {checked && <Check className="w-3 h-3" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Visão */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Qual é o principal objetivo do site para sua empresa?
                    </label>
                    <textarea
                      rows={4}
                      value={formData.goals}
                      onChange={(e) => handleTextChange('goals', e.target.value)}
                      placeholder="Ex: Quero aparecer no Google quando alguém buscar por produtos na minha cidade, ter um botão direto para o WhatsApp e exibir meus horários de funcionamento."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-muted-foreground space-y-1">
                    <p className="font-semibold text-white">Resumo da sua proposta:</p>
                    <p>• Contato: {formData.name} ({formData.whatsapp})</p>
                    <p>• Empresa: {formData.company || 'Pessoa Física/Empresa'} - {formData.city}</p>
                    <p>• Plano: {formData.selectedPlan}</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary hover:bg-primary/90 text-white text-sm font-semibold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
                >
                  <span>{currentStep === 3 ? 'Finalizar proposta' : 'Avançar'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Submission Success & Direct WhatsApp Action */
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-bold text-white">
                  Proposta gerada com sucesso, {formData.name}!
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Para agilizar seu atendimento sem esperar, envie os dados diretamente para nosso WhatsApp oficial.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left max-w-md mx-auto text-xs space-y-2 font-mono text-gray-300">
                <p className="text-primary font-bold">📋 Dados da Proposta:</p>
                <p><strong>Nome:</strong> {formData.name}</p>
                <p><strong>WhatsApp:</strong> {formData.whatsapp}</p>
                <p><strong>Plano:</strong> {formData.selectedPlan}</p>
                <p><strong>Cidade:</strong> {formData.city}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={dynamicWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Conversar no WhatsApp agora</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
