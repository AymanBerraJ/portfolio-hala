// ─── Splash → Main Site Transition ───
const splash = document.getElementById('splash');
const mainSite = document.getElementById('main-site');
const enterBtn = document.getElementById('enter-btn');

enterBtn.addEventListener('click', () => {
  splash.classList.add('hidden');
  mainSite.classList.add('visible');
  document.body.style.overflow = '';
});

document.body.style.overflow = 'hidden';

// ─── Navbar Scroll Effect ───
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');
const menuToggle = document.getElementById('menu-toggle');

function updateNavbar() {
  const heroBottom = hero.offsetTop + hero.offsetHeight;
  const onHero = window.scrollY < heroBottom - 100;

  navbar.classList.toggle('scrolled', window.scrollY > 60);
  navbar.classList.toggle('on-hero', onHero);

  const menuBars = menuToggle.querySelectorAll('span');
  menuBars.forEach(bar => {
    bar.classList.toggle('bg-cream', onHero);
    bar.classList.toggle('bg-charcoal', !onHero);
  });
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// ─── Mobile Menu ───
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── Scroll Reveal (Intersection Observer) ───
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ─── Smooth Scroll for Anchor Links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Contact Form ───
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.classList.remove('hidden');
  contactForm.reset();
  setTimeout(() => formSuccess.classList.add('hidden'), 5000);
});

// ─── Parallax subtle on hero ───
const heroImg = document.querySelector('.hero-media__img');
const HERO_ZOOM = 0.84;

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (!heroImg || scrolled >= window.innerHeight) return;
  heroImg.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.2}px)) scale(${HERO_ZOOM})`;
});
