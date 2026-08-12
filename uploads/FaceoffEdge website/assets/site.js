// FaceoffEdge marketing site — shared JS

// Reveal-on-scroll
(function () {
  if (typeof IntersectionObserver === 'undefined') return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  const observe = () => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }
})();

// FAQ accordion
document.addEventListener('click', (e) => {
  const summary = e.target.closest('.faq-q');
  if (!summary) return;
  const item = summary.closest('.faq-item');
  if (!item) return;
  item.classList.toggle('open');
});

// Mobile drawer nav
(function () {
  const burger = document.querySelector('.nav-burger');
  const drawer = document.querySelector('.nav-drawer');
  const backdrop = document.querySelector('.nav-backdrop');
  if (!burger || !drawer || !backdrop) return;

  function openMenu() {
    drawer.classList.add('open');
    backdrop.classList.add('show');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    drawer.classList.remove('open');
    backdrop.classList.remove('show');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeMenu() : openMenu();
  });
  backdrop.addEventListener('click', closeMenu);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

// Animate hero timing readout (counts up to a target)
(function () {
  function animate(el) {
    const target = parseFloat(el.dataset.target || '412');
    const duration = parseInt(el.dataset.duration || '1400');
    const start = performance.now();
    const startVal = 980;
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const v = startVal + (target - startVal) * eased;
      el.textContent = Math.round(v);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function init() {
    document.querySelectorAll('[data-count-to]').forEach(el => {
      el.dataset.target = el.dataset.countTo;
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(e => {
          if (e.isIntersecting) { animate(el); obs.disconnect(); }
        });
      }, { threshold: 0.5 });
      io.observe(el);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
