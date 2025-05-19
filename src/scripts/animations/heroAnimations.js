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

  // --- FIXED: True Parallax (Hero scrolls slower than body) ---
  if (heroSectionEl) {
    ScrollTrigger.create({
      trigger: heroSectionEl,
      start: "top top",
      end: () => `+=${window.innerHeight}`,
      scrub: true,
      onUpdate: self => {
        // Move hero at 0.4x scroll speed (slower than scroll)
        const progress = self.progress;
        const maxY = window.innerHeight * 0.6; // 1 - 0.4 = 0.6, so hero lags behind
        gsap.to(heroSectionEl, { y: progress * maxY, overwrite: 'auto', ease: 'none', duration: 0 });
      }
    });
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

  // Animate hero shadow overlay opacity on scroll
  const heroShadow = document.querySelector('.hero-shadow-overlay');
  if (heroShadow && heroSectionEl) {
    // Ensure overlay starts transparent
    gsap.set(heroShadow, { opacity: 0 });
    gsap.to(heroShadow, {
      opacity: 0.5, // Max 0.5 darkness at end of hero scroll
      ease: "none",
      scrollTrigger: {
        trigger: heroSectionEl,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }
} 