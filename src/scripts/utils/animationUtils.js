import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const headlineAnimator = {
  splitText(headlineElement) {
    if (!headlineElement) return null;
    
    // Store and temporarily remove the headline tag if it exists
    const headlineTag = headlineElement.querySelector('.headline-tag');
    if (headlineTag) {
      headlineTag.remove();
    }
    
    // If the headline already contains <span> children, treat each as a line/word and split into letters
    const childSpans = Array.from(headlineElement.children).filter(el => el.tagName === 'SPAN' && !el.classList.contains('headline-tag'));
    if (childSpans.length > 0) {
      childSpans.forEach(span => {
        if (!span.classList.contains('headline-word')) {
          span.classList.add('headline-word');
        }
        // Only split if not already split
        if (!span.querySelector('.headline-letter')) {
          const text = span.textContent;
          span.innerHTML = '';
          text.split('').forEach(char => {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'headline-letter';
            letterSpan.style.display = 'inline-block';
            if (char === ' ') {
              letterSpan.innerHTML = '&nbsp;';
              letterSpan.classList.add('is-space');
            } else {
              letterSpan.textContent = char;
            }
            span.appendChild(letterSpan);
          });
        }
      });
      // Re-append the headline tag if it existed
      if (headlineTag) {
        headlineElement.appendChild(headlineTag);
      }
      return headlineElement;
    }
    
    // Otherwise, split plain text into words and letters (legacy behavior)
    const words = headlineElement.textContent.trim().split(/\s+/);
    headlineElement.innerHTML = '';
    
    words.forEach(word => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'headline-word';
      wordSpan.style.display = 'inline-block';
      
      word.split('').forEach(char => {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'headline-letter';
        letterSpan.style.display = 'inline-block';
        letterSpan.textContent = char;
        wordSpan.appendChild(letterSpan);
      });
      
      headlineElement.appendChild(wordSpan);
      // Add space after word
      headlineElement.appendChild(document.createTextNode(' '));
    });
    
    // Re-append the headline tag if it existed
    if (headlineTag) {
      headlineElement.appendChild(headlineTag);
    }
    
    return headlineElement;
  },
  
  animateHeadline(element, options = {}) {
    if (!element) return null;
    
    const defaults = {
      stagger: 0.04,
      duration: 1.5,
      ease: 'expo.out',
      delay: 0.1,
      y: 60,
      opacity: 0
    };
    
    const settings = { ...defaults, ...options };
    
    // Don't animate the headline tag
    const letters = Array.from(element.querySelectorAll('.headline-letter'));
    
    // Create the animation
    const tl = gsap.timeline({
      scrollTrigger: settings.scrollTrigger || {
        trigger: element,
        start: 'top 80%',
        once: true
      }
    });
    
    // Animate letters
    tl.from(letters, {
      opacity: settings.opacity,
      y: settings.y,
      stagger: settings.stagger,
      duration: settings.duration,
      ease: settings.ease,
      delay: settings.delay
    });
    
    // Ensure headline tag is visible immediately if it exists
    const headlineTag = element.querySelector('.headline-tag');
    if (headlineTag) {
      gsap.set(headlineTag, { opacity: 1, y: 0 });
    }
    
    return tl;
  }
};

export const scrollFadeIn = (element, options = {}) => {
  if (!element) return null;
  
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    start: 'top 80%'
  };
  
  const settings = { ...defaults, ...options };
  
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: settings.start,
      toggleActions: 'play none none reverse'
    },
    y: settings.y,
    opacity: settings.opacity,
    duration: settings.duration,
    ease: settings.ease
  });
};

export const createParallax = (element, options = {}) => {
  if (!element) return null;
  
  const defaults = {
    speed: 0.5,
    start: 'top top',
    end: 'bottom top'
  };
  
  const settings = { ...defaults, ...options };
  
  return ScrollTrigger.create({
    trigger: element,
    start: settings.start,
    end: settings.end,
    scrub: true,
    onUpdate: self => {
      const y = self.progress * 100 * settings.speed;
      gsap.set(element, { y: y });
    }
  });
}; 