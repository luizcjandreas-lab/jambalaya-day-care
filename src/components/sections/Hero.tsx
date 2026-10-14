import type { CSSProperties } from 'react';
import { site } from '../../config/site';
import { useParallax } from '../../hooks/useScroll';
import { images } from '../../lib/images';
import { whatsappLink } from '../../lib/whatsapp';
import { ButtonLink } from '../ui/ButtonLink';
import { Blob, Swash } from '../ui/Decor';
import { ArrowDownIcon, WhatsAppIcon } from '../ui/Icon';
import { Picture } from '../ui/Picture';

export function Hero() {
  const parallaxRef = useParallax<HTMLDivElement>(0.16);

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <div ref={parallaxRef} className="hero-media-inner">
          <Picture image={images.hero} sizes="100vw" priority className="hero-picture" imgClassName="hero-img" />
        </div>
        <div className="hero-shade" aria-hidden="true" />
      </div>

      <Blob seed={7} fill="var(--c-coral)" className="hero-blob hero-blob-a" float={16} />
      <Blob seed={42} fill="var(--c-sun)" className="hero-blob hero-blob-b" float={20} points={6} />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-badge hero-seq" style={{ '--seq': 0 } as CSSProperties}>
            <span className="hero-badge-dot" aria-hidden="true" />
            Há {site.yearsActive} anos criando boas memórias em {site.city}
          </p>

          <h1 id="hero-title" className="hero-title">
            <span className="hero-line hero-seq" style={{ '--seq': 1 } as CSSProperties}>
              Um lugar para{' '}
            </span>
            <span className="hero-line hero-seq" style={{ '--seq': 2 } as CSSProperties}>
              <em className="hero-em">
                brincar, criar
                <Swash className="hero-swash" />
              </em>{' '}
            </span>
            <span className="hero-line hero-seq" style={{ '--seq': 3 } as CSSProperties}>
              e viver a infância.
            </span>
          </h1>

          <p className="hero-lead hero-seq" style={{ '--seq': 4 } as CSSProperties}>
            Recreação, oficinas e festas em um ambiente acolhedor, cheio de experiências e acompanhado por uma equipe
            atenciosa.
          </p>

          <div className="hero-actions hero-seq" style={{ '--seq': 5 } as CSSProperties}>
            <ButtonLink href={whatsappLink('visit')} external icon={<WhatsAppIcon size={19} />} size="lg">
              Quero conhecer
            </ButtonLink>
            <ButtonLink
              href="#experiencias"
              variant="outline-light"
              icon={<ArrowDownIcon size={19} />}
              iconAfter
              size="lg"
            >
              Descobrir experiências
            </ButtonLink>
          </div>
        </div>

        <aside className="hero-card hero-seq" style={{ '--seq': 6 } as CSSProperties} aria-label="Faixa etária">
          <p className="hero-card-kicker">Para crescer se divertindo</p>
          <p className="hero-card-age">
            <span className="hero-card-num">
              {site.ages.min}–{site.ages.max}
            </span>
            <span className="hero-card-unit">anos</span>
          </p>
          <p className="hero-card-text">Uma programação pensada para cada fase.</p>
        </aside>
      </div>

      <a href="#diferenciais" className="scroll-cue" aria-label="Continuar rolando para o conteúdo">
        <span className="scroll-cue-track" aria-hidden="true">
          <span className="scroll-cue-dot" />
        </span>
        <span className="scroll-cue-text" aria-hidden="true">
          Role para descobrir
        </span>
      </a>
    </section>
  );
}
