/**
 * Mobile Navigation Component
 * Clean implementation of mobile menu with GSAP animations
 */

import { gsap } from 'gsap';

export function initMobileNav() {
  // DOM Elements
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  const mobileCloseButton = document.querySelector('.mobile-close-button');
  const header = document.querySelector('header');
  
  // Check if required elements exist
  if (!mobileMenuToggle || !mobileNavOverlay || !mobileNav || !header) {
    console.warn('Mobile navigation elements not found');
    return;
  }
  
  // Initialize
  let isMenuOpen = false;
  
  // Set initial states
  gsap.set(mobileNavOverlay, { 
    autoAlpha: 0, // Combines visibility and opacity
    display: 'none',
    xPercent: 100 // Start from right side of the screen
  });
  
  gsap.set(mobileNavLinks, {
    opacity: 0,
    x: 50 // Start links from right side
  });
  
  // Create separate timelines for opening and closing
  const openTimeline = gsap.timeline({
    paused: true,
    onStart: () => {
      // Ensure overlay is visible at start
      mobileNavOverlay.style.display = 'flex';
      mobileNavOverlay.style.visibility = 'visible';
    }
  });
  
  const closeTimeline = gsap.timeline({
    paused: true,
    onComplete: () => {
      // Hide overlay when animation completes
      mobileNavOverlay.style.display = 'none';
      mobileNavOverlay.style.visibility = 'hidden';
    }
  });
  
  // Opening animation - slide in from right
  openTimeline
    .to(mobileNavOverlay, { 
      autoAlpha: 1,
      xPercent: 0, // Slide in from right
      duration: 0.5,
      ease: 'power3.out'
    })
    .to(mobileNavLinks, { 
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.4
    }, '-=0.3');
    
  // Closing animation - slide out to right
  closeTimeline
    .to(mobileNavLinks, { 
      opacity: 0,
      x: 50,
      stagger: 0.05,
      duration: 0.3
    })
    .to(mobileNavOverlay, { 
      autoAlpha: 0,
      xPercent: 100, // Slide out to right
      duration: 0.5,
      ease: 'power3.in'
    }, '-=0.2');
  
  // Toggle menu function
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    // Update UI state immediately
    mobileMenuToggle.setAttribute('aria-expanded', isMenuOpen);
    document.body.classList.toggle('menu-open', isMenuOpen);
    
    if (isMenuOpen) {
      // Stop any running animations
      closeTimeline.pause(0);
      
      // Disable scrolling if Lenis is available
      if (window.lenisInstance) {
        window.lenisInstance.stop();
      }
      
      // Play opening animation
      openTimeline.restart();
    } else {
      // Stop any running animations
      openTimeline.pause();
      
      // Enable scrolling if Lenis is available
      if (window.lenisInstance) {
        window.lenisInstance.start();
      }
      
      // Play closing animation
      closeTimeline.restart();
    }
  }
  
  // Event Listeners
  mobileMenuToggle.addEventListener('click', toggleMenu);
  
  // Add event listener for the dedicated close button
  if (mobileCloseButton) {
    mobileCloseButton.addEventListener('click', () => {
      if (isMenuOpen) {
        toggleMenu();
      }
    });
  }
  
  // Close menu when clicking links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const href = link.getAttribute('href');
      
      // Close the menu first
      if (isMenuOpen) {
        toggleMenu();
        
        // Handle smooth scroll to sections after menu animation completes
        if (href && href.startsWith('#')) {
          setTimeout(() => {
            const targetSection = document.querySelector(href);
            if (targetSection && window.lenisInstance) {
              // Calculate offset based on screen size
              const isMobile = window.innerWidth <= 768;
              const offset = isMobile ? -40 : 0; // Negative offset for mobile to show section titles
              
              window.lenisInstance.scrollTo(targetSection, {
                duration: 1.2,
                offset: offset,
                easing: (t) => -(Math.cos(Math.PI * t) - 1) / 2
              });
            }
          }, 700); // Wait for menu close animation
        }
      } else {
        // If menu is already closed, scroll immediately
        if (href && href.startsWith('#')) {
          const targetSection = document.querySelector(href);
          if (targetSection && window.lenisInstance) {
            // Calculate offset based on screen size
            const isMobile = window.innerWidth <= 768;
            const offset = isMobile ? -80 : 0; // Negative offset for mobile to show section titles
            
            window.lenisInstance.scrollTo(targetSection, {
              duration: 1.2,
              offset: offset,
              easing: (t) => -(Math.cos(Math.PI * t) - 1) / 2
            });
          }
        }
      }
    });
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu();
    }
  });
  
  // Close when clicking outside the menu
  mobileNavOverlay.addEventListener('click', (e) => {
    // Only close if clicking directly on the overlay (not on links or close button)
    if (e.target === mobileNavOverlay && isMenuOpen) {
      toggleMenu();
    }
  });
} 