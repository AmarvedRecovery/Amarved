/* 
 * Amarved Recovery System - Animations JS 
 * Initializes Lenis (Smooth Scroll), AOS, and GSAP
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Initialize Lenis for Smooth Scrolling
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }

  // 3. GSAP Custom Animations (if loaded)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect for blobs
    gsap.utils.toArray('.blob').forEach(blob => {
      gsap.to(blob, {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: blob.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Reveal animation for stats/numbers
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
          animateValue(stat, 0, parseInt(stat.getAttribute('data-target')), 2000);
        },
        once: true
      });
    });
  }

  // Number Counter Animation Helper
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Calculate current value and append any suffix (like % or +)
      const suffix = obj.getAttribute('data-suffix') || '';
      obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

});
