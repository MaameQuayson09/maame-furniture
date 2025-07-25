document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initialize Swiper for product slider
    const productSwiper = new Swiper('.products-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        }
    });

    // Initialize Swiper for testimonials
    const testimonialSwiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            }
        }
    });

    // Color options for hero product
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // In a real implementation, this would change the 3D model texture
            const heroModel = document.getElementById('hero-model');
            heroModel.style.backgroundColor = this.getAttribute('data-color');
        });
    });

    // Search modal
    const searchBtn = document.querySelector('.search-btn');
    const searchModal = document.getElementById('searchModal');
    const closeSearchModal = searchModal.querySelector('.close-modal');
    
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchModal.classList.add('active');
    });
    
    closeSearchModal.addEventListener('click', function() {
        searchModal.classList.remove('active');
    });

    // Quick view modal
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const quickViewModal = document.getElementById('quickViewModal');
    const closeQuickViewModal = quickViewModal.querySelector('.close-modal');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-model');
            loadQuickViewProduct(productId);
            quickViewModal.classList.add('active');
        });
    });
    
    closeQuickViewModal.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
    });

    // Function to load quick view product data
    function loadQuickViewProduct(productId) {
        // In a real implementation, this would fetch product data from an API
        // For demo purposes, we'll use mock data
        const products = {
            'chair1': {
                name: 'Adinkra Royal Chair',
                price: '₵ 1,299',
                originalPrice: '₵ 1,599',
                rating: 4.5,
                reviews: 24,
                description: 'This exquisite chair features traditional Adinkra symbols carved into solid Ghanaian mahogany. The rich brown finish highlights the natural wood grain, while the ergonomic design ensures comfort. Perfect for adding a touch of African royalty to your living space.',
                colors: ['#8B5A2B', '#000000', '#C19A6B', '#654321'],
                sizes: ['Standard', 'Wide', 'Tall'],
                image: 'images/chair-1.jpg'
            },
            'table1': {
                name: 'Kente Pattern Dining Table',
                price: '₵ 3,499',
                originalPrice: '',
                rating: 4,
                reviews: 12,
                description: 'Inspired by the vibrant patterns of Kente cloth, this dining table features intricate inlay work with multiple wood tones. The sturdy construction can seat up to 8 people comfortably. A true centerpiece for family gatherings.',
                colors: ['#8B5A2B', '#654321', '#000000'],
                sizes: ['6-seater', '8-seater', 'Extendable'],
                image: 'images/table-1.jpg'
            },
            'sofa1': {
                name: 'Ashanti Lounge Sofa',
                price: '₵ 4,799',
                originalPrice: '₵ 5,299',
                rating: 5,
                reviews: 37,
                description: 'Luxurious three-seater sofa with hand-carved Ashanti motifs on the wooden frame. Features premium upholstery with traditional Ghanaian fabric options. The high-density foam cushions provide exceptional comfort while maintaining their shape over time.',
                colors: ['#8B5A2B', '#C19A6B', '#000000', '#654321', '#FFFFFF'],
                sizes: ['3-seater', '2-seater', 'L-shaped'],
                image: 'images/sofa-1.jpg'
            },
            'cabinet1': {
                name: 'Akan Storage Cabinet',
                price: '₵ 2,899',
                originalPrice: '',
                rating: 4.5,
                reviews: 18,
                description: 'This versatile storage cabinet combines functionality with traditional Akan design elements. Features four spacious shelves behind rattan doors, with additional storage in the bottom drawers. The dark stain highlights the detailed carvings.',
                colors: ['#654321', '#000000', '#8B5A2B'],
                sizes: ['Standard', 'Tall', 'Wide'],
                image: 'images/cabinet-1.jpg'
            }
        };
        
        const product = products[productId];
        const modalBody = quickViewModal.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <div class="3d-model-container" style="background-image: url('${product.image}'); background-size: cover; background-position: center;"></div>
                </div>
                <div class="quick-view-details">
                    <h3>${product.name}</h3>
                    <div class="quick-view-price">
                        ${product.price} ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="quick-view-rating">
                        ${generateStarRating(product.rating)} <span>${product.reviews} reviews</span>
                    </div>
                    <p class="quick-view-description">${product.description}</p>
                    
                    <div class="quick-view-options">
                        <div class="option-group">
                            <h4>Color:</h4>
                            <div class="color-options">
                                ${product.colors.map(color => `
                                    <span class="color-option" style="background-color: ${color};" data-color="${color}"></span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="option-group">
                            <h4>Size:</h4>
                            <div class="size-options">
                                ${product.sizes.map(size => `
                                    <span class="size-option">${size}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="quantity-selector">
                        <button class="minus-btn">-</button>
                        <input type="number" value="1" min="1">
                        <button class="plus-btn">+</button>
                    </div>
                    
                    <div class="quick-view-actions">
                        <button class="btn primary-btn add-to-cart-btn">Add to Cart</button>
                        <button class="btn secondary-btn">Add to Wishlist</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners to the new elements
        modalBody.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', function() {
                modalBody.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        modalBody.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', function() {
                modalBody.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        const minusBtn = modalBody.querySelector('.minus-btn');
        const plusBtn = modalBody.querySelector('.plus-btn');
        const quantityInput = modalBody.querySelector('input');
        
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
        
        modalBody.querySelector('.add-to-cart-btn').addEventListener('click', function() {
            const cartCount = document.querySelector('.cart-count');
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count + parseInt(quantityInput.value);
            
            // Show added to cart notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = `${quantityInput.value} ${product.name} added to cart!`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    }
    
    function generateStarRating(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
        if (e.target === quickViewModal) {
            quickViewModal.classList.remove('active');
        }
    });

    // Add to cart functionality for product cards
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const cartCount = document.querySelector('.cart-count');
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count + 1;
            
            // Animation
            const cartIcon = document.querySelector('.cart-btn i');
            cartIcon.classList.add('animate');
            setTimeout(() => {
                cartIcon.classList.remove('animate');
            }, 500);
        });
    });

    // Add to wishlist functionality
    document.querySelectorAll('.add-to-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // 3D Model Customizer Controls
    const customizerControls = document.querySelectorAll('.control-btn');
    
    customizerControls.forEach(control => {
        control.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const model = document.getElementById('customizer-model');
            
            // In a real implementation, this would control the 3D model
            switch(action) {
                case 'rotate':
                    model.style.transform = model.style.transform ? '' : 'rotateY(180deg)';
                    break;
                case 'zoom-in':
                    model.style.transform = model.style.transform.includes('scale') ? 
                        model.style.transform.replace(/scale\(([\d.]+)\)/, (match, p1) => `scale(${parseFloat(p1) + 0.1})`) : 
                        (model.style.transform + ' scale(1.1)').trim();
                    break;
                case 'zoom-out':
                    model.style.transform = model.style.transform.includes('scale') ? 
                        model.style.transform.replace(/scale\(([\d.]+)\)/, (match, p1) => {
                            const newScale = Math.max(0.5, parseFloat(p1) - 0.1);
                            return `scale(${newScale})`;
                        }) : 
                        model.style.transform;
                    break;
                case 'reset':
                    model.style.transform = '';
                    break;
            }
        });
    });

    // Scroll indicator animation
    const scrollDots = document.querySelectorAll('.scroll-dot');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calculate which section is in view
        const sectionIndex = Math.min(
            Math.floor(scrollPosition / (documentHeight / 3)),
            scrollDots.length - 1
        );
        
        scrollDots.forEach((dot, index) => {
            if (index === sectionIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card, .customizer-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// In a real implementation, this would initialize Three.js for 3D models
function init3DModels() {
    // Hero model
    const heroModelContainer = document.getElementById('hero-model');
    // const heroScene = new THREE.Scene();
    // const heroCamera = new THREE.PerspectiveCamera(...);
    // const heroRenderer = new THREE.WebGLRenderer(...);
    // heroModelContainer.appendChild(heroRenderer.domElement);
    
    // Customizer model
    const customizerModelContainer = document.getElementById('customizer-model');
    // const customizerScene = new THREE.Scene();
    // const customizerCamera = new THREE.PerspectiveCamera(...);
    // const customizerRenderer = new THREE.WebGLRenderer(...);
    // customizerModelContainer.appendChild(customizerRenderer.domElement);
    
    // Load models and set up controls
    // ...
}

// Initialize 3D models when the page loads
window.addEventListener('load', init3DModels);

// Global variables for 3D scenes
const scenes = {};
const models = {};

// Initialize a product 3D model
function initProductModel(containerId, modelPath) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Set up Three.js scene
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    
    // Position camera
    camera.position.z = 5;
    
    // Load model
    const loader = new THREE.GLTFLoader();
    loader.load(
        modelPath,
        function(gltf) {
            const model = gltf.scene;
            scene.add(model);
            
            // Center model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.x += (model.position.x - center.x);
            model.position.y += (model.position.y - center.y);
            model.position.z += (model.position.z - center.z);
            
            // Scale model to fit
            const size = box.getSize(new THREE.Vector3()).length();
            const desiredSize = 3;
            const scale = desiredSize / size;
            model.scale.set(scale, scale, scale);
            
            // Store references
            scenes[containerId] = { scene, camera, renderer, controls, model };
            models[containerId] = model;
        },
        undefined,
        function(error) {
            console.error('Error loading model:', error);
            // Show placeholder if model fails to load
            container.style.backgroundImage = "url('images/placeholder-3d.jpg')";
            container.style.backgroundSize = "cover";
            container.style.backgroundPosition = "center";
        }
    );
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle container resize
    window.addEventListener('resize', function() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

// Initialize fullscreen 3D viewer
function initFullscreenModel(containerId, modelPath) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear previous content
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    // Set up Three.js scene
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);
    
    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    
    // Position camera
    camera.position.z = 5;
    
    // Load model
    const loader = new THREE.GLTFLoader();
    loader.load(
        modelPath,
        function(gltf) {
            const model = gltf.scene;
            scene.add(model);
            
            // Center model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.x += (model.position.x - center.x);
            model.position.y += (model.position.y - center.y);
            model.position.z += (model.position.z - center.z);
            
            // Scale model to fit
            const size = box.getSize(new THREE.Vector3()).length();
            const desiredSize = 3;
            const scale = desiredSize / size;
            model.scale.set(scale, scale, scale);
            
            // Store references
            scenes[containerId] = { scene, camera, renderer, controls, model };
            models[containerId] = model;
        },
        undefined,
        function(error) {
            console.error('Error loading model:', error);
            // Show placeholder if model fails to load
            container.style.backgroundImage = "url('images/placeholder-3d.jpg')";
            container.style.backgroundSize = "cover";
            container.style.backgroundPosition = "center";
        }
    );
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle container resize
    window.addEventListener('resize', function() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

// Restart model animation
function restartModelAnimation(containerId) {
    if (scenes[containerId]) {
        scenes[containerId].controls.autoRotate = true;
    }
}

// Update model color
function updateModelColor(containerId, color) {
    if (models[containerId]) {
        models[containerId].traverse(function(child) {
            if (child.isMesh) {
                child.material.color.setHex(parseInt(color.replace('#', '0x')));
            }
        });
    }
}

// Play step animation
function playStepAnimation(containerId) {
    if (scenes[containerId]) {
        // Add some animation effect
        gsap.to(scenes[containerId].camera.position, {
            z: 3,
            duration: 1,
            ease: "power2.inOut"
        });
        
        gsap.from(models[containerId].scale, {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
        });
    }
}

// Initialize about page models
function initAboutModel(containerId, modelPath) {
    initProductModel(containerId, modelPath);
}

function initProcessModel(containerId, modelPath) {
    initProductModel(containerId, modelPath);
}

function initTeamModel(containerId, modelPath) {
    initProductModel(containerId, modelPath);
}

function initSustainabilityModel(containerId, modelPath) {
    initProductModel(containerId, modelPath);
}

// Initialize gallery models
function initGalleryModel(containerId, modelPath) {
    initProductModel(containerId, modelPath);
}

// Initialize contact map
function initContactMap(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Set up Three.js scene
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create simple map representation
    createMapScene(scene, 'accra');
    
    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Position camera
    camera.position.set(0, 10, 15);
    controls.target.set(0, 0, 0);
    
    // Store references
    scenes[containerId] = { scene, camera, renderer, controls };
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle container resize
    window.addEventListener('resize', function() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

// Create map scene
function createMapScene(scene, location) {
    // Clear previous map objects
    while (scene.children.length > 2) { // Keep lights
        scene.remove(scene.children[2]);
    }
    
    // Create ground plane
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B5A2B,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    
    // Create location-specific elements
    if (location === 'accra') {
        // Accra showroom
        const showroom = createBuilding(0x654321, 0, 0, 0);
        scene.add(showroom);
        
        // Add some surrounding buildings
        for (let i = 0; i < 5; i++) {
            const x = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 20;
            const height = 1 + Math.random() * 3;
            const color = Math.random() > 0.5 ? 0xC19A6B : 0x654321;
            const building = createBuilding(color, x, 0, z, height);
            scene.add(building);
        }
    } else if (location === 'kumasi') {
        // Kumasi workshop
        const workshop = createBuilding(0xC19A6B, 0, 0, 0, 2, 4, 3);
        scene.add(workshop);
        
        // Add trees
        for (let i = 0; i < 10; i++) {
            const x = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 20;
            const tree = createTree(x, 0, z);
            scene.add(tree);
        }
    } else if (location === 'takoradi') {
        // Takoradi store
        const store = createBuilding(0x8B5A2B, 0, 0, 0, 1.5, 3, 2);
        scene.add(store);
        
        // Add ocean
        const waterGeometry = new THREE.PlaneGeometry(30, 15);
        const waterMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1E90FF,
            transparent: true,
            opacity: 0.8,
            metalness: 0.7,
            roughness: 0.1
        });
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.position.z = -10;
        scene.add(water);
    }
}

// Create simple building
function createBuilding(color, x, y, z, height = 2, width = 2, depth = 2) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color });
    const building = new THREE.Mesh(geometry, material);
    building.position.set(x, height / 2, z);
    return building;
}

// Create simple tree
function createTree(x, y, z) {
    const trunkHeight = 1 + Math.random();
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, trunkHeight, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, trunkHeight / 2, z);
    
    const leavesSize = 1 + Math.random();
    const leavesGeometry = new THREE.SphereGeometry(leavesSize, 8, 8);
    const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(x, trunkHeight + leavesSize / 2, z);
    
    const tree = new THREE.Group();
    tree.add(trunk);
    tree.add(leaves);
    
    return tree;
}

