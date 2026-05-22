// Add js-enabled class to html element for CSS animations
document.documentElement.classList.add('js-enabled');

// Memastikan halaman kembali ke atas saat refresh agar animasi berjalan benar
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Navigation Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
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
            
            // Cek apakah selector valid (menghindari error querySelector untuk ID angka)
            let target;
            try {
                target = document.querySelector(href);
            } catch (e) {
                return; // Abaikan jika ID tidak valid seperti #0
            }

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Navbar & Active Link on Scroll
const navbar = document.querySelector('.navbar');
<<<<<<< HEAD

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

        // Parallax hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrollY * 0.5}px)`;
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
        
        const form = e.target;
        const formData = new FormData(form);
        
        const name = formData.get('contactName');
        const email = formData.get('contactEmail');
        const subject = formData.get('contactSubject');
        const message = formData.get('contactMessage');
        
        // Basic client-side validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Optional: Show a loading indicator
        // alert('Sending your message...'); 
        
        fetch('inc/sendEmail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // PHP script returns plain text "OK" or error
        .then(result => {
            if (result.trim() === 'OK') {
                alert('Thank you for your message! I will get back to you soon.');
                form.reset(); // Clear the form fields
            } else {
                alert('Error sending message: ' + result);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('An unexpected error occurred. Please try again later.');
        });
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
=======
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

const updateNavbarState = () => {
    // Background Change
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.8)';
        navbar.style.backdropFilter = 'blur(10px)';
    }

    // Update Active Link
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
};

let isScrolling;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateNavbarState();
            isScrolling = false;
        });
        isScrolling = true;
    }
});
>>>>>>> bce3e4d2ec06f12b8c0597ff6d2de6940fc70da6

window.addEventListener('load', updateNavbarState);

// Observe animated elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Berhenti mengamati jika sudah muncul
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.project-card, .skill-category, .timeline-item, .cert-card, .reveal').forEach(el => {
    observer.observe(el);
});
<<<<<<< HEAD

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
=======
>>>>>>> bce3e4d2ec06f12b8c0597ff6d2de6940fc70da6
