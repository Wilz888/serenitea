// Product data
const productData = {
  'liang-teh-ori': {
    name: 'Liang Teh Ori',
    image: 'images/product1.png',
    rating: 4.5,
    price: 'Rp 50.000',
    description: 'Teh hijau premium dengan aroma yang menenangkan dan rasa yang menyegarkan. Dipetik dari daun teh pilihan dan diolah dengan metode tradisional untuk mempertahankan kualitas dan khasiatnya.'
  },
  'liang-teh-gula-batu': {
    name: 'Liang Teh Gula Batu',
    image: 'images/product2.jpg',
    rating: 4.0,
    price: 'Rp 45.000',
    description: 'Teh hitam klasik dengan cita rasa kuat dan aroma yang khas. Ditambah dengan gula batu alami yang memberikan rasa manis yang pas dan tidak berlebihan.'
  },
  'liang-teh-madu': {
    name: 'Liang Teh Madu',
    image: 'images/product3.jpg',
    rating: 5.0,
    price: 'Rp 55.000',
    description: 'Infusi teh dengan kombinasi madu alami yang memberikan rasa manis dan khasiat kesehatan tambahan. Cocok diminum saat pagi atau sore hari.'
  },
  'lohankuo-jelly': {
    name: 'Lohankuo Jelly',
    image: 'images/product4.jpg',
    rating: 4.0,
    price: 'Rp 52.000',
    description: 'Teh hijau dengan aroma melati yang menenangkan dan rasa yang lembut, dikombinasikan dengan jelly lohankuo yang segar dan menyehatkan.'
  }
};

