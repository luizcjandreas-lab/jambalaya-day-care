import { useCallback, useRef, useState } from 'react';
import { navigation, site } from '../../config/site';
import { useActiveSection, useScrolled } from '../../hooks/useScroll';
import { whatsappLink } from '../../lib/whatsapp';
import { MenuIcon, WhatsAppIcon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import { MobileMenu } from './MobileMenu';

const sectionIds = navigation.map((n) => n.id);
const [bannerLead, bannerRest] = site.demo.banner.split(' — ');

export function Header() {
  const scrolled = useScrolled(40);
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus({ preventScroll: true }));
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        {site.demo.showBanner && (
          <div className="preview-strip" role="note" aria-label="Aviso de prévia">
            <span className="preview-dot" aria-hidden="true" />
            <p>
              <strong>{bannerLead}</strong>
              {bannerRest && <span className="preview-rest"> — {bannerRest}</span>}
            </p>
          </div>
        )}

        <div className="nav-bar">
          <div className="wrap nav-inner">
            <a href="#inicio" className="brand" aria-label={`${site.name} — voltar ao início`}>
              <Logo size={56} eager className="brand-logo" />
              <span className="brand-name" aria-hidden="true">
                Jambalaya<span>Day Care em {site.city}</span>
              </span>
            </a>

            <nav aria-label="Navegação principal" className="desktop-nav">
              <ul>
                {navigation.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`nav-link ${active === item.id ? 'is-active' : ''}`}
                      aria-current={active === item.id ? 'true' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="nav-actions">
              <a
                href={whatsappLink('visit')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sun header-cta"
              >
                <span className="btn-icon">
                  <WhatsAppIcon size={18} />
                </span>
                <span>Agendar visita</span>
                <span className="sr-only"> pelo WhatsApp (abre em uma nova aba)</span>
              </a>

              <button
                ref={toggleRef}
                type="button"
                className="menu-toggle"
                aria-expanded={menuOpen}
                aria-controls="menu-mobile"
                aria-label="Abrir menu"
                onClick={() => setMenuOpen(true)}
              >
                <MenuIcon size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} />
    </>
  );
}
