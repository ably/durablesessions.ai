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
    { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
  );

  const animatedElements = document.querySelectorAll(
    '.boundary-card, .convergence-card, .reference-card, .stat, ' +
    '.sse-banner, .definition-block, .where-diagram, ' +
    '.category-comparison, .vendor-list, .section__header'
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

  // Scroll progress indicator
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  // Active nav link tracking
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Count-up animation for stats
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const countEl = el.querySelector('.count-value');
          if (countEl && !countEl.dataset.counted) {
            countEl.dataset.counted = 'true';
            const target = parseInt(countEl.dataset.target, 10);
            animateCount(countEl, 0, target, 1200);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat').forEach((stat) => statObserver.observe(stat));

  // Mobile hamburger menu
  const navToggle = document.getElementById('nav-toggle');
  const navLinksEl = document.getElementById('nav-links');
  if (navToggle && navLinksEl) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksEl.classList.toggle('open');
      document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinksEl.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksEl.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
});

function animateCount(el, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (end - start) * eased);
    el.textContent = value;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}
