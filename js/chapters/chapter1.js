// chapter1.js
export const chapter1 = {
    id: "welcome-to-techstart",
    title: "Welcome to TechStart!",
    maxScore: 100,

    // Achievement definitions for this chapter
    achievements: {
        thorough_analyst: {
            id: "thorough_analyst",
            title: "Thorough Analyst",
            description: "Reviewed password practices before making changes",
            condition: (gameState) => gameState.chapter1_choices?.includes("review-situation")
        },
        balanced_approach: {
            id: "balanced_approach",
            title: "Balanced Approach",
            description: "Created a security policy that balances security and usability",
            condition: (gameState) => gameState.policyScore >= 80
        },
        security_expert: {
            id: "security_expert",
            title: "Security Expert",
            description: "Achieved perfect score in password policy implementation",
            condition: (gameState) => gameState.policyScore >= 95
        }
    },
    
    initialScenario: {
        text: `From: CEO@techstart.com
Subject: Welcome Aboard!

Welcome to TechStart! As our new IT Security Administrator, I'm excited to have you on board.

From: ITDirector@techstart.com
Subject: First Task - Password Policy

We need your expertise in implementing our first formal password policy. Currently, our 50 employees are using basic passwords with no requirements. Many are using variations of 'password123' or 'techstart'.

What would you like to do first?`,
        
        choices: [
            {
                id: "review-situation",
                text: "Review current password practices",
                feedback: "Smart choice! Understanding the current situation helps create effective policies.",
                consequence: (gameState) => {
                    gameState.chapter1_choices = gameState.chapter1_choices || [];
                    gameState.chapter1_choices.push("review-situation");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 30;
                    return "You gather password analytics and user behavior data...";
                },
                next: "password_analysis"
            },
            {
                id: "implement-immediately",
                text: "Implement strict policy immediately",
                feedback: "Quick action, but gathering data first might have been better.",
                consequence: (gameState) => {
                    gameState.chapter1_choices = gameState.chapter1_choices || [];
                    gameState.chapter1_choices.push("implement-immediately");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 10;
                    gameState.userResistance = true;
                    return "You notice some resistance from employees...";
                },
                next: "password_analysis",
                isSuboptimal: true
            }
        ]
    },

    scenes: {
        password_analysis: {
            text: (gameState) => {
                if (gameState.chapter1_choices?.includes("review-situation")) {
                    return `Your analysis reveals concerning patterns:
                    - 60% of passwords are under 8 characters
                    - 40% contain company name
                    - 30% are simple keyboard patterns
                    - Multiple accounts sharing same passwords
                    
                    This thorough analysis will help make informed decisions.`;
                } else {
                    return `Quick observations show:
                    - Most passwords are too simple
                    - Common patterns are obvious
                    - Some resistance to sudden change
                    
                    Maybe a more gradual approach would be better?`;
                }
            },
            choices: [
                {
                    id: "create-basic-policy",
                    text: "Create balanced password policy",
                    feedback: "Good choice! Balance is key to successful security policies.",
                    consequence: (gameState) => {
                        gameState.chapter1_choices.push("balanced-policy");
                        gameState.chapterScore += 20;
                        gameState.userResistance = false;
                    },
                    next: "policy_creation"
                },
                {
                    id: "create-strict-policy",
                    text: "Create very strict password policy",
                    feedback: "While secure, this might be too aggressive for initial implementation.",
                    consequence: (gameState) => {
                        gameState.chapter1_choices.push("strict-policy");
                        gameState.chapterScore += 10;
                        gameState.userResistance = true;
                    },
                    next: "policy_creation",
                    isSuboptimal: true
                }
            ]
        },

        // ... rest of the scenes ...
    },

    // Evaluate final chapter performance
    evaluateChapter: (gameState) => {
        let summary = {
            score: gameState.chapterScore || 0,
            maxScore: 100,
            achievements: [],
            feedback: [],
            nextChapter: "chapter2"
        };

        // Check achievements
        Object.values(chapter1.achievements).forEach(achievement => {
            if (achievement.condition(gameState)) {
                summary.achievements.push(achievement);
            }
        });

        // Generate feedback based on choices
        if (gameState.userResistance) {
            summary.feedback.push("Employee resistance might cause security issues. Consider a more gradual approach next time.");
        }

        if (gameState.chapter1_choices?.includes("review-situation")) {
            summary.feedback.push("Your thorough analysis helped make informed decisions.");
        }

        // Final score adjustments
        if (summary.score >= 90) {
            summary.feedback.push("Excellent work! You've balanced security and usability perfectly.");
        } else if (summary.score >= 70) {
            summary.feedback.push("Good job! Some room for improvement, but solid security foundations.");
        } else {
            summary.feedback.push("Consider balancing security requirements with user needs next time.");
        }

        return summary;
    }
};