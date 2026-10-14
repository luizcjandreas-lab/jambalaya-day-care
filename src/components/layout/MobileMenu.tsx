import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from 'react';
import { navigation, site } from '../../config/site';
import { telLink, whatsappLink } from '../../lib/whatsapp';
import { InstagramIcon, MapPinIcon, PhoneIcon, WhatsAppIcon, XIcon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import { Blob } from '../ui/Decor';

type Props = { open: boolean; onClose: () => void; active: string | null };

/** Menu em tela cheia para celular e tablet, com foco preso enquanto aberto. */
export function MobileMenu({ open, onClose, active }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Trava a rolagem da página e move o foco para dentro do menu
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    root.classList.add('menu-is-open');
    const t = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 60);
    return () => {
      window.clearTimeout(t);
      root.style.overflow = previous;
      root.classList.remove('menu-is-open');
    };
  }, [open]);

  // Fecha automaticamente se a tela voltar a ser larga
  useEffect(() => {
    if (!open || !window.matchMedia) return;
    const mq = window.matchMedia('(min-width: 1080px)');
    const onChange = () => mq.matches && onClose();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, [open, onClose]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== 'Tab' || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      id="menu-mobile"
      ref={panelRef}
      className={`mobile-menu ${open ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      onKeyDown={onKeyDown}
    >
      <Blob seed={11} fill="var(--c-coral)" className="mm-blob mm-blob-a" float={18} />
      <Blob seed={23} fill="var(--c-sun)" className="mm-blob mm-blob-b" float={22} />

      <div className="mm-top">
        <a href="#inicio" className="mm-brand" onClick={onClose} aria-label={`${site.name} — voltar ao início`}>
          <Logo size={48} />
        </a>
        <button ref={closeRef} type="button" className="mm-close" onClick={onClose} aria-label="Fechar menu">
          <XIcon size={26} />
        </button>
      </div>

      <nav aria-label="Navegação principal (celular)" className="mm-nav">
        <ol>
          {navigation.map((item, i) => (
            <li key={item.id} style={{ '--i': i } as CSSProperties}>
              <a
                href={`#${item.id}`}
                onClick={onClose}
                className={active === item.id ? 'is-active' : ''}
                aria-current={active === item.id ? 'true' : undefined}
              >
                <span className="mm-index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mm-footer" style={{ '--i': navigation.length } as CSSProperties}>
        <a href={whatsappLink('visit')} target="_blank" rel="noopener noreferrer" className="btn btn-sun btn-lg mm-cta">
          <span className="btn-icon">
            <WhatsAppIcon size={20} />
          </span>
          <span>Agendar visita</span>
          <span className="sr-only"> pelo WhatsApp (abre em uma nova aba)</span>
        </a>
        <ul className="mm-contacts">
          <li>
            <PhoneIcon size={16} />
            <a href={telLink}>{site.phone.display}</a>
          </li>
          <li>
            <InstagramIcon size={16} />
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              {site.instagram.handle}
            </a>
          </li>
          <li>
            <MapPinIcon size={16} />
            <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
              {site.address.full}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
