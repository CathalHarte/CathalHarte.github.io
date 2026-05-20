// ── Theme definitions — nav adapts as sections enter the viewport ─────────────
const THEMES = {
  hero:       { navBg: 'rgba(255,255,255,0.92)', fg: '#0A0A0A', muted: '#4A4A4A' },
  about:      { navBg: 'rgba(255,255,255,0.92)', fg: '#0A0A0A', muted: '#4A4A4A' },
  'page-intro': { navBg: 'rgba(255,255,255,0.92)', fg: '#0A0A0A', muted: '#4A4A4A' },
  project:    { navBg: 'rgba(0,13,28,0.97)',     fg: '#C8D0E0', muted: '#4E6080' },
  bsi:        { navBg: 'rgba(0,13,28,0.97)',     fg: '#C8D0E0', muted: '#4E6080' },
  stimo:      { navBg: 'rgba(0,13,28,0.97)',     fg: '#C8D0E0', muted: '#4E6080' },
  parkinsons:   { navBg: 'rgba(0,13,28,0.97)',     fg: '#C8D0E0', muted: '#4E6080' },
  robotics:     { navBg: 'rgba(0,13,28,0.97)',     fg: '#C8D0E0', muted: '#4E6080' },
  hemodynamics: { navBg: 'rgba(0,13,28,0.97)',     fg: '#C8D0E0', muted: '#4E6080' },
  pullquote:  { navBg: 'rgba(0,13,28,0.97)',     fg: '#C8D0E0', muted: '#4E6080' },
  press:      { navBg: 'rgba(0,13,28,0.97)',     fg: '#C8D0E0', muted: '#4E6080' },
  terapet:    { navBg: 'rgba(0,13,28,0.97)',     fg: '#C8D0E0', muted: '#4E6080' },
  interests:  { navBg: 'rgba(4,6,8,0.98)',        fg: '#C0C8D8', muted: '#465568' },
  contact:    { navBg: 'rgba(2,3,4,0.99)',       fg: '#B8C0D0', muted: '#404E60' },
};

function applyTheme(id) {
  const t = THEMES[id];
  if (!t) return;
  const r = document.documentElement.style;
  r.setProperty('--nav-bg', t.navBg);
  r.setProperty('--fg',     t.fg);
  r.setProperty('--muted',  t.muted);
}

// ── Theme transitions — snap as section hits centre ───────────────────────────
const themeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) applyTheme(e.target.id); });
}, { rootMargin: '-42% 0px -42% 0px' });

// ── Reveal / stagger ──────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

// ── Active nav link ───────────────────────────────────────────────────────────
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    const link = document.querySelector(`#nav-links a[href="#${e.target.id}"]`);
    if (link) link.classList.toggle('active', e.isIntersecting);
  });
}, { rootMargin: '-44% 0px -44% 0px' });

// ── Scroll handler — progress bar + hero parallax ────────────────────────────
const progressBar = document.getElementById('progress');
const viewH       = window.innerHeight;

window.addEventListener('scroll', () => {
  const scrolled  = window.scrollY;
  const maxScroll = document.body.scrollHeight - viewH;

  progressBar.style.width = (scrolled / maxScroll * 100) + '%';

  const heroInner = document.querySelector('.hero-inner');
  if (heroInner && scrolled < viewH) {
    heroInner.style.transform = `translateY(${scrolled * 0.32}px)`;
  }
}, { passive: true });

// ── Init ──────────────────────────────────────────────────────────────────────
document.querySelectorAll('section[id]').forEach(el => {
  themeObserver.observe(el);
  navObserver.observe(el);
});

document.querySelectorAll('.reveal, .stagger').forEach(el => {
  revealObserver.observe(el);
});
