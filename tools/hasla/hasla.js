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
        addNumbers: document.getElementById('addNumbers'),
        leetSpeak: document.getElementById('leetSpeak')
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
    const commonWords = {
        nouns: [
            // Rzeczowniki męskie
            { word: 'dom', gender: 'm' },
            { word: 'kot', gender: 'm' },
            { word: 'pies', gender: 'm' },
            { word: 'rok', gender: 'm' },
            { word: 'dzień', gender: 'm' },
            { word: 'ogień', gender: 'm' },
            { word: 'księżyc', gender: 'm' },
            { word: 'las', gender: 'm' },
            { word: 'ptak', gender: 'm' },
            { word: 'kwiat', gender: 'm' },
            { word: 'stół', gender: 'm' },
            { word: 'telefon', gender: 'm' },
            { word: 'komputer', gender: 'm' },
            { word: 'samochód', gender: 'm' },
            { word: 'rower', gender: 'm' },
            { word: 'wiatr', gender: 'm' },
            { word: 'deszcz', gender: 'm' },
            { word: 'śnieg', gender: 'm' },
            { word: 'grad', gender: 'm' },
            { word: 'mróz', gender: 'm' },
            { word: 'upał', gender: 'm' },
            { word: 'zmrok', gender: 'm' },
            { word: 'świt', gender: 'm' },
            { word: 'zmierzch', gender: 'm' },
            { word: 'brzask', gender: 'm' },
            { word: 'blask', gender: 'm' },
            { word: 'cień', gender: 'm' },
            { word: 'dźwięk', gender: 'm' },
            { word: 'zapach', gender: 'm' },
            { word: 'smak', gender: 'm' },
            { word: 'dotyk', gender: 'm' },
            { word: 'widok', gender: 'm' },
            { word: 'ruch', gender: 'm' },
            { word: 'spokój', gender: 'm' },
            { word: 'hałas', gender: 'm' },
            { word: 'świat', gender: 'm' },
            { word: 'kraj', gender: 'm' },
            { word: 'park', gender: 'm' },
            { word: 'ogród', gender: 'm' },
            { word: 'gaj', gender: 'm' },
            { word: 'lasek', gender: 'm' },
            { word: 'bór', gender: 'm' },
            { word: 'dąb', gender: 'm' },
            { word: 'klon', gender: 'm' },
            { word: 'buk', gender: 'm' },
            
            // Rzeczowniki żeńskie
            { word: 'noc', gender: 'f' },
            { word: 'woda', gender: 'f' },
            { word: 'ziemia', gender: 'f' },
            { word: 'góra', gender: 'f' },
            { word: 'rzeka', gender: 'f' },
            { word: 'ryba', gender: 'f' },
            { word: 'książka', gender: 'f' },
            { word: 'ściana', gender: 'f' },
            { word: 'lampa', gender: 'f' },
            { word: 'gwiazda', gender: 'f' },
            { word: 'chmura', gender: 'f' },
            { word: 'burza', gender: 'f' },
            { word: 'ulewa', gender: 'f' },
            { word: 'mgła', gender: 'f' },
            { word: 'rosa', gender: 'f' },
            { word: 'szadź', gender: 'f' },
            { word: 'zorza', gender: 'f' },
            { word: 'tęcza', gender: 'f' },
            { word: 'łuna', gender: 'f' },
            { word: 'błyskawica', gender: 'f' },
            { word: 'grzybnia', gender: 'f' },
            { word: 'trawa', gender: 'f' },
            { word: 'roślina', gender: 'f' },
            { word: 'gałąź', gender: 'f' },
            { word: 'kora', gender: 'f' },
            { word: 'łodyga', gender: 'f' },
            { word: 'korona', gender: 'f' },
            { word: 'ulica', gender: 'f' },
            { word: 'droga', gender: 'f' },
            { word: 'ścieżka', gender: 'f' },
            { word: 'aleja', gender: 'f' },
            { word: 'plaza', gender: 'f' },
            { word: 'łąka', gender: 'f' },
            { word: 'polana', gender: 'f' },
            { word: 'wyspa', gender: 'f' },
            { word: 'wysepka', gender: 'f' },
            { word: 'zatoka', gender: 'f' },
            { word: 'przystań', gender: 'f' },
            { word: 'brzoza', gender: 'f' },
            { word: 'sosna', gender: 'f' },
            
            // Rzeczowniki nijakie
            { word: 'niebo', gender: 'n' },
            { word: 'słońce', gender: 'n' },
            { word: 'morze', gender: 'n' },
            { word: 'drzewo', gender: 'n' },
            { word: 'pole', gender: 'n' },
            { word: 'jezioro', gender: 'n' },
            { word: 'okno', gender: 'n' },
            { word: 'drzwi', gender: 'n' },
            { word: 'bagno', gender: 'n' },
            { word: 'błoto', gender: 'n' },
            { word: 'piaskowisko', gender: 'n' },
            { word: 'kamienisko', gender: 'n' },
            { word: 'zbocze', gender: 'n' },
            { word: 'wzgórze', gender: 'n' },
            { word: 'wzgórki', gender: 'n' },
            { word: 'ujście', gender: 'n' },
            { word: 'źródło', gender: 'n' },
            { word: 'źródełko', gender: 'n' },
            { word: 'strumyki', gender: 'n' },
            { word: 'potoki', gender: 'n' },
            { word: 'koryto', gender: 'n' },
            { word: 'korytko', gender: 'n' },
            { word: 'miasto', gender: 'n' },
            { word: 'osiedle', gender: 'n' },
            { word: 'podwórko', gender: 'n' },
            { word: 'boisko', gender: 'n' },
            { word: 'parking', gender: 'm' },
            { word: 'skrzyżowanie', gender: 'n' },
            { word: 'rondo', gender: 'n' },
            { word: 'skwer', gender: 'm' }
        ],
        adjectives: {
            m: [
                'duży', 'mały', 'nowy', 'stary', 'czerwony', 'zielony', 'niebieski',
                'wysoki', 'niski', 'szybki', 'wolny', 'mocny', 'słaby', 'głośny',
                'cichy', 'jasny', 'ciemny', 'ciepły', 'zimny', 'gorący', 'chłodny',
                'mokry', 'suchy', 'czysty', 'brudny', 'słodki', 'kwaśny', 'słony',
                'gorzki', 'ostry', 'miękki', 'twardy', 'gładki', 'szorstki', 'gęsty',
                'rzadki', 'ciężki', 'lekki', 'szeroki', 'wąski', 'długi', 'krótki',
                'gruby', 'chudy', 'młody', 'stary', 'świeży', 'zepsuty', 'dobry',
                'zły', 'piękny', 'brzydki', 'mądry', 'głupi', 'bogaty', 'biedny',
                'szczęśliwy', 'smutny', 'wesoły', 'poważny', 'spokojny', 'niespokojny',
                'zdrowy', 'chory', 'żywy', 'martwy', 'prawdziwy', 'fałszywy', 'naturalny',
                'sztuczny', 'zwykły', 'niezwykły', 'normalny', 'dziwny', 'popularny',
                'nieznany', 'ważny', 'nieistotny', 'potrzebny', 'zbędny', 'wolny',
                'zajęty', 'gotowy', 'niegotowy', 'pewny', 'niepewny', 'łatwy', 'trudny'
            ],
            f: [
                'duża', 'mała', 'nowa', 'stara', 'czerwona', 'zielona', 'niebieska',
                'wysoka', 'niska', 'szybka', 'wolna', 'mocna', 'słaba', 'głośna',
                'cicha', 'jasna', 'ciemna', 'ciepła', 'zimna', 'gorąca', 'chłodna',
                'mokra', 'sucha', 'czysta', 'brudna', 'słodka', 'kwaśna', 'słona',
                'gorzka', 'ostra', 'miękka', 'twarda', 'gładka', 'szorstka', 'gęsta',
                'rzadka', 'ciężka', 'lekka', 'szeroka', 'wąska', 'długa', 'krótka',
                'gruba', 'chuda', 'młoda', 'stara', 'świeża', 'zepsuta', 'dobra',
                'zła', 'piękna', 'brzydka', 'mądra', 'głupia', 'bogata', 'biedna',
                'szczęśliwa', 'smutna', 'wesoła', 'poważna', 'spokojna', 'niespokojna',
                'zdrowa', 'chora', 'żywa', 'martwa', 'prawdziwa', 'fałszywa', 'naturalna',
                'sztuczna', 'zwykła', 'niezwykła', 'normalna', 'dziwna', 'popularna',
                'nieznana', 'ważna', 'nieistotna', 'potrzebna', 'zbędna', 'wolna',
                'zajęta', 'gotowa', 'niegotowa', 'pewna', 'niepewna', 'łatwa', 'trudna'
            ],
            n: [
                'duże', 'małe', 'nowe', 'stare', 'czerwone', 'zielone', 'niebieskie',
                'wysokie', 'niskie', 'szybkie', 'wolne', 'mocne', 'słabe', 'głośne',
                'ciche', 'jasne', 'ciemne', 'ciepłe', 'zimne', 'gorące', 'chłodne',
                'mokre', 'suche', 'czyste', 'brudne', 'słodkie', 'kwaśne', 'słone',
                'gorzkie', 'ostre', 'miękkie', 'twarde', 'gładkie', 'szorstkie', 'gęste',
                'rzadkie', 'ciężkie', 'lekkie', 'szerokie', 'wąskie', 'długie', 'krótkie',
                'grube', 'chude', 'młode', 'stare', 'świeże', 'zepsute', 'dobre',
                'złe', 'piękne', 'brzydkie', 'mądre', 'głupie', 'bogate', 'biedne',
                'szczęśliwe', 'smutne', 'wesołe', 'poważne', 'spokojne', 'niespokojne',
                'zdrowe', 'chore', 'żywe', 'martwe', 'prawdziwe', 'fałszywe', 'naturalne',
                'sztuczne', 'zwykłe', 'niezwykłe', 'normalne', 'dziwne', 'popularne',
                'nieznane', 'ważne', 'nieistotne', 'potrzebne', 'zbędne', 'wolne',
                'zajęte', 'gotowe', 'niegotowe', 'pewne', 'niepewne', 'łatwe', 'trudne'
            ]
        }
    };

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

    // Leet Speak mappings
    const leetMappings = {
        'a': ['@'],
        'e': ['3'],
        'i': ['1'],
        'o': ['0'],
        's': ['$']
    };

    // Function to convert text to Leet Speak
    const convertToLeet = (text) => {
        let result = '';
        for (let char of text.toLowerCase()) {
            if (leetMappings[char] && Math.random() < 0.4) { // 40% chance to convert
                result += leetMappings[char][Math.floor(Math.random() * leetMappings[char].length)];
            } else {
                result += char;
            }
        }
        return result;
    };

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
        
        // Aktualizuj maksymalną liczbę słów w zależności od typu hasła
        if (passwordType.value === 'memorable') {
            wordCountSlider.max = 4; // Zmniejszamy maksymalną liczbę słów, bo każde słowo to para przymiotnik-rzeczownik
            if (parseInt(wordCountSlider.value) > 4) {
                wordCountSlider.value = 4;
                wordCountValue.textContent = '4';
            }
        }
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
    const generateWords = (count, addNumbers, capitalized, useLeet) => {
        const words = [];
        // Dla parzystej liczby słów generujemy pary przymiotnik-rzeczownik
        // Dla nieparzystej liczby słów generujemy pary plus jeden rzeczownik na końcu
        const pairs = Math.floor(count / 2);
        const hasExtraNoun = count % 2 === 1;

        // Generujemy pary przymiotnik-rzeczownik
        for (let i = 0; i < pairs; i++) {
            const noun = commonWords.nouns[Math.floor(Math.random() * commonWords.nouns.length)];
            const adjective = commonWords.adjectives[noun.gender][Math.floor(Math.random() * commonWords.adjectives[noun.gender].length)];
            
            let word = `${adjective}-${noun.word}`;
            
            if (capitalized) {
                word = word.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('-');
            }

            if (useLeet) {
                word = word.split('-').map(w => convertToLeet(w)).join('-');
            }

            words.push(word);
        }

        // Jeśli liczba jest nieparzysta, dodajemy jeden rzeczownik
        if (hasExtraNoun) {
            const noun = commonWords.nouns[Math.floor(Math.random() * commonWords.nouns.length)];
            let word = noun.word;
            if (capitalized) {
                word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
            if (useLeet) {
                word = convertToLeet(word);
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
                checkboxes.capitalized.checked,
                checkboxes.leetSpeak.checked
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