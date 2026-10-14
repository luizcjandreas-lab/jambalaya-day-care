/**
 * Build do site — esbuild (React + TypeScript) + Tailwind CSS v4.
 *
 *   npm run dev       → servidor local com recarga automática (http://localhost:5173)
 *   npm run build     → versão de produção em dist/
 *   npm run artifact  → página única (CSS/JS/fontes embutidos) em artifact/
 *
 * Tudo o que é informação (nome, cidade, telefone, endereço…) vem de
 * src/config/site.ts — inclusive título, descrição e dados estruturados.
 */
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as esbuild from 'esbuild';
import { compile } from 'tailwindcss';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');
const TAILWIND_DIR = path.resolve(path.dirname(require.resolve('tailwindcss')), '..');

const args = new Set(process.argv.slice(2));
const WATCH = args.has('--watch');
const SERVE = args.has('--serve');
const ARTIFACT = args.has('--artifact');
const OUT = path.join(ROOT, ARTIFACT ? 'artifact' : 'dist');
const PORT = Number(process.env.PORT || 5173);

/** Navegadores-alvo: CSS aninhado e media queries modernas são convertidos. */
const TARGET = ['chrome100', 'edge100', 'firefox100', 'safari15', 'ios15'];

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------
async function walk(dir, exts) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, exts)));
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Carrega o objeto de configuração (TypeScript) para usar no HTML. */
async function loadConfig() {
  const result = await esbuild.build({
    entryPoints: [path.join(SRC, 'config/site.ts')],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
  });
  const file = path.join(os.tmpdir(), `jambalaya-site-config-${process.pid}-${Date.now()}.mjs`);
  await fs.writeFile(file, result.outputFiles[0].text);
  const mod = await import(pathToFileURL(file).href);
  await fs.rm(file, { force: true });
  return mod.site;
}

