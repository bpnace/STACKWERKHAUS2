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
import popupManager from './utils/popupManager'; // Import the new popup manager

// Import animation modules
import { initPageLoadAnimation } from './animations/pageLoadAnimations';
import { initHeroAnimations } from './animations/heroAnimations';
import './components/ProjectCard'; // Web Component registration
import { initSeeMoreButtonAnimations } from './animations/seeMoreButtonAnimations';
import { initCustomCheckbox } from './components/ContactForm';
import { initMobileNav } from './components/MobileNav'; // Import mobile nav
import { initContactSection } from './components/contact';
import { createIridescenceEffect } from './components/iridescence';

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

  // Initialize mobile navigation
  initMobileNav();

  // 3. GSAP Ticker (Optional - alternative way to drive Lenis, not usually needed with raf loop)
  // gsap.ticker.add((time) => {
  //   lenis.raf(time * 1000); // Lenis expects milliseconds
  // });
  // gsap.ticker.lagSmoothing(0);

  // 5. Initialize all Page Animations
  // These functions should now internally use the default scroller (window)
  initPageLoadAnimation(); 

  // 6. Initial GSAP .set() calls for FOUC prevention and stability
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

  // Add smooth scroll for the placeholder card and any other in-page links
  const inPageLinks = document.querySelectorAll('a[href^="#"]:not(header nav a):not(.header-cta a)');
  inPageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        // Use the same easing as navigation links
        lenis.scrollTo(target, { offset: 0, duration: 1.2, easing: (t) => -(Math.cos(Math.PI * t) - 1) / 2 });
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

  // Animate all section headlines (including hero) with the same 'pocket' style
  const allHeadlines = document.querySelectorAll('.section-headline-large');
  allHeadlines.forEach(headline => {
    const splitText = headlineAnimator.splitText(headline);
    if (splitText) {
      headlineAnimator.animateHeadline(splitText, {
        stagger: 0.05,
        duration: 0.8,
        ease: 'power2.out',
        y: 100,
        delay: 0.2,
        scrollTrigger: headline.classList.contains('hero-title') ? false : {
          trigger: headline,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      });
    }
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

  // --- FAQ Section Animation and Accordion Logic ---
  const initFaqSection = () => {
    // Handle FAQ items in the FAQ section
    const faqItems = document.querySelectorAll('.faq-section .faq-item');
    if (faqItems.length > 0) {
      faqItems.forEach((item, index) => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('.faq-answer');
        // Set initial state
        gsap.set(item, { opacity: 0, y: 30 });
        // Create scroll trigger for each FAQ item
        ScrollTrigger.create({
          trigger: item,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: index * 0.1
            });
          }
        });
        // Make sure we have proper height for animation
        const height = answer.offsetHeight;
        // Reset for initial closed state
        gsap.set(answer, { 
          height: 0,
          opacity: 0,
          overflow: 'hidden'
        });
        // Create accordion functionality
        if (question && answer) {
          // Create plus/minus indicator if it doesn't exist
          if (!question.querySelector('.faq-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'faq-indicator';
            indicator.innerHTML = '+';
            question.appendChild(indicator);
          }
          // Add click event to toggle answer
          question.addEventListener('click', () => {
            const isOpen = answer.classList.contains('open');
            // Close any open answers except this one
            document.querySelectorAll('.faq-section .faq-answer.open').forEach(openAnswer => {
              if (openAnswer !== answer) {
                const openQuestion = openAnswer.previousElementSibling;
                const openIndicator = openQuestion.querySelector('.faq-indicator');
                gsap.to(openAnswer, {
                  height: 0,
                  opacity: 0,
                  duration: 0.4,
                  ease: 'power2.out',
                  onComplete: () => {
                    openAnswer.classList.remove('open');
                    openAnswer.style.height = '';
                  }
                });
                if (openIndicator) {
                  gsap.to(openIndicator, {
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power1.out'
                  });
                }
              }
            });
            // Toggle current answer
            const indicator = question.querySelector('.faq-indicator');
            if (!isOpen) {
              answer.classList.add('open');
              gsap.to(answer, {
                height: answer.scrollHeight,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
              });
              if (indicator) {
                gsap.to(indicator, {
                  rotation: 135,
                  duration: 0.3,
                  ease: 'power1.out'
                });
              }
            } else {
              gsap.to(answer, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.out',
                onComplete: () => {
                  answer.classList.remove('open');
                  answer.style.height = '';
                }
              });
              if (indicator) {
                gsap.to(indicator, {
                  rotation: 0,
                  duration: 0.3,
                  ease: 'power1.out'
                });
              }
            }
          });
        }
      });
    }
    // Handle the profile image parallax effect
    const profileImage = document.querySelector('.faq-section .profile-image');
    if (profileImage) {
      ScrollTrigger.create({
        trigger: '.faq-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const yMove = self.progress * 30; // 30px of movement (subtle)
          gsap.set(profileImage, {
            y: yMove,
            ease: 'none'
          });
        }
      });
    }
    // Ensure the "read more" button in the FAQ section also opens the lebenslauf card
    const faqReadMoreBtn = document.querySelector('.faq-section .read-more-btn');
    const blurOverlay = document.querySelector('.blur-overlay');
    const lebenslaufCard = document.querySelector('.lebenslauf-card');
    const closeLebenslaufBtn = lebenslaufCard ? lebenslaufCard.querySelector('.close-card-btn') : null;
    if (faqReadMoreBtn && blurOverlay && lebenslaufCard) {
      faqReadMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        blurOverlay.classList.add('visible');
        lebenslaufCard.classList.add('visible');
        document.body.classList.add('modal-open');
        if (window.lenisInstance) window.lenisInstance.stop();
        // Body scroll lock pattern
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100vw';
        document.body.style.overflow = 'hidden';
        document.body.dataset.scrollY = scrollY;
        // Scroll modal content to top
        const content = lebenslaufCard.querySelector('.lebenslauf-content');
        if (content) content.scrollTop = 0;
        return false;
      });
    }
    if (closeLebenslaufBtn && blurOverlay && lebenslaufCard) {
      closeLebenslaufBtn.addEventListener('click', () => {
        blurOverlay.classList.remove('visible');
        lebenslaufCard.classList.remove('visible');
        document.body.classList.remove('modal-open');
        if (window.lenisInstance) window.lenisInstance.start();
        // Restore body scroll
        const scrollY = document.body.dataset.scrollY ? parseInt(document.body.dataset.scrollY, 10) : 0;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        delete document.body.dataset.scrollY;
        window.scrollTo(0, scrollY);
      });
    }
  };
  // Initialize the FAQ section
  initFaqSection();
  
  // Initialize contact animations and form
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

  // --- Footer Logo GSAP Animation (Seamless Loop) ---
  const footerLogoTrack = document.querySelector('.footer-logo-track');
  if (footerLogoTrack) {
    // First ensure we have enough content to create a proper loop
    const originalContent = footerLogoTrack.innerHTML;
    const viewportWidth = window.innerWidth;
    
    // Clear and rebuild with clean content
    footerLogoTrack.innerHTML = originalContent;
    
    // Now ensure we have enough copies for smooth looping
    // (at least 3 sets to ensure seamless transition)
    while (footerLogoTrack.scrollWidth < viewportWidth * 3) {
      footerLogoTrack.innerHTML += originalContent;
    }
    
    // Calculate animation duration based on content width (consistent speed regardless of width)
    const totalWidth = footerLogoTrack.scrollWidth;
    const singleSetWidth = totalWidth / (footerLogoTrack.innerHTML.split(originalContent).length - 1);
    const duration = singleSetWidth * 0.03; // adjust this multiplier to control speed
    
    // Create seamless animation - animate to exactly one set width
    const tl = gsap.timeline({ repeat: -1, defaults: {ease: 'none'} });
    tl.to(footerLogoTrack, {
      x: -singleSetWidth,
      duration: duration,
      ease: "linear",
      onComplete: function() {
        // Reset position without visual jump by adjusting the x position
        gsap.set(footerLogoTrack, { x: 0 });
      }
    });
  }

  // --- Custom modal logic for legal cards (Impressum, Datenschutz, AGB) ---
  const impressumBtn = document.getElementById('impressum-btn');
  const datenschutzBtn = document.getElementById('datenschutz-btn');
  const agbBtn = document.getElementById('agb-btn');
  const impressumCard = document.querySelector('.impressum-card');
  const datenschutzCard = document.querySelector('.datenschutz-card');
  const agbCard = document.querySelector('.agb-card');
  const closeLegalBtns = document.querySelectorAll('.legal-card .close-card-btn');

  const blurOverlay = document.querySelector('.blur-overlay');

  // Contact information unobfuscation for legitimate users
  function unobfuscateContactInfo() {
    const contactProtected = document.querySelectorAll('.contact-protected');
    contactProtected.forEach(element => {
      const spans = element.querySelectorAll('span[style*="display:none"]');
      if (spans.length > 0) {
        let unobfuscatedText = '';
        spans.forEach(span => {
          span.style.display = 'inline';
          unobfuscatedText += span.textContent;
        });
        
        // Make contact info clickable for better UX
        if (element.dataset.contact === 'email') {
          element.innerHTML = `<a href="mailto:${unobfuscatedText}">${unobfuscatedText}</a>`;
        } else if (element.dataset.contact === 'phone') {
          const cleanPhone = unobfuscatedText.replace(/\s+/g, '');
          element.innerHTML = `<a href="tel:${cleanPhone}">${unobfuscatedText}</a>`;
        }
      }
    });
  }

  function openLegalModal(card) {
    if (!card) return;
    card.classList.add('visible');
    document.body.classList.add('modal-open');
    if (window.lenisInstance) window.lenisInstance.stop();
    // Body scroll lock pattern
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100vw';
    document.body.style.overflow = 'hidden';
    document.body.dataset.scrollY = scrollY;
    // Show blur overlay
    if (blurOverlay) blurOverlay.classList.add('visible');
  }

  function closeLegalModal(card) {
    if (!card) return;
    card.classList.remove('visible');
    document.body.classList.remove('modal-open');
    if (window.lenisInstance) window.lenisInstance.start();
    // Restore body scroll
    const scrollY = document.body.dataset.scrollY ? parseInt(document.body.dataset.scrollY, 10) : 0;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    delete document.body.dataset.scrollY;
    window.scrollTo(0, scrollY);
    // Hide blur overlay
    if (blurOverlay) blurOverlay.classList.remove('visible');
  }

  if (impressumBtn && impressumCard) {
    impressumBtn.addEventListener('click', (e) => {
      e.preventDefault();
      unobfuscateContactInfo(); // Unobfuscate when user clicks
      openLegalModal(impressumCard);
    });
  }
  if (datenschutzBtn && datenschutzCard) {
    datenschutzBtn.addEventListener('click', (e) => {
      e.preventDefault();
      unobfuscateContactInfo(); // Unobfuscate when user clicks
      openLegalModal(datenschutzCard);
    });
  }
  if (agbBtn && agbCard) {
    agbBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal(agbCard);
    });
  }
  closeLegalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.legal-card');
      closeLegalModal(card);
    });
  });

  initContactSection();

  // Add iridescence effect to the 'Dein Projekt?' placeholder card only
  const deinProjektCard = Array.from(document.querySelectorAll('.project.placeholder-card')).find(card => {
    const title = card.querySelector('.title');
    return title && title.textContent.trim() === 'Dein Projekt?';
  });
  if (deinProjektCard) {
    createIridescenceEffect({
      container: deinProjektCard,
      color: [1, 1, 1],
      speed: 1.0,
      amplitude: 0.1,
      mouseReact: true,
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