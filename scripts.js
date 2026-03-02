// Election Countdown Timer
function updateCountdown() {
    // Set election date (March 22, 2026, 08:00:00)
    const electionDate = new Date('2026-03-22T08:00:00');
    const now = new Date();
    const diff = electionDate - now;
    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<span class="text-amber-400">Election Day!</span>';
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();
// Lightbox modal for gallery
const galleryImages = [
    { src: '', caption: 'Event 1 (500x400px)' },
    { src: '', caption: 'Event 2 (500x400px)' },
    { src: '', caption: 'Event 3 (500x400px)' },
    { src: '', caption: 'Event 4 (500x400px)' },
    { src: '', caption: 'Event 5 (500x400px)' },
    { src: '', caption: 'Event 6 (500x400px)' },
];
let currentLightbox = 0;

function openLightbox(idx) {
    currentLightbox = idx;
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    img.src = galleryImages[idx].src || '';
    caption.textContent = galleryImages[idx].caption;
    modal.classList.remove('hidden');
}

function closeLightbox() {
    document.getElementById('lightboxModal').classList.add('hidden');
}

function prevLightbox() {
    currentLightbox = (currentLightbox - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentLightbox);
}

function nextLightbox() {
    currentLightbox = (currentLightbox + 1) % galleryImages.length;
    openLightbox(currentLightbox);
}

// Close modal on ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});

// Sticky Vote Now Button (Mobile Only)
function handleStickyVoteBtn() {
    const btn = document.getElementById('stickyVoteBtn');
    if (!btn) return;
    // Show only on mobile (width < 768px)
    if (window.innerWidth < 768) {
        btn.style.display = 'flex';
    } else {
        btn.style.display = 'none';
    }
}
window.addEventListener('resize', handleStickyVoteBtn);
window.addEventListener('DOMContentLoaded', handleStickyVoteBtn);
// Custom JavaScript for THE REFORMIST Campaign Website

// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animate numbers on scroll
function animateCounters() {
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const updateCount = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Trigger counter animation when section is in view
window.addEventListener('scroll', function counterScrollHandler() {
    const statsSection = document.querySelector('.bg-gradient-to-r.from-blue-900');
    if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight) {
        animateCounters();
        window.removeEventListener('scroll', counterScrollHandler);
    }
});

// FAQ Toggle
function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    answer.classList.toggle('hidden');
    icon.style.transform = answer.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Add fade-in-up animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);
document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});
