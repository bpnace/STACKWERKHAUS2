/**
 * Popup Manager - Handles all popup card interactions with improved scrolling
 */
class PopupManager {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      // Only keep utility functions, remove modal event listeners
      // this.init();
      this.fixScrollingForAllCards();
    });
  }

  // Only keep scroll fix utility for other popups if needed
  fixScrollingForAllCards() {
    const cards = document.querySelectorAll('.legal-card, .lebenslauf-card');
    cards.forEach(card => {
      const content = card.querySelector('.legal-content, .lebenslauf-content');
      if (!content) return;
      content.setAttribute('tabindex', '0');
      card.addEventListener('wheel', (e) => {
        if (card.classList.contains('visible')) {
          if (content.scrollHeight > content.clientHeight) {
            e.stopPropagation();
          }
        }
      }, { passive: false });
      card.addEventListener('mousewheel', (e) => {
        if (card.classList.contains('visible')) {
          if (content.scrollHeight > content.clientHeight) {
            e.stopPropagation();
          }
        }
      }, { passive: false });
      content.addEventListener('touchstart', (e) => {
        if (e.target.closest('a')) return;
        e.stopPropagation();
      }, { passive: true });
    });
  }
}

const popupManager = new PopupManager();
export default popupManager; 