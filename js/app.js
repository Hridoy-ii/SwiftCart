// Main Application - Auto-detects which page you're on
const App = {
    async init() {
        console.log('Initializing SwiftCart...');
        
        // Wait for all components to be loaded
        await this.waitForComponents();
        
        try {
            // Always init header/footer
            if (typeof Header !== 'undefined') Header.init();
            if (typeof Footer !== 'undefined') Footer.init();
            
            // Detect page and load appropriate content
            if (document.getElementById('hero-container')) {
                // Home page
                console.log('Home page detected');
                if (typeof Hero !== 'undefined') Hero.init();
                await this.loadTrendingProducts();
            }
            
            if (document.getElementById('products-grid') && !document.getElementById('hero-container')) {
                // Products page
                console.log('Products page detected');
                await this.loadAllProducts();
            }
            
            if (document.getElementById('product-detail')) {
                // Product detail page
                console.log('Product detail page detected');
                await this.loadProductDetail();
            }
            
            if (document.getElementById('cart-items')) {
                // Cart page
                console.log('Cart page detected');
                this.renderCartPage();
            }

            this.setupToast();
            console.log('SwiftCart initialized successfully!');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    },

    waitForComponents() {
        return new Promise((resolve) => {
            const check = () => {
                if (typeof Header !== 'undefined' && 
                    typeof Footer !== 'undefined' && 
                    typeof ProductCard !== 'undefined' &&
                    typeof Store !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(check, 50);
                }
            };
            check();
        });
    },

    async loadTrendingProducts() {
        try {
            const products = await API.getAllProducts();
            const container = document.getElementById('trending-products');
            const errorDiv = document.getElementById('error-message');
            
            if (container && products?.length > 0) {
                const trending = products.slice(0, 6);
                container.innerHTML = trending.map(p => ProductCard.create(p)).join('');
                if (errorDiv) errorDiv.classList.add('hidden');
            } else if (container) {
                container.innerHTML = '<p class="text-center col-span-3 text-gray-500">No products found</p>';
            }
        } catch (error) {
            console.error('Error loading trending products:', error);
            const container = document.getElementById('trending-products');
            if (container) {
                container.innerHTML = `
                    <div class="col-span-3 text-center p-8">
                        <i class="fas fa-exclamation-triangle text-4xl text-error mb-4"></i>
                        <p class="text-error">Failed to load products</p>
                        <button onclick="location.reload()" class="btn btn-primary mt-4">Retry</button>
                    </div>
                `;
            }
        }
    },

    async loadAllProducts() {
        try {
            const [products, categories] = await Promise.all([
                API.getAllProducts(),
                API.getCategories()
            ]);
            Store.setProducts(products);
            Store.setCategories(categories);
            this.renderCategoryFilters(categories);
            this.renderProductsGrid(products);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    },

    renderCategoryFilters(categories) {
        const container = document.getElementById('category-filters');
        if (!container) return;
        
        let buttons = '<button class="btn btn-active btn-primary" data-category="all">All</button>';
        categories.forEach(cat => {
            const name = cat.charAt(0).toUpperCase() + cat.slice(1);
            buttons += `<button class="btn" data-category="${cat}">${name}</button>`;
        });
        container.innerHTML = buttons;
        
        container.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                container.querySelectorAll('b').forEach(b => b.classList.remove('btn-active', 'btn-primary'));
                e.target.classList.add('btn-active', 'btn-primary');
                this.filterProducts(e.target.dataset.category);
            });
        });
    },

    renderProductsGrid(products) {
        const container = document.getElementById('products-grid');
        if (!container) return;
        container.innerHTML = products.map(p => ProductCard.create(p)).join('');
    },

    filterProducts(category) {
        const products = Store.getProducts();
        const filtered = category === 'all' 
            ? products 
            : products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        this.renderProductsGrid(filtered);
    },

    async loadProductDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            window.location.href = 'products.html';
            return;
        }

        try {
            const product = await API.getProductById(productId);
            Store.setCurrentProduct(product);
            this.renderProductDetail(product);
            this.loadRelatedProducts(product.category);
        } catch (error) {
            console.error('Error loading product detail:', error);
        }
    },

    renderProductDetail(product) {
        const container = document.getElementById('product-detail');
        if (!container) return;

        container.innerHTML = `
            <div>
                <img src="${product.image}" alt="${product.title}" class="w-full h-96 object-contain rounded-lg" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'" />
            </div>
            <div class="space-y-4">
                <div>
                    <span class="badge badge-primary">${product.category}</span>
                    <h2 class="text-3xl font-bold mt-2">${product.title}</h2>
                </div>
                <div class="flex items-center gap-4">
                    <div class="rating">
                        ${[1,2,3,4,5].map(i => `
                            <input type="radio" name="rating-detail" class="mask mask-star-2 bg-orange-400" 
                                   ${product.rating.rate >= i ? 'checked' : ''} />
                        `).join('')}
                    </div>
                    <span class="text-gray-500">(${product.rating.count} reviews)</span>
                </div>
                <div class="text-4xl font-bold text-primary">$${product.price.toFixed(2)}</div>
                <p class="text-gray-600 text-lg">${product.description}</p>
                <div class="card-actions gap-2">
                    <button class="btn btn-primary btn-lg flex-1" onclick="App.addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn btn-ghost btn-lg"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
    },

    async loadRelatedProducts(category) {
        try {
            const products = await API.getProductsByCategory(category);
            const container = document.getElementById('related-products');
            if (container && products?.length > 0) {
                const related = products.slice(0, 3).filter(p => p.id !== Store.getCurrentProduct()?.id);
                container.innerHTML = related.map(p => ProductCard.create(p)).join('');
            }
        } catch (error) {
            console.error('Error loading related products:', error);
        }
    },

    renderCartPage() {
        const cart = Store.getCart();
        const cartItems = document.getElementById('cart-items');
        const emptyCart = document.getElementById('empty-cart');
        const cartContent = document.getElementById('cart-content');

        if (!cartItems) return;

        if (cart.length === 0) {
            if (cartContent) cartContent.classList.add('hidden');
            if (emptyCart) emptyCart.classList.remove('hidden');
        } else {
            if (cartContent) cartContent.classList.remove('hidden');
            if (emptyCart) emptyCart.classList.add('hidden');

            cartItems.innerHTML = cart.map(item => `
                <div class="card bg-base-100 shadow-lg p-4">
                    <div class="flex gap-4">
                        <img src="${item.image}" alt="${item.title}" class="w-24 h-24 object-cover rounded" onerror="this.src='https://via.placeholder.com/100x100?text=No+Image'">
                        <div class="flex-1">
                            <h3 class="font-bold">${item.title}</h3>
                            <p class="text-primary font-bold text-lg">$${item.price.toFixed(2)}</p>
                            <div class="flex items-center gap-2 mt-2">
                                <button class="btn btn-xs btn-circle" onclick="Store.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                <span class="font-medium">${item.quantity}</span>
                                <button class="btn btn-xs btn-circle" onclick="Store.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                <button class="btn btn-xs btn-error ml-auto" onclick="Store.removeFromCart(${item.id})">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="font-bold text-lg">$${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            `).join('');

            const subtotal = Store.getCartTotal();
            document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
        }

        // Listen for cart updates
        Store.subscribe('cartUpdated', () => this.renderCartPage());
    },

    addToCart(productId) {
        const products = Store.getProducts();
        const product = products?.find(p => p.id === productId) || Store.getCurrentProduct();
        if (product) {
            Store.addToCart(product);
            this.showToast(`${product.title.substring(0, 30)}... added to cart`);
        }
    },

    setupToast() {
        window.showToast = (message) => {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            if (toast && toastMessage) {
                toastMessage.textContent = message;
                toast.classList.remove('hidden');
                setTimeout(() => toast.classList.add('hidden'), 3000);
            }
        };
    },

    showToast(message) {
        if (window.showToast) window.showToast(message);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    App.init();
});