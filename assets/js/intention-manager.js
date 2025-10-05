// 🎯 Intention Management System
class IntentionManager {
    constructor() {
        this.activeIntention = 'weaving';
        this.initializeIntentionSelection();
    }

    initializeIntentionSelection() {
        // Set up intention card click handlers
        document.querySelectorAll('.intention-card').forEach(card => {
            card.addEventListener('click', () => {
                const intention = card.dataset.intention;
                this.setActiveIntention(intention);
            });
        });

        // Set default intention
        this.setActiveIntention(this.activeIntention);
    }

    setActiveIntention(intention) {
        this.activeIntention = intention;
        const template = INTENTION_TEMPLATES[intention];
        
        if (!template) return;

        // Update active card styling
        document.querySelectorAll('.intention-card').forEach(card => {
            card.classList.remove('active');
            if (card.dataset.intention === intention) {
                card.classList.add('active');
            }
        });

        // Update active intention display
        const display = document.getElementById('activeIntentionDisplay');
        const current = document.getElementById('currentIntention');
        
        display.className = `active-intention ${template.style}`;
        current.textContent = `${template.emoji} ${template.name} - ${template.description}`;

        // Update progress bar theme
        const progressFill = document.getElementById('progressFill');
        progressFill.className = `progress-fill ${template.style}`;

        // Update active intention badge
        const badge = document.getElementById('activeIntentionBadge');
        badge.textContent = template.emoji;

        // Refresh cards display if energy manager exists
        if (window.energyManager) {
            window.energyManager.renderCards();
        }
    }

    getActiveIntention() {
        return this.activeIntention;
    }

    getActiveIntentionTemplate() {
        return INTENTION_TEMPLATES[this.activeIntention];
    }
}