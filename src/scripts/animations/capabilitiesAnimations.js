import { gsap } from 'gsap'; // Draggable is part of gsap core in v3+
import { Draggable } from 'gsap/Draggable'; // Still good to import for clarity and if tree-shaking specifics

export function initCapabilitiesAnimations() {
  const capabilitiesGrid = document.querySelector('.capabilities-grid');
  const capabilitiesContainer = document.querySelector('.capabilities-container');

  if (capabilitiesGrid && capabilitiesContainer) {
    Draggable.create(capabilitiesGrid, {
      type: 'x',
      bounds: capabilitiesContainer, // Use the DOM element directly
      inertia: true,
      edgeResistance: 0.65,
      // throwProps: true // throwProps is a Club GreenSock feature, ensure it's available or remove
    });
  }
} 