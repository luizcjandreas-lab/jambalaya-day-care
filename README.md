# Jambalaya Day Care — site institucional (prévia de apresentação)

Site de página única em **React + TypeScript**, estilizado com **Tailwind CSS v4**, para a Jambalaya Day Care (Jundiaí – SP).

## Como rodar

Requer Node.js 20 ou mais recente.

```bash
npm install
npm run dev        # servidor local com recarga automática → http://localhost:5173
npm run build      # versão de produção em dist/
npm run typecheck  # verificação de tipos (TypeScript)
```

A pasta `dist/` é um site estático: pode ser publicada em qualquer hospedagem (Vercel, Netlify, Hostinger, cPanel…). Na Vercel, o `vercel.json` já define o build (`npm run build`) e a pasta de saída (`dist`).

`npm run artifact` gera, em `artifact/`, uma versão "página única" (CSS, JS e fontes embutidos, imagens ao lado) e o arquivo `jambalaya-day-care-previa.html`, totalmente autossuficiente (imagens embutidas): basta abrir no navegador para apresentar a prévia, sem servidor.

## Onde alterar as informações

Tudo fica em **`src/config/site.ts`**:

- nome, cidade, tempo de atuação e faixa etária;
- telefone e WhatsApp (número e todas as mensagens pré-preenchidas);
- Instagram, endereço e **link do mapa** (`mapUrl`);
- horários (alimentam também a régua visual do card de horários);
- avisos da versão de apresentação (`demo`), incluindo `showBanner` para esconder a faixa do topo.

O título da página, a descrição, os dados estruturados (Schema.org) e o `<noscript>` são gerados a partir desse mesmo arquivo.

## Imagens

- Originais: `public/images/` com os nomes combinados (`logo-jambalaya.png`, `hero-daycare.png`, `festa-infantil.png`, `oficinas-criativas.png`, `recreacao-ativa.png`).
- Versões otimizadas (WebP em vários tamanhos + JPG de fallback): `public/images/optimized/`.

Para trocar uma foto pelos registros reais, substitua o PNG mantendo o nome e rode:

```bash
npm run images   # requer Python 3 com Pillow (pip install pillow)
```

O script também regenera os favicons e a imagem de compartilhamento (`og-image.jpg`). Os textos alternativos ficam em `src/lib/images.ts`.

## Estrutura

```
src/
  config/site.ts          informações centralizadas
  components/layout/      cabeçalho, menu mobile, rodapé, WhatsApp flutuante, abertura
  components/sections/    Hero, Destaques, História, Experiências, Festas, Como funciona,
                          Galeria, Depoimentos, Dúvidas, Contato
  components/ui/          botões, ícones, imagem responsiva, formas orgânicas, entrada animada
  hooks/                  rolagem, parallax, seção ativa, entrada animada, movimento reduzido
  styles/index.css        identidade visual (tokens Tailwind + componentes)
  partials/intro.html     marcação da animação de entrada (aparece já no primeiro quadro)
scripts/
  build.mjs               build com esbuild + compilador oficial do Tailwind v4
  optimize-images.py      geração das imagens otimizadas
```

### Sobre animações e ícones

Framer Motion e Lucide não estavam disponíveis no ambiente em que o site foi desenvolvido, então foram implementadas alternativas sem dependências extras:

- animações em CSS + `IntersectionObserver` (`src/hooks/useReveal.ts`, `src/components/ui/Reveal.tsx`);
- ícones em SVG no mesmo padrão do Lucide (`src/components/ui/Icon.tsx`).

Se quiser trocar depois, `npm install framer-motion lucide-react` funciona normalmente com este projeto.

Tudo respeita `prefers-reduced-motion`: sem flutuação, sem parallax e sem entradas animadas.

## Antes de publicar a versão final

- [ ] Trocar as imagens ilustrativas pelas fotos reais do espaço (e remover o aviso da galeria).
- [ ] Substituir os depoimentos demonstrativos por avaliações reais (`Testimonials.tsx`).
- [ ] Revisar a história, os itens das festas e os horários com a equipe.
- [ ] Confirmar o link definitivo do Google Maps em `site.ts`.
- [ ] Esconder a faixa de prévia (`demo.showBanner: false`) e os avisos de conteúdo demonstrativo.
- [ ] Remover `<meta name="robots" content="noindex, nofollow">` do `index.html`.
- [ ] Trocar `og:image` por uma URL absoluta do domínio final (em `scripts/build.mjs`).
