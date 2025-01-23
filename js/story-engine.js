import { chapter1 } from './chapters/chapter1.js';
import { chapter2 } from './chapters/chapter2.js';

class StoryEngine {
    constructor() {
        // Available chapters
        this.chapters = {
            chapter1,
            chapter2
        };

        // Initialize game state
        this.currentChapter = this.chapters.chapter1; // Set initial chapter
        
        this.currentScene = this.currentChapter.initialScenario;
        
        this.gameState = {
            score: 0,
            currentChapterId: 'chapter1'
        };

        this.currentSceneNumber = 1;

        this.totalScenes = this.currentChapter.totalScenes;

        this.securityLevels = [
            'Trainee',
            'Junior Analyst', 
            'Analyst',
            'Senior Analyst',
            'Specialist',
            'Expert',
            'Master'
        ];
        
        // Create a pool of audio objects for rapid typing
        this.typeSoundPool = Array.from({ length: 5}, () => {
            const audio = new Audio('../assets/audio/Keyboard_Sound.mp3');
            audio.volume = 0.1;
            return audio;
        });
        this.currentSoundIndex = 0;
        
        // DOM elements
        this.elements = {
            securityLevel: document.querySelector('.security-level'),
            missionProgress: document.querySelector('.mission-progress'),
            scenarioText: document.querySelector('.scenario-content'),
            choicesContainer: document.querySelector('.choices-container'),
            feedbackArea: document.querySelector('.feedback-message'),
            chapterName: document.querySelector('.chapter-name'),
        };

        this.updateProgressDisplay();
  
        this.updateChapterDisplay();
    }
    
    updateChapterDisplay() {
        this.elements.chapterName.textContent = this.currentChapter.title;
    }
    
    updateProgressDisplay() {
        const chapterMap = {
            'chapter1': 0,
            'chapter2': 1
        };
        
        const securityLevelIndex = chapterMap[this.gameState.currentChapterId] || 0;
        
        this.elements.missionProgress.textContent = `Progress: ${this.currentSceneNumber}/${this.totalScenes}`;
        this.elements.securityLevel.textContent = `Security Level: ${this.securityLevels[securityLevelIndex]}`
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
        this.currentScene = this.currentChapter.initialScenario;
        this.currentSceneNumber = 1;
        this.totalScenes = this.currentChapter.totalScenes;
        this.gameState.currentChapterId = chapterId;
    
        this.updateChapterDisplay();
        this.updateProgressDisplay();
        this.updateUI();
    }

    // Handle player choices
    handleChoice(choiceId) {
        const choice = this.currentScene.choices.find(c => c.id === choiceId);
        if (!choice) return;

        // Execute consequence
        if (choice.consequence) {
            choice.consequence(this.gameState);
        }

        // Special handling for chapter transition
        if (this.gameState.chapterTransition) {
            // Trigger loading screen
            document.querySelector('.loading-screen').hidden = false;
            
            // Simulate loading delay
            setTimeout(() => {
                this.loadChapter('chapter2');
                document.querySelector('.loading-screen').hidden = true;
                // Reset transition flag
                this.gameState.chapterTransition = false;
            }, 1000);
            return;
        }

        // Show feedback
        this.showFeedback(choice.feedback);

        // Move to next scene
        if (choice.next === 'end') {
            this.gameState.finalScore = this.gameState.chapterScore;
        }
        this.currentSceneNumber++;
        this.updateProgressDisplay();

        this.currentScene = this.currentChapter.scenes[choice.next];
        this.updateUI();
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

        const text = typeof this.currentScene.text === 'function' 
        ? this.currentScene.text(this.gameState) 
        : this.currentScene.text;
        let index = 0;

        const typeCharacter = () => {
            if (index < text.length) {
                if (text[index] === '\n') {
                    this.elements.scenarioText.innerHTML += '<br>';
                } else {
                    this.elements.scenarioText.innerHTML += text[index];
                }
                // Only play sound for visible characters
                if (text[index] !== ' ' && text[index] !== '\n' && index % 5 === 0) {
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
    }

    // Show feedback to the player
    showFeedback(feedback) {
        this.elements.feedbackArea.textContent = feedback;
        this.elements.feedbackArea.style.display = 'block';

        // Clear feedback after 10 seconds
        const clearFeedbackTimer = setTimeout(() => {
            this.elements.feedbackArea.style.display = 'none';
        }, 10000);
    
        // Allow clearing feedback when next choice is made
        this.clearFeedbackTimer = clearFeedbackTimer;
    }

    // Handle chapter completion
    completeChapter() {
        // Prepare to move to next chapter
        this.loadChapter(result.nextChapter);
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