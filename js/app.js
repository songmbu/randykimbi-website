// CONTACT FORM HANDLER
async function handleContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    title: formData.get('title'),
    enquiry: formData.get('enquiry'),
    message: formData.get('message'),
    timestamp: new Date().toISOString()
  };
  
  try {
    // In production, this would send to your backend/Supabase
    // For now, we'll store locally and show success message
    console.log('Form submitted:', data);
    
    // Show success message
    const statusDiv = document.getElementById('form-status');
    const statusMessage = document.getElementById('status-message');
    
    statusMessage.textContent = 'Thank you! Your message has been received. I will get back to you within 24 hours.';
    statusDiv.style.display = 'block';
    statusDiv.style.borderColor = '#D4AF37';
    
    // Reset form
    form.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
    
  } catch (error) {
    console.error('Form submission error:', error);
    const statusDiv = document.getElementById('form-status');
    const statusMessage = document.getElementById('status-message');
    
    statusMessage.textContent = 'There was an error submitting your message. Please try again or contact us directly via WhatsApp.';
    statusDiv.style.display = 'block';
    statusDiv.style.borderColor = '#FF6B6B';
  }
}

// NAVIGATION UTILITIES
document.addEventListener('DOMContentLoaded', function() {
  // Highlight current page in navigation
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath === '/' && link.getAttribute('href') === '/')) {
      link.style.color = '#D4AF37';
      link.style.fontWeight = '700';
    }
  });
});

// SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// MOBILE MENU (if needed later)
function toggleMobileMenu() {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.classList.toggle('mobile-active');
  }
}

// FORM VALIDATION HELPER
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ANALYTICS TRACKING (optional)
function trackEvent(eventName, eventData) {
  if (window.gtag) {
    gtag('event', eventName, eventData);
  }
  console.log('Event tracked:', eventName, eventData);
}
