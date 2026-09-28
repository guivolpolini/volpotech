import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig as defaultSiteConfig, SiteConfig } from '@/data/siteConfig';
import { projects as defaultProjects, ProjectItem } from '@/data/projects';
import { services as defaultServices, ServiceItem } from '@/data/services';
import { plans as defaultPlans, PlanItem } from '@/data/plans';
import { faqs as defaultFaqs, FaqItem } from '@/data/faq';

export interface LeadItem {
  id: string;
  name: string;
  company?: string;
  whatsapp: string;
  email?: string;
  city?: string;
  plan?: string;
  type: 'orcamento' | 'contato';
  message?: string;
  date: string;
  status: 'novo' | 'em_atendimento' | 'concluido';
}

interface SiteContextType {
  config: SiteConfig;
  projects: ProjectItem[];
  services: ServiceItem[];
  plans: PlanItem[];
  faqs: FaqItem[];
  leads: LeadItem[];
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  updatePlan: (id: string, plan: Partial<PlanItem>) => void;
  addFaq: (faq: FaqItem) => void;
  updateFaq: (index: number, faq: FaqItem) => void;
  deleteFaq: (index: number) => void;
  addLead: (lead: Omit<LeadItem, 'id' | 'date' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadItem['status']) => void;
  deleteLead: (id: string) => void;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'volpotech_site_data_v1';

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_config`);
      return saved ? JSON.parse(saved) : defaultSiteConfig;
    } catch {
      return defaultSiteConfig;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return saved ? JSON.parse(saved) : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
      return saved ? JSON.parse(saved) : defaultServices;
    } catch {
      return defaultServices;
    }
  });

  const [plans, setPlans] = useState<PlanItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_plans`);
      return saved ? JSON.parse(saved) : defaultPlans;
    } catch {
      return defaultPlans;
    }
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_faqs`);
      return saved ? JSON.parse(saved) : defaultFaqs;
    } catch {
      return defaultFaqs;
    }
  });

  const [leads, setLeads] = useState<LeadItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_leads`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_config`, JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
    } catch (e) {
      console.error(e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_plans`, JSON.stringify(plans));
    } catch (e) {
      console.error(e);
    }
  }, [plans]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_faqs`, JSON.stringify(faqs));
    } catch (e) {
      console.error(e);
    }
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_leads`, JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
  }, [leads]);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const addProject = (projectData: Omit<ProjectItem, 'id'>) => {
    const newProject: ProjectItem = {
      ...projectData,
      id: 'proj_' + Date.now().toString(36),
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  const updatePlan = (id: string, updated: Partial<PlanItem>) => {
    setPlans((prev) =>
      prev.map((pl) => (pl.id === id ? { ...pl, ...updated } : pl))
    );
  };

  const addFaq = (faq: FaqItem) => {
    setFaqs((prev) => [...prev, faq]);
  };

  const updateFaq = (index: number, updated: FaqItem) => {
    setFaqs((prev) => prev.map((f, i) => (i === index ? updated : f)));
  };

  const deleteFaq = (index: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  const addLead = (leadData: Omit<LeadItem, 'id' | 'date' | 'status'>) => {
    const newLead: LeadItem = {
      ...leadData,
      id: 'lead_' + Date.now().toString(36),
      date: new Date().toLocaleString('pt-BR'),
      status: 'novo',
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLeadStatus = (id: string, status: LeadItem['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const resetToDefaults = () => {
    setConfig(defaultSiteConfig);
    setProjects(defaultProjects);
    setServices(defaultServices);
    setPlans(defaultPlans);
    setFaqs(defaultFaqs);
    localStorage.removeItem(`${STORAGE_KEY}_config`);
    localStorage.removeItem(`${STORAGE_KEY}_projects`);
    localStorage.removeItem(`${STORAGE_KEY}_services`);
    localStorage.removeItem(`${STORAGE_KEY}_plans`);
    localStorage.removeItem(`${STORAGE_KEY}_faqs`);
  };

  const exportData = () => {
    return JSON.stringify(
      {
        config,
        projects,
        services,
        plans,
        faqs,
        leads,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.config) setConfig(parsed.config);
      if (parsed.projects) setProjects(parsed.projects);
      if (parsed.services) setServices(parsed.services);
      if (parsed.plans) setPlans(parsed.plans);
      if (parsed.faqs) setFaqs(parsed.faqs);
      if (parsed.leads) setLeads(parsed.leads);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <SiteContext.Provider
      value={{
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
        updateService,
        updatePlan,
        addFaq,
        updateFaq,
        deleteFaq,
        addLead,
        updateLeadStatus,
        deleteLead,
        resetToDefaults,
        exportData,
        importData,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteProvider');
  }
  return context;
};
