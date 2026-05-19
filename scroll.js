// ── Theme definitions — light (hero) → dark (contact) ────────────────────────
const THEMES = {
  hero: {
    bg: '#F9F7F0', fg: '#111111', surface: '#EDE9DF',
    border: '#DDD8CA', muted: '#666666',
    navBg: 'rgba(249,247,240,0.88)',
  },
  about: {
    bg: '#F2EBD8', fg: '#111111', surface: '#E5DCCA',
    border: '#D5CCB8', muted: '#5A5A5A',
    navBg: 'rgba(242,235,216,0.88)',
  },
  experience: {
    bg: '#312E44', fg: '#E8E3DA', surface: '#3D3956',
    border: '#4A4660', muted: '#A89FC0',
    navBg: 'rgba(49,46,68,0.92)',
  },
  skills: {
    bg: '#191724', fg: '#E8E3DA', surface: '#22203A',
    border: '#2E2B48', muted: '#9490B0',
    navBg: 'rgba(25,23,36,0.92)',
  },
  education: {
    bg: '#0F0E18', fg: '#EAEAF5', surface: '#18162A',
    border: '#22203A', muted: '#8888AA',
    navBg: 'rgba(15,14,24,0.94)',
  },
  contact: {
    bg: '#09090F', fg: '#F0F0F8', surface: '#111020',
    border: '#1C1A2C', muted: '#8080A0',
    navBg: 'rgba(9,9,15,0.94)',
  },
};

// ── Apply a theme by updating CSS custom properties ───────────────────────────
function applyTheme(id) {
  const t = THEMES[id];
  if (!t) return;
  const r = document.documentElement.style;
  r.setProperty('--bg',      t.bg);
  r.setProperty('--fg',      t.fg);
  r.setProperty('--surface', t.surface);
  r.setProperty('--border',  t.border);
  r.setProperty('--muted',   t.muted);
  r.setProperty('--nav-bg',  t.navBg);
}

// ── Theme transitions — trigger when section reaches centre of viewport ───────
const themeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) applyTheme(e.target.id); });
}, { rootMargin: '-42% 0px -42% 0px' });

// ── Reveal / stagger — fade in elements as they scroll into view ──────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

// ── Active nav link — highlight the current section ───────────────────────────
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    const link = document.querySelector(`#nav-links a[href="#${e.target.id}"]`);
    if (link) link.classList.toggle('active', e.isIntersecting);
  });
}, { rootMargin: '-44% 0px -44% 0px' });

// ── Scroll handler — progress bar + hero parallax ────────────────────────────
const progressBar  = document.getElementById('progress');
const heroInner    = document.querySelector('.hero-inner');
const viewH        = window.innerHeight;

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const maxScroll = document.body.scrollHeight - viewH;

  progressBar.style.width = (scrolled / maxScroll * 100) + '%';

  if (heroInner && scrolled < viewH) {
    heroInner.style.transform = `translateY(${scrolled * 0.22}px)`;
  }
}, { passive: true });

// ── Init — observe all sections once the DOM is ready ────────────────────────
document.querySelectorAll('section[id]').forEach(el => {
  themeObserver.observe(el);
  navObserver.observe(el);
});

document.querySelectorAll('.reveal, .stagger').forEach(el => {
  revealObserver.observe(el);
});
