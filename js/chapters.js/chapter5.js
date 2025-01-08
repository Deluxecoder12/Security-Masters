const chapter5 = {
    title: "The Integration Challenge",
    description: "Tackle complex SSO integration challenges across the organization",

    scenes: [
        // Introduction
        {
            id: "integration_intro",
            type: "dialogue",
            text: "Now that you've selected an SSO solution, it's time to tackle the real challenge: integrating it across different departments and their unique applications. Some legacy systems don't even support modern authentication protocols!",
            typing: true
        },

        // Department Requirements
        {
            id: "dept_requirements",
            type: "interaction",
            component: "requirement-mapper",
            text: "Map department-specific SSO requirements:",
            data: {
                departments: [
                    {
                        name: "Finance",
                        apps: ["Legacy Accounting System", "Modern ERP", "Banking Portal"],
                        requirements: ["Strict access controls", "Audit logging", "Complex approval workflows"]
                    },
                    {
                        name: "Engineering",
                        apps: ["CI/CD Tools", "Cloud Consoles", "Development Environments"],
                        requirements: ["Fast authentication", "CLI support", "API access"]
                    },
                    {
                        name: "Customer Support",
                        apps: ["Ticketing System", "Knowledge Base", "Chat Platform"],
                        requirements: ["Quick user switching", "Shared workstation support", "24/7 availability"]
                    }
                ]
            }
        },

        // OAuth Flow Puzzle
        {
            id: "oauth_puzzle",
            type: "interaction",
            component: "oauth-flow",
            text: "Arrange the OAuth 2.0 flow steps in the correct order:",
            data: {
                steps: [
                    "Client requests authorization",
                    "User authenticates and approves",
                    "Authorization server returns code",
                    "Client exchanges code for token",
                    "Resource server validates token",
                    "Access granted to protected resource"
                ]
            }
        },

        // Legacy System Challenge
        {
            id: "legacy_challenge",
            type: "choice",
            text: "The Finance department's legacy accounting system doesn't support modern authentication. How do you handle it?",
            choices: [
                {
                    text: "Build a custom authentication proxy",
                    consequence: "custom_proxy",
                    impact: { complexity: +2, security: +1 },
                    achievement: "legacy_master"
                },
                {
                    text: "Keep it separate from SSO initially",
                    consequence: "postpone_integration",
                    impact: { complexity: -1, security: 0 }
                },
                {
                    text: "Replace the legacy system",
                    consequence: "system_replacement",
                    impact: { complexity: +1, security: +2 }
                }
            ]
        },

        // SSO Outage
        {
            id: "sso_outage",
            type: "interaction",
            component: "incident-response",
            text: "The SSO service is down! Handle the crisis:",
            data: {
                impactedSystems: ["All cloud applications", "Email", "Development tools"],
                availableActions: [
                    "Activate backup authentication",
                    "Notify all employees",
                    "Contact SSO provider",
                    "Enable emergency access procedures"
                ]
            }
        },

        // Implement Circuit Breaker
        {
            id: "circuit_breaker",
            type: "interaction",
            component: "failover-design",
            text: "Design a failover system for SSO outages:",
            options: {
                methods: [
                    "Local cache of authentication tokens",
                    "Backup authentication server",
                    "Offline access capabilities",
                    "Emergency bypass procedures"
                ]
            }
        }
    ],

    // Chapter completion
    onComplete: function() {
        unlockAchievement('ch5_complete', 'Integration Expert');
        gameState.decisions.ssoIntegration = {
            legacySystem: this.getLastChoice('legacy_challenge'),
            failoverPlan: this.getLastChoice('circuit_breaker')
        };
    },

    achievements: {
        'legacy_master': {
            id: 'ch5_legacy',
            title: 'Legacy Master',
            description: 'Successfully integrated legacy systems with modern SSO'
        }
    }
};

export default chapter5;