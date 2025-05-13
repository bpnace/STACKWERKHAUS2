import { gsap } from 'gsap';

export function initPageLoadAnimation() {
  // Page Load Fade-In
  gsap.from('body', { opacity: 0, duration: 1, ease: 'power2.inOut' });
} 