// Update map location
function updateMapLocation(location) {
    const containerId = 'contact-map';
    if (scenes[containerId]) {
        createMapScene(scenes[containerId].scene, location);
    }
}

// Initialize virtual showroom
function initVirtualShowroom(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Set up Three.js scene
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xf9f5f0);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create room
    createRoomScene(scene, 'living');
    
    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.maxPolarAngle = Math.PI / 2;
    
    // Position camera
    camera.position.set(0, 2, 5);
    controls.target.set(0, 1, 0);
    
    // Store references
    scenes[containerId] = { scene, camera, renderer, controls };
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle container resize
    window.addEventListener('resize', function() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

// Create room scene
function createRoomScene(scene, roomType) {
    // Clear previous room objects
    while (scene.children.length > 2) { // Keep lights
        scene.remove(scene.children[2]);
    }
    
    // Create floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xC19A6B,
        roughness: 0.8
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.1;
    scene.add(floor);
    
    // Create walls
    const wallGeometry = new THREE.PlaneGeometry(10, 3);
    const wallMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xF5F5DC,
        side: THREE.DoubleSide
    });
    
    const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
    backWall.position.z = -5;
    scene.add(backWall);
    
    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -5;
    scene.add(leftWall);
    
    const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
    rightWall.rotation.y = Math.PI / 2;
    rightWall.position.x = 5;
    scene.add(rightWall);
    
    // Add room-specific furniture
    if (roomType === 'living') {
        // Sofa
        const sofaGeometry = new THREE.BoxGeometry(2, 0.8, 1);
        const sofaMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B5A2B,
            roughness: 0.7
        });
        const sofa = new THREE.Mesh(sofaGeometry, sofaMaterial);
        sofa.position.set(0, 0.4, -2);
        scene.add(sofa);
        
        // Coffee table
        const tableGeometry = new THREE.BoxGeometry(1.2, 0.5, 1.2);
        const tableMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x654321,
            roughness: 0.5,
            metalness: 0.3
        });
        const table = new THREE.Mesh(tableGeometry, tableMaterial);
        table.position.set(0, 0.25, 0);
        scene.add(table);
        
        // Chair
        const chairGeometry = new THREE.BoxGeometry(0.8, 1, 0.8);
        const chairMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B5A2B,
            roughness: 0.7
        });
        const chair = new THREE.Mesh(chairGeometry, chairMaterial);
        chair.position.set(2, 0.5, -1);
        scene.add(chair);
        
    } else if (roomType === 'dining') {
        // Dining table
        const tableGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.7, 8);
        const tableMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x654321,
            roughness: 0.5
        });
        const table = new THREE.Mesh(tableGeometry, tableMaterial);
        table.position.set(0, 0.35, 0);
        scene.add(table);
        
        // Chairs
        const chairGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.5);
        const chairMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B5A2B,
            roughness: 0.7
        });
        
        for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            const x = Math.cos(angle) * 1.5;
            const z = Math.sin(angle) * 1.5;
            
            const chair = new THREE.Mesh(chairGeometry, chairMaterial);
            chair.position.set(x, 0.4, z);
            chair.rotation.y = -angle;
            scene.add(chair);
        }
        
    } else if (roomType === 'bedroom') {
        // Bed
        const bedGeometry = new THREE.BoxGeometry(2, 0.5, 1.8);
        const bedMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B5A2B,
            roughness: 0.7
        });
        const bed = new THREE.Mesh(bedGeometry, bedMaterial);
        bed.position.set(0, 0.25, -1.5);
        scene.add(bed);
        
        // Nightstand
        const nightstandGeometry = new THREE.BoxGeometry(0.6, 0.7, 0.6);
        const nightstandMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x654321,
            roughness: 0.5
        });
        const nightstand = new THREE.Mesh(nightstandGeometry, nightstandMaterial);
        nightstand.position.set(1.5, 0.35, -1.5);
        scene.add(nightstand);
        
    } else if (roomType === 'office') {
        // Desk
        const deskGeometry = new THREE.BoxGeometry(1.5, 0.7, 0.8);
        const deskMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x654321,
            roughness: 0.5
        });
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.set(0, 0.35, -1);
        scene.add(desk);
        
        // Chair
        const chairGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.6);
        const chairMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B5A2B,
            roughness: 0.7
        });
        const chair = new THREE.Mesh(chairGeometry, chairMaterial);
        chair.position.set(0, 0.4, 0.5);
        scene.add(chair);
        
        // Bookshelf
        const shelfGeometry = new THREE.BoxGeometry(0.3, 1.8, 1.2);
        const shelfMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B5A2B,
            roughness: 0.7
        });
        const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
        shelf.position.set(2, 0.9, 0);
        scene.add(shelf);
    }
}

