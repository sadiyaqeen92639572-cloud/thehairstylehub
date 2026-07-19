// Builds pinterest-batches/YYYY-MM-DD.csv from content/styles/*.json, cross-referencing
// pinterest_volume from the master keyword CSV. google_volume/competition are left blank
// (no Keywords Everywhere pass done for this niche yet — PinClicks volume only).
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://thehairstylehub.com';
const SITE_NAME = 'thehairstylehub.com';
const DATE = '2026-07-19';

const kwCsvPath = '/home/brice/.claude/skills/daily-hairstyle-factory/references/pinclicks-hairstyles-2026-07.csv';
const kwLines = fs.readFileSync(kwCsvPath, 'utf8').trim().split('\n').slice(1);
const kwMap = new Map();
kwLines.forEach(line => {
  const [keyword, volume] = line.split(',');
  kwMap.set(keyword.trim().toLowerCase(), volume);
});

function lookupVolume(targetKeywords) {
  for (const kw of targetKeywords) {
    const v = kwMap.get(kw.trim().toLowerCase());
    if (v) return v;
  }
  return '';
}

const dir = path.join(__dirname, 'content', 'styles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const rows = ['date,site,style_title,url,target_keyword,pinterest_volume,google_volume,competition,pin_image_url'];
let included = 0, skipped = 0;

files.forEach(f => {
  const s = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const pageFile = path.join(__dirname, s.hubPath, s.slug, 'index.html');
  const pinFile = path.join(__dirname, 'images', s.slug, 'pin.jpg');
  if (!fs.existsSync(pageFile)) { console.log(`⏭  skip ${s.slug} — page file missing`); skipped++; return; }
  if (!fs.existsSync(pinFile)) { console.log(`⏭  skip ${s.slug} — pin image missing`); skipped++; return; }

  const url = `${SITE_URL}/${s.hubPath}/${s.slug}/`;
  const pinImageUrl = `${SITE_URL}/images/${s.slug}/pin.jpg`;
  const targetKeyword = s.targetKeywords[0];
  const pinterestVolume = lookupVolume(s.targetKeywords);

  const esc = v => `"${String(v).replace(/"/g, '""')}"`;
  rows.push([DATE, SITE_NAME, esc(s.title), url, esc(targetKeyword), pinterestVolume, '', '', pinImageUrl].join(','));
  included++;
});

const outDir = path.join(__dirname, 'pinterest-batches');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${DATE}.csv`);
fs.writeFileSync(outPath, rows.join('\n') + '\n');
console.log(`\n✅ Built ${outPath} — ${included} rows included, ${skipped} skipped (missing page or pin image)`);
