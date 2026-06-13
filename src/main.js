/* ========================================================
   THE MIXYSTIC G STUDIOS — Main JavaScript
   Scroll effects, parallax, video handling, interactions
   ======================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ----- ELEMENTS -----
  const hero = document.getElementById('hero');
  const nav = document.querySelector('.nav');
  const videoWrapper = document.querySelector('.hero__video-wrapper');
  const video = document.querySelector('.hero__video');
  const scrollArrow = document.querySelector('.hero__scroll');
  const pillSelector = document.querySelector('.liquid-pill-selector');
  const ctaButtons = document.querySelectorAll('.liquid-pill-option');

  // =======================================================
  // VIDEO HANDLING
  // =======================================================

  if (video) {
    // Check if video has a valid source
    const source = video.querySelector('source');
    const hasSource = source && source.getAttribute('src') && source.getAttribute('src').trim() !== '';

    if (hasSource) {
      video.addEventListener('loadeddata', () => {
        videoWrapper.classList.add('video-loaded');
        video.style.opacity = '1';
      });

      video.addEventListener('error', () => {
        // Video failed to load — fallback is already handled by CSS
        console.log('Video source not available — showing fallback.');
      });

      // Attempt to play
      video.play().catch(() => {
        // Autoplay blocked — fallback is fine
      });
    } else {
      // No video source provided — CSS fallback gradient shows automatically
      console.log('No video source provided — using ambient fallback.');
    }
  }

  // =======================================================
  // PARALLAX — SCROLL-DRIVEN VIDEO MOVEMENT
  // =======================================================

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    const progress = Math.min(scrollY / heroHeight, 1);

    // Subtle parallax — video moves slightly slower than scroll
    if (videoWrapper) {
      const translateY = progress * 60; // max 60px upward shift
      const scale = 1 + progress * 0.02; // subtle zoom (max 1.02x)
      videoWrapper.style.transform = `translateY(${translateY}px) scale(${scale})`;
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // =======================================================
  // NAVBAR — BACKGROUND ON SCROLL
  // =======================================================

  function updateNav() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });

  // =======================================================
  // LIQUID PILL SELECTOR — ACTIVE STATE
  // =======================================================

  if (pillSelector && ctaButtons.length) {
    ctaButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        pillSelector.dataset.selected = index;

        ctaButtons.forEach((other, idx) => {
          const selected = idx === index;
          other.classList.toggle('active', selected);
          other.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });

        const target = btn.dataset.target;
        if (target) {
          const targetSection = document.querySelector(target);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.hash = target;
          }
        }
      });
    });
  }

  // =======================================================
  // SCROLL INDICATOR — CLICK TO SCROLL
  // =======================================================

  if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
      const nextSection = hero.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({
          top: hero.offsetHeight,
          behavior: 'smooth'
        });
      }
    });
  }

  // =======================================================
  // INITIAL LOAD ANIMATION — ENSURE VISIBILITY
  // =======================================================

  // On load, ensure content is visible even if animations haven't triggered
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero__marker, .hero__headline, .hero__tagline, .hero__ctas, .hero__trust, .hero__scroll').forEach(el => {
      el.style.opacity = el.style.opacity || '';
    });
  });

  // =======================================================
  // LOG — BRAND MARK
  // =======================================================

  console.log('%c🎙 The Mixystic G Studios', 'font-size:18px; font-weight:700; color:#F3F0EA;');
  console.log('%cYour Sound, Perfected.', 'font-size:13px; font-weight:400; color:#B0A79D;');

});
