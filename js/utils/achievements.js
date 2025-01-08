// Define all possible achievements
const ACHIEVEMENTS = {
    // Chapter 1 Achievements
    CHAPTER_1: {
        password_guardian: {
            id: 'ch1_guardian',
            title: 'Password Guardian',
            description: 'Established strong password policies',
            icon: '🛡️'
        },
        quick_learner: {
            id: 'ch1_learner',
            title: 'Quick Learner',
            description: 'Completed all tutorial sections perfectly',
            icon: '📚'
        },
        incident_handler: {
            id: 'ch1_incident',
            title: 'First Responder',
            description: 'Successfully handled your first security incident',
            icon: '🚨'
        }
    },
    // Add other chapters' achievements...
};

// Achievement Manager
const AchievementManager = {
    achievements: new Set(),
    
    // Initialize achievements from saved data
    init() {
        const saved = localStorage.getItem('securityMasters_achievements');
        if (saved) {
            this.achievements = new Set(JSON.parse(saved));
        }
        this.updateUI();
    },

    // Unlock a new achievement
    unlock(achievementId) {
        // Check if already unlocked
        if (this.achievements.has(achievementId)) return;

        // Find achievement details
        let achievement = null;
        for (const chapter in ACHIEVEMENTS) {
            for (const key in ACHIEVEMENTS[chapter]) {
                if (ACHIEVEMENTS[chapter][key].id === achievementId) {
                    achievement = ACHIEVEMENTS[chapter][key];
                    break;
                }
            }
            if (achievement) break;
        }

        if (!achievement) {
            console.error('Achievement not found:', achievementId);
            return;
        }

        // Add to unlocked achievements
        this.achievements.add(achievementId);
        
        // Save to localStorage
        localStorage.setItem('securityMasters_achievements', 
            JSON.stringify([...this.achievements]));

        // Show notification
        this.showNotification(achievement);
        
        // Update UI
        this.updateUI();
    },

    // Check if achievement is unlocked
    isUnlocked(achievementId) {
        return this.achievements.has(achievementId);
    },

    // Show achievement notification
    showNotification(achievement) {
        const popup = document.getElementById('achievement-popup');
        const text = document.getElementById('achievement-text');
        
        if (popup && text) {
            text.innerHTML = `
                ${achievement.icon} 
                Achievement Unlocked: ${achievement.title}
                <br>
                <span class="text-sm">${achievement.description}</span>
            `;
            
            popup.classList.remove('hidden');
            popup.classList.add('achievement-show');

            // Hide after 3 seconds
            setTimeout(() => {
                popup.classList.add('hidden');
                popup.classList.remove('achievement-show');
            }, 3000);
        }
    },

    // Update achievement counter and list
    updateUI() {
        // Update counter
        const counter = document.getElementById('achievement-count');
        if (counter) {
            counter.textContent = `${this.achievements.size}/${this.getTotalAchievements()}`;
        }
    },

    // Get total number of possible achievements
    getTotalAchievements() {
        let total = 0;
        for (const chapter in ACHIEVEMENTS) {
            total += Object.keys(ACHIEVEMENTS[chapter]).length;
        }
        return total;
    },

    // Check for special achievements
    checkSpecialAchievements(gameState) {
        // Speed runner
        if (gameState.completionTime < 1800) { // 30 minutes
            this.unlock('special_speed');
        }

        // Perfect score
        if (gameState.totalScore === gameState.maxPossibleScore) {
            this.unlock('special_perfect');
        }

        // Incident free
        if (gameState.securityIncidents === 0) {
            this.unlock('special_clean');
        }

        // User favorite
        if (gameState.userSatisfaction >= 90) {
            this.unlock('special_favorite');
        }
    }
};

// Usage example:
// AchievementManager.init();  // Call this when game starts
// AchievementManager.unlock('ch1_guardian');  // Unlock an achievement