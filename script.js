// Page Navigation System
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu-item');
    const pages = document.querySelectorAll('.page');
    
    // Initialize first page
    showPage('home');
    
    // Add click events to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Update active navigation
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target page
            showPage(targetPage);
        });
    });
    
    function showPage(pageId) {
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.remove('d-none');
                page.classList.add('fade-in');
            } else {
                page.classList.add('d-none');
                page.classList.remove('fade-in');
            }
        });
        
        // Scroll to top when changing pages
        window.scrollTo(0, 0);
    }
    
    // Products Filter System
    const brandFilters = document.querySelectorAll('.brand-filter .nav-link');
    const productItems = document.querySelectorAll('.product-item');
    
    brandFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            const targetBrand = this.getAttribute('data-brand');
            
            // Update active filter
            brandFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            filterProducts(targetBrand);
        });
    });
    
    function filterProducts(brand) {
        productItems.forEach(item => {
            if (brand === 'all' || item.getAttribute('data-brand') === brand) {
                item.style.display = 'block';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    }
    
    // Shopping Cart Functionality
    const cartButtons = document.querySelectorAll('[title="Add to Cart"]');
    const wishlistButtons = document.querySelectorAll('[title="Add to Wishlist"]');
    const quickViewButtons = document.querySelectorAll('[title="Quick View"]');
    const compareButtons = document.querySelectorAll('[title="Compare"]');
    
    let cart = [];
    let wishlist = [];
    let compareList = [];
    
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToCart(this);
        });
    });
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToWishlist(this);
        });
    });
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            quickView(this);
        });
    });
    
    compareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToCompare(this);
        });
    });
    
    function addToCart(button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.card-title').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        // Add animation
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.classList.add('btn-success');
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i>';
            button.classList.remove('btn-success');
        }, 1000);
        
        // Show success message
        showNotification(`${productName} added to cart!`, 'success');
        
        // Add to cart array
        cart.push({
            name: productName,
            price: productPrice,
            id: Date.now()
        });
        
        updateCartCounter();
    }
    
    function addToWishlist(button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.card-title').textContent;
        
        // Toggle wishlist
        if (button.classList.contains('btn-danger')) {
            button.classList.remove('btn-danger');
            button.classList.add('btn-outline-danger');
            showNotification(`${productName} removed from wishlist!`, 'info');
        } else {
            button.classList.remove('btn-outline-danger');
            button.classList.add('btn-danger');
            showNotification(`${productName} added to wishlist!`, 'success');
        }
    }
    
    function quickView(button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.card-title').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('.card-img-top').src;
        const productCategory = productCard.querySelector('small').textContent;
        
        // Create modal for quick view
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${productName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${productImage}" class="img-fluid rounded" alt="${productName}">
                            </div>
                            <div class="col-md-6">
                                <p class="text-muted">${productCategory}</p>
                                <h4>${productName}</h4>
                                <h3 class="text-primary">${productPrice}</h3>
                                <p class="mt-3">Experience premium quality footwear designed for comfort and style. Perfect for everyday wear and special occasions.</p>
                                <div class="mt-4">
                                    <label class="form-label">Size:</label>
                                    <select class="form-select mb-3">
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                    </select>
                                    <div class="mb-3">
                                        <label class="form-label">Quantity:</label>
                                        <input type="number" class="form-control" value="1" min="1" max="10">
                                    </div>
                                    <p class="text-success"><i class="fas fa-truck"></i> Expected delivery: 3-5 business days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        // Clean up modal after hiding
        modal.addEventListener('hidden.bs.modal', function() {
            document.body.removeChild(modal);
        });
    }
    
    function addToCompare(button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.card-title').textContent;
        
        if (compareList.length >= 3) {
            showNotification('You can only compare up to 3 products!', 'warning');
            return;
        }
        
        if (compareList.includes(productName)) {
            showNotification(`${productName} is already in compare list!`, 'info');
            return;
        }
        
        compareList.push(productName);
        showNotification(`${productName} added to compare list!`, 'success');
        
        // Visual feedback
        button.classList.add('btn-warning');
        setTimeout(() => {
            button.classList.remove('btn-warning');
        }, 1000);
    }
    
    function updateCartCounter() {
        // This would update a cart counter in the navigation
        console.log(`Cart items: ${cart.length}`);
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
        `;
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Newsletter Subscription
    const subscribeButton = document.querySelector('.newsletter-form .btn');
    const emailInput = document.querySelector('.newsletter-form .form-control');
    
    if (subscribeButton && emailInput) {
        subscribeButton.addEventListener('click', function() {
            const email = emailInput.value.trim();
            if (email && isValidEmail(email)) {
                showNotification('Successfully subscribed to newsletter!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address!', 'danger');
            }
        });
        
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeButton.click();
            }
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('shadow-lg');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        }
    });
    
    // Initialize animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.card, .service-item, .collection-card').forEach(el => {
        observer.observe(el);
    });
    
    // Loading screen simulation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});