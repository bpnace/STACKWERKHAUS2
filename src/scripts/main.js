/* Remove the following lines as Babel will auto-inject polyfills with 'usage': */
/* Prepending polyfill imports for polyfill support as per Babel config */
/* import 'core-js/stable';
import 'regenerator-runtime/runtime'; */

import '../styles/main.scss'; // Import main SCSS file for Webpack

// Main JavaScript file 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import Lenis from 'lenis'; // Import Lenis for smooth scrolling

// Import our new utilities
import { headlineAnimator, scrollFadeIn, createParallax } from './utils/animationUtils';
import { FocusTrap } from './utils/focusTrap';

// Import animation modules
import { initPageLoadAnimation } from './animations/pageLoadAnimations';
import { initHeroAnimations } from './animations/heroAnimations';
import './components/ProjectCard'; // Web Component registration
import { initSeeMoreButtonAnimations } from './animations/seeMoreButtonAnimations';
import { initContactAnimations } from './animations/contactAnimations';
import { initCustomCheckbox } from './components/ContactForm';

gsap.registerPlugin(ScrollTrigger); // Only register ScrollTrigger, not Draggable

// --- GSAP Blur Plugin (IIFE) ---
(function() {
  const blurProperty = gsap.utils.checkPrefix("filter"),
        blurExp = /blur\((.+)?px\)/,
        getBlurMatch = target => (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];

  gsap.registerPlugin({
    name: "blur",
    get(target) {
      return +(getBlurMatch(target)[1]) || 0;
    },
    init(target, endValue) {
      let data = this,
          filter = gsap.getProperty(target, blurProperty),
          endBlur = "blur(" + endValue + "px)",
          match = getBlurMatch(target)[0],
          index;
      if (filter === "none") {
        filter = "";
      }
      if (match) {
        index = filter.indexOf(match);
        endValue = filter.substr(0, index) + endBlur + filter.substr(index + match.length);
      } else {
        endValue = filter + endBlur;
        filter += filter ? " blur(0px)" : "blur(0px)";
      }
      data.target = target; 
      data.interp = gsap.utils.interpolate(filter, endValue); 
    },
    render(progress, data) {
      data.target.style[blurProperty] = data.interp(progress);
    }
  });
})();

