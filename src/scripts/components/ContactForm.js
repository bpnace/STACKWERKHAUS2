import { gsap } from 'gsap';

/**
 * Initialize the custom checkbox functionality with GSAP animations
 * - Handles checkbox state toggling
 * - Animates the checkmark using GSAP
 * - Ensures form validation works with the custom checkbox
 */
export function initCustomCheckbox() {
  const customCheckbox = document.getElementById('custom-checkbox');
  const actualCheckbox = document.getElementById('terms');
  const checkmark = document.querySelector('.checkbox-checkmark');
  const form = document.getElementById('contact-form');
  
  console.log('ContactForm initialization status:', {
    customCheckbox: !!customCheckbox,
    actualCheckbox: !!actualCheckbox,
    checkmark: !!checkmark,
    form: !!form
  });
  
  if (!customCheckbox || !actualCheckbox || !checkmark || !form) return;
  
  // Set initial GSAP properties for the checkmark
  gsap.set(checkmark, {
    opacity: 0,
    strokeDasharray: 1,
    strokeDashoffset: 1
  });
  
  // Add file size validation
  const fileInput = document.getElementById('attachment');
  if (fileInput) {
    const maxSize = parseInt(fileInput.getAttribute('max-size') || '5242880', 10); // 5MB default
    
    fileInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        const fileSize = this.files[0].size;
        if (fileSize > maxSize) {
          alert('Die Datei ist zu groß. Maximale Dateigröße: 5MB.');
          this.value = ''; // Clear the file input
        }
      }
    });
  }
  
  // Toggle checkbox state when clicked
  customCheckbox.addEventListener('click', () => {
    const isChecked = customCheckbox.getAttribute('aria-checked') === 'true';
    const newState = !isChecked;
    
    // Update the visual state
    customCheckbox.setAttribute('aria-checked', newState.toString());
    
    // Update the actual checkbox for form validation
    actualCheckbox.checked = newState;
    
    // Animate the checkmark
    if (newState) {
      gsap.to(checkmark, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 0.2,
        delay: 0.2,
        ease: 'power2.out'
      });
    } else {
      gsap.to(checkmark, {
        opacity: 0,
        strokeDashoffset: 1,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  });
  
  // Ensure the custom checkbox reflects changes to the actual checkbox
  actualCheckbox.addEventListener('change', () => {
    customCheckbox.setAttribute('aria-checked', actualCheckbox.checked.toString());
    
    if (actualCheckbox.checked) {
      gsap.to(checkmark, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 0.2,
        delay: 0.2,
        ease: 'power2.out'
      });
    } else {
      gsap.to(checkmark, {
        opacity: 0,
        strokeDashoffset: 1,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  });
  
  // Handle form submission - ensure checkbox is required
  form.addEventListener('submit', (event) => {
    console.log('Form submit event triggered');
    
    if (!actualCheckbox.checked) {
      event.preventDefault();
      console.log('Checkbox not checked, preventing submission');
      
      // Add visual feedback
      customCheckbox.classList.add('checkbox-error');
      
      // Remove error styling after animation
      gsap.to(customCheckbox, {
        x: [0, -5, 5, -5, 5, 0],
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          customCheckbox.classList.remove('checkbox-error');
        }
      });
      return;
    }
    
    // Validate file size before submission
    if (fileInput && fileInput.files.length > 0) {
      const maxSize = parseInt(fileInput.getAttribute('max-size') || '5242880', 10);
      if (fileInput.files[0].size > maxSize) {
        event.preventDefault();
        alert('Die Datei ist zu groß. Maximale Dateigröße: 5MB.');
        return;
      }
    }
    
    // Handle form submission
    event.preventDefault();
    console.log('Form valid, preparing submission');
    
    // Create a FormData object
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = `
      <svg class="spinner" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle class="spinner-path" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"></circle>
      </svg>
      <span>Senden...</span>
    `;
    
    // Log form data for debugging
    console.log('Form data:');
    for (let pair of formData.entries()) {
      // Don't log file content, just file name if present
      if (pair[0] === 'attachment' && pair[1] instanceof File) {
        console.log(pair[0], pair[1].name, `(${pair[1].size} bytes)`);
      } else {
        console.log(pair[0], pair[1]);
      }
    }
    
    // Submit the form to Formspree
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      console.log('Formspree response status:', response.status);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Formspree success response:', data);
      
      // Show success message
      showFormMessage(form, 'success', 'Vielen Dank! Deine Nachricht wurde erfolgreich gesendet.');
      
      // Reset form
      form.reset();
      customCheckbox.setAttribute('aria-checked', 'false');
      gsap.to(checkmark, {
        opacity: 0,
        strokeDashoffset: 1,
        duration: 0.2,
        ease: 'power2.in'
      });
    })
    .catch(error => {
      // Show error message
      console.error('Error submitting form:', error);
      showFormMessage(form, 'error', 'Entschuldigung, beim Senden ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.');
    })
    .finally(() => {
      // Reset button state
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    });
  });
  
  // Add keyboard accessibility for the custom checkbox
  customCheckbox.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      customCheckbox.click();
    }
  });
  
  // Set tabindex to make the button focusable
  customCheckbox.setAttribute('tabindex', '0');
}

/**
 * Show a form message (success or error)
 * @param {HTMLElement} form - The form element
 * @param {string} type - The message type ('success' or 'error')
 * @param {string} message - The message to display
 */
function showFormMessage(form, type, message) {
  // Remove any existing messages
  const existingMessage = form.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `form-message form-message-${type}`;
  messageElement.textContent = message;
  
  // Add the message to the form
  form.appendChild(messageElement);
  
  // Animate the message
  gsap.fromTo(messageElement, 
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
  );
  
  // Auto-remove success message after a delay
  if (type === 'success') {
    setTimeout(() => {
      gsap.to(messageElement, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => messageElement.remove()
      });
    }, 5000);
  }
} 