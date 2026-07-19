// Batch image generation for all content/styles/*.json — reuses the kie.ai z-image
// contract (createTask -> poll -> download) with local on-disk caching per slug.
const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.KIE_AI_API_KEY;
if (!API_KEY) {
  console.error('Missing KIE_AI_API_KEY env var');
  process.exit(1);
}

function apiPost(pathname, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request({
      hostname: 'api.kie.ai', path: pathname, method: 'POST',
      headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    }, res => {
      let chunks = ''; res.on('data', c => chunks += c); res.on('end', () => resolve(JSON.parse(chunks)));
    });
    req.on('error', reject); req.write(data); req.end();
  });
}
function apiGet(pathname) {
  return new Promise((resolve, reject) => {
    https.get({ hostname: 'api.kie.ai', path: pathname, headers: { 'Authorization': `Bearer ${API_KEY}` } }, res => {
      let chunks = ''; res.on('data', c => chunks += c); res.on('end', () => resolve(JSON.parse(chunks)));
    }).on('error', reject);
  });
}
function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}
async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function generateOne(prompt, aspectRatio, outPath) {
  if (fs.existsSync(outPath)) { console.log(`⏭  skip (exists) ${outPath}`); return; }
  const create = await apiPost('/api/v1/jobs/createTask', { model: 'z-image', input: { prompt, aspect_ratio: aspectRatio, nsfw_checker: true } });
  if (create.code !== 200) throw new Error(`createTask failed: ${JSON.stringify(create)}`);
  const taskId = create.data.taskId;
  for (let i = 0; i < 25; i++) {
    await sleep(4000);
    const poll = await apiGet(`/api/v1/jobs/recordInfo?taskId=${taskId}`);
    const state = poll.data && poll.data.state;
    if (state === 'success') {
      const url = JSON.parse(poll.data.resultJson).resultUrls[0];
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      await download(url, outPath);
      console.log(`✅ ${outPath}`);
      return;
    }
    if (state === 'fail') { console.error(`❌ Generation failed for ${outPath}: ${poll.data.failMsg}`); return; }
  }
  console.error(`⏱  Timed out polling taskId ${taskId} for ${outPath}`);
}

const HAIR_TEXTURE_DESC = {
  coily: 'tightly coiled, textured 4C afro-textured hair',
  kinky: 'densely coiled kinky natural hair texture',
  curly: 'defined spiral curly hair texture',
  wavy: 'loose soft wavy hair texture',
  straight: 'sleek straight hair texture',
  fine: 'fine, soft baby-fine hair texture'
};

function textureDescFor(style) {
  const types = style.hairType || ['wavy'];
  return HAIR_TEXTURE_DESC[types[0]] || 'natural hair texture';
}