// Update showroom scene
function updateShowroomScene(roomType) {
    const containerId = 'virtual-showroom';
    if (scenes[containerId]) {
        createRoomScene(scenes[containerId].scene, roomType);
    }
}

// Initialize success animation
function initSuccessAnimation(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Create simple HTML/CSS animation
    container.innerHTML = `
        <div class="checkmark">
            <div class="check-icon">
                <span class="icon-line line-tip"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
            </div>
        </div>
    `;
}

// Play success animation
function playSuccessAnimation() {
    const containerId = 'success-animation';
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Animate checkmark
    gsap.from(container.querySelector('.line-tip'), {
        scaleX: 0,
        duration: 0.5,
        delay: 0.1,
        ease: "power2.out"
    });
    
    gsap.from(container.querySelector('.line-long'), {
        scaleX: 0,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out"
    });
    
    gsap.from(container.querySelector('.icon-circle'), {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
    });
}

// Designer variables
let currentDesign = {
    type: 'chair',
    material: 'mahogany',
    symbols: [],
    dimensions: {
        width: 80,
        height: 90,
        depth: 60
    }
};

// Initialize 3D designer
function initDesigner(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Set up Three.js scene
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xf9f5f0);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);
    
    // Create initial design
    createDesign(scene);
    
    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    
    // Position camera
    camera.position.set(2, 2, 3);
    controls.target.set(0, 0.5, 0);
    
    // Store references
    scenes[containerId] = { scene, camera, renderer, controls };
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle container resize
    window.addEventListener('resize', function() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

// Create current design
function createDesign(scene) {
    // Clear previous design
    while (scene.children.length > 3) { // Keep lights
        scene.remove(scene.children[3]);
    }
    
    // Create design based on current settings
    if (currentDesign.type === 'chair') {
        createChair(scene);
    } else if (currentDesign.type === 'table') {
        createTable(scene);
    } else if (currentDesign.type === 'sofa') {
        createSofa(scene);
    } else if (currentDesign.type === 'bed') {
        createBed(scene);
    } else if (currentDesign.type === 'storage') {
        createStorage(scene);
    }
    
    // Update price estimate
    updatePriceEstimate();
}

// Create chair design
function createChair(scene) {
    const { width, height, depth } = currentDesign.dimensions;
    const scale = 0.01; // Convert cm to meters
    
    // Get material color
    const materialColor = getMaterialColor(currentDesign.material);
    
    // Create chair parts
    const legGeometry = new THREE.BoxGeometry(
        0.08 * width * scale, 
        0.9 * height * scale, 
        0.08 * depth * scale
    );
    const legMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    
    // Front left leg
    const legFL = new THREE.Mesh(legGeometry, legMaterial);
    legFL.position.set(
        -0.4 * width * scale,
        0.45 * height * scale,
        0.4 * depth * scale
    );
    scene.add(legFL);
    
    // Front right leg
    const legFR = new THREE.Mesh(legGeometry, legMaterial);
    legFR.position.set(
        0.4 * width * scale,
        0.45 * height * scale,
        0.4 * depth * scale
    );
    scene.add(legFR);
    
    // Back left leg
    const legBL = new THREE.Mesh(legGeometry, legMaterial);
    legBL.position.set(
        -0.4 * width * scale,
        0.45 * height * scale,
        -0.4 * depth * scale
    );
    scene.add(legBL);
    
    // Back right leg
    const legBR = new THREE.Mesh(legGeometry, legMaterial);
    legBR.position.set(
        0.4 * width * scale,
        0.45 * height * scale,
        -0.4 * depth * scale
    );
    scene.add(legBR);
    
    // Seat
    const seatGeometry = new THREE.BoxGeometry(
        0.9 * width * scale,
        0.05 * height * scale,
        0.9 * depth * scale
    );
    const seatMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 0.5 * height * scale, 0);
    scene.add(seat);
    
    // Backrest
    const backrestGeometry = new THREE.BoxGeometry(
        0.9 * width * scale,
        0.7 * height * scale,
        0.05 * depth * scale
    );
    const backrestMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
    backrest.position.set(0, 0.85 * height * scale, -0.45 * depth * scale);
    scene.add(backrest);
    
    // Add symbols if any
    if (currentDesign.symbols.length > 0) {
        const symbolGeometry = new THREE.PlaneGeometry(
            0.3 * width * scale,
            0.3 * height * scale
        );
        
        // Load symbol textures
        currentDesign.symbols.forEach(symbol => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                `images/symbols/${symbol}.png`,
                function(texture) {
                    const symbolMaterial = new THREE.MeshStandardMaterial({ 
                        map: texture,
                        transparent: true,
                        side: THREE.DoubleSide
                    });
                    const symbolMesh = new THREE.Mesh(symbolGeometry, symbolMaterial);
                    symbolMesh.position.set(0, 0.85 * height * scale, -0.46 * depth * scale);
                    symbolMesh.rotation.y = Math.PI;
                    scene.add(symbolMesh);
                }
            );
        });
    }
}

