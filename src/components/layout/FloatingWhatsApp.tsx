import { whatsappLink } from '../../lib/whatsapp';
import { WhatsAppIcon } from '../ui/Icon';

/** Atalho fixo para o WhatsApp — só ícone no celular, ícone + texto no computador. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink('general')}
      target="_blank"
      rel="noopener noreferrer"
      className="fab-whatsapp"
      aria-label="Fale com a gente pelo WhatsApp (abre em uma nova aba)"
    >
      <span className="fab-icon">
        <WhatsAppIcon size={26} />
      </span>
      <span className="fab-label" aria-hidden="true">
        Fale com a gente
      </span>
    </a>
  );
}
