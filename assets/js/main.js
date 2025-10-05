// === EXTRACTED MAIN SITE FUNCTIONALITY ===

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
    initializeSovereignInteractions();
});

function initializeAccessibility() {
    // Focus management for better keyboard navigation
    const focusableElements = document.querySelectorAll('button, input, select, textarea, [href]');
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        el.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });

    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-speed', '0.001ms');
    }
}

function initializeSovereignInteractions() {
    // Escape key handler
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            const openModals = document.querySelectorAll('.modal.open');
            openModals.forEach(modal => modal.classList.remove('open'));
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Global utility functions
function showCouncilMessage(message, type = 'info') {
    if (window.sovereignFormHandler) {
        window.sovereignFormHandler.showNotification(message, type);
    } else {
        // Fallback
        alert(`🏛️ Council: ${message}`);
    }
}