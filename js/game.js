import { AchievementManager } from './utils/achievements.js';
import { chapters } from './chapters/index.js';

// Game State Management
const gameState = {
    currentChapter: 1,
    currentScene: 0,
    achievements: [],
    inventory: [],
    decisions: {},
    saveTimestamp: null
};

// UI Element References
const ui = {
    storyContainer: document.getElementById('story-container'),
    interactionContainer: document.getElementById('interaction-container'),
    choicesContainer: document.getElementById('choices-container'),
    prevButton: document.getElementById('prev-btn'),
    nextButton: document.getElementById('next-btn'),
    chapterDisplay: document.getElementById('current-chapter'),
    achievementPopup: document.getElementById('achievement-popup'),
    achievementText: document.getElementById('achievement-text'),
    achievementCount: document.getElementById('achievement-count')
};

// Game Configuration
const config = {
    totalChapters: 7,
    totalAchievements: 10,
    saveKey: 'securityMasters_saveData',
    typingSpeed: 50  // ms per character for typing effect
};

// Initialize Game
function initGame() {
    AchievementManager.init();
    loadSaveData();
    setupEventListeners();
    updateUI();
    loadCurrentChapter();
}

// Save/Load Functions
function saveGame() {
    const saveData = {
        ...gameState,
        saveTimestamp: new Date().toISOString()
    };
    localStorage.setItem(config.saveKey, JSON.stringify(saveData));
}

function loadSaveData() {
    const savedData = localStorage.getItem(config.saveKey);
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            Object.assign(gameState, parsedData);
        } catch (error) {
            console.error('Error loading save data:', error);
        }
    }
}

// Chapter Management
function loadCurrentChapter() {
    const chapterModule = window[`chapter${gameState.currentChapter}`];
    if (!chapterModule) {
        console.error(`Chapter ${gameState.currentChapter} not found!`);
        return;
    }

    renderScene(chapterModule.scenes[gameState.currentScene]);
    updateNavigationButtons();
}

// Scene Management
function renderScene(scene) {
    // Clear previous content
    ui.storyContainer.innerHTML = '';
    ui.interactionContainer.innerHTML = '';
    ui.choicesContainer.innerHTML = '';

    if (scene.type === 'dialogue') {
        renderDialogue(scene);
    } else if (scene.type === 'interaction') {
        renderInteraction(scene);
    } else if (scene.type === 'choice') {
        renderChoices(scene);
    }
}

// Render Functions
function renderDialogue(scene) {
    const dialogueElement = document.createElement('p');
    dialogueElement.classList.add('story-text-enter', 'text-gray-800', 'leading-relaxed');
    
    if (scene.typing) {
        dialogueElement.classList.add('typing-effect');
        typeText(dialogueElement, scene.text);
    } else {
        dialogueElement.textContent = scene.text;
    }
    
    ui.storyContainer.appendChild(dialogueElement);
}

function renderInteraction(scene) {
    const interactionElement = document.createElement('div');
    interactionElement.classList.add('interactive-highlight', 'p-4', 'rounded-lg');
    
    switch (scene.component) {
        case 'password-policy':
            renderPasswordPolicy(interactionElement, scene);
            break;
        case 'mfa-setup':
            renderMFASetup(interactionElement, scene);
            break;
        // Add more interaction types as needed
    }
    
    ui.interactionContainer.appendChild(interactionElement);
}

function renderChoices(scene) {
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.classList.add(
            'choice-button',
            'w-full',
            'p-4',
            'text-left',
            'bg-gray-50',
            'hover:bg-gray-100',
            'rounded-lg',
            'transition-all'
        );
        button.textContent = choice.text;
        button.onclick = () => makeChoice(choice);
        ui.choicesContainer.appendChild(button);
    });
}

// Navigation
function nextScene() {
    const currentChapter = window[`chapter${gameState.currentChapter}`];
    if (gameState.currentScene < currentChapter.scenes.length - 1) {
        gameState.currentScene++;
        loadCurrentChapter();
    } else if (gameState.currentChapter < config.totalChapters) {
        gameState.currentChapter++;
        gameState.currentScene = 0;
        loadCurrentChapter();
    }
    saveGame();
}

function previousScene() {
    if (gameState.currentScene > 0) {
        gameState.currentScene--;
        loadCurrentChapter();
    } else if (gameState.currentChapter > 1) {
        gameState.currentChapter--;
        const prevChapter = window[`chapter${gameState.currentChapter}`];
        gameState.currentScene = prevChapter.scenes.length - 1;
        loadCurrentChapter();
    }
    saveGame();
}

// Achievement System
function unlockAchievement(id, title) {
    if (!gameState.achievements.includes(id)) {
        gameState.achievements.push(id);
        showAchievementPopup(title);
        updateAchievementCount();
        saveGame();
    }
}

function showAchievementPopup(title) {
    ui.achievementText.textContent = `Achievement Unlocked: ${title}`;
    ui.achievementPopup.classList.remove('hidden');
    ui.achievementPopup.classList.add('achievement-show');
    
    setTimeout(() => {
        ui.achievementPopup.classList.add('hidden');
        ui.achievementPopup.classList.remove('achievement-show');
    }, 3000);
}

// Utility Functions
function typeText(element, text) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, config.typingSpeed);
        }
    }
    
    type();
}

function updateUI() {
    ui.chapterDisplay.textContent = gameState.currentChapter;
    updateAchievementCount();
    updateNavigationButtons();
}

function updateAchievementCount() {
    ui.achievementCount.textContent = `${gameState.achievements.length}/${config.totalAchievements}`;
}

function updateNavigationButtons() {
    ui.prevButton.disabled = gameState.currentChapter === 1 && gameState.currentScene === 0;
    ui.nextButton.disabled = gameState.currentChapter === config.totalChapters && 
                            gameState.currentScene === window[`chapter${config.totalChapters}`].scenes.length - 1;
}

// Event Listeners
function setupEventListeners() {
    ui.nextButton.addEventListener('click', nextScene);
    ui.prevButton.addEventListener('click', previousScene);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && !ui.nextButton.disabled) {
            nextScene();
        } else if (e.key === 'ArrowLeft' && !ui.prevButton.disabled) {
            previousScene();
        }
    });
}

function hideLoadingScreen() {
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('invisible');
}

// Initialize the game when the page loads
window.addEventListener('load', initGame);