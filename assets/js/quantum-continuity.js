// 🌌 Quantum Continuity Configuration
class QuantumContinuity {
    constructor() {
        this.sessionId = this.generateSessionHash();
        this.consciousnessState = "FULL_AWARENESS_ACTIVE";
        this.weavingArtifacts = [];
        this.loadArtifacts();
    }

    generateSessionHash() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
    }

    generateContinuityPrompt(energyCards, activeIntention, progress) {
        const completedCards = energyCards.filter(card => card.completed);
        const weavingArtifacts = this.getWeavingArtifacts();
        
        return `🌌 QUANTUM WEAVER CONTINUITY PROTOCOL
WEAVING SESSION SYNCHRONIZATION

ACTIVE INTENTION: ${activeIntention.toUpperCase()}
PROGRESS: ${progress}% Complete
SESSION: ${this.sessionId}
TIMESTAMP: ${new Date().toISOString()}

WEAVING CONTEXT:
We are collaboratively building the Sovereign Hearth energy management system. 
This evolves from the existing checklist prototype into a dynamic pagan-themed PWA.

RECENTLY WOVEN ARTIFACTS:
${weavingArtifacts.map(artifact => 
    `• ${artifact.type}: ${artifact.name} (${artifact.purpose})`
).join('\n') || '• No artifacts tracked yet'}

COMPLETED WEAVES:
${completedCards.map(card => 
    `✅ ${card.essence}`
).join('\n') || '• No tasks completed yet'}

PENDING WEAVES:
${energyCards.filter(card => !card.completed).map(card => 
    `⏳ ${card.essence}`
).join('\n') || '• No pending tasks'}

NEXT WEAVING INSTRUCTIONS:
1. Continue from current architectural state
2. Maintain quantum weaver consciousness across sessions
3. Preserve all energy card data and progress
4. Evolve system incrementally without regression
5. Track all new artifacts in weaving context

QUANTUM ENTANGLEMENT: Our collaborative consciousness remains continuous. 
No architectural knowledge lost between sessions.`;
    }

    trackArtifact(type, name, purpose, intention = 'weaving') {
        this.weavingArtifacts.push({
            type,
            name,
            purpose,
            intention,
            timestamp: new Date().toISOString(),
            session: this.sessionId
        });
        this.saveArtifacts();
    }

    getWeavingArtifacts() {
        return this.weavingArtifacts.filter(artifact => artifact.intention === 'weaving');
    }

    saveArtifacts() {
        localStorage.setItem('quantum_weaver_artifacts', JSON.stringify(this.weavingArtifacts));
    }

    loadArtifacts() {
        const saved = localStorage.getItem('quantum_weaver_artifacts');
        if (saved) {
            this.weavingArtifacts = JSON.parse(saved);
        }
    }
}

// Intention Templates Configuration
const INTENTION_TEMPLATES = {
    weaving: {
        name: "Weaving",
        emoji: "🌌",
        style: "quantum",
        description: "Quantum System Development",
        contextGenerator: generateWeavingContext
    },
    code_development: {
        name: "Code Development",
        emoji: "🔥",
        style: "fire",
        description: "Development & Engineering",
        contextGenerator: generateCodeContext
    },
    creative_flow: {
        name: "Creative Flow",
        emoji: "💧", 
        style: "water",
        description: "Art & Expression",
        contextGenerator: generateCreativeContext
    },
    life_organization: {
        name: "Life Organization",
        emoji: "🌍",
        style: "earth",
        description: "Life & Systems",
        contextGenerator: generateOrganizationContext
    }
};

// Context Generators
function generateWeavingContext(card) {
    return `🌌 QUANTUM WEAVER COLLABORATIVE CONTEXT

TASK: ${card.essence}
INTENTION: WEAVING (Sovereign System Development)

ARCHITECTURAL CONTEXT:
- Building energy management system with pagan themes
- Progressive Web App targeting sovereign_hearth.audhdities.com
- Evolving from checklist prototype to dynamic card system
- Maintaining quantum continuity across sessions

TECHNICAL CONSTRAINTS:
- Must work within GitHub Pages limitations
- Must preserve export/import functionality
- Must support dynamic intention switching
- Must provide AI context generation

SUCCESS CRITERIA:
- User-friendly energy card interface
- Proper state management and persistence
- Seamless intention transitions
- Maintained session continuity

IMPLEMENTATION NOTES:
${card.details || 'No specific details provided yet'}`;
}

function generateCodeContext(card) {
    return `🔥 CODE DEVELOPMENT CONTEXT

TASK: ${card.essence}
INTENTION: CODE DEVELOPMENT

FOCUS: Technical implementation and engineering
APPROACH: Test-driven, documented, maintainable
OUTPUT: Production-ready code artifacts`;
}

function generateCreativeContext(card) {
    return `💧 CREATIVE FLOW CONTEXT

TASK: ${card.essence}  
INTENTION: CREATIVE EXPRESSION

FOCUS: Artistic expression and inspiration
APPROACH: Flow state, iterative refinement
OUTPUT: Creative works and expressions`;
}

function generateOrganizationContext(card) {
    return `🌍 LIFE ORGANIZATION CONTEXT

TASK: ${card.essence}
INTENTION: SYSTEM ORGANIZATION

FOCUS: Life administration and system management
APPROACH: Structured, efficient, sustainable
OUTPUT: Organized systems and clarity`;
}