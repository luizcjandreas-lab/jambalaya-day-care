import type { CSSProperties, ReactNode, RefObject } from 'react';
import { useReveal } from '../../hooks/useReveal';

type RevealProps = {
  as?: 'div' | 'li' | 'figure' | 'article' | 'header' | 'p' | 'span' | 'aside';
  /** rise: sobe suavemente · mask: imagem revelada por máscara · fade: só opacidade · pop: escala sutil */
  variant?: 'rise' | 'mask' | 'fade' | 'pop';
  /** atraso em milissegundos (para escalonar elementos irmãos) */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children?: ReactNode;
};

export function Reveal({ as = 'div', variant = 'rise', delay = 0, className = '', style, id, children }: RevealProps) {
  const [ref, inView] = useReveal<HTMLDivElement>();
  const Tag = as as 'div';
  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement>}
      id={id}
      data-reveal={variant}
      className={`${className}${inView ? ' is-in' : ''}`}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
