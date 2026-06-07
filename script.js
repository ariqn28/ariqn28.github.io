// Add js-enabled class to html element for CSS animations
document.documentElement.classList.add('js-enabled');

// Navigation Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'auto',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');

// Cache sections and nav links for active link computation
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));

// Throttled scroll handler using requestAnimationFrame
let ticking = false;
function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar background
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.background = 'rgba(10, 14, 39, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(10, 14, 39, 0.8)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }

        // Active nav link (compute based on viewport)
        const offset = 200;
        let current = '';
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= offset && rect.bottom > offset) {
                current = section.id;
                break;
            }
        }
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
        });

        // Initialize animations for elements in view (lightweight check)
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) el.classList.add('animated');
        });

        ticking = false;
    });
}

window.addEventListener('scroll', onScroll, { passive: true });

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Create mailto link
        const mailtoLink = `mailto:ariqnaufalsyachroni57@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(message)}%0D%0A%0D%0ASender Email: ${email}`;
        
        // Open mail client  
        window.location.href = mailtoLink;
        
        // Reset form
        this.reset();
        
        // Show success message (optional)
        alert('Thank you for your message! I will get back to you soon.');
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.project-card, .skill-category, .cert-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});



// Cursor effect (optional - adds a trailing cursor effect)
const createCursorFollower = () => {
    const follower = document.createElement('div');
    follower.style.position = 'fixed';
    follower.style.width = '20px';
    follower.style.height = '20px';
    follower.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)';
    follower.style.borderRadius = '50%';
    follower.style.pointerEvents = 'none';
    follower.style.zIndex = '9999';
    follower.style.display = 'none';
    document.body.appendChild(follower);
    
    document.addEventListener('mousemove', (e) => {
        follower.style.display = 'block';
        follower.style.left = e.clientX - 10 + 'px';
        follower.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mouseleave', () => {
        follower.style.display = 'none';
    });
};

// Uncomment to enable cursor follower
// createCursorFollower();

// Parallax handled inside throttled scroll handler above

// Add scroll to top button
const createScrollToTop = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.position = 'fixed';
    button.style.bottom = '30px';
    button.style.right = '30px';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '50%';
    button.style.cursor = 'pointer';
    button.style.display = 'none';
    button.style.zIndex = '999';
    button.style.transition = 'all 0.3s ease';
    button.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
    button.className = 'scroll-to-top';
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 15px 35px rgba(99, 102, 241, 0.5)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.3)';
    });
};

createScrollToTop();

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Active nav link handled by consolidated scroll handler above

// Initialize AOS-like animations
const initAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('animated');
        }
    });
};

window.addEventListener('load', initAnimations);

console.log('Portfolio loaded successfully! 🚀');
