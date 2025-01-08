const chapter2 = {
    title: "Growing Pains",
    description: "Handle security challenges as TechStart rapidly expands",

    scenes: [
        // Company Growth Introduction
        {
            id: "growth_intro",
            type: "dialogue",
            text: "Six months have passed. TechStart has grown from 50 to 200 employees! While this is exciting, your inbox is flooded with password reset requests.",
            typing: true
        },

        // IT Ticket Analysis
        {
            id: "password_reset_analysis",
            type: "interaction",
            component: "ticket-analysis",
            text: "Review the IT help desk tickets from the past week:",
            data: {
                tickets: [
                    { id: "T-1023", type: "Password Reset", user: "john.m", department: "Sales", reason: "Forgot password" },
                    { id: "T-1024", type: "Password Reset", user: "sarah.k", department: "Marketing", reason: "Password expired" },
                    { id: "T-1025", type: "Password Reset", user: "mike.p", department: "Engineering", reason: "Account locked" },
                    // More tickets...
                ]
            }
        },

        // Password Pattern Analysis
        {
            id: "pattern_analysis",
            type: "interaction",
            component: "password-patterns",
            text: "Analyze common patterns in compromised passwords:",
            data: {
                patterns: [
                    { pattern: "Company name + year", frequency: "35%" },
                    { pattern: "Seasons + numbers", frequency: "28%" },
                    { pattern: "Simple keyboard patterns", frequency: "22%" },
                    { pattern: "Common words + special chars", frequency: "15%" }
                ]
            }
        },

        // Security Incident
        {
            id: "account_compromise",
            type: "dialogue",
            text: "ALERT: Marketing team lead Lisa's account shows suspicious login activity from an unknown location. Investigation reveals she used the same password as her compromised social media account."
        },

        // Incident Response Choice
        {
            id: "handle_compromise",
            type: "choice",
            text: "How do you respond to this security incident?",
            choices: [
                {
                    text: "Force immediate password reset for all employees and implement stricter password rules",
                    consequence: "strict_response",
                    impact: { security: +2, satisfaction: -2 }
                },
                {
                    text: "Reset Lisa's password, then organize a company-wide security awareness training",
                    consequence: "balanced_response",
                    impact: { security: +1, satisfaction: +1 },
                    achievement: "security_educator"
                },
                {
                    text: "Only reset Lisa's password and send her an email about password safety",
                    consequence: "minimal_response",
                    impact: { security: -1, satisfaction: +1 }
                }
            ]
        },

        // Consequence Scenes
        {
            id: "strict_response",
            type: "dialogue",
            text: "The forced password reset causes frustration among employees. Many resort to writing passwords on sticky notes.",
            condition: "consequence === 'strict_response'"
        },

        {
            id: "balanced_response",
            type: "dialogue",
            text: "The security training is well-received. Employees begin to understand the importance of unique passwords.",
            condition: "consequence === 'balanced_response'"
        },

        {
            id: "minimal_response",
            type: "dialogue",
            text: "A week later, three more accounts are compromised using passwords from the same data breach.",
            condition: "consequence === 'minimal_response'"
        },

        // Problem Analysis
        {
            id: "password_problems",
            type: "interaction",
            component: "problem-analysis",
            text: "Review the key issues with password-only authentication:",
            data: {
                problems: [
                    "Password reuse across multiple accounts",
                    "Complex passwords leading to sticky notes",
                    "High volume of reset requests",
                    "Password sharing between team members",
                    "Difficulty tracking compromised credentials"
                ]
            }
        },

        // Solution Research
        {
            id: "research_solutions",
            type: "choice",
            text: "What solution do you propose to management?",
            choices: [
                {
                    text: "Implement a password manager for all employees",
                    consequence: "partial_solution",
                    feedback: "Good start, but doesn't solve all security issues"
                },
                {
                    text: "Research Multi-Factor Authentication solutions",
                    consequence: "ideal_solution",
                    achievement: "forward_thinker",
                    feedback: "Excellent choice! This will significantly improve security"
                },
                {
                    text: "Create more password complexity rules",
                    consequence: "poor_solution",
                    feedback: "This might make the problem worse"
                }
            ]
        },

        // Chapter Conclusion
        {
            id: "chapter_conclusion",
            type: "dialogue",
            text: "As you document the growing pains of password-only security, you realize that a more robust authentication system is needed. Perhaps it's time to look into multi-factor authentication...",
            typing: true
        }
    ],

    // Chapter-specific functions
    onComplete: function() {
        unlockAchievement('ch2_complete', 'Growth Manager');
        // Store important decisions for future chapters
        gameState.decisions.passwordCrisis = {
            handledCompromise: this.getLastChoice('handle_compromise'),
            proposedSolution: this.getLastChoice('research_solutions')
        };
    },

    // Achievement definitions
    achievements: {
        'security_educator': {
            id: 'ch2_educator',
            title: 'Security Educator',
            description: 'Successfully balanced security needs with user education'
        },
        'forward_thinker': {
            id: 'ch2_forward_thinker',
            title: 'Forward Thinker',
            description: 'Recognized the need for advanced authentication methods'
        }
    }
};

// Initialize chapter
function initChapter2() {
    // Any specific initialization needed for chapter 2
    return chapter2;
}

// Export the chapter
export default initChapter2();