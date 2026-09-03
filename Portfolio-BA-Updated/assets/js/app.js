/**
 * Ly Minh Khoi - Junior Business Analyst Portfolio
 * Application Logic & Theme Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher (Light / Dark Mode)
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlEl = document.documentElement;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
    htmlEl.classList.remove('dark');
    htmlEl.classList.add('light');
    updateThemeIcons(false);
  } else {
    htmlEl.classList.remove('light');
    htmlEl.classList.add('dark');
    updateThemeIcons(true);
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = htmlEl.classList.contains('dark');
      if (isDark) {
        htmlEl.classList.remove('dark');
        htmlEl.classList.add('light');
        localStorage.setItem('theme', 'light');
        updateThemeIcons(false);
        showToast('Đã chuyển sang giao diện Sáng (Clean Light Mode)');
      } else {
        htmlEl.classList.remove('light');
        htmlEl.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcons(true);
        showToast('Đã chuyển sang giao diện Tối (Deep Slate Mode)');
      }
    });
  });

  function updateThemeIcons(isDark) {
    document.querySelectorAll('.theme-icon-sun').forEach(icon => {
      icon.style.display = isDark ? 'inline-block' : 'none';
    });
    document.querySelectorAll('.theme-icon-moon').forEach(icon => {
      icon.style.display = isDark ? 'none' : 'inline-block';
    });
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // 2. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 3. Set Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 5. Active Navbar Indicator on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-nav');
      }
    });
  });

  // 6. Project Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active-filter');
      });
      btn.classList.add('active-filter');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.97)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 150);
        }
      });
    });
  });

  // 7. Copy to Clipboard with Toast Notification
  window.copyToClipboard = function(text, label) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Đã sao chép ${label || 'thông tin'} vào bộ nhớ tạm!`);
      }).catch(() => fallbackCopy(text, label));
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(`Đã sao chép ${label || 'thông tin'}!`);
    } catch (err) {
      showToast(`Không thể tự động sao chép: ${text}`);
    }
    document.body.removeChild(textarea);
  }

  // Toast Function
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 dark:bg-slate-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 transform translate-y-20 opacity-0 transition-all duration-250';
      toast.innerHTML = `
        <div class="w-2.5 h-2.5 rounded-full bg-sky-400"></div>
        <span id="toast-msg" class="text-xs sm:text-sm font-medium"></span>
      `;
      document.body.appendChild(toast);
    }
    
    document.getElementById('toast-msg').textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2800);
  }

  // 8. Modal Handlers
  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    const content = modal.querySelector('.modal-content');
    if (content) {
      content.classList.remove('modal-enter');
      content.classList.add('modal-enter-active');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const content = modal.querySelector('.modal-content');
    if (content) {
      content.classList.remove('modal-enter-active');
      content.classList.add('modal-exit-active');
    }

    setTimeout(() => {
      modal.classList.add('hidden');
      if (content) {
        content.classList.remove('modal-exit-active');
        content.classList.add('modal-enter');
      }
      document.body.classList.remove('overflow-hidden');
    }, 150);
  };

  // Close modals on Backdrop Click
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        const modal = backdrop.closest('[id$="-modal"]');
        if (modal) {
          window.closeModal(modal.id);
        }
      }
    });
  });

  // Close modals on ESC Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[id$="-modal"]:not(.hidden)').forEach(modal => {
        window.closeModal(modal.id);
      });
    }
  });

  // 9. Sub-tabs inside Case Study Modals
  window.switchCaseTab = function(btnEl, tabId) {
    const parentModal = btnEl.closest('.modal-content');
    if (!parentModal) return;

    // Toggle button styles
    const tabBtns = parentModal.querySelectorAll('.case-tab-btn');
    tabBtns.forEach(btn => {
      btn.classList.remove('active-tab');
      btn.classList.add('inactive-tab');
    });
    btnEl.classList.add('active-tab');
    btnEl.classList.remove('inactive-tab');

    // Toggle tab panes
    const tabPanes = parentModal.querySelectorAll('.case-tab-pane');
    tabPanes.forEach(pane => pane.classList.add('hidden'));

    const targetPane = parentModal.querySelector(`#${tabId}`);
    if (targetPane) {
      targetPane.classList.remove('hidden');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  // 10. Interactive BA Artifact Simulator Switcher
  window.switchArtifactTab = function(btnEl, tabId) {
    const parentContainer = btnEl.closest('.artifact-container');
    if (!parentContainer) return;

    // Toggle button styles
    const tabBtns = parentContainer.querySelectorAll('.artifact-tab-btn');
    tabBtns.forEach(btn => {
      btn.classList.remove('active-filter');
      btn.classList.add('text-slate-600', 'dark:text-slate-400');
    });
    btnEl.classList.add('active-filter');
    btnEl.classList.remove('text-slate-600', 'dark:text-slate-400');

    // Toggle tab panes
    const tabPanes = parentContainer.querySelectorAll('.artifact-tab-pane');
    tabPanes.forEach(pane => pane.classList.add('hidden'));

    const targetPane = parentContainer.querySelector(`#${tabId}`);
    if (targetPane) {
      targetPane.classList.remove('hidden');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };
});
