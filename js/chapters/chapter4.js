export const chapter4 = {
    id: "too-many-apps",
    title: "Too Many Apps!",
    maxScore: 100,
    totalScenes: 6,

    achievements: {
        user_advocate: {
            id: "user_advocate",
            title: "User Advocate",
            description: "Successfully addressed MFA fatigue",
            condition: (gameState) => gameState.chapter4_choices?.includes("analyze_patterns")
        },
        sso_strategist: {
            id: "sso_strategist",
            title: "SSO Strategist",
            description: "Developed comprehensive SSO strategy",
            condition: (gameState) => gameState.chapter4_choices?.includes("comprehensive_sso")
        },
        efficiency_expert: {
            id: "efficiency_expert",
            title: "Efficiency Expert",
            description: "Achieved perfect score in SSO planning",
            condition: (gameState) => gameState.chapterScore == 100
        }
    },

    initialScenario: {
        text: `From: Support@techstart.com
Subject: Login Issues Escalating

Help desk is overwhelmed:
- 200+ tickets about multiple login prompts
- Employees managing 8+ sets of credentials
- Increased MFA fatigue reported
- Shadow IT emerging as employees seek shortcuts

How do you address this growing crisis?`,
        choices: [
            {
                id: "analyze_patterns",
                text: "Analyze app usage patterns and authentication pain points",
                feedback: "Excellent! Understanding user behavior helps find effective solutions.",
                consequence: (gameState) => {
                    gameState.chapter4_choices = gameState.chapter4_choices || [];
                    gameState.chapter4_choices.push("analyze_patterns");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 20;
                },
                next: "solution_proposal"
            },
            {
                id: "quick_fix",
                text: "Implement password manager company-wide",
                feedback: "Password managers don't address MFA fatigue.",
                consequence: (gameState) => {
                    gameState.chapter4_choices = gameState.chapter4_choices || [];
                    gameState.chapter4_choices.push("quick_fix");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 5;
                },
                next: "solution_proposal",
                isSuboptimal: true
            }
        ]
    },

    scenes: {
        solution_proposal: {
            text: "Analysis complete. What solution do you propose to management?",
            choices: [
                {
                    id: "comprehensive_sso",
                    text: "Single Sign-On (SSO) with integrated MFA",
                    feedback: "Perfect! SSO addresses both security and usability.",
                    consequence: (gameState) => {
                        gameState.chapter4_choices.push("comprehensive_sso");
                        gameState.chapterScore += 20;
                    },
                    next: "vendor_selection"
                },
                {
                    id: "reduce_mfa",
                    text: "Reduce MFA frequency for commonly used apps",
                    feedback: "Reducing security measures isn't the best solution.",
                    consequence: (gameState) => {
                        gameState.chapter4_choices.push("reduce_mfa");
                        gameState.chapterScore += 10;
                    },
                    next: "vendor_selection",
                    isSuboptimal: true
                }
            ]
        },

        vendor_selection: {
            text: "How do you approach SSO vendor selection?",
            choices: [
                {
                    id: "thorough_evaluation",
                    text: "Evaluate vendors based on app compatibility and security features",
                    feedback: "Good approach! Compatibility is crucial for SSO success.",
                    consequence: (gameState) => {
                        gameState.chapter4_choices.push("thorough_evaluation");
                        gameState.chapterScore += 20;
                    },
                    next: "implementation_strategy"
                },
                {
                    id: "quick_selection",
                    text: "Choose the most popular vendor to save time",
                    feedback: "Popular solutions might not best fit your needs.",
                    consequence: (gameState) => {
                        gameState.chapter4_choices.push("quick_selection");
                        gameState.chapterScore += 10;
                    },
                    next: "implementation_strategy",
                    isSuboptimal: true
                }
            ]
        },

        implementation_strategy: {
            text: "How will you handle the SSO implementation?",
            choices: [
                {
                    id: "phased_rollout",
                    text: "Implement phased rollout starting with pilot group",
                    feedback: "Smart! Phased approach allows for adjustments.",
                    consequence: (gameState) => {
                        gameState.chapter4_choices.push("phased_rollout");
                        gameState.chapterScore += 20;
                    },
                    next: "evaluate_success"
                },
                {
                    id: "full_rollout",
                    text: "Roll out to all departments simultaneously",
                    feedback: "Full rollout increases risk of widespread issues.",
                    consequence: (gameState) => {
                        gameState.chapter4_choices.push("full_rollout");
                        gameState.chapterScore += 10;
                    },
                    next: "evaluate_success",
                    isSuboptimal: true
                }
            ]
        },

        evaluate_success: {
            text: "Initial SSO implementation complete. How do you measure success?",
            choices: [
                {
                    id: "comprehensive_metrics",
                    text: "Track login issues, help desk tickets, and user satisfaction",
                    feedback: "Excellent! Multiple metrics provide complete picture.",
                    consequence: (gameState) => {
                        gameState.chapter4_choices.push("comprehensive_metrics");
                        gameState.chapterScore += 20;
                    },
                    next: "chapter_end"
                },
                {
                    id: "basic_tracking",
                    text: "Monitor help desk tickets only",
                    feedback: "Help desk tickets alone don't show full impact.",
                    consequence: (gameState) => {
                        gameState.chapter4_choices.push("basic_tracking");
                        gameState.chapterScore += 10;
                    },
                    next: "chapter_end",
                    isSuboptimal: true
                }
            ]
        },

        chapter_end: {
            text: (gameState) => {
                const score = gameState.chapterScore || 0;
                const totalScore = gameState.totalScore + score;
                gameState.totalScore = totalScore;

                const unlockedAchievements = Object.values(chapter4.achievements)
                    .filter(achievement => achievement.condition(gameState))
                    .map(a => `🏆 ${a.title}: ${a.description}`);

                const achievementsText = unlockedAchievements.length > 0 
                    ? `\n\nAchievements Unlocked:\n${unlockedAchievements.join('\n')}` 
                    : '\n\nNo achievements unlocked this chapter.';
                
                return `SSO journey begins! Login experience transformed.
        
        Chapter Score: ${score}/100
        Total Score: ${totalScore}
        
        ${score >= 90 ? "Outstanding! You've masterfully balanced security and usability." : 
          score >= 70 ? "Well done! SSO implementation is on track with minor concerns." : 
          "Completed! Consider focusing more on user experience and thorough planning."}
        
        Integration challenges await...${achievementsText}`;
            },
            choices: [
                {
                    id: "next-chapter",
                    text: "Continue to Chapter 5",
                    feedback: "Time to tackle integration challenges!",
                    consequence: (gameState) => {
                        gameState.chapterScore = 0;
                        gameState.chapterTransition = true;
                    },
                    next: "end"
                }
            ]
        }
    }
};