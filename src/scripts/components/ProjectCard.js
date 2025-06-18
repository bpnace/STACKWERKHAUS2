class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const subtitle = this.getAttribute('subtitle');
    const image = this.getAttribute('image');
    const revealedImage = this.getAttribute('revealed-image');
    const isVideo = revealedImage && (revealedImage.endsWith('.webm') || revealedImage.endsWith('.mp4'));
    // Special handling for bloom_video.webm which is larger
    const isLargeVideo = isVideo && revealedImage.includes('bloom_video');
    
    this.shadowRoot.innerHTML = `
      <style>
        /*
          1080x1350px ratio = 4:5 (portrait)
        */
        *, *::before, *::after {
          box-sizing: border-box;
        }
        .project {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          width: 100%;
          height: auto;
          aspect-ratio: 4 / 5;
          margin: 0 auto;
          text-decoration: none;
          transition: box-shadow 0.3s;
        }

        .img-wrapper {
          position: relative;
          width: 100%;
          height: auto;
          aspect-ratio: 4 / 5;
          display: flex;
          align-items: stretch;
          justify-content: center;
          overflow: hidden;
        }

        .pixelated-image-card__default,
        .pixelated-image-card__active,
        .pixelated-image-card__pixels {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .pixelated-image-card__default {
          z-index: 1;
        }

        .pixelated-image-card__active {
          z-index: 2;
          display: none;
        }

        .pixelated-image-card__pixels {
          z-index: 3;
          pointer-events: none;
        }

        .pixelated-image-card__pixel {
          background: var(--accent-color);
          opacity: 0.7;
          border-radius: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          display: none;
          margin: 0;
          box-sizing: border-box;
        }

        .pixelated-image-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          position: relative;
        }

        @media (max-width: 900px) {
          .project {
            min-height: 300px;
            height: auto;
            max-height: none;
          }
          .img-wrapper {
            min-height: 180px;
          }
        }

        .title, .subtitle {
          color: inherit !important;
        }
      </style>
      <div class="project">
        <div class="img-wrapper" data-pixelated-image-reveal>
          <div class="pixelated-image-card__default">
            <img class="pixelated-image-card__img" loading="lazy" src="${image}" alt="${title}" />
          </div>
          <div class="pixelated-image-card__active" data-pixelated-image-reveal-active>
                          ${isVideo
                ? `<video class="pixelated-image-card__video${isLargeVideo ? ' lazy-load' : ''}" ${isLargeVideo ? 'data-src' : 'src'}="${revealedImage}" muted loop playsinline preload="none" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;"></video>`
                : `<img class="pixelated-image-card__img" loading="lazy" src="${revealedImage}" alt="${title} revealed" />`
              }
          </div>
          <div class="pixelated-image-card__pixels" data-pixelated-image-reveal-grid></div>
        </div>
        <h2 class="title">${title}</h2>
        <span class="subtitle">${subtitle}</span>
      </div>
    `;
    // Expose a method to play/pause video for reveal logic
    this.playRevealedVideo = () => {
      if (isVideo) {
        const video = this.shadowRoot.querySelector('.pixelated-image-card__video');
        if (video) {
          video.currentTime = 0;
          video.play();
        }
      }
    };
    this.pauseRevealedVideo = () => {
      if (isVideo) {
        const video = this.shadowRoot.querySelector('.pixelated-image-card__video');
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }
    };
  }
}

customElements.define('project-card', ProjectCard); 