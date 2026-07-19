const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://thehairstylehub.com';
const SITE_NAME = 'The Hairstyle Hub';

const dir = path.join(__dirname, 'content', 'styles');
const all = fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));

const HUBS = [
  { path: 'braids', label: 'Braids', title: 'Braid Hairstyle Tutorials', intro: 'From Fulani to knotless box braids — step-by-step braiding tutorials for natural, coily and textured hair.', crossLink: ['natural-hair-twist-out-tutorial', 'kids-cornrow-hairstyle-tutorial', 'mens-cornrow-braids-tutorial'] },
  { path: 'curly-hair', label: 'Curly Hair', title: 'Curly Hair Styling Tutorials', intro: 'Wash-day routines and styling techniques built for curly and wavy texture, from short curls to curly updos.' },
  { path: 'short-hair', label: 'Short Hair', title: 'Short Hair Styling Tutorials', intro: 'Bobs, pixies and shags — the styling technique behind every short haircut that actually holds shape.' },
  { path: 'natural-hair', label: 'Natural Hair', title: 'Natural Hair Tutorials', intro: 'Twist-outs, Bantu knots and protective styling for 4A-4C natural hair textures.' },
  { path: 'long-hair', label: 'Long Hair', title: 'Long Hair Styling Tutorials', intro: 'Waves, updos and everyday styles for long and lob-length hair.' },
  { path: 'school', label: 'School', title: 'School Hairstyle Tutorials', intro: 'Fast, sturdy hairstyles for school mornings and sports — braided styles that hold through recess and practice.' },
  { path: 'kids-hair', label: 'Kids Hair', title: 'Kids Hairstyle Tutorials', intro: 'Gentle, low-tension hairstyles for toddlers and kids, built around shorter sitting times and sensitive scalps.' },
  { path: 'mens-hair', label: "Men's Hair", title: "Men's Hairstyle Tutorials", intro: "Styling tutorials for men's cuts and textures, from a middle part to cornrows." },
  { path: 'updos', label: 'Updos', title: 'Updo Hairstyle Tutorials', intro: 'Buns and updos, from a sleek slicked-back bun to a deliberately undone messy updo.' },
  { path: 'ponytails', label: 'Ponytails', title: 'Ponytail Hairstyle Tutorials', intro: 'High, low and sleek ponytail techniques that actually hold their shape all day.' },
  { path: 'wedding-hair', label: 'Wedding Hair', title: 'Wedding Hairstyle Tutorials', intro: 'Bridal hairstyles built to last through the ceremony, photos and a full reception of dancing.' },
  { path: 'medium-hair', label: 'Medium Hair', title: 'Medium-Length Hairstyle Tutorials', intro: 'Styling techniques built specifically for medium-length hair, not adapted from long-hair tutorials.' },
  { path: 'wig', label: 'Wig', title: 'Wig Styling Tutorials', intro: 'Frontal installs and everyday wig styling, from a natural hairline melt to a simple swoop bang.' }
];

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

function cardHtml(r) {
  return `    <a class="card" href="/${r.hubPath}/${r.slug}/">
      <img src="/images/${r.slug}/hero.jpg" alt="${r.images.heroAlt}" loading="lazy">
      <div class="card-body">
        <h3>${r.title}</h3>
        <span class="meta">${formatDuration(r.timeToStyle)} · ${r.difficulty}</span>
        <p class="summary">${r.metaDescription.split('—')[0].trim()}</p>
      </div>
    </a>`;
}

const HUB_STYLE = `
  :root{--bg:#fdf6f8;--text:#2b2024;--accent:#c9527a;--muted:#7a6a72;--border:#f0dfe5;}
  html{font-size:18px;}
  body{font-family:Georgia,'Times New Roman',serif;background:var(--bg);color:var(--text);margin:0;line-height:1.7;}
  .wrap{max-width:960px;margin:0 auto;padding:1.5rem;}
  h1{font-family:Inter,sans-serif;font-size:2rem;max-width:640px;}
  .intro{color:var(--muted);max-width:640px;}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.2rem;margin-top:2rem;}
  .card{background:#fff;border:1px solid var(--border);border-radius:12px;overflow:hidden;text-decoration:none;color:var(--text);transition:transform .15s;}
  .card:hover{transform:translateY(-3px);}
  .card img{width:100%;height:160px;object-fit:cover;display:block;}
  .card .card-body{padding:0.8rem 1rem;}
  .card h3{font-family:Inter,sans-serif;font-size:1rem;margin:0 0 0.3rem;}
  .card .meta{font-size:0.78rem;color:var(--muted);font-family:Inter,sans-serif;}
  .card .summary{font-size:0.85rem;color:var(--muted);margin:0.4rem 0 0;line-height:1.5;}
`;

