// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');
    
    // Toggle menu function
    function toggleMenu() {
        hamburgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Event listener for hamburger menu click
    hamburgerMenu.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 480) {
                hamburgerMenu.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 480) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnHamburger = hamburgerMenu.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && nav.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 480) {
            hamburgerMenu.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(7, 22, 41, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('.form-input');
        
        // Add focus/blur effects
        formInputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            
            input.addEventListener('focus', function() {
                formGroup.classList.add('focused');
                formGroup.classList.remove('error');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    formGroup.classList.remove('focused');
                }
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (formGroup.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate all fields
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show success message
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                
                // Remove focused state from all form groups
                formInputs.forEach(input => {
                    input.closest('.form-group').classList.remove('focused');
                });
            }
        });
    }
    
    // Field validation function
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error state
        formGroup.classList.remove('error');
        
        // Check if field is empty
        if (!field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required.';
        } else {
            // Email validation
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
            }
            
            // Name validation
            if (field.id === 'name') {
                if (field.value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long.';
                }
            }
            
            // Message validation
            if (field.id === 'message') {
                if (field.value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long.';
                }
            }
        }
        
        // Apply error state if invalid
        if (!isValid) {
            formGroup.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
        }
        
        return isValid;
    }
    
    // Show form message function
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.textContent = message;
        
        // Style the message
        messageElement.style.cssText = `
            padding: 12px 16px;
            margin: 16px 0;
            border-radius: 4px;
            font-size: 14px;
            text-align: center;
            animation: fadeInUp 0.3s ease-out;
        `;
        
        if (type === 'success') {
            messageElement.style.backgroundColor = '#d4edda';
            messageElement.style.color = '#155724';
            messageElement.style.border = '1px solid #c3e6cb';
        } else {
            messageElement.style.backgroundColor = '#f8d7da';
            messageElement.style.color = '#721c24';
            messageElement.style.border = '1px solid #f5c6cb';
        }
        
        // Insert message after form
        contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.type === 'submit') return; // Skip form submit buttons
            
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading (remove in production)
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .result-card, .contact-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
