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

  name:         'Cathal Harte',
  initials:     'CH',
  title:        'Medical Device Engineer',
  availability: 'Open to new opportunities',

  about: [
    'I build {s:clinical software for medical devices} at the frontier of neurotechnology and nuclear medicine — from {y:laboratory prototypes} to systems deployed in patients\' homes.',
    'At {b:NeuroRestore} and {o:Onward Medical}, I led the software that powered the {y:Brain-Spine Interface}: a digital bridge that restored {s:natural walking to patients with chronic paralysis}. The work was published in {b:Nature} in 2023 and named {y:Physics World Breakthrough of the Year}. I now work at {b:Terapet}, a {s:CERN spin-off}, developing software for {y:Nuclγscan} — a next-generation total-body PET scanner for precision medicine.',
  ],

  experience: [
    {
      org:  'Terapet SA',
      role: 'Software Lead',
      date: '2023 – Present',
      desc: 'Building the software backbone for {y:Nuclγscan}, a full-body PET scanner founded on {b:CERN detector technology}. Spanning acquisition pipelines, clinical integration, and the path toward regulatory clearance.',
    },
    {
      org:  'NeuroRestore · Onward Medical',
      role: 'Lead Clinical Software Engineer',
      date: '2020 – 2023',
      desc: 'Led development of the clinical software stack for the {y:Brain-Spine Interface} — a wireless digital bridge connecting cortical implants to epidural spinal stimulators. Approved for use in {o:five clinical trials}. Enabled {s:home deployment} of the system for the first time. Published in {b:Nature}, May 2023.',
    },
    {
      org:  'Earlier experience',
      role: 'Biomedical / Software Engineering',
      date: '–',
      desc: 'Prior roles in biomedical engineering and software development. Details to follow.',
    },
  ],

  skills: [
    { name: 'Clinical Software Dev.',   level: 'Expert' },
    { name: 'Medical Device Systems',   level: 'Expert' },
    { name: 'Python / C++',             level: 'Proficient' },
    { name: 'Signal Processing',        level: 'Proficient' },
    { name: 'Embedded / Real-time',     level: 'Proficient' },
    { name: 'IEC 62304 / Regulatory',   level: 'Proficient' },
  ],

  press: [
    {
      outlet: 'Silicon Republic',
      title:  'Meet the Irish software engineer helping people with paralysis to walk again',
      url:    'https://www.siliconrepublic.com/machines/spinal-cord-stimulation-neurorestore-cathal-harte',
      type:   'Profile',
    },
    {
      outlet: 'CNN',
      title:  "AI and implants form a 'digital bridge' to help a paralysed man move",
      url:    'https://www.cnn.com/2023/09/27/health/digital-bridge-implants-paralysis/index.html',
      type:   'News',
    },
    {
      outlet: 'YouTube · AFP',
      title:  'Paralysed man able to walk again with brain and spine implants',
      url:    'https://www.youtube.com/watch?v=AARVY-3oDRQ',
      type:   'Video',
    },
    {
      outlet: 'Nature',
      title:  'Walking naturally after spinal cord injury using a brain–spine interface',
      url:    'https://www.nature.com/articles/s41586-023-06094-5',
      type:   'Paper',
    },
  ],

  awards: [
    {
      name: 'Lopez-Loreta Prize',
      year: '2025',
      desc: '€1,000,000 award over five years, recognising exceptional academic and professional achievement.',
    },
  ],

  education: [
    {
      degree: 'Degree — to be filled in',
      school: 'University — to be filled in',
      date:   '–',
    },
  ],

  contact: {
    email:    'cathal@placeholder.com',
    github:   'https://github.com/cathalharte',
    linkedin: 'https://www.linkedin.com/in/cathal-harte/',
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

  document.title = 'CV — ' + data.name;

  document.getElementById('nav-logo').textContent = data.initials;
  const navSections = ['about', 'experience', 'press', 'skills', 'education', 'contact'];
  document.getElementById('nav-links').innerHTML = navSections
    .map(s => `<li><a href="#${s}">${s.charAt(0).toUpperCase() + s.slice(1)}</a></li>`)
    .join('');

  const root = document.getElementById('cv-root');
  root.innerHTML = [
    renderHero(data),
    renderAbout(data),
    renderExperience(data),
    renderPress(data),
    renderSkills(data),
    renderEducation(data),
    renderContact(data),
  ].join('');

  document.getElementById('cv-footer').innerHTML =
    `Built with plain HTML &amp; CSS &middot; ${new Date().getFullYear()}`;

})(CV);

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

function renderPress(d) {
  const cards = d.press.map(p => `
    <a href="${p.url}" class="press-card" target="_blank" rel="noopener">
      <span class="press-type">${p.type}</span>
      <span class="press-outlet">${p.outlet}</span>
      <p class="press-title">${p.title}</p>
    </a>`).join('');
  return sectionWrap('press', 'Press', 'In the news', `
    <div class="press-grid stagger">${cards}</div>
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
  const eduEntries = d.education.map(e => `
    <div class="edu-entry">
      <p class="edu-degree">${e.degree}</p>
      <p class="edu-school">${e.school}</p>
      <p class="edu-date">${e.date}</p>
    </div>`).join('');

  const awardsBlock = d.awards && d.awards.length ? `
    <p class="section-sublabel reveal">Recognition</p>
    <div class="stagger awards-list">
      ${d.awards.map(a => `
        <div class="award-entry">
          <span class="award-name">${a.name}</span>
          <span class="award-year">${a.year}</span>
          <p class="award-desc">${a.desc}</p>
        </div>`).join('')}
    </div>` : '';

  return sectionWrap('education', 'Education', 'Background', `
    <div class="stagger">${eduEntries}</div>
    ${awardsBlock}
  `);
}

function renderContact(d) {
  const icons = {
    email:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    github:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  };
  const links = [
    { href: `mailto:${d.contact.email}`, icon: icons.email,    label: d.contact.email },
    { href: d.contact.github,            icon: icons.github,   label: 'GitHub' },
    { href: d.contact.linkedin,          icon: icons.linkedin, label: 'LinkedIn' },
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