// ---------------------------------------------------------------------------
// Tailwind CSS v4 (compilador oficial, sem PostCSS)
// ---------------------------------------------------------------------------
async function scanCandidates() {
  const files = await walk(SRC, ['.tsx', '.ts', '.html']);
  const set = new Set();
  for (const file of files) {
    const text = await fs.readFile(file, 'utf8');
    for (const token of text.split(/[\s"'`{}<>()=;,]+/)) {
      if (token && token.length < 120 && /^[!a-z@\[\-]/.test(token)) set.add(token);
    }
  }
  return { candidates: [...set], files };
}

async function buildTailwind(cssPath) {
  const css = await fs.readFile(cssPath, 'utf8');
  const compiler = await compile(css, {
    base: path.dirname(cssPath),
    async loadStylesheet(id, base) {
      let file;
      if (id === 'tailwindcss') file = path.join(TAILWIND_DIR, 'index.css');
      else if (id.startsWith('tailwindcss/')) file = path.join(TAILWIND_DIR, id.slice('tailwindcss/'.length));
      else file = path.resolve(base, id);
      if (!file.endsWith('.css')) file += '.css';
      return { path: file, base: path.dirname(file), content: await fs.readFile(file, 'utf8') };
    },
    async loadModule(id) {
      throw new Error(`Plugins/configs JS não são usados neste projeto: ${id}`);
    },
  });
  const { candidates, files } = await scanCandidates();
  return { css: compiler.build(candidates), files };
}

const tailwindPlugin = {
  name: 'tailwind',
  setup(build) {
    build.onLoad({ filter: /src[\\/]styles[\\/]index\.css$/ }, async (args) => {
      const { css, files } = await buildTailwind(args.path);
      return { contents: css, loader: 'css', resolveDir: path.dirname(args.path), watchFiles: [args.path, ...files] };
    });
  },
};

// ---------------------------------------------------------------------------
// HTML
// ---------------------------------------------------------------------------
function headMeta(site) {
  const title = `${site.name} | Recreação, oficinas e festas em ${site.city} – ${site.state}`;
  const description = `Day care, recreação, oficinas criativas, férias e festas para crianças e jovens de ${site.ages.min} a ${site.ages.max} anos em ${site.city} – ${site.state}. Agende uma visita pelo WhatsApp.`;
  const ogTitle = `${site.name} — um lugar para brincar, criar e viver a infância`;
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="geo.region" content="BR-${site.state}" />`,
    `<meta name="geo.placename" content="${escapeHtml(site.city)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    // Troque por uma URL absoluta (https://seudominio.com.br/og-image.jpg) ao publicar no domínio final
    `<meta property="og:image" content="og-image.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Crianças em atividade criativa no espaço da ${escapeHtml(site.name)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ');
}

/** Dados estruturados apenas com informações reais fornecidas (sem horários demonstrativos). */
function jsonLd(site) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ChildCare',
    name: site.name,
    telephone: `+${site.phone.e164}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: 'BR',
    },
    sameAs: [site.instagram.url],
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function noscript(site) {
  return `<noscript>
  <div style="padding:24px;font-family:system-ui,sans-serif;background:#FFF9F2;color:#0D2F3B">
    <p><strong>${escapeHtml(site.name)}</strong> · ${escapeHtml(site.address.full)} · WhatsApp ${escapeHtml(site.phone.display)}</p>
    <p><a href="${escapeHtml(site.whatsapp.baseUrl)}">Conversar no WhatsApp</a></p>
  </div>
</noscript>`;
}

async function bodyHtml(site) {
  const partial = await fs.readFile(path.join(SRC, 'partials/intro.html'), 'utf8');
  return partial.replace('<!--NOSCRIPT-->', noscript(site));
}

// ---------------------------------------------------------------------------
// Cópia dos arquivos estáticos (public/ → saída)
// ---------------------------------------------------------------------------
async function copyPublic() {
  await fs.mkdir(OUT, { recursive: true });
  await fs.cp(PUBLIC, OUT, {
    recursive: true,
    // os PNGs originais pesados ficam fora da saída — o site usa as versões otimizadas
    filter: (src) => !(path.dirname(src) === path.join(PUBLIC, 'images') && src.endsWith('.png')),
  });
}

// ---------------------------------------------------------------------------
// Builds
// ---------------------------------------------------------------------------
const common = {
  entryPoints: { app: path.join(SRC, 'main.tsx') },
  bundle: true,
  format: 'iife',
  target: TARGET,
  jsx: 'automatic',
  loader: { '.woff': 'file', '.woff2': 'file' },
  external: ['../fonts/*'],
  plugins: [tailwindPlugin],
  logLevel: 'info',
  legalComments: 'none',
};

async function writeIndex(site, { live = false } = {}) {
  const template = await fs.readFile(path.join(ROOT, 'index.html'), 'utf8');
  const styles = `<link rel="stylesheet" href="assets/app.css" />\n    <script src="assets/app.js" defer></script>`;
  const reload = live
    ? `\n<script>new EventSource('/esbuild').addEventListener('change', () => location.reload());</script>`
    : '';
  const html = template
    .replace('<!--HEAD_META-->', headMeta(site))
    .replace('<!--STYLES-->', styles)
    .replace('<!--JSON_LD-->', jsonLd(site))
    .replace('<!--BODY-->', (await bodyHtml(site)) + reload);
  await fs.writeFile(path.join(OUT, 'index.html'), html);
}

async function buildSite() {
  const site = await loadConfig();
  await fs.rm(OUT, { recursive: true, force: true });
  await copyPublic();

  const options = {
    ...common,
    outdir: path.join(OUT, 'assets'),
    minify: !WATCH,
    sourcemap: WATCH ? 'inline' : false,
    define: { 'process.env.NODE_ENV': WATCH ? '"development"' : '"production"' },
  };

  if (WATCH) {
    const ctx = await esbuild.context(options);
    await writeIndex(site, { live: true });
    await ctx.watch();
    if (SERVE) {
      const { port } = await ctx.serve({ servedir: OUT, port: PORT });
      console.log(`\n  Jambalaya rodando em http://localhost:${port}\n`);
    }
    return;
  }

  await esbuild.build(options);
  await writeIndex(site);
  console.log(`\n  Build pronto em ${path.relative(ROOT, OUT)}/\n`);
}

/**
 * Versão "página única": CSS, JS e fontes embutidos no HTML; imagens ao lado.
 * Útil para hospedar a prévia em qualquer lugar ou enviar como arquivo.
 */
async function buildArtifact() {
  const site = await loadConfig();
  await fs.rm(OUT, { recursive: true, force: true });
  await copyPublic();

  const result = await esbuild.build({
    ...common,
    outdir: path.join(OUT, 'assets'),
    write: false,
    minify: true,
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'warning',
  });
  let js = '';
  let css = '';
  for (const file of result.outputFiles) {
    if (file.path.endsWith('.js')) js = file.text;
    if (file.path.endsWith('.css')) css = file.text;
  }

  // Fontes embutidas como data URI
  css = await replaceAsync(css, /url\((["']?)\.\.\/fonts\/([^"')]+)\1\)/g, async (_m, _q, name) => {
    const buf = await fs.readFile(path.join(PUBLIC, 'fonts', name));
    return `url("data:font/woff;base64,${buf.toString('base64')}")`;
  });

  js = js.replace(/<\/script/gi, '<\\/script');
  css = css.replace(/<\/style/gi, '<\\/style');

  const body = await bodyHtml(site);

  // 1) Fragmento para publicação como página hospedada (imagens ao lado, em images/)
  const fragment = [
    `<title>${escapeHtml(site.name)}</title>`,
    headMeta(site).replace(/<title>.*?<\/title>\s*/, ''),
    '<meta name="robots" content="noindex, nofollow" />',
    '<meta name="theme-color" content="#0D2F3B" />',
    '<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png" />',
    `<style>${css}</style>`,
    body,
    `<script>${js}</script>`,
  ].join('\n');
  await fs.writeFile(path.join(OUT, 'index.html'), fragment);

  // 2) Arquivo único e autossuficiente (imagens embutidas) — abre direto no navegador.
  //    Cada imagem é embutida uma única vez (na maior versão WebP) e todos os
  //    tamanhos/fallbacks apontam para ela, para manter o arquivo leve.
  const optimizedDir = path.join(PUBLIC, 'images', 'optimized');
  const files = await fs.readdir(optimizedDir);
  const largestWebp = {};
  for (const f of files) {
    const m = f.match(/^(.*)-(\d+)\.webp$/);
    if (m && (!largestWebp[m[1]] || Number(m[2]) > largestWebp[m[1]].w)) largestWebp[m[1]] = { w: Number(m[2]), f };
  }
  const assets = {};
  for (const f of files) {
    const base = f.replace(/-\d+\.(webp|jpg|png)$/, '');
    const pick = largestWebp[base];
    if (!pick) continue;
    if (!assets[`__${base}`]) {
      const buf = await fs.readFile(path.join(optimizedDir, pick.f));
      assets[`__${base}`] = `data:image/webp;base64,${buf.toString('base64')}`;
    }
    assets[`images/optimized/${f}`] = `@@${base}`;
  }
  const dataFor = (rel) => {
    const ref = assets[rel];
    return ref ? assets[`__${ref.slice(2)}`] : null;
  };
  const inlineImages = (text) =>
    replaceAsync(text, /images\/optimized\/[\w.-]+\.(?:webp|jpg|png)/g, async (rel) => dataFor(rel) ?? rel);
  // Mapa usado pelo app (src/lib/images.ts): caminho → id curto; os dados ficam uma vez só
  const assetIds = Object.fromEntries(Object.entries(assets).filter(([k]) => !k.startsWith('__')));
  const assetData = Object.fromEntries(
    Object.entries(assets)
      .filter(([k]) => k.startsWith('__'))
      .map(([k, v]) => [k.slice(2), v]),
  );
  const assetScript = `<script>(function(){var d=${JSON.stringify(assetData)},m=${JSON.stringify(assetIds)},o={};for(var k in m){o[k]=d[m[k].slice(2)];}window.__JAMBA_ASSETS__=o;})();</script>`;
  const favicon = `data:image/png;base64,${(await fs.readFile(path.join(PUBLIC, 'favicon-32.png'))).toString('base64')}`;
  const standalone = [
    '<!doctype html>',
    '<html lang="pt-BR">',
    '<head>',
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />',
    headMeta(site),
    '<meta name="robots" content="noindex, nofollow" />',
    '<meta name="theme-color" content="#0D2F3B" />',
    `<link rel="icon" type="image/png" sizes="32x32" href="${favicon}" />`,
    `<style>${css}</style>`,
    '</head>',
    '<body>',
    assetScript,
    await inlineImages(body),
    `<script>${js}</script>`,
    '</body>',
    '</html>',
  ].join('\n');
  const standaloneName = 'jambalaya-day-care-previa.html';
  await fs.writeFile(path.join(OUT, standaloneName), standalone);

  await fs.rm(path.join(OUT, 'fonts'), { recursive: true, force: true });
  console.log(
    `\n  Página única: ${path.relative(ROOT, OUT)}/index.html (${(fragment.length / 1024).toFixed(0)} KB)` +
      `\n  Arquivo autossuficiente: ${path.relative(ROOT, OUT)}/${standaloneName} (${(standalone.length / 1024 / 1024).toFixed(1)} MB)\n`,
  );
}

async function replaceAsync(str, regex, fn) {
  const parts = [];
  let last = 0;
  for (const m of str.matchAll(regex)) {
    parts.push(str.slice(last, m.index), await fn(...m));
    last = m.index + m[0].length;
  }
  parts.push(str.slice(last));
  return parts.join('');
}

(ARTIFACT ? buildArtifact() : buildSite()).catch((err) => {
  console.error(err);
  process.exit(1);
});
