// Footer Component - Browser Compatible
const Footer = {
    init() {
        this.render();
    },

    render() {
        const footerHTML = `
            <footer class="footer footer-center p-10 bg-base-300 text-base-content">
                <div class="container mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
                        <div>
                            <h3 class="text-2xl font-bold text-primary">SwiftCart</h3>
                            <p class="mt-2 text-sm">Your one-stop shop for all your fashion and lifestyle needs.</p>
                        </div>
                        <div>
                            <h4 class="font-bold mb-2">QUICK LINKS</h4>
                            <ul class="space-y-1 text-sm">
                                <li><a href="index.html" class="hover:text-primary">Home</a></li>
                                <li><a href="products.html" class="hover:text-primary">Products</a></li>
                                <li><a href="about.html" class="hover:text-primary">About</a></li>
                                <li><a href="contact.html" class="hover:text-primary">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold mb-2">SUPPORT</h4>
                            <ul class="space-y-1 text-sm">
                                <li><a href="#" class="hover:text-primary">FAQ</a></li>
                                <li><a href="#" class="hover:text-primary">Shipping</a></li>
                                <li><a href="#" class="hover:text-primary">Returns</a></li>
                                <li><a href="#" class="hover:text-primary">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-bold mb-2">NEWSLETTER</h4>
                            <p class="text-sm mb-3">Subscribe for weekly updates</p>
                            <div class="form-control">
                                <input type="email" placeholder="Enter your email" class="input input-bordered w-full mb-2" />
                                <button class="btn btn-primary" onclick="alert('Thank you for subscribing!')">Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 pt-8 border-t border-base-content/20 w-full flex flex-col md:flex-row justify-between items-center gap-4">
                        <p>© 2025 SwiftCart, Inc. All rights reserved.</p>
                        <div class="flex gap-4">
                            <a href="#" class="btn btn-ghost btn-circle"><i class="fab fa-facebook"></i></a>
                            <a href="#" class="btn btn-ghost btn-circle"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="btn btn-ghost btn-circle"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="btn btn-ghost btn-circle"><i class="fab fa-linkedin"></i></a>
                            <a href="#" class="btn btn-ghost btn-circle"><i class="fas fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        `;

        const footerElement = document.getElementById('footer');
        if (footerElement) {
            footerElement.innerHTML = footerHTML;
        }
    }
};