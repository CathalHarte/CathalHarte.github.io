// Pre-renders content.js into index.html so the home page is readable without
// JavaScript — by search engines, AI crawlers, link previews and screen readers
// that fetch raw HTML. content.js still renders at runtime and produces the
// same markup, so nothing changes for visitors.
//
//   node tools/prerender.mjs          rewrite index.html
//   node tools/prerender.mjs --check  exit 1 if index.html is out of date
//
// No dependencies; run it after every edit to content.js.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const SITE = 'https://cathalharte.ch/';
const root = fileURLToPath(new URL('..', import.meta.url));
const indexPath = root + 'index.html';

// ── Run content.js against a minimal DOM stub ────────────────────────────────
const els = {};
const document = {
  title: '',
  getElementById: id => (els[id] ??= { innerHTML: '', textContent: '' }),
};
const ctx = vm.createContext({ document });
vm.runInContext(readFileSync(root + 'content.js', 'utf8') + '\n;globalThis.CV = CV;', ctx);
const CV = ctx.CV;

// ── Structured data (schema.org Person) built from the same CV object ────────
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': SITE + '#person',
  name: CV.name,
  url: SITE,
  jobTitle: CV.title,
  description: CV.about.join(' '),
  email: 'mailto:' + CV.contact.email,
  worksFor: { '@type': 'Organization', name: 'Terapet', url: CV.contact.terapet },
  sameAs: [CV.contact.linkedin],
  knowsAbout: [
    'Medical device software',
    'Neurotechnology',
    'Brain–computer interfaces',
    'Brain–spine interface',
    'Spinal cord stimulation',
    'Nuclear medicine',
    'Positron emission tomography (PET)',
    'Medical device risk management',
  ],
  subjectOf: CV.press.map(p => ({
    '@type': p.type === 'Video' ? 'VideoObject' : p.type === 'Paper' ? 'ScholarlyArticle' : 'NewsArticle',
    name: p.title,
    url: p.url,
    publisher: { '@type': 'Organization', name: p.outlet },
  })),
};
const jsonld = '\n' + JSON.stringify(person, null, 2).replace(/<\//g, '<\\/') + '\n  ';

// ── Splice into index.html ───────────────────────────────────────────────────
const replaceInner = (src, open, close, inner) => {
  const re = new RegExp(`(${open})[\\s\\S]*?(${close})`);
  if (!re.test(src)) throw new Error(`index.html: could not find ${open}`);
  return src.replace(re, (_, a, b) => a + inner + b);
};

const before = readFileSync(indexPath, 'utf8');
let html = before;
html = replaceInner(html, '<title>', '</title>', document.title);
html = replaceInner(html, '<span class="logo" id="nav-logo">', '</span>', els['nav-logo'].textContent);
html = replaceInner(html, '<ul id="nav-links">', '</ul>', els['nav-links'].innerHTML);
html = replaceInner(html, '<script type="application/ld\\+json" id="person-jsonld">', '</script>', jsonld);
html = replaceInner(html, '<main id="cv-root">', '</main>',
  '\n    <!-- Pre-rendered from content.js by tools/prerender.mjs — do not edit by hand -->\n' +
  els['cv-root'].innerHTML.trim() + '\n  ');

if (process.argv.includes('--check')) {
  if (html !== before) {
    console.error('index.html is out of date with content.js — run: node tools/prerender.mjs');
    process.exit(1);
  }
  console.log('index.html is up to date.');
} else {
  writeFileSync(indexPath, html);
  console.log(html === before ? 'index.html already up to date.' : 'index.html updated.');
}
