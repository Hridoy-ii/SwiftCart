// API Integration - Browser Compatible
const API = {
    BASE_URL: 'https://fakestoreapi.com',

    endpoints: {
        products: '/products',
        categories: '/products/categories',
        productByCategory: (category) => `/products/category/${category}`,
        singleProduct: (id) => `/products/${id}`
    },

    async fetch(endpoint) {
        try {
            const response = await fetch(`${this.BASE_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async getAllProducts() { return await this.fetch(this.endpoints.products); },
    async getCategories() { return await this.fetch(this.endpoints.categories); },
    async getProductsByCategory(category) { return await this.fetch(this.endpoints.productByCategory(category)); },
    async getProductById(id) { return await this.fetch(this.endpoints.singleProduct(id)); }
};