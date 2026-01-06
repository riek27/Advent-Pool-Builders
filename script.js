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

// ===========================================
// ADVANCED AI CHATBOT FOR ADVENT POOLS
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ====================
    // CHATBOT ELEMENTS
    // ====================
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const typingIndicator = document.getElementById('typingIndicator');
    
    // ====================
    // CHATBOT STATE
    // ====================
    let isChatbotOpen = false;
    let conversationHistory = [];
    
    // ====================
    // KNOWLEDGE BASE - ADVENT POOLS BUSINESS DETAILS
    // ====================
    const knowledgeBase = {
        // Company Information
        company: {
            name: "Advent Pools",
            location: "Houston, Texas",
            founded: "1998",
            description: "Advent Pools is Houston's premier luxury pool design and construction company, specializing in custom aquatic environments for discerning homeowners.",
            mission: "To transform ordinary spaces into extraordinary aquatic environments through innovative design, meticulous craftsmanship, and unparalleled service.",
            values: ["Craftsmanship", "Innovation", "Integrity", "Collaboration", "Excellence"],
            team: {
                size: "15+ experienced professionals",
                specialties: ["Pool Design", "Engineering", "Construction", "Landscape Architecture"]
            }
        },
        
        // Services
        services: {
            "Custom Luxury Pools": {
                description: "Bespoke aquatic designs tailored to your personal style and property architecture.",
                features: ["Infinity-edge designs", "Vanishing edge pools", "Natural stone finishes", "Custom tile work", "Advanced lighting systems"],
                time: "12-16 weeks",
                startingPrice: "$150,000"
            },
            "Outdoor Living Spaces": {
                description: "Complete outdoor environments including kitchens, fire features, and entertainment areas.",
                features: ["Outdoor kitchens", "Fire pits & fireplaces", "Entertainment areas", "Landscape design", "Lighting systems"],
                time: "8-12 weeks",
                startingPrice: "$75,000"
            },
            "Water & Fire Features": {
                description: "Artistic installations creating captivating visual and sensory experiences.",
                features: ["Waterfalls & fountains", "Fire bowls & fire walls", "Interactive water features", "Rain curtains", "Laminar flow features"],
                time: "4-8 weeks",
                startingPrice: "$25,000"
            },
            "Pool Remodeling": {
                description: "Transforming existing pools into modern masterpieces with updated finishes and features.",
                features: ["Complete resurfacing", "Tile and coping replacement", "Equipment upgrades", "Feature additions", "Deck renovations"],
                time: "6-10 weeks",
                startingPrice: "$50,000"
            }
        },
        
        // Pool Styles
        poolStyles: {
            "Infinity Edge": "Creates the illusion of water extending to the horizon, perfect for properties with views.",
            "Modern Geometric": "Clean lines, sharp angles, and minimalist aesthetics for contemporary homes.",
            "Natural Freeform": "Organic shapes and natural materials that blend seamlessly with surroundings.",
            "Resort-Style": "Multiple water features, fire elements, and entertainment areas for a private resort feel.",
            "Lap Pool": "Designed for swimming exercise, typically rectangular and longer than traditional pools."
        },
        
        // Process
        process: {
            steps: [
                {
                    number: "01",
                    title: "Consultation & Design",
                    description: "Initial site assessment, needs analysis, and preliminary design concepts."
                },
                {
                    number: "02",
                    title: "3D Design & Planning",
                    description: "Detailed 3D modeling, engineering plans, and permit acquisition."
                },
                {
                    number: "03",
                    title: "Construction & Craftsmanship",
                    description: "Expert construction using premium materials and time-tested techniques."
                },
                {
                    number: "04",
                    title: "Delivery & Support",
                    description: "System training, maintenance guidance, and ongoing support."
                }
            ],
            timeline: "Most projects take 14-16 weeks from design to completion.",
            consultation: "Complimentary 90-minute consultation at your property."
        },
        
        // Pricing
        pricing: {
            factors: [
                "Pool size and shape",
                "Materials and finishes",
                "Additional features (spa, waterfalls, etc.)",
                "Site conditions and accessibility",
                "Permitting and engineering requirements"
            ],
            ranges: {
                "Basic Custom Pool": "$100,000 - $200,000",
                "Luxury Custom Pool": "$200,000 - $500,000",
                "High-End Luxury Pool": "$500,000+",
                "Pool with Outdoor Living Space": "$250,000 - $750,000"
            },
            financing: "We offer financing options through trusted partners. Typical terms: 10-15 years with competitive rates."
        },
        
        // Contact Information
        contact: {
            phone: "(713) 555-7890",
            email: "info@adventpools.com",
            hours: "Monday-Friday: 9:00 AM - 6:00 PM",
            serviceArea: "Greater Houston area including River Oaks, Memorial, Tanglewood, West University",
            consultation: "Schedule through our website contact form or call directly"
        },
        
        // Frequently Asked Questions
        faqs: {
            "How long does the construction process take?": "Most luxury pool projects take 14-16 weeks from design approval to completion, depending on size and complexity.",
            "Do you handle permits?": "Yes, we manage all permitting and regulatory compliance as part of our comprehensive service.",
            "What is your warranty?": "We offer a 5-year structural warranty and 2-year equipment warranty on all our installations.",
            "Do you offer maintenance services?": "Yes, we provide comprehensive maintenance programs to keep your pool in pristine condition year-round.",
            "Can you work with my architect/landscape designer?": "Absolutely! We frequently collaborate with architects and designers to ensure a cohesive design vision."
        }
    };
    
    // ====================
    // CHATBOT FUNCTIONS
    // ====================
    
    // Toggle chatbot window
    chatbotToggle.addEventListener('click', function() {
        isChatbotOpen = !isChatbotOpen;
        chatbotWindow.classList.toggle('active', isChatbotOpen);
        
        // Focus on input when opening
        if (isChatbotOpen) {
            setTimeout(() => {
                chatbotInput.focus();
            }, 300);
        }
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', function() {
        isChatbotOpen = false;
        chatbotWindow.classList.remove('active');
    });
    
    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Add to conversation history
        conversationHistory.push({ role: 'user', content: message });
        
        // Show typing indicator
        typingIndicator.classList.add('active');
        
        // Process message and generate response (simulated delay)
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'bot');
            typingIndicator.classList.remove('active');
            
            // Add to conversation history
            conversationHistory.push({ role: 'bot', content: response });
            
            // Scroll to bottom
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000 + Math.random() * 1000);
    }
    
    // Send message on button click
    sendMessageBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick question buttons
    document.querySelectorAll('.quick-question-btn').forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            chatbotInput.value = question;
            sendMessage();
        });
    });
    
    // Hint buttons
    document.querySelectorAll('.hint-btn').forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            chatbotInput.value = question;
            sendMessage();
        });
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // ====================
    // AI RESPONSE GENERATION
    // ====================
    
    function generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! Welcome to Advent Pools. I'm here to help you with all your luxury pool questions. How may I assist you today?";
        }
        
        // Company information
        if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('who are you')) {
            return `Advent Pools is ${knowledgeBase.company.description} Founded in ${knowledgeBase.company.founded} in ${knowledgeBase.company.location}, we have over 25 years of experience creating breathtaking aquatic environments. Our mission is ${knowledgeBase.company.mission}`;
        }
        
        // Services
        if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('what do you do')) {
            let response = "We offer several luxury pool services:\n\n";
            for (const [service, details] of Object.entries(knowledgeBase.services)) {
                response += `• <strong>${service}</strong>: ${details.description} (Starting at ${details.startingPrice})\n`;
            }
            response += "\nWhich service are you interested in learning more about?";
            return response;
        }
        
        // Specific service details
        for (const [service, details] of Object.entries(knowledgeBase.services)) {
            if (lowerMessage.includes(service.toLowerCase())) {
                let response = `<strong>${service}</strong>\n${details.description}\n\n`;
                response += `<strong>Key Features:</strong>\n`;
                details.features.forEach(feature => {
                    response += `• ${feature}\n`;
                });
                response += `\n<strong>Timeline:</strong> ${details.time}\n`;
                response += `<strong>Starting Price:</strong> ${details.startingPrice}\n\n`;
                response += `Would you like to schedule a consultation to discuss your ${service} project?`;
                return response;
            }
        }
        
        // Pool styles
        if (lowerMessage.includes('style') || lowerMessage.includes('design') || lowerMessage.includes('type of pool')) {
            let response = "We specialize in several luxury pool styles:\n\n";
            for (const [style, description] of Object.entries(knowledgeBase.poolStyles)) {
                response += `• <strong>${style}</strong>: ${description}\n`;
            }
            response += "\nDo any of these styles match what you're looking for?";
            return response;
        }
        
        // Process
        if (lowerMessage.includes('process') || lowerMessage.includes('how does it work') || lowerMessage.includes('timeline')) {
            let response = "Our design and construction process involves 4 key steps:\n\n";
            knowledgeBase.process.steps.forEach(step => {
                response += `<strong>${step.number} ${step.title}:</strong> ${step.description}\n`;
            });
            response += `\n<strong>Typical Timeline:</strong> ${knowledgeBase.process.timeline}\n`;
            response += `<strong>Initial Consultation:</strong> ${knowledgeBase.process.consultation}\n\n`;
            response += "Would you like to schedule a consultation to begin the process?";
            return response;
        }
        
        // Pricing
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
            let response = "Luxury pool pricing varies based on several factors:\n\n";
            response += "<strong>Factors Affecting Cost:</strong>\n";
            knowledgeBase.pricing.factors.forEach(factor => {
                response += `• ${factor}\n`;
            });
            
            response += "\n<strong>Typical Price Ranges:</strong>\n";
            for (const [type, range] of Object.entries(knowledgeBase.pricing.ranges)) {
                response += `• ${type}: ${range}\n`;
            }
            
            response += `\n<strong>Financing:</strong> ${knowledgeBase.pricing.financing}\n\n`;
            response += "For an accurate quote, we recommend scheduling a consultation so we can assess your specific needs and property.";
            return response;
        }
        
        // Contact
        if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
            return `You can contact Advent Pools through:\n\n• <strong>Phone:</strong> ${knowledgeBase.contact.phone}\n• <strong>Email:</strong> ${knowledgeBase.contact.email}\n• <strong>Hours:</strong> ${knowledgeBase.contact.hours}\n• <strong>Service Area:</strong> ${knowledgeBase.contact.serviceArea}\n\nWould you like me to help you schedule a consultation?`;
        }
        
        // Consultation
        if (lowerMessage.includes('consultation') || lowerMessage.includes('schedule') || lowerMessage.includes('meet')) {
            return `Scheduling a consultation is easy! You can:\n\n1. Fill out the contact form on our website\n2. Call us directly at ${knowledgeBase.contact.phone}\n3. Reply to this chat with your preferred contact details and we'll reach out to schedule\n\nOur complimentary consultations typically last 90 minutes and include a site assessment at your property.`;
        }
        
        // Location/Service Area
        if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('houston') || lowerMessage.includes('texas')) {
            return `Advent Pools is based in Houston, Texas and serves the Greater Houston area including:\n\n• River Oaks\n• Memorial\n• Tanglewood\n• West University\n• Piney Point Village\n• Southampton Place\n• And surrounding areas\n\nDo you have a specific location in mind for your pool project?`;
        }
        
        // Check for FAQ questions
        for (const [question, answer] of Object.entries(knowledgeBase.faqs)) {
            if (lowerMessage.includes(question.toLowerCase().substring(0, 20))) {
                return answer;
            }
        }
        
        // Thank you
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're welcome! Is there anything else I can help you with regarding Advent Pools or luxury pool design?";
        }
        
        // Goodbye
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return "Thank you for chatting with Advent Pools AI Assistant! Feel free to reach out anytime if you have more questions. Have a wonderful day!";
        }
        
        // Default response for unrecognized queries
        const defaultResponses = [
            "I'm not sure I understand your question about Advent Pools. Could you rephrase it?",
            "I specialize in Advent Pools services, pricing, and design process. Could you ask about one of those topics?",
            "That's an interesting question! As the Advent Pools AI assistant, I can help with information about our services, pricing, design process, or scheduling a consultation.",
            "I'd be happy to help with that! Could you provide more details about what you're looking for in a luxury pool?",
            "For specific questions about Advent Pools, I recommend contacting our team directly at (713) 555-7890 for personalized assistance."
        ];
        
        // Try to match keywords and provide relevant information
        if (lowerMessage.includes('pool')) {
            return "I'd be happy to help with pool-related questions! Advent Pools specializes in custom luxury pool design and construction. Are you interested in learning about our services, pricing, or design process?";
        }
        
        if (lowerMessage.includes('design')) {
            return "Our design process begins with a complimentary consultation at your property. We then create detailed 3D models to bring your vision to life before construction begins. Would you like more details about our design services?";
        }
        
        if (lowerMessage.includes('build') || lowerMessage.includes('construction')) {
            return "Construction typically takes 14-16 weeks for most luxury pool projects. Our team of master craftsmen ensures exceptional quality using premium materials. Would you like to know more about our construction timeline or process?";
        }
        
        // Random default response
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    // ====================
    // CHATBOT AUTO-OPEN ON DELAY
    // ====================
    setTimeout(() => {
        // Only open if user hasn't interacted with chatbot yet
        if (conversationHistory.length === 0) {
            // Show welcome message after delay
            setTimeout(() => {
                if (!isChatbotOpen) {
                    addMessage("Hello! I'm the Advent Pools AI assistant. I notice you're browsing our luxury pool website. Is there anything specific you'd like to know about our services or design process?", 'bot');
                    conversationHistory.push({ role: 'bot', content: "Welcome message" });
                }
            }, 30000); // 30 seconds delay
        }
    }, 1000);
    
    // ====================
    // ENHANCED USER EXPERIENCE
    // ====================
    
    // Auto-suggest based on input
    chatbotInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        
        // Clear existing suggestions
        const existingSuggestions = document.querySelector('.chatbot-suggestions');
        if (existingSuggestions) {
            existingSuggestions.remove();
        }
        
        // Don't show suggestions for empty input or very short input
        if (value.length < 2) return;
        
        // Generate suggestions based on input
        const suggestions = getSuggestions(value);
        if (suggestions.length > 0) {
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.className = 'chatbot-suggestions';
            suggestionsDiv.innerHTML = `
                <div class="suggestion-title">Related questions:</div>
                <div class="suggestion-buttons"></div>
            `;
            
            const buttonsContainer = suggestionsDiv.querySelector('.suggestion-buttons');
            suggestions.forEach(suggestion => {
                const button = document.createElement('button');
                button.className = 'hint-btn';
                button.textContent = suggestion;
                button.setAttribute('data-question', suggestion);
                button.addEventListener('click', function() {
                    chatbotInput.value = suggestion;
                    sendMessage();
                });
                buttonsContainer.appendChild(button);
            });
            
            chatbotMessages.appendChild(suggestionsDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    });
    
    // Get suggestions based on user input
    function getSuggestions(input) {
        const suggestions = [];
        const allKeywords = [
            "What services do you offer?",
            "How much does a custom pool cost?",
            "What is your design process?",
            "How long does construction take?",
            "Do you offer financing?",
            "What pool styles do you have?",
            "How do I schedule a consultation?",
            "Tell me about Advent Pools",
            "What is your warranty?",
            "Do you handle permits?"
        ];
        
        // Filter suggestions based on input
        allKeywords.forEach(keyword => {
            if (keyword.toLowerCase().includes(input)) {
                suggestions.push(keyword);
            }
        });
        
        // Limit to 3 suggestions
        return suggestions.slice(0, 3);
    }
    
    // ====================
    // CHATBOT PERSISTENCE (Local Storage)
    // ====================
    
    // Load conversation history from localStorage
    const savedHistory = localStorage.getItem('adventPoolsChatHistory');
    if (savedHistory) {
        conversationHistory = JSON.parse(savedHistory);
        
        // Display last 5 messages from history
        const recentHistory = conversationHistory.slice(-5);
        recentHistory.forEach(msg => {
            if (msg.role === 'user' || msg.role === 'bot') {
                addMessage(msg.content, msg.role);
            }
        });
    }
    
    // Save conversation history to localStorage
    function saveConversation() {
        localStorage.setItem('adventPoolsChatHistory', JSON.stringify(conversationHistory.slice(-20))); // Keep last 20 messages
    }
    
    // Save conversation periodically
    setInterval(saveConversation, 10000); // Every 10 seconds
    
    // Save on page unload
    window.addEventListener('beforeunload', saveConversation);
});
