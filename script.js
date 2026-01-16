// ========================================
// SMOOTH SCROLLING & NAVIGATION
// ========================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ========================================

const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ========================================
// PARTICLE BACKGROUND ANIMATION
// ========================================

const particlesContainer = document.getElementById('particles');
const particleCount = 50;

// Create particles
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(251, 230, 3, ${Math.random() * 0.5 + 0.2})`;
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    
    // Animation
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `particleFloat ${duration}s ${delay}s infinite ease-in-out`;
    
    particlesContainer.appendChild(particle);
}

// Add particle animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() + 0.5});
        }
    }
`;
document.head.appendChild(style);

// ========================================
// SCROLL ANIMATIONS (AOS - Animate On Scroll)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    // Add delay if specified
    const delay = el.getAttribute('data-delay');
    if (delay) {
        el.style.transitionDelay = delay + 'ms';
    }
    observer.observe(el);
});

// ========================================
// PARALLAX EFFECT FOR HERO IMAGE
// ========================================

const heroImage = document.querySelector('.hero-image');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        heroImage.style.transform = `translateY(${parallax}px)`;
    });
}

// ========================================
// MOUSE TRACKING EFFECT
// ========================================

let mouseX = 0;
let mouseY = 0;
let ballX = 0;
let ballY = 0;
let speed = 0.1;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Create cursor follower
const cursorFollower = document.createElement('div');
cursorFollower.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(251, 230, 3, 0.3), transparent);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
`;
document.body.appendChild(cursorFollower);

function animate() {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;
    
    ballX += distX * speed;
    ballY += distY * speed;
    
    cursorFollower.style.left = ballX + 'px';
    cursorFollower.style.top = ballY + 'px';
    
    requestAnimationFrame(animate);
}

animate();

// Enlarge cursor on hover over interactive elements
document.querySelectorAll('a, button, .feature-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(2)';
    });
    el.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
    });
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// FEATURE CARDS TILT EFFECT
// ========================================

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// GALLERY LIGHTBOX EFFECT
// ========================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: zoomIn 0.3s ease;
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => lightbox.remove(), 300);
        });
    });
});

// Add lightbox animations
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes zoomIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(lightboxStyle);

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c🚀 CodeX OS - The Future is Here!', 'font-size: 20px; font-weight: bold; color: #FBE603; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cInterested in our code? Check out our GitHub!', 'font-size: 14px; color: #FFA200;');