// Create table design
function createTable(scene) {
    const { width, height, depth } = currentDesign.dimensions;
    const scale = 0.01; // Convert cm to meters
    
    // Get material color
    const materialColor = getMaterialColor(currentDesign.material);
    
    // Create table parts
    const legGeometry = new THREE.CylinderGeometry(
        0.05 * width * scale,
        0.05 * width * scale,
        0.8 * height * scale,
        8
    );
    const legMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    
    // Legs
    for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const x = Math.cos(angle) * 0.35 * width * scale;
        const z = Math.sin(angle) * 0.35 * depth * scale;
        
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(x, 0.4 * height * scale, z);
        scene.add(leg);
    }
    
    // Table top
    const topGeometry = new THREE.CylinderGeometry(
        0.5 * width * scale,
        0.5 * width * scale,
        0.05 * height * scale,
        8
    );
    const topMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.5
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.set(0, 0.825 * height * scale, 0);
    scene.add(top);
    
    // Add symbols if any
    if (currentDesign.symbols.length > 0) {
        const symbolGeometry = new THREE.PlaneGeometry(
            0.2 * width * scale,
            0.2 * depth * scale
        );
        
        // Load symbol textures
        currentDesign.symbols.forEach(symbol => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                `images/symbols/${symbol}.png`,
                function(texture) {
                    const symbolMaterial = new THREE.MeshStandardMaterial({ 
                        map: texture,
                        transparent: true,
                        side: THREE.DoubleSide
                    });
                    const symbolMesh = new THREE.Mesh(symbolGeometry, symbolMaterial);
                    symbolMesh.position.set(0, 0.83 * height * scale, 0);
                    symbolMesh.rotation.x = -Math.PI / 2;
                    scene.add(symbolMesh);
                }
            );
        });
    }
}

