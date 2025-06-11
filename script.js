document.addEventListener('DOMContentLoaded', () => {
    // --- Hero Slider Functionality ---
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function updateSliderPosition() {
        slider.style.transform = `translateX(${-currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSliderPosition();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSliderPosition();
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide(); // Start auto-sliding when the page loads

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    menuToggle.addEventListener('click', () => {
        mainNavUl.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked (optional)
    mainNavUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNavUl.classList.contains('active')) {
                mainNavUl.classList.remove('active');
            }
        });
    });


    // --- Cart Count Update (Example - for a real store, this would be dynamic from backend) ---
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    const cartCountSpan = document.querySelector('.cart-icon .cart-count');
    let cartItemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartItemCount++;
            cartCountSpan.textContent = cartItemCount;
            alert('ផលិតផលបានបញ្ចូលទៅក្នុងកន្ត្រក!'); // Simple alert for demonstration
        });
    });

    // --- Active Nav Link (Initial load and smooth scroll for section links) ---
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    // Handle initial active state based on URL (e.g., if you have /products page)
    const currentPath = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        link.classList.remove('active'); // Clear existing active states

        // Logic for setting active class
        if (currentPath === '' || currentPath === 'index.html') {
            if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '/') {
                link.classList.add('active');
            }
        } else if (link.getAttribute('href').includes(currentPath)) {
            link.classList.add('active');
        }
    });

    // Smooth scrolling for anchor links (e.g., #products)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight; // Get header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20; // -20 for extra space

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link based on scroll (more advanced logic might involve Intersection Observer)
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

});


document.addEventListener('DOMContentLoaded', () => {
    console.log('Page fully loaded and parsed.');

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (menuToggle && mainNavUl) {
        menuToggle.addEventListener('click', () => {
            mainNavUl.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        mainNavUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNavUl.classList.contains('active')) {
                    mainNavUl.classList.remove('active');
                }
            });
        });
    }


    // --- Cart Count Update (Example - for a real store, this would be dynamic from backend) ---
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart'); // No add to cart buttons in this specific layout, but keep for future
    const cartCountSpan = document.querySelector('.nav-right-icons .cart-count');
    let cartItemCount = 0; // Initialize cart count

    // This section is for demonstration. In a real app, this would update from storage/server.
    // For now, let's just make sure the count is displayed correctly if you manually set it.
    if (cartCountSpan) {
        cartCountSpan.textContent = cartItemCount; // Display initial count
    }

    // Example: If you add "Add to Cart" buttons later, uncomment this:
    /*
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartItemCount++;
            cartCountSpan.textContent = cartItemCount;
            alert('ផលិតផលបានបញ្ចូលទៅក្នុងកន្ត្រក!'); // Simple alert for demonstration
        });
    });
    */

    // --- Active Nav Link (Based on text content for now) ---
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    // Function to set active class
    function setActiveNavLink(activeLinkText) {
        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove existing active states
            if (link.textContent.trim() === activeLinkText) {
                link.classList.add('active');
            }
        });
    }

    // Set 'Laptop' as active by default, as seen in the image
    setActiveNavLink('Laptop');

    // You might want to update active state based on scroll position or URL later
    // For now, it's just set to 'Laptop' as per the image.
});