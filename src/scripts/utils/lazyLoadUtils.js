/**
 * Utility functions for lazy loading media (videos and images)
 */

/**
 * Initialize lazy loading for videos
 * This function finds all videos with the 'lazy-video' class and sets up
 * Intersection Observer to load them only when they come into view
 */
export function initLazyVideos() {
  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    // If not supported, load all videos immediately
    document.querySelectorAll('video.lazy-video').forEach(video => {
      loadVideo(video);
    });
    return;
  }

  const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadVideo(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '100px 0px', // Start loading when video is 100px from viewport
    threshold: 0.01
  });

  // Observe all videos with lazy-video class
  document.querySelectorAll('video.lazy-video').forEach(video => {
    videoObserver.observe(video);
  });
}

/**
 * Load a video by replacing data-src attributes with actual src attributes
 * @param {HTMLVideoElement} videoElement - The video element to load
 */
function loadVideo(videoElement) {
  // Get all source elements inside the video
  const sources = videoElement.querySelectorAll('source');
  
  sources.forEach(source => {
    if (source.dataset.src) {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
    }
  });

  // Load the video
  videoElement.load();
  
  // If the video was set to autoplay, start playing once loaded
  if (videoElement.hasAttribute('data-autoplay')) {
    videoElement.play().catch(e => console.log('Auto-play was prevented:', e));
    videoElement.removeAttribute('data-autoplay');
  }
  
  // Remove lazy-video class as it's no longer needed
  videoElement.classList.remove('lazy-video');
}

/**
 * Initialize lazy loading for project card videos
 * This function finds all project cards with video content and sets up
 * lazy loading for them
 */
export function initLazyProjectVideos() {
  // Check if custom elements are defined
  if (!customElements.get('project-card')) {
    return;
  }

  const projectCards = document.querySelectorAll('project-card');
  
  if (!('IntersectionObserver' in window)) {
    // If Intersection Observer is not supported, do nothing
    // The videos will load normally through the component
    return;
  }

  const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const projectCard = entry.target;
        const videoSrc = projectCard.getAttribute('revealed-image');
        
        // Only proceed if it's a video
        if (videoSrc && (videoSrc.endsWith('.webm') || videoSrc.endsWith('.mp4'))) {
          // Preload the video in a more compatible way
          const preloadVideo = document.createElement('video');
          preloadVideo.preload = 'metadata';
          preloadVideo.src = videoSrc;
          preloadVideo.style.display = 'none';
          preloadVideo.muted = true;
          document.body.appendChild(preloadVideo);
          
          // Remove the preload video after it's loaded
          preloadVideo.addEventListener('loadedmetadata', () => {
            document.body.removeChild(preloadVideo);
          });
        }
        
        observer.unobserve(projectCard);
      }
    });
  }, {
    rootMargin: '200px 0px', // Preload when project card is 200px from viewport
    threshold: 0.01
  });

  // Observe all project cards
  projectCards.forEach(card => {
    projectObserver.observe(card);
  });
} 