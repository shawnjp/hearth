// 🎴 Energy Cards Management System
class EnergyCardsManager {
    constructor() {
        this.cards = [];
        this.nextCardId = 1;
        this.loadCards();
    }

    createCard(essence, intention = 'weaving', details = '') {
        const card = {
            id: this.nextCardId++,
            essence: essence,
            details: details,
            completed: false,
            intention: intention,
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        };
        
        this.cards.push(card);
        this.saveCards();
        return card;
    }

    updateCard(cardId, updates) {
        const card = this.cards.find(c => c.id === cardId);
        if (card) {
            Object.assign(card, updates, { updated: new Date().toISOString() });
            this.saveCards();
        }
        return card;
    }

    deleteCard(cardId) {
        this.cards = this.cards.filter(c => c.id !== cardId);
        this.saveCards();
    }

    toggleCardCompletion(cardId) {
        const card = this.cards.find(c => c.id === cardId);
        if (card) {
            card.completed = !card.completed;
            card.updated = new Date().toISOString();
            this.saveCards();
        }
        return card;
    }

    getCardsByIntention(intention) {
        return intention === 'all' 
            ? this.cards 
            : this.cards.filter(card => card.intention === intention);
    }

    getProgressStats() {
        const total = this.cards.length;
        const completed = this.cards.filter(card => card.completed).length;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return { total, completed, progress };
    }

    saveCards() {
        localStorage.setItem('sovereign_energy_cards', JSON.stringify({
            cards: this.cards,
            nextCardId: this.nextCardId
        }));
    }

    loadCards() {
        const saved = localStorage.getItem('sovereign_energy_cards');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.cards = data.cards || [];
                this.nextCardId = data.nextCardId || this.cards.length + 1;
            } catch (e) {
                console.error('Error loading cards:', e);
                this.cards = [];
                this.nextCardId = 1;
            }
        }
    }

    exportData() {
        const data = {
            exported: new Date().toISOString(),
            version: '1.0',
            cards: this.cards,
            stats: this.getProgressStats()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sovereign-hearth-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.cards && Array.isArray(data.cards)) {
                    this.cards = data.cards;
                    this.nextCardId = Math.max(...this.cards.map(c => c.id), 0) + 1;
                    this.saveCards();
                    
                    // Refresh the display
                    if (window.energyManager) {
                        window.energyManager.renderCards();
                        window.energyManager.updateProgress();
                    }
                    
                    alert(`Successfully imported ${this.cards.length} energy cards!`);
                }
            } catch (error) {
                alert('Error importing data: ' + error.message);
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }
}
