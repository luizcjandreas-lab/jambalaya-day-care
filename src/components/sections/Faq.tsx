import { useId, useState } from 'react';
import { whatsappLink } from '../../lib/whatsapp';
import { Kicker } from '../ui/Decor';
import { PlusIcon, WhatsAppIcon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';

const faqs = [
  {
    q: 'Qual idade a Jambalaya atende?',
    a: 'Neste modelo, consideramos atividades para crianças e jovens de 7 a 15 anos, com programação adaptada para cada fase.',
  },
  {
    q: 'É possível conhecer o espaço antes?',
    a: 'Sim. O ideal é agendar uma visita pelo WhatsApp para que a equipe possa apresentar o espaço com calma.',
  },
  {
    q: 'A Jambalaya realiza festas?',
    a: 'Sim. A proposta demonstrativa inclui o espaço, recreação, gincanas, brincadeiras e acompanhamento durante a experiência. Os itens finais serão confirmados pela equipe.',
  },
  {
    q: 'Como faço uma reserva?',
    a: 'Envie uma mensagem informando a data desejada, a idade da criança e o tipo de experiência. A equipe retornará com as informações e disponibilidade.',
  },
];

/** Accordion acessível: somente um item aberto por vez. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="duvidas" className="faq section" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-intro">
          <Kicker tone="coral">Dúvidas</Kicker>
          <Reveal as="header">
            <h2 id="faq-title" className="display-2">
              Perguntas frequentes
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="faq-help">Não encontrou o que procurava? A equipe responde pelo WhatsApp.</p>
            <a href={whatsappLink('general')} target="_blank" rel="noopener noreferrer" className="text-link">
              <WhatsAppIcon size={18} />
              <span>Mandar uma pergunta</span>
              <span className="sr-only"> pelo WhatsApp (abre em uma nova aba)</span>
            </a>
          </Reveal>
        </div>

        <div className="faq-list">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <Reveal key={item.q} delay={i * 80} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <h3 className="faq-q">
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <PlusIcon size={20} />
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} className="faq-a" inert={!isOpen}>
                  <div className="faq-a-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
