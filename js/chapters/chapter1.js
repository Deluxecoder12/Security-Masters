export const chapter1 = {
    id: "welcome-to-techstart",
    title: "Welcome to TechStart!",
    maxScore: 100,
    totalScenes: 6,

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
            condition: (gameState) => gameState.chapter1_choices?.includes("balanced-policy")
        },
        security_expert: {
            id: "security_expert",
            title: "Road to Security Expert",
            description: "Achieved perfect score in password policy implementation",
            condition: (gameState) => gameState.chapterScore == 100
        }
    },
    
    initialScenario: {
        text: `From: CEO@techstart.com
Subject: Welcome Aboard!

Welcome to TechStart! We've heard great things about you! I'm excited to have you on board as our new IT Security Administrator.

---

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

Based on this data, what type of password policy would you like to create?`;
                } else {
                    return `Quick observations show:
- Most passwords are too simple
- Common patterns are obvious
- Some resistance to sudden change

What type of password policy would you like to create?`;
                }
            },
            choices: [
                {
                    id: "balanced-policy",
                    text: "Create balanced policy (10+ chars, letters + numbers, Change password every 6 months)",
                    feedback: "Good choice! This balances security and usability.",
                    consequence: (gameState) => {
                        gameState.chapter1_choices.push("balanced-policy");
                        gameState.chapterScore += 20;
                        gameState.userResistance = false;
                    },
                    next: "implementation_approach"
                },
                {
                    id: "strict-policy",
                    text: "Create strict policy (16+ chars, letters + numbers, Change password every week)",
                    feedback: "While secure, this might be too aggressive for implementation.",
                    consequence: (gameState) => {
                        gameState.chapter1_choices.push("strict-policy");
                        gameState.chapterScore += 10;
                        gameState.userResistance = true;
                    },
                    next: "implementation_approach",
                    isSuboptimal: true
                }
            ]
        },

        implementation_approach: {
            text: "How would you like to implement the new password policy?",
            choices: [
                {
                    id: "gradual-rollout",
                    text: "Gradual rollout with training sessions",
                    feedback: "Excellent! This helps ensure smooth adoption.",
                    consequence: (gameState) => {
                        gameState.chapter1_choices.push("gradual-rollout");
                        gameState.chapterScore += 20;
                    },
                    next: "handle_complaint"
                },
                {
                    id: "immediate-enforcement",
                    text: "Immediate enforcement starting tomorrow",
                    feedback: "This might cause unnecessary friction.",
                    consequence: (gameState) => {
                        gameState.chapter1_choices.push("immediate-enforcement");
                        gameState.chapterScore += 10;
                        gameState.userResistance = true;
                    },
                    next: "handle_complaint",
                    isSuboptimal: true
                }
            ]
        },

        handle_complaint: {
            text: `From: employee@techstart.com
Subject: Password Problems

These new password requirements are frustrating! Why do we need such complex passwords? 
The old ones worked fine for years.

How would you respond?`,
            choices: [
                {
                    id: "educational-response",
                    text: "Send helpful explanation with password creation tips",
                    feedback: "Perfect! Education helps build security culture.",
                    consequence: (gameState) => {
                        gameState.chapter1_choices.push("educational-response");
                        gameState.chapterScore += 20;
                    },
                    next: "security_incident"
                },
                {
                    id: "strict-response",
                    text: "Remind that policy is mandatory, no exceptions",
                    feedback: "While policy is important, this approach may hurt morale.",
                    consequence: (gameState) => {
                        gameState.chapter1_choices.push("strict-response");
                        gameState.chapterScore += 10;
                        gameState.userResistance = true;
                    },
                    next: "security_incident",
                    isSuboptimal: true
                }
            ]
        },

        security_incident: {
            text: `ALERT: Multiple failed login attempts detected across several accounts.
Time: 2:15 AM
Affected: 5 user accounts
Source: External IP

How would you handle this situation?`,
            choices: [
                {
                    id: "investigate-document",
                    text: "Investigate affected accounts and document incident",
                    feedback: "Good approach! Documentation helps track security patterns.",
                    consequence: (gameState) => {
                        gameState.chapter1_choices.push("investigate-document");
                        gameState.chapterScore += 10;
                    },
                    next: "chapter_end"
                },
                {
                    id: "reset-all",
                    text: "Reset all company passwords immediately",
                    feedback: "This creates unnecessary disruption for unaffected users.",
                    consequence: (gameState) => {
                        gameState.chapter1_choices.push("reset-all");
                        gameState.chapterScore += 5;
                        gameState.userResistance = true;
                    },
                    next: "chapter_end",
                    isSuboptimal: true
                }
            ]
        },

        chapter_end: {
            text: (gameState) => {
                const score = gameState.chapterScore || 0;
                const unlockedAchievements = Object.values(chapter1.achievements)
                    .filter(achievement => achievement.condition(gameState))
                    .map(a => `🏆 ${a.title}: ${a.description}`);

                const achievementsText = unlockedAchievements.length > 0 
                ? `\n\nAchievements Unlocked:\n${unlockedAchievements.join('\n')}` 
                : '\n\nNo achievements unlocked this chapter.';
                
                return `You've completed your first challenge as TechStart's IT Security Administrator.
        
        Final Score: ${score}/100
        
        ${score >= 90 ? "Outstanding! You've demonstrated excellent judgment in balancing security with usability." : 
          score >= 70 ? "Well done! You've successfully implemented basic security measures while maintaining operations." : 
          "Completed! Consider focusing more on balancing security measures with user needs."}
        
        Your security decisions will continue to impact TechStart in future chapters...${achievementsText}`;
            },
            choices: [
                {
                    id: "next-chapter",
                    text: "Continue to Chapter 2",
                    feedback: "TechStart is expanding, and new security challenges await!",
                    consequence: (gameState) => {
                        // Reset state for next chapter
                        gameState.chapterScore = 0;
                        gameState.chapter1_choices = [];
                        // Signal chapter transition
                        gameState.chapterTransition = true;
                    },
                    next: "end"
                }
            ]
        }
    }
};