// Create sofa design
function createSofa(scene) {
    const { width, height, depth } = currentDesign.dimensions;
    const scale = 0.01; // Convert cm to meters
    
    // Get material color
    const materialColor = getMaterialColor(currentDesign.material);
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(
        0.9 * width * scale,
        0.3 * height * scale,
        0.9 * depth * scale
    );
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 0.15 * height * scale, 0);
    scene.add(base);
    
    // Back
    const backGeometry = new THREE.BoxGeometry(
        0.9 * width * scale,
        0.7 * height * scale,
        0.1 * depth * scale
    );
    const backMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    const back = new THREE.Mesh(backGeometry, backMaterial);
    back.position.set(0, 0.65 * height * scale, -0.4 * depth * scale);
    scene.add(back);
    
    // Arms
    const armGeometry = new THREE.BoxGeometry(
        0.1 * width * scale,
        0.5 * height * scale,
        0.8 * depth * scale
    );
    const armMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    
    const armLeft = new THREE.Mesh(armGeometry, armMaterial);
    armLeft.position.set(-0.5 * width * scale, 0.5 * height * scale, 0);
    scene.add(armLeft);
    
    const armRight = new THREE.Mesh(armGeometry, armMaterial);
    armRight.position.set(0.5 * width * scale, 0.5 * height * scale, 0);
    scene.add(armRight);
    
    // Cushions
    const cushionGeometry = new THREE.BoxGeometry(
        0.8 * width * scale / 3,
        0.2 * height * scale,
        0.8 * depth * scale
    );
    const cushionMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.9
    });
    
    for (let i = 0; i < 3; i++) {
        const cushion = new THREE.Mesh(cushionGeometry, cushionMaterial);
        cushion.position.set(
            (-0.3 + i * 0.3) * width * scale,
            0.4 * height * scale,
            0.1 * depth * scale
        );
        scene.add(cushion);
    }
    
    // Add symbols if any
    if (currentDesign.symbols.length > 0) {
        const symbolGeometry = new THREE.PlaneGeometry(
            0.2 * width * scale,
            0.2 * height * scale
        );
        
        // Load symbol textures
        currentDesign.symbols.forEach(symbol => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                `images/symbols/${symbol}.png`,
                function(texture) {
                    const symbolMaterial = new THREE.MeshStandardMaterial({ 
                        map: texture,
                        transparent: true,
                        side: THREE.DoubleSide
                    });
                    const symbolMesh = new THREE.Mesh(symbolGeometry, symbolMaterial);
                    symbolMesh.position.set(0, 0.65 * height * scale, -0.41 * depth * scale);
                    symbolMesh.rotation.y = Math.PI;
                    scene.add(symbolMesh);
                }
            );
        });
    }
}

