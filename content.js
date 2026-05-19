// ─────────────────────────────────────────────────────────────────────────────
//  CONTENT  —  edit everything in this block
//
//  Colour markup for words and phrases inside text:
//    {y:your text}   yellow / gold
//    {o:your text}   orange
//    {s:your text}   sky blue
//    {b:your text}   sea blue
// ─────────────────────────────────────────────────────────────────────────────

const CV = {

  name:         'Your Name',
  initials:     'YN',
  title:        'Software Engineer',
  availability: 'Available for opportunities',

  about: [
    'I build {s:fast, accessible web applications} with a focus on {y:clean architecture} and great user experience.',
    'Currently interested in {o:distributed systems} and the intersection of {b:design and engineering}.',
  ],

  experience: [
    {
      org:  'Company Name',
      role: 'Senior Software Engineer',
      date: '2023 – Present',
      desc: 'Short description of what you did, what you shipped, and the {y:impact it had}. Keep it tight — two or three sentences.',
    },
    {
      org:  'Previous Company',
      role: 'Software Engineer',
      date: '2021 – 2023',
      desc: 'What you built, the team, and any highlights worth calling out. {o:Numbers and outcomes} land better than vague responsibilities.',
    },
    {
      org:  'Earlier Role',
      role: 'Junior Developer',
      date: '2019 – 2021',
      desc: 'A brief note on what you worked on and {s:what you learned} during this period.',
    },
  ],

  skills: [
    { name: 'TypeScript / JavaScript', level: 'Expert' },
    { name: 'React / Next.js',         level: 'Expert' },
    { name: 'Node.js',                 level: 'Proficient' },
    { name: 'Python',                  level: 'Proficient' },
    { name: 'PostgreSQL',              level: 'Proficient' },
    { name: 'Docker / CI-CD',          level: 'Comfortable' },
  ],

  education: [
    {
      degree: 'BSc Computer Science',
      school: 'University Name',
      date:   '2015 – 2019',
    },
  ],

  contact: {
    email:    'you@example.com',
    github:   'https://github.com/yourhandle',
    linkedin: 'https://linkedin.com/in/yourhandle',
  },

};

// ─────────────────────────────────────────────────────────────────────────────
//  RENDER  —  no need to edit below this line
// ─────────────────────────────────────────────────────────────────────────────

function markup(str) {
  if (!str) return '';
  return str
    .replace(/\{y:(.*?)\}/g, '<span class="hy">$1</span>')
    .replace(/\{o:(.*?)\}/g, '<span class="ho">$1</span>')
    .replace(/\{s:(.*?)\}/g, '<span class="hs">$1</span>')
    .replace(/\{b:(.*?)\}/g, '<span class="hb">$1</span>');
}

(function render(data) {

  // Page title
  document.title = 'CV — ' + data.name;

  // Nav
  document.getElementById('nav-logo').textContent = data.initials;
  const navSections = ['about', 'experience', 'skills', 'education', 'contact'];
  document.getElementById('nav-links').innerHTML = navSections
    .map(s => `<li><a href="#${s}">${s.charAt(0).toUpperCase() + s.slice(1)}</a></li>`)
    .join('');

  // Build page
  const root = document.getElementById('cv-root');
  root.innerHTML = [
    renderHero(data),
    renderAbout(data),
    renderExperience(data),
    renderSkills(data),
    renderEducation(data),
    renderContact(data),
  ].join('');

  // Footer
  document.getElementById('cv-footer').innerHTML =
    `Built with plain HTML &amp; CSS &middot; ${new Date().getFullYear()}`;

})(CV);

// ── Section builders ──────────────────────────────────────────────────────────

function renderHero(d) {
  return `
    <section id="hero" data-initials="${d.initials}">
      <div class="hero-inner">
        <p class="hero-eyebrow">${d.availability}</p>
        <h1 class="hero-name">${d.name}</h1>
        <p class="hero-title">${d.title}</p>
        <div class="hero-links">
          <a href="#contact" class="btn btn-primary">Get in touch</a>
          <a href="#experience" class="btn btn-ghost">View my work</a>
        </div>
      </div>
    </section>`;
}

function renderAbout(d) {
  const paras = d.about.map(p => `<p>${markup(p)}</p>`).join('');
  return sectionWrap('about', 'About', 'A bit about me', `
    <div class="reveal about-body">${paras}</div>
  `);
}

function renderExperience(d) {
  const entries = d.experience.map(e => `
    <div class="entry">
      <span class="entry-org">${e.org}</span>
      <span class="entry-date">${e.date}</span>
      <span class="entry-role">${e.role}</span>
      <p class="entry-desc">${markup(e.desc)}</p>
    </div>`).join('');
  return sectionWrap('experience', 'Experience', "Where I've worked", `
    <div class="stagger">${entries}</div>
  `);
}

function renderSkills(d) {
  const cards = d.skills.map(s => `
    <div class="skill-card">
      <p class="skill-name">${s.name}</p>
      <p class="skill-level">${s.level}</p>
    </div>`).join('');
  return sectionWrap('skills', 'Skills', 'What I work with', `
    <div class="skill-grid stagger">${cards}</div>
  `);
}

function renderEducation(d) {
  const entries = d.education.map(e => `
    <div class="edu-entry">
      <p class="edu-degree">${e.degree}</p>
      <p class="edu-school">${e.school}</p>
      <p class="edu-date">${e.date}</p>
    </div>`).join('');
  return sectionWrap('education', 'Education', 'Background', `
    <div class="stagger">${entries}</div>
  `);
}

function renderContact(d) {
  const icons = {
    email: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  };
  const links = [
    { href: `mailto:${d.contact.email}`, icon: icons.email, label: d.contact.email },
    { href: d.contact.github,   icon: icons.github,   label: 'GitHub' },
    { href: d.contact.linkedin, icon: icons.linkedin, label: 'LinkedIn' },
  ].map(l => `
    <a href="${l.href}" class="contact-link" target="_blank" rel="noopener">
      ${l.icon} ${l.label}
    </a>`).join('');
  return sectionWrap('contact', 'Contact', 'Get in touch', `
    <div class="reveal contact-grid">${links}</div>
  `);
}

function sectionWrap(id, label, title, bodyHTML) {
  return `
    <section id="${id}">
      <div class="section-inner">
        <div class="section-header reveal">
          <span class="section-label">${label}</span>
          <h2>${title}</h2>
          <div class="divider"></div>
        </div>
        ${bodyHTML}
      </div>
    </section>`;
}
