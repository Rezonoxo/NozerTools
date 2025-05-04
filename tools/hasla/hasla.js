document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const passwordOutput = document.getElementById('passwordOutput');
    const passwordCheck = document.getElementById('passwordCheck');
    const copyButton = document.getElementById('copyButton');
    const generateButton = document.getElementById('generateButton');
    const lengthSlider = document.getElementById('passwordLength');
    const wordCountSlider = document.getElementById('wordCount');
    const lengthValue = document.getElementById('lengthValue');
    const wordCountValue = document.getElementById('wordCountValue');
    const passwordType = document.getElementById('passwordType');
    const randomOptions = document.getElementById('randomOptions');
    const memorableOptions = document.getElementById('memorableOptions');
    const themeToggle = document.getElementById('themeToggle');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const togglePasswordBtn = document.getElementById('togglePassword');

    const checkboxes = {
        lowercase: document.getElementById('lowercase'),
        uppercase: document.getElementById('uppercase'),
        numbers: document.getElementById('numbers'),
        special: document.getElementById('special'),
        capitalized: document.getElementById('capitalized'),
        addNumbers: document.getElementById('addNumbers')
    };

    // Character sets
    const charSets = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        special: '!@#$%^&*()_+-=[]{}|;:,.<>?',
        easyType: 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    };

    // Common words for memorable passwords (przykładowa lista, można rozszerzyć)
    const commonWords = [
        'dom', 'kot', 'pies', 'rok', 'dzień', 'noc', 'woda', 'ogień',
        'ziemia', 'niebo', 'słońce', 'księżyc', 'góra', 'las', 'morze',
        'rzeka', 'ptak', 'ryba', 'kwiat', 'drzewo', 'książka', 'stół',
        'okno', 'drzwi', 'ściana', 'lampa', 'telefon', 'komputer'
    ];

    // Lista słabych, popularnych haseł
    const commonWeakPasswords = [
        '123456', '123456789', '12345', 'qwerty', 'password', 'admin', 'haslo',
        '11111111', '000000', '123123', '1234567890', 'abc123', 'qwertyuiop',
        'zxcvbnm', '1234567', '12345678', 'hasło', 'administrator', 'root',
        'master', '12345678910', 'polska', 'abcdef', 'dragon', 'baseball',
        'football', 'letmein', 'monkey', 'microsoft', 'welcome', 'test',
        'shadow', 'superman', 'killer', 'soccer', 'hockey', 'batman',
        'passw0rd', 'p@ssw0rd', 'p@ssword', '1qaz2wsx', 'qazwsx'
    ];

    // Wzorce klawiatury QWERTY
    const keyboardPatterns = [
        'qwerty', 'asdfgh', 'zxcvbn', 'qwertz', 'azerty',
        '1234567890', '0987654321', '12344321', '98766789',
        'qweasdzxc', 'poiuytrewq', 'lkjhgfdsa', 'mnbvcxz'
    ];

    // Theme management
    const setTheme = (isDark) => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    themeToggle.checked = localStorage.getItem('theme') === 'dark';
    setTheme(themeToggle.checked);

    themeToggle.addEventListener('change', () => setTheme(themeToggle.checked));

    // Tab management
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.style.display = 'none');
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).style.display = 'block';
        });
    });

    // Password visibility toggle
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordCheck.type === 'password' ? 'text' : 'password';
        passwordCheck.type = type;
        togglePasswordBtn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    // Update displays
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    wordCountSlider.addEventListener('input', () => {
        wordCountValue.textContent = wordCountSlider.value;
    });

    // Password type change handler
    passwordType.addEventListener('change', () => {
        randomOptions.style.display = passwordType.value === 'random' ? 'block' : 'none';
        memorableOptions.style.display = passwordType.value === 'memorable' ? 'block' : 'none';
    });

    // Password strength calculation
    const calculatePasswordStrength = (password) => {
        if (!password) return { score: 0, feedback: [] };

        const feedback = [];
        let score = 0;

        // Length check
        if (password.length < 8) {
            feedback.push('Hasło powinno mieć co najmniej 8 znaków');
        } else {
            score += Math.min(password.length / 8, 2);
        }

        // Check for common weak passwords
        const lowerPassword = password.toLowerCase();
        if (commonWeakPasswords.some(weak => lowerPassword.includes(weak))) {
            score = 0;
            feedback.push('Użyto popularnego, łatwego do odgadnięcia hasła');
        }

        // Check for keyboard patterns
        if (keyboardPatterns.some(pattern => lowerPassword.includes(pattern))) {
            score = Math.max(0, score - 2);
            feedback.push('Unikaj sekwencji klawiszy (np. qwerty)');
        }

        // Check for sequential numbers or letters
        if (/(?:0123|1234|2345|3456|4567|5678|6789|7890)/.test(password)) {
            score = Math.max(0, score - 1);
            feedback.push('Unikaj sekwencji numerycznych (np. 1234)');
        }
        if (/(?:abcd|bcde|cdef|defg|efgh|fghi|ghij|hijk|ijkl|jklm|klmn|lmno|mnop|nopq|opqr|pqrs|qrst|rstu|stuv|tuvw|uvwx|vwxy|wxyz)/i.test(password)) {
            score = Math.max(0, score - 1);
            feedback.push('Unikaj sekwencji alfabetycznych (np. abcd)');
        }

        // Character variety checks
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^a-zA-Z0-9]/.test(password)) score += 1;

        // Complexity feedback
        if (!/[a-z]/.test(password)) feedback.push('Dodaj małe litery');
        if (!/[A-Z]/.test(password)) feedback.push('Dodaj wielkie litery');
        if (!/[0-9]/.test(password)) feedback.push('Dodaj cyfry');
        if (!/[^a-zA-Z0-9]/.test(password)) feedback.push('Dodaj znaki specjalne');

        // Pattern checks
        if (/(.)\1{2,}/.test(password)) {
            score = Math.max(0, score - 1);
            feedback.push('Unikaj powtarzających się znaków');
        }

        if (/^[0-9]+$/.test(password)) {
            score = Math.max(0, score - 1);
            feedback.push('Nie używaj samych cyfr');
        }

        // Check for personal information patterns
        const personalInfoPatterns = [
            /^(19|20)\d{2}$/, // Rok
            /^0[1-9]|[12][0-9]|3[01]$/, // Dzień miesiąca
            /^(styczeń|luty|marzec|kwiecień|maj|czerwiec|lipiec|sierpień|wrzesień|październik|listopad|grudzień)$/i, // Miesiące
            /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/i // Miesiące (skróty)
        ];

        if (personalInfoPatterns.some(pattern => pattern.test(password))) {
            score = Math.max(0, score - 1);
            feedback.push('Unikaj używania dat i innych osobistych informacji');
        }

        // Normalize score to 0-5 range
        score = Math.max(0, Math.min(5, score));

        return {
            score,
            feedback
        };
    };

    // Update strength indicator
    const updateStrengthIndicator = (password, container) => {
        const strengthFill = container.querySelector('.strength-fill');
        const strengthText = container.querySelector('.strength-text');
        const { score, feedback } = calculatePasswordStrength(password);

        strengthFill.className = 'strength-fill';
        if (score >= 4) {
            strengthFill.classList.add('strong');
            strengthText.textContent = 'Silne';
        } else if (score >= 2) {
            strengthFill.classList.add('medium');
            strengthText.textContent = 'Średnie';
        } else {
            strengthFill.classList.add('weak');
            strengthText.textContent = 'Słabe';
        }

        if (container.nextElementSibling?.classList.contains('password-feedback')) {
            const feedbackList = container.nextElementSibling.querySelector('ul');
            feedbackList.innerHTML = feedback.map(item => `<li>${item}</li>`).join('');
        }
    };

    // Generate random words
    const generateWords = (count, addNumbers, capitalized) => {
        const words = [];
        for (let i = 0; i < count; i++) {
            let word = commonWords[Math.floor(Math.random() * commonWords.length)];
            if (capitalized) {
                word = word.charAt(0).toUpperCase() + word.slice(1);
            }
            words.push(word);
        }
        if (addNumbers) {
            words.push(Math.floor(Math.random() * 900 + 100));
        }
        return words.join('-');
    };

    // Generate password
    const generatePassword = () => {
        if (passwordType.value === 'memorable') {
            return generateWords(
                parseInt(wordCountSlider.value),
                checkboxes.addNumbers.checked,
                checkboxes.capitalized.checked
            );
        } else if (passwordType.value === 'easy-type') {
            const length = parseInt(lengthSlider.value);
            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charSets.easyType.length);
                password += charSets.easyType[randomIndex];
            }
            return password;
        } else {
            let charset = '';
            const length = parseInt(lengthSlider.value);

            Object.entries(checkboxes).forEach(([key, checkbox]) => {
                if (checkbox.checked && charSets[key]) {
                    charset += charSets[key];
                }
            });

            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            return password;
        }
    };

    // Validate checkboxes
    const validateCheckboxes = () => {
        if (passwordType.value === 'random') {
            const atLeastOneChecked = Object.entries(checkboxes)
                .filter(([key]) => ['lowercase', 'uppercase', 'numbers', 'special'].includes(key))
                .some(([, checkbox]) => checkbox.checked);
            generateButton.disabled = !atLeastOneChecked;
            return atLeastOneChecked;
        }
        return true;
    };

    // Add checkbox validation listeners
    Object.values(checkboxes).forEach(checkbox => {
        checkbox.addEventListener('change', validateCheckboxes);
    });

    // Generate button click handler
    generateButton.addEventListener('click', () => {
        if (validateCheckboxes()) {
            const password = generatePassword();
            passwordOutput.value = password;
            updateStrengthIndicator(password, passwordOutput.parentElement.nextElementSibling);
        }
    });

    // Copy button click handler
    copyButton.addEventListener('click', async () => {
        if (passwordOutput.value) {
            try {
                await navigator.clipboard.writeText(passwordOutput.value);
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Skopiowano!';
                setTimeout(() => {
                    copyButton.textContent = originalText;
                }, 1500);
            } catch (err) {
                alert('Nie udało się skopiować hasła');
            }
        }
    });

    // Password checker input handler
    passwordCheck.addEventListener('input', () => {
        updateStrengthIndicator(passwordCheck.value, passwordCheck.parentElement.nextElementSibling);
    });

    // Initial validation
    validateCheckboxes();
});