import { gsap } from 'gsap';

const testimonials = [
  // German
  { text: "Stackwerkhaus hat unser Branding revolutioniert. Schnelle Umsetzung und kreative Ideen!", name: "Lena Hoffmann", role: "Marketing Lead, UrbanNest", img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { text: "Die Zusammenarbeit war unkompliziert und professionell. Absolute Empfehlung!", name: "Jonas Weber", role: "CTO, Greenlytic", img: "https://randomuser.me/api/portraits/men/15.jpg" },
  { text: "Innovative Lösungen und ein tolles Team. Wir freuen uns auf weitere Projekte!", name: "Sophie Bauer", role: "Co-Founder, MindfulTech", img: "https://randomuser.me/api/portraits/women/23.jpg" },
  { text: "Schnell, kreativ, digital. Stackwerkhaus ist unser Partner für Webprojekte.", name: "Lukas Fischer", role: "CEO, BerlinBytes", img: "https://randomuser.me/api/portraits/men/21.jpg" },
  { text: "Die Ergebnisse waren beeindruckend und die Kommunikation stets transparent.", name: "Julia Schmitt", role: "Geschäftsführerin, MediaLab", img: "https://randomuser.me/api/portraits/women/31.jpg" },
  { text: "Stackwerkhaus hat unsere Website modernisiert und für mehr Leads gesorgt.", name: "Tim Neumann", role: "Head of Sales, Finovate", img: "https://randomuser.me/api/portraits/men/33.jpg" },
  { text: "Die beste Agentur für Startups in Berlin!", name: "Mara Klein", role: "Product Owner, Foodly", img: "https://randomuser.me/api/portraits/women/45.jpg" },
  { text: "Stackwerkhaus versteht, was junge Unternehmen brauchen. Danke für die tolle Zusammenarbeit!", name: "Felix Richter", role: "Co-Founder, HealthPilot", img: "https://randomuser.me/api/portraits/men/47.jpg" },
  { text: "Super Beratung und Umsetzung. Wir sind begeistert!", name: "Paul König", role: "Projektmanager, EventPilot", img: "https://randomuser.me/api/portraits/men/71.jpg" },
  { text: "Stackwerkhaus ist unser Geheimtipp für Webentwicklung in Berlin.", name: "Laura Becker", role: "Head of Digital, GreenSpace", img: "https://randomuser.me/api/portraits/women/74.jpg" },
  { text: "Von der Idee bis zum Launch – alles aus einer Hand. Danke!", name: "Jan Meier", role: "Startup Founder, RideBee", img: "https://randomuser.me/api/portraits/men/77.jpg" },
  { text: "Unsere Conversion ist deutlich gestiegen. Danke Stackwerkhaus!", name: "Nina Lorenz", role: "UX Lead, Shoply", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  // English
  { text: "Stackwerkhaus delivered a stunning product on time. The team is creative and super responsive.", name: "Emily Carter", role: "COO, BrightPath", img: "https://randomuser.me/api/portraits/women/52.jpg" },
  { text: "We loved the fresh ideas and the attention to detail. Highly recommended!", name: "Michael Johnson", role: "Founder, NextGenAI", img: "https://randomuser.me/api/portraits/men/54.jpg" },
  { text: "Stackwerkhaus made our vision a reality. Great communication and results!", name: "Sarah Lee", role: "Design Lead, Cloudwise", img: "https://randomuser.me/api/portraits/women/61.jpg" },
  { text: "The best digital partner for any startup. Fast, reliable, and innovative.", name: "David Brown", role: "CEO, UrbanFleet", img: "https://randomuser.me/api/portraits/men/62.jpg" },
  { text: "Creative, fast, and always on point. Will work with them again!", name: "Anna Müller", role: "Product Manager, CodeNest", img: "https://randomuser.me/api/portraits/women/36.jpg" },
  { text: "Stackwerkhaus brought our brand to life online.", name: "Tom Becker", role: "Founder, Startify", img: "https://randomuser.me/api/portraits/men/38.jpg" },
  { text: "Great results, great people. Highly recommended!", name: "Svenja Klein", role: "Marketing, LocalHero", img: "https://randomuser.me/api/portraits/women/39.jpg" }
];

let currentMode = null; // 'single' or 'double'
let resizeTimeout;
let gsapTimelines = [];

function clearTestimonials() {
  gsapTimelines.forEach(tl => tl && tl.kill());
  gsapTimelines = [];
  const col1 = document.getElementById('testimonials-col-1');
  const col2 = document.getElementById('testimonials-col-2');
  if (col1) col1.innerHTML = '';
  if (col2) col2.innerHTML = '';
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
  const isSingle = window.innerWidth < 950;
  currentMode = isSingle ? 'single' : 'double';
  const col1 = document.getElementById('testimonials-col-1');
  const col2 = document.getElementById('testimonials-col-2');
  if (!col1) return;

  if (isSingle) {
    // Merge all testimonials into one column
    const wrapper = document.createElement('div');
    wrapper.className = 'testimonials-list';
    col1.appendChild(wrapper);
    testimonials.forEach(t => wrapper.appendChild(createTestimonialItem(t)));
    // Duplicate until wrapper is at least (visible area + one set) tall
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
      // Animate wrapper upward by (wrapper height - visible area)
      const scrollDistance = wrapper.scrollHeight - colHeight;
      gsap.set(wrapper, { y: 0 });
      const duration = 120; // Slower scroll for single column
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
    if (col2) col2.innerHTML = '';
  } else {
    // Two columns, round-robin
    const colTestimonials = [[], []];
    testimonials.forEach((t, i) => {
      colTestimonials[i % 2].push(t);
    });
    [col1, col2].forEach((col, colIdx) => {
      if (!col) return;
      const tList = colTestimonials[colIdx];
      const wrapper = document.createElement('div');
      wrapper.className = 'testimonials-list';
      col.appendChild(wrapper);
      tList.forEach(t => wrapper.appendChild(createTestimonialItem(t)));
      setTimeout(() => {
        const colHeight = col.offsetHeight;
        const itemEls = wrapper.querySelectorAll('.testimonial-item');
        if (itemEls.length === 0) return;
        const itemHeight = itemEls[0].offsetHeight + parseFloat(getComputedStyle(itemEls[0]).marginBottom);
        const singleSetHeight = itemHeight * tList.length;
        while (wrapper.scrollHeight < colHeight + singleSetHeight) {
          tList.forEach(t => wrapper.appendChild(createTestimonialItem(t)));
        }
        const scrollDistance = wrapper.scrollHeight - colHeight;
        gsap.set(wrapper, { y: 0 });
        const duration = (colIdx === 0 ? 60 : 75);
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
    });
  }
}

export function initContactTestimonials() {
  renderTestimonials();
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Only re-render if mode changes
      const isSingle = window.innerWidth < 950;
      if ((isSingle && currentMode !== 'single') || (!isSingle && currentMode !== 'double')) {
        renderTestimonials();
      }
    }, 200);
  });
} 