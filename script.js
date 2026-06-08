// Add js-enabled class to html element for CSS animations
document.documentElement.classList.add('js-enabled');

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');

// Initialize Scroll to Top Button first so we can reference it
let scrollToTopBtn = null;

// Throttled scroll handler using requestAnimationFrame
let ticking = false;
function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
        // Navbar logic
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
        
        // Scroll to top button logic
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
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
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Inisialisasi Observers saat DOM Siap
document.addEventListener('DOMContentLoaded', () => {
    // Active Link Observer
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.5 });

    // Reveal Animations
    const revealElements = document.querySelectorAll('.reveal, .hero-content, .hero-visual, .skill-category, .project-card, .experience-card, .education-card, .testimonial-card, .cert-card, .contact-info, .contact-form, .highlight-item');
    revealElements.forEach(el => {
        revealObserver.observe(el);
        // Langsung aktifkan jika sudah terlihat di layar (misal saat refresh)
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('active');
        }
    });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => navObserver.observe(section));
    
    createScrollToTop(); 
    // Jalankan onScroll setelah tombol dibuat agar Back to Top muncul jika di-refresh di posisi bawah
    onScroll();
});

// Remove the redundant initAnimations function and its event listener
// The IntersectionObserver handles all scroll-triggered animations more efficiently.
// window.addEventListener('load', initAnimations); // This line is removed implicitly by removing the function

// Navigation Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scroll for Navigation Links (Native JS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cursor effect (optional - adds a trailing cursor effect) - This is commented out, so it won't affect performance.
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

const createScrollToTop = () => {
    if (document.querySelector('.scroll-to-top')) return;
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top'; 
    
    document.body.appendChild(scrollToTopBtn);
    scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};
