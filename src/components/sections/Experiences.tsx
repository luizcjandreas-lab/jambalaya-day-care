import type { ReactNode } from 'react';
import type { WhatsAppMessageKey } from '../../config/site';
import { images, type SiteImage } from '../../lib/images';
import { whatsappLink } from '../../lib/whatsapp';
import { Blob, Kicker } from '../ui/Decor';
import { ArrowRightIcon, ArrowUpRightIcon } from '../ui/Icon';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

type Experience = {
  n: string;
  title: string;
  text: string;
  tone: 'teal' | 'sky' | 'sun' | 'coral';
  image?: { src: SiteImage; position: string };
  link: { label: string; href: string; external: boolean };
  decor?: ReactNode;
};

const wa = (key: WhatsAppMessageKey) => whatsappLink(key);

const experiences: Experience[] = [
  {
    n: '01',
    title: 'Day Care e recreação',
    text: 'Jogos, desafios em grupo e atividades monitoradas para transformar o dia em uma aventura.',
    tone: 'teal',
    image: { src: images.recreacao, position: '40% 45%' },
    link: { label: 'Perguntar sobre o Day Care', href: wa('daycare'), external: true },
  },
  {
    n: '02',
    title: 'Oficinas criativas',
    text: 'Arte, experiências, brincadeiras e projetos que estimulam a curiosidade, a imaginação e a convivência.',
    tone: 'sky',
    link: { label: 'Perguntar sobre as oficinas', href: wa('workshops'), external: true },
    decor: (
      <div className="xp-decor xp-decor-shapes" aria-hidden="true">
        <Blob seed={31} fill="var(--c-coral)" className="xp-shape xp-shape-1" float={0} points={5} />
        <Blob seed={64} fill="var(--c-sun)" className="xp-shape xp-shape-2" float={0} points={6} />
        <Blob seed={17} fill="var(--c-teal)" className="xp-shape xp-shape-3" float={0} points={7} />
      </div>
    ),
  },
  {
    n: '03',
    title: 'Férias na Jamba',
    text: 'Dias temáticos, gincanas, atividades especiais e novas amizades em uma programação feita para aproveitar cada momento.',
    tone: 'sun',
    link: { label: 'Perguntar sobre as férias', href: wa('vacation'), external: true },
    decor: (
      <div className="xp-decor xp-decor-sun" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="xp-sunburst" focusable="false">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="96" y="6" width="8" height="34" rx="4" transform={`rotate(${i * 30} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="44" />
        </svg>
      </div>
    ),
  },
  {
    n: '04',
    title: 'Festas inesquecíveis',
    text: 'Um aniversário divertido, leve e cheio de experiências para guardar na memória.',
    tone: 'coral',
    image: { src: images.festa, position: '58% 50%' },
    link: { label: 'Ver como são as festas', href: '#festas', external: false },
  },
];

function ExperienceBlock({ xp, index }: { xp: Experience; index: number }) {
  const hasImage = !!xp.image;
  return (
    <Reveal
      as="article"
      delay={index % 2 === 0 ? 0 : 140}
      className={`xp xp-${index + 1} xp-tone-${xp.tone} ${hasImage ? 'xp-has-image' : 'xp-text-only'}`}
    >
      {xp.image && (
        <div className="xp-media">
          <Picture
            image={xp.image.src}
            sizes="(min-width: 1080px) 58vw, 100vw"
            imgClassName="cover-img"
            position={xp.image.position}
          />
        </div>
      )}

      <div className="xp-body">
        {xp.decor}
        <span className="xp-num" aria-hidden="true">
          {xp.n}
        </span>
        <h3 className="xp-title">
          <span className="sr-only">{xp.n}. </span>
          {xp.title}
        </h3>
        <p className="xp-text">{xp.text}</p>
        <a
          href={xp.link.href}
          className="xp-link"
          {...(xp.link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <span>{xp.link.label}</span>
          {xp.link.external ? <ArrowUpRightIcon size={18} /> : <ArrowRightIcon size={18} />}
          {xp.link.external && <span className="sr-only"> no WhatsApp (abre em uma nova aba)</span>}
        </a>
      </div>
    </Reveal>
  );
}

export function Experiences() {
  return (
    <section id="experiencias" className="experiences section" aria-labelledby="xp-title">
      <div className="wrap">
        <div className="xp-head">
          <div>
            <Kicker tone="coral">Experiências</Kicker>
            <Reveal as="header">
              <h2 id="xp-title" className="display-2 xp-heading">
                Cada dia pode virar uma nova descoberta.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120} className="xp-intro">
            <p>
              No dia a dia, nas férias ou no aniversário, a programação acompanha a idade e o interesse de cada criança.
            </p>
          </Reveal>
        </div>

        <div className="xp-grid">
          {experiences.map((xp, i) => (
            <ExperienceBlock key={xp.n} xp={xp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
