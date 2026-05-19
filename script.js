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
