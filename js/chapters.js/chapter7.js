const chapter7 = {
    title: "Security Masters",
    description: "Face the final challenge and prove your security expertise",

    scenes: [
        // Introduction
        {
            id: "final_intro",
            type: "dialogue",
            text: "One year has passed. TechStart has grown to 500 employees, and you've built a robust authentication system. Now, the board wants a comprehensive security review and stress test of all systems.",
            typing: true
        },

        // Security Audit
        {
            id: "security_audit",
            type: "interaction",
            component: "security-audit",
            text: "Conduct a security audit of authentication systems:",
            data: {
                systems: [
                    {
                        name: "Password Policies",
                        status: "Active for legacy systems",
                        strengths: ["Strong complexity requirements", "Regular rotation"],
                        vulnerabilities: ["Password reuse risk", "User frustration"]
                    },
                    {
                        name: "MFA Implementation",
                        status: "Company-wide",
                        strengths: ["Improved security", "Multiple options"],
                        vulnerabilities: ["Recovery process complexity"]
                    },
                    {
                        name: "SSO Integration",
                        status: "90% coverage",
                        strengths: ["Centralized control", "User convenience"],
                        vulnerabilities: ["Single point of failure"]
                    },
                    {
                        name: "Passwordless Authentication",
                        status: "Pilot phase",
                        strengths: ["Enhanced security", "User friendly"],
                        vulnerabilities: ["Device dependency"]
                    }
                ]
            }
        },

        // Incident Response
        {
            id: "security_incident",
            type: "interaction",
            component: "incident-simulator",
            text: "Handle multiple security incidents simultaneously:",
            scenarios: [
                "SSO service disruption",
                "Suspicious login attempts",
                "Lost employee device",
                "Potential data breach"
            ]
        },

        // Strategy Development
        {
            id: "strategic_planning",
            type: "interaction",
            component: "strategy-builder",
            text: "Develop a comprehensive authentication strategy:",
            elements: [
                "Risk assessment",
                "Technology roadmap",
                "User experience considerations",
                "Compliance requirements"
            ]
        },

        // Board Presentation
        {
            id: "board_presentation",
            type: "choice",
            text: "Present your security achievements and future plans to the board. What will you emphasize?",
            choices: [
                {
                    text: "Focus on security improvements and risk reduction",
                    consequence: "security_focus",
                    impact: { board_confidence: +1, budget: +1 }
                },
                {
                    text: "Highlight user experience and productivity gains",
                    consequence: "ux_focus",
                    impact: { board_confidence: +1, user_satisfaction: +1 }
                },
                {
                    text: "Present comprehensive data and future roadmap",
                    consequence: "strategic_focus",
                    impact: { board_confidence: +2, budget: +2 },
                    achievement: "master_strategist"
                }
            ]
        },

        // Final Challenge
        {
            id: "final_challenge",
            type: "interaction",
            component: "security-simulator",
            text: "Simulate and respond to a sophisticated attack attempt:",
            scenario: {
                phases: [
                    "Credential stuffing attack",
                    "SSO bypass attempt",
                    "Social engineering attack",
                    "Device compromise attempt"
                ],
                tools: [
                    "Authentication logs",
                    "Security controls",
                    "Incident response procedures",
                    "Communication templates"
                ]
            }
        },

        // Graduation
        {
            id: "graduation",
            type: "dialogue",
            text: "Congratulations! You've successfully built and defended a robust authentication system. You are now a true Security Master!",
            typing: true
        }
    ],

    onComplete: function() {
        unlockAchievement('ch7_complete', 'Security Master');
        gameState.decisions.finalChallenge = {
            boardPresentation: this.getLastChoice('board_presentation'),
            incidentResponse: this.getLastChoice('final_challenge')
        };
    },

    achievements: {
        'master_strategist': {
            id: 'ch7_master',
            title: 'Master Security Strategist',
            description: 'Successfully balanced security, usability, and business needs'
        },
        'security_master': {
            id: 'ch7_graduate',
            title: 'Security Master',
            description: 'Completed all authentication security challenges'
        }
    }
};

export default chapter7;