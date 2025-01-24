export const chapter6 = {
    id: "future-calls",
    title: "The Future Calls",
    maxScore: 100,
    totalScenes: 8,

    achievements: {
        innovation_leader: {
            id: "innovation_leader",
            title: "Innovation Leader",
            description: "Successfully piloted passwordless authentication",
            condition: (gameState) => gameState.chapter6_choices?.includes("pilot_program")
        },
        change_master: {
            id: "change_master",
            title: "Change Master",
            description: "Effectively managed authentication transition",
            condition: (gameState) => gameState.chapter6_choices?.includes("structured_transition")
        }
    },

    initialScenario: {
        text: `From: Board@techstart.com
Subject: Enhanced Security Initiative

Board requests security enhancement plan:
- Recent high-profile breaches in news
- Interest in passwordless authentication
- Need to maintain productivity
- Budget approved for implementation

How do you approach this initiative?`,
        choices: [
            {
                id: "research_first",
                text: "Research passwordless solutions and create proof of concept",
                feedback: "Excellent approach to validate new technology.",
                consequence: (gameState) => {
                    gameState.chapter6_choices = gameState.chapter6_choices || [];
                    gameState.chapter6_choices.push("research_first");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 20;
                },
                next: "solution_selection"
            },
            {
                id: "immediate_pilot",
                text: "Start immediate pilot with available solution",
                feedback: "Quick start without proper research risks issues.",
                consequence: (gameState) => {
                    gameState.chapter6_choices = [];
                    gameState.chapter6_choices.push("immediate_pilot");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 5;
                },
                next: "solution_selection",
                isSuboptimal: true
            }
        ]
    },

    scenes: {
        solution_selection: {
            text: "After research, which passwordless approach do you recommend?",
            choices: [
                {
                    id: "fido2_passkeys",
                    text: "FIDO2 Passkeys with biometric authentication",
                    feedback: "Perfect choice! Industry standard with strong security.",
                    consequence: (gameState) => {
                        gameState.chapter6_choices.push("fido2_passkeys");
                        gameState.chapterScore += 15;
                    },
                    next: "pilot_planning"
                },
                {
                    id: "magic_links",
                    text: "Email magic links only",
                    feedback: "Email-based authentication has security limitations.",
                    consequence: (gameState) => {
                        gameState.chapter6_choices.push("magic_links");
                        gameState.chapterScore += 5;
                    },
                    next: "pilot_planning",
                    isSuboptimal: true
                }
            ]
        },

        pilot_planning: {
            text: "How do you structure the pilot program?",
            choices: [
                {
                    id: "pilot_program",
                    text: "Select diverse user group and create structured test plan",
                    feedback: "Well-planned pilot ensures valuable feedback.",
                    consequence: (gameState) => {
                        gameState.chapter6_choices.push("pilot_program");
                        gameState.chapterScore += 15;
                    },
                    next: "adoption_challenges"
                },
                {
                    id: "volunteer_basis",
                    text: "Open pilot to volunteers only",
                    feedback: "Self-selected group may not represent all users.",
                    consequence: (gameState) => {
                        gameState.chapter6_choices.push("volunteer_basis");
                        gameState.chapterScore += 5;
                    },
                    next: "adoption_challenges",
                    isSuboptimal: true
                }
            ]
        },

        adoption_challenges: {
            text: "Users report confusion about passwordless login. How do you address this?",
            choices: [
                {
                    id: "comprehensive_training",
                    text: "Create detailed guides and provide hands-on training",
                    feedback: "Education key to successful adoption.",
                    consequence: (gameState) => {
                        gameState.chapter6_choices.push("comprehensive_training");
                        gameState.chapterScore += 15;
                    },
                    next: "transition_planning"
                },
                {
                    id: "basic_documentation",
                    text: "Send documentation via email",
                    feedback: "Minimal support may lead to adoption resistance.",
                    consequence: (gameState) => {
                        gameState.chapter6_choices.push("basic_documentation");
                        gameState.chapterScore += 5;
                    },
                    next: "transition_planning",
                    isSuboptimal: true
                }
            ]
        },

        transition_planning: {
            text: "How do you plan the full transition to passwordless authentication?",
            choices: [
                {
                    id: "structured_transition",
                    text: "Create phased transition plan with clear milestones",
                    feedback: "Structured approach ensures smooth transition.",
                    consequence: (gameState) => {
                        gameState.chapter6_choices.push("structured_transition");
                        gameState.chapterScore += 15;
                    },
                    next: "future_proofing"
                },
                {
                    id: "aggressive_rollout",
                    text: "Set hard deadline for full transition",
                    feedback: "Forced transition may create resistance.",
                    consequence: (gameState) => {
                        gameState.chapter6_choices.push("aggressive_rollout");
                        gameState.chapterScore += 5;
                    },
                    next: "future_proofing",
                    isSuboptimal: true
                }
            ]
        },

        future_proofing: {
            text: "How do you ensure long-term success of passwordless authentication?",
            choices: [
                {
                    id: "comprehensive_strategy",
                    text: "Develop backup authentication methods and recovery processes",
                    feedback: "Excellent planning for contingencies!",
                    consequence: (gameState) => {
                        gameState.chapter6_choices.push("comprehensive_strategy");
                        gameState.chapterScore += 20;
                    },
                    next: "chapter_end"
                },
                {
                    id: "basic_backup",
                    text: "Rely on IT support for issues",
                    feedback: "Support-heavy approach may not scale.",
                    consequence: (gameState) => {
                        gameState.chapter6_choices.push("basic_backup");
                        gameState.chapterScore += 5;
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
                
                const unlockedAchievements = Object.values(chapter6.achievements)
                    .filter(achievement => achievement.condition(gameState))
                    .map(a => `🏆 ${a.title}: ${a.description}`);

                const achievementsText = unlockedAchievements.length > 0 
                    ? `\n\nAchievements Unlocked:\n${unlockedAchievements.join('\n')}` 
                    : '\n\nNo achievements unlocked this chapter.';
                
                return `Passwordless authentication journey complete.
        
        Chapter Score: ${score}/100
        Total Score: ${totalScore}
        
        ${score >= 90 ? "Outstanding! You've successfully led the transition to modern authentication." : 
          score >= 70 ? "Well done! Passwordless implementation is on track." : 
          "Completed! Consider more thorough planning and user support."}
        
        Final challenges await...${achievementsText}`;
            },
            choices: [
                {
                    id: "next-chapter",
                    text: "Continue to Final Chapter",
                    feedback: "Time for the final security challenge!",
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