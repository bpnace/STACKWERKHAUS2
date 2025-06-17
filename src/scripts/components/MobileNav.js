/**
 * Mobile Navigation Component
 * Handles the functionality of the mobile menu
 */

import { gsap } from 'gsap';

export function initMobileNav() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  const header = document.querySelector('header');
  
  if (!mobileMenuToggle || !mobileNavOverlay || !header) return;
  
  // Ensure mobile nav is properly hidden on initialization
  gsap.set(mobileNavOverlay, { opacity: 0, pointerEvents: 'none' });
  mobileNavOverlay.classList.remove('active');
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    const isOpen = mobileNavOverlay.classList.contains('active');
    
    if (!isOpen) {
      // Open menu
      mobileNavOverlay.classList.add('active');
      header.classList.add('menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      
      // Animate links
      gsap.fromTo(
        '.mobile-nav a',
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.4, 
          ease: 'power2.out',
          delay: 0.2
        }
      );
      
      // Stop scrolling if Lenis is available
      if (window.lenisInstance) {
        window.lenisInstance.stop();
      }
    } else {
      // Close menu
      mobileNavOverlay.classList.remove('active');
      header.classList.remove('menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      
      // Resume scrolling if Lenis is available
      if (window.lenisInstance) {
        window.lenisInstance.start();
      }
    }
  }
  
  // Add event listeners
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  
  // Close menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNavOverlay.classList.remove('active');
      header.classList.remove('menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      
      if (window.lenisInstance) {
        window.lenisInstance.start();
      }
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
      toggleMobileMenu();
    }
  });

  // Close menu when clicking outside nav
  mobileNavOverlay.addEventListener('mousedown', (e) => {
    if (
      e.target === mobileNavOverlay || // overlay background
      e.target.classList.contains('mobile-nav-overlay')
    ) {
      mobileNavOverlay.classList.remove('active');
      header.classList.remove('menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      if (window.lenisInstance) window.lenisInstance.start();
    }
  });
} 