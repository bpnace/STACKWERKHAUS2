/**
 * Enhanced lazy loading utility using Intersection Observer API
 */

export function initLazyLoading() {
  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    // Create a new IntersectionObserver instance
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Handle different element types
          if (element.tagName === 'IMG') {
            // Handle image elements
            if (element.dataset.src) {
              element.src = element.dataset.src;
              element.removeAttribute('data-src');
            }
          } else if (element.tagName === 'VIDEO') {
            // Handle video elements
            if (element.dataset.src) {
              element.src = element.dataset.src;
              element.removeAttribute('data-src');
            }
            
            // If video has source children with data-src
            const sources = element.querySelectorAll('source[data-src]');
            sources.forEach(source => {
              source.src = source.dataset.src;
              source.removeAttribute('data-src');
            });
            
            // If the video should autoplay when visible
            if (element.hasAttribute('data-autoplay-on-visible')) {
              element.play().catch(error => {
                console.warn('Auto-play was prevented:', error);
              });
            }
            
            // Load the video content
            if (element.hasAttribute('preload') && element.getAttribute('preload') === 'none') {
              element.load();
            }
          } else if (element.tagName === 'IFRAME') {
            // Handle iframe elements
            if (element.dataset.src) {
              element.src = element.dataset.src;
              element.removeAttribute('data-src');
            }
          }
          
          // Add a class to indicate the element has been loaded
          element.classList.add('lazy-loaded');
          
          // Stop observing the element
          observer.unobserve(element);
        }
      });
    }, {
      // Options for the observer
      rootMargin: '200px 0px', // Start loading when element is 200px from viewport
      threshold: 0.01 // Trigger when at least 1% of the element is visible
    });
    
    // Observe all elements with the lazy-load class
    document.querySelectorAll('.lazy-load').forEach(element => {
      lazyLoadObserver.observe(element);
    });
    
    // Also observe elements with native loading="lazy" as a fallback
    document.querySelectorAll('img[loading="lazy"], video[loading="lazy"], iframe[loading="lazy"]').forEach(element => {
      // Only observe if it doesn't already have the lazy-load class
      if (!element.classList.contains('lazy-load')) {
        lazyLoadObserver.observe(element);
      }
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    console.log('Intersection Observer not supported, using native lazy loading only');
  }
}

// Helper function to convert elements to use data-src pattern
export function convertToDataSrcPattern() {
  // Convert videos
  document.querySelectorAll('video[loading="lazy"]:not(.lazy-load)').forEach(video => {
    // Convert video src to data-src
    if (video.src) {
      video.dataset.src = video.src;
      video.removeAttribute('src');
    }
    
    // Convert source elements
    video.querySelectorAll('source').forEach(source => {
      source.dataset.src = source.src;
      source.removeAttribute('src');
    });
    
    video.classList.add('lazy-load');
  });
  
  // Convert large images that are below the fold
  document.querySelectorAll('img[loading="lazy"]:not(.lazy-load)').forEach(img => {
    // Only convert images that are likely below the fold
    const rect = img.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      img.dataset.src = img.src;
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
      img.classList.add('lazy-load');
    }
  });
} 