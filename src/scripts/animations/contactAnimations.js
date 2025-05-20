import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Split and animate the contact section headline
function animateContactHeadline() {
  const section = document.querySelector('.contact-section');
  const headline = section ? section.querySelector('.section-headline-large') : null;
  if (!headline || !section) return;

  // Split headline into word/letter spans
  function splitHeadlineText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      const words = node.textContent.split(/(\s+)/); // Split by spaces, keep spaces
      words.forEach(word => {
        if (/^\s+$/.test(word)) {
          frag.appendChild(document.createTextNode(word));
        } else if (word.length > 0) {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'headline-word';
          wordSpan.style.display = 'inline-block';
          for (const char of word) {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'headline-letter';
            letterSpan.style.display = 'inline-block';
            letterSpan.textContent = char;
            wordSpan.appendChild(letterSpan);
          }
          frag.appendChild(wordSpan);
        }
      });
      return frag;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const frag = document.createDocumentFragment();
      node.childNodes.forEach(child => {
        frag.appendChild(splitHeadlineText(child));
      });
      return frag;
    }
    return document.createDocumentFragment();
  }

  // Replace headline content with split spans
  const originalNodes = Array.from(headline.childNodes);
  headline.innerHTML = '';
  originalNodes.forEach(node => {
    headline.appendChild(splitHeadlineText(node));
  });

  // Animate all .headline-letter elements when section scrolls into view
  gsap.from('.contact-section .section-headline-large .headline-letter', {
    opacity: 0,
    y: 60,
    stagger: 0.04,
    duration: 1.5,
    ease: 'expo.out',
    delay: 0.1,
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      once: true
    }
  });
}

export function initContactAnimations() {
  animateContactHeadline();
} 