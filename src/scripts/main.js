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

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis for smooth scrolling
  const lenis = new Lenis();
  // Store on window for HMR or other potential global access if needed
  // window.lenisInstance = lenis; 
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

  // 4. Card/Overlay Logic
  const readMoreBtnEl = document.querySelector('.read-more-btn');
  const closeCardBtnEl = document.querySelector('.close-card-btn');
  const lebenslaufCardEl = document.querySelector('.lebenslauf-card');
  const blurOverlayEl = document.querySelector('.blur-overlay');

  const openCard = () => {
    if (!lebenslaufCardEl || !blurOverlayEl) return;
    blurOverlayEl.classList.add('visible');
    lebenslaufCardEl.classList.add('visible');
    lenis.stop(); // Use Lenis API to stop scrolling
  };

  const closeCard = () => {
    if (!lebenslaufCardEl || !blurOverlayEl) return;
    blurOverlayEl.classList.remove('visible');
    lebenslaufCardEl.classList.remove('visible');
    lenis.start(); // Use Lenis API to resume scrolling
  };

  if (readMoreBtnEl) readMoreBtnEl.addEventListener('click', openCard);
  if (closeCardBtnEl) closeCardBtnEl.addEventListener('click', closeCard);
  if (blurOverlayEl) blurOverlayEl.addEventListener('click', closeCard);

  // 5. Initialize all Page Animations
  // These functions should now internally use the default scroller (window)
  initPageLoadAnimation(); 
  initHeroAnimations();    
  initAboutAnimations();   
  initProjectAnimations(); 
  initCapabilitiesAnimations(); 
  initSeeMoreButtonAnimations();

  // 6. Initial GSAP .set() calls for FOUC prevention and stability
  if (lebenslaufCardEl) gsap.set(lebenslaufCardEl, { opacity: 0, yPercent: 100 });
  if (blurOverlayEl) gsap.set(blurOverlayEl, { opacity: 0 });
  if (readMoreBtnEl) gsap.set(readMoreBtnEl, { opacity: 0 });

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