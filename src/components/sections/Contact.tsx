import { site } from '../../config/site';
import { telLink, whatsappLink } from '../../lib/whatsapp';
import { ButtonLink } from '../ui/ButtonLink';
import { Blob } from '../ui/Decor';
import { ArrowUpRightIcon, InstagramIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '../ui/Icon';
import { Logo } from '../ui/Logo';
import { Reveal } from '../ui/Reveal';

export function Contact() {
  return (
    <section id="contato" className="contact" aria-labelledby="contact-title">
      <Blob seed={101} fill="var(--c-sun)" className="contact-blob contact-blob-a" float={20} />
      <Blob seed={58} fill="var(--c-cream)" className="contact-blob contact-blob-b" float={26} points={6} />

      <div className="wrap contact-grid">
        <div className="contact-copy">
          <Reveal as="header">
            <h2 id="contact-title" className="display-1 contact-title">
              O próximo dia incrível pode começar aqui.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lead contact-lead">
              Agende uma visita, conheça o espaço e descubra qual experiência combina com a sua família.
            </p>
          </Reveal>
          <Reveal delay={180} className="contact-actions">
            <ButtonLink href={whatsappLink('visit')} external variant="ink" icon={<WhatsAppIcon size={20} />} size="lg">
              Conversar no WhatsApp
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal variant="pop" delay={120} as="aside" className="contact-card">
          <address className="contact-address">
            <div className="contact-card-head">
              <Logo size={64} />
              <p className="contact-name">{site.name}</p>
            </div>
            <ul className="contact-list">
              <li>
                <span className="contact-icon" aria-hidden="true">
                  <MapPinIcon size={20} />
                </span>
                <span>
                  {site.address.street}
                  <br />
                  {site.address.cityLine}
                </span>
              </li>
              <li>
                <span className="contact-icon" aria-hidden="true">
                  <PhoneIcon size={20} />
                </span>
                <a href={telLink}>{site.phone.display}</a>
              </li>
              <li>
                <span className="contact-icon" aria-hidden="true">
                  <InstagramIcon size={20} />
                </span>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                  {site.instagram.handle}
                  <span className="sr-only"> no Instagram (abre em uma nova aba)</span>
                </a>
              </li>
            </ul>
          </address>

          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="map-link">
            <span className="map-art" aria-hidden="true">
              <svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" focusable="false">
                <defs>
                  <pattern id="map-dots" width="14" height="14" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.4" />
                  </pattern>
                </defs>
                <rect width="320" height="120" className="map-bg" />
                <rect width="320" height="120" fill="url(#map-dots)" className="map-dots" />
                <path d="M-10 84 C 60 70, 120 96, 170 66 S 270 30, 330 44" className="map-route" />
              </svg>
              <span className="map-pin">
                <MapPinIcon size={22} />
              </span>
            </span>
            <span className="map-text">
              <span>Abrir no Google Maps</span>
              <ArrowUpRightIcon size={18} />
            </span>
            <span className="sr-only"> (abre em uma nova aba)</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
