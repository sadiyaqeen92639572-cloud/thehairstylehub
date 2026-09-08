// Shared fragments for all page builders (build-hub-pages.js, build-style-page.js).
// Dependency-free on purpose — keep it that way.

const SITE_URL = 'https://thehairstylehub.com';
const SITE_NAME = 'The Hairstyle Hub';

// Fixed hub order — the site-wide crawl nav rendered on every page (home, hubs, articles).
// Keeps every article <= 1 hop from every hub.
const HUBS_NAV = [
  ['braids', 'Braids'],
  ['curly-hair', 'Curly Hair'],
  ['short-hair', 'Short Hair'],
  ['natural-hair', 'Natural Hair'],
  ['long-hair', 'Long Hair'],
  ['medium-hair', 'Medium Hair'],
  ['school', 'School'],
  ['kids-hair', 'Kids Hair'],
  ['mens-hair', "Men's Hair"],
  ['updos', 'Updos'],
  ['ponytails', 'Ponytails'],
  ['wedding-hair', 'Wedding Hair'],
  ['wig', 'Wig'],
];

// Appended into each page's <style> block — relies on the --border/--muted/--accent/--text
// custom props that every template already defines on :root.
const HUB_NAV_CSS = `
  .hubnav{font-family:Inter,sans-serif;font-size:.8rem;max-width:960px;margin:0 auto;padding:.65rem 1.5rem;border-bottom:1px solid var(--border);display:flex;flex-wrap:wrap;gap:.35rem .9rem;line-height:1.5;}
  .hubnav a{color:var(--muted);text-decoration:none;}
  .hubnav a:hover{color:var(--accent);}
  .hubnav .home{font-weight:600;color:var(--text);}
`;

const HUB_NAV =
  `<nav class="hubnav" aria-label="All hairstyle categories">` +
  `<a class="home" href="/">The Hairstyle Hub</a>` +
  HUBS_NAV.map(([p, l]) => `<a href="/${p}/">${l}</a>`).join('') +
  `</nav>`;

module.exports = { SITE_URL, SITE_NAME, HUBS_NAV, HUB_NAV, HUB_NAV_CSS };
