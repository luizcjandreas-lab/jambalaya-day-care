import { logo } from '../../lib/images';

/** Logo oficial — sempre quadrada (1:1), nunca distorcida ou redesenhada. */
export function Logo({
  size = 56,
  className = '',
  eager = false,
}: {
  size?: number;
  className?: string;
  eager?: boolean;
}) {
  return (
    <picture className={`logo ${className}`}>
      <source type="image/webp" srcSet={logo.webp} sizes={`${size}px`} />
      <img
        src={logo.fallback}
        width={size}
        height={size}
        alt={logo.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={{ width: size, height: size }}
      />
    </picture>
  );
}
