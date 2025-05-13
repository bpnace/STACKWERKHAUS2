import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initProjectAnimations(scrollContainer) {
  const projectsSectionEl = document.querySelector('.projects-section');
  const projectCards = document.querySelectorAll('.project-card');

  if (projectCards.length > 0 && projectsSectionEl && scrollContainer) {
    gsap.from(projectCards, {
      scrollTrigger: {
        trigger: projectsSectionEl,
        scroller: scrollContainer,
        start: 'top 80%',
      },
      opacity: 0,
      scale: 0.95,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out'
    });
  }
} 