import { useEffect } from 'react';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Controla a animação de entrada (#intro), que já vem pronta no index.html
 * para aparecer no primeiro quadro do carregamento.
 *
 * - Dura no máximo 1,8 s contando desde o início do carregamento.
 * - Um clique ou qualquer tecla dispensa a animação na hora.
 * - Há também uma trava em CSS que a esconde sozinha, mesmo sem JavaScript.
 * - Com prefers-reduced-motion, as formas ficam paradas e a saída é imediata.
 */
const TOTAL_MS = 1800;
const EXIT_MS = 450;

export function IntroController() {
  useEffect(() => {
    const root = document.documentElement;
    const intro = document.getElementById('intro');

    const markDone = () => {
      root.dataset.intro = 'done';
    };

    if (!intro) {
      markDone();
      return;
    }

    let removed = false;
    const remove = () => {
      if (removed) return;
      removed = true;
      intro.remove();
    };

    const reduced = prefersReducedMotion();
    const showFor = reduced ? 350 : TOTAL_MS - EXIT_MS;

    const leave = () => {
      if (intro.classList.contains('is-leaving') || removed) return;
      markDone();
      const now = performance.now();
      if (!reduced && now >= showFor) {
        // A trava em CSS já começou a esconder a abertura: só aguardamos o fim.
        window.setTimeout(remove, Math.max(0, TOTAL_MS - now) + 50);
        return;
      }
      intro.classList.add('is-leaving');
      window.setTimeout(remove, (reduced ? 250 : EXIT_MS) + 50);
    };

    const wait = Math.max(0, showFor - performance.now());
    const timer = window.setTimeout(leave, wait);

    intro.addEventListener('click', leave);
    window.addEventListener('keydown', leave, { once: true });

    return () => {
      window.clearTimeout(timer);
      intro.removeEventListener('click', leave);
      window.removeEventListener('keydown', leave);
    };
  }, []);

  return null;
}
