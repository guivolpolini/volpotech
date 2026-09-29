import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  Instagram,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useSiteData } from '@/context/SiteContext';
import { maskPhone, isValidPhone, isValidEmail } from '@/utils/masks';

export const ContactPage: React.FC = () => {
  const { config, addLead } = useSiteData();
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const whatsAppDirectUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(
    'Olá! Vim pelo site da VolpoTech e quero saber mais sobre criação de sites.'
  )}`;

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!name.trim() || name.trim().length < 3) {
      errs.name = 'Por favor, informe seu nome completo (mínimo 3 letras).';
    }

    if (!whatsapp.trim()) {
      errs.whatsapp = 'Por favor, informe seu WhatsApp com DDD.';
    } else if (!isValidPhone(whatsapp)) {
      errs.whatsapp = 'WhatsApp inválido. Digite DDD + 9 dígitos, ex: (11) 98765-4321.';
    }

    if (email.trim() && !isValidEmail(email)) {
      errs.email = 'E-mail inválido. Digite um e-mail no formato nome@dominio.com.';
    }

    if (!message.trim() || message.trim().length < 5) {
      errs.message = 'Por favor, descreva em poucas palavras o que sua empresa precisa.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const fullMessage = `*Mensagem de Contato - VolpoTech*
---------------------------------------
*Nome:* ${name}
*WhatsApp:* ${whatsapp}
*E-mail:* ${email || 'Não informado'}

*Mensagem:*
${message}`;

    // Disparar e-mail em segundo plano para volpootech@gmail.com
    fetch('https://formsubmit.co/ajax/volpootech@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `💬 Novo Contato do Site: ${name}`,
        _replyto: email || undefined,
        _template: 'table',
        _captcha: 'false',
        'Nome': name,
        'WhatsApp': whatsapp,
        'E-mail': email || 'Não informado',
        'Mensagem': message,
      }),
    }).catch((err) => console.warn(err));

    // Salvar lead no painel administrativo
    addLead({
      name,
      whatsapp,
      email,
      type: 'contato',
      message,
    });

    // Abrir WhatsApp diretamente
    const url = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank');
    setSent(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Contato
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Vamos conversar
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            O WhatsApp é nosso canal mais rápido. Ou, se preferir, envie uma mensagem pelo formulário abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct channels (Left) */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp */}
            <a
              href={whatsAppDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl glass border border-white/10 hover:border-emerald-500/40 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="text-base font-heading font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  WhatsApp
                </h3>
                <p className="text-xs text-muted-foreground">
                  Resposta rápida em horário comercial
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${config.contact.email}`}
              className="p-6 rounded-2xl glass border border-white/10 hover:border-primary/40 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-heading font-semibold text-white group-hover:text-primary transition-colors">
                  E-mail
                </h3>
                <p className="text-xs text-muted-foreground">
                  {config.contact.email}
                </p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={config.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl glass border border-white/10 hover:border-pink-500/40 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-heading font-semibold text-white group-hover:text-pink-400 transition-colors">
                  Instagram
                </h3>
                <p className="text-xs text-muted-foreground">
                  {config.contact.instagramHandle}
                </p>
              </div>
            </a>

            {/* Location & Hours */}
            <div className="p-6 rounded-2xl glass border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-heading font-semibold text-white">
                  Localização
                </h3>
                <p className="text-xs text-muted-foreground">
                  {config.contact.region}
                </p>
              </div>
            </div>
          </div>

          {/* Form (Right) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass border border-white/10 shadow-2xl">
              {sent ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white">
                    Mensagem encaminhada!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Obrigado pelo contato. Responderemos o mais rápido possível no seu WhatsApp ou e-mail.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-heading font-bold text-white mb-2">
                    Envie uma mensagem
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder="Seu nome"
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-muted-foreground outline-none transition-colors text-sm ${
                        errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        WhatsApp (com DDD) *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={15}
                        value={whatsapp}
                        onChange={(e) => {
                          setWhatsapp(maskPhone(e.target.value));
                          if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: '' }));
                        }}
                        placeholder="(11) 99999-9999"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-muted-foreground outline-none transition-colors text-sm ${
                          errors.whatsapp ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'
                        }`}
                      />
                      {errors.whatsapp && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.whatsapp}</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder="voce@email.com"
                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-muted-foreground outline-none transition-colors text-sm ${
                          errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Como podemos ajudar? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                      }}
                      placeholder="Conte um pouco sobre o que sua empresa precisa (site novo, reformulação, catálogo, agendamento, etc.)..."
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white placeholder-muted-foreground outline-none transition-colors text-sm ${
                        errors.message ? 'border-rose-500 ring-1 ring-rose-500' : 'border-white/10 focus:border-primary focus:ring-1 focus:ring-primary'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5"
                  >
                    <span>Enviar mensagem</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
