// Scroll-based reveal animations
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  const animatedElements = document.querySelectorAll(
    '.boundary-card, .convergence-card, .reference-card, .stat, ' +
    '.sse-banner, .definition-block, .where-diagram, ' +
    '.category-comparison, .litmus-test'
  );

  animatedElements.forEach((el) => observer.observe(el));

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
