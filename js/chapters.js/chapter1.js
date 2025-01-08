const chapter1 = {
    title: "Welcome to TechStart!",
    description: "Your journey as an IT Security Admin begins",

    scenes: [
        // Introduction
        {
            id: "intro",
            type: "dialogue",
            text: "Congratulations! You're the new IT Security Admin at TechStart, a growing startup with 50 employees. Your first task is to set up the basic password policy for all company accounts.",
            typing: true
        },
        
        // CEO Meeting
        {
            id: "ceo_meeting",
            type: "dialogue",
            text: "Sarah, the CEO, walks into your office: 'We've been growing fast, and security is becoming a priority. I need you to set up proper password requirements for everyone. Make it secure, but not too complicated - you know how people complain about passwords!'"
        },

        // Initial Task
        {
            id: "password_policy_setup",
            type: "interaction",
            component: "password-policy",
            text: "Configure the password policy for TechStart employees:",
            options: {
                minLength: [8, 10, 12, 14],
                requireSpecial: true,
                requireNumbers: true,
                requireUppercase: true,
                expirationDays: [30, 60, 90]
            },
            validator: function(choices) {
                return {
                    isValid: choices.minLength >= 12 && choices.requireSpecial && choices.requireUppercase,
                    feedback: choices.minLength < 12 ? 
                        "Consider requiring longer passwords for better security." :
                        "Good choice! This provides a strong baseline for password security."
                };
            }
        },

        // First Challenge
        {
            id: "first_complaint",
            type: "dialogue",
            text: "An hour after implementing the policy, you receive an email from Mark in Marketing: 'I can't create a simple password anymore! Why does it need to be so complicated?'"
        },

        // Response Choice
        {
            id: "handle_complaint",
            type: "choice",
            text: "How will you respond to Mark?",
            choices: [
                {
                    text: "Explain the importance of strong passwords and offer to help him create a memorable but secure password",
                    consequence: "positive_response",
                    achievement: "diplomat"
                },
                {
                    text: "Tell him that security is non-negotiable and he needs to follow the policy",
                    consequence: "negative_response"
                },
                {
                    text: "Reduce the password requirements to make it easier",
                    consequence: "weak_security"
                }
            ]
        },

        // Consequence Scenes
        {
            id: "positive_response",
            type: "dialogue",
            text: "You schedule a quick video call with Mark and show him how to create a strong, memorable password using a phrase. He appreciates your help and shares the technique with his team.",
            condition: "consequence === 'positive_response'"
        },
        {
            id: "negative_response",
            type: "dialogue",
            text: "Mark complains to his manager. While your policy stands, you've created some tension with the marketing department.",
            condition: "consequence === 'negative_response'"
        },
        {
            id: "weak_security",
            type: "dialogue",
            text: "You lower the password requirements. A week later, several employees' accounts are compromised in a brute force attack. Time to rethink the strategy...",
            condition: "consequence === 'weak_security'"
        },

        // Security Incident
        {
            id: "suspicious_activity",
            type: "dialogue",
            text: "Alert! The system has detected multiple failed login attempts for several accounts. Someone might be trying to guess passwords."
        },

        // Response to Incident
        {
            id: "incident_response",
            type: "choice",
            text: "How do you respond to the potential breach attempt?",
            choices: [
                {
                    text: "Implement account lockout after 3 failed attempts and notify affected users",
                    consequence: "good_security",
                    achievement: "quick_response"
                },
                {
                    text: "Monitor the situation but take no immediate action",
                    consequence: "poor_security"
                },
                {
                    text: "Immediately reset all passwords in the company",
                    consequence: "overreaction"
                }
            ]
        },

        // Chapter Conclusion
        {
            id: "chapter_conclusion",
            type: "dialogue",
            text: "As your first week ends, you've established basic password security at TechStart. However, you notice that people are writing down their passwords on sticky notes. There must be a better way...",
            typing: true
        }
    ],

    // Chapter-specific functions
    onComplete: function() {
        unlockAchievement('ch1_complete', 'Password Guardian');
        gameState.decisions.passwordPolicy = {
            implemented: true,
            strength: this.scenes[2].lastChoice // Store password policy choices
        };
    },

    // Achievement definitions
    achievements: {
        'diplomat': {
            id: 'ch1_diplomat',
            title: 'Security Diplomat',
            description: 'Successfully balanced security needs with user experience'
        },
        'quick_response': {
            id: 'ch1_incident',
            title: 'Quick Responder',
            description: 'Effectively handled a potential security incident'
        }
    }
};

// Initialize chapter
function initChapter1() {
    // Any specific initialization needed for chapter 1
    return chapter1;
}

// Export the chapter
export default initChapter1();