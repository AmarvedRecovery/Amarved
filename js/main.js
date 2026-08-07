/* 
 * Amarved Recovery System - Main JS 
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  
  // Check local storage for theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    if (theme === 'dark') {
      themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
    }
  }

  // Custom Cursor
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  if (cursorDot && cursorOutline && !window.matchMedia("(max-width: 768px)").matches) {
    let mouseX = 0;
    let mouseY = 0;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(() => {
          cursorDot.style.left = `${mouseX}px`;
          cursorDot.style.top = `${mouseY}px`;

          // Slight delay for the outline
          cursorOutline.animate({
            left: `${mouseX}px`,
            top: `${mouseY}px`
          }, { duration: 500, fill: "forwards" });
          
          isMoving = false;
        });
      }
    });

    // Add hover effect for links and buttons
    const interactables = document.querySelectorAll('a, button, input, textarea');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'var(--primary-light)';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
      });
    });
  }
});
