const chapter6 = {
    title: "The Future Calls",
    description: "Explore and implement passwordless authentication",

    scenes: [
        // Introduction
        {
            id: "future_intro",
            type: "dialogue",
            text: "Even with SSO, passwords remain a vulnerability. The CTO shares an article about passwordless authentication and asks: 'Could this be our next step forward?'",
            typing: true
        },

        // FIDO2 Learning
        {
            id: "fido2_intro",
            type: "interaction",
            component: "fido2-explainer",
            text: "Learn about FIDO2 and WebAuthn:",
            data: {
                concepts: [
                    {
                        topic: "Public Key Cryptography",
                        explanation: "Instead of shared secrets, uses key pairs for authentication"
                    },
                    {
                        topic: "Biometric Authentication",
                        explanation: "Uses fingerprints or face recognition for local device verification"
                    },
                    {
                        topic: "Security Keys",
                        explanation: "Physical devices that store cryptographic keys"
                    }
                ]
            }
        },

        // Encryption Demo
        {
            id: "encryption_demo",
            type: "interaction",
            component: "encryption-visualizer",
            text: "Demonstrate public/private key encryption:",
            steps: [
                "Generate key pair",
                "Share public key",
                "Encrypt with recipient's public key",
                "Decrypt with private key"
            ]
        },

        // Passkey Setup
        {
            id: "passkey_demo",
            type: "interaction",
            component: "passkey-demo",
            text: "Try setting up a passkey:",
            steps: [
                "Register device",
                "Create biometric signature",
                "Generate cryptographic keys",
                "Test authentication"
            ]
        },

        // Implementation Strategy
        {
            id: "implementation_choice",
            type: "choice",
            text: "How will you implement passwordless authentication?",
            choices: [
                {
                    text: "Start with a pilot program in IT department",
                    consequence: "pilot_program",
                    impact: { risk: -1, adoption: +1 },
                    achievement: "innovation_leader"
                },
                {
                    text: "Full rollout to all employees",
                    consequence: "full_rollout",
                    impact: { risk: +2, adoption: -1 }
                },
                {
                    text: "Offer as an optional alternative to passwords",
                    consequence: "optional_rollout",
                    impact: { risk: 0, adoption: +1 }
                }
            ]
        },

        // Device Management
        {
            id: "device_management",
            type: "interaction",
            component: "device-manager",
            text: "Set up device management policies:",
            options: {
                policies: [
                    "Device registration limits",
                    "Lost device procedures",
                    "Recovery methods",
                    "Multiple device support"
                ]
            }
        },

        // User Education
        {
            id: "user_training",
            type: "interaction",
            component: "training-designer",
            text: "Create passwordless authentication training materials:",
            content: {
                topics: [
                    "Benefits of passwordless login",
                    "Setting up devices",
                    "Recovery procedures",
                    "Security best practices"
                ]
            }
        }
    ],

    onComplete: function() {
        unlockAchievement('ch6_complete', 'Future Visionary');
        gameState.decisions.passwordless = {
            strategy: this.getLastChoice('implementation_choice'),
            devicePolicy: this.getLastChoice('device_management')
        };
    },

    achievements: {
        'innovation_leader': {
            id: 'ch6_innovator',
            title: 'Innovation Leader',
            description: 'Successfully pioneered passwordless authentication'
        }
    }
};

export default chapter6;