import { site } from '../../config/site';
import { images } from '../../lib/images';
import { Blob, DemoNote, Kicker } from '../ui/Decor';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

/** Selo circular com texto girando lentamente ao redor. */
function SinceSeal() {
  const text = `Desde ${site.since} • ${site.city} • Desde ${site.since} • ${site.city} • `;
  return (
    <div className="seal" role="img" aria-label={`Desde ${site.since} em ${site.city}`}>
      <svg viewBox="0 0 160 160" aria-hidden="true" focusable="false" className="seal-ring">
        <defs>
          <path id="seal-circle" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
        </defs>
        <text>
          <textPath href="#seal-circle" startOffset="0" textLength="364">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="seal-center" aria-hidden="true">
        <span className="seal-year">{site.since}</span>
        <span className="seal-sep">—</span>
        <span className="seal-city">{site.city}</span>
      </span>
    </div>
  );
}

export function Story() {
  return (
    <section id="sobre" className="story section" aria-labelledby="story-title">
      <Blob seed={88} fill="var(--c-sky)" className="story-blob" float={20} />

      <div className="wrap story-grid">
        <div className="story-visual">
          <Reveal variant="mask" className="story-frame">
            <Picture
              image={images.oficinas}
              sizes="(min-width: 1080px) 46vw, (min-width: 720px) 60vw, 92vw"
              className="story-picture"
              imgClassName="cover-img"
              position="48% 40%"
            />
          </Reveal>
          <SinceSeal />
        </div>

        <div className="story-copy">
          <Kicker>Nossa história</Kicker>
          <Reveal as="header">
            <h2 id="story-title" className="display-2">
              Mais que um espaço. Um lugar de pertencimento.
            </h2>
          </Reveal>
          <Reveal delay={120} className="story-text">
            <p className="lead">
              A Jambalaya nasceu do desejo de oferecer às famílias um espaço onde crianças e jovens pudessem aproveitar
              o tempo livre com liberdade, cuidado e propósito.
            </p>
            <p>
              Ao longo de sete anos, cada brincadeira, oficina e comemoração ajudou a construir uma história feita de
              vínculos, descobertas e momentos que ficam na memória.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <DemoNote>Texto demonstrativo — a história final será escrita junto com a equipe da Jambalaya.</DemoNote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
