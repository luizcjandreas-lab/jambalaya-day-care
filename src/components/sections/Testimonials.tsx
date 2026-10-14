import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Kicker } from '../ui/Decor';
import { ChevronLeftIcon, ChevronRightIcon } from '../ui/Icon';
import { Reveal } from '../ui/Reveal';

const testimonials = [
  {
    quote:
      'Meu filho voltou para casa contando cada detalhe. A equipe foi muito atenciosa e tornou o dia realmente especial.',
    name: 'Mariana A.',
    role: 'mãe de participante',
    tone: 'coral',
  },
  {
    quote:
      'A festa ficou linda e as crianças participaram de tudo. Conseguimos aproveitar o momento com tranquilidade.',
    name: 'Renata C.',
    role: 'mãe de aniversariante',
    tone: 'sun',
  },
  {
    quote: 'É o tipo de lugar em que a gente percebe cuidado nos detalhes. Ambiente alegre, organizado e acolhedor.',
    name: 'Carlos M.',
    role: 'pai de participante',
    tone: 'teal',
  },
];

const CAROUSEL_QUERY = '(max-width: 899px)';

function useIsCarousel(): boolean {
  const [match, setMatch] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(CAROUSEL_QUERY).matches,
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(CAROUSEL_QUERY);
    const onChange = () => setMatch(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return match;
}

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [announce, setAnnounce] = useState('');
  const isCarousel = useIsCarousel();

  // Atualiza o indicador conforme o visitante desliza
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const slides = Array.from(track.children) as HTMLElement[];
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let best = Infinity;
        slides.forEach((slide, i) => {
          const mid = slide.offsetLeft + slide.offsetWidth / 2;
          const dist = Math.abs(mid - center);
          if (dist < best) {
            best = dist;
            nearest = i;
          }
        });
        setIndex(nearest);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const count = track.children.length;
    const target = (i + count) % count;
    const slide = track.children[target] as HTMLElement;
    const left = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' });
    setIndex(target);
    setAnnounce(`Depoimento ${target + 1} de ${count}`);
  }, []);

  return (
    <section
      id="depoimentos"
      className="testimonials section"
      aria-labelledby="testimonials-title"
      aria-roledescription={isCarousel ? 'carrossel' : undefined}
    >
      <div className="wrap">
        <div className="testimonials-head">
          <div>
            <Kicker tone="coral">Famílias</Kicker>
            <Reveal as="header">
              <h2 id="testimonials-title" className="display-2">
                O que as famílias contam.
              </h2>
            </Reveal>
          </div>
          <p className="demo-seal">
            <strong>DEPOIMENTOS DEMONSTRATIVOS</strong> — substituir por avaliações reais antes da publicação.
          </p>
        </div>

        <ul
          id="depoimentos-lista"
          ref={trackRef}
          className="testimonials-track"
          tabIndex={isCarousel ? 0 : undefined}
          aria-label={isCarousel ? 'Depoimentos — deslize para ver mais' : 'Depoimentos'}
        >
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              className={`quote-card quote-${t.tone}`}
              role={isCarousel ? 'group' : undefined}
              aria-roledescription={isCarousel ? 'slide' : undefined}
              aria-label={isCarousel ? `${i + 1} de ${testimonials.length}` : undefined}
              style={{ '--i': i } as CSSProperties}
            >
              <figure>
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <span className="quote-name">{t.name}</span>
                  <span className="quote-role">{t.role}</span>
                  <span className="quote-flag">exemplo</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="carousel-controls">
          <button
            type="button"
            className="carousel-btn"
            onClick={() => goTo(index - 1)}
            aria-controls="depoimentos-lista"
            aria-label="Depoimento anterior"
          >
            <ChevronLeftIcon size={22} />
          </button>
          <div className="carousel-dots">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                className={`carousel-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-controls="depoimentos-lista"
                aria-label={`Ir para o depoimento ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            className="carousel-btn"
            onClick={() => goTo(index + 1)}
            aria-controls="depoimentos-lista"
            aria-label="Próximo depoimento"
          >
            <ChevronRightIcon size={22} />
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
      </div>
    </section>
  );
}
