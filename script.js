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