export const chapter5 = {
    id: "integration-challenge",
    title: "The Integration Challenge",
    maxScore: 100,
    totalScenes: 7,

    achievements: {
        sso_architect: {
            id: "sso_architect",
            title: "SSO Architect",
            description: "Successfully designed SSO architecture",
            condition: (gameState) => gameState.chapter5_choices?.includes("comprehensive_design")
        },
        crisis_manager: {
            id: "crisis_manager",
            title: "Crisis Manager",
            description: "Effectively handled SSO outage",
            condition: (gameState) => gameState.chapter5_choices?.includes("structured_response")
        },
        efficiency_expert: {
            id: "efficiency_expert",
            title: "Efficiency Expert",
            description: "Achieved perfect score in SSO planning",
            condition: (gameState) => gameState.chapterScore == 100
        }
    },

    initialScenario: {
        text: `From: CTO@techstart.com
Subject: SSO Implementation Kickoff

SSO vendor selected. Now facing implementation challenges:
- 15 core business applications
- 5 legacy systems with limited authentication options
- Each department has unique access requirements
- 48-hour implementation window

How do you begin the SSO implementation?`,
        choices: [
            {
                id: "comprehensive_design",
                text: "Create detailed implementation plan with application mapping",
                feedback: "Excellent! Planning prevents integration issues.",
                consequence: (gameState) => {
                    gameState.chapter5_choices = gameState.chapter5_choices || [];
                    gameState.chapter5_choices.push("comprehensive_design");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 20;
                },
                next: "legacy_systems"
            },
            {
                id: "quick_start",
                text: "Begin with modern apps and handle legacy systems later",
                feedback: "Partial implementation could create security gaps.",
                consequence: (gameState) => {
                    gameState.chapter5_choices = [];
                    gameState.chapter5_choices.push("quick_start");
                    gameState.chapterScore = (gameState.chapterScore || 0) + 5;
                },
                next: "legacy_systems",
                isSuboptimal: true
            }
        ]
    },

    scenes: {
        legacy_systems: {
            text: "Legacy HR system doesn't support modern authentication. What's your approach?",
            choices: [
                {
                    id: "secure_bridge",
                    text: "Implement secure authentication bridge",
                    feedback: "Smart solution maintaining security and compatibility.",
                    consequence: (gameState) => {
                        gameState.chapter5_choices.push("secure_bridge");
                        gameState.chapterScore += 15;
                    },
                    next: "department_access"
                },
                {
                    id: "exclude_system",
                    text: "Exclude system from SSO implementation",
                    feedback: "Excluding systems creates security inconsistencies.",
                    consequence: (gameState) => {
                        gameState.chapter5_choices.push("exclude_system");
                        gameState.chapterScore += 5;
                    },
                    next: "department_access",
                    isSuboptimal: true
                }
            ]
        },

        department_access: {
            text: "How do you handle varying department access requirements?",
            choices: [
                {
                    id: "role_based",
                    text: "Implement role-based access control with department policies",
                    feedback: "Perfect! RBAC provides flexible, manageable access control.",
                    consequence: (gameState) => {
                        gameState.chapter5_choices.push("role_based");
                        gameState.chapterScore += 15;
                    },
                    next: "deployment_strategy"
                },
                {
                    id: "uniform_access",
                    text: "Apply uniform access policy across departments",
                    feedback: "Uniform policy may not meet specific department needs.",
                    consequence: (gameState) => {
                        gameState.chapter5_choices.push("uniform_access");
                        gameState.chapterScore += 5;
                    },
                    next: "deployment_strategy",
                    isSuboptimal: true
                }
            ]
        },

        deployment_strategy: {
            text: "Implementation window starts in 24 hours. How do you proceed?",
            choices: [
                {
                    id: "phased_deployment",
                    text: "Deploy in phases with rollback plan",
                    feedback: "Safe approach with risk mitigation.",
                    consequence: (gameState) => {
                        gameState.chapter5_choices.push("phased_deployment");
                        gameState.chapterScore += 15;
                    },
                    next: "system_outage"
                },
                {
                    id: "full_deployment",
                    text: "Deploy all systems simultaneously",
                    feedback: "Risky approach without fallback options.",
                    consequence: (gameState) => {
                        gameState.chapter5_choices.push("full_deployment");
                        gameState.chapterScore += 5;
                    },
                    next: "system_outage",
                    isSuboptimal: true
                }
            ]
        },

        system_outage: {
            text: "ALERT: SSO system down. 500+ users cannot access applications. How do you respond?",
            choices: [
                {
                    id: "structured_response",
                    text: "Activate incident response plan and implement fallback authentication",
                    feedback: "Excellent crisis management!",
                    consequence: (gameState) => {
                        gameState.chapter5_choices.push("structured_response");
                        gameState.chapterScore += 15;
                    },
                    next: "postmortem"
                },
                {
                    id: "reactive_response",
                    text: "Reset to pre-SSO authentication immediately",
                    feedback: "Quick but potentially disruptive solution.",
                    consequence: (gameState) => {
                        gameState.chapter5_choices.push("reactive_response");
                        gameState.chapterScore += 5;
                    },
                    next: "postmortem",
                    isSuboptimal: true
                }
            ]
        },

        postmortem: {
            text: "After resolving the outage, what's your next step?",
            choices: [
                {
                    id: "comprehensive_review",
                    text: "Conduct thorough review and update disaster recovery plan",
                    feedback: "Learning from incidents improves future responses.",
                    consequence: (gameState) => {
                        gameState.chapter5_choices.push("comprehensive_review");
                        gameState.chapterScore += 20;
                    },
                    next: "chapter_end"
                },
                {
                    id: "basic_report",
                    text: "File basic incident report and continue deployment",
                    feedback: "Missing opportunity for system improvement.",
                    consequence: (gameState) => {
                        gameState.chapter5_choices.push("basic_report");
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
                
                const unlockedAchievements = Object.values(chapter5.achievements)
                    .filter(achievement => achievement.condition(gameState))
                    .map(a => `🏆 ${a.title}: ${a.description}`);

                const achievementsText = unlockedAchievements.length > 0 
                    ? `\n\nAchievements Unlocked:\n${unlockedAchievements.join('\n')}` 
                    : '\n\nNo achievements unlocked this chapter.';
                
                return `SSO implementation phase complete.
        
        Chapter Score: ${score}/100
        Total Score: ${totalScore}
        
        ${score >= 90 ? "Outstanding! You've mastered enterprise SSO implementation." : 
          score >= 70 ? "Well done! SSO implementation successful with minor issues." : 
          "Completed! Consider more thorough planning and crisis management."}
        
        New authentication challenges await...${achievementsText}`;
            },
            choices: [
                {
                    id: "next-chapter",
                    text: "Continue to Chapter 6",
                    feedback: "Time to explore passwordless authentication!",
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