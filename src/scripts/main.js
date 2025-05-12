import '../styles/main.scss'; // Import main SCSS file for Webpack

// Main JavaScript file 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import { Draggable } from 'gsap/Draggable'; // Import Draggable
import LocomotiveScroll from 'locomotive-scroll'; // Import LocomotiveScroll

gsap.registerPlugin(ScrollTrigger, Draggable); // Register plugins

document.addEventListener('DOMContentLoaded', () => {
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

    // --- Function to Initialize GSAP/ScrollTrigger Animations ---
    const initializeGsapAnimations = () => {
      const headerEl = document.querySelector('header');
      const heroSectionEl = document.querySelector('.hero');
      const aboutSectionEl = document.querySelector('.about-section');
      const projectsSectionEl = document.querySelector('.projects-section');
      const projectCards = document.querySelectorAll('.project-card'); // Use querySelectorAll
      const aboutImage = document.querySelector('.about-image');
      const aboutText = document.querySelector('.about-text');
      const scrollIndicator = document.querySelector('.scroll-indicator');
      const capabilitiesGrid = document.querySelector('.capabilities-grid');

      // --- Header Scroll Trigger ---
      if (headerEl && heroSectionEl) {
        ScrollTrigger.create({
          trigger: heroSectionEl,
          scroller: scrollContainer, 
          start: "bottom top", 
          onEnter: () => {
            headerEl.classList.add("scrolled");
          },
          onLeaveBack: () => {
            headerEl.classList.remove("scrolled");
          }
        });
      }

      // --- Hero Pinning & Parallax Timeline --- 
      if (heroSectionEl) { 
        gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionEl,
            scroller: scrollContainer,
            pin: true,
            pinSpacing: false, 
            start: "top top",
            end: "bottom top", 
            scrub: 0.5, 
          }
        })
        .to(heroSectionEl, {
          yPercent: -30, 
          ease: "none"
        }, 0); 
      }

      // Page Load Fade-In (Can stay outside if not scroll dependent)
      // gsap.from('body', { opacity: 0, duration: 1, ease: 'power2.inOut' });

      // Hero Title Staggered Animation (Not scroll dependent)
      // gsap.from('.hero-title span', { opacity: 0, y: 50, stagger: 0.2, duration: 1, ease: 'power2.out', delay: 0.5 });

      // Animate Scroll Indicator (Not scroll dependent)
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          y: 10, repeat: -1, yoyo: true, ease: 'power1.inOut', duration: 0.8
        });
      }

      // About Section Animation
      if (aboutSectionEl && aboutImage && aboutText) {
        gsap.from(aboutImage, {
          scrollTrigger: {
            trigger: aboutSectionEl,
            scroller: scrollContainer, 
            start: 'top 80%', 
          },
          x: -100, opacity: 0, duration: 1, ease: 'power2.out'
        });

        gsap.from(aboutText, {
          scrollTrigger: {
            trigger: aboutSectionEl,
            scroller: scrollContainer, 
            start: 'top 80%',
          },
          x: 100, opacity: 0, duration: 1, ease: 'power2.out'
        });
      }

      // Project Cards Animation
      if (projectCards.length > 0 && projectsSectionEl) { // Check length and section exist
        gsap.from(projectCards, { // Target the NodeList
          scrollTrigger: {
            trigger: projectsSectionEl, // Use section as trigger
            scroller: scrollContainer, 
            start: 'top 80%',
          },
          opacity: 0, scale: 0.95, y: 50, stagger: 0.2, duration: 0.8, ease: 'power2.out'
        });
      }

      // Capabilities Section Draggable (Not scroll dependent)
      if (capabilitiesGrid) { 
        Draggable.create(capabilitiesGrid, {
          type: 'x', bounds: '.capabilities-container', inertia: true, edgeResistance: 0.65, throwProps: true 
        });
      }
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
    // Initialize non-LocoScroll animations here if needed
    // Page Load Fade-In
    gsap.from('body', { opacity: 0, duration: 1, ease: 'power2.inOut' });
    // Hero Title Staggered Animation
    gsap.from('.hero-title span', { opacity: 0, y: 50, stagger: 0.2, duration: 1, ease: 'power2.out', delay: 0.5 });
    // Animate Scroll Indicator
    if (document.querySelector('.scroll-indicator')) { gsap.to('.scroll-indicator', { y: 10, repeat: -1, yoyo: true, ease: 'power1.inOut', duration: 0.8 }); }
    // Add other non-scroll animations if any

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

  // Moved non-scroll animations outside the delayed init where possible
  // Page Load Fade-In (can run immediately)
  gsap.from('body', { opacity: 0, duration: 1, ease: 'power2.inOut' });
  // Hero Title Staggered Animation (can run immediately)
  gsap.from('.hero-title span', { opacity: 0, y: 50, stagger: 0.2, duration: 1, ease: 'power2.out', delay: 0.5 });
  
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