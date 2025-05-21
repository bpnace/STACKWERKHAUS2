class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const subtitle = this.getAttribute('subtitle');
    const image = this.getAttribute('image');
    const blurredImage = this.getAttribute('blurred-image');
    
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
          flex: 1 1 auto;
          min-height: 350px;
          max-height: 70%;
          display: flex;
          align-items: stretch;
          justify-content: center;
          background: #eee;
          overflow: hidden;
        }

        .img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
          pointer-events: none;
        }

        .imgBlurred {
          z-index: 1;
          filter: blur(16px) brightness(0.9);
          opacity: 1;
        }

        .normalImg {
          z-index: 2;
          opacity: 1;
        }

        .project:hover .normalImg,
        .project:focus .normalImg {
          opacity: 0.2;
        }

        .title {
          font-family: 'Switzer', Helvetica, Arial, sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-text-color);
          margin: 1.5rem 0 0.5rem 0;
          line-height: 1.1;
          display: flex;
        }

        .subtitle {
          font-family: 'Switzer', Helvetica, Arial, sans-serif;
          font-size: 1.15rem;
          color: var(--primary-text-light);
          font-weight: 500;
          margin-bottom: 0;
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
        <div class="img-wrapper">
          <img class="img imgBlurred" src="${blurredImage}" alt="${title} blurred" />
          <img class="img normalImg" src="${image}" alt="${title}" />
        </div>
        <h2 class="title">${title}</h2>
        <span class="subtitle">${subtitle}</span>
      </a>
    `;
  }
}

customElements.define('project-card', ProjectCard); 