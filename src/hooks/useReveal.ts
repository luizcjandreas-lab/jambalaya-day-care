import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Entrada suave dos elementos durante a rolagem.
 * Um único IntersectionObserver compartilhado avisa cada componente quando o
 * elemento entra na tela; o componente então recebe a classe `is-in` e o CSS
 * cuida da transição. O estado "escondido" só existe quando <html> tem a
 * classe `js-reveal` (ativada no main.tsx), então sem JavaScript ou com
 * movimento reduzido todo o conteúdo aparece normalmente.
 */

type Callback = () => void;
const callbacks = new WeakMap<Element, Callback>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cb = callbacks.get(entry.target);
          observer?.unobserve(entry.target);
          callbacks.delete(entry.target);
          cb?.();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
  }
  return observer;
}

export function useReveal<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    if (!io || !document.documentElement.classList.contains('js-reveal')) {
      setInView(true);
      return;
    }
    callbacks.set(el, () => setInView(true));
    io.observe(el);
    return () => {
      io.unobserve(el);
      callbacks.delete(el);
    };
  }, []);

  return [ref, inView];
}
