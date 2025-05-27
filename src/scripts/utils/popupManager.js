/**
 * Popup Manager - Handles all popup card interactions with improved scrolling
 */
class PopupManager {
  constructor() {
    // Find all elements once the DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  init() {
    // Overlay
    this.blurOverlay = document.querySelector('.blur-overlay');
    
    // Buttons
    this.impressumBtn = document.getElementById('impressum-btn');
    this.datenschutzBtn = document.getElementById('datenschutz-btn');
    this.readMoreBtn = document.querySelector('.read-more-btn');
    
    // Cards
    this.impressumCard = document.querySelector('.impressum-card');
    this.datenschutzCard = document.querySelector('.datenschutz-card');
    this.lebenslaufCard = document.querySelector('.lebenslauf-card');
    
    // Close buttons
    this.closeButtons = document.querySelectorAll('.close-card-btn');
    
    // Set up event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Open Impressum popup
    if (this.impressumBtn) {
      this.impressumBtn.addEventListener('click', () => {
        this.openPopup(this.impressumCard);
      });
    }
    
    // Open Datenschutz popup
    if (this.datenschutzBtn) {
      this.datenschutzBtn.addEventListener('click', () => {
        this.openPopup(this.datenschutzCard);
      });
    }
    
    // Open Lebenslauf popup
    if (this.readMoreBtn) {
      this.readMoreBtn.addEventListener('click', () => {
        this.openPopup(this.lebenslaufCard);
      });
    }
    
    // Close popup when clicking on overlay
    if (this.blurOverlay) {
      this.blurOverlay.addEventListener('click', () => {
        this.closeAllPopups();
      });
    }
    
    // Close popup when clicking on close button
    if (this.closeButtons) {
      this.closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          this.closeAllPopups();
        });
      });
    }
    
    // Close popup when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllPopups();
      }
    });
    
    // Fix scrolling in all cards
    this.fixScrollingForAllCards();
  }

  fixScrollingForAllCards() {
    // Get all cards and their content areas
    const cards = document.querySelectorAll('.legal-card, .lebenslauf-card');
    
    cards.forEach(card => {
      const content = card.querySelector('.legal-content, .lebenslauf-content');
      if (!content) return;
      
      // Make content directly scrollable
      content.setAttribute('tabindex', '0');
      
      // Ensure wheel events on the card are handled correctly
      card.addEventListener('wheel', (e) => {
        if (card.classList.contains('visible')) {
          if (content.scrollHeight > content.clientHeight) {
            // Only if content is scrollable
            e.stopPropagation();
          }
        }
      }, { passive: false });
      
      // Also handle mousewheel for older browsers
      card.addEventListener('mousewheel', (e) => {
        if (card.classList.contains('visible')) {
          if (content.scrollHeight > content.clientHeight) {
            e.stopPropagation();
          }
        }
      }, { passive: false });
      
      // Fix iOS Safari scroll issues
      content.addEventListener('touchstart', (e) => {
        if (e.target.closest('a')) return; // Allow links to be clickable
        e.stopPropagation();
      }, { passive: true });
    });
  }

  openPopup(popup) {
    if (!popup) return;
    
    // Force overlay repaint to ensure it's visible before showing
    if (this.blurOverlay) {
      this.blurOverlay.style.display = 'none';
      this.blurOverlay.offsetHeight; // Force reflow
      this.blurOverlay.style.display = 'block';
    }
    
    // Set explicit z-index on popup to ensure it's above overlay
    popup.style.zIndex = '1001';
    
    // Make sure popup background is solid
    popup.style.backgroundColor = 'var(--background-color)';
    
    // Add visible class to overlay and popup
    this.blurOverlay.classList.add('visible');
    popup.classList.add('visible');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Ensure the content can be scrolled with mouse wheel
    this.enableMouseWheelScroll(popup);
  }

  closeAllPopups() {
    // Remove visible class from overlay
    if (this.blurOverlay) {
      this.blurOverlay.classList.remove('visible');
    }
    
    // Find all visible popups and hide them
    const visiblePopups = document.querySelectorAll('.legal-card.visible, .lebenslauf-card.visible');
    visiblePopups.forEach(popup => {
      popup.classList.remove('visible');
    });
    
    // Re-enable body scrolling
    document.body.style.overflow = '';
  }
  
  enableMouseWheelScroll(popup) {
    // Find the scrollable content inside popup
    const content = popup.querySelector('.legal-content, .lebenslauf-content');
    if (!content) return;
    
    // Make sure the content has tabindex to receive focus
    content.setAttribute('tabindex', '0');
    
    // Ensure the content is focusable and scrollable
    setTimeout(() => {
      // Focus the content to enable mouse wheel scrolling
      content.focus({preventScroll: true});
      
      // Make sure pointer events go to content
      content.style.pointerEvents = 'auto';
    }, 100);
  }
}

// Initialize the popup manager
const popupManager = new PopupManager();

export default popupManager; 