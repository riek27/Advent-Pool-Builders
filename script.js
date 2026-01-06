// ===========================================
// ULTRA-LUXURY POOL DESIGN WEBSITE - 2026 TREND
// ADVENT POOLS - HOUSTON, TEXAS
// MAIN SCRIPT FILE
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ====================
    // GLOBAL VARIABLES
    // ====================
    let currentTestimonial = 0;
    let testimonialInterval;
    
    // ====================
    // NAVIGATION
    // ====================
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarLinks = document.querySelectorAll('.navbar-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navbarMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Set active navigation link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navbarLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (linkHref.includes(currentPage.replace('.html', '')) && linkHref !== '#')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Initialize active nav link
    setActiveNavLink();
    
    // ====================
    // TYPING ANIMATIONS
    // ====================
    const typedTextElements = document.querySelectorAll('.typed-text');
    
    if (typedTextElements.length > 0) {
        // Hero typing animation
        const heroTypedText = document.querySelector('.hero .typed-text');
        if (heroTypedText) {
            const heroPhrases = [
                "Luxury Custom Pools",
                "Architectural Pool Design",
                "Houston's Premier Pool Builders",
                "Outdoor Living Excellence"
            ];
            
            typeText(heroTypedText, heroPhrases);
        }
        
        // CTA typing animation
        const ctaTypedText = document.querySelector('.cta-section .typed-text');
        if (ctaTypedText) {
            const ctaPhrases = [
                "Ready to Build Your Dream Pool?",
                "Let's Create Something Extraordinary.",
                "Start Your Design Journey Today."
            ];
            
            typeText(ctaTypedText, ctaPhrases);
        }
    }
    
    // Typing animation function
    function typeText(element, phrases) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Deleting text
                element.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Typing text
                element.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // If phrase is complete
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at end
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                // Move to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing animation after a delay
        setTimeout(type, 1000);
    }
    
    // ====================
    // SCROLL REVEAL ANIMATIONS
    // ====================
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    
    // Initial check
    checkReveal();
    
    // ====================
    // TESTIMONIALS SLIDER
    // ====================
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonialSlides.length > 0) {
        function showTestimonial(index) {
            // Hide all slides
            testimonialSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all dots
            testimonialDots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show selected slide and dot
            testimonialSlides[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            
            currentTestimonial = index;
        }
        
        // Add click events to dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
                resetTestimonialInterval();
            });
        });
        
        // Auto-rotate testimonials
        function startTestimonialInterval() {
            testimonialInterval = setInterval(() => {
                let nextTestimonial = currentTestimonial + 1;
                if (nextTestimonial >= testimonialSlides.length) {
                    nextTestimonial = 0;
                }
                showTestimonial(nextTestimonial);
            }, 6000);
        }
        
        function resetTestimonialInterval() {
            clearInterval(testimonialInterval);
            startTestimonialInterval();
        }
        
        // Initialize testimonial slider
        showTestimonial(0);
        startTestimonialInterval();
    }
    
    // ====================
    // PROJECT MODAL
    // ====================
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalContent = document.getElementById('modalContent');
    
    if (projectCards.length > 0) {
        // Project data for modal
        const projects = [
            {
                title: "River Oaks Residence",
                location: "Houston, Texas",
                category: "Infinity Pool",
                description: "A stunning infinity-edge pool with integrated spa and custom water features. This project features a sleek modern design with natural stone coping and LED lighting that creates a mesmerizing evening ambiance. The pool seamlessly blends with the landscape, creating a tranquil oasis in the heart of Houston.",
                features: [
                    "Infinity-edge design with vanishing edge",
                    "Integrated heated spa with massage jets",
                    "Custom water wall feature",
                    "Natural limestone coping and decking",
                    "Advanced LED color-changing lighting system",
                    "Automated pool cover for safety"
                ],
                size: "18m × 8m",
                completion: "2023"
            },
            {
                title: "Memorial Modern",
                location: "Houston, Texas",
                category: "Geometric Pool",
                description: "Geometric pool design with clean lines and premium finishes. This architectural masterpiece includes a sun shelf, custom tile work, and a sophisticated automation system for effortless operation. The design emphasizes symmetry and minimalism, creating a serene environment for relaxation and entertainment.",
                features: [
                    "Geometric design with sharp, clean lines",
                    "Baja shelf with built-in umbrella sleeve",
                    "Custom glass tile mosaic",
                    "Complete automation system with mobile control",
                    "Integrated cleaning system",
                    "Gas fire pit with seating"
                ],
                size: "15m × 6m",
                completion: "2022"
            },
            {
                title: "Tanglewood Estate",
                location: "Houston, Texas",
                category: "Resort-Style Pool",
                description: "Luxury resort-style pool with multiple water features and custom fire elements. This expansive aquatic environment includes a swim-up bar, fire bowls, and a complete outdoor kitchen and entertainment area. Designed for entertaining, this pool complex transforms the backyard into a private resort.",
                features: [
                    "Free-form resort-style design",
                    "Multiple waterfalls and water features",
                    "Swim-up bar with stools",
                    "Custom fire bowls along the perimeter",
                    "Complete outdoor kitchen with grill and fridge",
                    "Separate spa with waterfall spillover"
                ],
                size: "20m × 10m",
                completion: "2023"
            }
        ];
        
        // Open modal when project card is clicked
        projectCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const project = projects[index];
                
                modalContent.innerHTML = `
                    <div class="modal-header">
                        <h2 class="section-title">${project.title}</h2>
                        <p class="project-location mb-2">${project.location}</p>
                        <span class="project-category">${project.category}</span>
                    </div>
                    
                    <div class="modal-body">
                        <div class="project-details-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
                            <div>
                                <h4 style="color: var(--color-accent); margin-bottom: 1rem;">Project Details</h4>
                                <p>${project.description}</p>
                            </div>
                            <div>
                                <h4 style="color: var(--color-accent); margin-bottom: 1rem;">Specifications</h4>
                                <p><strong>Size:</strong> ${project.size}</p>
                                <p><strong>Completion:</strong> ${project.completion}</p>
                            </div>
                        </div>
                        
                        <h4 style="color: var(--color-accent); margin-bottom: 1rem;">Key Features</h4>
                        <ul class="service-features" style="margin-bottom: 2rem;">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        
                        <div class="hero-buttons">
                            <a href="contact.html" class="btn btn-primary">Request Similar Project</a>
                            <a href="projects.html" class="btn btn-outline">View All Projects</a>
                        </div>
                    </div>
                `;
                
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            // Close modal when clicking outside content
            projectModal.addEventListener('click', (e) => {
                if (e.target === projectModal) {
                    projectModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }
    
    // ====================
    // PARALLAX EFFECTS
    // ====================
    // Add subtle parallax to hero background on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg-image');
        
        if (heroBg) {
            const rate = scrolled * -0.3;
            heroBg.style.transform = `scale(1.15) rotate(0.5deg) translateY(${rate}px)`;
        }
        
        // Parallax for other elements
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // ====================
    // SMOOTH SCROLLING
    // ====================
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ====================
    // FORM VALIDATION
    // ====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for your inquiry! We will contact you within 24 hours.');
            contactForm.reset();
        });
    }
    
    // ====================
    // LAZY LOAD IMAGES
    // ====================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // ====================
    // CURSOR EFFECT (2026 Trend)
    // ====================
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    // Add cursor styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--color-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, background-color 0.3s;
            mix-blend-mode: difference;
        }
        
        .custom-cursor.hover {
            width: 40px;
            height: 40px;
            background-color: rgba(112, 209, 216, 0.2);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }
});
