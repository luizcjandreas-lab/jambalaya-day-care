import { site } from '../../config/site';
import { Reveal } from '../ui/Reveal';

const items = [
  { value: `${site.yearsActive} anos`, label: 'de histórias' },
  { value: `${site.ages.min} a ${site.ages.max}`, label: 'anos atendidos' },
  { value: 'Experiências', label: 'que criam memórias' },
  { value: site.city, label: 'perto de você' },
];

/** Faixa verde-azulada logo após a abertura. */
export function Highlights() {
  return (
    <section id="diferenciais" className="highlights" aria-label="Destaques da Jambalaya">
      <div className="wrap">
        <ul className="highlights-list">
          {items.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 90} variant="fade" className="highlight">
              <span className="highlight-value">{item.value}</span>
              <span className="highlight-label">{item.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
