// NexThing - main.js

// --- Nav: scroll opacity + active link ---
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateNav() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// --- Mobile nav toggle ---
const toggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// --- Scroll-triggered fade-in ---
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// --- Hero pipeline animation ---
// A packet enters, gets routed to the AI agent or to plain rules
// (rules more often - most work does not need AI), then is acted on.
const pipe = document.getElementById('pipe-packets');

if (pipe && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const edge = id => document.getElementById(id);
  const node = id => document.getElementById(id);
  const countEl = document.getElementById('pipe-count');
  const logEl = document.getElementById('pipe-log');

  const jobs = {
    agent: ['ticket.triaged', 'contract.summarized', 'email.classified', 'alert.diagnosed', 'request.answered'],
    rules: ['invoice.received', 'node.disk_full', 'deploy.promoted', 'user.provisioned', 'backup.verified', 'cert.renewed']
  };
  const SPEED = 0.12;      // svg units per ms
  const SPAWN_EVERY = 1100; // ms
  let packets = [];
  let runs = 0;
  let lastSpawn = 0;
  let lastFrame = 0;

  function flash(id) {
    const n = node(id);
    n.classList.add('hit');
    setTimeout(() => n.classList.remove('hit'), 350);
  }

  function spawn() {
    const route = Math.random() < 0.35 ? 'agent' : 'rules';
    const a = route === 'agent';
    const el = document.createElementNS(SVG_NS, 'rect');
    el.setAttribute('width', 6);
    el.setAttribute('height', 6);
    el.style.fill = a ? 'var(--violet)' : 'var(--blue)';
    pipe.appendChild(el);
    packets.push({
      el, route, dist: 0, leg: 0,
      legs: [
        { path: edge('e-in'), at: 'n-route' },
        { path: edge(a ? 'e-a1' : 'e-b1'), at: a ? 'n-agent' : 'n-rules', pause: a ? 500 : 120 },
        { path: edge(a ? 'e-a2' : 'e-b2'), at: 'n-ship' }
      ],
      wait: 0
    });
    flash('n-in');
  }

  function log(route) {
    const name = jobs[route][Math.floor(Math.random() * jobs[route].length)];
    const time = route === 'agent'
      ? (0.8 + Math.random() * 1.6).toFixed(1) + 's'
      : Math.round(20 + Math.random() * 70) + 'ms';
    const li = document.createElement('li');
    li.innerHTML = '<span class="log-ok">ok</span>';
    li.append(name + ' -> ' + route + ' ' + time);
    logEl.appendChild(li);
    while (logEl.children.length > 3) logEl.firstElementChild.remove();
    countEl.textContent = (++runs).toLocaleString();
  }

  function frame(now) {
    // Clamp the step so a backgrounded tab does not jump packets on return
    const dt = Math.min(now - (lastFrame || now), 50);
    lastFrame = now;

    if (now - lastSpawn > SPAWN_EVERY) {
      lastSpawn = now;
      spawn();
    }

    packets = packets.filter(p => {
      if (p.wait > 0) { p.wait -= dt; return true; }
      const leg = p.legs[p.leg];
      const len = leg.path.getTotalLength();
      p.dist += SPEED * dt;
      if (p.dist >= len) {
        flash(leg.at);
        p.wait = leg.pause || 0;
        p.dist = 0;
        p.leg++;
        if (p.leg === p.legs.length) {
          log(p.route);
          p.el.remove();
          return false;
        }
        p.el.setAttribute('opacity', 0); // hidden while "processing" in a node
        return true;
      }
      const pt = leg.path.getPointAtLength(p.dist);
      p.el.setAttribute('opacity', 1);
      p.el.setAttribute('x', pt.x - 3);
      p.el.setAttribute('y', pt.y - 3);
      return true;
    });

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
