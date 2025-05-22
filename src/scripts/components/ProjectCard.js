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
    
    this.shadowRoot.innerHTML = `
      <style>
        .project {
          display: flex;
          flex-direction: column;
          background: #fff;
          overflow: hidden;
          min-height: 540px;
          height: 80vh;
          max-height: 700px;
          width: 100%;
          margin: 0 auto;
          text-decoration: none;
          color: var(--primary-text-color);
          transition: box-shadow 0.3s;
        }

        .img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 5;
          display: flex;
          align-items: stretch;
          justify-content: center;
          background: #eee;
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
          background: var(--accent-color, #00b894);
          opacity: 0.7;
          border-radius: 2px;
          position: absolute;
          width: 100%;
          height: 100%;
          display: none;
        }

        .pixelated-image-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 900px) {
          .project {
            min-height: 400px;
            height: auto;
            max-height: none;
          }
          .img-wrapper {
            min-height: 220px;
          }
        }
      </style>
      <a class="project" href="#" tabindex="0">
        <div class="img-wrapper" data-pixelated-image-reveal>
          <div class="pixelated-image-card__default">
            <img class="pixelated-image-card__img" src="${image}" alt="${title}" />
          </div>
          <div class="pixelated-image-card__active" data-pixelated-image-reveal-active>
            <img class="pixelated-image-card__img" src="${revealedImage}" alt="${title} revealed" />
          </div>
          <div class="pixelated-image-card__pixels" data-pixelated-image-reveal-grid></div>
        </div>
        <h2 class="title">${title}</h2>
        <span class="subtitle">${subtitle}</span>
      </a>
    `;
  }
}

customElements.define('project-card', ProjectCard); 