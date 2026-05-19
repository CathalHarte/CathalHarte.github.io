// ── Theme definitions — nav adapts as sections enter the viewport ─────────────
const THEMES = {
  hero:       { navBg: 'rgba(255,255,255,0.92)',  fg: '#0A0A0A', muted: '#595959' },
  about:      { navBg: 'rgba(250,248,244,0.92)',  fg: '#0A0A0A', muted: '#595959' },
  experience: { navBg: 'rgba(0,31,63,0.96)',      fg: '#E8E8EE', muted: '#8A9AB5' },
  press:      { navBg: 'rgba(0,20,40,0.96)',      fg: '#E8E8EE', muted: '#7A8AAA' },
  skills:     { navBg: 'rgba(250,248,244,0.92)',  fg: '#0A0A0A', muted: '#595959' },
  education:  { navBg: 'rgba(2,8,16,0.97)',       fg: '#F0F0F8', muted: '#7880A0' },
  contact:    { navBg: 'rgba(5,8,15,0.98)',       fg: '#F0F0F8', muted: '#6878A0' },
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

// ── Scroll handler — progress bar + stronger hero parallax ───────────────────
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
