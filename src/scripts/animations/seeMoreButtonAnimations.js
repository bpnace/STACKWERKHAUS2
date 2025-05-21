import { gsap } from 'gsap';

export function initSeeMoreButtonAnimations() {
  const seeMoreButton = document.querySelector('.see-more-button');
  if (!seeMoreButton) return;

  const textContent = seeMoreButton.querySelector('.text-content');
  const arrowDownSvg = seeMoreButton.querySelector('.arrow-down svg');
  const circleFill = seeMoreButton.querySelector('.circle-fill');

  if (!textContent || !arrowDownSvg || !circleFill) {
    console.warn('.see-more-button or its inner elements not found for animation.');
    return;
  }

  const DURATION_STANDARD = 0.5; // For text/arrow color
  const DURATION_SHUTTER = 0.8; // Slower for shutter/blur reveal
  const EASE_FLUID = 'expo.out';

  const hoverTimeline = gsap.timeline({ paused: true });

  hoverTimeline
    // Button border animation removed for no border on hover
    
    // Text color to white (remains white)
    .to(textContent, {
      color: 'var(--secondary-text-color)',
      duration: DURATION_STANDARD,
      ease: EASE_FLUID
    }, 0)
    // Arrow color to white (remains white)
    .to(arrowDownSvg, {
      stroke: 'var(--secondary-text-color)',
      duration: DURATION_STANDARD,
      ease: EASE_FLUID
    }, 0)
    // Shutter/Blur effect on .circle-fill
    .to(circleFill, {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      filter: 'blur(8px)',
      duration: DURATION_SHUTTER,
      ease: EASE_FLUID
    }, 0);
    // backgroundColor for circleFill is set in SCSS and doesn't need to animate here

  seeMoreButton.addEventListener('mouseenter', () => {
    hoverTimeline.play();
  });

  seeMoreButton.addEventListener('mouseleave', () => {
    hoverTimeline.reverse();
  });

  seeMoreButton.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    // Use Lenis if available, otherwise fallback to native smooth scroll
    if (aboutSection && window.lenisInstance) {
      window.lenisInstance.scrollTo(aboutSection);
    } else if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
} 