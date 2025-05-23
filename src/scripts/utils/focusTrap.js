export class FocusTrap {
  constructor(element) {
    this.element = element;
    this.focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
  }

  trap() {
    this.previouslyFocused = document.activeElement;
    this.handleFocus = this.handleFocus.bind(this);
    document.addEventListener('keydown', this.handleFocus);
    
    // Set initial focus
    if (this.firstFocusable) {
      this.firstFocusable.focus();
    }
  }

  release() {
    document.removeEventListener('keydown', this.handleFocus);
    if (this.previouslyFocused && typeof this.previouslyFocused.focus === 'function') {
      this.previouslyFocused.focus();
    }
  }

  handleFocus(e) {
    if (e.key !== 'Tab') return;
    
    if (!this.firstFocusable || !this.lastFocusable) return;
    
    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusable) {
        e.preventDefault();
        this.lastFocusable.focus();
      }
    } else {
      if (document.activeElement === this.lastFocusable) {
        e.preventDefault();
        this.firstFocusable.focus();
      }
    }
  }
}

// Usage example:
/*
const modal = document.querySelector('.modal');
const focusTrap = new FocusTrap(modal);

// When opening modal
focusTrap.trap();

// When closing modal
focusTrap.release();
*/ 