// Hero Component - Browser Compatible
const Hero = {
    init() {
        this.render();
    },

    render() {
        const heroHTML = `
            <div class="hero min-h-screen"
                style="background-image: url(Assets/banner-image.png);"                >
    
                <!-- Black Overlay with opacity -->
                <div class="hero-overlay bg-black opacity-60"></div>
                
                <div class="hero-content text-left text-white items-start">
                    <div class="max-w-md">
                        <h1 class="mb-5 text-4xl font-bold">Best Collection For You</h1>
                        <p class="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button class="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        `;

        const heroContainer = document.getElementById('hero-container');
        if (heroContainer) {
            heroContainer.innerHTML = heroHTML;
        }
    }
};