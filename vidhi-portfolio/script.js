// Smooth scroll for nav links
document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Reveal on scroll using IntersectionObserver
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Active nav state on scroll
const navLinks = document.querySelectorAll('[data-nav]');
const sections = ['hero', 'about', 'experience', 'work', 'skills', 'contact']
  .map(id => document.getElementById(id));

function updateActiveNav() {
  const scrollPos = window.scrollY + 140;
  sections.forEach((section, index) => {
    if (!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      navLinks[index]?.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Case study modal
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');
const modalClose = document.querySelector('.modal-close');

const modalMap = {
  cs1: `
    <h3>Faster Hosting Plan Launch</h3>
    <p class="muted">Technical Manager — Newfold Digital</p>
    <p>
      Designed modular onboarding services and integrations to cut hosting plan integration time from ~6 weeks to 3 weeks,
      enabling 2× faster GTM and a 35% uplift in new-user conversion.
    </p>
    <ul class="bullets">
      <li>Defined modular service boundaries for hosting plans.</li>
      <li>Improved onboarding funnel using telemetry and user journey insights.</li>
      <li>Collaborated with Product, Compliance, and CRO to align conversion goals.</li>
    </ul>
  `,
  cs2: `
    <h3>Deployment Throughput +3×</h3>
    <p class="muted">Platform Engineering — Newfold Digital</p>
    <p>
      Re-architected CI/CD pipelines and rollout strategy to shorten release cycles and unlock safer, more frequent deployments.
    </p>
    <ul class="bullets">
      <li>Reduced release windows from hours to under 30 minutes.</li>
      <li>3× increase in deployment throughput across core services.</li>
      <li>Introduced canary deployment and rollback mechanisms.</li>
    </ul>
  `,
  cs3: `
    <h3>Microservices & Reliability Upgrade</h3>
    <p class="muted">Platform Migration — Newfold Digital</p>
    <p>
      Led migration of legacy Spring services to microservices, focusing on observability, reliability, and cost efficiency.
    </p>
    <ul class="bullets">
      <li>Improved compute efficiency by ~20% via consolidation and tuning.</li>
      <li>Achieved &gt;99.9% uptime on core user-facing components.</li>
      <li>Introduced tracing, SLIs, and runbooks for incident management.</li>
    </ul>
  `,
  cs4: `
    <h3>Automation @ 100K+ Jobs/Day</h3>
    <p class="muted">Automation Platform — Newfold Digital</p>
    <p>
      Built scalable cron and integration systems that automated routine hosting operations for multiple product lines.
    </p>
    <ul class="bullets">
      <li>100K+ automation jobs/day across 50+ product integrations.</li>
      <li>Significant reduction in manual operational work for multiple teams.</li>
      <li>Improved visibility via dashboards and alerting.</li>
    </ul>
  `
};

const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const trigger = window.innerHeight * 0.86;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add('visible');
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.modal;
    modalContent.innerHTML = modalMap[id] || '<p>Details coming soon.</p>';
    modalBackdrop.classList.add('open');
  });
});

function closeModal() {
  modalBackdrop.classList.remove('open');
  modalContent.innerHTML = '';
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', e => {
    if (e.target === modalBackdrop) closeModal();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
