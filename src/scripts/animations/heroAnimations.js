import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initHeroAnimations(scrollContainer) {
  const headerEl = document.querySelector('header');
  const heroSectionEl = document.querySelector('.hero');

  // Header Scroll Trigger
  if (headerEl && heroSectionEl) {
    ScrollTrigger.create({
      trigger: heroSectionEl,
      start: "bottom top",
      onEnter: () => headerEl.classList.add("scrolled"),
      onLeaveBack: () => headerEl.classList.remove("scrolled"),
    });
  }

  // Hero Pinning & Parallax Timeline
  if (heroSectionEl) {
    gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionEl,
        pin: true,
        pinSpacing: false,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      }
    })
    .to(heroSectionEl, { yPercent: -30, ease: "none" }, 0);
  }

  // Hero Title Staggered Animation - LETTER BY LETTER
  const heroTitleWordSpans = document.querySelectorAll('.hero-title > span');
  
  if (heroTitleWordSpans.length > 0) {
    heroTitleWordSpans.forEach(wordSpan => {
      const text = wordSpan.textContent;
      const letters = text.split('');
      wordSpan.innerHTML = ''; // Clear the original word span
      
      // Style the wordSpan to act as a clipping mask for the letters
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      // Optional: Add a tiny padding if letters get clipped at the bottom.
      // wordSpan.style.paddingBottom = '2px'; 

      letters.forEach(letter => {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'hero-letter';
        letterSpan.style.display = 'inline-block';
        letterSpan.textContent = (letter === ' ') ? '\u00A0' : letter;
        wordSpan.appendChild(letterSpan);
      });
    });

    // Animate all .hero-letter elements
    gsap.from(".hero-title .hero-letter", {
      opacity: 0,
      y: 60, // Start further down to be hidden by the parent's overflow
      stagger: 0.04, // Further decreased stagger for less difference between letters
      duration: 1.5, // Increased duration for a slower animation
      ease: 'expo.out', // Smoother ease
      delay: 0.6
    });
  }
} 