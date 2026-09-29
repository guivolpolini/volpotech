import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  MessageCircle,
  FolderKanban,
  Settings,
  CreditCard,
  HelpCircle,
  Users,
  Wrench,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Eye,
  Sparkles,
  Copy,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useSiteData, LeadItem } from '@/context/SiteContext';
import { ProjectItem } from '@/data/projects';

export const AdminPage: React.FC = () => {
  const {
    config,
    projects,
    services,
    plans,
    faqs,
    leads,
    updateConfig,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    updatePlan,
    addPlan,
    deletePlan,
    addFaq,
    updateFaq,
    deleteFaq,
    updateLeadStatus,
    deleteLead,
    resetToDefaults,
    exportData,
    importData,
  } = useSiteData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('volpotech_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'leads' | 'general' | 'portfolio' | 'plans' | 'services' | 'faq' | 'backup'
  >('leads');

  // Success message toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedBriefingId, setExpandedBriefingId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // General Config Local State
  const [localConfig, setLocalConfig] = useState(config);
  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const handleSaveGeneralConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(localConfig);
    showToast('Configurações salvas com sucesso!');
  };

  // Project Modal / Edit State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Omit<ProjectItem, 'id'>>({
    title: '',
    slug: '',
    category: 'Sites',
    short_description: '',
    description: '',
    main_image: '/images/hero_showcase.webp',
    gallery: [],
    tech_stack: ['React', 'Tailwind CSS'],
    features: ['Design responsivo', 'Página institucional'],
    problem: '',
    solution: '',
    url: '',
  });

  // FAQ Modal / Edit State
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });
  const [isCreatingFaq, setIsCreatingFaq] = useState(false);

  // Plan Modal / Create State
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [planForm, setPlanForm] = useState({
    name: '',
    price: 99.9,
    description: '',
    featured: false,
    features: [
      'Site personalizado e exclusivo',
      'Design responsivo',
      'Botões de WhatsApp e redes sociais',
      'Hospedagem rápida e SSL inclusos',
      'Manutenção técnica contínua',
      'Suporte prioritário',
    ],
  });

  // Service Modal / Create State
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    icon: 'Layout',
    order: 0,
    badge: '',
    highlight: false,
    benefits: [] as string[],
  });

  // Authentication Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'Tobinho01!') {
      setIsAuthenticated(true);
      sessionStorage.setItem('volpotech_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Senha incorreta.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('volpotech_admin_auth');
  };

  // Backup Export/Import Handlers
  const handleDownloadBackup = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `volpotech_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup exportado com sucesso!');
  };

  const handleUploadBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importData(content)) {
        showToast('Backup restaurado com sucesso!');
      } else {
        alert('Arquivo de backup inválido.');
      }
    };
    reader.readAsText(file);
  };

  // If not logged in, render Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl glass border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mx-auto border border-primary/30">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-white">
              Painel Administrativo
            </h1>
            <p className="text-xs text-muted-foreground">
              Acesso exclusivo para gerenciamento de conteúdo da VolpoTech.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Senha de Acesso
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Digite a senha..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm"
              />
              {authError && (
                <p className="text-xs text-rose-400 mt-1.5">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm shadow-xl shadow-primary/25 transition-all"
            >
              Entrar no Painel
            </button>
          </form>

          <div className="text-center pt-2">
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-white transition-colors"
            >
              ← Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background text-foreground">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-white font-medium text-sm shadow-2xl shadow-emerald-500/30 animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Painel Administrativo
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 uppercase tracking-wider">
                Controle Total
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Altere qualquer texto, imagem, projeto ou preço do site em tempo real sem mexer em código.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Ver Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-4 mb-8 scrollbar-none border-b border-white/5">
          {[
            { id: 'leads', label: 'Leads & Orçamentos', icon: Users, badge: leads.length },
            { id: 'general', label: 'Textos & Contatos', icon: Settings },
            { id: 'portfolio', label: 'Portfólio (Cases)', icon: FolderKanban, badge: projects.length },
            { id: 'plans', label: 'Planos & Preços', icon: CreditCard },
            { id: 'services', label: 'Serviços', icon: Wrench },
            { id: 'faq', label: 'FAQ', icon: HelpCircle },
            { id: 'backup', label: 'Backup / Restaurar', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white/[0.02] text-muted-foreground hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-white text-primary' : 'bg-primary/20 text-primary'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: LEADS */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Briefing link banner for client sending */}
            <div className="p-4 sm:p-5 rounded-2xl glass border border-primary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-primary/5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-[11px] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Questionário de Briefing para Clientes</span>
                </div>
                <h3 className="text-sm sm:text-base font-heading font-bold text-white">
                  Envie o link para o cliente responder tudo o que você precisa
                </h3>
                <p className="text-xs text-muted-foreground">
                  As respostas caem instantaneamente em <strong>volpootech@gmail.com</strong> e ficam salvas abaixo nesta aba.
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <a
                  href="/orcamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial text-center px-4 py-2 rounded-xl glass border border-white/10 hover:border-white/20 text-white text-xs font-medium transition-colors"
                >
                  Abrir formulário
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const url = `${window.location.origin}/orcamento`;
                    navigator.clipboard.writeText(url);
                    showToast('Link do formulário copiado para a área de transferência!');
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold transition-all shadow-md shadow-primary/20"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar link</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">
                  Contatos, Orçamentos e Briefings Recebidos
                </h2>
                <p className="text-xs text-muted-foreground">
                  Gerencie as respostas recebidas pelo site e acompanhe o status de atendimento.
                </p>
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="text-center py-16 glass rounded-2xl border border-white/10 max-w-lg mx-auto space-y-3">
                <Users className="w-12 h-12 text-muted-foreground/40 mx-auto" />
                <h3 className="text-base font-semibold text-white">Nenhum lead recebido ainda</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Assim que um visitante preencher o formulário de orçamento, contato ou briefing no site, ele aparecerá aqui com os detalhes.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leads.map((lead: LeadItem) => {
                  const isBriefing = lead.type === 'briefing';
                  const isExpanded = expandedBriefingId === lead.id;
                  const b = lead.briefingData;

                  return (
                    <div
                      key={lead.id}
                      className={`p-6 rounded-2xl glass border transition-all space-y-4 relative ${
                        isBriefing ? 'border-primary/40 bg-primary/[0.02]' : 'border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span
                            className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${
                              isBriefing
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                : lead.type === 'orcamento'
                                ? 'bg-primary/20 text-primary border-primary/30'
                                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            }`}
                          >
                            {isBriefing ? 'Briefing de Projeto' : lead.type === 'orcamento' ? 'Orçamento' : 'Contato'}
                          </span>
                          <h3 className="text-lg font-heading font-bold text-white mt-1">
                            {lead.name}
                          </h3>
                          {lead.company && (
                            <p className="text-xs text-muted-foreground">Empresa: {lead.company}</p>
                          )}
                          <p className="text-[11px] text-muted-foreground mt-0.5">{lead.date}</p>
                        </div>

                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateLeadStatus(lead.id, e.target.value as LeadItem['status'])
                          }
                          className={`text-xs px-2.5 py-1 rounded-lg border outline-none font-medium ${
                            lead.status === 'novo'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : lead.status === 'em_atendimento'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-white/5 text-muted-foreground border-white/10'
                          }`}
                        >
                          <option value="novo">Novo</option>
                          <option value="em_atendimento">Em Atendimento</option>
                          <option value="concluido">Concluído</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 text-xs text-gray-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                        <p>
                          <strong>WhatsApp:</strong> {lead.whatsapp}
                        </p>
                        {lead.email && (
                          <p>
                            <strong>E-mail:</strong> {lead.email}
                          </p>
                        )}
                        {lead.city && (
                          <p>
                            <strong>Cidade:</strong> {lead.city}
                          </p>
                        )}
                        {lead.plan && (
                          <p>
                            <strong>Interesse:</strong> {lead.plan}
                          </p>
                        )}
                        {lead.message && (
                          <p className="pt-1 text-muted-foreground border-t border-white/5">
                            "{lead.message}"
                          </p>
                        )}
                      </div>

                      {/* DETALHES COMPLETOS DO BRIEFING (SE HOUVER) */}
                      {isBriefing && b && (
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedBriefingId(isExpanded ? null : lead.id)
                            }
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-xs text-white transition-colors"
                          >
                            <span className="flex items-center gap-1.5 font-medium">
                              <FileText className="w-3.5 h-3.5 text-primary" />
                              <span>{isExpanded ? 'Ocultar detalhes do briefing' : 'Ver todas as respostas do briefing'}</span>
                            </span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>

                          {isExpanded && (
                            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs space-y-3 animate-in fade-in duration-200">
                              <div>
                                <strong className="text-white">Ramo:</strong> {b.businessSegment}
                              </div>
                              <div>
                                <strong className="text-white">O que faz:</strong> {b.businessSummary}
                              </div>
                              {b.targetAudience && (
                                <div>
                                  <strong className="text-white">Público-alvo:</strong> {b.targetAudience}
                                </div>
                              )}
                              {b.mainDifferentials && (
                                <div>
                                  <strong className="text-white">Diferenciais:</strong> {b.mainDifferentials}
                                </div>
                              )}
                              <div>
                                <strong className="text-white">Objetivo do site:</strong> {b.siteGoal}
                              </div>
                              <div>
                                <strong className="text-white">Domínio:</strong> {b.hasDomain === 'sim' ? `Já tem (${b.domainName})` : b.hasDomain === 'nao' ? 'Não tem' : 'Precisa de ajuda'}
                              </div>
                              <div>
                                <strong className="text-white">Logotipo:</strong> {b.hasLogo}
                              </div>
                              <div>
                                <strong className="text-white">Páginas Desejadas ({b.pagesNeeded?.length || 0}):</strong>
                                <ul className="list-disc list-inside mt-1 text-muted-foreground space-y-0.5">
                                  {b.pagesNeeded?.map((p: string, idx: number) => (
                                    <li key={idx}>{p}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <strong className="text-white">Recursos Escolhidos:</strong>
                                <ul className="list-disc list-inside mt-1 text-muted-foreground space-y-0.5">
                                  {b.featuresNeeded?.map((f: string, idx: number) => (
                                    <li key={idx}>{f}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <strong className="text-white">Estilo Visual:</strong> {b.visualStyle}
                              </div>
                              {b.preferredColors && (
                                <div>
                                  <strong className="text-white">Cores:</strong> {b.preferredColors}
                                </div>
                              )}
                              {b.referenceWebsites && (
                                <div>
                                  <strong className="text-white">Sites de Referência:</strong> {b.referenceWebsites}
                                </div>
                              )}
                              {b.dislikedItems && (
                                <div>
                                  <strong className="text-white">O que evitar:</strong> {b.dislikedItems}
                                </div>
                              )}
                              <div>
                                <strong className="text-white">Situação do Conteúdo:</strong> {b.hasContentReady}
                              </div>
                              <div>
                                <strong className="text-white">Prazo:</strong> {b.deadlineExpectation}
                              </div>
                              {b.additionalNotes && (
                                <div>
                                  <strong className="text-white">Obs:</strong> {b.additionalNotes}
                                </div>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  const text = `Briefing: ${lead.company} (${lead.name})\nWhatsApp: ${lead.whatsapp}\nRamo: ${b.businessSegment}\nEstilo: ${b.visualStyle}\nPrazo: ${b.deadlineExpectation}\nPáginas:\n${b.pagesNeeded?.map((p: string) => ` - ${p}`).join('\n')}`;
                                  navigator.clipboard.writeText(text);
                                  showToast('Resumo do briefing copiado!');
                                }}
                                className="w-full mt-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[11px] font-medium transition-colors"
                              >
                                Copiar resumo deste briefing
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <a
                          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Olá ${lead.name}! Sou da VolpoTech. Vi sua solicitação ${isBriefing ? 'de briefing' : ''} no site e gostaria de conversar.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                          <span>Chamar no WhatsApp</span>
                        </a>

                        <button
                          onClick={() => {
                            if (confirm('Excluir este lead?')) deleteLead(lead.id);
                          }}
                          className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Excluir lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GENERAL CONFIG */}
        {activeTab === 'general' && (
          <form onSubmit={handleSaveGeneralConfig} className="space-y-8 max-w-4xl">
            {/* Contatos */}
            <div className="p-6 sm:p-8 rounded-2xl glass border border-white/10 space-y-6">
              <h3 className="text-lg font-heading font-bold text-white border-b border-white/5 pb-3">
                Canais de Contato & Localização
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    WhatsApp (apenas números com DDI + DDD)
                  </label>
                  <input
                    type="text"
                    value={localConfig.contact.whatsapp}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        contact: { ...localConfig.contact, whatsapp: e.target.value },
                      })
                    }
                    placeholder="Ex: 5511999999999"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-primary outline-none"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Este é o número que recebe todas as mensagens dos botões do site.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    E-mail Comercial
                  </label>
                  <input
                    type="email"
                    value={localConfig.contact.email}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        contact: { ...localConfig.contact, email: e.target.value },
                      })
                    }
                    placeholder="contato@volpotech.com.br"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Instagram URL
                  </label>
                  <input
                    type="text"
                    value={localConfig.contact.instagram}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        contact: { ...localConfig.contact, instagram: e.target.value },
                      })
                    }
                    placeholder="https://instagram.com/volpotech"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Cidade / Região
                  </label>
                  <input
                    type="text"
                    value={localConfig.contact.region}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        contact: { ...localConfig.contact, region: e.target.value },
                      })
                    }
                    placeholder="São Caetano do Sul — ABC Paulista"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Textos Principais (Hero) */}
            <div className="p-6 sm:p-8 rounded-2xl glass border border-white/10 space-y-6">
              <h3 className="text-lg font-heading font-bold text-white border-b border-white/5 pb-3">
                Textos da Página Inicial (Hero)
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Título Principal
                </label>
                <input
                  type="text"
                  value={localConfig.heroTitle}
                  onChange={(e) =>
                    setLocalConfig({ ...localConfig, heroTitle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Subtítulo Explicativo
                </label>
                <textarea
                  rows={3}
                  value={localConfig.heroSubtitle}
                  onChange={(e) =>
                    setLocalConfig({ ...localConfig, heroSubtitle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Texto do Botão Primário
                  </label>
                  <input
                    type="text"
                    value={localConfig.heroCtaPrimary}
                    onChange={(e) =>
                      setLocalConfig({ ...localConfig, heroCtaPrimary: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Texto do Botão Secundário
                  </label>
                  <input
                    type="text"
                    value={localConfig.heroCtaSecondary}
                    onChange={(e) =>
                      setLocalConfig({ ...localConfig, heroCtaSecondary: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Placa Google */}
            <div className="p-6 sm:p-8 rounded-2xl glass border border-white/10 space-y-6">
              <h3 className="text-lg font-heading font-bold text-white border-b border-white/5 pb-3">
                Seção Placa Google de Avaliações
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Título da Seção
                </label>
                <input
                  type="text"
                  value={localConfig.plateTitle}
                  onChange={(e) =>
                    setLocalConfig({ ...localConfig, plateTitle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Subtítulo / Descrição
                </label>
                <textarea
                  rows={2}
                  value={localConfig.plateSubtitle}
                  onChange={(e) =>
                    setLocalConfig({ ...localConfig, plateSubtitle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  URL da Imagem da Placa
                </label>
                <input
                  type="text"
                  value={localConfig.plateImage || '/images/google_plate_real.jpg'}
                  onChange={(e) =>
                    setLocalConfig({ ...localConfig, plateImage: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-primary outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm shadow-xl shadow-primary/25 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Alterações Globais</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">
                  Cases de Portfólio ({projects.length})
                </h2>
                <p className="text-xs text-muted-foreground">
                  Adicione, edite ou remova os projetos exibidos no portfólio.
                </p>
              </div>
              <button
                onClick={() => {
                  setProjectForm({
                    title: '',
                    slug: '',
                    category: 'Sites',
                    short_description: '',
                    description: '',
                    main_image: '/images/hero_showcase.webp',
                    gallery: [],
                    tech_stack: ['React', 'Tailwind CSS'],
                    features: ['Design responsivo'],
                    problem: '',
                    solution: '',
                    url: '',
                  });
                  setIsCreatingProject(true);
                  setEditingProject(null);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-lg shadow-primary/25 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Projeto</span>
              </button>
            </div>

            {/* List of projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl glass border border-white/10 overflow-hidden flex flex-col justify-between"
                >
                  <div className="aspect-[16/10] relative bg-card">
                    <img
                      src={proj.main_image}
                      alt={proj.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-background/80 text-primary border border-white/10">
                      {proj.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-white text-base">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {proj.short_description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setProjectForm(proj);
                          setIsCreatingProject(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Excluir o projeto "${proj.title}"?`)) {
                            deleteProject(proj.id);
                            showToast('Projeto excluído com sucesso.');
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Excluir projeto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Edit / Create Modal */}
            {(isCreatingProject || editingProject) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto">
                <div className="w-full max-w-2xl bg-card border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5 my-8 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-lg font-heading font-bold text-white">
                      {isCreatingProject ? 'Adicionar Novo Projeto' : `Editar: ${editingProject?.title}`}
                    </h3>
                    <button
                      onClick={() => {
                        setIsCreatingProject(false);
                        setEditingProject(null);
                      }}
                      className="text-muted-foreground hover:text-white text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Título do Projeto *
                        </label>
                        <input
                          type="text"
                          required
                          value={projectForm.title}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, title: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Categoria
                        </label>
                        <select
                          value={projectForm.category}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              category: e.target.value as ProjectItem['category'],
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-card border border-white/10 text-white text-sm outline-none"
                        >
                          <option value="Sites">Sites</option>
                          <option value="Lojas">Lojas</option>
                          <option value="Landing Pages">Landing Pages</option>
                          <option value="Sistemas">Sistemas</option>
                          <option value="Outros">Outros</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Caminho ou URL da Imagem Principal
                      </label>
                      <input
                        type="text"
                        value={projectForm.main_image}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, main_image: e.target.value })
                        }
                        placeholder="/images/project_1_main.png"
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Descrição Curta
                      </label>
                      <input
                        type="text"
                        value={projectForm.short_description}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, short_description: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Descrição Completa
                      </label>
                      <textarea
                        rows={3}
                        value={projectForm.description}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, description: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          O Desafio
                        </label>
                        <textarea
                          rows={2}
                          value={projectForm.problem}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, problem: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Nossa Solução
                        </label>
                        <textarea
                          rows={2}
                          value={projectForm.solution}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, solution: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Link do Site no Ar (opcional)
                      </label>
                      <input
                        type="url"
                        value={projectForm.url || ''}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, url: e.target.value })
                        }
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingProject(false);
                        setEditingProject(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white text-xs font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (isCreatingProject) {
                          addProject(projectForm);
                          showToast('Projeto criado com sucesso!');
                        } else if (editingProject) {
                          updateProject(editingProject.id, projectForm);
                          showToast('Projeto atualizado com sucesso!');
                        }
                        setIsCreatingProject(false);
                        setEditingProject(null);
                      }}
                      className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-lg shadow-primary/25"
                    >
                      Salvar Projeto
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PLANS */}
        {activeTab === 'plans' && (
          <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">
                  Planos e Preços ({plans.length})
                </h2>
                <p className="text-xs text-muted-foreground">
                  Altere os preços das mensalidades, adicione novos planos ou exclua planos existentes.
                </p>
              </div>
              <button
                onClick={() => {
                  setPlanForm({
                    name: '',
                    price: 99.9,
                    description: '',
                    featured: false,
                    features: [
                      'Site personalizado e exclusivo',
                      'Design 100% responsivo (celular e PC)',
                      'Botões de WhatsApp e Instagram',
                      'Hospedagem rápida, SSL e domínio inclusos',
                      'Manutenção técnica contínua',
                      'Suporte prioritário',
                    ],
                  });
                  setIsCreatingPlan(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-lg shadow-primary/25 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Plano</span>
              </button>
            </div>

            {/* Toggle: Hide or Show prices in public site */}
            <div className="p-5 rounded-2xl glass border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      Modo "Orçamento Sob Medida" (Ocultar Preços Públicos)
                    </h3>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        config.hidePrices
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {config.hidePrices ? 'Preços Ocultos (Sob Consulta)' : 'Preços Visíveis em R$'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Quando ativado, os valores em R$ ficam ocultos no site. Os planos exibem "Sob Consulta / Sob Medida" e os botões direcionam o cliente para você combinar o valor pessoalmente.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={config.hidePrices ?? true}
                    onChange={(e) => {
                      updateConfig({ hidePrices: e.target.checked });
                      showToast(
                        e.target.checked
                          ? 'Preços ocultos: exibindo Sob Consulta'
                          : 'Preços visíveis em R$ no site'
                      );
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-gray-300 font-medium">
                  Ação ao clicar no botão do plano:
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white">
                    <input
                      type="radio"
                      name="plansCtaDestination"
                      checked={config.plansCtaDestination !== 'orcamento'}
                      onChange={() => {
                        updateConfig({ plansCtaDestination: 'whatsapp' });
                        showToast('Botão configurado para abrir WhatsApp.');
                      }}
                      className="text-primary focus:ring-0"
                    />
                    <span>Abrir WhatsApp (com mensagem do plano)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white">
                    <input
                      type="radio"
                      name="plansCtaDestination"
                      checked={config.plansCtaDestination === 'orcamento'}
                      onChange={() => {
                        updateConfig({ plansCtaDestination: 'orcamento' });
                        showToast('Botão configurado para página de orçamento.');
                      }}
                      className="text-primary focus:ring-0"
                    />
                    <span>Página de Orçamento (/orcamento)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`p-6 rounded-2xl glass border space-y-4 flex flex-col justify-between transition-all ${
                    plan.featured ? 'border-primary/50 shadow-xl shadow-primary/10' : 'border-white/10'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => updatePlan(plan.id, { name: e.target.value })}
                        placeholder="Nome do plano"
                        className="font-heading font-bold text-lg text-white bg-transparent border-b border-white/10 focus:border-primary outline-none pb-0.5 w-full"
                      />
                      {plan.featured && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary text-white shrink-0">
                          Destaque
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] text-muted-foreground font-medium block mb-1">
                        Valor da Mensalidade (R$):
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-muted-foreground">R$</span>
                        <input
                          type="number"
                          step="0.10"
                          value={plan.price}
                          onChange={(e) =>
                            updatePlan(plan.id, { price: parseFloat(e.target.value) || 0 })
                          }
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white font-bold text-sm outline-none focus:border-primary"
                        />
                        <span className="text-xs text-muted-foreground">/mês</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-muted-foreground mb-1">
                        Descrição do plano:
                      </label>
                      <input
                        type="text"
                        value={plan.description}
                        onChange={(e) =>
                          updatePlan(plan.id, { description: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-muted-foreground mb-1">
                        Recursos inclusos (um por linha):
                      </label>
                      <textarea
                        rows={6}
                        value={plan.features.join('\n')}
                        onChange={(e) =>
                          updatePlan(plan.id, {
                            features: e.target.value.split('\n').filter(Boolean),
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none font-mono focus:border-primary"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={plan.featured}
                        onChange={(e) => updatePlan(plan.id, { featured: e.target.checked })}
                        className="rounded border-white/20 text-primary focus:ring-0 w-4 h-4"
                      />
                      <span>Marcar como "Mais Escolhido"</span>
                    </label>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => showToast(`Plano "${plan.name}" salvo com sucesso!`)}
                      className="flex-1 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-md shadow-primary/20 transition-all"
                    >
                      Salvar Plano
                    </button>

                    <button
                      onClick={() => {
                        if (plans.length <= 1) {
                          alert('O site deve ter pelo menos 1 plano cadastrado.');
                          return;
                        }
                        if (confirm(`Tem certeza que deseja excluir o plano "${plan.name}"?`)) {
                          deletePlan(plan.id);
                          showToast(`Plano "${plan.name}" excluído.`);
                        }
                      }}
                      className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 border border-white/5 transition-colors"
                      title="Excluir este plano"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Creating New Plan */}
            {isCreatingPlan && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                <div className="w-full max-w-lg bg-card border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-lg font-heading font-bold text-white">
                      Adicionar Novo Plano
                    </h3>
                    <button
                      onClick={() => setIsCreatingPlan(false)}
                      className="text-muted-foreground hover:text-white text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Nome do Plano *
                      </label>
                      <input
                        type="text"
                        required
                        value={planForm.name}
                        onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                        placeholder="Ex: Corporativo / Personalizado"
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Mensalidade (R$/mês) *
                      </label>
                      <input
                        type="number"
                        step="0.10"
                        required
                        value={planForm.price}
                        onChange={(e) =>
                          setPlanForm({ ...planForm, price: parseFloat(e.target.value) || 0 })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none focus:border-primary font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Descrição do Plano
                      </label>
                      <input
                        type="text"
                        value={planForm.description}
                        onChange={(e) =>
                          setPlanForm({ ...planForm, description: e.target.value })
                        }
                        placeholder="Ex: Ideal para empresas com grande fluxo de vendas..."
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Recursos Inclusos (um item por linha)
                      </label>
                      <textarea
                        rows={6}
                        value={planForm.features.join('\n')}
                        onChange={(e) =>
                          setPlanForm({
                            ...planForm,
                            features: e.target.value.split('\n').filter(Boolean),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-primary font-mono"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={planForm.featured}
                        onChange={(e) => setPlanForm({ ...planForm, featured: e.target.checked })}
                        className="rounded border-white/20 text-primary focus:ring-0 w-4 h-4"
                      />
                      <span>Destacar como "Mais Escolhido" na página inicial</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsCreatingPlan(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white text-xs font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!planForm.name.trim()) {
                          alert('Por favor, informe o nome do plano.');
                          return;
                        }
                        addPlan(planForm);
                        showToast(`Plano "${planForm.name}" adicionado com sucesso!`);
                        setIsCreatingPlan(false);
                      }}
                      className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
                    >
                      Criar Plano
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">
                  Serviços ({services.length})
                </h2>
                <p className="text-xs text-muted-foreground">
                  Edite, adicione ou exclua serviços. As alterações refletem imediatamente na página de Serviços e na Home.
                </p>
              </div>
              <button
                onClick={() => {
                  setServiceForm({
                    name: '',
                    description: '',
                    icon: 'Layout',
                    order: services.length,
                    badge: '',
                    highlight: false,
                    benefits: [],
                  });
                  setIsCreatingService(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-lg shadow-primary/25 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Serviço</span>
              </button>
            </div>

            <div className="space-y-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-5 rounded-2xl glass border border-white/10 space-y-4 transition-all"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                    <div className="sm:col-span-4 space-y-1">
                      <label className="block text-[10px] text-muted-foreground uppercase font-bold">
                        Nome do Serviço
                      </label>
                      <input
                        type="text"
                        value={srv.name}
                        onChange={(e) => updateService(srv.id, { name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-semibold outline-none focus:border-primary"
                      />
                    </div>

                    <div className="sm:col-span-8 space-y-1">
                      <label className="block text-[10px] text-muted-foreground uppercase font-bold">
                        Descrição
                      </label>
                      <textarea
                        rows={2}
                        value={srv.description}
                        onChange={(e) => updateService(srv.id, { description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Highlights options: badge and benefits */}
                  <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                        <input
                          type="checkbox"
                          checked={!!srv.highlight}
                          onChange={(e) => updateService(srv.id, { highlight: e.target.checked })}
                          className="rounded border-white/20 text-primary focus:ring-0 w-3.5 h-3.5"
                        />
                        <span>Destacar no topo de /servicos</span>
                      </label>

                      {srv.highlight && (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">Selo:</span>
                          <input
                            type="text"
                            value={srv.badge || ''}
                            placeholder="Ex: Modelo Principal"
                            onChange={(e) => updateService(srv.id, { badge: e.target.value })}
                            className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast(`Serviço "${srv.name}" salvo com sucesso!`)}
                        className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-medium transition-all"
                      >
                        Salvar
                      </button>

                      <button
                        onClick={() => {
                          if (services.length <= 1) {
                            alert('Você deve manter pelo menos 1 serviço cadastrado.');
                            return;
                          }
                          if (confirm(`Tem certeza que deseja excluir o serviço "${srv.name}"?`)) {
                            deleteService(srv.id);
                            showToast(`Serviço "${srv.name}" excluído.`);
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 border border-white/5 transition-colors"
                        title="Excluir este serviço"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {srv.highlight && (
                    <div className="pt-2 border-t border-white/5">
                      <label className="block text-[10px] text-muted-foreground uppercase font-bold mb-1">
                        Diferenciais / Benefícios inclusos (um por linha):
                      </label>
                      <textarea
                        rows={3}
                        value={(srv.benefits || []).join('\n')}
                        onChange={(e) =>
                          updateService(srv.id, {
                            benefits: e.target.value.split('\n').filter(Boolean),
                          })
                        }
                        placeholder="Item 1&#10;Item 2&#10;Item 3"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-primary font-mono"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal for Creating New Service */}
            {isCreatingService && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                <div className="w-full max-w-lg bg-card border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-lg font-heading font-bold text-white">
                      Adicionar Novo Serviço
                    </h3>
                    <button
                      onClick={() => setIsCreatingService(false)}
                      className="text-muted-foreground hover:text-white text-sm"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Nome do Serviço *
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceForm.name}
                        onChange={(e) =>
                          setServiceForm({ ...serviceForm, name: e.target.value })
                        }
                        placeholder="Ex: Consultoria de Tráfego Pago"
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Descrição do Serviço *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={serviceForm.description}
                        onChange={(e) =>
                          setServiceForm({ ...serviceForm, description: e.target.value })
                        }
                        placeholder="Explique o que este serviço entrega para o cliente..."
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none focus:border-primary"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={serviceForm.highlight}
                        onChange={(e) =>
                          setServiceForm({ ...serviceForm, highlight: e.target.checked })
                        }
                        className="rounded border-white/20 text-primary focus:ring-0 w-4 h-4"
                      />
                      <span>Destacar no topo da página /servicos</span>
                    </label>

                    {serviceForm.highlight && (
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">
                            Selo / Badge (opcional)
                          </label>
                          <input
                            type="text"
                            value={serviceForm.badge}
                            onChange={(e) =>
                              setServiceForm({ ...serviceForm, badge: e.target.value })
                            }
                            placeholder="Ex: Mais Procurado"
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">
                            Lista de Benefícios (um por linha)
                          </label>
                          <textarea
                            rows={3}
                            value={serviceForm.benefits.join('\n')}
                            onChange={(e) =>
                              setServiceForm({
                                ...serviceForm,
                                benefits: e.target.value.split('\n').filter(Boolean),
                              })
                            }
                            placeholder="Item 1&#10;Item 2"
                            className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-primary font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsCreatingService(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white text-xs font-medium"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!serviceForm.name.trim()) {
                          alert('Informe o nome do serviço.');
                          return;
                        }
                        addService(serviceForm);
                        showToast(`Serviço "${serviceForm.name}" adicionado com sucesso!`);
                        setIsCreatingService(false);
                      }}
                      className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
                    >
                      Criar Serviço
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">
                  Dúvidas Frequentes (FAQ)
                </h2>
                <p className="text-xs text-muted-foreground">
                  Perguntas e respostas exibidas na página inicial e nas páginas de serviços.
                </p>
              </div>
              <button
                onClick={() => {
                  setFaqForm({ question: '', answer: '' });
                  setIsCreatingFaq(true);
                  setEditingFaqIndex(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-lg shadow-primary/25"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Pergunta</span>
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl glass border border-white/10 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <h4 className="font-heading font-bold text-white text-sm">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setEditingFaqIndex(idx);
                        setFaqForm(faq);
                        setIsCreatingFaq(false);
                      }}
                      className="p-2 rounded-lg text-muted-foreground hover:text-white transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Excluir esta pergunta?')) {
                          deleteFaq(idx);
                          showToast('Pergunta removida.');
                        }
                      }}
                      className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Edit/Create Modal */}
            {(isCreatingFaq || editingFaqIndex !== null) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                <div className="w-full max-w-lg bg-card border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
                  <h3 className="text-lg font-heading font-bold text-white">
                    {isCreatingFaq ? 'Nova Pergunta' : 'Editar Pergunta'}
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Pergunta:
                      </label>
                      <input
                        type="text"
                        value={faqForm.question}
                        onChange={(e) =>
                          setFaqForm({ ...faqForm, question: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Resposta:
                      </label>
                      <textarea
                        rows={4}
                        value={faqForm.answer}
                        onChange={(e) =>
                          setFaqForm({ ...faqForm, answer: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      onClick={() => {
                        setIsCreatingFaq(false);
                        setEditingFaqIndex(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white text-xs"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (!faqForm.question.trim() || !faqForm.answer.trim()) return;
                        if (isCreatingFaq) {
                          addFaq(faqForm);
                          showToast('Pergunta adicionada!');
                        } else if (editingFaqIndex !== null) {
                          updateFaq(editingFaqIndex, faqForm);
                          showToast('Pergunta atualizada!');
                        }
                        setIsCreatingFaq(false);
                        setEditingFaqIndex(null);
                      }}
                      className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
                    >
                      Salvar Pergunta
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: BACKUP & RESTAURAÇÃO */}
        {activeTab === 'backup' && (
          <div className="space-y-8 max-w-3xl">
            <div>
              <h2 className="text-xl font-heading font-bold text-white">
                Backup e Restauração de Dados
              </h2>
              <p className="text-xs text-muted-foreground">
                Exporte todo o conteúdo do site em um arquivo JSON para segurança, ou restaure um backup anterior.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Export */}
              <div className="p-6 rounded-2xl glass border border-white/10 space-y-3">
                <Download className="w-8 h-8 text-primary" />
                <h3 className="font-heading font-bold text-white text-base">
                  Exportar Backup Completo
                </h3>
                <p className="text-xs text-muted-foreground">
                  Gera um arquivo JSON contendo todas as configurações, cases de portfólio, serviços, preços e leads.
                </p>
                <button
                  onClick={handleDownloadBackup}
                  className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-semibold shadow-lg shadow-primary/25"
                >
                  Baixar Arquivo JSON
                </button>
              </div>

              {/* Import */}
              <div className="p-6 rounded-2xl glass border border-white/10 space-y-3">
                <Upload className="w-8 h-8 text-accent" />
                <h3 className="font-heading font-bold text-white text-base">
                  Restaurar de Backup
                </h3>
                <p className="text-xs text-muted-foreground">
                  Carregue um arquivo JSON de backup salvo anteriormente para restaurar todas as alterações instantaneamente.
                </p>
                <label className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center cursor-pointer border border-white/10 transition-colors">
                  <span>Selecionar arquivo JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleUploadBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Reset to Factory Defaults */}
            <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <RotateCcw className="w-5 h-5" />
                <span>Restaurar Valores Padrão de Fábrica</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Atenção: Isso redefinirá todos os textos, planos e projetos para o estado original inicial do site.
              </p>
              <button
                onClick={() => {
                  if (
                    confirm(
                      'Tem certeza que deseja redefinir todas as alterações para o padrão de fábrica?'
                    )
                  ) {
                    resetToDefaults();
                    setLocalConfig(config);
                    showToast('Site redefinido para os padrões de fábrica.');
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-lg shadow-rose-500/20 transition-all"
              >
                Resetar para o Padrão
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
