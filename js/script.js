// Data: product list used by homepage and products page
const PRODUCTS = [
  {
    id: "p1",
    name: "Student Laptop - 8GB RAM",
    price: 49999,
    category: "gadgets",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=12ff3c9d3d0c4d6e5383d2b3d3a7655b"
  },
  {
    id: "p2",
    name: "Noise Cancelling Headphones",
    price: 3499,
    category: "gadgets",
    image: "https://images.unsplash.com/photo-1518441902110-1d7efb58b5d1?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1b2f6f0b3d9b9c2f3de8b4a9c2e5f7f8"
  },
  {
    id: "p3",
    name: "Hardcover Notebook (Pack of 3)",
    price: 299,
    category: "stationery",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=20c8b1e2f3a4b1d2c4e5f6a7b8c9d0e1"
  },
  {
    id: "p4",
    name: "Stainless Steel Water Bottle",
    price: 599,
    category: "hostel",
    image: "https://images.unsplash.com/photo-1526403224742-8c4d7fb9d1b9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3a9b6a7c1d2e3f4a5b6c7d8e9f0a1b2c"
  },
  {
    id: "p5",
    name: "Nike Shoe",
    price: 1999,
    category: "hostel",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=be6c3a7a2f4b8c5d9a6b7c8d3e4f5a6b"
  },
  {
    id: "p6",
    name: "Premium Coffee Cup",
    price: 1299,
    category: "gadgets",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7d8a9c0b1e2f3a4b5c6d7e8f9a0b1c2d"
  }
];

// UTIL: format price to Indian rupee string
function formatPriceINR(value) {
  return "₹" + value.toLocaleString('en-IN');
}

/* ------------------ Render featured on home ------------------ */
function renderFeatured() {
  const featuredGrid = document.getElementById('featured-grid');
  if (!featuredGrid) return;

  // pick first 3 products as featured
  const featured = PRODUCTS.slice(0, 3);
  featuredGrid.innerHTML = '';

  featured.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="muted">${product.category}</p>
        <div class="price">${formatPriceINR(product.price)}</div>
        <div class="actions">
          <button class="action-btn add-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
          <button class="action-btn wish-btn" onclick="addToWishlist('${product.id}')">Wishlist</button>
        </div>
      </div>
    `;
    featuredGrid.appendChild(card);
  });
}

/* ------------------ Render product listing ------------------ */
function renderProductsList(filter = { search: '', category: 'all' }) {
  const productsGrid = document.getElementById('products-grid');
  if (!productsGrid) return;

  const search = filter.search.trim().toLowerCase();
  const category = filter.category;

  const filtered = PRODUCTS.filter(p => {
    const matchesCategory = (category === 'all') || (p.category === category);
    const matchesSearch = p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  productsGrid.innerHTML = '';
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <div class="price">${formatPriceINR(product.price)}</div>
        <div class="actions">
          <button class="action-btn add-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
          <button class="action-btn wish-btn" onclick="addToWishlist('${product.id}')">Wishlist</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = '<p class="muted">No products match your search.</p>';
  }
}

/* ------------------ Cart & Wishlist (localStorage simple demo) ------------------ */
function getLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch (e) {
    return [];
  }
}

function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function addToCart(productId) {
  const cart = getLocal('campusmart_cart');
  cart.push({ id: productId, addedAt: new Date().toISOString() });
  setLocal('campusmart_cart', cart);
  alert('Added to cart');
}

function addToWishlist(productId) {
  const wishlist = getLocal('campusmart_wishlist');
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    setLocal('campusmart_wishlist', wishlist);
    alert('Added to wishlist');
  } else {
    alert('Already in wishlist');
  }
}

/* ------------------ Registration/Login (demo only, localStorage) ------------------ */
function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('regName')?.value?.trim();
  const email = document.getElementById('regEmail')?.value?.trim();
  const pass = document.getElementById('regPass')?.value;

  const feedback = document.getElementById('regFeedback');
  if (!name || !email || !pass) {
    if (feedback) feedback.textContent = 'Please fill all fields.';
    return;
  }
  if (pass.length < 6) {
    if (feedback) feedback.textContent = 'Password must be at least 6 characters.';
    return;
  }

  const users = getLocal('campusmart_users');
  if (users.find(u => u.email === email)) {
    if (feedback) feedback.textContent = 'Email already registered.';
    return;
  }

  users.push({ name, email, pass });
  setLocal('campusmart_users', users);
  if (feedback) feedback.textContent = 'Registered successfully. You can log in.';
  document.getElementById('registerForm')?.reset();
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail')?.value?.trim();
  const pass = document.getElementById('loginPass')?.value;
  const feedback = document.getElementById('loginFeedback');

  const users = getLocal('campusmart_users');
  const user = users.find(u => u.email === email && u.pass === pass);
  if (!user) {
    if (feedback) feedback.textContent = 'Invalid credentials.';
    return;
  }

  localStorage.setItem('campusmart_user', JSON.stringify({ name: user.name, email: user.email }));
  if (feedback) feedback.textContent = 'Login successful. Welcome ' + user.name + '!';
  document.getElementById('loginForm')?.reset();
}

/* ------------------ Contact form handling ------------------ */
function handleContact(event) {
  event.preventDefault();
  const name = document.getElementById('name')?.value?.trim();
  const email = document.getElementById('emailContact')?.value?.trim();
  const message = document.getElementById('message')?.value?.trim();
  const feedback = document.getElementById('contactFeedback');

  if (!name || !email || !message) {
    if (feedback) feedback.textContent = 'Please fill all fields.';
    return;
  }

  const messages = getLocal('campusmart_messages');
  messages.push({ name, email, message, date: new Date().toISOString() });
  setLocal('campusmart_messages', messages);
  if (feedback) {
    feedback.textContent = 'Message sent. We will contact you soon.';
    feedback.style.color = 'green';
  }
  document.getElementById('contactForm')?.reset();
}

/* ------------------ Search and filter wiring ------------------ */
function setupProductFilters() {
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      renderProductsList({ search: searchInput.value, category: categorySelect.value });
    });
  }
  if (categorySelect) {
    categorySelect.addEventListener('change', function () {
      renderProductsList({ search: searchInput ? searchInput.value : '', category: categorySelect.value });
    });
  }
}

/* ------------------ Initialize on page load ------------------ */
document.addEventListener('DOMContentLoaded', function () {
  renderFeatured();
  renderProductsList({ search: '', category: 'all' });
  setupProductFilters();

  // forms
  document.getElementById('registerForm')?.addEventListener('submit', handleRegister);
  document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
  document.getElementById('contactForm')?.addEventListener('submit', handleContact);
});
