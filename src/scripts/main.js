import '../styles/main.scss'; // Import main SCSS file for Webpack

// Main JavaScript file 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import { Draggable } from 'gsap/Draggable'; // Import Draggable
import LocomotiveScroll from 'locomotive-scroll'; // Import LocomotiveScroll

// Import animation modules
import { initPageLoadAnimation } from './animations/pageLoadAnimations';
import { initHeroAnimations } from './animations/heroAnimations';
// import { initScrollIndicatorAnimation } from './animations/scrollIndicatorAnimations'; // Removed
import { initAboutAnimations } from './animations/aboutAnimations';
import { initProjectAnimations } from './animations/projectAnimations';
import { initCapabilitiesAnimations } from './animations/capabilitiesAnimations';
import { initSeeMoreButtonAnimations } from './animations/seeMoreButtonAnimations'; // Added new button animation

gsap.registerPlugin(ScrollTrigger, Draggable); // Register plugins

document.addEventListener('DOMContentLoaded', () => {
  // --- Initialize Page Load Animation (runs regardless of LocoScroll) ---
  initPageLoadAnimation();

  // --- Initialize Non-Scroll-Dependent Animations (runs regardless of LocoScroll) ---
  // initScrollIndicatorAnimation(); // Removed
  initCapabilitiesAnimations(); // Moved here, was also in LocoScroll fallback
  initSeeMoreButtonAnimations(); // Initialize the new button animation

  // --- Initialize Locomotive Scroll ---
  const scrollContainer = document.querySelector('[data-scroll-container]');
  let locoScroll; // Define locoScroll here to access it later

  if (scrollContainer) {
    locoScroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      // Add other Locomotive Scroll options if needed
    });
    window.locoScroll = locoScroll; // Make instance globally accessible

    // -- Locomotive Scroll event handling --
    locoScroll.on('scroll', ScrollTrigger.update); // Use shorthand

    // -- GSAP ScrollTrigger Integration --
    ScrollTrigger.scrollerProxy(scrollContainer, {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: scrollContainer.style.transform ? 'transform' : 'fixed'
    });

    // --- Card/Overlay Elements and Logic ---
    const readMoreBtn = document.querySelector('.read-more-btn');
    const closeCardBtn = document.querySelector('.close-card-btn');
    const lebenslaufCard = document.querySelector('.lebenslauf-card');
    const blurOverlay = document.querySelector('.blur-overlay');

    const openCard = () => {
      if (!lebenslaufCard || !blurOverlay) return;
      blurOverlay.classList.add('visible');
      lebenslaufCard.classList.add('visible');
      locoScroll.stop(); // Stop background scrolling
    };

    const closeCard = () => {
      if (!lebenslaufCard || !blurOverlay) return;
      blurOverlay.classList.remove('visible');
      lebenslaufCard.classList.remove('visible');
      locoScroll.start(); // Resume background scrolling
    };

    if (readMoreBtn) {
      readMoreBtn.addEventListener('click', openCard);
    }

    if (closeCardBtn) {
      closeCardBtn.addEventListener('click', closeCard);
    }

    // Optional: Close card when clicking overlay
    if (blurOverlay) {
      blurOverlay.addEventListener('click', closeCard);
    }
    // --- End Card/Overlay Logic ---

    // --- Function to Initialize GSAP/ScrollTrigger Animations (now orchestrates calls) ---
    const initializeGsapAnimations = () => {
      // Animations that depend on LocomotiveScroll's scroller
      initHeroAnimations(scrollContainer); // Handles header scroll & hero pinning/parallax
      initAboutAnimations(scrollContainer);
      initProjectAnimations(scrollContainer);

      // Note: hero title stagger and scroll indicator animations are called earlier
      // as they don't strictly depend on locoScroll being initialized,
      // though hero title could be tied to a specific trigger later if needed.
      // Capabilities Draggable also called earlier.
    }; // --- End of initializeGsapAnimations function ---

    // --- Refresh ScrollTrigger and LocomotiveScroll on updates ---
    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    
    // Refresh LocomotiveScroll FIRST, then ScrollTrigger
    locoScroll.update();
    ScrollTrigger.refresh();

    // Initialize animations after a short delay
    setTimeout(() => {
        initializeGsapAnimations();
        // We might need another refresh AFTER animations are created
        ScrollTrigger.refresh(); 
    }, 150); // Increased delay slightly

  } else {
    console.warn('Locomotive Scroll container not found!');
    // initPageLoadAnimation(); // Already called above
    initHeroAnimations(null); // Call to ensure hero title animation runs
    // initScrollIndicatorAnimation(); // Removed
    // initCapabilitiesAnimations(); // Already called above
    // initAboutAnimations(null); // Depends on ScrollTrigger & scroller
    // initProjectAnimations(null); // Depends on ScrollTrigger & scroller

    // --- Card/Overlay Logic without LocoScroll ---
    // Need to handle this case if LocoScroll might not be present
    // For now, assuming LocoScroll exists if card is used
    const readMoreBtn = document.querySelector('.read-more-btn');
    const closeCardBtn = document.querySelector('.close-card-btn');
    const lebenslaufCard = document.querySelector('.lebenslauf-card');
    const blurOverlay = document.querySelector('.blur-overlay');

    const openCardNoScroll = () => {
      if (!lebenslaufCard || !blurOverlay) return;
      blurOverlay.classList.add('visible');
      lebenslaufCard.classList.add('visible');
      document.body.style.overflow = 'hidden'; // Fallback scroll lock
    };

    const closeCardNoScroll = () => {
      if (!lebenslaufCard || !blurOverlay) return;
      blurOverlay.classList.remove('visible');
      lebenslaufCard.classList.remove('visible');
      document.body.style.overflow = ''; // Restore scrolling
    };

    if (readMoreBtn) {
      readMoreBtn.addEventListener('click', openCardNoScroll);
    }
    if (closeCardBtn) {
      closeCardBtn.addEventListener('click', closeCardNoScroll);
    }
    if (blurOverlay) {
      blurOverlay.addEventListener('click', closeCardNoScroll);
    }
    // --- End Card/Overlay Logic without LocoScroll ---
  }
}); // End DOMContentLoaded

// --- Webpack HMR Handling --- 
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    } else {
      // 1. Kill existing ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // 2. Update LocoScroll and Refresh ScrollTrigger after a short delay
      const scrollContainer = document.querySelector('[data-scroll-container]');
      if (scrollContainer && window.locoScroll) { 
          const locoScroll = window.locoScroll; 
          if (locoScroll) {
            locoScroll.update(); // Ensure LocoScroll instance updates its internal values
            // Delay ScrollTrigger refresh slightly to allow DOM/styles to potentially settle
            setTimeout(() => {
              ScrollTrigger.refresh(true); // Force hard refresh
            }, 100); // 100ms delay (adjust if needed)
          } else {
             // If LocoScroll wasn't found, still try a delayed refresh
             setTimeout(() => {
                ScrollTrigger.refresh(true);
             }, 100);
          }
      } else {
         // If no LocoScroll, try a delayed refresh
         setTimeout(() => {
            ScrollTrigger.refresh(true);
         }, 100);
      }
    }
  });

  // Optional: More granular cleanup if specific modules are updated
  // module.hot.accept('./path/to/module.js', () => { ... });
} 