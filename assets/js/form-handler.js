// 🛡️ SOVEREIGN FORM DATA CAPTURE SYSTEM
class SovereignFormHandler {
    constructor() {
        this.submissions = this.loadSubmissions();
        this.initializeFormListeners();
    }

    initializeFormListeners() {
        // Creator Application Form
        const creatorForm = document.querySelector('.connection-form:nth-child(1)');
        if (creatorForm) {
            creatorForm.querySelector('button').addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCreatorApplication();
            });
        }

        // Project Collaboration Form
        const projectForm = document.querySelector('.connection-form:nth-child(2)');
        if (projectForm) {
            projectForm.querySelector('button').addEventListener('click', (e) => {
                e.preventDefault();
                this.handleProjectCollaboration();
            });
        }

        // Resource Sharing Form
        const resourceForm = document.querySelector('.connection-form:nth-child(3)');
        if (resourceForm) {
            resourceForm.querySelector('button').addEventListener('click', (e) => {
                e.preventDefault();
                this.handleResourceSharing();
            });
        }

        // Payment Options
        document.querySelectorAll('.payment-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const type = e.currentTarget.querySelector('h4').textContent.toLowerCase();
                this.handlePaymentInitiation(type);
            });
        });

        // Oracle Guidance
        document.querySelectorAll('.oracle-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const path = e.currentTarget.querySelector('h3').textContent.includes('Technical') ? 'technical' :
                           e.currentTarget.querySelector('h3').textContent.includes('Creative') ? 'creative' :
                           e.currentTarget.querySelector('h3').textContent.includes('Community') ? 'community' : 'rest';
                this.handleOracleGuidance(path);
            });
        });
    }

    handleCreatorApplication() {
        const form = document.querySelector('.connection-form:nth-child(1)');
        const name = form.querySelector('input[type="text"]').value;
        const message = form.querySelector('textarea').value;

        if (!name || !message) {
            this.showNotification('Please fill in all fields', 'warning');
            return;
        }

        const submission = {
            type: 'creator_application',
            timestamp: new Date().toISOString(),
            data: { name, message },
            status: 'pending'
        };

        this.saveSubmission(submission);
        this.showNotification('🏛️ Application Received! The Council will review within 3-5 days.', 'success');
        form.querySelector('input[type="text"]').value = '';
        form.querySelector('textarea').value = '';
    }

    handleProjectCollaboration() {
        const form = document.querySelector('.connection-form:nth-child(2)');
        const projectIdea = form.querySelector('input[type="text"]').value;
        const projectType = form.querySelector('select').value;

        if (!projectIdea) {
            this.showNotification('Please describe your project idea', 'warning');
            return;
        }

        const submission = {
            type: 'project_collaboration',
            timestamp: new Date().toISOString(),
            data: { projectIdea, projectType },
            status: 'active'
        };

        this.saveSubmission(submission);
        this.showNotification('🌱 Project seeded in sovereign network! Collaborators will connect soon.', 'success');
        form.querySelector('input[type="text"]').value = '';
    }

    handleResourceSharing() {
        const form = document.querySelector('.connection-form:nth-child(3)');
        const resourceType = form.querySelector('select').value;
        const description = form.querySelector('input[type="text"]').value;

        if (!description) {
            this.showNotification('Please describe what you need or offer', 'warning');
            return;
        }

        const submission = {
            type: 'resource_sharing',
            timestamp: new Date().toISOString(),
            data: { resourceType, description },
            status: 'active'
        };

        this.saveSubmission(submission);
        this.showNotification('🔄 Resource added to sovereign pool! Network connecting...', 'success');
        form.querySelector('input[type="text"]').value = '';
    }

    handlePaymentInitiation(paymentType) {
        const submission = {
            type: 'payment_initiation',
            timestamp: new Date().toISOString(),
            data: { paymentType },
            status: 'processing'
        };

        this.saveSubmission(submission);
        
        const messages = {
            'sanctuary membership': '💎 Directing to sovereign membership portal...',
            'resource sharing': '🔄 Opening resource sharing network...',
            'legacy project': '🌱 Connecting to legacy project funding circle...'
        };

        this.showNotification(messages[paymentType] || 'Payment flow initiated', 'info');
    }

    handleOracleGuidance(path) {
        const submission = {
            type: 'oracle_guidance',
            timestamp: new Date().toISOString(),
            data: { path },
            status: 'completed'
        };

        this.saveSubmission(submission);

        const responses = {
            technical: "🛠️ The Chancellor awaits in the technical sanctum. Your architectural genius has home here.",
            creative: "🎨 The Skald prepares the creative halls. Your expression matters beyond metrics.",
            community: "🌿 The Hearth-Keeper tends the community fires. Your connections build civilization.",
            rest: "💤 The Sanctuary opens its quiet spaces. Your rest is revolutionary act."
        };

        this.showNotification(responses[path], 'success');
    }

    saveSubmission(submission) {
        this.submissions.push(submission);
        localStorage.setItem('sovereign_submissions', JSON.stringify(this.submissions));
        
        // In a full implementation, this would send to your backend
        console.log('📝 Form Submission:', submission);
        
        // Export to downloadable file (for now)
        this.exportSubmissions();
    }

    loadSubmissions() {
        const saved = localStorage.getItem('sovereign_submissions');
        return saved ? JSON.parse(saved) : [];
    }

    exportSubmissions() {
        const data = {
            exported: new Date().toISOString(),
            total: this.submissions.length,
            submissions: this.submissions
        };

        // Create downloadable backup
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // You could auto-download or provide admin download link
        console.log('💾 Submissions export ready:', url);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `sovereign-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .sovereign-notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: linear-gradient(135deg, var(--quantum-purple), #553c9a);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                    z-index: 10000;
                    max-width: 400px;
                    animation: slideIn 0.3s ease;
                }
                .sovereign-notification.success { background: linear-gradient(135deg, var(--sanctuary-green), #2f855a); }
                .sovereign-notification.warning { background: linear-gradient(135deg, var(--torch-gold), var(--hearth-orange)); }
                .sovereign-notification.info { background: linear-gradient(135deg, var(--cosmic-blue), #2c5282); }
                .notification-content {
                    display: flex;
                    justify-content: between;
                    align-items: center;
                    gap: 1rem;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    getSubmissionStats() {
        const stats = {
            total: this.submissions.length,
            byType: {},
            recent: this.submissions.slice(-5)
        };

        this.submissions.forEach(sub => {
            stats.byType[sub.type] = (stats.byType[sub.type] || 0) + 1;
        });

        return stats;
    }
}

// Initialize form handler when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    window.sovereignFormHandler = new SovereignFormHandler();
});