HUBS.forEach(hub => {
  const styles = all.filter(r => r.hubPath === hub.path);
  const cards = styles.map(cardHtml).join('\n');
  const crossStyles = (hub.crossLink || []).map(slug => all.find(r => r.slug === slug)).filter(Boolean);
  const crossSection = crossStyles.length ? `
  <h2 style="font-family:Inter,sans-serif;font-size:1.3rem;margin-top:2.5rem;">More Popular Tutorials</h2>
  <div class="grid">
${crossStyles.map(cardHtml).join('\n')}
  </div>` : '';
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${hub.title} | ${SITE_NAME}</title>
<meta name="description" content="${hub.intro}">
<link rel="canonical" href="${SITE_URL}/${hub.path}/">
<style>${HUB_STYLE}</style>
</head>
<body>
<div class="wrap">
  <p class="meta" style="font-family:Inter,sans-serif"><a href="/">${SITE_NAME}</a> &rsaquo; ${hub.label}</p>
  <h1>${hub.title}</h1>
  <p class="intro">${hub.intro}</p>

  <div class="grid">
${cards}
  </div>
${crossSection}
</div>
<footer style="max-width:960px;margin:0 auto;padding:24px 1.5rem;text-align:center;">
  <p style="font-size:.72rem;color:#7a6a72;">${SITE_NAME} is part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
</footer>
</body>
</html>
`;
  fs.mkdirSync(path.join(__dirname, hub.path), { recursive: true });
  fs.writeFileSync(path.join(__dirname, hub.path, 'index.html'), html);
  console.log(`✅ Built /${hub.path}/index.html (${styles.length} styles)`);
});

// Homepage
const homeCards = HUBS.map(hub => {
  const styles = all.filter(r => r.hubPath === hub.path);
  const rep = styles[0];
  if (!rep) return '';
  return `    <a class="hub-card" href="/${hub.path}/">
      <img src="/images/${rep.slug}/hero.jpg" alt="${rep.images.heroAlt}" loading="lazy">
      <div class="hub-card-body">
        <h3>${hub.label}</h3>
        <span class="subtitle">${styles.length} tutorial${styles.length === 1 ? '' : 's'}</span>
        <p class="summary">${hub.intro}</p>
      </div>
    </a>`;
}).join('\n');

const homeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${SITE_NAME} — Braids, Curly Hair, Updos &amp; More Hairstyle Tutorials</title>
<meta name="description" content="Step-by-step hairstyle tutorials — braids, curly hair, short hair, natural hair, updos, ponytails, wedding hair and more. Real techniques, not just inspiration photos.">
<link rel="canonical" href="${SITE_URL}/">
<meta property="og:title" content="${SITE_NAME} — Braids, Curly Hair, Updos &amp; More Hairstyle Tutorials">
<meta property="og:description" content="Step-by-step hairstyle tutorials — braids, curly hair, short hair, natural hair, updos, ponytails, wedding hair and more.">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}/">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${SITE_NAME} — Braids, Curly Hair, Updos &amp; More Hairstyle Tutorials">
<meta name="twitter:description" content="Step-by-step hairstyle tutorials — braids, curly hair, short hair, natural hair, updos, ponytails, wedding hair and more.">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {"@type":"WebSite","@id":"${SITE_URL}/#website","url":"${SITE_URL}","name":"${SITE_NAME}"},
    {"@type":"Organization","@id":"${SITE_URL}/#organization","name":"${SITE_NAME}","url":"${SITE_URL}","legalName":"Gesmine-Invest Limited","identifier":{"@type":"PropertyValue","propertyID":"UK Company Number","value":"14120136"},"address":{"@type":"PostalAddress","streetAddress":"Hardy House, 269 Poynders Gardens","addressLocality":"London","postalCode":"SW4 8PQ","addressCountry":"GB"}}
  ]
}
</script>
<style>
  :root{--bg:#fdf6f8;--text:#2b2024;--accent:#c9527a;--muted:#7a6a72;--border:#f0dfe5;}
  html{font-size:18px;}
  body{font-family:Georgia,'Times New Roman',serif;background:var(--bg);color:var(--text);margin:0;line-height:1.7;}
  .wrap{max-width:960px;margin:0 auto;padding:1.5rem;}
  h1{font-family:Inter,sans-serif;font-size:2.2rem;max-width:640px;}
  .intro{color:var(--muted);max-width:640px;}
  .hub-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.2rem;margin-top:2rem;}
  .hub-card{background:#fff;border:1px solid var(--border);border-radius:12px;overflow:hidden;text-decoration:none;color:var(--text);display:block;transition:transform .15s;}
  .hub-card:hover{transform:translateY(-3px);}
  .hub-card img{width:100%;height:150px;object-fit:cover;display:block;}
  .hub-card-body{padding:1rem 1.2rem;}
  .hub-card h3{font-family:Inter,sans-serif;margin:0 0 0.3rem;}
  .hub-card .subtitle{font-family:Inter,sans-serif;font-size:0.78rem;color:var(--accent);font-weight:600;text-transform:uppercase;letter-spacing:0.3px;}
  .hub-card .summary{font-size:0.9rem;color:var(--muted);margin:0.4rem 0 0;line-height:1.5;}
</style>
</head>
<body>
<div class="wrap">
  <h1>${SITE_NAME} — Hairstyle Tutorials That Actually Explain the Technique</h1>
  <p class="intro">Step-by-step hairstyle tutorials — braids, curly hair, short hair, natural hair, updos, ponytails, wedding hair, kids hair and more. Real technique explanations, not just inspiration photos.</p>

  <div class="hub-grid">
${homeCards}
  </div>
</div>
<footer style="max-width:960px;margin:0 auto;padding:24px 1.5rem;text-align:center;">
  <p style="font-size:.72rem;color:#7a6a72;">${SITE_NAME} is part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
</footer>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'index.html'), homeHtml);
console.log('✅ Built /index.html (homepage)');