// A short, human, non-brand, non-identifiable-person description for each style —
// used to build the three prompt variants per the Étape 3 prompt table.
const STYLE_VISUALS = {
  'fulani-braids-tutorial': 'Fulani braids with a flat cornrowed center part and hanging box braids on the sides, small gold cuffs near the face, on coily afro-textured hair',
  'knotless-box-braids-tutorial': 'knotless box braids styled half-up half-down, small neat parts, on coily afro-textured hair',
  'cornrow-braids-tutorial': 'straight-back cornrow braids close to the scalp in clean even rows, on coily natural hair',
  'short-curly-hairstyle-tutorial': 'short curly hairstyle with defined bouncy curls sitting above the shoulder',
  'curly-bun-updo-tutorial': 'curly bun updo with visible curl texture and a few loose curls framing the face',
  'layered-bob-styling-tutorial': 'layered bob haircut styled with soft volume and a slight inward curve at the ends, straight hair',
  'pixie-cut-styling-tutorial': 'textured pixie cut hairstyle with lifted roots and piecey top texture, straight hair',
  'short-shag-haircut-tutorial': 'short shag haircut with tousled undone layers and a heavy textured fringe, wavy hair',
  'natural-hair-twist-out-tutorial': 'twist-out hairstyle on 4C natural hair with defined, elongated coily curls, full afro-textured volume',
  'rubber-band-ponytail-natural-hair-tutorial': 'rubber-band stretched ponytail on natural coily hair with several small elastic bands stacked down the length',
  'bantu-knots-tutorial': 'Bantu knots styled evenly across natural coily afro-textured hair',
  'long-bob-lob-styling-tutorial': 'long bob (lob) haircut styled with soft loose S-wave curls, straight-to-wavy hair',
  'claw-clip-updo-long-hair-tutorial': 'twisted claw clip updo on long straight hair with volume at the crown',
  'volleyball-hairstyle-tutorial': 'two tight low French braids sports hairstyle, athletic look, on wavy hair',
  'first-day-of-school-braided-hairstyle-tutorial': 'two neat Dutch braids on a school-age girl, center part, with small hair bows',
  'toddler-girl-hairstyle-tutorial': 'two low pigtail puffs on a toddler girl with soft curly hair, gentle low-tension style',
  'kids-cornrow-hairstyle-tutorial': 'simple wide cornrow rows on a child\'s coily natural hair with colorful beads at the ends',
  'middle-part-haircut-styling-tutorial': 'a young man with a modern middle-part hairstyle, matte texture, medium-length straight hair',
  'mens-cornrow-braids-tutorial': 'a young man with straight-back cornrow braids in even rows on short coily hair',
  'slicked-back-bun-tutorial': 'sleek slicked-back bun hairstyle with a smooth flyaway-free finish, straight hair',
  'messy-updo-bun-tutorial': 'messy updo bun hairstyle with loose texture and soft face-framing pieces, wavy hair',
  'high-ponytail-tutorial': 'sleek high ponytail hairstyle with lifted volume at the crown, straight hair',
  'sleek-low-ponytail-tutorial': 'sleek low ponytail hairstyle with a smooth polished finish at the nape, straight hair',
  'half-up-half-down-wedding-hairstyle-tutorial': 'half-up half-down bridal hairstyle with a braided crown and loose curls, wavy hair, wearing a simple veil',
  'bridal-bun-tutorial': 'soft low bridal bun hairstyle with loose face-framing curled pieces, wavy hair',
  'easy-medium-length-hairstyle-tutorial': 'medium-length hair styled in a simple twisted half-up style, wavy hair',
  'medium-length-braided-hairstyle-tutorial': 'medium-length hair styled in an angled side braid, deep side part, wavy hair',
  'frontal-wig-install-tutorial': 'a lace front wig installed with a natural melted hairline and styled baby hairs, on a Black woman, straight-textured wig hair',
  'wig-swoop-styling-tutorial': 'a wig styled with a deep side-part swoop bang across the forehead, straight hair'
};

function buildPrompts(style) {
  const visual = STYLE_VISUALS[style.slug] || style.title;
  return {
    hero: `Professional hairstyling photography, ${visual}, soft studio lighting, clean neutral background, realistic beauty blog photography, no visible logos or text`,
    pin: `45 degree angle beauty photography, ${visual}, soft natural light, bright airy background softly blurred, realistic beauty blog photography, no visible logos or text`,
    texture: `Close-up beauty photography, ${visual.split(',')[0]}, shallow depth of field, soft window light, realistic beauty blog photography, focus on hair texture and technique detail, no visible logos or text`
  };
}

async function main() {
  const dir = path.join(__dirname, 'content', 'styles');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const only = process.argv[2]; // optional single slug for testing
  for (const f of files) {
    const style = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    if (only && style.slug !== only) continue;
    const prompts = buildPrompts(style);
    const outDir = path.join(__dirname, 'images', style.slug);
    console.log(`\n=== ${style.slug} ===`);
    await generateOne(prompts.hero, '3:4', path.join(outDir, 'hero.jpg'));
    await generateOne(prompts.pin, '9:16', path.join(outDir, 'pin.jpg'));
    await generateOne(prompts.texture, '3:4', path.join(outDir, 'texture.jpg'));
  }
  console.log('\nDone.');
}

main().catch(e => { console.error(e); process.exit(1); });
