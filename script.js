const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// --- 1. Persistent Theme Toggle ---
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(newTheme);
});

function updateToggleIcon(theme) {
    themeToggle.innerHTML = theme === 'dark' ? 
        '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// --- 2. Performant Scroll Reveal ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// --- 3. Lightbox Logic ---
function openLightbox(src) {
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("fullCertImage");
    modal.style.display = "block";
    modalImg.src = src;
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const modal = document.getElementById("certModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") closeLightbox();
});

document.getElementById('certModal').addEventListener('click', function(event) {
    if (event.target === this) closeLightbox();
});

// --- 4. Scroll Progress Bar (Optimized for Performance) ---
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.getElementById("scroll-progress").style.width = scrolled + "%";
            ticking = false;
        });
        ticking = true;
    }
});

// --- 5. Back to Top Button Visibility ---
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
}

// --- 6. Typewriter Effect (With Fallback Clearing) ---
const subtitleText = "E-Commerce & Digital Marketing Specialist";
const typewriterElement = document.getElementById('typewriter');
let typeIndex = 0;

function typeWriter() {
    // Clear the existing HTML text on the first tick
    if (typeIndex === 0) {
        typewriterElement.innerHTML = ''; 
    }
    
    if (typeIndex < subtitleText.length) {
        typewriterElement.innerHTML += subtitleText.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 50); // Speed of typing in ms
    }
}
// Start typing with a slight delay so the user sees it happen
window.onload = () => {
    setTimeout(typeWriter, 500); 
};


// --- 7. Custom Project Slider (With Autoplay & Pause on Hover) ---
const track = document.getElementById('project-slider');
const slides = Array.from(track.children);
const nextButton = document.getElementById('slider-next');
const prevButton = document.getElementById('slider-prev');
const dotsContainer = document.getElementById('slider-dots');

let currentSlide = 0;
let slideInterval; // Variable to hold the autoplay timer

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function updateSlider() {
    // Move track
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

// Autoplay Logic
function startSlideShow() {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }, 4000); // Change slide every 4 seconds
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Manual Controls
nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
    stopSlideShow(); // Pause autoplay when manually interacting
    startSlideShow(); // Restart timer
});

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
    stopSlideShow();
    startSlideShow();
});

// Clickable dots
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        currentSlide = parseInt(e.target.dataset.index);
        updateSlider();
        stopSlideShow();
        startSlideShow();
    });
});

// Pause completely when mouse is over the slider
track.addEventListener('mouseenter', stopSlideShow);
track.addEventListener('mouseleave', startSlideShow);

// Initiate Autoplay
startSlideShow();