// Create bed design
function createBed(scene) {
    const { width, height, depth } = currentDesign.dimensions;
    const scale = 0.01; // Convert cm to meters
    
    // Get material color
    const materialColor = getMaterialColor(currentDesign.material);
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(
        0.9 * width * scale,
        0.2 * height * scale,
        0.9 * depth * scale
    );
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, 0.1 * height * scale, 0);
    scene.add(base);
    
    // Mattress
    const mattressGeometry = new THREE.BoxGeometry(
        0.85 * width * scale,
        0.3 * height * scale,
        0.85 * depth * scale
    );
    const mattressMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF,
        roughness: 0.9
    });
    const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
    mattress.position.set(0, 0.35 * height * scale, 0);
    scene.add(mattress);
    
    // Headboard
    const headboardGeometry = new THREE.BoxGeometry(
        0.9 * width * scale,
        0.5 * height * scale,
        0.05 * depth * scale
    );
    const headboardMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    const headboard = new THREE.Mesh(headboardGeometry, headboardMaterial);
    headboard.position.set(0, 0.5 * height * scale, -0.425 * depth * scale);
    scene.add(headboard);
    
    // Add symbols if any
    if (currentDesign.symbols.length > 0) {
        const symbolGeometry = new THREE.PlaneGeometry(
            0.3 * width * scale,
            0.2 * height * scale
        );
        
        // Load symbol textures
        currentDesign.symbols.forEach(symbol => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                `images/symbols/${symbol}.png`,
                function(texture) {
                    const symbolMaterial = new THREE.MeshStandardMaterial({ 
                        map: texture,
                        transparent: true,
                        side: THREE.DoubleSide
                    });
                    const symbolMesh = new THREE.Mesh(symbolGeometry, symbolMaterial);
                    symbolMesh.position.set(0, 0.5 * height * scale, -0.43 * depth * scale);
                    symbolMesh.rotation.y = Math.PI;
                    scene.add(symbolMesh);
                }
            );
        });
    }
}

