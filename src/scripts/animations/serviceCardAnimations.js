import gsap from 'gsap';

// Simple initialization function with no animations or mouse interactions
export function initServiceCardAnimations() {
  // Select all service cards
  const serviceCards = document.querySelectorAll('.service-mini-card');
  
  if (!serviceCards.length) return; // Exit if no cards found
  
  // Set initial state for all cards
  serviceCards.forEach(card => {
    gsap.set(card, {
      y: 0,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)',
      scale: 1
    });
    
    // Add hover animation
    card.addEventListener('mouseenter', () => {
      // Kill any existing animations to prevent conflicts
      gsap.killTweensOf(card);
      
      gsap.to(card, {
        y: -5, // Subtle upward movement
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)', // Slightly stronger shadow
        scale: 1.02, // Very subtle scale
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto' // Ensure this animation takes precedence
      });
      
      // Animate the icon with a slight bounce
      const icon = card.querySelector('.service-icon');
      if (icon) {
        // Kill any existing animations on the icon
        gsap.killTweensOf(icon);
        
        gsap.to(icon, {
          y: -3,
          scale: 1.05,
          duration: 0.5,
          ease: 'back.out(1.5)',
          overwrite: 'auto' // Ensure this animation takes precedence
        });
      }
      
      // Subtle text color change for the heading
      const heading = card.querySelector('h3');
      if (heading) {
        // Kill any existing animations on the heading
        gsap.killTweensOf(heading);
        
        gsap.to(heading, {
          color: 'var(--accent-color)',
          duration: 0.3,
          ease: 'power1.out',
          overwrite: 'auto' // Ensure this animation takes precedence
        });
      }
    });
    
    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
      // Kill any existing animations to prevent conflicts
      gsap.killTweensOf(card);
      
      gsap.to(card, {
        y: 0,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)',
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto' // Ensure this animation takes precedence
      });
      
      // Reset the icon
      const icon = card.querySelector('.service-icon');
      if (icon) {
        // Kill any existing animations on the icon
        gsap.killTweensOf(icon);
        
        gsap.to(icon, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto' // Ensure this animation takes precedence
        });
      }
      
      // Reset heading color
      const heading = card.querySelector('h3');
      if (heading) {
        // Kill any existing animations on the heading
        gsap.killTweensOf(heading);
        
        gsap.to(heading, {
          color: 'inherit',
          duration: 0.3,
          ease: 'power1.out',
          overwrite: 'auto' // Ensure this animation takes precedence
        });
      }
    });
  });
}