window.addEventListener('load', () => {
  document.body.classList.remove('preload');
  document.body.classList.add('fadein');
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis for smooth scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });
  // Store on window for HMR or other potential global access if needed
  window.lenisInstance = lenis;
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. Sync ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);

  // 3. GSAP Ticker (Optional - alternative way to drive Lenis, not usually needed with raf loop)
  // gsap.ticker.add((time) => {
  //   lenis.raf(time * 1000); // Lenis expects milliseconds
  // });
  // gsap.ticker.lagSmoothing(0);

  // --- Lebenslauf Card Modal Logic ---
  const readMoreBtn = document.querySelector('.read-more-btn');
  const blurOverlay = document.querySelector('.blur-overlay');
  const lebenslaufCard = document.querySelector('.lebenslauf-card');
  const closeCardBtn = document.querySelector('.close-card-btn');
  const focusTrap = new FocusTrap(lebenslaufCard);

  function openCard() {
    blurOverlay.classList.add('visible');
    lebenslaufCard.classList.add('visible');
    document.body.classList.add('modal-open'); // Prevent background scroll
    focusTrap.trap();
    // Animate blur in
    gsap.to(blurOverlay, { blur: 8, opacity: 1, duration: 0.5, ease: 'power2.out' });
  }

  function closeCard() {
    // Animate blur out, then hide overlay
    gsap.to(blurOverlay, { blur: 0, opacity: 0, duration: 0.4, ease: 'power2.in', onComplete: () => {
      blurOverlay.classList.remove('visible');
      lebenslaufCard.classList.remove('visible');
      document.body.classList.remove('modal-open');
      // Reset filter property to avoid accumulation
      blurOverlay.style.filter = '';
      focusTrap.release();
    }});
  }

  if (readMoreBtn) readMoreBtn.addEventListener('click', openCard);
  if (closeCardBtn) closeCardBtn.addEventListener('click', closeCard);
  if (blurOverlay) blurOverlay.addEventListener('click', closeCard);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lebenslaufCard.classList.contains('visible')) {
      closeCard();
    }
  });

  // Ensure mouse wheel always scrolls the lebenslauf card when open
  lebenslaufCard.addEventListener('wheel', function(e) {
    if (lebenslaufCard.classList.contains('visible')) {
      // Only scroll the card, not the background
      e.stopPropagation();
      // Allow default scroll
    }
  }, { passive: false });

  // 5. Initialize all Page Animations
  // These functions should now internally use the default scroller (window)
  initPageLoadAnimation(); 

  // 6. Initial GSAP .set() calls for FOUC prevention and stability
  // (Removed for modal elements to prevent FOUC)
  // if (lebenslaufCard) gsap.set(lebenslaufCard, { opacity: 0, yPercent: 100 });
  // if (blurOverlay) gsap.set(blurOverlay, { opacity: 0 });
  // if (readMoreBtn) gsap.set(readMoreBtn, { opacity: 1 });

  const headerLogoEl = document.querySelector('header .logo');
  const headerNavLinksEl = document.querySelectorAll('header nav a');
  const headerCtaEl = document.querySelector('header .header-cta');
  if (headerLogoEl) gsap.set(headerLogoEl, { opacity: 1, x: 0, y: 0, force3D: false });
  if (headerNavLinksEl.length > 0) gsap.set(headerNavLinksEl, { opacity: 1, x: 0, y: 0, force3D: false });
  if (headerCtaEl) gsap.set(headerCtaEl, { opacity: 1, x: 0, y: 0, force3D: false });
  
  // 7. Initial ScrollTrigger Refresh
  ScrollTrigger.refresh();

  // 8. Fade in the body
  gsap.to(document.body, { opacity: 1, duration: 0.5, delay: 0.1 });

  // Smooth scroll for header nav links using Lenis
  const headerNavLinks = document.querySelectorAll('header nav a, .header-cta a');
  headerNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          // Use easeInOutSine for slow-fast-slow effect
          lenis.scrollTo(target, { offset: 0, duration: 1.2, easing: (t) => -(Math.cos(Math.PI * t) - 1) / 2 });
        }
      }
    });
  });

  // Make logo scroll to top of page on click
  const headerLogo = document.querySelector('header .logo');
  if (headerLogo) {
    headerLogo.style.cursor = 'pointer';
    headerLogo.addEventListener('click', function(e) {
      e.preventDefault();
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(0, { duration: 1.2, easing: (t) => -(Math.cos(Math.PI * t) - 1) / 2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Initialize Modal with Focus Trap
  const heroSection = document.querySelector('.hero');
  // REMOVE createParallax for hero section to avoid conflict
  // if (heroSection) {
  //   createParallax(heroSection, { speed: 0.4 });
  // }

  // Animate headlines using our utility
  const headlines = document.querySelectorAll('.section-headline-large');
  headlines.forEach(headline => {
    headlineAnimator.splitText(headline);
    scrollFadeIn(headline, {
      start: 'top 80%',
      y: 100,
      duration: 1
    });
  });

  // Convert existing project cards to web components
  const projectGrid = document.querySelector('.project-grid');
  if (projectGrid) {
    const projects = Array.from(projectGrid.querySelectorAll('.project'));
    projects.forEach(project => {
      const title = project.querySelector('.title').textContent;
      const subtitle = project.querySelector('span').textContent;
      const normalImgEl = project.querySelector('.normalImg');
      if (!normalImgEl) return; // Skip if no image (e.g., placeholder card)
      const normalImg = normalImgEl.src;
      const revealedImg = normalImgEl.getAttribute('data-revealed-img'); // <-- Read from HTML

      const projectCard = document.createElement('project-card');
      projectCard.setAttribute('title', title);
      projectCard.setAttribute('subtitle', subtitle);
      projectCard.setAttribute('image', normalImg); // Default image
      projectCard.setAttribute('revealed-image', revealedImg); // Revealed image
      project.replaceWith(projectCard);
    });
  }

  // Animate hero title immediately on load
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const splitHeroText = headlineAnimator.splitText(heroTitle);
    if (splitHeroText) {
      headlineAnimator.animateHeadline(splitHeroText, {
        stagger: 0.05,
        duration: 0.8,
        ease: 'power2.out',
        y: 100,
        delay: 0.2, // Slight delay for initial load
        scrollTrigger: false // No scroll trigger for hero
      });
    }
  }

  // Initialize other section headlines with scroll trigger
  const sectionHeadlines = document.querySelectorAll('.section-headline-large:not(.hero-title)');
  sectionHeadlines.forEach(headline => {
    const splitText = headlineAnimator.splitText(headline);
    if (splitText) {
      headlineAnimator.animateHeadline(splitText, {
        stagger: 0.03,
        duration: 0.6,
        ease: 'power2.out',
        y: 50,
        scrollTrigger: {
          trigger: headline,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  });

  // Initialize hero animations (including navbar scroll effect)
  initHeroAnimations();

  // Initialize hero see-more button animation
  initSeeMoreButtonAnimations();

  // Logo video hover effect
  const logoVideo = document.querySelector('.logo .masked-video');
  const logo = document.querySelector('.logo');
  
  if (logoVideo) {
    // Set mask-image via JS to avoid Webpack build errors
    logoVideo.style.maskImage = "url('/assets/images/logo1.svg')";
    logoVideo.style.webkitMaskImage = "url('/assets/images/logo1.svg')";

    // Removed event listeners to let the video autoplay continuously
    // The video element now has autoplay, muted, loop attributes in HTML,
    // and CSS hover in _header.scss changes opacity.
  }

  // Initialize contact animations and form
  initContactAnimations();
  initCustomCheckbox();

  // --- Remove GSAP zoom/brightness hover effect for project images ---
  // --- Add Osmo pixelated image reveal effect for project-card ---
  const gridSize = 8; // Fewer, larger pixels for a bolder effect
  const animationStepDuration = 0.3;
  const pixelSize = 100 / gridSize;
  const projectCards = document.querySelectorAll('project-card');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;

  projectCards.forEach(card => {
    const imgWrapper = card.shadowRoot.querySelector('[data-pixelated-image-reveal]');
    const pixelGrid = card.shadowRoot.querySelector('[data-pixelated-image-reveal-grid]');
    const defaultImgWrap = card.shadowRoot.querySelector('.pixelated-image-card__default');
    const revealedImgWrap = card.shadowRoot.querySelector('.pixelated-image-card__active');
    if (!imgWrapper || !pixelGrid || !defaultImgWrap || !revealedImgWrap) return;
    pixelGrid.innerHTML = '';
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.width = `${Math.min(100, 100 / gridSize)}%`;
        pixel.style.height = `${Math.min(100, 100 / gridSize)}%`;
        pixel.style.left = `${Math.min(100, col * (100 / gridSize))}%`;
        pixel.style.top = `${Math.min(100, row * (100 / gridSize))}%`;
        pixelGrid.appendChild(pixel);
      }
    }
    const pixels = pixelGrid.querySelectorAll('.pixelated-image-card__pixel');
    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;
    let isActive = false;
    let delayedCall;
    // Hide all pixels and revealed image by default
    gsap.set(pixels, { display: 'none' });
    revealedImgWrap.style.display = 'none';
    defaultImgWrap.style.display = 'block';
    const animatePixels = (activate) => {
      isActive = activate;
      gsap.killTweensOf(pixels);
      if (delayedCall) delayedCall.kill();
      gsap.set(pixels, { display: 'none' });
      gsap.to(pixels, {
        display: 'block',
        duration: 0,
        stagger: { each: staggerDuration, from: 'random' }
      });
      delayedCall = gsap.delayedCall(animationStepDuration, () => {
        if (activate) {
          defaultImgWrap.style.display = 'none';
          revealedImgWrap.style.display = 'block';
          // Play video if present
          if (typeof card.playRevealedVideo === 'function') card.playRevealedVideo();
        } else {
          defaultImgWrap.style.display = 'block';
          revealedImgWrap.style.display = 'none';
          // Pause video if present
          if (typeof card.pauseRevealedVideo === 'function') card.pauseRevealedVideo();
        }
        gsap.to(pixels, {
          display: 'none',
          duration: 0,
          stagger: { each: staggerDuration, from: 'random' }
        });
      });
    };
    if (isTouchDevice) {
      imgWrapper.addEventListener('click', () => animatePixels(!isActive));
    } else {
      imgWrapper.addEventListener('mouseenter', () => { if (!isActive) animatePixels(true); });
      imgWrapper.addEventListener('mouseleave', () => { if (isActive) animatePixels(false); });
    }
  });

  // --- Footer Logo GSAP Animation ---
  const footerLogoTrack = document.querySelector('.footer-logo-track');
  if (footerLogoTrack) {
    // Ensure the track is at least as wide as the viewport for seamless looping
    const trackWidth = footerLogoTrack.scrollWidth;
    const viewportWidth = window.innerWidth;
    // If the track is not wide enough, duplicate the text until it is
    if (trackWidth < viewportWidth * 2) {
      const text = footerLogoTrack.innerHTML;
      while (footerLogoTrack.scrollWidth < viewportWidth * 2) {
        footerLogoTrack.innerHTML += text;
      }
    }
    gsap.set(footerLogoTrack, { x: 0 });
    gsap.to(footerLogoTrack, {
      x: () => `-=${footerLogoTrack.scrollWidth / 2}`,
      duration: 18,
      ease: 'linear',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (footerLogoTrack.scrollWidth / 2))
      }
    });
  }
});

// --- Webpack HMR Handling --- 
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    } else {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // A simple refresh might be best for HMR with Lenis.
      // Consider re-adding lenis.on('scroll', ScrollTrigger.update) if main.js itself is fully re-run by HMR
      // and the original lenis instance/listener is lost.
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 150);
    }
  });
} 