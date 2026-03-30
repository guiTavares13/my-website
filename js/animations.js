/* ============================================================
   animations.js — Scroll-triggered animations
   ============================================================ */

export function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.tl-item').forEach(el => observer.observe(el));
}
