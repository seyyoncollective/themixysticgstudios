import { useEffect, useRef, useCallback } from 'react';
import PremiumCreativeStudioSection from './PremiumCreativeStudioSection';
import ServicesSection from './ServicesSection';
import TrustedBySection from './TrustedBySection';
import PortfolioSection from './PortfolioSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function App() {
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);

  // Hero scroll effects (nav + parallax)
  useEffect(() => {
    const hero = heroRef.current;
    const nav = navRef.current;
    const videoWrapper = videoWrapperRef.current;

    if (!hero || !nav) {
      return undefined;
    }

    const updateNav = () => {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight || window.innerHeight;
      const threshold = heroHeight * 0.5;

      // Glassy bar appears after slight scroll
      if (scrollY > 60) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }

      // Nav links + toggle appear after scrolling past 50% of hero
      if (scrollY > threshold) {
        nav.classList.add('nav--visible');
      } else {
        nav.classList.remove('nav--visible');
      }
    };

    const updateParallax = () => {
      if (!videoWrapper) return;
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight || 1;
      const progress = Math.min(scrollY / heroHeight, 1);
      const translateY = progress * 60;
      const scale = 1 + progress * 0.02;

      videoWrapper.style.transform = `translateY(${translateY}px) scale(${scale})`;
    };

    const handleScroll = () => {
      updateNav();
      updateParallax();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Video load handler
  useEffect(() => {
    const video = videoRef.current;
    const videoWrapper = videoWrapperRef.current;
    if (!video || !videoWrapper) {
      return undefined;
    }

    const handleLoadedData = () => {
      videoWrapper.classList.add('video-loaded');
      video.style.opacity = '1';
    };

    const handleError = () => {
      console.log('Video source not available — showing fallback.');
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    video.play().catch(() => {
      // Autoplay may be blocked on some browsers.
    });

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Magnetic hover effect for buttons
  const handleMouseMove = useCallback((e, btnRef) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    btn.style.setProperty('--mouse-x', deltaX);
    btn.style.setProperty('--mouse-y', deltaY);
  }, []);

  const handleMouseLeave = useCallback((e, btnRef) => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.setProperty('--mouse-x', '0');
    btn.style.setProperty('--mouse-y', '0');
  }, []);

  const handleScrollIndicatorClick = (event) => {
    event.preventDefault();
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: heroRef.current?.offsetHeight || 0, behavior: 'smooth' });
    }
  };

  const handleCtaClick = (target) => {
    const targetSection = document.querySelector(target);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = target;
    }
  };

  return (
    <div>
      <nav className="nav" ref={navRef} role="navigation" aria-label="Main navigation">
        <div className="nav__inner">
          <a href="#" className="nav__logo" aria-label="Mixystic G Studios">
            <img
              src="/assets/nav-logo.png"
              alt="Mixystic G Studios"
              className="nav__logo-img"
            />
          </a>
          <div className="nav__links">
            <a href="#hero" className="nav__link" data-text="Home">Home</a>
            <a href="#about" className="nav__link" data-text="Who We Are">Who We Are</a>
            <a href="#services" className="nav__link" data-text="In the Studio">In the Studio</a>
            <a href="#trust" className="nav__link" data-text="Trusted by">Trusted by</a>
            <a href="#listen" className="nav__link" data-text="Listen">Listen</a>
            <a href="#lets-talk" className="nav__link" data-text="Let’s Talk">Let’s Talk</a>
          </div>
          <button className="nav__toggle" aria-label="Toggle menu" aria-expanded="false">
            <span className="nav__toggle-line"></span>
            <span className="nav__toggle-line"></span>
          </button>
        </div>
      </nav>

      <section className="hero" id="hero" ref={heroRef}>
        <div className="hero__video-wrapper" ref={videoWrapperRef}>
          <video className="hero__video" autoPlay loop muted playsInline poster="" ref={videoRef}>
            <source
              src="/hero/hero-video.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero__video-overlay" aria-hidden="true"></div>
        </div>

        <div className="hero__content">
          <div className="hero__content-inner">
            <div className="hero__marker">· EST. 2019 ·</div>

            <h1 className="hero__headline">
              <span className="hero__headline-line hero__headline-line--1">THE MIXYSTIC G</span>
              <span className="hero__headline-line hero__headline-line--2">STUDIOS</span>
            </h1>

            <p className="hero__tagline">Your Sound, Perfected.</p>

            <div className="hero__ctas">
              <button
                ref={primaryBtnRef}
                type="button"
                className="gold-btn gold-btn--secondary"
                aria-label="Get in touch with us"
                onClick={() => handleCtaClick('#lets-talk')}
                onMouseMove={(e) => handleMouseMove(e, primaryBtnRef)}
                onMouseLeave={(e) => handleMouseLeave(e, primaryBtnRef)}
              >
                <span className="gold-btn__shimmer" aria-hidden="true"></span>
                <span className="gold-btn__content">
                  <span className="gold-btn__text">Get In Touch</span>
                </span>
              </button>

              <button
                ref={secondaryBtnRef}
                type="button"
                className="gold-btn gold-btn--secondary"
                aria-label="Explore our studio"
                onClick={() => handleCtaClick('#about')}
                onMouseMove={(e) => handleMouseMove(e, secondaryBtnRef)}
                onMouseLeave={(e) => handleMouseLeave(e, secondaryBtnRef)}
              >
                <span className="gold-btn__shimmer" aria-hidden="true"></span>
                <span className="gold-btn__content">
                  <span className="gold-btn__text">Explore Studio</span>
                </span>
              </button>
            </div>

            <div className="hero__trust">
              <span className="hero__trust-item">25+ Years Experience</span>
              <span className="hero__trust-separator" aria-hidden="true"></span>
              <span className="hero__trust-item">Indian Cinema</span>
              <span className="hero__trust-separator" aria-hidden="true"></span>
              <span className="hero__trust-item">Worldwide</span>
            </div>
          </div>
        </div>
        <a href="#about" className="hero__scroll" aria-label="Scroll to next section" onClick={handleScrollIndicatorClick}>
          <svg className="hero__scroll-arrow" width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      <PremiumCreativeStudioSection />
      <ServicesSection />
      <TrustedBySection />
      <PortfolioSection />
      <ContactSection />
      <Footer />

    </div>
  );
}
