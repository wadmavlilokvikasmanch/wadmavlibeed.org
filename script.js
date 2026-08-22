// =========================================
// SCRIPT.JS - Common JavaScript for All Pages
// =========================================

// =========================
// 1. WHATSAPP FLOATING BUTTON
// =========================
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if WhatsApp button already exists (prevent duplicates)
    if (document.querySelector('.whatsapp-float')) {
        return;
    }
    
    // Create WhatsApp button container
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/919011352549';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    whatsappBtn.innerHTML = `
        <i class="fab fa-whatsapp"></i>
        <span class="whatsapp-tooltip">Chat with us</span>
    `;
    
    // Add to page
    document.body.appendChild(whatsappBtn);
});

// =========================
// 2. MOBILE MENU TOGGLE
// =========================
function toggleMobileMenu() {
    const navbar = document.querySelector(".navbar");
    const button = document.querySelector(".mobile-menu-btn");
    if (!navbar || !button) return;
    navbar.classList.toggle("mobile-open");
    const isOpen = navbar.classList.contains("mobile-open");
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
}
// Make it globally available
window.toggleMobileMenu = toggleMobileMenu;

// =========================
// 3. COPY TO CLIPBOARD (for donate page)
// =========================
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target.closest('.copy-btn');
        if (btn) {
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check" style="color:#28a745;"></i> Copied!';
            setTimeout(() => { btn.innerHTML = original; }, 2000);
        }
    }).catch(() => {
        alert('Copy: ' + text);
    });
}
window.copyText = copyText;

// =========================
// 4. QR LIGHTBOX (for donate page)
// =========================
function openQRLightbox() {
    const lightbox = document.getElementById('qrLightbox');
    if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
window.openQRLightbox = openQRLightbox;

function closeQRLightbox(e) {
    const lightbox = document.getElementById('qrLightbox');
    if (!lightbox) return;
    if (e.target === lightbox || e.target.closest('.close-lightbox')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}
window.closeQRLightbox = closeQRLightbox;

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('qrLightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// =========================
// 5. DROPDOWN TOGGLE FOR MOBILE
// =========================
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        
        if (trigger) {
            trigger.addEventListener('click', function(e) {
                // Only on mobile (screen width <= 950px)
                if (window.innerWidth <= 950) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 950) {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
});
// =========================
// MOBILE MENU TOGGLE - IMPROVED
// =========================
function toggleMobileMenu() {
    const navbar = document.querySelector(".navbar");
    const button = document.querySelector(".mobile-menu-btn");
    const overlay = document.querySelector(".mobile-overlay");
    
    if (!navbar || !button) return;
    
    navbar.classList.toggle("mobile-open");
    const isOpen = navbar.classList.contains("mobile-open");
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    
    // Show/hide overlay
    if (overlay) {
        overlay.classList.toggle("active");
    }
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "";
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navbar = document.querySelector(".navbar");
    const menu = document.querySelector("nav");
    const button = document.querySelector(".mobile-menu-btn");
    
    if (window.innerWidth <= 950 && navbar && navbar.classList.contains("mobile-open")) {
        if (!navbar.contains(e.target)) {
            navbar.classList.remove("mobile-open");
            document.body.style.overflow = "";
            if (button) button.setAttribute("aria-expanded", "false");
            const overlay = document.querySelector(".mobile-overlay");
            if (overlay) overlay.classList.remove("active");
        }
    }
});

// Add overlay to body
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.mobile-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        document.body.appendChild(overlay);
    }
});
