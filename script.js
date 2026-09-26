const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) {
      target.classList.add('visible');
      observer.unobserve(target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.section-top, .service-row, .service-photo, .manifesto-image, .manifesto-copy, .barber-card, .review-card, .location-copy, .map-placeholder').forEach((element, index) => {
  element.classList.add('reveal');
  if (element.classList.contains('service-row') || element.classList.contains('barber-card')) {
    element.style.transitionDelay = `${(index % 3) * 75}ms`;
  }
  revealObserver.observe(element);
});
