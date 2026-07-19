// Removes consumed keywords from the master PinClicks CSV (filter + rewrite, never append-only),
// per SKILL.md Étape 5. A keyword counts as consumed if it exactly matches any targetKeywords
// entry from a built content/styles/*.json.
const fs = require('fs');
const path = require('path');

const csvPath = '/home/brice/.claude/skills/daily-hairstyle-factory/references/pinclicks-hairstyles-2026-07.csv';
const dir = path.join(__dirname, 'content', 'styles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const consumed = new Set();
files.forEach(f => {
  const s = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  (s.targetKeywords || []).forEach(k => consumed.add(k.trim().toLowerCase()));
});

const lines = fs.readFileSync(csvPath, 'utf8').trim().split('\n');
const header = lines[0];
const body = lines.slice(1);

const kept = [];
let removed = 0;
body.forEach(line => {
  const keyword = line.split(',')[0].trim().toLowerCase();
  if (consumed.has(keyword)) {
    removed++;
  } else {
    kept.push(line);
  }
});

fs.writeFileSync(csvPath, [header, ...kept].join('\n') + '\n');
console.log(`Consumed keyword set size: ${consumed.size}`);
console.log(`Removed ${removed} rows from master CSV, ${kept.length} remaining (was ${body.length}).`);

const notFound = [...consumed].filter(k => !body.some(l => l.split(',')[0].trim().toLowerCase() === k));
if (notFound.length) {
  console.log('\nTarget keywords not found as exact matches in master CSV (likely secondary/long-tail keyword, not the primary hub row):');
  notFound.forEach(k => console.log(' -', k));
}
