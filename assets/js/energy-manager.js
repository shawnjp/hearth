// ⚡ Main Energy Management System
class EnergyManager {
    constructor() {
        this.quantumContinuity = new QuantumContinuity();
        this.cardsManager = new EnergyCardsManager();
        this.intentionManager = new IntentionManager();
        
        this.initializeEventListeners();
        this.renderCards();
        this.updateProgress();
    }

    initializeEventListeners() {
        // Add any global event listeners here
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeContextModal();
                this.hideExport();
            }
        });
    }

    renderCards() {
        const container = document.getElementById('energyCardsContainer');
        const activeIntention = this.intentionManager.getActiveIntention();
        const cards = this.cardsManager.getCardsByIntention(activeIntention);
        
        container.innerHTML = '';

        if (cards.length === 0) {
            container.innerHTML = `
                <div class="empty-state text-center">
                    <h3>🌌 No Energy Cards Yet</h3>
                    <p>Click "Add Energy Card" to create your first task</p>
                </div>
            `;
            return;
        }

        cards.forEach(card => {
            const cardElement = this.createCardElement(card);
            container.appendChild(cardElement);
        });
    }

    createCardElement(card) {
        const template = INTENTION_TEMPLATES[card.intention];
        const cardElement = document.createElement('div');
        cardElement.className = `energy-card ${template.style} ${card.completed ? 'completed' : ''}`;
        cardElement.innerHTML = `
            <div class="card-essence" onclick="energyManager.toggleCardExpand(this)">
                <input type="checkbox" ${card.completed ? 'checked' : ''} 
                       onchange="energyManager.toggleCardCompletion(${card.id})">
                <label>${card.essence}</label>
                <div class="card-actions">
                    <button class="btn-context" onclick="energyManager.generateTaskContext(${card.id})" 
                            title="Generate Context">🧠</button>
                    <button class="btn-delete" onclick="energyManager.deleteCard(${card.id})" 
                            title="Delete Card">×</button>
                </div>
            </div>
            <div class="card-details">
                <textarea class="task-details" placeholder="Add details, constraints, or specific requirements..." 
                          onchange="energyManager.updateCardDetails(${card.id}, this.value)">${card.details || ''}</textarea>
            </div>
        `;
        
        return cardElement;
    }

    addNewCard() {
        const essence = prompt('Enter the essence of this energy card:');
        if (essence && essence.trim()) {
            const activeIntention = this.intentionManager.getActiveIntention();
            this.cardsManager.createCard(essence.trim(), activeIntention);
            this.renderCards();
            this.updateProgress();
            
            // Track artifact for weaving intentions
            if (activeIntention === 'weaving') {
                this.quantumContinuity.trackArtifact(
                    'energy_card', 
                    essence.trim(), 
                    'New task created in Sovereign Hearth system'
                );
            }
        }
    }

    toggleCardCompletion(cardId) {
        this.cardsManager.toggleCardCompletion(cardId);
        this.renderCards();
        this.updateProgress();
    }

    toggleCardExpand(element) {
        const card = element.closest('.energy-card');
        const details = card.querySelector('.card-details');
        
        if (details.style.maxHeight && details.style.maxHeight !== '0px') {
            details.style.maxHeight = '0';
            card.classList.remove('card-expanded');
        } else {
            details.style.maxHeight = details.scrollHeight + 'px';
            card.classList.add('card-expanded');
        }
    }

    updateCardDetails(cardId, details) {
        this.cardsManager.updateCard(cardId, { details });
    }

    deleteCard(cardId) {
        if (confirm('Are you sure you want to delete this energy card?')) {
            this.cardsManager.deleteCard(cardId);
            this.renderCards();
            this.updateProgress();
        }
    }

    generateTaskContext(cardId) {
        const card = this.cardsManager.cards.find(c => c.id === cardId);
        if (!card) return;

        const template = INTENTION_TEMPLATES[card.intention];
        const context = template.contextGenerator(card);
        
        const modalContent = document.getElementById('contextModalContent');
        modalContent.innerHTML = `
            <div class="context-section">
                <h3>${template.emoji} ${template.name} Context</h3>
                <div class="context-output">
                    <pre>${context}</pre>
                </div>
                <button class="btn btn-primary" onclick="energyManager.copyContextToClipboard()">📋 Copy Context</button>
            </div>
            <div class="context-section">
                <h3>Task Details</h3>
                <textarea id="contextTaskDetails" style="width: 100%; height: 100px; margin: 10px 0; padding: 10px;" 
                          placeholder="Add any additional context or specific requirements...">${card.details || ''}</textarea>
                <button class="btn btn-success" onclick="energyManager.updateCardFromContext(${cardId})">💾 Update Task Details</button>
            </div>
        `;

        this.contextToCopy = context;
        this.showContextModal();
    }

    copyContextToClipboard() {
        if (this.contextToCopy) {
            navigator.clipboard.writeText(this.contextToCopy)
                .then(() => alert('Context copied to clipboard!'))
                .catch(() => alert('Failed to copy context'));
        }
    }

    updateCardFromContext(cardId) {
        const detailsInput = document.getElementById('contextTaskDetails');
        if (detailsInput) {
            this.updateCardDetails(cardId, detailsInput.value);
            this.closeContextModal();
        }
    }

    showContextModal() {
        document.getElementById('contextModal').classList.remove('hidden');
    }

    closeContextModal() {
        document.getElementById('contextModal').classList.add('hidden');
        this.contextToCopy = null;
    }

    generateContinuityPrompt() {
        const stats = this.cardsManager.getProgressStats();
        const activeIntention = this.intentionManager.getActiveIntention();
        const prompt = this.quantumContinuity.generateContinuityPrompt(
            this.cardsManager.cards,
            activeIntention,
            stats.progress
        );

        document.getElementById('promptOutput').value = prompt;
        this.showExportSection();
    }

    copyPrompt() {
        const textarea = document.getElementById('promptOutput');
        textarea.select();
        document.execCommand('copy');
        alert('Continuity prompt copied to clipboard!');
    }

    showExportSection() {
        document.getElementById('exportSection').classList.remove('hidden');
    }

    hideExport() {
        document.getElementById('exportSection').classList.add('hidden');
    }

    checkAll() {
        this.cardsManager.cards.forEach(card => {
            if (!card.completed) {
                this.cardsManager.updateCard(card.id, { completed: true });
            }
        });
        this.renderCards();
        this.updateProgress();
    }

    uncheckAll() {
        this.cardsManager.cards.forEach(card => {
            if (card.completed) {
                this.cardsManager.updateCard(card.id, { completed: false });
            }
        });
        this.renderCards();
        this.updateProgress();
    }

    updateProgress() {
        const stats = this.cardsManager.getProgressStats();
        
        document.getElementById('tasksCompleted').textContent = stats.completed;
        document.getElementById('totalTasks').textContent = stats.total;
        document.getElementById('progressPercent').textContent = `${stats.progress}%`;
        
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${stats.progress}%`;
        
        document.getElementById('progressText').textContent = `${stats.progress}% Complete`;
    }

    exportData() {
        this.cardsManager.exportData();
    }

    importData(event) {
        this.cardsManager.importData(event);
    }
}

// Initialize the system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.energyManager = new EnergyManager();
});