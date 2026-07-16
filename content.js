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
  taglines: [
    'Building implausible technology routinely',
    'Stubbornly building technology for the greater good',
    'Don\'t let your yearning for complexity lead you to complicating things',
  ],
  about: [
    'I build medical devices at the frontier of neurotechnology and nuclear medicine — from laboratory prototypes to systems deployed in patients\' homes.',
    'At NeuroRestore, I led the software and system development that powered the Brain-Spine Interface: a digital bridge that restores natural walking to patients with chronic paralysis. The work was published in Nature in 2023 and named Physics World Breakthrough of the Year. I now work at Terapet, a CERN spin-off, developing software for Nuclγscan — a next-generation total-body PET scanner for precision medicine.',
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
      title:  'Man with paralysis walks naturally after brain and spine implants',
      url:    'https://www.cnn.com/2023/05/24/health/walk-after-paralysis-with-implant-scn/index.html',
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

  projects: [
    {
      badge:    'Physics World Breakthrough of the Year 2023',
      name:     'Brain-Spine Interface',
      subtitle: 'Restoring natural walking after chronic spinal cord injury',
      desc:     'A cortical implant decodes movement intent wirelessly, in real time, driving a spinal stimulator that reawakens circuits below the injury. I built the clinical system that made it work — and brought it home.',
      watchUrl: 'https://www.youtube.com/watch?v=AARVY-3oDRQ',
      thumbUrl: 'https://img.youtube.com/vi/AARVY-3oDRQ/maxresdefault.jpg',
      more:     { label: 'More neurotech →', url: 'neurotech.html' },
    },
  ],

  terapet: {
    badge:    'ISO 13485:2016 Certified',
    name:     'Nuclγscan',
    subtitle: 'Total-body PET imaging · CERN spin-off technology',
    desc:     'A next-generation total-body PET scanner designed for precision medicine and whole-body imaging at a level not previously possible. I build the software across the full stack: acquisition, reconstruction, and clinical integration, in addition to leading the risk management activities across the whole design. The same underlying technology is also being applied for real-time proton therapy QA.',
    links: [],
    more: { label: 'More nuclear medicine →', url: 'nuclear.html' },
  },

  interests: {
    body: 'Deliberately staying away from the mainstream — no algorithmic feeds, no social media recommendations. I read Noema, Aeon, and Nature via newsletters.',
    cta:  'Drop me an email to talk about the revolution.',
    more: { label: 'More thoughts →', url: 'essay-raised-by-wolves.html' },
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

  document.title = data.name + ' — ' + data.title;

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
        <p class="hero-title">
          <span class="hero-rotate">
            ${(d.taglines || [d.title]).map(t => `<span>${t}</span>`).join('')}
          </span>
        </p>
        <div class="hero-links">
          <a href="#contact" class="btn btn-primary">Get in touch</a>
          <a href="#project" class="btn btn-ghost">View my work</a>
        </div>
      </div>
    </section>`;
}

function renderAbout(d) {
  const paras = d.about.map(p => `<p>${markup(p)}</p>`).join('');
  return sectionWrap('about', 'Bio', 'About me', `
    <div class="reveal about-body">${paras}</div>
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
          <a href="${p.watchUrl}" class="project-video" target="_blank" rel="noopener" aria-label="Watch ${p.name} on YouTube">
            <img src="${p.thumbUrl}" alt="${p.name}" class="project-video-thumb">
            <span class="project-video-play"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Watch on YouTube</span>
          </a>
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
      <p class="interests-cta"><a href="mailto:${d.contact.email}">${i.cta}</a></p>
      <a href="${i.more.url}" class="card-more">${i.more.label}</a>
    </div>
  `);
}
