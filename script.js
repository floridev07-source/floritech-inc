/* =============================================
   FLORITECH INC. — COUNTDOWN & INTERACTIONS
   ============================================= */

(function () {
  'use strict';

  // ===== COUNTDOWN TIMER =====
  const LAUNCH_DATE = new Date('2030-07-07T00:00:00').getTime();

  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  function padNumber(num, length) {
    return String(num).padStart(length, '0');
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = LAUNCH_DATE - now;

    if (diff <= 0) {
      daysEl.textContent = '0000';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Animate value changes
    animateValue(daysEl, padNumber(days, 4));
    animateValue(hoursEl, padNumber(hours, 2));
    animateValue(minutesEl, padNumber(minutes, 2));
    animateValue(secondsEl, padNumber(seconds, 2));
  }

  function animateValue(element, newValue) {
    if (element.textContent !== newValue) {
      element.style.transform = 'translateY(-4px)';
      element.style.opacity = '0.6';
      
      setTimeout(() => {
        element.textContent = newValue;
        element.style.transform = 'translateY(4px)';
        
        setTimeout(() => {
          element.style.transform = 'translateY(0)';
          element.style.opacity = '1';
        }, 50);
      }, 100);
    }
  }

  // Initial update
  updateCountdown();
  // Update every second
  setInterval(updateCountdown, 1000);

  // ===== SCROLL DOWN BUTTON =====
  const scrollBtn = document.getElementById('scroll-down');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function () {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 80) {
      header.style.background = 'rgba(0, 0, 0, 0.85)';
      header.style.backdropFilter = 'blur(20px)';
      header.style.webkitBackdropFilter = 'blur(20px)';
    } else {
      header.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)';
      header.style.backdropFilter = 'none';
      header.style.webkitBackdropFilter = 'none';
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ===== VIDEO FALLBACK =====
  const video = document.getElementById('bg-video');
  if (video) {
    video.addEventListener('error', function () {
      // If video fails to load, add an animated gradient background
      const videoBg = document.querySelector('.video-bg');
      if (videoBg) {
        videoBg.style.background = 'linear-gradient(135deg, #000 0%, #111 25%, #0a0a0a 50%, #111 75%, #000 100%)';
        videoBg.style.backgroundSize = '400% 400%';
        videoBg.style.animation = 'gradientShift 15s ease infinite';

        // Add the animation keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `;
        document.head.appendChild(style);
      }
    });

    // Try to play video (handles autoplay restrictions)
    video.play().catch(function () {
      // Autoplay blocked — video will show first frame or fallback
      console.log('Video autoplay blocked by browser policy.');
    });
  }

  // ===== PARALLAX EFFECT ON SCROLL =====
  window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
      const opacity = 1 - (scrolled / window.innerHeight) * 0.8;
      const translate = scrolled * 0.3;
      heroContent.style.opacity = Math.max(opacity, 0);
      heroContent.style.transform = `translateY(${translate}px)`;
    }
  }, { passive: true });

})();
