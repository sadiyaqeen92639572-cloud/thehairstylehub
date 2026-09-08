const fs = require('fs');
const path = require('path');
const { HUB_NAV, HUB_NAV_CSS } = require('./build-common');

const SITE_URL = 'https://thehairstylehub.com';
const SITE_NAME = 'The Hairstyle Hub';

const STYLES_DIR = path.join(__dirname, 'content', 'styles');

// Composite identity: hubPath + '/' + slug. Slugs are unique today but nothing enforces it,
// and the related() modular walk must not desync if two hubs ever share a slug.
const styleKey = s => `${s.hubPath}/${s.slug}`;

// Load every style once, sorted stably on the composite key so the related() walk is deterministic.
const ALL = fs.readdirSync(STYLES_DIR)
  .filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(fs.readFileSync(path.join(STYLES_DIR, f), 'utf8')))
  .sort((a, b) => styleKey(a) < styleKey(b) ? -1 : styleKey(a) > styleKey(b) ? 1 : 0);

function loadStyle(slug) {
  const file = path.join(STYLES_DIR, `${slug}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// Up to 6 internal links per article: every same-hub sibling, then cross-hub styles picked by a
// modular walk over the global order. The walk guarantees the link graph is strongly connected —
// following cross-hub links from any article eventually reaches every other article.
function related(r) {
  const rk = styleKey(r);
  const i = ALL.findIndex(s => styleKey(s) === rk);
  if (i === -1) throw new Error(`style not found in ALL: ${rk}`);
  const siblings = ALL.filter(s => s.hubPath === r.hubPath && styleKey(s) !== rk);
  const cross = [];
  for (let k = 1; cross.length < 4 && k < ALL.length; k++) {
    const c = ALL[(i + k) % ALL.length];
    if (c.hubPath !== r.hubPath) cross.push(c);
  }
  return [...siblings, ...cross].slice(0, 6);
}

function buildRelatedHtml(r) {
  return related(r).map(s =>
    `      <li><a href="/${s.hubPath}/${s.slug}/">${s.title}</a> <span class="rel-hub">${s.hubLabel}</span></li>`
  ).join('\n');
}

function formatDuration(iso) {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  const h = parseInt(m[1] || '0', 10);
  const min = parseInt(m[2] || '0', 10);
  if (h === 0 && min === 0) return '0 min';
  const parts = [];
  if (h > 0) parts.push(`${h} hr`);
  if (min > 0) parts.push(`${min} min`);
  return parts.join(' ');
}

function buildJsonLd(r) {
  const graph = [
    {
      '@type': 'HowTo',
      name: r.title,
      image: [`${SITE_URL}/images/${r.slug}/hero.jpg`],
      author: { '@type': 'Person', name: r.author },
      datePublished: r.datePublished,
      description: r.metaDescription,
      totalTime: r.timeToStyle,
      supply: (r.productsNeeded || []).map(p => ({ '@type': 'HowToSupply', name: p })),
      tool: (r.toolsNeeded || []).map(t => ({ '@type': 'HowToTool', name: t })),
      step: r.steps.map(s => ({ '@type': 'HowToStep', name: s.name, text: s.text }))
    }
  ];

  // reviewCount:0/avgRating:null until real reviews exist — no aggregateRating block until then
  if (r.reviewCount > 0) {
    graph[0].aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: r.avgRating,
      ratingCount: r.reviewCount
    };
  }

  if (r.tips && r.tips.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: r.tips.map(t => ({
        '@type': 'Question',
        name: t.question,
        acceptedAnswer: { '@type': 'Answer', text: t.answer }
      }))
    });
  }

  graph.push({
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: 'Gesmine-Invest Limited',
    identifier: { '@type': 'PropertyValue', propertyID: 'UK Company Number', value: '14120136' },
    address: { '@type': 'PostalAddress', streetAddress: 'Hardy House, 269 Poynders Gardens', addressLocality: 'London', postalCode: 'SW4 8PQ', addressCountry: 'GB' }
  });

  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: r.hubLabel, item: `${SITE_URL}/${r.hubPath}/` },
      { '@type': 'ListItem', position: 3, name: r.title, item: `${SITE_URL}/${r.hubPath}/${r.slug}/` }
    ]
  });

  return { '@context': 'https://schema.org', '@graph': graph };
}

function buildStepsHtml(r) {
  return r.steps.map((s, i) => `
        <li class="style-step">
          <strong>${i + 1}. ${s.name}</strong>
          <p>${s.text}</p>
          ${i === 1 ? `<img src="/images/${r.slug}/texture.jpg" alt="${r.images.textureAlt}" loading="lazy" class="step-photo">` : ''}
        </li>`).join('\n');
}

function buildFaqHtml(r) {
  return r.tips.map(t => `
      <div class="faq-item">
        <h3 class="faq-question">${t.question}</h3>
        <p class="faq-answer">${t.answer}</p>
      </div>`).join('\n');
}

function buildListHtml(items) {
  return (items || []).map(i => `<li>${i}</li>`).join('\n        ');
}

const TEMPLATE = (r, jsonLd) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${r.title} — ${r.difficulty} Difficulty, ${formatDuration(r.timeToStyle)} | ${SITE_NAME}</title>
<meta name="description" content="${r.metaDescription}">
<link rel="canonical" href="${SITE_URL}/${r.hubPath}/${r.slug}/">
<meta property="og:title" content="${r.title}">
<meta property="og:description" content="${r.metaDescription}">
<meta property="og:image" content="${SITE_URL}/images/${r.slug}/hero.jpg">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${r.title}">
<meta name="twitter:description" content="${r.metaDescription}">
<meta name="twitter:image" content="${SITE_URL}/images/${r.slug}/hero.jpg">
<meta name="pinterest-rich-pin" content="true">
<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>
<style>
  :root{--bg:#fdf6f8;--text:#2b2024;--accent:#c9527a;--muted:#7a6a72;--border:#f0dfe5;}
  html{font-size:18px;}
  body{font-family:Georgia,'Times New Roman',serif;background:var(--bg);color:var(--text);margin:0;line-height:1.7;}
  .wrap{max-width:760px;margin:0 auto;padding:1.5rem;}
  .hero{width:100%;max-height:65vh;object-fit:cover;border-radius:12px;margin:1rem 0;display:block;}
  h1{font-family:Inter,sans-serif;font-size:2rem;line-height:1.2;}
  .meta{color:var(--muted);font-size:0.9rem;margin-bottom:1.5rem;}
  .jump-btn{display:inline-block;background:var(--accent);color:#fff;padding:0.6rem 1.2rem;border-radius:8px;text-decoration:none;font-family:Inter,sans-serif;font-weight:600;margin:1rem 0;}
  .story p{margin:1rem 0;}
  .step-photo{width:100%;max-height:55vh;object-fit:cover;border-radius:10px;margin:0.75rem 0;display:block;}
  @media (max-width:600px){
    .wrap{padding:1rem;}
    h1{font-size:1.5rem;}
    .hero{max-height:45vh;}
    .step-photo{max-height:40vh;}
    .style-meta-row{gap:0.8rem;font-size:0.78rem;}
    .pin-cta{flex-direction:row;align-items:flex-start;}
  }
  #style-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:1.5rem;margin:2rem 0;}
  #style-card h2{font-family:Inter,sans-serif;margin-top:0;}
  .style-meta-row{display:flex;gap:1.5rem;flex-wrap:wrap;font-family:Inter,sans-serif;font-size:0.85rem;color:var(--muted);margin-bottom:1rem;}
  .tools-list{list-style:disc;padding-left:1.3rem;}
  .steps-list{list-style:none;padding:0;}
  .style-step{margin-bottom:1.2rem;}
  .faq-section{margin:2rem 0;}
  .faq-question{font-family:Inter,sans-serif;font-size:1.05rem;}
  .pin-cta{display:flex;align-items:center;gap:0.8rem;background:#fbe8ee;border-radius:10px;padding:0.8rem;margin:1.5rem 0;}
  .pin-cta img{width:60px;height:80px;object-fit:cover;border-radius:6px;}
  .related{margin:2.5rem 0 1rem;}
  .related h2{font-family:Inter,sans-serif;font-size:1.3rem;}
  .related ul{list-style:none;padding:0;margin:0;}
  .related li{padding:0.5rem 0;border-bottom:1px solid var(--border);}
  .related a{color:var(--accent);text-decoration:none;font-family:Inter,sans-serif;}
  .related .rel-hub{color:var(--muted);font-size:0.78rem;font-family:Inter,sans-serif;margin-left:0.4rem;}
${HUB_NAV_CSS}</style>
</head>
<body>
${HUB_NAV}
<div class="wrap">
  <p class="meta"><a href="/">${SITE_NAME}</a> &rsaquo; <a href="/${r.hubPath}/">${r.hubLabel}</a> &rsaquo; ${r.title}</p>

  <h1>${r.title}</h1>
  <p class="meta">By <a href="/about/">${r.author}</a> · Published ${r.datePublished} · ${r.difficulty} difficulty · ${formatDuration(r.timeToStyle)}</p>

  <img src="/images/${r.slug}/hero.jpg" alt="${r.images.heroAlt}" class="hero" loading="eager">

  <div class="story">
    <p>${r.storyIntro[0]}</p>
    <p>${r.storyIntro[1]}</p>
  </div>

  <a href="#style-card" class="jump-btn">Jump to Tutorial ↓</a>

  <div class="story">
    <p>${r.storyNote}</p>
  </div>

  <div class="pin-cta">
    <img src="/images/${r.slug}/pin.jpg" alt="${r.images.pinAlt}">
    <span>Save this tutorial for later — pin it to your ${r.hubLabel.toLowerCase()} board.</span>
  </div>

  <section id="style-card">
    <h2>${r.title}</h2>
    <div class="style-meta-row">
      <span>Difficulty: ${r.difficulty}</span>
      <span>Time to style: ${formatDuration(r.timeToStyle)}</span>
      <span>Hair type: ${(r.hairType || []).join(', ')}</span>
      <span>Hair length: ${r.hairLength}</span>
    </div>

    <h3>What You'll Need</h3>
    <ul class="tools-list">
        ${buildListHtml(r.toolsNeeded)}
        ${buildListHtml(r.productsNeeded)}
    </ul>

    <h3>Steps</h3>
    <ol class="steps-list">${buildStepsHtml(r)}
    </ol>
  </section>

  <section class="faq-section">
    <h2>Tips &amp; Common Questions</h2>
    ${buildFaqHtml(r)}
  </section>

  <section class="related">
    <h2>More Tutorials</h2>
    <ul>
${buildRelatedHtml(r)}
    </ul>
  </section>
</div>
<footer style="max-width:720px;margin:0 auto;padding:24px 16px;text-align:center;">
  <p style="font-size:.72rem;color:#666;">${SITE_NAME} is part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
</footer>
</body>
</html>
`;

function build(slug) {
  const r = loadStyle(slug);
  const jsonLd = buildJsonLd(r);
  const html = TEMPLATE(r, jsonLd);
  const outDir = path.join(__dirname, r.hubPath, r.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log(`✅ Built /${r.hubPath}/${r.slug}/index.html`);
}

const slugArg = process.argv[2];
if (slugArg) {
  build(slugArg);
} else {
  const dir = path.join(__dirname, 'content', 'styles');
  fs.readdirSync(dir).filter(f => f.endsWith('.json')).forEach(f => build(f.replace('.json', '')));
}
