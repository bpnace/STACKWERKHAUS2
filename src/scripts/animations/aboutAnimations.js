import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAboutAnimations(scrollContainer) {
  const aboutSectionEl = document.querySelector('.about-section');
  const aboutImage = document.querySelector('.about-image');
  const aboutText = document.querySelector('.about-text');

  if (aboutSectionEl && aboutImage && aboutText) {
    gsap.from(aboutImage, {
      scrollTrigger: {
        trigger: aboutSectionEl,
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
        start: 'top 80%',
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }
} 