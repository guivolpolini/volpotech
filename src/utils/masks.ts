/**
 * Utilitários para Máscaras de Entrada (Input Mask) e Validação de Formulários
 */

/**
 * Aplica máscara de telefone / WhatsApp brasileiro dinamicamente:
 * (XX) XXXXX-XXXX para celular (11 dígitos) ou (XX) XXXX-XXXX para fixo (10 dígitos).
 * Trava no máximo em 11 dígitos numéricos.
 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';

  if (digits.length <= 2) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  // Celular de 11 dígitos
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Remove qualquer caractere não numérico
 */
export function cleanDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Validação rigorosa de telefone / WhatsApp brasileiro:
 * - Deve ter exatamente 10 (fixo) ou 11 dígitos (celular)
 * - DDD válido (entre 11 e 99)
 * - Não pode ter todos os dígitos repetidos (ex: 11111111111)
 * - Para celulares (11 dígitos), o primeiro dígito do número deve ser 9
 */
export function isValidPhone(value: string): boolean {
  const digits = cleanDigits(value);

  if (digits.length !== 10 && digits.length !== 11) {
    return false;
  }

  // Rejeita sequências repetidas como 11111111111 ou 00000000000
  if (/^(\d)\1+$/.test(digits)) {
    return false;
  }

  const ddd = parseInt(digits.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) {
    return false;
  }

  // No Brasil celulares tem 11 dígitos e começam com 9
  if (digits.length === 11 && digits[2] !== '9') {
    return false;
  }

  return true;
}

/**
 * Validação padrão de e-mail (RFC compliant)
 */
export function isValidEmail(value: string): boolean {
  if (!value || typeof value !== 'string') return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(value.trim());
}

/**
 * Formata arroba no Instagram automaticamente
 */
export function maskInstagram(value: string): string {
  const clean = value.replace(/[@\s]/g, '');
  return clean ? `@${clean}` : '';
}
