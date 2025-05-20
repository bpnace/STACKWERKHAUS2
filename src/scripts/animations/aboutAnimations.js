import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Generic function to split and animate a section headline
function animateSectionHeadline({ sectionSelector, headlineSelector, wordClass = 'headline-word', letterClass = 'headline-letter', triggerStart = 'top 80%' }) {
  const section = document.querySelector(sectionSelector);
  const headline = section ? section.querySelector(headlineSelector) : null;
  if (!headline || !section) return;

  // Split headline into word/letter spans, preserve .headline-tag
  function splitHeadlineText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      const words = node.textContent.split(/(\s+)/); // Split by spaces, keep spaces
      words.forEach(word => {
        if (/^\s+$/.test(word)) {
          frag.appendChild(document.createTextNode(word));
        } else if (word.length > 0) {
          const wordSpan = document.createElement('span');
          wordSpan.className = wordClass;
          wordSpan.style.display = 'inline-block';
          for (const char of word) {
            const letterSpan = document.createElement('span');
            letterSpan.className = letterClass;
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
  const originalNodes = Array.from(headline.childNodes);
  headline.innerHTML = '';
  originalNodes.forEach(node => {
    headline.appendChild(splitHeadlineText(node));
  });

  // Animate all .headline-letter elements when section scrolls into view
  gsap.from(`${sectionSelector} ${headlineSelector} .${letterClass}`, {
    opacity: 0,
    y: 60,
    stagger: 0.04,
    duration: 1.5,
    ease: 'expo.out',
    delay: 0.1,
    scrollTrigger: {
      trigger: section,
      start: triggerStart,
      once: true
    }
  });
}

export function initAboutAnimations() {
  animateSectionHeadline({
    sectionSelector: '.about-section',
    headlineSelector: '.section-headline-large',
    wordClass: 'about-word',
    letterClass: 'about-letter',
    triggerStart: 'top 80%'
  });

  animateSectionHeadline({
    sectionSelector: '.projects-section',
    headlineSelector: '.section-headline-large',
    wordClass: 'projects-word',
    letterClass: 'projects-letter',
    triggerStart: 'top 80%'
  });
} 