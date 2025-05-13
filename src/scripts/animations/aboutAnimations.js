import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAboutAnimations(scrollContainer) {
  const aboutSectionEl = document.querySelector('.about-section');
  const aboutImage = document.querySelector('.about-image');
  const aboutText = document.querySelector('.about-text');

  if (aboutSectionEl && aboutImage && aboutText && scrollContainer) {
    gsap.from(aboutImage, {
      scrollTrigger: {
        trigger: aboutSectionEl,
        scroller: scrollContainer,
        start: 'top 80%',
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    gsap.from(aboutText, {
      scrollTrigger: {
        trigger: aboutSectionEl,
        scroller: scrollContainer,
        start: 'top 80%',
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }
} 