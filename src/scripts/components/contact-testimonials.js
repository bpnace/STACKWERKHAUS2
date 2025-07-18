import { gsap } from 'gsap';

const testimonials = [
  {
    text: "Stackwerkhaus hat unsere Website von Grund auf neu konzipiert. Klar strukturiert, technisch sauber und absolut zielgruppenorientiert. Seit dem Relaunch verzeichnen wir signifikant mehr Leads.",
    name: "Viktoria Lindner",
    role: "CEO, Bloom",
    img: "assets/testi/Viki.webp"
  },
  {
    text: "Wir wollten einen modernen Auftritt mit Charakter. Bekommen haben wir ein starkes Markenerlebnis. Stackwerkhaus war dabei kreativ, schnell und super organisiert.",
    name: "Lena Hoffmann",
    role: "Marketing Lead, UrbanNest",
    img: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    text: "Einfach top! Technisch solide, kommunikativ stark. Genau das, was man sich von einer Agentur wünscht.",
    name: "Jonas Weber",
    role: "CTO, Greenlytic",
    img: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    text: "Selten ein Team erlebt, das so gut zuhört und daraus clevere und funktionale Lösungen entwickelt. Stackwerkhaus denkt nicht nur mit, sie denken voraus.",
    name: "Sophie Bauer",
    role: "Co-Founder, MindfulTech",
    img: "https://randomuser.me/api/portraits/women/23.jpg"
  },
  {
    text: "Schnell, digital, zuverlässig. Unsere Website läuft. Und wir auch, dank der neuen Anfragen.",
    name: "Lukas Fischer",
    role: "CEO, BerlinBytes",
    img: "https://randomuser.me/api/portraits/men/21.jpg"
  },
  {
    text: "Die Kommunikation war glasklar. Das Ergebnis richtig stark. So geht Zusammenarbeit auf Augenhöhe.",
    name: "Julia Schmitt",
    role: "CEO, MediaLab",
    img: "https://randomuser.me/api/portraits/women/31.jpg"
  },
  {
    text: "Wir hatten eine veraltete Seite. Jetzt haben wir ein echtes Vertriebstool. Stackwerkhaus hat das Ding gerockt 💪",
    name: "Tim Neumann",
    role: "Head of Sales, Finovate",
    img: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    text: "Unsere neue SaaS-Landingpage lädt doppelt so schnell und konvertiert deutlich besser. Stackwerkhaus weiß, was sie tun.",
    name: "Sebastian Krüger",
    role: "Product Manager, CloudSync",
    img: "https://randomuser.me/api/portraits/men/40.jpg"
  },
  {
    text: "Vom Kick-off bis zum Launch hat alles reibungslos funktioniert. Klare Prozesse, kreative Ideen, zuverlässige Umsetzung.",
    name: "Carla Neumann",
    role: "Head of Operations, EventHive",
    img: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    text: "Also ehrlich: Wir dachten, das wird 'ne Baustelle. Stattdessen war alles fix, klar kommuniziert und läuft jetzt wie 'ne Eins. Richtig gut gemacht, Stackwerkhaus!",
    name: "Marc Richter",
    role: "CMO, LegalEase",
    img: "https://randomuser.me/api/portraits/men/48.jpg"
  }
];

let resizeTimeout;
let gsapTimelines = [];
let isIntersecting = false;
let observer;

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
    
    // Setup animation only when testimonials are visible in viewport
    setupAnimationWithIntersection(wrapper, colHeight, isMobile);
  }, 200);
}

// Function to start/pause animation based on visibility
function setupAnimationWithIntersection(wrapper, colHeight, isMobile) {
  const parentContainer = document.getElementById('contact-info-card');
  if (!parentContainer) return;
  
  // Create animation but pause it initially
  const scrollDistance = wrapper.scrollHeight - colHeight;
  gsap.set(wrapper, { y: 0 });
  
  // Adjust speed based on mobile/desktop
  const duration = isMobile ? 90 : 120; // Slightly faster on mobile
  
  const tl = gsap.timeline({
    repeat: -1,
    defaults: { ease: 'none' },
    paused: true // Start paused
  });
  
  tl.to(wrapper, {
    y: -scrollDistance,
    duration: duration,
    onRepeat: () => {
      gsap.set(wrapper, { y: 0 });
    }
  });
  
  gsapTimelines.push(tl);
  
  // Setup intersection observer
  if (observer) {
    observer.disconnect();
  }
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start animation when visible
        isIntersecting = true;
        tl.play();
      } else {
        // Pause animation when not visible
        isIntersecting = false;
        tl.pause();
      }
    });
  }, {
    threshold: 0.1, // Trigger when at least 10% is visible
    rootMargin: '0px'
  });
  
  observer.observe(parentContainer);
  
  // Add event listeners to prevent scroll issues on mobile
  if (isMobile) {
    // Prevent touch events on the testimonials container from affecting page scroll
    parentContainer.addEventListener('touchstart', e => {
      if (isIntersecting) {
        e.preventDefault();
      }
    }, { passive: false });
    
    parentContainer.addEventListener('touchmove', e => {
      if (isIntersecting) {
        e.preventDefault();
      }
    }, { passive: false });
  }
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
  
  // Clean up function to remove observers when component is unmounted
  return function cleanup() {
    if (observer) {
      observer.disconnect();
    }
    clearTestimonials();
  };
} 