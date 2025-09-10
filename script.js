// Mobile menu functionality
const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

function openMenu() {
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('visible');
  document.body.style.overflow = 'auto';
}

menuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

// Close menu when clicking on links
const menuLinks = document.querySelectorAll('#mobileMenu a');
menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.remove('opacity-0', 'invisible');
    backToTopBtn.classList.add('opacity-100', 'visible');
  } else {
    backToTopBtn.classList.remove('opacity-100', 'visible');
    backToTopBtn.classList.add('opacity-0', 'invisible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active', 'bg-amber-500', 'text-white'));
    
    // Add active class to clicked button
    button.classList.add('active', 'bg-amber-500', 'text-white');
    button.classList.remove('bg-amber-100', 'text-amber-700', 'hover:bg-amber-500');
    
    const filterValue = button.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Form submission handling
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const message = document.getElementById('message').value;
  
  // Create WhatsApp message
  const whatsappMessage = `Hello Suku! I would like to book a mehndi appointment.%0A%0AName: ${name}%0APhone: ${phone}%0A${email ? `Email: ${email}%0A` : ''}Service: ${service}%0A${date ? `Preferred Date: ${date}%0A` : ''}${message ? `Details: ${message}` : ''}`;
  
  // Open WhatsApp with pre-filled message
  window.open(`https://wa.me/91xxxxxxxxxx?text=${whatsappMessage}`, '_blank');
  
  // Reset form
  bookingForm.reset();
  
  // Show success message (you could implement a toast notification here)
  alert('Thank you for your booking request! We have opened WhatsApp for you to send your details.');
});

// Initialize date picker with min date as today
const dateInput = document.getElementById('date');
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
dateInput.setAttribute('min', formattedDate);

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = [].slice.call(document.querySelectorAll('img.gallery-img'));
  
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src || lazyImage.src;
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

// Add subtle animations to elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.portfolio-item, .service-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
};

// Initialize animations when page loads
window.addEventListener('load', animateOnScroll);