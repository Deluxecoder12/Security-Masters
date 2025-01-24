import { chapter1 } from './chapters/chapter1.js';
import { chapter2 } from './chapters/chapter2.js';
import { chapter3 } from './chapters/chapter3.js';
import { chapter4 } from './chapters/chapter4.js';
import { chapter5 } from './chapters/chapter5.js';
import { chapter6 } from './chapters/chapter6.js';
import { chapter7 } from './chapters/chapter7.js';

class StoryEngine {
    constructor() {
        this.chapters = {
            chapter1,
            chapter2,
            chapter3,
            chapter4,
            chapter5,
            chapter6,
            chapter7
        };
        
        this.gameState = {
            totalScore: 0,
            chapterScore: 0,
            currentChapterId: 'chapter1'
        };

        this.currentChapter = this.chapters.chapter1;
        this.currentScene = this.currentChapter.initialScenario;
        this.currentSceneNumber = 1;
        this.totalScenes = this.currentChapter.totalScenes;

        this.securityLevels = [
            'Trainee', 'Junior Analyst', 'Analyst',
            'Senior Analyst', 'Specialist', 'Expert', 'Master'
        ];
        
        this.setupAudio();
        this.setupElements();
        this.updateDisplays();
    }
    
    setupAudio() {
        this.typeSoundPool = Array.from({ length: 5}, () => {
            const audio = new Audio('../assets/audio/Keyboard_Sound.mp3');
            audio.volume = 0.1;
            return audio;
        });
        this.currentSoundIndex = 0;
    }

    setupElements() {
        this.elements = {
            securityLevel: document.querySelector('.security-level'),
            missionProgress: document.querySelector('.mission-progress'),
            scenarioText: document.querySelector('.scenario-content'),
            choicesContainer: document.querySelector('.choices-container'),
            feedbackArea: document.querySelector('.feedback-message'),
            chapterName: document.querySelector('.chapter-name'),
        };
    }

    updateDisplays() {
        this.updateChapterDisplay();
        this.updateProgressDisplay();
    }
    
    updateChapterDisplay() {
        this.elements.chapterName.textContent = this.currentChapter.title;
    }
    
    updateProgressDisplay() {
        const chapterIndex = parseInt(this.gameState.currentChapterId.replace('chapter', '')) - 1;
        this.elements.missionProgress.textContent = `Progress: ${this.currentSceneNumber}/${this.totalScenes}`;
        this.elements.securityLevel.textContent = `Security Level: ${this.securityLevels[chapterIndex]}`;
    }

    async init() {
        try {
            this.bindEvents();
            this.updateUI();
            return true;
        } catch (error) {
            console.error('Story Engine initialization failed:', error);
            throw error;
        }
    }

    bindEvents() {
        this.elements.choicesContainer.addEventListener('click', (e) => {
            const choiceButton = e.target.closest('.choice-btn');
            if (choiceButton) {
                this.handleChoice(choiceButton.dataset.choiceId);
            }
        });
    }

    loadChapter(chapterId) {
        this.currentChapter = this.chapters[chapterId];
        if (!this.currentChapter) {
            console.error(`Chapter ${chapterId} not found`);
            return;
        }
        
        this.currentScene = this.currentChapter.initialScenario;
        this.currentSceneNumber = 1;
        this.totalScenes = this.currentChapter.totalScenes;
        this.gameState.currentChapterId = chapterId;
    
        this.updateDisplays();
        this.updateUI();
    }

    handleChoice(choiceId) {
        const choice = this.currentScene.choices.find(c => c.id === choiceId);
        if (!choice) return;

        if (choice.consequence) {
            choice.consequence(this.gameState);
        }

        if (this.gameState.chapterTransition) {
            this.handleChapterTransition();
            return;
        }

        this.showFeedback(choice.feedback);
        this.currentSceneNumber++;
        this.updateProgressDisplay();
        this.currentScene = this.currentChapter.scenes[choice.next];
        this.updateUI();
    }

    handleChapterTransition() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.hidden = false;
        
        setTimeout(() => {
            const currentIndex = parseInt(this.gameState.currentChapterId.replace('chapter', ''));
            const nextChapter = `chapter${currentIndex + 1}`;
            
            this.loadChapter(nextChapter);
            loadingScreen.hidden = true;
            this.gameState.chapterTransition = false;
        }, 1000);
    }

    playTypeSound() {
        const audio = this.typeSoundPool[this.currentSoundIndex];
        audio.currentTime = 0;
        audio.play();
        this.currentSoundIndex = (this.currentSoundIndex + 1) % this.typeSoundPool.length;
    }

    updateUI() {
        this.elements.scenarioText.textContent = '';
        this.elements.choicesContainer.innerHTML = '';

        const text = typeof this.currentScene.text === 'function' 
            ? this.currentScene.text(this.gameState) 
            : this.currentScene.text;
        
        this.typeText(text);
    }

    typeText(text) {
        let index = 0;
        const typeCharacter = () => {
            if (index < text.length) {
                if (text[index] === '\n') {
                    this.elements.scenarioText.innerHTML += '<br>';
                } else {
                    this.elements.scenarioText.innerHTML += text[index];
                }
                if (text[index] !== ' ' && text[index] !== '\n' && index % 5 === 0) {
                    this.playTypeSound();
                }
                index++;
                setTimeout(typeCharacter, 20);
            } else {
                this.showChoices();
            }
        };
        typeCharacter();
    }

    showChoices() {
        if (!this.currentScene.choices) return;
        
        const choices = [...this.currentScene.choices];
        // For two options, simple random boolean for swap
        if (Math.random() < 0.5) {
            [choices[0], choices[1]] = [choices[1], choices[0]];
        }
        
        choices.forEach((choice, index) => {
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

    showFeedback(feedback) {
        this.elements.feedbackArea.textContent = feedback;
        this.elements.feedbackArea.style.display = 'block';
        setTimeout(() => {
            this.elements.feedbackArea.style.display = 'none';
        }, 10000);
    }

    saveProgress() {
        localStorage.setItem('gameState', JSON.stringify(this.gameState));
    }

    loadProgress() {
        const savedState = localStorage.getItem('gameState');
        if (savedState) {
            this.gameState = JSON.parse(savedState);
            const chapter = this.chapters[this.gameState.currentChapterId];
            if (chapter) {
                this.loadChapter(this.gameState.currentChapterId);
            }
        }
    }
}

export default StoryEngine;