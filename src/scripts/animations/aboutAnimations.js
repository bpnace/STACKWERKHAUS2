import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAboutAnimations() {
  const aboutHeadline = document.querySelector('.about-section .section-headline-large');
  const aboutSection = document.querySelector('.about-section');
  if (!aboutHeadline || !aboutSection) return;

  // Split headline into .about-word and .about-letter spans (preserve .headline-tag)
  function splitHeadlineText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      const words = node.textContent.split(/(\s+)/); // Split by spaces, keep spaces
      words.forEach(word => {
        if (/^\s+$/.test(word)) {
          // Just whitespace, append as is
          frag.appendChild(document.createTextNode(word));
        } else if (word.length > 0) {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'about-word';
          wordSpan.style.display = 'inline-block';
          for (const char of word) {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'about-letter';
            letterSpan.style.display = 'inline-block';
            letterSpan.textContent = char;
            wordSpan.appendChild(letterSpan);
          }
          frag.appendChild(wordSpan);
        }
      });
      return frag;
    } else if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('headline-tag')) {
      return node;
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
  const originalNodes = Array.from(aboutHeadline.childNodes);
  aboutHeadline.innerHTML = '';
  originalNodes.forEach(node => {
    aboutHeadline.appendChild(splitHeadlineText(node));
  });

  // Animate all .about-letter elements when about section scrolls into view
  gsap.from('.about-section .section-headline-large .about-letter', {
    opacity: 0,
    y: 60,
    stagger: 0.04,
    duration: 1.5,
    ease: 'expo.out',
    delay: 0.1,
    scrollTrigger: {
      trigger: aboutSection,
      start: 'top 80%',
      once: true
    }
  });
} 