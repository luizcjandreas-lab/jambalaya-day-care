/**
 * Registro das imagens do site.
 * Os arquivos originais ficam em public/images/ (com os nomes combinados) e
 * as versões leves em public/images/optimized/ — geradas por
 * scripts/optimize-images.py. Para trocar uma foto, substitua o PNG original
 * mantendo o nome e rode o script novamente.
 */

const dir = 'images/optimized';

declare global {
  interface Window {
    /** Preenchido apenas no arquivo de prévia autossuficiente (imagens embutidas). */
    __JAMBA_ASSETS__?: Record<string, string>;
  }
}

/** Caminho da imagem — ou a versão embutida, no arquivo de prévia autossuficiente. */
function asset(path: string): string {
  return (typeof window !== 'undefined' && window.__JAMBA_ASSETS__?.[path]) || path;
}

export type SiteImage = {
  /** srcset WebP (navegadores modernos) */
  webp: string;
  /** imagem de fallback (JPG leve) */
  fallback: string;
  width: number;
  height: number;
  alt: string;
};

function photo(
  name: string,
  widths: number[],
  fallbackWidth: number,
  width: number,
  height: number,
  alt: string,
): SiteImage {
  return {
    webp: widths.map((w) => `${asset(`${dir}/${name}-${w}.webp`)} ${w}w`).join(', '),
    fallback: asset(`${dir}/${name}-${fallbackWidth}.jpg`),
    width,
    height,
    alt,
  };
}

export const images = {
  hero: photo(
    'hero-daycare',
    [768, 1280, 1672],
    1280,
    1672,
    941,
    'Crianças desenhando em uma mesa com uma educadora, em um espaço amplo com pufes coloridos, estante de livros e parede de escalada ao fundo.',
  ),
  recreacao: photo(
    'recreacao-ativa',
    [640, 1024, 1600],
    1024,
    1672,
    941,
    'Crianças percorrem um circuito de obstáculos coloridos enquanto outras jogam basquete, acompanhadas por monitores.',
  ),
  oficinas: photo(
    'oficinas-criativas',
    [640, 1024, 1600],
    1024,
    1774,
    887,
    'Educadora acompanha crianças em uma oficina com pintura, maquete de madeira e experimentos com líquidos coloridos.',
  ),
  festa: photo(
    'festa-infantil',
    [640, 1024, 1600],
    1024,
    1855,
    848,
    'Crianças correm entre cones em uma brincadeira de festa, com balões coloridos, mesa de doces e monitores ao fundo.',
  ),
} satisfies Record<string, SiteImage>;

export const logo = {
  webp: `${asset(`${dir}/logo-jambalaya-160.webp`)} 160w, ${asset(`${dir}/logo-jambalaya-320.webp`)} 320w`,
  fallback: asset(`${dir}/logo-jambalaya-320.png`),
  alt: 'Jambalaya Day Care',
};
