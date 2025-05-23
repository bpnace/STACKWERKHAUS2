export function initParticles(selector, options = {}) {
  const container = document.querySelector(selector);
  if (!container) return;

  const {
    quantity = 60,
    color = '#fff',
    size = 3,
    staticity = 50,
    ease = 50,
    vx = 0.2,
    vy = 0.2
  } = options;

  // Clear previous particles
  container.innerHTML = '';

  // Create particles
  for (let i = 0; i < quantity; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.background = color;
    p.style.width = p.style.height = `${size + Math.random() * size}px`;
    p.style.position = 'absolute';
    p.style.borderRadius = '50%';
    p.style.opacity = 0.7 + Math.random() * 0.3;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    container.appendChild(p);

    // Animate
    const animate = () => {
      const toX = (Math.random() - 0.5) * staticity;
      const toY = (Math.random() - 0.5) * staticity;
      p.animate([
        { transform: 'translate(0,0)' },
        { transform: `translate(${toX}px,${toY}px)` }
      ], {
        duration: 3000 + Math.random() * 2000,
        direction: 'alternate',
        iterations: Infinity,
        easing: 'ease-in-out'
      });
    };
    animate();
  }
} 