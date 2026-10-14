import type { CSSProperties } from 'react';
import type { SiteImage } from '../../lib/images';

type PictureProps = {
  image: SiteImage;
  /** atributo sizes — quanto da tela a imagem ocupa */
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** foco do recorte (object-position) */
  position?: string;
  /** true para imagens que aparecem logo na abertura */
  priority?: boolean;
  alt?: string;
  style?: CSSProperties;
};

/** Imagem responsiva: WebP em vários tamanhos + JPG leve de fallback. */
export function Picture({
  image,
  sizes,
  className = '',
  imgClassName = '',
  position,
  priority = false,
  alt,
  style,
}: PictureProps) {
  return (
    <picture className={className} style={style}>
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={image.fallback}
        width={image.width}
        height={image.height}
        alt={alt ?? image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        className={imgClassName}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}
