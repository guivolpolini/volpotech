export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'Existe alguma taxa inicial ou custo de criação?',
    answer:
      'Não! Você não paga nenhuma taxa de criação nem adesão inicial. Você paga apenas o valor da mensalidade do plano escolhido (a partir de R$ 69,90/mês).',
  },
  {
    question: 'Em quanto tempo meu site fica pronto?',
    answer:
      'Nosso prazo médio de entrega é de 5 a 10 dias úteis após o envio das informações básicas e fotos do seu negócio.',
  },
  {
    question: 'O domínio e hospedagem estão inclusos?',
    answer:
      'Sim, a hospedagem de alta performance, certificado de segurança SSL e o suporte técnico estão totalmente inclusos na mensalidade.',
  },
  {
    question: 'Como funcionam as alterações mensais?',
    answer:
      'Você tem direito a alterações mensais (troca de textos, fotos, produtos, horários ou avisos). Basta nos solicitar via WhatsApp e nossa equipe atualiza para você.',
  },
  {
    question: 'Como funciona a Placa Google de Avaliações?',
    answer:
      'É um display acrílico elegante para colocar no balcão da sua empresa. Ele conta com tecnologia NFC (por aproximação de celular) e QR Code impresso. Quando o cliente aproxima o smartphone, a tela de avaliação 5 estrelas do seu Google Meu Negócio abre instantaneamente!',
  },
  {
    question: 'Posso cancelar a assinatura quando quiser?',
    answer:
      'Sim, você tem total flexibilidade e transparência. Sem multas abusivas ou burocracia.',
  },
];
