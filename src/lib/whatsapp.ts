import { site, type WhatsAppMessageKey } from '../config/site';

/** Monta o link do WhatsApp já com a mensagem pré-preenchida. */
export function whatsappLink(message: WhatsAppMessageKey = 'general'): string {
  const text = site.whatsapp.messages[message];
  return `${site.whatsapp.baseUrl}?text=${encodeURIComponent(text)}`;
}

export const telLink = `tel:+${site.phone.e164}`;
