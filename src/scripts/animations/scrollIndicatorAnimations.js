import { gsap } from 'gsap';

export function initScrollIndicatorAnimation() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    gsap.to(scrollIndicator, {
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      duration: 0.8
    });
  }
} 