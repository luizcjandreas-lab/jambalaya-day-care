import { site } from '../../config/site';
import { images, type SiteImage } from '../../lib/images';
import { Kicker } from '../ui/Decor';
import { InfoIcon } from '../ui/Icon';
import { Picture } from '../ui/Picture';
import { Reveal } from '../ui/Reveal';

type Shot = { image: SiteImage; caption: string; className: string; position: string; sizes: string };

const shots: Shot[] = [
  {
    image: images.hero,
    caption: 'Um espaço para criar.',
    className: 'shot-a',
    position: '70% 50%',
    sizes: '(min-width: 1080px) 56vw, 100vw',
  },
  {
    image: images.oficinas,
    caption: 'Aprender brincando.',
    className: 'shot-b',
    position: '50% 45%',
    sizes: '(min-width: 1080px) 38vw, 50vw',
  },
  {
    image: images.recreacao,
    caption: 'Energia em movimento.',
    className: 'shot-c',
    position: '38% 40%',
    sizes: '(min-width: 1080px) 56vw, 50vw',
  },
  {
    image: images.festa,
    caption: 'Comemorar de verdade.',
    className: 'shot-d',
    position: '55% 45%',
    sizes: '(min-width: 1080px) 38vw, 100vw',
  },
];

export function Gallery() {
  return (
    <section id="galeria" className="gallery section" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="gallery-head">
          <Kicker tone="coral">Galeria</Kicker>
          <Reveal as="header">
            <h2 id="gallery-title" className="display-2">
              Um pouco do clima da Jamba.
            </h2>
          </Reveal>
        </div>

        <div className="gallery-grid">
          <div className="gallery-col">
            {[shots[0], shots[2]].map((shot, i) => (
              <GalleryShot key={shot.caption} shot={shot} delay={i * 120} />
            ))}
          </div>
          <div className="gallery-col gallery-col-offset">
            {[shots[1], shots[3]].map((shot, i) => (
              <GalleryShot key={shot.caption} shot={shot} delay={80 + i * 120} />
            ))}
          </div>
        </div>

        <p className="gallery-disclaimer">
          <InfoIcon size={16} />
          <span>{site.demo.images}</span>
        </p>
      </div>
    </section>
  );
}

function GalleryShot({ shot, delay }: { shot: Shot; delay: number }) {
  return (
    <Reveal as="figure" variant="mask" delay={delay} className={`shot ${shot.className}`}>
      <div className="shot-frame">
        <Picture image={shot.image} sizes={shot.sizes} imgClassName="cover-img" position={shot.position} />
      </div>
      <figcaption>{shot.caption}</figcaption>
    </Reveal>
  );
}