// Create storage design
function createStorage(scene) {
    const { width, height, depth } = currentDesign.dimensions;
    const scale = 0.01; // Convert cm to meters
    
    // Get material color
    const materialColor = getMaterialColor(currentDesign.material);
    
    // Main body
    const bodyGeometry = new THREE.BoxGeometry(
        0.9 * width * scale,
        0.9 * height * scale,
        0.9 * depth * scale
    );
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 0.45 * height * scale, 0);
    scene.add(body);
    
    // Shelves
    const shelfGeometry = new THREE.BoxGeometry(
        0.85 * width * scale,
        0.02 * height * scale,
        0.85 * depth * scale
    );
    const shelfMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    
    for (let i = 1; i <= 3; i++) {
        const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
        shelf.position.set(0, (i * 0.25) * height * scale, 0);
        scene.add(shelf);
    }
    
    // Doors
    const doorGeometry = new THREE.BoxGeometry(
        0.4 * width * scale,
        0.7 * height * scale,
        0.02 * depth * scale
    );
    const doorMaterial = new THREE.MeshStandardMaterial({ 
        color: materialColor,
        roughness: 0.7
    });
    
    const doorLeft = new THREE.Mesh(doorGeometry, doorMaterial);
    doorLeft.position.set(-0.25 * width * scale, 0.35 * height * scale, 0.46 * depth * scale);
    scene.add(doorLeft);
    
    const doorRight = new THREE.Mesh(doorGeometry, doorMaterial);
    doorRight.position.set(0.25 * width * scale, 0.35 * height * scale, 0.46 * depth * scale);
    scene.add(doorRight);
    
    // Add symbols if any
    if (currentDesign.symbols.length > 0) {
        const symbolGeometry = new THREE.PlaneGeometry(
            0.2 * width * scale,
            0.2 * height * scale
        );
        
        // Load symbol textures
        currentDesign.symbols.forEach(symbol => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                `images/symbols/${symbol}.png`,
                function(texture) {
                    const symbolMaterial = new THREE.MeshStandardMaterial({ 
                        map: texture,
                        transparent: true,
                        side: THREE.DoubleSide
                    });
                    const symbolMesh = new THREE.Mesh(symbolGeometry, symbolMaterial);
                    symbolMesh.position.set(0, 0.7 * height * scale, 0.46 * depth * scale);
                    scene.add(symbolMesh);
                }
            );
        });
    }
}

