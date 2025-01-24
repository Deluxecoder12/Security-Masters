export const chapter7 = {
    id: "security-masters",
    title: "Security Masters: Final Challenge",
    maxScore: 100,
    totalScenes: 6,

    achievements: {
        master_strategist: {
            id: "master_strategist",
            title: "Master Strategist",
            description: "Developed comprehensive security strategy",
            condition: (gameState) => gameState.chapter7_choices?.includes("comprehensive_strategy")
        },
        incident_master: {
            id: "incident_master",
            title: "Incident Response Master",
            description: "Successfully handled multiple security incidents",
            condition: (gameState) => gameState.chapter7_choices?.includes("coordinated_response")
        },
        security_master: {
            id: "security_master",
            title: "Security Master",
            description: "Achieved perfect score in final security assessment",
            condition: (gameState) => gameState.chapterScore == 100
        }
    },

    initialScenario: {
        text: `From: CEO@techstart.com
Subject: Final Security Assessment

One year has passed. TechStart has grown to 500 employees with a robust authentication system. The board requests a comprehensive security review:

- Authentication system stress test needed
- Multiple security incidents reported
- Strategic planning for future growth
- Final assessment of your leadership

How do you approach this final challenge?`,
        choices: [
            {
                id: "systematic_review",
                text: "Conduct systematic security audit of all systems",
                feedback: "Excellent! Thorough analysis is crucial for comprehensive assessment.",
                consequence: (gameState) => {
                    gameState.chapter7_choices = gameState.chapter7_choices || [];
                    gameState.chapter7_choices.push("systematic_review");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 20;
                },
                next: "incident_response"
            },
            {
                id: "quick_assessment",
                text: "Perform quick system check and focus on recent incidents",
                feedback: "Surface-level review might miss critical vulnerabilities.",
                consequence: (gameState) => {
                    gameState.chapter7_choices = [];
                    gameState.chapter7_choices.push("quick_assessment");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 5;
                },
                next: "incident_response",
                isSuboptimal: true
            }
        ]
    },

    scenes: {
        incident_response: {
            text: "ALERT: Multiple security incidents detected simultaneously:\n- SSO service disruption\n- Suspicious login attempts from unknown IPs\n- Reports of lost employee devices\n- Potential data breach attempt\n\nHow do you handle this crisis?",
            choices: [
                {
                    id: "coordinated_response",
                    text: "Implement coordinated incident response plan with team assignments",
                    feedback: "Perfect! Organized response handles multiple incidents effectively.",
                    consequence: (gameState) => {
                        gameState.chapter7_choices.push("coordinated_response");
                        gameState.chapterScore += 20;
                    },
                    next: "strategic_planning"
                },
                {
                    id: "reactive_response",
                    text: "Address most critical incident first, handle others as possible",
                    feedback: "Sequential handling may allow incidents to escalate.",
                    consequence: (gameState) => {
                        gameState.chapter7_choices.push("reactive_response");
                        gameState.chapterScore += 5;
                    },
                    next: "strategic_planning",
                    isSuboptimal: true
                }
            ]
        },

        strategic_planning: {
            text: "Board requests comprehensive security strategy for next phase of growth. What's your approach?",
            choices: [
                {
                    id: "comprehensive_strategy",
                    text: "Develop integrated strategy covering technology, processes, and user experience",
                    feedback: "Excellent! Holistic approach ensures sustainable security.",
                    consequence: (gameState) => {
                        gameState.chapter7_choices.push("comprehensive_strategy");
                        gameState.chapterScore += 20;
                    },
                    next: "board_presentation"
                },
                {
                    id: "basic_plan",
                    text: "Focus on technical improvements and tools",
                    feedback: "Technical focus alone misses crucial aspects of security.",
                    consequence: (gameState) => {
                        gameState.chapter7_choices.push("basic_plan");
                        gameState.chapterScore += 5;
                    },
                    next: "board_presentation",
                    isSuboptimal: true
                }
            ]
        },

        board_presentation: {
            text: "Time to present your security achievements and future plans to the board. What's your focus?",
            choices: [
                {
                    id: "balanced_presentation",
                    text: "Present balanced view of security improvements, challenges, and roadmap",
                    feedback: "Perfect! Comprehensive presentation builds confidence.",
                    consequence: (gameState) => {
                        gameState.chapter7_choices.push("balanced_presentation");
                        gameState.chapterScore += 20;
                    },
                    next: "final_challenge"
                },
                {
                    id: "metrics_only",
                    text: "Focus on security metrics and statistics",
                    feedback: "Numbers alone don't tell the full security story.",
                    consequence: (gameState) => {
                        gameState.chapter7_choices.push("metrics_only");
                        gameState.chapterScore += 5;
                    },
                    next: "final_challenge",
                    isSuboptimal: true
                }
            ]
        },

        final_challenge: {
            text: "CRITICAL ALERT: Sophisticated attack detected!\n- Credential stuffing against SSO\n- Social engineering attempts reported\n- Multiple device compromise attempts\n\nHow do you respond to this final challenge?",
            choices: [
                {
                    id: "master_response",
                    text: "Execute comprehensive defense strategy using all security layers",
                    feedback: "Outstanding! You've demonstrated true security mastery.",
                    consequence: (gameState) => {
                        gameState.chapter7_choices.push("master_response");
                        gameState.chapterScore += 20;
                    },
                    next: "chapter_end"
                },
                {
                    id: "basic_response",
                    text: "Block attack sources and reset compromised credentials",
                    feedback: "Basic response misses opportunity for complete defense.",
                    consequence: (gameState) => {
                        gameState.chapter7_choices.push("basic_response");
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
                gameState.totalScore = totalScore;
                
                const unlockedAchievements = Object.values(chapter7.achievements)
                    .filter(achievement => achievement.condition(gameState))
                    .map(a => `🏆 ${a.title}: ${a.description}`);

                const achievementsText = unlockedAchievements.length > 0 
                    ? `\n\nAchievements Unlocked:\n${unlockedAchievements.join('\n')}` 
                    : '\n\nNo achievements unlocked this chapter.';
                
                return `Congratulations! You've completed your journey to Security Master!
        
        Chapter Score: ${score}/100
        Final Total Score: ${totalScore}
        
        ${score >= 90 ? "Outstanding! You've demonstrated true mastery of enterprise security." : 
          score >= 70 ? "Well done! You've shown strong security leadership capability." : 
          "Completed! Consider reviewing security fundamentals for improvement."}
        
        Your security expertise will serve TechStart well as new challenges emerge...${achievementsText}`;
            },
            choices: [
                {
                    id: "game-complete",
                    text: "Complete Security Journey",
                    feedback: "Congratulations on becoming a Security Master!",
                    consequence: (gameState) => {
                        gameState.gameComplete = true;
                    },
                    next: "end"
                }
            ]
        }
    }
};