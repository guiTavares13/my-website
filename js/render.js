/* ============================================================
   render.js — Reads data/links.json and renders the page
   ============================================================ */

// SVG icons reutilizáveis
const ICONS = {
  github: `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  linkedin: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  email: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>`,
  arrow: `<svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17L17 7M7 7h10v10"/></svg>`,
  user: `<svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
};

// ----------------------------------------------------------------
// HERO
// ----------------------------------------------------------------
function renderHero(data) {
  const { profile, social } = data;

  document.title = `${profile.name} — Software Engineer`;
  document.querySelector('meta[name="description"]')
    ?.setAttribute('content', profile.bio);

  // Tag + heading
  document.getElementById('hero-tag').textContent  = `// ${profile.tagline}`;
  document.getElementById('hero-name').innerHTML   =
    profile.name.split(' ').map((w, i) =>
      i === 1 ? `<span class="accent">${w}</span>` : w
    ).join('<br>');
  document.getElementById('hero-sub').textContent  = profile.title;
  document.getElementById('hero-desc').textContent = profile.bio;

  // Buttons
  document.getElementById('btn-linkedin').href = social.linkedin;
  document.getElementById('btn-github').href   = social.github;

  // Avatar
  const frame = document.getElementById('avatar-frame');
  if (profile.photo) {
    const img = document.createElement('img');
    img.src = profile.photo;
    img.alt = profile.name;
    img.onerror = () => renderAvatarPlaceholder(frame);
    frame.appendChild(img);
  } else {
    renderAvatarPlaceholder(frame);
  }
}

function renderAvatarPlaceholder(frame) {
  frame.innerHTML = `
    <div class="avatar-placeholder">
      ${ICONS.user}
      <span>foto em breve</span>
    </div>`;
}

// ----------------------------------------------------------------
// STATS
// ----------------------------------------------------------------
function renderStats(stats) {
  const bar = document.getElementById('stats-bar');
  bar.innerHTML = stats.map(s => `
    <div class="stat">
      <div class="stat-num">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

// ----------------------------------------------------------------
// EDUCATION
// ----------------------------------------------------------------
function renderEducation(education) {
  const container = document.getElementById('edu-list');
  container.innerHTML = education.map(e => `
    <div class="edu-card">
      <div class="edu-degree">${e.degree}</div>
      <div class="edu-school">// ${e.status}</div>
    </div>
  `).join('');
}

// ----------------------------------------------------------------
// EXPERIENCE
// ----------------------------------------------------------------
function renderExperience(experience) {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = experience.map(exp => `
    <div class="tl-item">
      <div class="tl-dot"></div>
      <div class="tl-period">${exp.period}</div>
      <div class="tl-company">${exp.company}</div>
      <div class="tl-role">${exp.role}</div>
      <div class="tl-desc">${exp.description}</div>
      <div class="tl-tags">
        ${exp.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ----------------------------------------------------------------
// PROJECTS
// ----------------------------------------------------------------
function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map(p => `
    <div class="project-card">
      <div class="project-thumb">
        ${p.thumbnail
          ? `<img src="${p.thumbnail}" alt="${p.name}" onerror="this.parentElement.innerHTML='<span class=\\'project-thumb-label\\'>// adicionar screenshot</span>'">`
          : `<span class="project-thumb-label">// adicionar screenshot</span>`
        }
      </div>
      <div class="project-body">
        <div class="tl-tags" style="margin-bottom:0.7rem;">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="project-name">${p.name}</div>
        <div class="project-desc">${p.description}</div>
        <div class="project-footer">
          <a href="${p.github}" target="_blank" class="project-link">
            ${ICONS.github}
            Ver no GitHub
            ${ICONS.arrow}
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// ----------------------------------------------------------------
// SKILLS
// ----------------------------------------------------------------
function renderSkills(skills) {
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = skills.map(group => `
    <div class="skill-group">
      <div class="skill-group-title">// ${group.group}</div>
      ${group.items.map(item => `<div class="skill-item">${item}</div>`).join('')}
    </div>
  `).join('');
}

// ----------------------------------------------------------------
// CONTACT
// ----------------------------------------------------------------
function renderContact(data) {
  const { profile, social } = data;
  const links = document.getElementById('contact-links');
  links.innerHTML = `
    <a href="${social.linkedin}" target="_blank" class="contact-link">
      ${ICONS.linkedin} LinkedIn
    </a>
    <a href="${social.github}" target="_blank" class="contact-link">
      ${ICONS.github} GitHub
    </a>
    <a href="mailto:${profile.email}" class="contact-link">
      ${ICONS.email} ${profile.email}
    </a>
  `;
}

// ----------------------------------------------------------------
// MAIN — fetch JSON and render everything
// ----------------------------------------------------------------
export async function renderPage() {
  try {
    const res  = await fetch('data/links.json');
    const data = await res.json();

    renderHero(data);
    renderStats(data.stats);
    renderEducation(data.education);
    renderExperience(data.experience);
    renderProjects(data.projects);
    renderSkills(data.skills);
    renderContact(data);
  } catch (err) {
    console.error('[tavareslab] Erro ao carregar data/links.json:', err);
  }
}
