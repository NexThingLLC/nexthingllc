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

// --- Contact form: Web3Forms submission ---
const form = document.getElementById('contact-form');
if (form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const formMessage = document.getElementById('form-message');
  const originalBtnText = submitBtn.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = 'Please fill in all fields before sending.';
      formMessage.className = 'form-message error';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formMessage.className = 'form-message';

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '78c4f69f-a6e7-4c44-8207-eb45af87ecdc',
          name,
          email,
          message
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);
      const result = await response.json();

      if (response.ok && result.success) {
        formMessage.textContent = 'Message sent. We will be in touch soon.';
        formMessage.className = 'form-message success';
        form.reset();
      } else {
        formMessage.textContent = 'Something went wrong. Please try again.';
        formMessage.className = 'form-message error';
      }
    } catch (err) {
      clearTimeout(timeout);
      formMessage.textContent = err.name === 'AbortError'
        ? 'Request timed out. Please check your connection and try again.'
        : 'Unable to send. Please try again or email us directly.';
      formMessage.className = 'form-message error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}
