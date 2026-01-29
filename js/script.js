// Product Database
const products = [
    {
        id: 1,
        name: "Milwaukee Packout Impact Driver Cutout",
        category: "organizers",
        price: 24.99,
        description: "Precision carbon fiber cutout for Milwaukee M18 impact drivers. Custom-fitted for perfect protection.",
        icon: "🔧"
    },
    {
        id: 2,
        name: "Milwaukee Packout Drill Organizer",
        category: "organizers",
        price: 29.99,
        description: "Heavy-duty carbon fiber organizer for drill bits and accessories. Holds up to 50 bits.",
        icon: "🪛"
    },
    {
        id: 3,
        name: "Impact Socket Set Cutout Insert",
        category: "inserts",
        price: 34.99,
        description: "Custom 3D printed carbon fiber foam insert for impact socket sets. Keeps tools organized and protected.",
        icon: "⚙️"
    },
    {
        id: 4,
        name: "Packout Fastener Organizer",
        category: "organizers",
        price: 27.99,
        description: "Compartmentalized carbon fiber organizer for bolts, screws, and nails. 12 compartments.",
        icon: "🔨"
    },
    {
        id: 5,
        name: "End Mill Holder Insert",
        category: "inserts",
        price: 39.99,
        description: "Premium carbon fiber cutout for end mills and cutting tools. Holds tools safely and accessibly.",
        icon: "🛠️"
    },
    {
        id: 6,
        name: "Wrench Set Display Foam",
        category: "inserts",
        price: 44.99,
        description: "Professional-grade carbon fiber foam insert for wrench organization. Sized for standard SAE and metric sets.",
        icon: "🔩"
    },
    {
        id: 7,
        name: "Packout Divider Plates (Set of 4)",
        category: "accessories",
        price: 14.99,
        description: "Carbon fiber divider plates to customize your Packout storage. Lightweight and durable.",
        icon: "📋"
    },
    {
        id: 8,
        name: "Tool Protective Padding",
        category: "accessories",
        price: 12.99,
        description: "High-quality carbon fiber protective padding for your most valuable tools. 1/2 inch thick.",
        icon: "🎯"
    },
    {
        id: 9,
        name: "Bit Set Foam Organizer",
        category: "inserts",
        price: 22.99,
        description: "Custom-designed carbon fiber foam for organizing drill bits, driver bits, and accessories.",
        icon: "💾"
    }
];

// Load featured products on home page
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    const featured = products.slice(0, 6);
    featuredContainer.innerHTML = featured.map(product => createProductCard(product)).join('');
}

// Load all products on products page
function loadAllProducts() {
    const productsContainer = document.getElementById('products-grid');
    if (!productsContainer) return;

    productsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
    setupFilterButtons();
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// Filter functionality
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            const cards = document.querySelectorAll('.product-card');

            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Cart management
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Show confirmation
    alert(`${product.name} added to cart!`);
}

// Update cart count in navigation
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Handle contact form submission
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for contacting Aloha Fence! We will respond to your message shortly.');
        form.reset();
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    loadFeaturedProducts();
    loadAllProducts();
    handleContactForm();
});
