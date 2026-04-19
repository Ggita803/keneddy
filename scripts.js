// ============================================
// DARK MODE TOGGLE
// ============================================
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        if (darkModeToggleMobile) darkModeToggleMobile.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const toggle = document.getElementById('darkModeToggle');
    const toggleMobile = document.getElementById('darkModeToggleMobile');
    const icon = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    if (toggle) toggle.innerHTML = icon;
    if (toggleMobile) toggleMobile.innerHTML = icon;
}


// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, icon = 'fas fa-check-circle', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, duration);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.position = 'fixed';
    container.style.zIndex = '1000';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);
    return container;
}

// ============================================
// STICKY NAVIGATION WITH ACTIVE INDICATOR
// ============================================
function initStickyNav() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        // Sticky effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active indicator
        updateActiveNavLink();
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                updateActiveNavLink();
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ============================================
// PLEDGE WALL FUNCTIONALITY
// ============================================
function togglePledgeModal() {
    const modal = document.getElementById('pledgeModal');
    if (modal) {
        modal.classList.toggle('hidden');
    }
}

function submitPledge(e) {
    e.preventDefault();
    const modal = document.getElementById('pledgeModal');
    if (modal) {
        modal.classList.add('hidden');
    }
    
    // Increment pledge counter
    const counter = document.querySelector('.counter[data-target]');
    if (counter) {
        let current = parseInt(counter.textContent);
        counter.textContent = current + Math.floor(Math.random() * 5) + 1;
    }
    
    showToast('Thank you for your pledge! 🙏', 'fas fa-heart', 4000);
    
    // Reset form
    setTimeout(() => {
        const form = modal.querySelector('form');
        if (form) form.reset();
    }, 500);
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('pledgeModal');
        if (modal && !modal.classList.contains('hidden')) {
            togglePledgeModal();
        }
    }
});

// ============================================
// POLICY/ISSUES ACCORDION
// ============================================
function togglePolicy(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i.fa-chevron-down');
    
    if (answer) {
        answer.classList.toggle('hidden');
        if (icon) {
            icon.classList.toggle('rotated');
        }
    }
}

// ============================================
// TESTIMONIAL CAROUSEL
// ============================================
let currentTestimonial = 0;
const testimonialData = [
    {
        name: "Kenneth Mayanja",
        role: "2026 Social Sciences",
        text: "Kennedy truly understands our challenges and has concrete solutions. I'll definitely vote for him!",
        color: "blue"
    },
    {
        name: "Magomu Hassan",
        role: "2026 Business Administration",
        text: "His transparency and commitment to students makes him the perfect choice for guild president.",
        color: "amber"
    },
    {
        name: "Omolo Pasikali",
        role: "2026 Information Systems",
        text: "Kennedy has already made a difference in our department. Imagine what he can do as guild president!",
        color: "blue"
    },
    {
        name: "Amina Mohammed",
        role: "2026 Engineering",
        text: "The Reformist movement shows genuine care for students. I'm 100% behind this campaign.",
        color: "purple"
    },
    {
        name: "David Owuor",
        role: "2026 Agriculture",
        text: "Finally, a candidate who listens. Kennedy is the change we've been waiting for.",
        color: "green"
    }
];

function initTestimonialCarousel() {
    const carousel = document.getElementById('testimonialCarousel');
    if (carousel) {
        renderTestimonial(currentTestimonial);
        
        // Auto-advance carousel every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialData.length;
            renderTestimonial(currentTestimonial);
        }, 5000);
    }
}

function renderTestimonial(index) {
    const data = testimonialData[index];
    const carousel = document.getElementById('testimonialCarousel');
    if (!carousel) return;
    
    const colorMap = {
        blue: 'from-blue-50 to-blue-100',
        amber: 'from-amber-50 to-amber-100',
        purple: 'from-purple-50 to-purple-100',
        green: 'from-green-50 to-green-100'
    };
    
    carousel.innerHTML = `
        <div class="card-hover bg-gradient-to-br ${colorMap[data.color]} p-8 rounded-xl shadow-lg fade-in-up">
            <div class="flex items-center mb-4">
                <div class="image-placeholder w-12 h-12 rounded-full mr-4">
                    <i class="fas fa-user-circle text-2xl"></i>
                </div>
                <div>
                    <h4 class="font-bold text-gray-800">${data.name}</h4>
                    <p class="text-sm text-gray-600">${data.role}</p>
                </div>
            </div>
            <div class="flex text-amber-400 mb-4">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <p class="text-gray-700">"${data.text}"</p>
        </div>
    `;
    
    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function goToTestimonial(index) {
    currentTestimonial = index;
    renderTestimonial(currentTestimonial);
}

// ============================================
// ELECTION COUNTDOWN TIMER
// ============================================
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

// ============================================
// LIGHTBOX GALLERY
// ============================================
const galleryImages = [
    { src: 'images/campaignMoment1.jpg', caption: 'Kickoff Rally: Inspiring the crowd' },
    { src: 'images/campaignMoment2.jpg', caption: 'Community Outreach: Connecting with students' },
    { src: 'images/campaignMoment3.jpg', caption: 'Leadership Forum: Sharing the vision' },
    { src: 'images/campaignMoment4.jpg', caption: 'Team Strategy: Planning for success' },
    { src: 'images/campaignMoment5.jpg', caption: 'Closing Event: Celebrating unity' },
    { src: 'images/campaignMoment6.jpg', caption: 'Celebration: Together, we celebrate unity' },
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

// ============================================
// STICKY VOTE NOW BUTTON (MOBILE ONLY)
// ============================================
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

// ============================================
// CUSTOM JAVASCRIPT FOR CAMPAIGN WEBSITE
// ============================================

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

// ============================================
// INITIALIZATION ON DOM CONTENT LOADED
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initStickyNav();
    initTestimonialCarousel();
    handleStickyVoteBtn();
    
    // Add pledge forms
    const contactForm = document.querySelector('form[onsubmit*="submitPledge"]');
    if (contactForm) {
        contactForm.addEventListener('submit', submitPledge);
    }
});

