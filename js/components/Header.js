// Header Component - Browser Compatible
const Header = {
    init() {
        this.render();
        this.updateCartCount();
        if (typeof Store !== 'undefined') {
            Store.subscribe('cartUpdated', () => this.updateCartCount());
        }
    },

    render() {
        const headerHTML = `
            <nav class="navbar bg-base-100 shadow-lg sticky top-0 z-50">
                <div class="container mx-auto px-4">
                    <div class="flex-1">
                        <a href="index.html" class="btn btn-ghost text-2xl text-primary font-bold">SwiftCart</a>
                    </div>
                    <div class="flex-none hidden md:block">
                        <ul class="menu menu-horizontal px-1 gap-2">
                            <li><a href="index.html" class="btn btn-ghost">Home</a></li>
                            <li><a href="products.html" class="btn btn-ghost">Products</a></li>
                            <li><a href="about.html" class="btn btn-ghost">About</a></li>
                            <li><a href="contact.html" class="btn btn-ghost">Contact</a></li>
                        </ul>
                    </div>
                    <div class="flex-none gap-2">
                        <div class="dropdown dropdown-end">
                            <label tabindex="0" class="btn btn-ghost btn-circle">
                                <div class="indicator">
                                    <i class="fas fa-shopping-cart text-xl"></i>
                                    <span id="cart-count" class="badge badge-sm badge-primary indicator-item">0</span>
                                </div>
                            </label>
                            <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow-xl">
                                <div class="card-body">
                                    <span class="font-bold text-lg">Cart Items (<span id="cart-total-items">0</span>)</span>
                                    <div id="cart-items-preview" class="py-2 max-h-60 overflow-y-auto">
                                        <p class="text-gray-500 text-center">Your cart is empty</p>
                                    </div>
                                    <div class="card-actions">
                                        <a href="cart.html" class="btn btn-primary btn-block">View Cart</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dropdown dropdown-end md:hidden">
                            <label tabindex="0" class="btn btn-ghost btn-circle">
                                <i class="fas fa-bars text-xl"></i>
                            </label>
                            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="products.html">Products</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        const headerElement = document.getElementById('header');
        if (headerElement) {
            headerElement.innerHTML = headerHTML;
            this.renderCartPreview();
        }
    },

    updateCartCount() {
        if (typeof Store === 'undefined') return;
        
        const count = Store.getCartCount();
        const cartCountEl = document.getElementById('cart-count');
        const cartTotalItemsEl = document.getElementById('cart-total-items');
        
        if (cartCountEl) cartCountEl.textContent = count;
        if (cartTotalItemsEl) cartTotalItemsEl.textContent = count;
        
        this.renderCartPreview();
    },

    renderCartPreview() {
        const cartItemsPreview = document.getElementById('cart-items-preview');
        if (!cartItemsPreview || typeof Store === 'undefined') return;

        const cart = Store.getCart();
        
        if (cart.length === 0) {
            cartItemsPreview.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
        } else {
            cartItemsPreview.innerHTML = cart.map(item => `
                <div class="flex items-center gap-2 py-2 border-b border-base-200">
                    <img src="${item.image}" alt="${item.title}" class="w-12 h-12 object-cover rounded">
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium truncate">${item.title}</p>
                        <p class="text-xs text-gray-500">${item.quantity} x $${item.price.toFixed(2)}</p>
                    </div>
                    <button onclick="Store.removeFromCart(${item.id}); Header.renderCartPreview();" class="btn btn-ghost btn-xs text-error">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }
};