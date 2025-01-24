export const chapter3 = {
    id: "two-steps-forward",
    title: "Two Steps Forward",
    maxScore: 100,
    totalScenes: 6,

    achievements: {
        change_manager: {
            id: "change_manager",
            title: "Change Manager",
            description: "Successfully managed employee resistance to MFA",
            condition: (gameState) => gameState.chapter3_choices?.includes("empathetic_training")
        },
        incident_handler: {
            id: "incident_handler",
            title: "Incident Handler",
            description: "Effectively handled MFA device loss incident",
            condition: (gameState) => gameState.chapter3_choices?.includes("verify_identity")
        },
        security_master: {
            id: "security_master",
            title: "Security Master",
            description: "Achieved perfect score in MFA implementation",
            condition: (gameState) => gameState.chapterScore == 100
        }
    },

    initialScenario: {
        text: `From: ITDirector@techstart.com
Subject: Security Metrics Review

Our latest security audit reveals:
- 47% of password resets due to forgetting complex passwords
- 3 confirmed cases of credential theft last month
- 28% increase in suspicious login attempts

The board has approved MFA implementation. How do you proceed?`,
        choices: [
            {
                id: "research_solutions",
                text: "Research MFA solutions and create implementation plan",
                feedback: "Excellent approach. Planning is crucial for successful MFA rollout.",
                consequence: (gameState) => {
                    gameState.chapter3_choices = gameState.chapter3_choices || [];
                    gameState.chapter3_choices.push("research_solutions");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 20;
                },
                next: "select_solution"
            },
            {
                id: "immediate_rollout",
                text: "Begin immediate company-wide MFA rollout",
                feedback: "Quick action without proper planning may cause implementation issues.",
                consequence: (gameState) => {
                    gameState.chapter3_choices = gameState.chapter3_choices || [];
                    gameState.chapter3_choices.push("immediate_rollout");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 5;
                },
                next: "select_solution",
                isSuboptimal: true
            }
        ]
    },

    scenes: {
        select_solution: {
            text: "After evaluating options, which MFA solution do you recommend?",
            choices: [
                {
                    id: "authenticator_app",
                    text: "Mobile authenticator app with backup codes",
                    feedback: "Good choice! Balances security and usability with offline backup option.",
                    consequence: (gameState) => {
                        gameState.chapter3_choices.push("authenticator_app");
                        gameState.chapterScore += 20;
                    },
                    next: "prepare_training"
                },
                {
                    id: "hardware_token",
                    text: "Hardware security keys for all employees",
                    feedback: "While secure, hardware tokens are costly and can be lost.",
                    consequence: (gameState) => {
                        gameState.chapter3_choices.push("hardware_token");
                        gameState.chapterScore += 10;
                    },
                    next: "prepare_training",
                    isSuboptimal: true
                }
            ]
        },

        prepare_training: {
            text: "Several senior employees express concerns about MFA complexity. How do you approach training?",
            choices: [
                {
                    id: "empathetic_training",
                    text: "Create personalized training sessions with hands-on practice",
                    feedback: "Perfect! Personal attention helps address individual concerns.",
                    consequence: (gameState) => {
                        gameState.chapter3_choices.push("empathetic_training");
                        gameState.chapterScore += 20;
                    },
                    next: "handle_incident"
                },
                {
                    id: "mandatory_training",
                    text: "Send mandatory video training and documentation",
                    feedback: "Generic training materials may not address specific concerns.",
                    consequence: (gameState) => {
                        gameState.chapter3_choices.push("mandatory_training");
                        gameState.chapterScore += 10;
                    },
                    next: "handle_incident",
                    isSuboptimal: true
                }
            ]
        },

        handle_incident: {
            text: "URGENT: Sales VP lost phone with authenticator app during business trip. Needs immediate access for client meeting.",
            choices: [
                {
                    id: "verify_identity",
                    text: "Verify identity through backup channel and provide backup codes",
                    feedback: "Good balance of security and business needs.",
                    consequence: (gameState) => {
                        gameState.chapter3_choices.push("verify_identity");
                        gameState.chapterScore += 20;
                    },
                    next: "implementation_review"
                },
                {
                    id: "disable_mfa",
                    text: "Temporarily disable MFA for their account",
                    feedback: "Disabling MFA creates security vulnerability.",
                    consequence: (gameState) => {
                        gameState.chapter3_choices.push("disable_mfa");
                        gameState.chapterScore += 5;
                    },
                    next: "implementation_review",
                    isSuboptimal: true
                }
            ]
        },

        implementation_review: {
            text: "One month after MFA implementation, review shows successful adoption but some issues persist. How do you proceed?",
            choices: [
                {
                    id: "continuous_improvement",
                    text: "Implement feedback system and regular training updates",
                    feedback: "Excellent! Continuous improvement ensures long-term success.",
                    consequence: (gameState) => {
                        gameState.chapter3_choices.push("continuous_improvement");
                        gameState.chapterScore += 20;
                    },
                    next: "chapter_end"
                },
                {
                    id: "maintain_current",
                    text: "Maintain current system without changes",
                    feedback: "Security systems need continuous refinement.",
                    consequence: (gameState) => {
                        gameState.chapter3_choices.push("maintain_current");
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

                const unlockedAchievements = Object.values(chapter3.achievements)
                    .filter(achievement => achievement.condition(gameState))
                    .map(a => `🏆 ${a.title}: ${a.description}`);

                const achievementsText = unlockedAchievements.length > 0 
                    ? `\n\nAchievements Unlocked:\n${unlockedAchievements.join('\n')}` 
                    : '\n\nNo achievements unlocked this chapter.';
                
                return `MFA implementation complete! TechStart's security has evolved.
        
        Chapter Score: ${score}/100
        Total Score: ${totalScore}
        
        ${score >= 90 ? "Outstanding! You've masterfully implemented MFA while managing change." : 
          score >= 70 ? "Well done! MFA is successfully implemented with minor issues." : 
          "Completed! Consider focusing more on change management and user experience."}
        
        The next challenge awaits...${achievementsText}`;
            },
            choices: [
                {
                    id: "next-chapter",
                    text: "Continue to Chapter 4",
                    feedback: "New challenges emerge as TechStart grows!",
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