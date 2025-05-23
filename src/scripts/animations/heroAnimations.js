import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimations() {
  const headerEl = document.querySelector('header');
  const heroSectionEl = document.querySelector('.hero');

  // Header Scroll Trigger
  if (headerEl && heroSectionEl) {
    ScrollTrigger.create({
      trigger: heroSectionEl,
      start: "bottom 80px", // When hero bottom reaches header height
      end: "bottom 80px",
      onEnter: () => headerEl.classList.add("scrolled"),
      onLeaveBack: () => headerEl.classList.remove("scrolled")
    });
  }

  // --- TRUE PARALLAX: Hero scrolls at 0.4x speed, both directions ---
  if (heroSectionEl) {
    let st;
    function setupParallax() {
      const maxY = window.innerHeight * 0.4;
      if (st) st.kill();
      st = ScrollTrigger.create({
        trigger: heroSectionEl,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: self => {
          const progress = self.progress;
          gsap.set(heroSectionEl, { y: progress * maxY });
        }
      });
      // Set initial position based on initial progress (fix Chrome jump)
      gsap.set(heroSectionEl, { y: st.progress * maxY });
      ScrollTrigger.refresh();
    }
    setupParallax();
    window.addEventListener('resize', setupParallax);
  }

  // Hero Title Staggered Animation - LETTER BY LETTER
  const heroTitleWordSpans = document.querySelectorAll('.hero-title > span');
  
  if (heroTitleWordSpans.length > 0) {
    heroTitleWordSpans.forEach(wordSpan => {
      const text = wordSpan.textContent;
      const letters = text.split('');
      wordSpan.innerHTML = '';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      letters.forEach(letter => {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'hero-letter';
        letterSpan.style.display = 'inline-block';
        letterSpan.textContent = (letter === ' ') ? '\u00A0' : letter;
        wordSpan.appendChild(letterSpan);
      });
    });
    gsap.from(".hero-title .hero-letter", {
      opacity: 0,
      y: 60,
      stagger: 0.04,
      duration: 1.5,
      ease: 'expo.out',
      delay: 0.6
    });
  }

  // Hero Shadow Overlay Animation
  const heroShadow = document.querySelector('.hero-shadow-overlay');
  if (heroShadow && heroSectionEl) {
    gsap.set(heroShadow, { opacity: 0 });
    gsap.to(heroShadow, {
      opacity: 0.5,
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