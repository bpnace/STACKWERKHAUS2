import '../styles/main.scss'; // Import main SCSS file for Webpack

// Main JavaScript file 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import { Draggable } from 'gsap/Draggable'; // Import Draggable
import Lenis from 'lenis'; // Import Lenis for smooth scrolling

// Import animation modules
import { initPageLoadAnimation } from './animations/pageLoadAnimations';
import { initHeroAnimations } from './animations/heroAnimations';
// import { initScrollIndicatorAnimation } from './animations/scrollIndicatorAnimations'; // Removed
import { initAboutAnimations } from './animations/aboutAnimations';
import { initProjectAnimations } from './animations/projectAnimations';
import { initCapabilitiesAnimations } from './animations/capabilitiesAnimations';
import { initSeeMoreButtonAnimations } from './animations/seeMoreButtonAnimations'; // Added new button animation
// import { initScrollTriggerAnimations } from './animations/scrollTriggerAnimations'; // Added new scroll trigger animation - File not found
// import { initCardAnimations } from './animations/cardAnimations'; // Added new card animation - File not found

gsap.registerPlugin(ScrollTrigger, Draggable); // Register plugins

window.addEventListener('load', () => {
  document.body.classList.remove('preload');
  document.body.classList.add('fadein');
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis for smooth scrolling
  const lenis = new Lenis({
    duration: 1.3, // Smoother, slower scroll
    easing: (t) => 1 - Math.pow(1 - t, 4), // Extra smooth cubic ease
    smooth: true,
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

  function openCard() {
    blurOverlay.classList.add('visible');
    lebenslaufCard.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeCard() {
    blurOverlay.classList.remove('visible');
    lebenslaufCard.classList.remove('visible');
    document.body.style.overflow = '';
  }

  if (readMoreBtn) readMoreBtn.addEventListener('click', openCard);
  if (closeCardBtn) closeCardBtn.addEventListener('click', closeCard);
  if (blurOverlay) blurOverlay.addEventListener('click', closeCard);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lebenslaufCard.classList.contains('visible')) {
      closeCard();
    }
  });

  // 5. Initialize all Page Animations
  // These functions should now internally use the default scroller (window)
  initPageLoadAnimation(); 
  initHeroAnimations();    
  initAboutAnimations();   
  initProjectAnimations(); 
  initCapabilitiesAnimations(); 
  initSeeMoreButtonAnimations();

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