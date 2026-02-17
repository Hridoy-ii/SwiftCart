// Centralized State Management - Browser Compatible
const Store = {
    state: {
        cart: [],
        products: [],
        categories: [],
        currentProduct: null
    },

    init() {
        const savedCart = localStorage.getItem('swiftcart_cart');
        if (savedCart) {
            this.state.cart = JSON.parse(savedCart);
        }
        console.log('Store initialized');
    },

    getCart() { return this.state.cart; },
    
    addToCart(product, quantity = 1) {
        const existingItem = this.state.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.state.cart.push({ ...product, quantity });
        }
        this.saveCart();
        this.notify('cartUpdated');
    },

    removeFromCart(productId) {
        this.state.cart = this.state.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.notify('cartUpdated');
    },

    updateQuantity(productId, quantity) {
        const item = this.state.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.notify('cartUpdated');
            }
        }
    },

    saveCart() {
        localStorage.setItem('swiftcart_cart', JSON.stringify(this.state.cart));
    },

    clearCart() {
        this.state.cart = [];
        this.saveCart();
        this.notify('cartUpdated');
    },

    getCartTotal() {
        return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getCartCount() {
        return this.state.cart.reduce((count, item) => count + item.quantity, 0);
    },

    setProducts(products) { this.state.products = products; },
    getProducts() { return this.state.products; },
    
    setCategories(categories) { this.state.categories = categories; },
    getCategories() { return this.state.categories; },
    
    setCurrentProduct(product) { this.state.currentProduct = product; },
    getCurrentProduct() { return this.state.currentProduct; },

    subscribers: {},
    subscribe(event, callback) {
        if (!this.subscribers[event]) this.subscribers[event] = [];
        this.subscribers[event].push(callback);
    },
    notify(event) {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach(callback => callback());
        }
    }
};

// Auto-initialize
Store.init();