// Get material color
function getMaterialColor(material) {
    switch(material) {
        case 'mahogany':
            return 0x8B5A2B;
        case 'oak':
            return 0xC19A6B;
        case 'walnut':
            return 0x38220F;
        case 'wenge':
            return 0x3A2A1A;
        default:
            return 0x8B5A2B;
    }
}

// Update designer type
function updateDesignerType(type) {
    currentDesign.type = type;
    createDesign(scenes['designer-viewport'].scene);
}

// Update designer material
function updateDesignerMaterial(material) {
    currentDesign.material = material;
    createDesign(scenes['designer-viewport'].scene);
}

// Toggle designer symbol
function toggleDesignerSymbol(symbol) {
    const index = currentDesign.symbols.indexOf(symbol);
    if (index === -1) {
        currentDesign.symbols.push(symbol);
    } else {
        currentDesign.symbols.splice(index, 1);
    }
    createDesign(scenes['designer-viewport'].scene);
}

// Update designer dimension
function updateDesignerDimension(dimension, value) {
    currentDesign.dimensions[dimension] = parseInt(value);
    createDesign(scenes['designer-viewport'].scene);
}

// Update price estimate
function updatePriceEstimate() {
    // Calculate price based on design parameters
    let basePrice = 0;
    
    // Base price by type
    switch(currentDesign.type) {
        case 'chair':
            basePrice = 800;
            break;
        case 'table':
            basePrice = 1500;
            break;
        case 'sofa':
            basePrice = 2500;
            break;
        case 'bed':
            basePrice = 3000;
            break;
        case 'storage':
            basePrice = 2000;
            break;
    }
    
    // Material multiplier
    let materialMultiplier = 1;
    switch(currentDesign.material) {
        case 'mahogany':
            materialMultiplier = 1.2;
            break;
        case 'oak':
            materialMultiplier = 1;
            break;
        case 'walnut':
            materialMultiplier = 1.3;
            break;
        case 'wenge':
            materialMultiplier = 1.4;
            break;
    }
    
    // Size adjustment
    const { width, height, depth } = currentDesign.dimensions;
    const sizeFactor = (width * height * depth) / (80 * 90 * 60); // Compared to standard chair
    
    // Symbols adjustment
    const symbolsAdjustment = currentDesign.symbols.length * 200;
    
    // Calculate final price
    const price = Math.round((basePrice * materialMultiplier * sizeFactor) + symbolsAdjustment);
    
    // Update display
    document.getElementById('estimated-price').textContent = price.toLocaleString();
}

// Load gallery design
function loadGalleryDesign(designId) {
    // In a real implementation, this would load saved design parameters
    // For demo, we'll just show an alert
    alert(`Loading design ${designId} to remix...`);
    
    // Example of how it might work:
    
    fetch(`api/designs/${designId}`)
        .then(response => response.json())
        .then(design => {
            currentDesign = design;
            updateDesignerType(design.type);
            updateDesignerMaterial(design.material);
            // ... update other parameters
            createDesign(scenes['designer-viewport'].scene);
        });
    
}