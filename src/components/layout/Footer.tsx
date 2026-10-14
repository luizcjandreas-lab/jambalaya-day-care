import { navigation, site } from '../../config/site';
import { telLink, whatsappLink } from '../../lib/whatsapp';
import { ArrowUpIcon, InstagramIcon, MapPinIcon, WhatsAppIcon } from '../ui/Icon';
import { Logo } from '../ui/Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo size={88} />
          <p>
            Recreação, oficinas, férias e festas para crianças e jovens de {site.ages.min} a {site.ages.max} anos, há{' '}
            {site.yearsActive} anos em {site.city}. Um lugar para brincar, criar e viver a infância.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé" className="footer-col">
          <h2 className="footer-title">Navegue</h2>
          <ul>
            <li>
              <a href="#inicio">Início</a>
            </li>
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>
        </nav>

        <div className="footer-col">
          <h2 className="footer-title">Fale com a gente</h2>
          <ul className="footer-contacts">
            <li>
              <WhatsAppIcon size={18} />
              <span>
                <a href={whatsappLink('general')} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                <a href={telLink} className="footer-sub">
                  {site.phone.display}
                </a>
              </span>
            </li>
            <li>
              <InstagramIcon size={18} />
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                {site.instagram.handle}
              </a>
            </li>
            <li>
              <MapPinIcon size={18} />
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
                {site.address.street}
                <span className="footer-sub">{site.address.cityLine}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <p>
          © {year} {site.name}. Todos os direitos reservados.
        </p>
        <p className="footer-demo">{site.demo.footer}</p>
        <a href="#inicio" className="to-top">
          <span>Voltar ao topo</span>
          <ArrowUpIcon size={16} />
        </a>
      </div>
    </footer>
  );
}
