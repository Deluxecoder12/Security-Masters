export const chapter2 = {
    id: "growing-pains",
    title: "Growing Pains: Password Problems",
    maxScore: 100,
    totalScenes: 8,

    achievements: {
        security_educator: {
            id: "security_educator",
            title: "Security Educator",
            description: "Implemented effective security training",
            condition: (gameState) => gameState.chapter2_choices?.includes("balanced_response")
        },
        forward_thinker: {
            id: "forward_thinker",
            title: "Forward Thinker",
            description: "Proposed advanced authentication solutions",
            condition: (gameState) => gameState.chapter2_choices?.includes("ideal_solution")
        },
        security_expert: {
            id: "security_expert",
            title: "Road to Security Expert",
            description: "Achieved perfect score in password policy implementation",
            condition: (gameState) => gameState.chapterScore == 100
        }
    },
    
    initialScenario: {
        text: `Six months have passed. TechStart has grown from 50 to 200 employees! While this is exciting, your inbox is flooded with password reset requests.

What's your first step?`,
        
        choices: [
            {
                id: "analyze_tickets",
                text: "Review IT help desk password reset tickets",
                feedback: "Smart approach to understanding the root problem.",
                consequence: (gameState) => {
                    gameState.chapter2_choices = gameState.chapter2_choices || [];
                    gameState.chapter2_choices.push("analyze_tickets");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 15;
                },
                next: "password_reset_analysis"
            },
            {
                id: "immediate_action",
                text: "Implement immediate password policy changes",
                feedback: "Quick action might miss underlying issues.",
                consequence: (gameState) => {
                    gameState.chapter2_choices.push("immediate_action");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 5;
                    gameState.userResistance = true;
                },
                next: "password_reset_analysis",
                isSuboptimal: true
            }
        ]
    },

    scenes: {
        password_reset_analysis: {
            text: "Review the IT help desk tickets from the past week. What patterns do you notice?",
            choices: [
                {
                    id: "pattern_investigation",
                    text: "Investigate password reset patterns",
                    feedback: "Good approach to understanding systemic issues.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("pattern_investigation");
                        gameState.chapterScore += 10;
                    },
                    next: "pattern_analysis"
                },
                {
                    id: "ignore_patterns",
                    text: "Dismiss ticket analysis as trivial",
                    feedback: "Overlooking these details can lead to bigger problems.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("ignore_patterns");
                        gameState.chapterScore += 5;
                        gameState.userResistance = true;
                    },
                    next: "pattern_analysis",
                    isSuboptimal: true
                }
            ]
        },

        pattern_analysis: {
            text: "Analysis reveals common password patterns. How will you address these risks?",
            choices: [
                {
                    id: "comprehensive_training",
                    text: "Develop comprehensive security awareness training",
                    feedback: "Education is key to improving security culture.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("comprehensive_training");
                        gameState.chapterScore += 10;
                    },
                    next: "account_compromise"
                },
                {
                    id: "technical_solution",
                    text: "Focus on technical password restrictions",
                    feedback: "Technical solutions alone may not solve behavioral issues.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("technical_solution");
                        gameState.chapterScore += 5;
                        gameState.userResistance = true;
                    },
                    next: "account_compromise",
                    isSuboptimal: true
                }
            ]
        },

        account_compromise: {
            text: "ALERT: Marketing team lead Lisa's account shows suspicious login activity from an unknown location. Investigation reveals password reuse from a compromised social media account.",
            choices: [
                {
                    id: "balanced_response",
                    text: "Reset Lisa's password and organize company-wide security training",
                    feedback: "Balanced approach addressing both immediate and long-term security.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("balanced_response");
                        gameState.chapterScore += 15;
                    },
                    next: "password_problems"
                },
                {
                    id: "strict_response",
                    text: "Force immediate password reset for all employees",
                    feedback: "Strict approach may create user frustration.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("strict_response");
                        gameState.chapterScore += 10;
                        gameState.userResistance = true;
                    },
                    next: "password_problems",
                    isSuboptimal: true
                }
            ]
        },

        password_problems: {
            text: "Review the key issues with password-only authentication. What's the most critical problem?",
            choices: [
                {
                    id: "root_cause_analysis",
                    text: "Conduct in-depth root cause analysis of authentication vulnerabilities",
                    feedback: "Thorough investigation reveals systemic security weaknesses.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("root_cause_analysis");
                        gameState.chapterScore += 10;
                    },
                    next: "employee_feedback"
                },
                {
                    id: "surface_fix",
                    text: "Apply quick surface-level fixes to authentication process",
                    feedback: "Superficial solutions rarely address fundamental security issues.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("surface_fix");
                        gameState.chapterScore += 5;
                        gameState.userResistance = true;
                    },
                    next: "employee_feedback",
                    isSuboptimal: true
                }
            ]
        },
        
        employee_feedback: {
            text: "Employees have mixed feelings about recent security changes. How will you address their concerns?",
            choices: [
                {
                    id: "open_dialogue",
                    text: "Hold meeting to explain security rationale",
                    feedback: "Transparent communication builds trust and understanding.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("open_dialogue");
                        gameState.chapterScore += 10;
                    },
                    next: "research_solutions"
                },
                {
                    id: "ignore_feedback",
                    text: "Dismiss employee concerns and maintain strict policy",
                    feedback: "Ignoring user perspectives can lead to resistance and security circumvention.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("ignore_feedback");
                        gameState.chapterScore += 0;
                        gameState.userResistance = true;
                    },
                    next: "research_solutions",
                    isSuboptimal: true
                }
            ]
        },

        research_solutions: {
            text: "What solution do you propose to management to address authentication challenges?",
            choices: [
                {
                    id: "ideal_solution",
                    text: "Research Multi-Factor Authentication solutions",
                    feedback: "Excellent choice! This will significantly improve security.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("ideal_solution");
                        gameState.chapterScore += 30;
                    },
                    next: "chapter_end"
                },
                {
                    id: "partial_solution",
                    text: "Implement a password manager for all employees",
                    feedback: "Good start, but doesn't solve all security issues.",
                    consequence: (gameState) => {
                        gameState.chapter2_choices.push("partial_solution");
                        gameState.chapterScore += 20;
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

                const unlockedAchievements = Object.values(chapter2.achievements)
                    .filter(achievement => achievement.condition(gameState))
                    .map(a => `🏆 ${a.title}: ${a.description}`);

                const achievementsText = unlockedAchievements.length > 0 
                ? `\n\nAchievements Unlocked:\n${unlockedAchievements.join('\n')}` 
                : '\n\nNo achievements unlocked this chapter.';
                
                return `You've navigated TechStart through complex authentication challenges.
        
        Chapter Score: ${score}/100
        Total Score: ${totalScore}
        
        ${score >= 90 ? "Outstanding! You've demonstrated strategic approach to security management." : 
          score >= 70 ? "Well done! You've made significant improvements to authentication security." : 
          "Completed! More focus needed on comprehensive security strategies."}
        
        Your decisions continue to shape TechStart's security landscape...${achievementsText}`;
            },
            choices: [
                {
                    id: "next-chapter",
                    text: "Continue to Chapter 3",
                    feedback: "Chapter 2 complete!",
                    consequence: (gameState) => {
                        // Reset state for next chapter
                        gameState.chapterScore = 0;
                        // Signal chapter transition
                        gameState.chapterTransition = true;
                    },
                    next: "end"
                }
            ]
        }
    }
};