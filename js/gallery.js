/* 
 * Amarved Recovery System - Gallery & Swiper JS 
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Swiper for Testimonials
  if (typeof Swiper !== 'undefined') {
    
    const testimonialSwiper = new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });

    // Conditions Cards Slider (Mobile only)
    const conditionsSwiper = new Swiper('.conditions-swiper', {
      slidesPerView: 1.2,
      spaceBetween: 20,
      breakpoints: {
        768: {
          slidesPerView: 2.2,
          spaceBetween: 30
        },
        1024: {
          // Disable swiper on desktop, use CSS grid instead
          enabled: false,
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });

  }
});