// Function to open the modal
function openProductModal(productId) {
  event.preventDefault(); // Mencegah perilaku default link
  
  const modal = document.getElementById('productModal');
  const modalContent = document.getElementById('modalContent');
  const product = productData[productId];
  
  if (!product) {
    console.error('Product not found');
    return;
  }
  
  // Disable scrolling on body
  document.body.style.overflow = 'hidden';
  
  // Generate stars based on rating
  let starsHTML = '';
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  // Populate modal content (tanpa kategori dan tombol)
  modalContent.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="modal-product-image">
    <h2 class="modal-product-title">${product.name}</h2>
    <div class="modal-product-rating">
      ${starsHTML}
      <span>(${product.rating})</span>
    </div>
    <p class="modal-product-price">${product.price}</p>
    <p class="modal-product-description">${product.description}</p>
  `;
  
  // Show the modal
  modal.style.display = 'block';
}

// Close the modal
function closeProductModal() {
  const modal = document.getElementById('productModal');
  modal.style.display = 'none';
  
  // Re-enable scrolling on body
  document.body.style.overflow = '';
}

// Initialize modal functionality
document.addEventListener('DOMContentLoaded', function() {
  // Event listener untuk tombol close
  const closeButton = document.querySelector('.close-modal');
  if (closeButton) {
    closeButton.addEventListener('click', closeProductModal);
  }
  
  // Event listener untuk klik di luar modal
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
      closeProductModal();
    }
  });
  
  // Mengubah semua link lihat detail
  const viewButtons = document.querySelectorAll('.btn-view');
  viewButtons.forEach(button => {
    button.setAttribute('href', 'javascript:void(0)');
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the menu toggle button and the navigation list
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    // Add click event listener to the menu toggle button
    menuToggle.addEventListener('click', function() {
        // Toggle the active class on the navigation list
        navList.classList.toggle('active');
        
        // Change the icon based on the state
        const icon = menuToggle.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close the menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navList.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navList.classList.contains('active')) {
            navList.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking a link (for better UX)
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let interval;

  // Function to change slide
  function goToSlide(index) {
      // Remove active class from all slides
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current slide
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      // Update current slide index
      currentSlide = index;
  }

  // Auto slide function
  function startAutoSlide() {
      interval = setInterval(() => {
          let nextSlide = (currentSlide + 1) % slides.length;
          goToSlide(nextSlide);
      }, 5000); // Change slide every 5 seconds
  }

  // Initialize auto slide
  startAutoSlide();

  // Event listeners for dots
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          clearInterval(interval);
          goToSlide(index);
          startAutoSlide();
      });
  });

  // Pause auto slide on hover
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(interval);
  });

  carouselContainer.addEventListener('mouseleave', () => {
      startAutoSlide();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.slider-dots .dot');
  const sliderElement = document.querySelector('.testimonial-slider');
  
  let activeSlideIndex = 0;
  let slideInterval;
  let touchStartX = 0;
  let touchEndX = 0;
  let isTransitioning = false;
  
  // Fungsi untuk menampilkan slide tertentu
  function showSlide(index) {
    // Jangan lakukan apa-apa jika sedang dalam transisi
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Validasi index
    if (index >= testimonialSlides.length) index = 0;
    if (index < 0) index = testimonialSlides.length - 1;
    
    // Sembunyikan semua slide
    testimonialSlides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.opacity = '0';
      slide.style.transform = 'translateX(20px)';
    });
    
    // Tampilkan slide yang aktif
    testimonialSlides[index].classList.add('active');
    testimonialSlides[index].style.opacity = '1';
    testimonialSlides[index].style.transform = 'translateX(0)';
    
    // Update dots
    testimonialDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Update index aktif
    activeSlideIndex = index;
    
    // Selesai transisi setelah animasi selesai
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
  
  // Event listener untuk dots
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      if (isTransitioning) return;
      clearInterval(slideInterval);
      showSlide(index);
      startAutoSlide();
    });
  });
  
  // Fungsi untuk slideshow otomatis
  function startAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      if (!isTransitioning) {
        showSlide(activeSlideIndex + 1);
      }
    }, 5000);
  }
  
  // Touch events untuk swipe
  if (sliderElement) {
    sliderElement.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    sliderElement.addEventListener('touchmove', function(e) {
      touchEndX = e.touches[0].clientX;
    }, { passive: true });
    
    sliderElement.addEventListener('touchend', function() {
      if (!touchStartX || !touchEndX || isTransitioning) return;
      
      const difference = touchStartX - touchEndX;
      const threshold = 50;
      
      if (Math.abs(difference) > threshold) {
        clearInterval(slideInterval);
        showSlide(activeSlideIndex + (difference > 0 ? 1 : -1));
        startAutoSlide();
      }
      
      touchStartX = 0;
      touchEndX = 0;
    });
  }
  
  // Window resize handler
  window.addEventListener('resize', function() {
    if (!isTransitioning) {
      setTimeout(() => {
        showSlide(activeSlideIndex);
      }, 100);
    }
  });
  
  // Inisialisasi slider
  showSlide(0);
  startAutoSlide();
});

// Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', function() {
  // Video handling
  setupVideoPlayers();
});

function setupVideoPlayers() {
  // Setup for brewing video
  const brewingThumbnail = document.querySelector('#brewing-video-container').previousElementSibling;
  if (brewingThumbnail) {
      brewingThumbnail.addEventListener('click', function() {
          const videoContainer = document.getElementById('brewing-video-container');
          videoContainer.innerHTML = `
              <video controls autoplay style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                  <source src="video/video1.mp4" type="video/mp4">
                  Your browser does not support the video tag.
              </video>
          `;
          videoContainer.classList.add('active');
          this.style.display = 'none';
      });
  }

  // Setup for Lohankuo video
  const lohankuoThumbnail = document.querySelector('#lohankuo-video-container').previousElementSibling;
  if (lohankuoThumbnail) {
      lohankuoThumbnail.addEventListener('click', function() {
          const videoContainer = document.getElementById('lohankuo-video-container');
          videoContainer.innerHTML = `
              <video controls autoplay style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                  <source src="video/lohan.mp4" type="video/mp4">
                  Your browser does not support the video tag.
              </video>
          `;
          videoContainer.classList.add('active');
          this.style.display = 'none';
      });
  }
}
