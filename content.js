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
  about: [
    'I build clinical software for medical devices at the frontier of neurotechnology and nuclear medicine — from laboratory prototypes to systems deployed in patients\' homes.',
    'At NeuroRestore and Onward Medical, I led the software that powered the Brain-Spine Interface: a digital bridge that restored natural walking to patients with chronic paralysis. The work was published in Nature in 2023 and named Physics World Breakthrough of the Year. I now work at Terapet, a CERN spin-off, developing software for Nuclγscan — a next-generation total-body PET scanner for precision medicine.',
  ],

  experience: [
    {
      org:  'Terapet SA',
      role: 'Software Lead',
      date: '2023 – Present',
      desc: 'Building the software backbone for Nuclγscan, a full-body PET scanner founded on CERN detector technology. Spanning acquisition pipelines, clinical integration, and the path toward regulatory clearance.',
    },
    {
      org:  'NeuroRestore · Onward Medical',
      role: 'Lead Clinical Software Engineer',
      date: '2020 – 2023',
      desc: 'Led development of the clinical software stack for the Brain-Spine Interface — a wireless digital bridge connecting cortical implants to epidural spinal stimulators. Approved for use in five clinical trials. Enabled home deployment of the system for the first time. Published in Nature, May 2023.',
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

  awards: [],

  education: [
    {
      degree: 'Degree — to be filled in',
      school: 'University — to be filled in',
      date:   '–',
    },
  ],

  projects: [
    {
      badge:    'Physics World Breakthrough of the Year 2023',
      name:     'Brain-Spine Interface',
      subtitle: 'Restoring natural walking after chronic spinal cord injury',
      desc:     'A cortical implant decodes movement intent wirelessly, in real time, driving a spinal stimulator that reawakens circuits below the injury. I built the clinical software that made it work — and made it work in patients\' homes.',
      embedUrl: 'https://www.youtube.com/embed/AARVY-3oDRQ?rel=0',
      more:     { label: 'In the news →', url: 'neurotech.html' },
    },
  ],

  terapet: {
    badge:    'ISO 13485:2016 Certified',
    name:     'Qualyscan',
    subtitle: 'Real-time QA for proton and particle therapy',
    desc:     'Qualyscan monitors the beam in real time during particle therapy treatment — catching deviations before they reach the patient. I build the software side, from acquisition pipelines to the path toward regulatory clearance. Terapet also makes Nuclγscan, a CERN-founded total-body PET scanner.',
    links: [
      { label: 'Webinars I host', url: 'https://terapet.ch/webinars/',      note: 'Qualyscan' },
      { label: 'PTCOG 2026',      url: 'https://terapet.ch/ptcog-2026/',    note: 'Qualyscan', upcoming: true },
    ],
    more: { label: 'More on nuclear medicine →', url: 'nuclear.html' },
  },

  interests: {
    body: 'Deliberately staying away from the mainstream — no algorithmic feeds, no social media recommendations. I read {s:Noema}, {b:Aeon}, and {y:Equator} via newsletters.',
    cta:  'Essays coming.',
  },

  pullquote: {
    text:   'I\'d like to stress the substantial development effort we made to enable the system to be used at home. That\'s what makes the achievement all the more real for me.',
    source: 'Silicon Republic',
  },

  contact: {
    email:    'cathal.harte@proton.me',
    terapet:  'https://terapet.ch/',
    linkedin: 'https://www.linkedin.com/in/cathal-harte',
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
  const navSections = ['about', 'project', 'terapet', 'interests', 'contact'];
  document.getElementById('nav-links').innerHTML = navSections
    .map(s => `<li><a href="#${s}">${s.charAt(0).toUpperCase() + s.slice(1)}</a></li>`)
    .join('');

  const root = document.getElementById('cv-root');
  root.innerHTML = [
    renderHero(data),
    renderAbout(data),
    renderProject(data),
    renderTerapet(data),
    renderInterests(data),
    renderContact(data),
  ].join('');

  document.getElementById('cv-footer').innerHTML = '';

})(CV);

function renderHero(d) {
  return `
    <section id="hero" data-initials="${d.initials}">
      <div class="hero-inner">
        <h1 class="hero-name">${d.name}</h1>
        <p class="hero-title">${d.title}</p>
        <div class="hero-links">
          <a href="#contact" class="btn btn-primary">Get in touch</a>
          <a href="#project" class="btn btn-ghost">View my work</a>
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
    terapet:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  };
  const links = [
    { href: `mailto:${d.contact.email}`, icon: icons.email,    label: d.contact.email },
    { href: d.contact.terapet,           icon: icons.terapet,  label: 'Terapet' },
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


function renderProject(d) {
  const p = d.projects[0];
  return `
    <section id="project">
      <div class="section-inner">
        <div class="project-card reveal">
          <div class="project-card-body">
            <span class="project-badge">${p.badge}</span>
            <h3 class="project-name">${p.name}</h3>
            <p class="project-subtitle">${p.subtitle}</p>
            <p class="project-desc">${p.desc}</p>
            <a href="${p.more.url}" class="card-more">${p.more.label}</a>
          </div>
          <div class="project-video">
            <iframe src="${p.embedUrl}" title="${p.name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </section>`;
}

function renderTerapet(d) {
  const t = d.terapet;
  const links = t.links.map(l => `
    <a href="${l.url}" class="tlink" target="_blank" rel="noopener">
      ${l.upcoming ? '<span class="tlink-chip">Upcoming</span>' : ''}
      <span class="tlink-label">${l.label}</span>
      <span class="tlink-note">${l.note}</span>
    </a>`).join('');
  return `
    <section id="terapet">
      <div class="section-inner">
        <div class="project-card project-card--blue reveal">
          <div class="project-card-body">
            <span class="project-badge">${t.badge}</span>
            <h3 class="project-name">${t.name}</h3>
            <p class="project-subtitle">${t.subtitle}</p>
            <p class="project-desc">${t.desc}</p>
            <div class="tlinks">${links}</div>
            <a href="${t.more.url}" class="card-more">${t.more.label}</a>
          </div>
        </div>
      </div>
    </section>`;
}

function renderInterests(d) {
  const i = d.interests;
  return sectionWrap('interests', 'Writing', 'Outside the feed', `
    <div class="reveal interests-body">
      <p>${markup(i.body)}</p>
      <p class="interests-cta">${i.cta}</p>
    </div>
  `);
}

function renderPullquote(d) {
  const q = d.pullquote;
  return `
    <section id="pullquote">
      <div class="section-inner">
        <blockquote class="reveal">
          <p>${q.text}</p>
          <cite>${q.source}</cite>
        </blockquote>
      </div>
    </section>`;
}
