import type { CSSProperties, ReactNode } from 'react';
import { blobPath } from '../../lib/blob';
import { PencilLineIcon } from './Icon';

type BlobProps = {
  seed: number;
  className?: string;
  /** cor de preenchimento (var CSS ou hex) */
  fill: string;
  /** duração da flutuação em segundos (0 = parado) */
  float?: number;
  points?: number;
  variance?: number;
  style?: CSSProperties;
};

/** Forma orgânica decorativa com flutuação muito discreta. */
export function Blob({ seed, className = '', fill, float = 14, points = 7, variance = 0.2, style }: BlobProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={`blob ${float ? 'blob-float' : ''} ${className}`}
      style={{ ...style, '--float-dur': `${float}s`, '--float-delay': `${-(seed % 7)}s` } as CSSProperties}
    >
      <path d={blobPath(seed, points, variance)} fill={fill} />
    </svg>
  );
}

/**
 * Traço "swash" desenhado à mão, inspirado no prolongamento curvo do
 * "laya" da logo. Usado como sublinhado de destaque.
 */
export function Swash({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 320 34"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`swash ${className}`}
    >
      <path
        d="M4 22 C 52 30, 118 31, 176 24 S 268 8, 300 14 C 316 17, 314 29, 300 27"
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
    </svg>
  );
}

/** Rótulo curto que antecede um título de seção. */
export function Kicker({
  children,
  tone = 'coral',
  className = '',
}: {
  children: ReactNode;
  tone?: 'coral' | 'sun' | 'ink' | 'cream';
  className?: string;
}) {
  return (
    <p className={`kicker kicker-${tone} ${className}`}>
      <svg viewBox="0 0 34 12" aria-hidden="true" focusable="false" className="kicker-mark">
        <path
          d="M2 8 C 9 2, 15 2, 19 6 S 28 10, 32 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span>{children}</span>
    </p>
  );
}

/** Indicação visual de conteúdo demonstrativo (a ser confirmado). */
export function DemoNote({
  children,
  tone = 'light',
  className = '',
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <p className={`demo-note demo-note-${tone} ${className}`}>
      <PencilLineIcon size={15} />
      <span>{children}</span>
    </p>
  );
}
