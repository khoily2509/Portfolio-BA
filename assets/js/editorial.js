// Swiss Editorial & High-End Motion Controller
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Smooth Animated Number Counters
  const counterElements = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = el.getAttribute('data-decimal') === 'true';
        const duration = 1200; // ms
        
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          // Ease-out cubic curve
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          
          if (isDecimal) {
            const currentVal = (easeProgress * target).toFixed(2);
            el.textContent = prefix + currentVal + suffix;
          } else {
            const currentVal = Math.floor(easeProgress * target);
            el.textContent = prefix + currentVal.toLocaleString() + suffix;
          }

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            if (isDecimal) {
              el.textContent = prefix + target.toFixed(2) + suffix;
            } else {
              el.textContent = prefix + target.toLocaleString() + suffix;
            }
          }
        };
        window.requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counterElements.forEach(el => counterObserver.observe(el));

  // 2. Scroll Reveal Observer
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

  // 3. Toggle Project Expand/Collapse
  window.toggleProject = function(id) {
    const detailEl = document.getElementById(id + '-detail');
    const iconEl = document.getElementById(id + '-icon');
    
    if (detailEl) {
      const isExpanded = detailEl.classList.contains('expanded');
      
      // Close all others for clean accordion feel
      document.querySelectorAll('.project-detail').forEach(el => {
        el.classList.remove('expanded');
      });
      document.querySelectorAll('.project-toggle-icon').forEach(el => {
        el.style.transform = 'rotate(0deg)';
      });

      if (!isExpanded) {
        detailEl.classList.add('expanded');
        if (iconEl) iconEl.style.transform = 'rotate(180deg)';
      }
    }
  };

  // 4. Theme Toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      if (window.lucide) window.lucide.createIcons();
    });
  }
});
