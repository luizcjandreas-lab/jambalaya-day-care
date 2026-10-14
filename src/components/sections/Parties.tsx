import type { CSSProperties } from 'react';
import { images } from '../../lib/images';
import { whatsappLink } from '../../lib/whatsapp';
import { ButtonLink } from '../ui/ButtonLink';
import { Blob, DemoNote, Kicker } from '../ui/Decor';
import { CheckIcon, WhatsAppIcon } from '../ui/Icon';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

const items = [
  'Recreação monitorada',
  'Gincanas e desafios',
  'Brincadeiras adaptadas às idades',
  'Espaço preparado para a comemoração',
  'Apoio durante toda a experiência',
  'Atividades que incentivam a participação dos convidados',
];

export function Parties() {
  return (
    <section id="festas" className="parties" aria-labelledby="parties-title">
      <Blob seed={73} fill="var(--c-teal)" className="parties-blob parties-blob-a" float={22} />
      <Blob seed={19} fill="var(--c-coral)" className="parties-blob parties-blob-b" float={18} points={6} />

      <div className="wrap parties-grid">
        <div className="parties-copy">
          <Kicker tone="sun">Festas e aniversários</Kicker>
          <Reveal as="header">
            <h2 id="parties-title" className="display-2 parties-title">
              A festa é sua. <span className="parties-title-alt">A diversão é com a gente.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lead parties-lead">
              Da recepção até o último parabéns, criamos uma experiência alegre para os aniversariantes e tranquila para
              as famílias.
            </p>
          </Reveal>

          <ul className="parties-list" aria-label="O que a festa pode incluir">
            {items.map((item, i) => (
              <Reveal as="li" key={item} delay={140 + i * 60} variant="fade" style={{ '--i': i } as CSSProperties}>
                <span className="parties-check" aria-hidden="true">
                  <CheckIcon size={16} strokeWidth={2.6} />
                </span>
                <span>{item}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200} className="parties-cta">
            <ButtonLink href={whatsappLink('party')} external icon={<WhatsAppIcon size={19} />} size="lg">
              Quero planejar uma festa
            </ButtonLink>
            <DemoNote tone="dark">Itens demonstrativos — a equipe confirma o que entra em cada festa.</DemoNote>
          </Reveal>
        </div>

        <div className="parties-visual">
          <Reveal variant="mask" className="parties-frame">
            <Picture
              image={images.festa}
              sizes="(min-width: 1080px) 52vw, 100vw"
              imgClassName="cover-img"
              position="56% 45%"
            />
          </Reveal>
          <div className="parties-sticker" aria-hidden="true">
            <span>festa</span>
            <span>na Jamba</span>
          </div>
        </div>
      </div>
    </section>
  );
}
