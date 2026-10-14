/**
 * Gera formas orgânicas (blobs) determinísticas — sempre a mesma forma para
 * a mesma semente. Inspiradas nos contornos arredondados e irregulares das
 * letras da logo e nas agarras coloridas de escalada do espaço.
 */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function blobPath(seed: number, points = 7, variance = 0.22, size = 200): string {
  const rand = mulberry32(seed);
  const c = size / 2;
  const base = size * 0.4;
  const pts: Array<[number, number]> = [];
  const offset = rand() * Math.PI * 2;

  for (let i = 0; i < points; i++) {
    const angle = offset + (i / points) * Math.PI * 2;
    const r = base * (1 - variance + rand() * variance * 2);
    pts.push([c + Math.cos(angle) * r, c + Math.sin(angle) * r]);
  }

  // Catmull-Rom fechado → curvas Bézier cúbicas
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % points];
    const p3 = pts[(i + 2) % points];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${f(cp1x)},${f(cp1y)} ${f(cp2x)},${f(cp2y)} ${f(p2[0])},${f(p2[1])}`;
  }
  return `${d}Z`;
}
