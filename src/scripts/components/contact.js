import { initContactTestimonials } from './contact-testimonials';

export function initContactSection() {
  const container = document.getElementById('contact-info-card');
  if (!container) return;
  container.innerHTML = `
    <div class="contact-testimonials">
      <div class="contact-testimonials__col" id="testimonials-col-1"></div>
    </div>
  `;
  initContactTestimonials();
} 