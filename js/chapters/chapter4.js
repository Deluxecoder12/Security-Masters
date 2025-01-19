const chapter4 = {
    title: "Too Many Apps!",
    description: "Tackle the challenge of multiple cloud services and authentication prompts",

    scenes: [
        // Chapter Introduction
        {
            id: "sso_intro",
            type: "dialogue",
            text: "TechStart is now using dozens of cloud services. Employees are frustrated with logging into multiple apps and getting MFA prompts throughout the day. The VP of Engineering just messaged you: 'We need to simplify this authentication mess!'",
            typing: true
        },

        // Current State Analysis
        {
            id: "app_inventory",
            type: "interaction",
            component: "app-mapper",
            text: "Map out current application usage across departments:",
            data: {
                departments: [
                    {
                        name: "Engineering",
                        apps: ["GitHub", "Jira", "AWS Console", "Slack", "Zoom"]
                    },
                    {
                        name: "Sales",
                        apps: ["Salesforce", "Zoom", "Slack", "Office 365", "DocuSign"]
                    },
                    {
                        name: "Marketing",
                        apps: ["HubSpot", "Canva", "Slack", "Google Workspace", "Zoom"]
                    },
                    {
                        name: "HR",
                        apps: ["Workday", "DocuSign", "Slack", "Office 365", "Zoom"]
                    }
                ]
            }
        },

        // Pain Point Analysis
        {
            id: "authentication_pain_points",
            type: "interaction",
            component: "pain-point-analyzer",
            text: "Review authentication pain points reported by employees:",
            data: {
                painPoints: [
                    {
                        issue: "Multiple login prompts",
                        impact: "15 minutes lost per employee daily",
                        frequency: "Very High"
                    },
                    {
                        issue: "Repeated MFA challenges",
                        impact: "Frustration and workflow disruption",
                        frequency: "High"
                    },
                    {
                        issue: "Password reset across apps",
                        impact: "Increased IT support tickets",
                        frequency: "Medium"
                    },
                    {
                        issue: "Different password policies",
                        impact: "Password fatigue and reuse",
                        frequency: "High"
                    }
                ]
            }
        },

        // SSO Introduction
        {
            id: "sso_learning",
            type: "interaction",
            component: "sso-explainer",
            text: "Research SSO solutions:",
            data: {
                features: [
                    "Single set of credentials for multiple applications",
                    "Centralized authentication management",
                    "Reduced password fatigue",
                    "Improved security monitoring"
                ],
                benefits: [
                    "Improved user experience",
                    "Reduced IT support costs",
                    "Enhanced security control",
                    "Better compliance management"
                ]
            }
        },

        // SSO Provider Selection
        {
            id: "choose_provider",
            type: "choice",
            text: "Which SSO solution approach will you recommend?",
            choices: [
                {
                    text: "Build an internal SSO solution using open-source tools",
                    consequence: "internal_sso",
                    impact: { cost: -1, control: +2, complexity: +2 }
                },
                {
                    text: "Purchase an enterprise SSO solution from a major vendor",
                    consequence: "enterprise_sso",
                    impact: { cost: +2, control: +1, complexity: -1 },
                    achievement: "strategic_planner"
                },
                {
                    text: "Use basic SSO features from existing cloud providers",
                    consequence: "basic_sso",
                    impact: { cost: 0, control: 0, complexity: +1 }
                }
            ]
        },

        // App Integration Planning
        {
            id: "integration_planning",
            type: "interaction",
            component: "sso-mapper",
            text: "Plan the SSO integration for different applications:",
            data: {
                categories: [
                    {
                        type: "SAML-ready",
                        apps: ["Salesforce", "AWS", "Workday"],
                        integration: "Direct"
                    },
                    {
                        type: "OAuth/OIDC",
                        apps: ["GitHub", "Google Workspace"],
                        integration: "Standard"
                    },
                    {
                        type: "Legacy",
                        apps: ["Custom Internal Tools"],
                        integration: "Custom Development"
                    }
                ]
            }
        },

        // Integration Mini-game
        {
            id: "sso_puzzle",
            type: "interaction",
            component: "sso-puzzle",
            text: "Connect applications to the appropriate SSO integration methods:",
            data: {
                apps: ["Salesforce", "GitHub", "Internal HR", "Slack"],
                methods: ["SAML", "OAuth", "Custom", "OIDC"],
                connections: [
                    { app: "Salesforce", method: "SAML" },
                    { app: "GitHub", method: "OAuth" },
                    { app: "Internal HR", method: "Custom" },
                    { app: "Slack", method: "OIDC" }
                ]
            }
        },

        // Implementation Planning
        {
            id: "rollout_planning",
            type: "choice",
            text: "How will you approach the SSO rollout?",
            choices: [
                {
                    text: "Gradual rollout starting with one department",
                    consequence: "gradual_rollout",
                    impact: { risk: -1, adoption: +1 },
                    achievement: "careful_planner"
                },
                {
                    text: "Complete organization-wide implementation",
                    consequence: "full_rollout",
                    impact: { risk: +2, adoption: -1 }
                },
                {
                    text: "Optional opt-in program for departments",
                    consequence: "optional_rollout",
                    impact: { risk: -1, adoption: -2 }
                }
            ]
        },

        // User Experience Demo
        {
            id: "sso_demo",
            type: "interaction",
            component: "sso-flow-demo",
            text: "Preview the new SSO login experience:",
            steps: [
                "Single login page for all applications",
                "One-time MFA verification",
                "Automatic access to connected apps",
                "Session management"
            ]
        },

        // Chapter Conclusion
        {
            id: "chapter_conclusion",
            type: "dialogue",
            text: "The SSO solution looks promising, but implementing it across all applications won't be simple. Some applications don't support standard protocols, and departments have different needs. Time to tackle the integration challenges...",
            typing: true
        }
    ],

    // Chapter-specific functions
    onComplete: function() {
        unlockAchievement('ch4_complete', 'SSO Architect');
        // Store important decisions for future chapters
        gameState.decisions.ssoImplementation = {
            provider: this.getLastChoice('choose_provider'),
            rolloutStrategy: this.getLastChoice('rollout_planning'),
            appIntegrations: this.getLastChoice('integration_planning')
        };
    },

    // Achievement definitions
    achievements: {
        'strategic_planner': {
            id: 'ch4_strategist',
            title: 'Strategic Planner',
            description: 'Chose an optimal SSO solution for enterprise needs'
        },
        'careful_planner': {
            id: 'ch4_careful',
            title: 'Careful Planner',
            description: 'Implemented SSO with minimal disruption'
        }
    }
};

// Initialize chapter
function initChapter4() {
    return chapter4;
}

// Export the chapter
export default initChapter4();