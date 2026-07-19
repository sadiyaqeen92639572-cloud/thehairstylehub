const fs = require('fs');
const path = require('path');

const AUTHOR = 'Jasmine Carter';
const DATE = '2026-07-19';

// Each entry maps directly to the SKILL.md Étape 4 JSON schema.
const STYLES = [
  // ---------------- BRAIDS ----------------
  {
    slug: 'fulani-braids-tutorial', title: 'Fulani Braids Tutorial', hubPath: 'braids', hubLabel: 'Braids',
    metaDescription: 'How to do Fulani braids step by step — the cornrow-and-hanging-braid combo that works beautifully on natural 4A-4C hair and holds for 4-6 weeks.',
    targetKeywords: ['fulani braids hairstyles', 'fulani braids'],
    difficulty: 'Hard', timeToStyle: 'PT3H30M', hairType: ['coily', 'kinky'], hairLength: 'medium-to-long',
    toolsNeeded: ['Rat-tail comb', 'Edge control brush', 'Hair clips', 'Braiding gel', 'Elastic bands'],
    productsNeeded: ['Braiding hair (pre-stretched, 3-4 packs)', 'Edge control gel', 'Braid spray or mousse'],
    steps: [
      { name: 'Prep and section', text: 'Wash and deep condition the hair first, then blow-dry or stretch it so it is easier to cornrow evenly. Part off a center strip from front to back, then divide the rest of the head into large panels with clips.' },
      { name: 'Cornrow the center', text: 'Cornrow the center strip flat against the scalp, feeding in braiding hair as you go, from the front hairline to the nape.' },
      { name: 'Add the side cornrows', text: 'Cornrow two to four rows on each side of the center strip, curving them to frame the face. These rows stay flat against the scalp like a traditional cornrow.' },
      { name: 'Drop the hanging braids', text: 'From the outer sections, braid regular hanging box braids using the pre-stretched hair, working from root to tip in three even strands.' },
      { name: 'Seal and finish', text: 'Dip the ends in warm water to seal, or use small elastic bands. Apply a light braid spray to reduce frizz and lay the edges with a soft brush.' }
    ],
    tips: [
      { question: 'Can I do Fulani braids on short natural hair?', answer: 'Yes, as long as the hair is at least 2-3 inches long — the added braiding hair carries most of the length, so the cornrow base doesn\'t need to be long, just long enough to grip.' },
      { question: 'How long do Fulani braids realistically last?', answer: 'With a satin bonnet at night and light oil on the scalp every few days, 4-6 weeks is realistic before the new growth at the root makes them look messy.' },
      { question: 'Is this doable alone, on my own head?', answer: 'The center cornrow section is manageable solo with practice, but the side rows and hanging braids are much easier — and faster — with a second pair of hands.' }
    ],
    storyIntro: [
      'Fulani braids are the style that shows up on every braid inspiration board for a reason — a flat cornrowed center with hanging box braids on the sides, usually finished with a few beads or gold cuffs near the face.',
      'They\'re a protective style at heart: the cornrowed base means less daily manipulation of the natural hair underneath, which is why they hold up so well for weeks at a time on coily and kinky textures.'
    ],
    storyNote: 'Stretch the hair before braiding — cornrowing over shrunk, unstretched coils is where most of the tension headaches (and eventual breakage) come from.',
    images: { heroAlt: 'Fulani braids with cornrowed center part and hanging box braids on coily natural hair', textureAlt: 'Close-up of the cornrowed center section feeding into hanging Fulani braids', pinAlt: 'Fulani braids hairstyle with gold cuffs, front-facing view' }
  },
  {
    slug: 'knotless-box-braids-tutorial', title: 'Knotless Box Braids Tutorial', hubPath: 'braids', hubLabel: 'Braids',
    metaDescription: 'How to do knotless box braids at home — the feed-in technique that starts with your real hair to avoid the tight bump at the root that regular box braids leave.',
    targetKeywords: ['knotless braids hairstyles', 'knotless box braids'],
    difficulty: 'Hard', timeToStyle: 'PT4H', hairType: ['coily', 'kinky'], hairLength: 'medium-to-long',
    toolsNeeded: ['Rat-tail comb', 'Sectioning clips', 'Hair ties'],
    productsNeeded: ['Braiding hair (pre-stretched)', 'Braid gel or mousse', 'Light oil for the scalp'],
    steps: [
      { name: 'Section the head', text: 'Divide the hair into small, even squares with the rat-tail comb, clipping the rest out of the way as you go. Smaller sections mean smaller, neater braids but more time.' },
      { name: 'Start with a feed-in braid', text: 'Braid three small strands of the natural hair alone for the first inch or two — no extension hair added yet — using a regular three-strand plait.' },
      { name: 'Feed in the extension hair gradually', text: 'Start adding small pieces of braiding hair into the braid a little at a time, rather than all at once, which is what avoids the tight knot and bump at the root.' },
      { name: 'Braid to the end', text: 'Once the extension hair is fully incorporated, continue a regular three-strand braid down to the length you want.' },
      { name: 'Seal the ends', text: 'Dip the ends in hot water for a couple of seconds to seal them, or use small rubber bands if you prefer not to use heat.' }
    ],
    tips: [
      { question: 'Why do knotless braids feel lighter than regular box braids?', answer: 'Because the extension hair is fed in gradually instead of knotted at the root, there\'s no small hard bump anchoring the weight — that bump is usually what causes the scalp tension and headaches with traditional box braids.' },
      { question: 'How small should the sections be for a natural-looking result?', answer: 'Roughly pencil-eraser to pinky-finger width gives the most natural, undetectable root — bigger sections braid faster but look chunkier and less realistic.' },
      { question: 'Can knotless braids be done on relaxed hair?', answer: 'Yes, but the feed-in technique relies on the natural hair having enough grip texture to hold the first inch of braid — very silky relaxed hair may need a small amount of gel at the root to keep it from slipping.' }
    ],
    storyIntro: [
      'Knotless box braids solved the single biggest complaint about traditional box braids: the tight little knot at the root where the extension hair gets tied in, which is exactly where the scalp tension and post-install headaches come from.',
      'Instead, the technique starts with a small feed-in braid of your own hair, then adds the extension hair gradually — the braid grows into its full thickness instead of starting there, which is also why the front rows lie flatter and more natural along the hairline.'
    ],
    storyNote: 'Budget more time than you expect for the first few rows around the hairline — the feed-in technique is genuinely slower there, and rushing it is what leaves a visible lump where the extension hair was added too fast.',
    images: { heroAlt: 'Knotless box braids styled in a half-up half-down look on coily hair', textureAlt: 'Close-up of a knotless braid feed-in root showing no bump or knot', pinAlt: 'Knotless box braids hairstyle, side profile with beads at the ends' }
  },
  {
    slug: 'cornrow-braids-tutorial', title: 'Cornrow Braids Tutorial', hubPath: 'braids', hubLabel: 'Braids',
    metaDescription: 'How to cornrow hair straight back, beginner-friendly — the flat, close-to-scalp braid technique that works on natural, relaxed and straightened hair alike.',
    targetKeywords: ['cornrow hairstyles', 'cornrow braids'],
    difficulty: 'Medium', timeToStyle: 'PT1H30M', hairType: ['coily', 'wavy', 'straight'], hairLength: 'medium-to-long',
    toolsNeeded: ['Rat-tail comb', 'Hair clips', 'Bobby pins'],
    productsNeeded: ['Edge control or gel', 'Light holding spray'],
    steps: [
      { name: 'Detangle and part', text: 'Detangle the hair fully, then part off a straight row from the hairline to the nape using the rat-tail comb — a straight, even part is what keeps the finished row looking clean.' },
      { name: 'Start the underhand braid', text: 'Take a small section at the front of the part and split it into three strands. Cross the outer strands underneath the middle strand (not over) — this is the underhand technique that makes the braid sit flat.' },
      { name: 'Feed in hair as you go', text: 'With each crossover, pick up a small new section of hair from along the part and add it into the strand before crossing, keeping tension even so the row stays flat against the scalp.' },
      { name: 'Braid to the end', text: 'Once you reach the nape and there\'s no more hair to feed in, continue a regular three-strand braid to the ends and secure with a small elastic.' },
      { name: 'Repeat and finish edges', text: 'Repeat for each row, then smooth the front hairline with a small amount of edge control and a soft-bristle brush.' }
    ],
    tips: [
      { question: 'What makes a cornrow lie flat instead of standing up?', answer: 'Crossing the strands underneath rather than over — that "underhand" motion is the entire difference between a flat cornrow and a raised braid, and it takes practice to get consistent on your own head.' },
      { question: 'Is it possible to cornrow straight, non-textured hair?', answer: 'Yes, though straight hair has less natural grip, so a small amount of gel or mousse at the root of each row helps the braid hold its shape through the day.' },
      { question: 'How do I keep the parts straight without a mirror behind my head?', answer: 'A handheld mirror angled against a wall mirror lets you see the back of your part while braiding — doing the first one or two rows slowly and checking often is faster in the long run than redoing a crooked row.' }
    ],
    storyIntro: [
      'Cornrows are the foundation technique behind most protective styles — Fulani braids, feed-in ponytails and braided updos all start from the same flat, underhand cornrow.',
      'Learning the basic straight-back row first, before attempting a curved or geometric part, is the fastest way to build the muscle memory for tension and feed-in speed that every other cornrow style builds on.'
    ],
    storyNote: 'Even tension matters more than speed for a first attempt — a slightly loose cornrow can be fixed by redoing one row, but pulling too tight across the whole head can cause real scalp irritation.',
    images: { heroAlt: 'Straight-back cornrow braids on natural hair, close to the scalp', textureAlt: 'Close-up of an underhand cornrow crossover mid-braid', pinAlt: 'Finished cornrow braids hairstyle, back view showing clean straight rows' }
  },

  // ---------------- CURLY HAIR ----------------
  {
    slug: 'short-curly-hairstyle-tutorial', title: 'Short Curly Hairstyle Tutorial', hubPath: 'curly-hair', hubLabel: 'Curly Hair',
    metaDescription: 'How to style short curly hair for definition without frizz — a wash-day routine built for curls that sit above the shoulder, where product weight matters most.',
    targetKeywords: ['short curly hairstyles', 'short curly hair styling'],
    difficulty: 'Easy', timeToStyle: 'PT20M', hairType: ['curly', 'wavy'], hairLength: 'short',
    toolsNeeded: ['Wide-tooth comb', 'Microfiber towel or old t-shirt', 'Diffuser attachment (optional)'],
    productsNeeded: ['Lightweight leave-in conditioner', 'Curl cream or gel'],
    steps: [
      { name: 'Detangle in the shower', text: 'Apply conditioner and detangle with a wide-tooth comb while the hair is soaked and slippery — detangling dry short curls causes far more breakage and frizz.' },
      { name: 'Scrunch out water', text: 'Flip the hair forward and scrunch with a microfiber towel or cotton t-shirt to remove excess water without roughing up the cuticle the way a regular towel does.' },
      { name: 'Apply product to soaking-wet hair', text: 'Rake a small amount of leave-in conditioner through, then scrunch in a curl cream or gel while the hair is still dripping — product applied to already-drying hair sits on top instead of coating each strand.' },
      { name: 'Dry without disturbing the curls', text: 'Air dry, or diffuse on low heat with the diffuser cupped close to the scalp, lifting sections gently rather than moving the dryer back and forth.' },
      { name: 'Break the cast gently', text: 'Once fully dry, scrunch out the crunchy gel cast with clean, dry hands to release soft, separated curls.' }
    ],
    tips: [
      { question: 'Why do short curls frizz more than long curls?', answer: 'Shorter curls have less weight pulling them down, so any excess frizz or halo effect is more visible — the fix is less about more product and more about applying it evenly to soaking-wet hair.' },
      { question: 'Is a diffuser worth it for short curly hair?', answer: 'It speeds up drying time significantly and helps curls clump instead of frizzing loose, though air-drying gives the softest result if time allows.' },
      { question: 'How often should short curly hair actually be washed?', answer: 'Every 2-4 days is typical for most curl patterns — over-washing strips the natural oils curls rely on for definition, while refreshing with water between washes keeps curls looking fresh.' }
    ],
    storyIntro: [
      'Short curly hair behaves differently from long curly hair — with less weight to pull the curl down, the same amount of product that looks perfect on longer hair can leave short curls looking heavy or crunchy instead of soft.',
      'The technique that actually works for shorter lengths leans on applying product to soaking-wet hair and letting gravity and drying time do the rest, rather than trying to compensate with more gel.'
    ],
    storyNote: 'Resist the urge to touch the hair while it dries — every time fingers move through a curl before it sets fully, that curl loses definition and picks up frizz.',
    images: { heroAlt: 'Short curly hairstyle with defined bouncy curls above the shoulder', textureAlt: 'Close-up of individually defined short curls after scrunching out the gel cast', pinAlt: 'Short curly hairstyle, three-quarter angle showing curl clumping' }
  },
  {
    slug: 'curly-bun-updo-tutorial', title: 'Curly Bun Updo Tutorial', hubPath: 'curly-hair', hubLabel: 'Curly Hair',
    metaDescription: 'How to put curly hair up in a bun without flattening the curl pattern — a wrap-and-pin method that keeps volume instead of the usual pancaked bun look.',
    targetKeywords: ['curly bun hairstyles', 'curly hair updo'],
    difficulty: 'Easy', timeToStyle: 'PT10M', hairType: ['curly', 'wavy'], hairLength: 'medium-to-long',
    toolsNeeded: ['Wide-tooth comb or fingers', 'Scrunchie (not a thin elastic)', 'Bobby pins'],
    productsNeeded: ['Curl refresher spray', 'Light-hold gel'],
    steps: [
      { name: 'Refresh dry curls', text: 'Mist dry curls lightly with a water-based refresher spray and scrunch them back into shape with clean hands rather than combing them out flat.' },
      { name: 'Gather loosely', text: 'Gather the hair at the crown or nape using fingers instead of a brush, keeping the curl clumps intact rather than smoothing them into one flat section.' },
      { name: 'Twist, don\'t wrap tight', text: 'Twist the gathered hair once around itself into a loose spiral rather than a tight rope — a tighter twist pulls curls straight and defeats the point of a curly bun.' },
      { name: 'Secure with a scrunchie', text: 'Wrap a fabric scrunchie around the base a couple of times — thin elastics crease and snap curly strands more easily than fabric does.' },
      { name: 'Pull curls loose around the face', text: 'Gently tug a few curl pieces loose around the hairline and temples with fingertips to soften the shape and add volume.' }
    ],
    tips: [
      { question: 'Why does a curly bun always end up looking flat?', answer: 'Brushing or combing curls before putting them up smooths out the individual curl clumps into one section — gathering with fingers instead preserves the texture inside the bun.' },
      { question: 'What kind of hair tie actually protects curly hair?', answer: 'A fabric scrunchie or coated hair tie causes far less breakage and frizz at the base than a thin rubber-coated elastic, which grips and snaps individual strands.' },
      { question: 'Can this be done on second- or third-day curls?', answer: 'It actually works better on slightly older curls than freshly washed ones — day-old curls hold shape and clump more easily once refreshed with a light misting of water.' }
    ],
    storyIntro: [
      'A curly bun goes wrong the same way almost every time — brushing the hair smooth before gathering it, which pulls every curl pattern out and leaves a flat, frizzy bun instead of a textured one.',
      'The fix is to work with the curl clumps instead of against them: gather with fingers, twist loosely instead of tight, and use a fabric tie that won\'t crease the strands at the base.'
    ],
    storyNote: 'A light water-based refresher spray does more for curl shape than dry product does — curls respond to moisture, and gel or cream alone on already-dry hair just adds weight without redefining the curl.',
    images: { heroAlt: 'Curly bun updo with volume and defined curl texture around the crown', textureAlt: 'Close-up of loosely twisted curly hair secured at the base of a bun', pinAlt: 'Curly bun hairstyle, front view with face-framing curls' }
  },

  // ---------------- SHORT HAIR ----------------
  {
    slug: 'layered-bob-styling-tutorial', title: 'Layered Bob Styling Tutorial', hubPath: 'short-hair', hubLabel: 'Short Hair',
    metaDescription: 'How to style a layered bob at home for movement instead of a flat helmet shape — a round-brush blowout method that works on fine and medium hair.',
    targetKeywords: ['layered bob hairstyles', 'layered bob styling'],
    difficulty: 'Medium', timeToStyle: 'PT25M', hairType: ['straight', 'wavy'], hairLength: 'short',
    toolsNeeded: ['Round brush', 'Blow dryer with nozzle', 'Sectioning clips', 'Flat iron or curling wand (optional)'],
    productsNeeded: ['Heat protectant spray', 'Lightweight volumizing mousse'],
    steps: [
      { name: 'Prep towel-dried hair', text: 'Apply heat protectant and a small amount of mousse to damp, towel-dried hair, focusing product at the roots for lift.' },
      { name: 'Section top from bottom', text: 'Clip the top half of the hair up and start blow-drying the bottom section first, working in small pieces.' },
      { name: 'Round-brush each section', text: 'Wrap small sections around the round brush and follow with the dryer nozzle pointed down the hair shaft, rolling the brush under at the ends for a slight inward curve.' },
      { name: 'Work through the top layers', text: 'Release the top section and repeat, angling the brush to lift the roots away from the scalp as you dry for volume at the crown.' },
      { name: 'Set the layers', text: 'Once fully dry, run a flat iron or curling wand lightly over the ends for extra shape, then finish with a light-hold spray.' }
    ],
    tips: [
      { question: 'Why does a layered bob go flat by midday?', answer: 'Skipping the root lift step during blow-drying is the most common cause — a bob with no volume built in at the crown falls flat as soon as the initial style relaxes, regardless of how the ends are curled.' },
      { question: 'What round brush size works best for a bob length?', answer: 'A medium barrel, roughly 1.5 inches, gives enough curve to shape the ends without being too large to maneuver through shorter layers.' },
      { question: 'Can a layered bob be air-dried instead?', answer: 'Yes, with a light mousse scrunched in and the ends tucked under with fingers while damp — it won\'t have as much volume at the root, but it holds shape reasonably well on wavy textures.' }
    ],
    storyIntro: [
      'A layered bob is one of the most requested cuts precisely because it looks effortless in photos — but that soft, face-framing movement almost always comes from how it\'s styled, not just how it\'s cut.',
      'The round-brush blowout technique is what builds the volume at the root and the slight inward curve at the ends that separates a "styled" bob from one that\'s just air-dried flat.'
    ],
    storyNote: 'Dry each section completely before moving to the next one — going back over a partially dry section with the round brush is what causes frizz and undoes the smoothness from the first pass.',
    images: { heroAlt: 'Layered bob haircut styled with volume at the roots and soft ends', textureAlt: 'Close-up of round-brush blowout technique on bob-length hair', pinAlt: 'Layered bob hairstyle, side angle showing face-framing layers' }
  },
  {
    slug: 'pixie-cut-styling-tutorial', title: 'Pixie Cut Styling Tutorial', hubPath: 'short-hair', hubLabel: 'Short Hair',
    metaDescription: 'How to style a pixie cut day to day, from the initial grow-out awkward stage to a finished textured look — the products and technique that keep it from looking flat.',
    targetKeywords: ['pixie hairstyles', 'pixie cut styling'],
    difficulty: 'Easy', timeToStyle: 'PT10M', hairType: ['straight', 'wavy'], hairLength: 'short',
    toolsNeeded: ['Fingers or a small paddle brush', 'Blow dryer (optional)'],
    productsNeeded: ['Texturizing paste or clay', 'Light-hold hairspray'],
    steps: [
      { name: 'Apply product to damp hair', text: 'Rub a pea-sized amount of texturizing paste between the palms and work it through damp hair from root to tip, focusing on the top and fringe area.' },
      { name: 'Dry with lift', text: 'Blow-dry using fingers to lift the roots upward and forward rather than flattening them with a brush, which is what gives a pixie its shape.' },
      { name: 'Piece out the top', text: 'Once dry, use fingertips with a small amount of extra paste to pull individual pieces of the top section into place for texture.' },
      { name: 'Define the sides', text: 'Smooth the shorter sides and back down with a small comb or the palm of the hand for contrast against the textured top.' },
      { name: 'Set lightly', text: 'Mist with a light-hold spray only over the top texture, keeping the sides untouched so they stay soft rather than stiff.' }
    ],
    tips: [
      { question: 'Why does a pixie cut go flat within a couple of hours?', answer: 'Skipping the finger-drying-with-lift step is usually the reason — pixies rely almost entirely on how the roots are dried, since there\'s very little length or weight to build shape from otherwise.' },
      { question: 'How much product is actually needed for a pixie?', answer: 'Far less than most people use — a pea-sized amount of paste is enough for most pixie lengths, and too much product weighs the short top section down instead of adding texture.' },
      { question: 'What\'s the best way to manage a pixie during grow-out?', answer: 'Regular trims every 4-6 weeks on just the neckline and sides keep the shape clean while the top grows longer, which is usually the part people want to grow out first.' }
    ],
    storyIntro: [
      'A pixie cut lives or dies on the styling, not the cut itself — the same haircut can look sharp and intentional or completely flat depending entirely on how the roots are dried.',
      'The finger-drying technique that lifts hair up and away from the scalp while it dries is what most pixie tutorials skip, and it\'s the single biggest difference between a styled pixie and a limp one.'
    ],
    storyNote: 'Work product through hair while it\'s still damp, not after it\'s already dry — paste applied to dry pixie hair tends to sit on top in clumps rather than distributing evenly through the shorter strands.',
    images: { heroAlt: 'Textured pixie cut hairstyle with lifted roots and defined top pieces', textureAlt: 'Close-up of textured paste worked through the top section of a pixie cut', pinAlt: 'Pixie cut hairstyle, front-facing view with soft side definition' }
  },
  {
    slug: 'short-shag-haircut-tutorial', title: 'Short Shag Haircut Styling Tutorial', hubPath: 'short-hair', hubLabel: 'Short Hair',
    metaDescription: 'How to style a short shag for the tousled, undone texture it\'s supposed to have — the finger-drying and product technique that avoids a too-neat, blow-dried look.',
    targetKeywords: ['short shag hairstyles', 'shag haircut styling'],
    difficulty: 'Easy', timeToStyle: 'PT15M', hairType: ['straight', 'wavy'], hairLength: 'short',
    toolsNeeded: ['Curling wand (small barrel, optional)', 'Fingers'],
    productsNeeded: ['Texturizing sea-salt spray', 'Matte styling clay'],
    steps: [
      { name: 'Rough-dry with texture spray', text: 'Mist damp hair lightly with a texturizing sea-salt spray, then rough-dry with fingers instead of a brush, scrunching upward toward the roots.' },
      { name: 'Wave a few pieces', text: 'Take a handful of random face-framing and crown pieces and wrap them loosely around a small curling wand, alternating direction for an undone look.' },
      { name: 'Break up the curl', text: 'Once cool, run fingers through the waved pieces to soften and separate them — a shag should never look like defined curls.' },
      { name: 'Add texture with clay', text: 'Work a small amount of matte clay between fingertips and pull through the ends and fringe area for separation and grip.' },
      { name: 'Mess it up on purpose', text: 'Finish by tousling the whole style gently with fingers, lifting at the crown, to remove any leftover uniformity from the curling step.' }
    ],
    tips: [
      { question: 'Why does my shag look too polished instead of undone?', answer: 'Using a round brush or curling every piece in the same direction is usually why — a shag depends on inconsistency, so mixing curled and straight pieces, and curling in alternating directions, is what sells the effortless look.' },
      { question: 'Is a shag a good option for fine hair?', answer: 'Yes — the layered structure and reliance on texture product rather than volume from a blow-dry actually suits fine hair well, since heavy layers can otherwise make thin hair look thinner.' },
      { question: 'Can a shag be styled without any heat tools?', answer: 'Yes, air-drying with a texturizing spray scrunched in gets close to the look, though a curling wand on just a few random pieces adds the movement that\'s harder to get from air-drying alone.' }
    ],
    storyIntro: [
      'The short shag is deliberately undone — choppy layers, a heavy fringe, and texture that looks like it happened by accident rather than with fifteen minutes of styling time.',
      'That "accidental" look is actually the hardest part to fake, because the instinct with any styling tool is to make hair neater and more uniform, which is the opposite of what a shag needs.'
    ],
    storyNote: 'Curl pieces in alternating directions, not all the same way — a shag with every wave curling the same direction reads as a blowout, not a shag, no matter how much texture spray goes on afterward.',
    images: { heroAlt: 'Short shag haircut with tousled, undone texture and choppy layers', textureAlt: 'Close-up of matte clay worked through the ends of a short shag', pinAlt: 'Short shag hairstyle, front view showing heavy textured fringe' }
  },

  // ---------------- NATURAL HAIR ----------------
  {
    slug: 'natural-hair-twist-out-tutorial', title: 'Natural Hair Twist-Out Tutorial', hubPath: 'natural-hair', hubLabel: 'Natural Hair',
    metaDescription: 'How to do a twist-out on 4A-4C natural hair for defined, elongated curls — the overnight two-strand twist method that avoids shrinkage and frizz by morning.',
    targetKeywords: ['natural twist hairstyles', 'twist out natural hair'],
    difficulty: 'Medium', timeToStyle: 'PT1H30M', hairType: ['coily', 'kinky'], hairLength: 'medium',
    toolsNeeded: ['Wide-tooth comb', 'Sectioning clips'],
    productsNeeded: ['Leave-in conditioner', 'Curl butter or cream', 'Light oil for sealing'],
    steps: [
      { name: 'Detangle on wet hair', text: 'Section hair into four to six parts and detangle each with a wide-tooth comb while soaked with conditioner in the shower.' },
      { name: 'Apply the LOC layers', text: 'On each damp section, apply leave-in conditioner first, then a curl cream, then seal with a light oil — this layering order is what keeps moisture locked in through the twist-out.' },
      { name: 'Two-strand twist each section', text: 'Divide each small section into two even strands and twist them around each other from root to tip, keeping tension consistent.' },
      { name: 'Let dry fully', text: 'Air dry completely, or sit under a hooded dryer on low — unraveling twists before they\'re 100% dry is the most common cause of a frizzy, undefined twist-out.' },
      { name: 'Unravel gently', text: 'Once bone dry, unravel each twist slowly from the root, separating the resulting curl gently with fingers rather than a comb.' }
    ],
    tips: [
      { question: 'Why does my twist-out frizz out within a day?', answer: 'Unraveling the twists while even slightly damp is the top cause — natural hair needs to be completely dry before unraveling, or the curl pattern relaxes and frizzes almost immediately.' },
      { question: 'How small should each twist section be?', answer: 'Roughly one to one-and-a-half inches wide for most 4A-4C patterns — smaller sections give tighter, more defined curls, while larger sections give looser, chunkier waves.' },
      { question: 'What does the LOC method actually do?', answer: 'Leave-in for water-based moisture, oil to seal that moisture in, and cream for hold and definition — applying them in that order (Liquid, Oil, Cream) is what gives natural hair the most lasting moisture through a twist-out.' }
    ],
    storyIntro: [
      'A twist-out is the technique most 4A-4C naturals learn first, because it defines curl pattern without any heat and holds up better than a wash-and-go on drier hair types.',
      'The method is simple — two-strand twists, dried fully, then unraveled — but almost every frustrating result traces back to one of two things: unraveling too early, or skipping the moisture-sealing step before twisting.'
    ],
    storyNote: 'Twist on freshly washed, still-damp hair, never on already-dry hair — twisting dry strands just creates a wave pattern from the twist shape itself, not the soft, elongated curl a proper twist-out gives.',
    images: { heroAlt: 'Defined twist-out hairstyle on 4C natural hair with elongated curl pattern', textureAlt: 'Close-up of two-strand twists before unraveling, showing moisture sheen', pinAlt: 'Twist-out natural hairstyle, front view with full defined curls' }
  },
  {
    slug: 'rubber-band-ponytail-natural-hair-tutorial', title: 'Rubber Band Ponytail for Natural Hair', hubPath: 'natural-hair', hubLabel: 'Natural Hair',
    metaDescription: 'How to do the rubber band ponytail technique on natural hair for length retention — small elastics stacked down the ponytail to stretch and protect the ends.',
    targetKeywords: ['rubber band hairstyles natural hair', 'rubber band ponytail'],
    difficulty: 'Medium', timeToStyle: 'PT45M', hairType: ['coily', 'kinky'], hairLength: 'medium-to-long',
    toolsNeeded: ['Rat-tail comb', 'Small clear or color-matched elastics (6-10)'],
    productsNeeded: ['Leave-in conditioner', 'Edge control', 'Light styling gel'],
    steps: [
      { name: 'Gather into a base ponytail', text: 'Detangle and smooth the hair back into one or several ponytails at the crown, securing each base with a snag-free elastic and light edge control at the hairline.' },
      { name: 'Apply gel to each section', text: 'Work a small amount of leave-in and gel through the length of the ponytail to add slip and hold for wrapping the bands.' },
      { name: 'Stack the first band', text: 'Add a small elastic about one to two inches below the base, looping it several times without pulling too tight against the scalp.' },
      { name: 'Continue down the length', text: 'Keep adding bands every one to two inches down the ponytail, gently stretching the hair between each band as you go to elongate the curl pattern.' },
      { name: 'Finish the ends', text: 'Leave the last couple of inches free of bands, twist or curl the ends, and seal with a small amount of oil.' }
    ],
    tips: [
      { question: 'What is the actual point of stacking rubber bands like this?', answer: 'The bands gently stretch the hair as it dries, which reduces shrinkage and keeps the ends detangled and protected between wash days — it\'s primarily a length-retention style, not just decorative.' },
      { question: 'Will the elastics cause breakage?', answer: 'Only if they\'re applied too tight or left in for more than a week — snag-free elastics, applied with enough give to move slightly, and removed carefully rather than cut off, minimize breakage significantly.' },
      { question: 'How long can this style stay in?', answer: 'Most naturalistas keep it for 5-7 days, refreshing the edges and moisturizing the scalp between the bands with a light oil spray to prevent dryness underneath.' }
    ],
    storyIntro: [
      'The rubber band ponytail method is a length-retention staple in the natural hair community — small elastics stacked down a ponytail, gently stretching the hair as it sets instead of relying on heat to stretch it.',
      'It\'s a low-manipulation style at its core: once the bands are in, the ends stay protected and tucked away from daily friction against clothing, which is where a lot of unnecessary breakage happens.'
    ],
    storyNote: 'Never pull the elastics tight against the scalp — the stretching effect comes from gentle, even tension along the length of the ponytail, not from cinching the base band as tight as possible.',
    images: { heroAlt: 'Rubber band stretched ponytail on natural coily hair with several bands stacked down the length', textureAlt: 'Close-up of a single elastic band section showing gentle stretch of natural curl pattern', pinAlt: 'Rubber band ponytail hairstyle, side view with beads at the end' }
  },
  {
    slug: 'bantu-knots-tutorial', title: 'Bantu Knots Tutorial', hubPath: 'natural-hair', hubLabel: 'Natural Hair',
    metaDescription: 'How to do Bantu knots on natural hair, both as a finished style and as a heat-free curl set — the twist-and-wrap technique on coily 4A-4C hair.',
    targetKeywords: ['bantu knots hairstyles natural hair', 'bantu knots'],
    difficulty: 'Medium', timeToStyle: 'PT1H', hairType: ['coily', 'kinky'], hairLength: 'short-to-medium',
    toolsNeeded: ['Rat-tail comb', 'Sectioning clips', 'Bobby pins (optional, for extra hold)'],
    productsNeeded: ['Leave-in conditioner', 'Twisting cream or gel'],
    steps: [
      { name: 'Section into squares', text: 'On damp, detangled hair, part into small to medium square sections across the whole head using the rat-tail comb.' },
      { name: 'Apply product', text: 'Smooth a small amount of leave-in and twisting cream through each section to add hold and reduce frizz before twisting.' },
      { name: 'Twist each section', text: 'Twist each section around itself tightly, root to tip, as if making a single large rope twist.' },
      { name: 'Coil into a knot', text: 'Wrap the twisted section around its own base in a tight spiral, tucking the end underneath and securing with a bobby pin if the hair is slippery.' },
      { name: 'Repeat and let set', text: 'Repeat across the whole head, then either wear the knots as-is or let them dry fully before unraveling for a curly Bantu knot-out.' }
    ],
    tips: [
      { question: 'What\'s the difference between Bantu knots and a Bantu knot-out?', answer: 'Bantu knots are the finished style with the knots still in; a knot-out is what you get after they\'re dry and unraveled — the twisting sets a tight, defined curl that a regular twist-out doesn\'t produce.' },
      { question: 'Do Bantu knots damage natural hair?', answer: 'Not when done gently — the risk comes from twisting too tightly at the root or leaving them in for too many days without moisturizing, which can strain the hairline over repeated styles.' },
      { question: 'How many knots should the head be divided into?', answer: 'Anywhere from 6 to 20 depending on hair density and how tight a curl is wanted afterward — fewer, larger knots give looser waves, while more, smaller knots give a tighter, more defined curl.' }
    ],
    storyIntro: [
      'Bantu knots do double duty — worn as-is they\'re a striking protective style, and unraveled after drying they become a heat-free way to set a defined, springy curl pattern on natural hair.',
      'The technique itself is simple twisting and coiling, but getting knots that hold their shape without slipping loose by evening comes down to product choice and how tightly the base is wrapped.'
    ],
    storyNote: 'Let the knots dry completely before unraveling if the goal is a knot-out — unraveling even slightly damp knots collapses the curl definition almost immediately, the same way an early twist-out unravel does.',
    images: { heroAlt: 'Bantu knots styled across natural coily hair, evenly sectioned', textureAlt: 'Close-up of a single tightly wrapped Bantu knot secured at the base', pinAlt: 'Bantu knots hairstyle, full head view from above' }
  },

  // ---------------- LONG HAIR ----------------
  {
    slug: 'long-bob-lob-styling-tutorial', title: 'Long Bob (Lob) Styling Tutorial', hubPath: 'long-hair', hubLabel: 'Long Hair',
    metaDescription: 'How to style a long bob (lob) for soft waves without looking dated — an S-wave curling technique that keeps the ends loose instead of Shirley Temple curls.',
    targetKeywords: ['long bob hairstyles', 'lob styling'],
    difficulty: 'Medium', timeToStyle: 'PT30M', hairType: ['straight', 'wavy'], hairLength: 'long',
    toolsNeeded: ['1-inch curling iron or wand', 'Sectioning clips'],
    productsNeeded: ['Heat protectant', 'Texturizing sea-salt spray', 'Flexible-hold hairspray'],
    steps: [
      { name: 'Prep with heat protectant', text: 'Apply heat protectant spray through dry hair and section it into four parts — two on top, two underneath.' },
      { name: 'Curl in alternating directions', text: 'Working in small sections, wrap hair around the barrel, alternating the direction away from the face every other piece for a natural, non-uniform S-wave.' },
      { name: 'Leave the ends out', text: 'Stop the curling barrel about an inch from the ends rather than curling all the way through — this is what keeps a lob from reading as ringlets.' },
      { name: 'Cool before touching', text: 'Let each curled section cool fully, either pinned or simply left to hang, before running fingers through it.' },
      { name: 'Brush out and texturize', text: 'Once all sections are cool, brush through gently with fingers or a wide-tooth comb to loosen the curls into soft waves, then mist with texturizing spray at the roots.' }
    ],
    tips: [
      { question: 'Why do my lob curls always drop flat within an hour?', answer: 'Touching or brushing the curls before they\'ve fully cooled is the most common reason — hair needs to cool completely in its curled shape to hold, so letting each section rest before moving to the next matters more than curling technique.' },
      { question: 'What barrel size gives the most natural wave on a lob?', answer: 'A 1-inch barrel gives a loose, undone S-wave that reads as natural texture rather than a formal curl — smaller barrels tend to look too tight and uniform on a bob-length cut.' },
      { question: 'Can a lob be styled without heat?', answer: 'Yes — braiding damp hair into two or three loose braids overnight and unraveling in the morning gives a similar soft wave, though the shape is less controlled than curling with a wand.' }
    ],
    storyIntro: [
      'The long bob sits in an in-between length that photographs beautifully but is genuinely tricky to style — long enough to need real technique, short enough that heavy curls read as costume-y rather than effortless.',
      'The alternating-direction S-wave method, with the very ends left uncurled, is what gives a lob that "your hair, but better" look instead of looking like a deliberate curling-iron session.'
    ],
    storyNote: 'Curl away from the face on every piece near the front, but alternate direction toward the back — an entire head curled the same direction is what makes a lob look like a wig instead of natural texture.',
    images: { heroAlt: 'Long bob (lob) haircut styled with soft S-wave curls', textureAlt: 'Close-up of alternating-direction curl pattern on lob-length hair', pinAlt: 'Long bob hairstyle, front view with loose waves framing the face' }
  },
  {
    slug: 'claw-clip-updo-long-hair-tutorial', title: 'Claw Clip Updo for Long Hair', hubPath: 'long-hair', hubLabel: 'Long Hair',
    metaDescription: 'How to do the twisted claw clip updo on long hair in under five minutes — the trick that keeps it from looking like a lazy half-ponytail.',
    targetKeywords: ['claw clip hairstyles long hair', 'claw clip updo'],
    difficulty: 'Easy', timeToStyle: 'PT5M', hairType: ['straight', 'wavy', 'curly'], hairLength: 'long',
    toolsNeeded: ['Large claw clip'],
    productsNeeded: ['Light texturizing spray (optional)'],
    steps: [
      { name: 'Flip the head upside down', text: 'Bend forward from the waist and let all the hair fall forward — gathering hair this way, rather than reaching back over the head, gives more natural volume at the crown once flipped back up.' },
      { name: 'Gather at the crown', text: 'Flip back upright and gather all the hair into one hand at the point where a high half-up ponytail would normally sit.' },
      { name: 'Twist the length', text: 'Twist the gathered hair around itself into a rope, continuing to twist until it naturally starts to coil back up on itself.' },
      { name: 'Fold the twist up', text: 'Fold the twisted rope upward, letting the top half flop forward slightly rather than pointing straight up — this is the detail that makes the shape look intentional instead of accidental.' },
      { name: 'Clip in place', text: 'Open the claw clip and clamp it horizontally over the base of the folded twist, tucking any stray ends underneath.' }
    ],
    tips: [
      { question: 'Why do claw clip updos always look messy in photos?', answer: 'Skipping the twist step is the usual cause — clamping straight, ungathered hair produces a flat pancake shape, while twisting first before clipping gives the updo actual structure and height.' },
      { question: 'What size claw clip works best for long, thick hair?', answer: 'A large (4+ inch) clip with strong, wide teeth holds significantly more hair securely than a small clip — small clips on thick hair tend to slip out within the hour.' },
      { question: 'Does this work on freshly washed, silky hair?', answer: 'It slips more easily on freshly washed hair — a light texturizing spray or day-old hair with some natural oils gives the twist more grip and holds the clip in place longer.' }
    ],
    storyIntro: [
      'The claw clip updo became a five-minute staple for a reason — it takes almost no technique to gather hair and clip it up, but there\'s one specific twist that separates a styled-looking claw clip updo from a rushed one.',
      'That twist, folded rather than simply bunched, is what gives the updo actual shape and volume instead of a flat clump of hair pinned at the back of the head.'
    ],
    storyNote: 'Gathering hair by flipping upside down first, rather than reaching back with both hands, naturally distributes more volume around the crown — a small step that makes a noticeable difference in the finished shape.',
    images: { heroAlt: 'Twisted claw clip updo on long hair with volume at the crown', textureAlt: 'Close-up of the twisted rope section folded into the claw clip base', pinAlt: 'Claw clip updo hairstyle, side profile view' }
  },

  // ---------------- SCHOOL ----------------
  {
    slug: 'volleyball-hairstyle-tutorial', title: 'Volleyball Hairstyle Tutorial', hubPath: 'school', hubLabel: 'School',
    metaDescription: 'How to do a volleyball hairstyle that stays put through a full match — a braided, low-profile style that won\'t come loose diving for a ball or tangle in a face mask.',
    targetKeywords: ['volleyball hairstyles', 'sports hairstyle'],
    difficulty: 'Medium', timeToStyle: 'PT20M', hairType: ['straight', 'wavy', 'curly'], hairLength: 'medium-to-long',
    toolsNeeded: ['Rat-tail comb', 'Small elastics', 'Bobby pins'],
    productsNeeded: ['Strong-hold gel', 'Finishing hairspray'],
    steps: [
      { name: 'Smooth into a low base', text: 'Gel down any flyaways and gather the hair into a low, tight ponytail at the nape rather than a high one, which is more likely to get pulled during play.' },
      { name: 'Split for two French braids', text: 'Divide the ponytail into two even sections for two matching French braids, or keep it as one for a single center braid, depending on hair length.' },
      { name: 'Braid tightly to the ends', text: 'French braid each section tightly and close to the head, incorporating all loose hair as you go so nothing hangs free to get grabbed or tangled.' },
      { name: 'Secure the ends', text: 'Finish each braid with a small elastic, then loop and pin the braided ends up and under to shorten the tail and reduce swinging during play.' },
      { name: 'Lock down the edges', text: 'Smooth any remaining flyaways along the hairline with gel and a fine-tooth comb, then finish with a strong-hold spray.' }
    ],
    tips: [
      { question: 'Why braid instead of just using a ponytail for sports?', answer: 'A tight braid distributes tension evenly across the scalp and keeps hair contained during sudden movement, diving, or contact — a loose ponytail is far more likely to come undone or get pulled mid-play.' },
      { question: 'Should the ponytail be high or low for volleyball?', answer: 'Low and tucked is generally more secure for volleyball specifically, since a high ponytail swings more and is easier to catch during dives and jumps near the net.' },
      { question: 'How do you keep short layers from escaping the braid during a match?', answer: 'A strong-hold gel applied before braiding, rather than added afterward, is what actually keeps shorter face-framing pieces locked into the braid instead of falling loose by the second set.' }
    ],
    storyIntro: [
      'A volleyball hairstyle has one real job: staying completely out of the way through diving digs, overhead serves and constant head movement, without needing to be redone at halftime.',
      'Tight, low double braids beat a simple ponytail for exactly that reason — the braid structure itself holds up under repeated tension in a way that a single elastic and gravity can\'t match.'
    ],
    storyNote: 'Apply gel before braiding, not after — product added on top of a finished braid mostly sits on the surface, while gel worked in beforehand actually helps flyaway pieces stay locked into the braid structure itself.',
    images: { heroAlt: 'Tight double French braids sports hairstyle for volleyball', textureAlt: 'Close-up of a tightly braided section secured at the nape for sports', pinAlt: 'Volleyball hairstyle, back view showing two secured braids' }
  },
  {
    slug: 'first-day-of-school-braided-hairstyle-tutorial', title: 'First Day of School Braided Hairstyle', hubPath: 'school', hubLabel: 'School',
    metaDescription: 'A first-day-of-school braided hairstyle that takes under 15 minutes and holds through recess — a simple double Dutch braid a parent can do solo before the bus.',
    targetKeywords: ['first day of school hairstyles', 'school braided hairstyle'],
    difficulty: 'Easy', timeToStyle: 'PT15M', hairType: ['straight', 'wavy', 'curly'], hairLength: 'medium-to-long',
    toolsNeeded: ['Rat-tail comb', 'Small elastics', 'Hair bows or clips (optional)'],
    productsNeeded: ['Detangling spray', 'Light-hold gel'],
    steps: [
      { name: 'Detangle and part', text: 'Spray detangler through the hair and part it evenly down the center from front to back, dividing it into two equal sides.' },
      { name: 'Start each Dutch braid', text: 'On one side, take a small section at the front hairline and split into three strands, crossing the outer pieces under the middle one to start a Dutch braid.' },
      { name: 'Feed in hair as you go', text: 'Continue feeding in small sections of loose hair from along the part as you cross each strand under, keeping the braid close to the scalp.' },
      { name: 'Finish the tail', text: 'Once all the hair is incorporated, continue a regular under-braid to the ends and secure with a small elastic.' },
      { name: 'Repeat on the other side', text: 'Repeat the same steps on the second side, then add a bow or clip near the elastic if desired for a finishing touch.' }
    ],
    tips: [
      { question: 'How can a parent get faster at this before the first day?', answer: 'Practicing on a doll or a sibling\'s hair a few times the week before — with no time pressure — builds the finger memory needed to do it quickly and calmly on an actual school morning.' },
      { question: 'Will this hold up through recess and PE?', answer: 'A Dutch braid holds significantly better than a loose braid or simple ponytail because the pattern sits under the hair rather than on top, which resists the tugging and friction of active play.' },
      { question: 'What if the hair is too short for a full Dutch braid?', answer: 'A shorter version — braiding just the crown into two small Dutch braids that stop and become regular braids or ponytails partway down — still keeps hair out of the face without needing full length.' }
    ],
    storyIntro: [
      'The morning of the first day of school is not the time to attempt a hairstyle nobody has practiced — which is exactly why a simple, sturdy double Dutch braid earns its place as the reliable go-to.',
      'It looks put-together for photos, but more importantly it survives the actual school day: recess, gym class, and a kid who won\'t sit still for round two if it comes loose by lunch.'
    ],
    storyNote: 'Braid a little looser than feels neat if the child fidgets a lot — an evenly snug braid holds up fine, but an overly tight one just increases the chance of a headache complaint five minutes into homeroom.',
    images: { heroAlt: 'Two Dutch braids first day of school hairstyle on a child, parted center', textureAlt: 'Close-up of a Dutch braid crossing under during the braiding process', pinAlt: 'First day of school braided hairstyle, back view with bows' }
  },

  // ---------------- KIDS HAIR ----------------
  {
    slug: 'toddler-girl-hairstyle-tutorial', title: 'Toddler Girl Hairstyle Tutorial', hubPath: 'kids-hair', hubLabel: 'Kids Hair',
    metaDescription: 'A gentle toddler girl hairstyle that takes under 5 minutes — two low pigtail puffs that won\'t irritate a wiggly toddler\'s scalp or pull at fine baby hair.',
    targetKeywords: ['toddler hairstyles girl', 'toddler girl hairstyle'],
    difficulty: 'Easy', timeToStyle: 'PT5M', hairType: ['fine', 'wavy', 'curly'], hairLength: 'short-to-medium',
    toolsNeeded: ['Soft-bristle brush', 'Snag-free elastics'],
    productsNeeded: ['Leave-in detangling spray'],
    steps: [
      { name: 'Distract before starting', text: 'Sit the toddler somewhere with a screen or toy in hand — most of the difficulty with toddler hair comes from squirming, not the styling itself.' },
      { name: 'Spray and gently brush', text: 'Mist a light detangling spray through the hair and use a soft-bristle brush in short, gentle strokes starting from the ends and working up, never pulling from the root down.' },
      { name: 'Part down the middle', text: 'Use fingers rather than a comb to part the hair evenly down the middle — a comb part can feel sharp on a sensitive toddler scalp.' },
      { name: 'Gather each side loosely', text: 'Gather each side into a small, low puff or pigtail near the ear rather than high on the crown, using minimal tension.' },
      { name: 'Secure without snagging', text: 'Wrap a snag-free, soft elastic around each section just enough times to hold — over-tightening is the main cause of toddler hairstyle meltdowns.' }
    ],
    tips: [
      { question: 'Why does my toddler cry every time we do her hair?', answer: 'It\'s almost always tension, not the styling itself — starting the brush from the ends, using loose low pigtails instead of tight high ones, and snag-free elastics solve most of it.' },
      { question: 'How short can hair be and still work for pigtail puffs?', answer: 'As little as an inch or two is enough for small puffs, since the goal with a toddler style is just to gather it, not to make a long tail — even short baby hair usually gathers fine.' },
      { question: 'Is any product necessary for toddler hair?', answer: 'A light leave-in or detangling spray helps significantly with the brushing step, but heavier gels and creams generally aren\'t needed for hair this fine and short.' }
    ],
    storyIntro: [
      'Toddler hair styling has a lower bar than it looks like online — the goal isn\'t an elaborate braid, it\'s getting hair out of the face in under five minutes without a meltdown.',
      'Low, loose pigtail puffs check both boxes: they take almost no technique, and the reduced tension compared to a high ponytail is genuinely more comfortable on a small, sensitive scalp.'
    ],
    storyNote: 'Brush from the ends upward, never starting at the root and pulling down through knots — this single change in brushing direction removes most of the pain a toddler associates with getting their hair done.',
    images: { heroAlt: 'Toddler girl with two low pigtail puffs, gentle low-tension hairstyle', textureAlt: 'Close-up of a soft snag-free elastic securing a small toddler pigtail puff', pinAlt: 'Toddler girl hairstyle, front view with two low puffs' }
  },
  {
    slug: 'kids-cornrow-hairstyle-tutorial', title: 'Kids Cornrow Hairstyle Tutorial', hubPath: 'kids-hair', hubLabel: 'Kids Hair',
    metaDescription: 'How to cornrow a kid\'s hair without the tears — a gentler technique with shorter sitting sessions built in, for parents cornrowing a child\'s hair at home.',
    targetKeywords: ['kids cornrow hairstyles', 'cornrows for kids'],
    difficulty: 'Medium', timeToStyle: 'PT1H', hairType: ['coily', 'kinky'], hairLength: 'short-to-medium',
    toolsNeeded: ['Rat-tail comb', 'Sectioning clips', 'Small elastics or beads'],
    productsNeeded: ['Leave-in conditioner', 'Light braiding gel'],
    steps: [
      { name: 'Break the session into parts', text: 'Plan on two or three shorter sitting sessions rather than one long one — cornrowing a squirming child works far better in 15-20 minute stretches with breaks between.' },
      { name: 'Detangle gently first', text: 'Detangle fully with leave-in conditioner and a wide-tooth comb before starting any parting, since braiding over tangled hair is what causes most of the discomfort.' },
      { name: 'Part in simple, wide rows', text: 'Use fewer, wider rows than an adult style — three to five simple straight-back rows are both faster and gentler than many thin ones for a child\'s scalp.' },
      { name: 'Braid with lighter tension', text: 'Cornrow each row using the standard underhand technique, but with noticeably less tension at the root than an adult version would use.' },
      { name: 'Finish the ends playfully', text: 'Secure each row\'s end with a small elastic or bead — letting the child pick bead colors is a simple trick that keeps them still through the last stretch.' }
    ],
    tips: [
      { question: 'How can cornrowing a child\'s hair be made less painful?', answer: 'Lower tension throughout, wider and fewer rows, and short breaks every 15-20 minutes address almost all of the common complaints — most pain comes from tight, thin rows done in one long uninterrupted sitting.' },
      { question: 'What age is reasonable to start cornrows on a child?', answer: 'There\'s no strict minimum age — once a child has enough hair length to grip (usually a couple of inches) and can sit reasonably still for short stretches, simple wide cornrows are workable.' },
      { question: 'How long should kids\' cornrows be left in?', answer: 'One to two weeks is typical, moisturizing the scalp with a light oil every few days — leaving them in much longer without care can lead to buildup and matting at the roots.' }
    ],
    storyIntro: [
      'Cornrowing a child\'s hair has a real technique difference from doing an adult\'s — not in the braid pattern itself, but in tension, row size, and pacing around a kid\'s patience.',
      'Wider rows, gentler tension and planned breaks turn what\'s often a dreaded chore into something manageable for both the parent\'s hands and the child\'s scalp.'
    ],
    storyNote: 'Let the child hold something to occupy their hands during the sitting — a tablet, a snack, or a toy makes a measurable difference in how still they sit and how much less tension complaint comes up.',
    images: { heroAlt: 'Simple wide cornrow hairstyle on a child, styled with beads at the ends', textureAlt: 'Close-up of a wide, gently tensioned cornrow row on a child\'s hair', pinAlt: 'Kids cornrow hairstyle, back view with colorful beads' }
  },

  // ---------------- MEN'S HAIR ----------------
  {
    slug: 'middle-part-haircut-styling-tutorial', title: "Men's Middle Part Styling Tutorial", hubPath: 'mens-hair', hubLabel: "Men's Hair",
    metaDescription: 'How to style a middle part haircut for men without the 90s boy-band look — a clean center part and light texture technique for medium-length hair.',
    targetKeywords: ['middle part hairstyles men', 'middle part haircut'],
    difficulty: 'Easy', timeToStyle: 'PT10M', hairType: ['straight', 'wavy'], hairLength: 'medium',
    toolsNeeded: ['Fine-tooth comb', 'Blow dryer (optional)'],
    productsNeeded: ['Light matte clay or cream', 'Texturizing powder (optional)'],
    steps: [
      { name: 'Comb from wet or damp hair', text: 'Starting from damp hair, use a fine-tooth comb to create a clean, straight part exactly down the center from the front hairline to the crown.' },
      { name: 'Dry with direction', text: 'Blow-dry each side downward and slightly outward from the part, using fingers to guide the direction rather than brushing it flat.' },
      { name: 'Apply a small amount of clay', text: 'Rub a dime-sized amount of matte clay between the palms and work it through from mid-length to ends, avoiding the roots to prevent flatness.' },
      { name: 'Break up the part slightly', text: 'Run fingers lightly along the part line to soften its edge — a perfectly razor-straight part reads as more dated than a slightly imperfect one.' },
      { name: 'Add texture at the ends', text: 'Pinch small pieces near the ends and temples with fingertips for separation, finishing with a light dust of texturizing powder if extra grip is wanted.' }
    ],
    tips: [
      { question: 'How is a modern middle part different from the 90s version?', answer: 'The modern version uses a slightly less rigid, less symmetrical part with matte texture rather than a glossy, perfectly straight line — softening the part edge is the main styling update.' },
      { question: 'What hair length actually works for a middle part?', answer: 'Medium length, generally somewhere between chin and shoulder for the top section, gives the part enough length to fall naturally on both sides without looking choppy or too short.' },
      { question: 'Does a middle part work on wavy or curly hair?', answer: 'Yes, and often looks better with some natural wave, since the texture keeps the parted sides from looking flat and stiff the way very straight hair can.' }
    ],
    storyIntro: [
      'The men\'s middle part has come back around, but the version that reads as current, not dated, comes down to a couple of specific styling choices rather than the part placement alone.',
      'Matte texture instead of shine, and a softened rather than razor-sharp part line, are what separate a fresh middle part from one that looks pulled straight from an old yearbook photo.'
    ],
    storyNote: 'Keep clay off the roots — applying texturizing product too close to the scalp is what causes the flat, greasy-looking crown that undermines an otherwise well-styled middle part.',
    images: { heroAlt: "Men's middle part hairstyle with matte texture and soft part line", textureAlt: 'Close-up of matte clay worked through mid-length hair for a middle part style', pinAlt: "Men's middle part hairstyle, front-facing view" }
  },
  {
    slug: 'mens-cornrow-braids-tutorial', title: "Men's Cornrow Braids Tutorial", hubPath: 'mens-hair', hubLabel: "Men's Hair",
    metaDescription: 'How to cornrow men\'s hair in straight-back rows — a beginner technique for shorter, coarser hair textures that hold well without added extensions.',
    targetKeywords: ['cornrow hairstyles for men', 'men braids hairstyles'],
    difficulty: 'Medium', timeToStyle: 'PT1H', hairType: ['coily', 'kinky'], hairLength: 'short-to-medium',
    toolsNeeded: ['Rat-tail comb', 'Sectioning clips'],
    productsNeeded: ['Braiding gel or pomade', 'Light holding spray'],
    steps: [
      { name: 'Wash and detangle', text: 'Wash and detangle thoroughly, then apply a light leave-in to make the shorter, coarser hair easier to grip and part cleanly.' },
      { name: 'Part into even rows', text: 'Part the head into straight rows from the front hairline to the nape using the rat-tail comb, spacing rows evenly across the scalp.' },
      { name: 'Braid underhand', text: 'Starting each row at the front, cornrow using the standard underhand technique, feeding in hair from along the part as you go.' },
      { name: 'Keep tension consistent', text: 'Maintain steady, even tension across all rows — men\'s shorter hair textures generally need a slightly firmer grip than longer hair to hold the row shape without slipping.' },
      { name: 'Finish and set', text: 'Once all rows are done, smooth the whole head with a small amount of gel or pomade and let set, avoiding a hat or hood for the first hour.' }
    ],
    tips: [
      { question: 'Can short hair actually be cornrowed?', answer: 'Yes, as long as there\'s roughly an inch and a half to two inches of length — coarser, shorter men\'s hair textures often grip and hold a cornrow row surprisingly well without needing added length.' },
      { question: 'How long do men\'s cornrows typically last?', answer: 'One to three weeks depending on hair growth rate and how well the scalp is moisturized — the rows start looking messy mainly from new growth pushing them out of alignment, not from the braid itself failing.' },
      { question: 'Is gel or pomade better for men\'s cornrows?', answer: 'A light gel gives cleaner, more polished rows for the first few days, while a pomade offers more flexibility and shine without the stiff, cast-like finish gel can leave.' }
    ],
    storyIntro: [
      'Cornrows on men\'s hair use the same underhand technique as any other cornrow style, but shorter, coarser textures typically need firmer tension and wider rows to hold cleanly without added extensions.',
      'Straight-back rows are the standard starting style — simple, quick to maintain, and a good foundation before attempting curved or geometric parting patterns.'
    ],
    storyNote: 'Skip a hat or durag for at least the first hour after finishing — pressure on freshly done rows before the gel or pomade sets can flatten and disrupt the shape at the crown.',
    images: { heroAlt: "Men's cornrow braids in straight-back rows on short coily hair", textureAlt: 'Close-up of an underhand cornrow row on short textured men\'s hair', pinAlt: "Men's cornrow hairstyle, back view showing even straight rows" }
  },

  // ---------------- UPDOS ----------------
  {
    slug: 'slicked-back-bun-tutorial', title: 'Slicked-Back Bun Tutorial', hubPath: 'updos', hubLabel: 'Updos',
    metaDescription: 'How to get a truly sleek slicked-back bun with zero flyaways — the gel, brush and setting-spray layering technique that actually lasts all day.',
    targetKeywords: ['slick back hairstyles', 'slicked back bun'],
    difficulty: 'Medium', timeToStyle: 'PT15M', hairType: ['straight', 'wavy'], hairLength: 'medium-to-long',
    toolsNeeded: ['Firm boar-bristle brush', 'Fine-tooth comb', 'Bobby pins', 'Hair tie'],
    productsNeeded: ['Strong-hold gel', 'Edge control', 'Flexible-hold setting spray'],
    steps: [
      { name: 'Work gel through damp hair', text: 'On damp hair, work a generous amount of strong-hold gel through from root to tip using a wide-tooth comb to distribute it evenly.' },
      { name: 'Brush back firmly', text: 'Using a firm boar-bristle brush, brush the hair straight back from the hairline in one continuous, firm motion, section by section.' },
      { name: 'Gather and secure', text: 'Gather all the hair at the crown or nape into a tight ponytail, brushing again as you gather to eliminate any bumps before securing with a hair tie.' },
      { name: 'Twist into the bun', text: 'Twist the ponytail into a tight coil and wrap it around the base, pinning it securely with several bobby pins in a crisscross pattern.' },
      { name: 'Lock down the edges', text: 'Use a fine-tooth comb dipped lightly in gel to smooth any remaining baby hairs along the hairline, then finish with a flexible-hold setting spray over the whole style.' }
    ],
    tips: [
      { question: 'Why does a slicked-back bun get flyaways within an hour?', answer: 'Applying gel to already-dry hair, or skipping the firm brush-back step, are the two most common causes — working gel through damp hair and brushing firmly is what actually bonds flyaways down for hours, not touch-ups after the fact.' },
      { question: 'What kind of brush actually works for this?', answer: 'A firm boar-bristle or mixed-bristle brush distributes product and tension far more evenly than a paddle brush, which tends to just push hair around rather than smoothing it flat.' },
      { question: 'How is edge control different from regular gel here?', answer: 'Edge control has a stiffer, tackier hold made specifically for laying down short baby hairs at the hairline — regular gel works for the main length but isn\'t formulated to control those short, fine pieces as well.' }
    ],
    storyIntro: [
      'A truly sleek slicked-back bun is one of the hardest "simple" styles to actually get right — most attempts end up with visible bumps, an off-center part, or flyaways creeping back within the hour.',
      'The difference between a passable slicked-back bun and a genuinely polished one comes down almost entirely to product layering and brush technique, not the bun itself.'
    ],
    storyNote: 'Brush section by section rather than the whole head at once — working smaller sections with more passes gets every strand flat before it dries in place, which is much harder to fix once the gel sets.',
    images: { heroAlt: 'Sleek slicked-back bun hairstyle with smooth, flyaway-free finish', textureAlt: 'Close-up of the twisted bun base secured with crisscrossed bobby pins', pinAlt: 'Slicked-back bun hairstyle, side profile view' }
  },
  {
    slug: 'messy-updo-bun-tutorial', title: 'Messy Updo Bun Tutorial', hubPath: 'updos', hubLabel: 'Updos',
    metaDescription: 'How to do a messy updo bun that looks effortless on purpose — the loose-twist technique for medium to long hair that avoids the too-tight, too-neat trap.',
    targetKeywords: ['messy updo hairstyles', 'messy bun updo'],
    difficulty: 'Easy', timeToStyle: 'PT8M', hairType: ['straight', 'wavy', 'curly'], hairLength: 'medium-to-long',
    toolsNeeded: ['Hair tie', 'Bobby pins'],
    productsNeeded: ['Texturizing sea-salt spray', 'Light-hold hairspray'],
    steps: [
      { name: 'Add texture first', text: 'Mist dry hair with a texturizing sea-salt spray and scrunch lightly — starting with some texture makes the finished bun look intentional rather than simply undone.' },
      { name: 'Gather loosely', text: 'Gather the hair into a ponytail at the crown or slightly lower, leaving it a little loose rather than pulled taut.' },
      { name: 'Twist, don\'t wrap smooth', text: 'Twist the ponytail loosely around itself, letting some texture and volume stay in the twist instead of smoothing it flat.' },
      { name: 'Wrap and secure', text: 'Wrap the twisted length around the base of the ponytail in a loose coil, securing with a few bobby pins placed at different angles.' },
      { name: 'Pull pieces loose', text: 'Gently tug a few strands loose around the face and at the nape to soften the shape, then set lightly with a flexible-hold spray.' }
    ],
    tips: [
      { question: 'What actually makes a messy bun look "messy on purpose" instead of just undone?', answer: 'Adding texture spray before starting and deliberately pulling a few pieces loose at the end — those two steps signal intention, while a bun that\'s simply not secured well just looks unfinished.' },
      { question: 'Should the bun be tight or loose at the base?', answer: 'Loose — a tight, taut base fights against the relaxed look the style is going for, and also tends to look more severe than the soft, undone aesthetic a messy bun is meant to have.' },
      { question: 'Does this style work on second-day hair?', answer: 'It often works better on second-day hair, since hair with a little natural oil and texture holds the loose twist shape more easily than freshly washed, slippery hair.' }
    ],
    storyIntro: [
      'A messy updo bun sounds like it should require zero effort, but the styles that actually photograph well are more deliberate than they look — there\'s a real technique behind the "I just threw my hair up" appearance.',
      'Texture, looseness, and a few strategically pulled-loose pieces are the actual ingredients, not just gathering hair and wrapping an elastic around it.'
    ],
    storyNote: 'Pull loose pieces at the very end, after pinning — pulling strands loose before securing the bun usually just unravels the whole shape instead of adding soft texture around the edges.',
    images: { heroAlt: 'Messy updo bun hairstyle with loose texture and soft face-framing pieces', textureAlt: 'Close-up of a loosely twisted bun secured with bobby pins at different angles', pinAlt: 'Messy updo bun hairstyle, three-quarter view' }
  },

  // ---------------- PONYTAILS ----------------
  {
    slug: 'high-ponytail-tutorial', title: 'High Ponytail Tutorial', hubPath: 'ponytails', hubLabel: 'Ponytails',
    metaDescription: 'How to do a smooth, lifted high ponytail without a dent or bumps — the sectioning and back-combing technique that keeps it sleek from morning to night.',
    targetKeywords: ['high ponytail hairstyles', 'high ponytail'],
    difficulty: 'Easy', timeToStyle: 'PT10M', hairType: ['straight', 'wavy'], hairLength: 'medium-to-long',
    toolsNeeded: ['Teasing comb', 'Smoothing brush', 'Strong hair tie', 'Bobby pins'],
    productsNeeded: ['Volumizing mousse', 'Strong-hold gel', 'Finishing spray'],
    steps: [
      { name: 'Add volume at the crown', text: 'Work a small amount of volumizing mousse into the roots at the crown and back-comb lightly for lift before gathering the ponytail — this is what avoids a flat, dented look on top.' },
      { name: 'Section top from bottom', text: 'Clip the top section separately and smooth the lower section into place first, brushing firmly toward the crown point.' },
      { name: 'Gather high and secure', text: 'Combine both sections at the desired high point — generally level with the top of the ears or higher — and secure tightly with a strong hair tie.' },
      { name: 'Smooth over any bumps', text: 'Take a small piece of hair from underneath the ponytail, wrap it around the base to cover the elastic, and pin the end underneath.' },
      { name: 'Polish the finish', text: 'Smooth any remaining flyaways with a small amount of gel on a fine-tooth comb, then set with a light finishing spray.' }
    ],
    tips: [
      { question: 'Why does my high ponytail look flat on top?', answer: 'Skipping the root lift step at the crown before gathering is the main reason — the ponytail itself can be perfectly smooth and still look flat if there\'s no volume built in underneath at the very top.' },
      { question: 'How do I stop the elastic from leaving a dent?', answer: 'Wrapping a small hidden section of hair around the base of the ponytail to cover the elastic prevents the visible groove a bare hair tie leaves, especially on fine or straight hair.' },
      { question: 'What hair tie actually holds a high ponytail all day?', answer: 'A thicker, snag-free elastic specifically made for ponytails holds significantly longer than a thin rubber band, which tends to stretch out and slip within a few hours on thicker hair.' }
    ],
    storyIntro: [
      'A high ponytail looks like the simplest style in any hair routine, but the difference between a flat, slightly lopsided ponytail and a sleek, lifted one comes down to two or three specific technique steps most people skip.',
      'Volume at the crown before gathering, and a wrapped section to hide the elastic, are what separate an effortless-looking high ponytail from one that looks thrown together in thirty seconds.'
    ],
    storyNote: 'Gather the hair in two passes — bottom section first, then combined with the top — rather than trying to smooth the entire head in one motion, which is what usually leaves stray bumps near the crown.',
    images: { heroAlt: 'Sleek high ponytail hairstyle with lifted volume at the crown', textureAlt: 'Close-up of a hidden wrapped section covering the ponytail elastic', pinAlt: 'High ponytail hairstyle, side profile with smooth finish' }
  },
  {
    slug: 'sleek-low-ponytail-tutorial', title: 'Sleek Low Ponytail Tutorial', hubPath: 'ponytails', hubLabel: 'Ponytails',
    metaDescription: 'How to do a sleek low ponytail that reads polished, not plain — the gel-and-wrap technique for a clean, minimal-effort style that still looks finished.',
    targetKeywords: ['sleek ponytail hairstyles', 'low ponytail hairstyles'],
    difficulty: 'Easy', timeToStyle: 'PT8M', hairType: ['straight', 'wavy'], hairLength: 'medium-to-long',
    toolsNeeded: ['Smoothing brush', 'Fine-tooth comb', 'Hair tie', 'Bobby pins'],
    productsNeeded: ['Smoothing serum or gel', 'Light-hold finishing spray'],
    steps: [
      { name: 'Smooth from damp or dry hair', text: 'Apply a small amount of smoothing serum or gel and brush the hair thoroughly from roots to ends to eliminate any bumps or frizz before gathering.' },
      { name: 'Gather low and even', text: 'Gather all the hair at the nape, keeping the gathering point centered and level rather than off to one side, and secure with a hair tie.' },
      { name: 'Smooth once more', text: 'Brush over the ponytail once it\'s tied to catch any remaining unevenness, working from the base down to the ends.' },
      { name: 'Wrap and pin', text: 'Take a thin section of hair from the underside of the ponytail, wrap it around the base to hide the elastic, and secure the end with a bobby pin tucked underneath.' },
      { name: 'Finish with a light spray', text: 'Smooth flyaways with a fine-tooth comb dipped in a touch of gel, then set the whole style with a light-hold finishing spray so it doesn\'t look stiff.' }
    ],
    tips: [
      { question: 'What makes a low ponytail look "sleek" instead of just plain?', answer: 'The wrapped section hiding the elastic and a genuinely smooth, frizz-free surface are what elevate it — a low ponytail with a bare elastic and visible flyaways reads as unfinished rather than intentionally minimal.' },
      { question: 'Does this style work well on layered hair?', answer: 'Yes, though shorter face-framing layers may need a bit of extra gel or a couple of small pins to keep them from slipping out of the smoothed-back shape through the day.' },
      { question: 'How is a low ponytail different to style than a high one?', answer: 'A low ponytail relies less on crown volume and more on overall smoothness, since it sits closer to the natural fall of the hair — the styling focus shifts from lift to a clean, even surface.' }
    ],
    storyIntro: [
      'A sleek low ponytail is often treated as the "no effort" style, but a genuinely polished version needs the same smoothing and finishing steps as a fancier updo, just applied to a simpler shape.',
      'The wrapped-elastic detail and a real smoothing pass with serum or gel are what turn a five-second hair grab into something that looks deliberately put together.'
    ],
    storyNote: 'Center the gathering point carefully before tying off — an off-center low ponytail is one of the most common small mistakes, and it\'s much easier to fix before securing than after.',
    images: { heroAlt: 'Sleek low ponytail hairstyle with smooth, polished finish at the nape', textureAlt: 'Close-up of a low ponytail base wrapped to hide the elastic', pinAlt: 'Sleek low ponytail hairstyle, back view' }
  },

  // ---------------- WEDDING HAIR ----------------
  {
    slug: 'half-up-half-down-wedding-hairstyle-tutorial', title: 'Half-Up Half-Down Wedding Hairstyle', hubPath: 'wedding-hair', hubLabel: 'Wedding Hair',
    metaDescription: 'How to do a half-up half-down wedding hairstyle that holds through the whole reception — a braided crown technique built for hours of dancing, not just photos.',
    targetKeywords: ['wedding hairstyles half up half down', 'half up half down wedding hair'],
    difficulty: 'Medium', timeToStyle: 'PT40M', hairType: ['straight', 'wavy', 'curly'], hairLength: 'medium-to-long',
    toolsNeeded: ['1-inch curling wand', 'Sectioning clips', 'Bobby pins', 'Small elastic'],
    productsNeeded: ['Heat protectant', 'Strong-hold hairspray', 'Shine serum'],
    steps: [
      { name: 'Curl the whole head first', text: 'Apply heat protectant and curl the entire head in loose waves, alternating curl direction for a natural, non-uniform texture that lasts through the day.' },
      { name: 'Section the crown', text: 'Take two small sections from just above each ear and hold them aside — this frames the face for the half-up portion.' },
      { name: 'Braid each side section', text: 'Loosely French or Dutch braid each of the two sections back toward the crown, keeping tension gentle so the braid stays soft rather than tight.' },
      { name: 'Cross and pin at the back', text: 'Bring both braided sections to meet at the center back of the head, crossing them slightly and pinning securely with several bobby pins hidden underneath the loose hair.' },
      { name: 'Set for longevity', text: 'Mist the entire style, especially the pinned section and any face-framing curls, with a strong-hold spray to make sure it survives dancing and a full reception.' }
    ],
    tips: [
      { question: 'How do I make sure this survives an entire wedding day?', answer: 'A strong-hold spray on the pinned crown section specifically, plus extra bobby pins placed in a crisscross pattern rather than parallel, are what typically make the difference between a style that holds through dancing and one that doesn\'t.' },
      { question: 'Should the curls be done before or after the braided section?', answer: 'Before — curling the whole head first, then braiding sections from the already-curled hair, keeps the braids from looking flat and gives the overall style more cohesive texture.' },
      { question: 'Is this style workable for a bride doing her own hair?', answer: 'It\'s more manageable solo than a full updo, though the back-pinning step benefits from a helper or a hand mirror setup, since pinning securely without seeing the back can take extra time.' }
    ],
    storyIntro: [
      'A half-up half-down wedding hairstyle has to do more work than a photo-only style — it needs to survive a ceremony, a reception, and often hours of dancing without needing a mid-event touch-up.',
      'The braided-crown version specifically holds up better than a simple half-up ponytail because the braid structure itself resists loosening in a way that a single elastic and some pins can\'t match over a full day.'
    ],
    storyNote: 'Curl first, braid second — braiding pre-curled hair gives the finished style more texture and body than curling loose ends after the braids are already pinned in place.',
    images: { heroAlt: 'Half-up half-down wedding hairstyle with braided crown and loose curls', textureAlt: 'Close-up of two braided sections crossed and pinned at the back of the head', pinAlt: 'Half-up half-down wedding hairstyle, back view showing the braided crown' }
  },
  {
    slug: 'bridal-bun-tutorial', title: 'Bridal Bun Tutorial', hubPath: 'wedding-hair', hubLabel: 'Wedding Hair',
    metaDescription: 'How to do a low bridal bun that looks elegant, not severe — a soft, textured wrap technique that works under a veil and holds through the ceremony.',
    targetKeywords: ['bun hairstyles for wedding', 'bridal bun'],
    difficulty: 'Medium', timeToStyle: 'PT30M', hairType: ['straight', 'wavy', 'curly'], hairLength: 'medium-to-long',
    toolsNeeded: ['1-inch curling wand', 'Hair donut or foam bun form (optional)', 'Bobby pins', 'Hair tie'],
    productsNeeded: ['Heat protectant', 'Smoothing serum', 'Strong-hold hairspray'],
    steps: [
      { name: 'Add loose waves', text: 'Curl the hair in large, loose waves throughout — even a smooth bridal bun benefits from starting with textured hair rather than pin-straight strands, which is what gives the finished bun softness.' },
      { name: 'Gather low at the nape', text: 'Gather all the hair into a low ponytail at the nape, ideally sitting just above where a veil comb would be placed.' },
      { name: 'Build the bun shape', text: 'Wrap the ponytail around a hair donut or simply coil it around itself into a smooth, rounded bun, pinning as you go to build the shape.' },
      { name: 'Pull soft pieces loose', text: 'Gently loosen a few strands around the face and at the nape with fingers for a soft, romantic finish rather than a severe, tightly scraped-back look.' },
      { name: 'Secure and finish', text: 'Add extra bobby pins around the base of the bun for hours of hold, then set with a strong-hold spray, leaving the loosened face-framing pieces untouched.' }
    ],
    tips: [
      { question: 'How do I keep a bridal bun from looking too severe?', answer: 'Starting with waves instead of straight hair, and deliberately loosening a few pieces around the face at the end, are what keep a bun looking soft and romantic instead of tight and scraped-back.' },
      { question: 'Where should the bun sit if a veil is being worn?', answer: 'Positioning the bun slightly higher than a standard low bun, generally at or just below the crown, gives room for a veil comb to anchor securely above or into the bun itself.' },
      { question: 'Does a hair donut actually help for a bridal bun?', answer: 'It gives a more uniform, fuller shape with less effort than freehand coiling, especially for finer hair — thicker hair can usually build enough volume with just pinning and wrapping.' }
    ],
    storyIntro: [
      'A bridal bun needs to hold two competing goals at once — polished enough for formal photos, but soft enough not to look severe next to a veil or delicate jewelry.',
      'Starting with texture rather than perfectly straight hair, and deliberately loosening a few pieces at the very end, is what balances those two things instead of ending up with a tight, plain bun.'
    ],
    storyNote: 'Position the bun with the veil placement in mind before pinning it permanently — moving a finished bun after the veil comb is already anchored is far harder than planning the height first.',
    images: { heroAlt: 'Soft low bridal bun hairstyle with loose face-framing pieces', textureAlt: 'Close-up of a wrapped bridal bun secured with bobby pins around the base', pinAlt: 'Bridal bun hairstyle, side view suitable for a veil' }
  },

  // ---------------- MEDIUM HAIR ----------------
  {
    slug: 'easy-medium-length-hairstyle-tutorial', title: 'Easy Medium-Length Hairstyle Tutorial', hubPath: 'medium-hair', hubLabel: 'Medium Hair',
    metaDescription: 'A five-minute half-up hairstyle for medium-length hair — the twist-and-pin technique that works on the awkward in-between length without needing a curling iron.',
    targetKeywords: ['easy hairstyles for medium length hair', 'medium length hairstyle'],
    difficulty: 'Easy', timeToStyle: 'PT5M', hairType: ['straight', 'wavy', 'curly'], hairLength: 'medium',
    toolsNeeded: ['Fine-tooth comb', 'Bobby pins', 'Small elastic (optional)'],
    productsNeeded: ['Texturizing spray'],
    steps: [
      { name: 'Add a little texture', text: 'Mist a small amount of texturizing spray through dry hair to give it more grip — medium-length hair, especially if freshly washed, can be too slippery to hold a twist otherwise.' },
      { name: 'Section the top', text: 'Take two small sections from the front, roughly starting above each eyebrow, leaving the rest of the hair down.' },
      { name: 'Twist each section back', text: 'Twist each section toward the back of the head, keeping the twist loose rather than tight for a softer look.' },
      { name: 'Cross and pin', text: 'Bring the two twisted sections together at the back of the head, cross them once, and pin securely with a couple of bobby pins.' },
      { name: 'Fluff for volume', text: 'Gently pull at the crown of the twisted sections with fingertips to add a little lift and volume before finishing.' }
    ],
    tips: [
      { question: 'Why is medium-length hair harder to style than long or short hair?', answer: 'It falls in between two categories — often too short to hold some updos securely, but too long to rely on shape alone the way a short cut does, so styles designed specifically for the length work better than adapting a long-hair or short-hair technique.' },
      { question: 'Can this style be done without any heat tools?', answer: 'Yes — the twist-and-pin technique described here uses zero heat and works entirely with dry, textured hair, making it genuinely a five-minute style rather than one that requires prep time.' },
      { question: 'What if the hair is too fine to hold a twist?', answer: 'A texturizing spray with some hold, rather than a purely moisturizing product, gives fine medium-length hair the extra grip needed for the twist to stay pinned through the day.' }
    ],
    storyIntro: [
      'Medium-length hair sits in a styling gap — most tutorials are written for long hair and simply don\'t account for the shorter length, which is why so many "easy" styles don\'t actually work at this length.',
      'A simple twist-and-pin half-up style, built around the specific proportions of medium hair, avoids that problem entirely and takes about five minutes with zero heat tools.'
    ],
    storyNote: 'Add texture spray before twisting, not after — freshly washed medium-length hair is often too smooth and slippery to hold a twist without some grip added first.',
    images: { heroAlt: 'Easy medium-length hairstyle with twisted half-up sections', textureAlt: 'Close-up of two twisted sections crossed and pinned at the back', pinAlt: 'Medium-length hairstyle, front view showing the twisted half-up style' }
  },
  {
    slug: 'medium-length-braided-hairstyle-tutorial', title: 'Medium-Length Braided Hairstyle Tutorial', hubPath: 'medium-hair', hubLabel: 'Medium Hair',
    metaDescription: 'A braided hairstyle built specifically for medium-length hair — a single side braid technique that doesn\'t require the extra length most braid tutorials assume.',
    targetKeywords: ['hairstyles for medium length hair braids', 'medium length braided hairstyle'],
    difficulty: 'Easy', timeToStyle: 'PT12M', hairType: ['straight', 'wavy', 'curly'], hairLength: 'medium',
    toolsNeeded: ['Fine-tooth comb', 'Small elastic', 'Bobby pins'],
    productsNeeded: ['Detangling spray', 'Light-hold hairspray'],
    steps: [
      { name: 'Detangle and side-part', text: 'Spray a light detangler through the hair and create a deep side part, which gives medium-length hair more visual length to work with for a side braid.' },
      { name: 'Gather from the heavier side', text: 'Starting near the front of the deeper-parted side, gather a small section and begin a simple three-strand or Dutch braid angled toward the opposite shoulder.' },
      { name: 'Feed in remaining hair gradually', text: 'Continue feeding in hair from along the part as the braid moves across and down, which uses the medium length more efficiently than a straight-back braid would.' },
      { name: 'Braid to the ends', text: 'Once all the hair is incorporated, finish with a regular three-strand braid to the ends and secure with a small elastic.' },
      { name: 'Loosen for fullness', text: 'Gently pull at the outer edges of each braid section with fingertips to widen it slightly, which makes shorter, medium-length hair look fuller in a braid.' }
    ],
    tips: [
      { question: 'Why do braid tutorials often not work on medium-length hair?', answer: 'Most braid tutorials are demonstrated on long hair and rely on extra length to feed in as the braid progresses — an angled side braid uses the width of the head instead of length, which suits medium hair better.' },
      { question: 'Does a side braid work if the hair is layered?', answer: 'Yes, though shorter face-framing layers may need a small amount of gel or a bobby pin near the front to keep them from working loose out of the braid.' },
      { question: 'How can a medium-length braid be made to look fuller?', answer: 'Gently tugging the outer edges of each braided section after finishing widens the braid and makes it look thicker — a trick that matters more on medium-length hair, which naturally has less braid to work with than long hair.' }
    ],
    storyIntro: [
      'Braiding medium-length hair runs into a real problem most tutorials ignore — there simply isn\'t enough length for many standard braid patterns to look proportional or even to reach a normal tail.',
      'An angled side braid solves this by using the width of the head rather than relying on extra length, which is exactly the kind of adjustment medium-length hair needs from most braid instructions written for long hair.'
    ],
    storyNote: 'A deep side part, rather than a center part, visually stretches the length available for the braid to work with, which is a small trick that matters more than it sounds like for shorter, medium lengths.',
    images: { heroAlt: 'Medium-length hair styled in an angled side braid', textureAlt: 'Close-up of a side braid feeding in hair from a deep part', pinAlt: 'Medium-length braided hairstyle, side profile view' }
  },

  // ---------------- WIG ----------------
  {
    slug: 'frontal-wig-install-tutorial', title: 'Frontal Wig Install Tutorial', hubPath: 'wig', hubLabel: 'Wig',
    metaDescription: 'How to install a frontal wig for a natural hairline — the melting, plucking and baby-hair technique that keeps a lace frontal from looking obviously fake.',
    targetKeywords: ['frontal wig hairstyles', 'wig install hairstyles'],
    difficulty: 'Hard', timeToStyle: 'PT2H', hairType: ['straight', 'wavy', 'coily'], hairLength: 'medium-to-long',
    toolsNeeded: ['Wig cap or cornrow base', 'Tweezers', 'Small scissors', 'Rat-tail comb', 'Elastic band or edge control brush'],
    productsNeeded: ['Wig glue or gel adhesive', 'Concealer close to scalp tone', 'Baby hairspray or gel'],
    steps: [
      { name: 'Prep the natural hair', text: 'Braid the natural hair down flat, either into cornrows or a flat wrap, and secure a wig cap over it for a smooth, protected base.' },
      { name: 'Pluck the frontal for density', text: 'Using tweezers, pluck small sections of hair along the frontal\'s hairline to thin it out — a completely dense lace edge is what most often gives a wig away as fake.' },
      { name: 'Customize the part and tint the lace', text: 'Cut the lace along the front hairline, leaving a small margin, and tint the lace with a concealer close to the scalp tone so it disappears against the skin.' },
      { name: 'Apply adhesive and lay the wig', text: 'Apply a thin, even line of wig glue or gel along the hairline, wait until slightly tacky, then lay the frontal down starting from the center and smoothing outward.' },
      { name: 'Melt and style the edges', text: 'Use a hooded dryer or handheld dryer on low heat to "melt" the lace flush against the skin, then style a few baby hairs along the hairline with a small brush and light gel.' }
    ],
    tips: [
      { question: 'What actually makes a frontal look fake in photos?', answer: 'An unplucked, overly dense hairline and an untinted lace that doesn\'t match the scalp are the two biggest giveaways — thinning the hairline with tweezers and tinting the lace are what actually sell a natural look, more than the wig quality itself.' },
      { question: 'Is plucking the frontal really necessary?', answer: 'Yes, for a realistic hairline — factory-made frontals come with a uniformly dense edge that doesn\'t match how real hair grows, so light plucking to create some natural sparseness is a standard, expected step.' },
      { question: 'How long does a properly installed frontal last before needing to be redone?', answer: 'Roughly 2-4 weeks with proper care, though this depends heavily on adhesive type and how well the edges are maintained — glue-based installs generally need to be removed and cleaned sooner than gel-based ones.' }
    ],
    storyIntro: [
      'A frontal wig install is one of the more technical styles here — beyond just laying the lace down, the details that make it look like a real hairline (plucking, tinting, melting) are what most beginner installs skip.',
      'Getting those small steps right is genuinely more important than the quality of the wig itself, since even an expensive frontal looks obviously artificial without a thinned, tinted, properly melted edge.'
    ],
    storyNote: 'Never skip tinting the lace to match the scalp — even a well-plucked frontal reads as fake at a glance if the lace itself is a noticeably different tone than the skin underneath it.',
    images: { heroAlt: 'Frontal wig install with natural melted hairline and styled baby hairs', textureAlt: 'Close-up of a tinted, plucked lace frontal edge blending into the scalp', pinAlt: 'Frontal wig hairstyle, front-facing view with natural hairline' }
  },
  {
    slug: 'wig-swoop-styling-tutorial', title: 'Wig Swoop Styling Tutorial', hubPath: 'wig', hubLabel: 'Wig',
    metaDescription: 'How to style a swoop bang on a wig without a lace frontal — a side-part, heat-styling technique that works on regular wefted wigs.',
    targetKeywords: ['swoop wig hairstyles', 'wig swoop styling'],
    difficulty: 'Medium', timeToStyle: 'PT25M', hairType: ['straight', 'wavy'], hairLength: 'medium-to-long',
    toolsNeeded: ['Wide-tooth comb', 'Flat iron or curling wand', 'Wig stand or mannequin head (optional)'],
    productsNeeded: ['Heat protectant safe for the wig fiber (if synthetic)', 'Light-hold gel', 'Wig-safe hairspray'],
    steps: [
      { name: 'Confirm the fiber type', text: 'Check whether the wig is human hair or synthetic before applying any heat — synthetic fibers need a much lower, wig-safe heat setting or none at all, since regular flat iron temperatures can melt them.' },
      { name: 'Create a deep side part', text: 'Comb the wig into a deep side part, well off-center, which is what gives enough length and coverage on one side to create the swoop.' },
      { name: 'Direct the heavier side forward', text: 'Take the larger side section and, using a flat iron or wand, direct it forward and down at an angle across the forehead rather than straight down.' },
      { name: 'Blend the edge', text: 'Comb the swooped section lightly to blend it into the rest of the style, softening the line where it meets the shorter side.' },
      { name: 'Set and secure', text: 'Mist with a wig-safe hairspray to hold the shape, and if the wig is on a stand, pin the swoop lightly overnight to help it hold its direction.' }
    ],
    tips: [
      { question: 'Can heat tools be used on any wig?', answer: 'Only human hair or heat-resistant synthetic wigs — regular synthetic fiber will melt or frizz irreversibly under standard flat iron heat, so checking the wig\'s material first is essential before this style.' },
      { question: 'Why use a swoop instead of a frontal for this look?', answer: 'A swoop bang gives a similar face-framing, natural-parting effect to a frontal but works on a standard wefted wig without needing lace, glue, or plucking — a much faster, lower-commitment option.' },
      { question: 'How is the swoop kept in place through the day?', answer: 'A wig-safe hairspray applied specifically along the swoop\'s edge, plus avoiding wind or repeated touching, keeps the direction set — re-directing it with a flat iron touch-up works if it does fall out of place.' }
    ],
    storyIntro: [
      'A swoop bang is the go-to styling trick for wigs without a lace frontal — it gives a similar natural, off-center parting effect without needing any of the gluing, plucking or melting a frontal install requires.',
      'The technique itself is simple heat styling, but checking the wig\'s fiber type first is the step that prevents a genuinely common and often irreversible mistake — melting a synthetic wig with the wrong heat setting.'
    ],
    storyNote: 'Test a small hidden section with the flat iron first if there\'s any doubt about the wig\'s fiber — a quick test avoids ruining the whole wig on a section that can\'t be undone once synthetic fiber melts.',
    images: { heroAlt: 'Wig styled with a deep side-part swoop bang across the forehead', textureAlt: 'Close-up of the swooped section blending into a deep side part on a wig', pinAlt: 'Wig swoop hairstyle, front view with off-center parting' }
  }
];

const OUT_DIR = path.join(__dirname, 'content', 'styles');
fs.mkdirSync(OUT_DIR, { recursive: true });

STYLES.forEach(s => {
  const full = Object.assign({
    author: AUTHOR,
    datePublished: DATE,
    reviews: [],
    reviewCount: 0,
    avgRating: null,
    images: Object.assign({ hero: 'hero.jpg', pin: 'pin.jpg', texture: 'texture.jpg' }, s.images)
  }, s);
  fs.writeFileSync(path.join(OUT_DIR, `${s.slug}.json`), JSON.stringify(full, null, 2));
  console.log(`wrote ${s.slug}.json`);
});

console.log(`\nTotal styles: ${STYLES.length}`);
