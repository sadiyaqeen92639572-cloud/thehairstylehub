const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://thehairstylehub.com';
const dir = path.join(__dirname, 'content', 'styles');
const all = fs.readdirSync(dir).filter(f => f.endsWith('.json')).map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));

const hubPaths = [...new Set(all.map(r => r.hubPath))].sort();

// Every page carries the new site-wide nav + related blocks from this build, so a single
// uniform lastmod is honest here (not a cosmetic blanket bump on unchanged pages).
const LASTMOD = new Date().toISOString().slice(0, 10);

const urls = [
  `${SITE_URL}/`,
  `${SITE_URL}/about/`,
  `${SITE_URL}/privacy/`,
  ...hubPaths.map(h => `${SITE_URL}/${h}/`),
  ...all.map(r => `${SITE_URL}/${r.hubPath}/${r.slug}/`).sort()
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${LASTMOD}</lastmod></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);
console.log(`✅ Built sitemap.xml (${urls.length} URLs)`);
