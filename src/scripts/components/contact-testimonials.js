import { gsap } from 'gsap';

const testimonials = [
  // German testimonials
  { text: "Stackwerkhaus hat unsere Vision perfekt umgesetzt. Die neue Website hat unsere Kundenzahlen verdoppelt und das Nutzererlebnis auf ein neues Level gehoben. Tarik versteht es, Technik und Design harmonisch zu verbinden.", name: "Viktoria Lindner", role: "CEO, Bloom", img: "assets/testi/Viki.webp" },
  { text: "Stackwerkhaus hat unser Branding revolutioniert. Schnelle Umsetzung und kreative Ideen!", name: "Lena Hoffmann", role: "Marketing Lead, UrbanNest", img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { text: "Die Zusammenarbeit war unkompliziert und professionell. Absolute Empfehlung!", name: "Jonas Weber", role: "CTO, Greenlytic", img: "https://randomuser.me/api/portraits/men/15.jpg" },
  { text: "Innovative Lösungen und ein tolles Team. Wir freuen uns auf weitere Projekte!", name: "Sophie Bauer", role: "Co-Founder, MindfulTech", img: "https://randomuser.me/api/portraits/women/23.jpg" },
  { text: "Schnell, kreativ, digital. Stackwerkhaus ist unser Partner für Webprojekte.", name: "Lukas Fischer", role: "CEO, BerlinBytes", img: "https://randomuser.me/api/portraits/men/21.jpg" },
  { text: "Die Ergebnisse waren beeindruckend und die Kommunikation stets transparent.", name: "Julia Schmitt", role: "CEO, MediaLab", img: "https://randomuser.me/api/portraits/women/31.jpg" },
  { text: "Stackwerkhaus hat unsere Website modernisiert und für mehr Leads gesorgt.", name: "Tim Neumann", role: "Head of Sales, Finovate", img: "https://randomuser.me/api/portraits/men/33.jpg" }
];

let resizeTimeout;
let gsapTimelines = [];

function clearTestimonials() {
  gsapTimelines.forEach(tl => tl && tl.kill());
  gsapTimelines = [];
  const col1 = document.getElementById('testimonials-col-1');
  if (col1) col1.innerHTML = '';
}

function createTestimonialItem(t) {
  const item = document.createElement('div');
  item.className = 'testimonial-item';
  item.innerHTML = `
    <div class="testimonial-text">${t.text}</div>
    <div class="testimonial-profile">
      <img src="${t.img}" alt="${t.name}" />
      <div class="testimonial-profile-info">
        <div class="testimonial-profile-name">${t.name}</div>
        <div class="testimonial-profile-role">${t.role}</div>
      </div>
    </div>
  `;
  return item;
}

function renderTestimonials() {
  clearTestimonials();
  const isMobile = window.innerWidth < 600;
  
  const col1 = document.getElementById('testimonials-col-1');
  if (!col1) return;

  // Always use single column layout
    const wrapper = document.createElement('div');
    wrapper.className = 'testimonials-list';
    col1.appendChild(wrapper);
  
  // Add testimonials to the wrapper
    testimonials.forEach(t => wrapper.appendChild(createTestimonialItem(t)));
  
  // Duplicate testimonials for seamless scrolling
    setTimeout(() => {
      const parent = col1.closest('.contact-info-card');
      const colHeight = parent ? parent.offsetHeight : col1.offsetHeight;
      const itemEls = wrapper.querySelectorAll('.testimonial-item');
    
      if (itemEls.length === 0) return;
    
      const itemHeight = itemEls[0].offsetHeight + parseFloat(getComputedStyle(itemEls[0]).marginBottom);
      const singleSetHeight = itemHeight * testimonials.length;
    
      // Duplicate testimonials at least once for seamless looping
      while (wrapper.scrollHeight < colHeight + singleSetHeight) {
        testimonials.forEach(t => wrapper.appendChild(createTestimonialItem(t)));
      }
    
      // Add one more set for seamlessness
      testimonials.forEach(t => wrapper.appendChild(createTestimonialItem(t)));
    
    // Animate wrapper upward
      const scrollDistance = wrapper.scrollHeight - colHeight;
      gsap.set(wrapper, { y: 0 });
    
    // Adjust speed based on mobile/desktop
    const duration = isMobile ? 90 : 120; // Slightly faster on mobile
    
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
      tl.to(wrapper, {
        y: -scrollDistance,
        duration: duration,
        onRepeat: () => {
          gsap.set(wrapper, { y: 0 });
        }
      });
    
        gsapTimelines.push(tl);
      }, 200);
}

export function initContactTestimonials() {
  renderTestimonials();
  
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Re-render on resize to adjust for mobile/desktop
        renderTestimonials();
    }, 200);
  });
} 