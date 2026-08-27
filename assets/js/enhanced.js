// Enhanced Motion & Interaction System for Ly Minh Khoi BA Portfolio
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Animated Number Counters on Scroll
  const counterElements = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1400; // ms
        
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          // Ease-out cubic curve
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easeProgress * target);
          el.textContent = prefix + currentVal.toLocaleString() + suffix;
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            el.textContent = prefix + target.toLocaleString() + suffix;
          }
        };
        window.requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => counterObserver.observe(el));

  // 3. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Tab Switchers for Case Studies
  window.switchProjectTab = function(projectId, tabName) {
    const container = document.getElementById(projectId + '-content-container');
    if (!container) return;

    // Toggle tab panes
    const panes = container.querySelectorAll('.tab-pane');
    panes.forEach(pane => {
      if (pane.getAttribute('data-tab') === tabName) {
        pane.classList.remove('hidden');
        pane.classList.add('block');
      } else {
        pane.classList.add('hidden');
        pane.classList.remove('block');
      }
    });

    // Toggle tab buttons
    const btnContainer = document.getElementById(projectId + '-tabs');
    if (btnContainer) {
      const btns = btnContainer.querySelectorAll('.tab-btn');
      btns.forEach(btn => {
        if (btn.getAttribute('data-tab-target') === tabName) {
          btn.classList.add('active', 'bg-sky-600', 'text-white');
          btn.classList.remove('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        } else {
          btn.classList.remove('active', 'bg-sky-600', 'text-white');
          btn.classList.add('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
        }
      });
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };
});