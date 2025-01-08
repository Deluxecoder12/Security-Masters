// Progress Management System
const Progress = {
    // Constants
    SAVE_KEY: 'securityMasters_progress',
    VERSION: '1.0',

    // Initialize progress tracking
    init() {
        this.loadProgress();
        this.setupAutoSave();
    },

    // Current progress state
    state: {
        currentChapter: 1,
        currentScene: 0,
        achievements: [],
        decisions: {},
        completedChapters: [],
        stats: {
            securityScore: 0,
            userSatisfaction: 0,
            incidentsResolved: 0
        }
    },

    // Save progress to localStorage
    saveProgress() {
        const saveData = {
            version: this.VERSION,
            timestamp: new Date().toISOString(),
            state: this.state
        };
        try {
            localStorage.setItem(this.SAVE_KEY, JSON.stringify(saveData));
            return true;
        } catch (error) {
            console.error('Failed to save progress:', error);
            return false;
        }
    },

    // Load progress from localStorage
    loadProgress() {
        try {
            const savedData = localStorage.getItem(this.SAVE_KEY);
            if (savedData) {
                const parsed = JSON.parse(savedData);
                // Version check for future compatibility
                if (parsed.version === this.VERSION) {
                    this.state = parsed.state;
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Failed to load progress:', error);
            return false;
        }
    },

    // Update game progress
    updateProgress(updates) {
        Object.assign(this.state, updates);
        this.saveProgress();
        this.updateUI();
    },

    // Chapter management
    completeChapter(chapterNumber) {
        if (!this.state.completedChapters.includes(chapterNumber)) {
            this.state.completedChapters.push(chapterNumber);
            this.state.stats.securityScore += 10;
            this.saveProgress();
        }
    },

    isChapterComplete(chapterNumber) {
        return this.state.completedChapters.includes(chapterNumber);
    },

    // Achievement management
    unlockAchievement(id, title, description) {
        if (!this.state.achievements.includes(id)) {
            this.state.achievements.push({
                id,
                title,
                description,
                timestamp: new Date().toISOString()
            });
            this.saveProgress();
            this.triggerAchievementNotification(title);
        }
    },

    hasAchievement(id) {
        return this.state.achievements.some(a => a.id === id);
    },

    // Decision tracking
    recordDecision(chapter, decisionId, choice) {
        if (!this.state.decisions[chapter]) {
            this.state.decisions[chapter] = {};
        }
        this.state.decisions[chapter][decisionId] = choice;
        this.saveProgress();
    },

    getDecision(chapter, decisionId) {
        return this.state.decisions[chapter]?.[decisionId];
    },

    // Stats management
    updateStats(updates) {
        Object.assign(this.state.stats, updates);
        this.saveProgress();
    },

    // UI Updates
    updateUI() {
        // Update chapter display
        const chapterDisplay = document.getElementById('current-chapter');
        if (chapterDisplay) {
            chapterDisplay.textContent = this.state.currentChapter;
        }

        // Update achievement count
        const achievementCount = document.getElementById('achievement-count');
        if (achievementCount) {
            achievementCount.textContent = `${this.state.achievements.length}/10`;
        }
    },

    // Achievement notification
    triggerAchievementNotification(title) {
        const popup = document.getElementById('achievement-popup');
        const text = document.getElementById('achievement-text');
        
        if (popup && text) {
            text.textContent = `Achievement Unlocked: ${title}`;
            popup.classList.remove('hidden');
            popup.classList.add('achievement-show');

            setTimeout(() => {
                popup.classList.add('hidden');
                popup.classList.remove('achievement-show');
            }, 3000);
        }
    },

    // Auto-save setup
    setupAutoSave() {
        // Auto-save every 5 minutes
        setInterval(() => this.saveProgress(), 5 * 60 * 1000);

        // Save on page unload
        window.addEventListener('beforeunload', () => this.saveProgress());
    }
};

// Export the Progress module
export default Progress;