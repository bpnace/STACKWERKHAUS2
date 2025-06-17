// Text Reveal Animation for Service Cards
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initTextRevealAnimation() {
  // Select all service mini cards
  const serviceCards = document.querySelectorAll('.service-mini-card');
  
  if (serviceCards.length === 0) return;

  // For each service card
  serviceCards.forEach(card => {
    // Get the paragraph text
    const paragraph = card.querySelector('p');
    if (!paragraph) return;
    
    // Get the text content
    const text = paragraph.textContent;
    // Clear the paragraph
    paragraph.textContent = '';
    
    // Create a wrapper for the characters
    const wrapper = document.createElement('span');
    wrapper.classList.add('text-reveal-wrapper');
    paragraph.appendChild(wrapper);
    
    // Split the text into individual characters
    [...text].forEach(char => {
      // Create a span for each character
      const charSpan = document.createElement('span');
      charSpan.classList.add('text-reveal-char');
      charSpan.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
      wrapper.appendChild(charSpan);
    });
    
    // Create the animation
    gsap.fromTo(
      card.querySelectorAll('.text-reveal-char'),
      {
        opacity: 0,
        y: 20,
        rotateX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.02, // Time between each character animation
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%", // Start animation when the card is 80% in view
          toggleActions: "play none none none" // Play animation once when scrolled into view
        }
      }
    );
  });
} 