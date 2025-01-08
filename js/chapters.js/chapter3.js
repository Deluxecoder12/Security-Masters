const chapter3 = {
    title: "Two Steps Forward",
    description: "Implement MFA across the organization",

    scenes: [
        // Chapter Introduction
        {
            id: "mfa_intro",
            type: "dialogue",
            text: "Management has approved your proposal to implement Multi-Factor Authentication! Now comes the challenge of rolling it out to 200 employees who aren't familiar with MFA.",
            typing: true
        },

        // MFA Learning
        {
            id: "mfa_basics",
            type: "interaction",
            component: "mfa-explainer",
            text: "Review the types of Multi-Factor Authentication:",
            data: {
                factors: [
                    {
                        type: "Something you know",
                        examples: ["Passwords", "PIN codes", "Security questions"],
                        pros: ["Easy to implement", "No additional devices needed"],
                        cons: ["Can be forgotten", "Can be guessed or stolen"]
                    },
                    {
                        type: "Something you have",
                        examples: ["Mobile phone", "Security key", "Smart card"],
                        pros: ["Very secure", "Hard to duplicate"],
                        cons: ["Can be lost", "Additional cost"]
                    },
                    {
                        type: "Something you are",
                        examples: ["Fingerprint", "Face recognition", "Voice pattern"],
                        pros: ["Highly secure", "Can't be forgotten"],
                        cons: ["Privacy concerns", "Hardware requirements"]
                    }
                ]
            }
        },

        // MFA Setup Demo
        {
            id: "mfa_demo",
            type: "interaction",
            component: "authenticator-demo",
            text: "Try setting up an authenticator app:",
            steps: [
                "Scan QR code with authenticator app",
                "Enter the 6-digit code",
                "Confirm backup codes",
                "Enable MFA for account"
            ]
        },

        // Training Material Creation
        {
            id: "create_training",
            type: "choice",
            text: "What approach will you take for employee training?",
            choices: [
                {
                    text: "Create detailed written documentation with screenshots",
                    consequence: "documentation_focused",
                    impact: { understanding: +1, adoption: 0 }
                },
                {
                    text: "Record video tutorials and host live training sessions",
                    consequence: "comprehensive_training",
                    impact: { understanding: +2, adoption: +2 },
                    achievement: "master_trainer"
                },
                {
                    text: "Send a brief email with basic instructions",
                    consequence: "minimal_training",
                    impact: { understanding: -1, adoption: -1 }
                }
            ]
        },

        // Senior Employee Resistance
        {
            id: "executive_resistance",
            type: "dialogue",
            text: "The VP of Sales, James, sends you an angry email: 'I've been using passwords for 20 years without problems. This MFA thing is just making my life difficult. Remove it from my account immediately!'"
        },

        // Handle Resistance
        {
            id: "handle_resistance",
            type: "choice",
            text: "How do you handle the VP's request?",
            choices: [
                {
                    text: "Stand firm on mandatory MFA for all employees, including executives",
                    consequence: "firm_stance",
                    impact: { security: +2, satisfaction: -1 }
                },
                {
                    text: "Schedule a one-on-one session to demonstrate MFA benefits and address concerns",
                    consequence: "diplomatic_approach",
                    impact: { security: +2, satisfaction: +1 },
                    achievement: "executive_whisperer"
                },
                {
                    text: "Create an exception for executive team members",
                    consequence: "security_exception",
                    impact: { security: -2, satisfaction: +1 }
                }
            ]
        },

        // MFA Emergency
        {
            id: "lost_device",
            type: "interaction",
            component: "emergency-response",
            text: "An employee lost their phone with the authenticator app during a business trip. They need urgent access to their account. What's your response?",
            options: {
                verificationMethods: ["Backup codes", "Help desk verification", "Secondary email", "Recovery phone number"],
                securityChecks: ["Identity verification", "Manager approval", "Recent account activity review"]
            }
        },

        // Recovery Process
        {
            id: "recovery_setup",
            type: "interaction",
            component: "recovery-process",
            text: "Design the account recovery process:",
            options: {
                steps: [
                    "Verify identity using backup codes",
                    "Confirm with manager or HR",
                    "Reset MFA on new device",
                    "Generate new backup codes"
                ],
                requirements: [
                    "Must be available 24/7",
                    "Requires strong identity verification",
                    "Needs audit logging",
                    "Should be quick but secure"
                ]
            }
        },

        // Success Metrics
        {
            id: "mfa_metrics",
            type: "interaction",
            component: "security-metrics",
            text: "Review the impact of MFA implementation:",
            data: {
                metrics: [
                    { name: "Account compromises", before: "12/month", after: "0/month" },
                    { name: "Password resets", before: "50/week", after: "10/week" },
                    { name: "Failed login attempts", before: "100/day", after: "20/day" },
                    { name: "Support tickets", before: "75/week", after: "15/week" }
                ]
            }
        },

        // Chapter Conclusion
        {
            id: "chapter_conclusion",
            type: "dialogue",
            text: "With MFA successfully implemented, security has improved significantly. However, you notice employees having to go through MFA multiple times a day for different applications. There must be a way to streamline this...",
            typing: true
        }
    ],

    // Chapter-specific functions
    onComplete: function() {
        unlockAchievement('ch3_complete', 'MFA Champion');
        // Store important decisions for future chapters
        gameState.decisions.mfaImplementation = {
            trainingApproach: this.getLastChoice('create_training'),
            executiveHandling: this.getLastChoice('handle_resistance'),
            recoveryProcess: this.getLastChoice('recovery_setup')
        };
    },

    // Achievement definitions
    achievements: {
        'master_trainer': {
            id: 'ch3_trainer',
            title: 'Master Trainer',
            description: 'Created comprehensive MFA training program'
        },
        'executive_whisperer': {
            id: 'ch3_diplomat',
            title: 'Executive Whisperer',
            description: 'Successfully convinced executives of MFA benefits'
        }
    }
};

// Initialize chapter
function initChapter3() {
    return chapter3;
}

// Export the chapter
export default initChapter3();