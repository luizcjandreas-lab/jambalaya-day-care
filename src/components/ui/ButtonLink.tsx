import type { MouseEventHandler, ReactNode } from 'react';

type Variant = 'sun' | 'ink' | 'outline-light' | 'outline-ink' | 'cream';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  /** posição do ícone */
  iconAfter?: boolean;
  external?: boolean;
  size?: 'md' | 'lg';
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  ariaLabel?: string;
};

/**
 * Link com aparência de botão. Todos os CTAs do site levam a algum lugar
 * real (WhatsApp, âncoras, mapa), por isso são <a> e não <button>.
 */
export function ButtonLink({
  href,
  children,
  variant = 'sun',
  icon,
  iconAfter = false,
  external = false,
  size = 'md',
  className = '',
  onClick,
  ariaLabel,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`btn btn-${variant} ${size === 'lg' ? 'btn-lg' : ''} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon && !iconAfter && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconAfter && <span className="btn-icon btn-icon-after">{icon}</span>}
      {external && <span className="sr-only"> (abre em uma nova aba)</span>}
    </a>
  );
}
