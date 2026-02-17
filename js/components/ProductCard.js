// Product Card Component - Browser Compatible
const ProductCard = {
    create(product) {
        return `
            <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all product-card group">
                <figure class="px-4 pt-4">
                    <div class="relative overflow-hidden rounded-lg w-full h-64 cursor-pointer" onclick="window.location.href='product-detail.html?id=${product.id}'">
                        <img src="${product.image}" alt="${product.title}" class="product-image w-full h-full object-contain" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'" />
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all"></div>
                    </div>
                </figure>
                <div class="card-body">
                    <div class="flex items-start justify-between gap-2">
                        <h2 class="card-title text-sm line-clamp-2 flex-1 cursor-pointer" onclick="window.location.href='product-detail.html?id=${product.id}'">
                            ${product.title}
                        </h2>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="badge badge-ghost">${product.category}</span>
                        <div class="rating rating-sm">
                            <input type="radio" name="rating-${product.id}" class="mask mask-star-2 bg-orange-400" ${product.rating.rate >= 1 ? 'checked' : ''} />
                            <input type="radio" name="rating-${product.id}" class="mask mask-star-2 bg-orange-400" ${product.rating.rate >= 2 ? 'checked' : ''} />
                            <input type="radio" name="rating-${product.id}" class="mask mask-star-2 bg-orange-400" ${product.rating.rate >= 3 ? 'checked' : ''} />
                            <input type="radio" name="rating-${product.id}" class="mask mask-star-2 bg-orange-400" ${product.rating.rate >= 4 ? 'checked' : ''} />
                            <input type="radio" name="rating-${product.id}" class="mask mask-star-2 bg-orange-400" ${product.rating.rate >= 5 ? 'checked' : ''} />
                        </div>
                        <span class="text-xs text-gray-500">(${product.rating.count})</span>
                    </div>
                    <div class="card-actions items-end justify-between mt-2">
                        <div class="text-2xl font-bold text-primary">$${product.price.toFixed(2)}</div>
                        <div class="flex gap-2">
                            <button class="btn btn-ghost btn-sm" onclick="window.location.href='product-detail.html?id=${product.id}'">
                                <i class="fas fa-eye"></i> Details
                            </button>
                            <button class="btn btn-primary btn-sm" onclick="App.addToCart(${product.id})">
                                <i class="fas fa-cart-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};