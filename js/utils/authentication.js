// Authentication Utilities
const Authentication = {
    // Password validation rules
    PASSWORD_RULES: {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecial: true,
        maxLength: 64
    },

    // Special characters allowed in passwords
    SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',

    // Password strength levels
    STRENGTH_LEVELS: {
        VERY_WEAK: 0,
        WEAK: 1,
        MODERATE: 2,
        STRONG: 3,
        VERY_STRONG: 4
    },

    // Validate password against rules
    validatePassword(password, rules = this.PASSWORD_RULES) {
        const results = {
            valid: true,
            errors: []
        };

        // Check minimum length
        if (password.length < rules.minLength) {
            results.valid = false;
            results.errors.push(`Password must be at least ${rules.minLength} characters long`);
        }

        // Check maximum length
        if (password.length > rules.maxLength) {
            results.valid = false;
            results.errors.push(`Password must be less than ${rules.maxLength} characters`);
        }

        // Check uppercase
        if (rules.requireUppercase && !/[A-Z]/.test(password)) {
            results.valid = false;
            results.errors.push('Password must contain at least one uppercase letter');
        }

        // Check lowercase
        if (rules.requireLowercase && !/[a-z]/.test(password)) {
            results.valid = false;
            results.errors.push('Password must contain at least one lowercase letter');
        }

        // Check numbers
        if (rules.requireNumbers && !/[0-9]/.test(password)) {
            results.valid = false;
            results.errors.push('Password must contain at least one number');
        }

        // Check special characters
        if (rules.requireSpecial && !new RegExp(`[${this.SPECIAL_CHARS}]`).test(password)) {
            results.valid = false;
            results.errors.push('Password must contain at least one special character');
        }

        return results;
    },

    // Calculate password strength
    calculatePasswordStrength(password) {
        let score = 0;
        const results = {
            score: 0,
            strength: '',
            feedback: []
        };

        // Length contribution
        score += Math.min(password.length * 0.5, 10);

        // Character variety contribution
        if (/[A-Z]/.test(password)) score += 2;
        if (/[a-z]/.test(password)) score += 2;
        if (/[0-9]/.test(password)) score += 2;
        if (new RegExp(`[${this.SPECIAL_CHARS}]`).test(password)) score += 3;

        // Variety of characters
        const uniqueChars = new Set(password).size;
        score += Math.min(uniqueChars * 0.5, 5);

        // Determine strength level and feedback
        if (score >= 15) {
            results.strength = 'VERY_STRONG';
            results.feedback.push('Excellent password strength!');
        } else if (score >= 12) {
            results.strength = 'STRONG';
            results.feedback.push('Good password strength.');
        } else if (score >= 8) {
            results.strength = 'MODERATE';
            results.feedback.push('Moderate password strength. Consider adding more variety.');
        } else if (score >= 5) {
            results.strength = 'WEAK';
            results.feedback.push('Weak password. Add length and variety.');
        } else {
            results.strength = 'VERY_WEAK';
            results.feedback.push('Very weak password. Significant improvements needed.');
        }

        results.score = score;
        return results;
    },

    // Generate secure random password
    generatePassword(options = this.PASSWORD_RULES) {
        const charset = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            special: this.SPECIAL_CHARS
        };

        let password = '';
        let allChars = '';

        // Build character set based on options
        if (options.requireUppercase) allChars += charset.uppercase;
        if (options.requireLowercase) allChars += charset.lowercase;
        if (options.requireNumbers) allChars += charset.numbers;
        if (options.requireSpecial) allChars += charset.special;

        // Ensure at least one character from each required set
        if (options.requireUppercase) password += this.getRandomChar(charset.uppercase);
        if (options.requireLowercase) password += this.getRandomChar(charset.lowercase);
        if (options.requireNumbers) password += this.getRandomChar(charset.numbers);
        if (options.requireSpecial) password += this.getRandomChar(charset.special);

        // Fill remaining length with random characters
        while (password.length < options.minLength) {
            password += this.getRandomChar(allChars);
        }

        // Shuffle the password
        return this.shuffleString(password);
    },

    // Helper function to get random character from string
    getRandomChar(str) {
        return str.charAt(Math.floor(Math.random() * str.length));
    },

    // Helper function to shuffle string
    shuffleString(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    },

    // Simulated MFA token generation (for game purposes)
    generateMFAToken() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    },

    // Validate MFA token (for game purposes)
    validateMFAToken(token, expectedToken) {
        return token === expectedToken;
    }
};

// Export the Authentication module
export default Authentication;