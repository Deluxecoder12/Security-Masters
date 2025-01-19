import { chapter1 } from './chapters/chapter1.js';

class StoryEngine {
    constructor() {
        // Initialize game state
        this.currentChapter = null;
        this.currentScene = null;
        this.gameState = {
            policyChoices: {},
            suboptimalChoices: false,
            score: 0
        };
        
        // Create a pool of audio objects for rapid typing
        this.typeSoundPool = Array.from({ length: 3 }, () => {
            const audio = new Audio('../assets/audio/Keyboard_Sound.mp3');
            audio.volume = 0.1;
            return audio;
        });
        this.currentSoundIndex = 0;
        
        // DOM elements we'll need to interact with
        this.elements = {
            scenarioText: document.querySelector('.scenario-content'),
            choicesContainer: document.querySelector('.choices-container'),
            feedbackArea: document.querySelector('.feedback-message'),
            chapterName: document.querySelector('.chapter-name'),
            missionProgress: document.querySelector('.mission-progress')
        };

        // Available chapters
        this.chapters = {
            chapter1
            // We'll add more chapters here later
        };
    }

    // Initialize the game
    async init() {
        try {
            this.loadChapter('chapter1');
            this.bindEvents();
            return true; // Signal successful initialization
        } catch (error) {
            console.error('Story Engine initialization failed:', error);
            throw error;
        }
    }

    // Bind event listeners
    bindEvents() {
        // Delegate event handling for choices
        this.elements.choicesContainer.addEventListener('click', (e) => {
            const choiceButton = e.target.closest('.choice-btn');
            if (choiceButton) {
                const choiceId = choiceButton.dataset.choiceId;
                this.handleChoice(choiceId);
            }
        });
    }

    // Load a specific chapter
    loadChapter(chapterId) {
        this.currentChapter = this.chapters[chapterId];
        this.elements.chapterName.textContent = this.currentChapter.title;
        
        // Start with the initial scenario
        this.currentScene = this.currentChapter.initialScenario;
        this.updateUI();
    }

    // Handle player choices
    handleChoice(choiceId) {
        const choice = this.currentScene.choices.find(c => c.id === choiceId);
        if (!choice) return;

        // Update game state
        if (choice.isSuboptimal) {
            this.gameState.suboptimalChoices = true;
        }

        // Show feedback
        this.showFeedback(choice.feedback);

        // Move to next scene
        if (choice.next === 'chapter_complete') {
            this.completeChapter();
        } else {
            this.currentScene = this.currentChapter.scenes[choice.next];
            this.updateUI();
        }
    }

    playTypeSound() {
        this.typeSoundPool[this.currentSoundIndex].currentTime = 0;
        this.typeSoundPool[this.currentSoundIndex].play();
        this.currentSoundIndex = (this.currentSoundIndex + 1) % this.typeSoundPool.length;
    }

    // Update the UI with current scene
    updateUI() {
        console.log("updateUI called");
        // Clear existing content
        this.elements.scenarioText.textContent = '';
        this.elements.choicesContainer.innerHTML = '';

        const text = this.currentScene.text;
        let index = 0;

        const typeCharacter = () => {
            if (index < text.length) {
                this.elements.scenarioText.textContent += text[index];
                // Only play sound for visible characters
                if (text[index] !== ' ' && text[index] !== '\n') {
                    this.playTypeSound();
                }
                index++;
                setTimeout(typeCharacter, 20);
            } else {
                this.showChoices();
            }
        };

        // Start typing animation
        typeCharacter();
    }

    showChoices() {
        if (!this.currentScene.choices) return;
        
        // Create choice container if needed
        this.elements.choicesContainer.innerHTML = ''; // Clear any existing choices
        
        this.currentScene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.dataset.choiceId = choice.id;
            
            button.innerHTML = `
                <span class="choice-number">${index + 1}</span>
                <span class="choice-text">${choice.text}</span>
            `;
            
            this.elements.choicesContainer.appendChild(button);
        });

        // Handle interactive components if present
        if (this.currentScene.type === 'interactive') {
            this.setupInteractiveComponent(this.currentScene.componentId);
        }
    }

    // Set up interactive components (like the password policy builder)
    setupInteractiveComponent(componentId) {
        const component = this.currentChapter.components[componentId];
        if (!component) return;

        const containerDiv = document.createElement('div');
        containerDiv.id = componentId;
        containerDiv.className = 'interactive-component';

        // Create form elements based on component options
        component.options.forEach(option => {
            const optionContainer = document.createElement('div');
            optionContainer.className = 'option-container';

            const label = document.createElement('label');
            label.textContent = option.label;
            optionContainer.appendChild(label);

            if (option.type === 'select') {
                const select = document.createElement('select');
                select.id = option.id;
                option.options.forEach(opt => {
                    const optElement = document.createElement('option');
                    optElement.value = opt.value;
                    optElement.textContent = opt.label;
                    select.appendChild(optElement);
                });
                optionContainer.appendChild(select);
            } else if (option.type === 'checkboxes') {
                option.options.forEach(opt => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = opt.id;
                    const checkLabel = document.createElement('label');
                    checkLabel.textContent = opt.label;
                    optionContainer.appendChild(checkbox);
                    optionContainer.appendChild(checkLabel);
                });
            }

            containerDiv.appendChild(optionContainer);
        });

        // Add to the scene
        const challengeArea = document.querySelector('.challenge-area');
        challengeArea.innerHTML = '';
        challengeArea.appendChild(containerDiv);
    }

    // Show feedback to the player
    showFeedback(feedback) {
        this.elements.feedbackArea.textContent = feedback;
        this.elements.feedbackArea.style.display = 'block';

        // Clear feedback after 3 seconds
        setTimeout(() => {
            this.elements.feedbackArea.style.display = 'none';
        }, 3000);
    }

    // Handle chapter completion
    completeChapter() {
        const result = this.currentChapter.evaluatePerformance(this.gameState);
        this.gameState.score += result.score;

        this.showFeedback(`Chapter Complete! ${result.feedback}`);
        // Here we would typically move to the next chapter
        // We'll implement this later when we have more chapters
    }

    // Save game progress
    saveProgress() {
        localStorage.setItem('gameState', JSON.stringify(this.gameState));
    }

    // Load saved progress
    loadProgress() {
        const savedState = localStorage.getItem('gameState');
        if (savedState) {
            this.gameState = JSON.parse(savedState);
            // Implement logic to resume from saved state
        }
    }
}

export default StoryEngine;