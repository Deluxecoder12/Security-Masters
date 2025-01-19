// main.js

import StoryEngine from './story-engine.js';

class Game {
    constructor() {
        this.storyEngine = null;
        this.loadingScreen = document.querySelector('.loading-screen');
        this.toolButtons = {
            save: document.querySelector('.save-btn'),
            help: document.querySelector('.help-btn'),
            hint: document.querySelector('.hint-btn')
        };
    }

    async init() {
        try {
            console.log('Game initialization started');
            // Show loading screen
            this.showLoading();

            // Initialize story engine
            this.storyEngine = new StoryEngine();
            
            // Set up UI event listeners
            this.setupEventListeners();
            
            // Initialize story engine
            await this.storyEngine.init();

            // Check for saved progress
            this.checkSavedProgress();

            // Hide loading screen after a minimum display time
            setTimeout(() => {
                this.hideLoading();
                console.log('Game initialization completed');
            }, 500); // Minimum 500ms display time for loading screen
            
        } catch (error) {
            console.error('Game initialization failed:', error);
            this.handleError(error);
        }
    }

    setupEventListeners() {
        // Save button
        this.toolButtons.save.addEventListener('click', () => {
            try {
                this.storyEngine.saveProgress();
                this.showNotification('Game progress saved!');
            } catch (error) {
                this.showNotification('Failed to save game progress', 'error');
            }
        });

        // Help button
        this.toolButtons.help.addEventListener('click', () => {
            const helpModal = document.querySelector('.help-modal');
            helpModal.showModal();
        });

        // Hint button
        this.toolButtons.hint.addEventListener('click', () => {
            const hintModal = document.querySelector('.hint-modal');
            if (this.storyEngine.currentScene?.hint) {
                document.querySelector('.hint-modal .modal-content').textContent = 
                    this.storyEngine.currentScene.hint;
                hintModal.showModal();
            } else {
                this.showNotification('No hint available for this scene');
            }
        });

        // Close buttons for modals
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', () => {
                button.closest('dialog').close();
            });
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
            }
        });
    }

    checkSavedProgress() {
        if (localStorage.getItem('gameState')) {
            const shouldRestore = confirm('Saved game progress found. Would you like to continue from where you left off?');
            if (shouldRestore) {
                this.storyEngine.loadProgress();
            } else {
                localStorage.removeItem('gameState');
            }
        }
    }

    showLoading() {
        this.loadingScreen.hidden = false;
    }

    hideLoading() {
        this.loadingScreen.hidden = true;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after animation
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    handleError(error) {
        // Hide loading screen
        this.hideLoading();
        
        // Show error message to user
        this.showNotification(
            'An error occurred. Please refresh the page and try again.', 
            'error'
        );
        
        // Log full error for debugging
        console.error('Detailed error:', error);
    }
}

// Initialize game when document is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init().catch(error => {
        console.error('Failed to initialize game:', error);
    });
    
    // Add to window for debugging purposes
    window.gameInstance = game;
});

// Add custom styles for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 4px;
        background-color: var(--text-primary);
        color: var(--bg-primary);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    .notification.error {
        background-color: var(--accent-danger);
        color: white;
    }

    .notification.fade-out {
        animation: fadeOut 0.5s ease-out;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);