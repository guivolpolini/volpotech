import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSiteData } from '@/context/SiteContext';

export const FaqSection: React.FC = () => {
  const { faqs } = useSiteData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Dúvidas frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Perguntas & Respostas
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Tudo o que você precisa saber antes de colocar sua empresa no digital com a VolpoTech.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-white text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-primary/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
