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

  if (scrollContainer) {
    const locoScroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      // Add other Locomotive Scroll options if needed
    });
    window.locoScroll = locoScroll; // Make instance globally accessible for HMR

    // -- Locomotive Scroll event handling --
    locoScroll.on('scroll', (args) => {
      ScrollTrigger.update(); // Update ScrollTrigger

      // Header transformation logic - REMOVED, will be handled by dedicated ScrollTrigger below
      // const header = document.querySelector('header');
      // if (header) { // Check if header exists
      //   if (args.scroll.y > 50) { // Check if scrolled more than 50px
      //     header.classList.add('scrolled');
      //   } else {
      //     header.classList.remove('scrolled');
      //   }
      // }
    });

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

    // --- Header Scroll Trigger ---
    const headerEl = document.querySelector('header');
    const heroSectionEl = document.querySelector('.hero');

    if (headerEl && heroSectionEl) {
      ScrollTrigger.create({
        trigger: heroSectionEl,
        scroller: scrollContainer, // Essential for Locomotive Scroll
        start: "bottom top", // When the bottom of the hero hits the top of the viewport
        toggleClass: {targets: headerEl, className: "scrolled"},
      });
    }

    // --- Hero Background Parallax --- 
    // REMOVED OLD PARALLAX
    // gsap.to(heroSectionEl, { // Target the hero section ... });

    // --- Hero Pinning & Parallax Timeline --- 
    if (heroSectionEl) { // Ensure hero element exists
      gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionEl,
          scroller: scrollContainer,
          pin: true,
          pinSpacing: false, // Prevent extra space after pinning
          start: "top top",
          end: "bottom top", // Pin until the bottom of the hero reaches the top of the viewport
          scrub: 0.5, // Slightly smoother scrubbing
          // markers: true, // Add markers if debugging needed
        }
      })
      .to(heroSectionEl, {
        yPercent: -30, // Move hero up 30% of its height during the pin
        ease: "none"
      }, 0); // Apply this tween throughout the timeline (position 0)
    }

    // Page Load Fade-In
    gsap.from('body', {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut'
    });

    // Hero Title Staggered Animation (targeting spans as per HTML structure)
    gsap.from('.hero-title span', {
      opacity: 0,
      y: 50,
      stagger: 0.2, // Adjusted stagger value slightly from example
      duration: 1,
      ease: 'power2.out',
      delay: 0.5 // Add a small delay to start after the body fade-in
    });

    // Animate Scroll Indicator
    if (document.querySelector('.scroll-indicator')) {
      gsap.to('.scroll-indicator', {
        y: 10, // Move down 10px
        repeat: -1, // Loop indefinitely
        yoyo: true, // Reverse direction on each repeat
        ease: 'power1.inOut',
        duration: 0.8
      });
    }

    // Scroll Animations

    // About Section Animation
    if (document.querySelector('.about-section')) {
      gsap.from('.about-image', {
        scrollTrigger: {
          trigger: '.about-section',
          scroller: scrollContainer, // *** Add scroller property ***
          start: 'top 80%', // Start animation when top of section is 80% down the viewport
          // toggleActions: 'play none none none' // Optional: control animation playback
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      });

      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: '.about-section',
          scroller: scrollContainer, // *** Add scroller property ***
          start: 'top 80%',
          // toggleActions: 'play none none none'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      });
    }

    // Project Cards Animation
    if (document.querySelector('.project-card')) { // Check if elements exist
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects-section',
          scroller: scrollContainer, // *** Add scroller property ***
          start: 'top 80%',
          // toggleActions: 'play none none none' 
        },
        opacity: 0,
        scale: 0.95,
        y: 50, // Added a slight upward movement
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    // Capabilities Section Draggable
    if (document.querySelector('.capabilities-grid')) { // Check if element exists
      Draggable.create('.capabilities-grid', {
        type: 'x', // Allow dragging only horizontally
        bounds: '.capabilities-container', // Constrain dragging within the container
        inertia: true, // Add smooth inertial movement after drag
        edgeResistance: 0.65, // Makes it harder to drag past bounds
        throwProps: true // Enables smoother throwing physics (might require ThrowPropsPlugin for advanced use)
      });
    }

    // --- Refresh ScrollTrigger and LocomotiveScroll on updates ---
    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    ScrollTrigger.refresh();

  } else {
    console.warn('Locomotive Scroll container not found!');
    // Initialize GSAP animations without Locomotive Scroll if needed
    // (Code for non-LocoScroll setup could go here as a fallback)
  }

  // Placeholder for future animations (Locomotive Scroll setup, etc.)
});

// --- Webpack HMR Handling --- 
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error('Cannot apply HMR update.', err);
    } else {
      // console.log('Applying HMR update...'); // Debug log removed
      // 1. Kill existing ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // 2. Re-initialize or update essential parts if necessary
      const scrollContainer = document.querySelector('[data-scroll-container]');
      if (scrollContainer && window.locoScroll) { 
          const locoScroll = window.locoScroll; 
          if (locoScroll) {
            locoScroll.update();
            // console.log('LocomotiveScroll updated.'); // Debug log removed
          }
          ScrollTrigger.refresh();
          // console.log('ScrollTrigger refreshed.'); // Debug log removed
      } else {
         ScrollTrigger.refresh();
        //  console.log('ScrollTrigger refreshed (no LocoScroll).'); // Debug log removed
      }
      //  console.log('HMR update applied potentially.'); // Debug log removed
    }
  });

  // Optional: More granular cleanup if specific modules are updated
  // module.hot.accept('./path/to/module.js', () => { ... });
} 