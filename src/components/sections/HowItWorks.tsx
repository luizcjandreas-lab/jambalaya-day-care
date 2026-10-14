import type { CSSProperties } from 'react';
import { site } from '../../config/site';
import { whatsappLink } from '../../lib/whatsapp';
import { Kicker } from '../ui/Decor';
import { ArrowUpRightIcon, ClockIcon, UsersIcon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';

const steps = [
  { title: 'Chame no WhatsApp', text: 'Conte a idade da criança e o que a família está procurando.' },
  { title: 'Venha conhecer', text: 'Agende uma visita para ver o espaço e conversar com a equipe com calma.' },
  {
    title: 'Escolha a experiência',
    text: 'Day care, oficinas, férias ou festa: a equipe confirma datas e disponibilidade.',
  },
];

/** Régua do dia usada no card de horários (das 6h às 21h). */
const DAY_START = 6;
const DAY_END = 21;
const ticks = [6, 9, 12, 15, 18, 21];
const pct = (h: number) => `${((h - DAY_START) / (DAY_END - DAY_START)) * 100}%`;

function HoursCard() {
  return (
    <Reveal variant="pop" className="hours-card">
      <div className="hours-head">
        <h3 className="hours-title">
          <ClockIcon size={22} />
          Horários
        </h3>
        <span className="hours-stamp">HORÁRIOS DEMONSTRATIVOS</span>
      </div>

      <ul className="hours-list">
        {site.hours.map((row) => (
          <li key={row.days} className="hours-row">
            <div className="hours-row-text">
              <span className="hours-days">{row.days}</span>
              <span className="hours-time">{row.label}</span>
            </div>
            <div className="hours-track" aria-hidden="true">
              {row.open !== null && row.close !== null ? (
                <span
                  className="hours-bar"
                  style={{ left: pct(row.open), width: `calc(${pct(row.close)} - ${pct(row.open)})` } as CSSProperties}
                />
              ) : (
                <span className="hours-bar hours-bar-open" />
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="hours-scale" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t} style={{ left: pct(t) }}>
            {String(t).padStart(2, '0')}h
          </span>
        ))}
      </div>

      <a href={whatsappLink('visit')} target="_blank" rel="noopener noreferrer" className="hours-link">
        <span>Confirmar horários e agendar visita</span>
        <ArrowUpRightIcon size={18} />
        <span className="sr-only"> no WhatsApp (abre em uma nova aba)</span>
      </a>
    </Reveal>
  );
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="how section" aria-labelledby="how-title">
      <div className="wrap how-grid">
        <div className="how-copy">
          <Kicker tone="ink">Como funciona</Kicker>
          <Reveal as="header">
            <h2 id="how-title" className="display-2">
              Uma rotina leve para eles. Mais tranquilidade para você.
            </h2>
          </Reveal>

          <ol className="how-steps">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 110} className="how-step">
                <span className="how-step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="how-step-title">{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200}>
            <p className="age-note">
              <UsersIcon size={20} />
              <span>
                O atendimento deste modelo é destinado a crianças e jovens de{' '}
                <strong>
                  {site.ages.min} a {site.ages.max} anos
                </strong>
                , com atividades adaptadas a cada faixa etária.
              </span>
            </p>
          </Reveal>
        </div>

        <HoursCard />
      </div>
    </section>
  );
}
