"""
Gera as versões otimizadas (WebP + JPG/PNG de fallback) a partir das imagens
originais em public/images/. Rode sempre que trocar uma foto:

    python3 scripts/optimize-images.py

Requer Pillow (pip install pillow). As proporções nunca são alteradas: as
imagens são apenas redimensionadas proporcionalmente.
"""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images"
OUT = SRC / "optimized"
OUT.mkdir(parents=True, exist_ok=True)

PHOTOS = {
    "hero-daycare": [768, 1280, 1672],
    "recreacao-ativa": [640, 1024, 1600],
    "oficinas-criativas": [640, 1024, 1600],
    "festa-infantil": [640, 1024, 1600],
}


def resize(im: Image.Image, width: int) -> Image.Image:
    width = min(width, im.width)
    height = round(im.height * width / im.width)
    return im.resize((width, height), Image.LANCZOS)


def photos() -> None:
    for name, widths in PHOTOS.items():
        im = Image.open(SRC / f"{name}.png").convert("RGB")
        for w in widths:
            r = resize(im, w)
            r.save(OUT / f"{name}-{r.width}.webp", "WEBP", quality=78, method=6)
        # Fallback JPG para navegadores sem WebP
        resize(im, widths[1]).save(OUT / f"{name}-{widths[1]}.jpg", "JPEG", quality=80, optimize=True, progressive=True)
        print(name, im.size)


def logo() -> None:
    im = Image.open(SRC / "logo-jambalaya.png").convert("RGBA")
    for w in (160, 320):
        r = resize(im, w)
        r.save(OUT / f"logo-jambalaya-{w}.png", "PNG", optimize=True)
        r.save(OUT / f"logo-jambalaya-{w}.webp", "WEBP", quality=88, method=6)
    # Favicons (logo inteira, proporção 1:1 preservada)
    resize(im, 32).save(ROOT / "public" / "favicon-32.png", "PNG", optimize=True)
    resize(im, 192).save(ROOT / "public" / "favicon-192.png", "PNG", optimize=True)
    # Apple touch icon: a logo sobre fundo creme (iOS não aceita transparência)
    canvas = Image.new("RGBA", (180, 180), (255, 249, 242, 255))
    small = resize(im, 164)
    canvas.alpha_composite(small, (8, 8))
    canvas.convert("RGB").save(ROOT / "public" / "apple-touch-icon.png", "PNG", optimize=True)


def og_image() -> None:
    """Imagem 1200x630 para compartilhamento (Open Graph)."""
    im = Image.open(SRC / "hero-daycare.png").convert("RGB")
    target_ratio = 1200 / 630
    w, h = im.size
    crop_w = min(w, round(h * target_ratio))
    left = max(0, min(w - crop_w, round(w * 0.62 - crop_w / 2)))
    im = im.crop((left, 0, left + crop_w, h)).resize((1200, 630), Image.LANCZOS)
    im.save(ROOT / "public" / "og-image.jpg", "JPEG", quality=82, optimize=True, progressive=True)


if __name__ == "__main__":
    photos()
    logo()
    og_image()
    print("ok")
