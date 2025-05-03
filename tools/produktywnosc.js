document.addEventListener('DOMContentLoaded', () => {
    // Inicjalizacja trybu (jasny/ciemny)
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('nozertools-theme');
    
    const setTheme = (isDark) => {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('nozertools-theme', isDark ? 'dark' : 'light');
    };

    setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        setTheme(!isDark);
    });

    // Obsługa wyboru aktywności
    const activityButtons = document.querySelectorAll('.activity-btn');
    const calculator = document.getElementById('waste-calculator');
    const activityInputs = document.querySelectorAll('.activity-input');
    const backBtn = document.getElementById('back-btn');
    const newCalculationBtn = document.getElementById('new-calculation');
    let selectedActivity = null;

    activityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const activity = btn.dataset.activity;
            selectedActivity = activity;
            
            // Pokazanie formularza i odpowiedniego pola
            calculator.classList.remove('hidden');
            activityInputs.forEach(input => {
                if (input.dataset.form === activity) {
                    input.classList.remove('hidden');
                    input.querySelector('input').required = true;
                } else {
                    input.classList.add('hidden');
                    input.querySelector('input').required = false;
                }
            });
            
            // Ukrycie wyboru aktywności
            document.querySelector('.activity-selector').style.display = 'none';
        });
    });

    // Powrót do wyboru aktywności
    const resetForm = () => {
        calculator.reset();
        calculator.classList.add('hidden');
        document.querySelector('.activity-selector').style.display = 'block';
        document.getElementById('results').classList.add('hidden');
        selectedActivity = null;
    };

    backBtn.addEventListener('click', resetForm);
    newCalculationBtn.addEventListener('click', resetForm);

    // Kalkulator z nowymi metodami zaokrąglania
    const calculations = {
        LIFE_EXPECTANCY: 80,
        DAYS_IN_YEAR: 365,
        DAYS_IN_WEEK: 7,
        DAYS_IN_MONTH: 30.44,

        calculateDaysRemaining(age) {
            const daysRemaining = (this.LIFE_EXPECTANCY - age) * this.DAYS_IN_YEAR;
            const yearsRemaining = Math.floor(daysRemaining / this.DAYS_IN_YEAR);
            const weeksRemaining = Math.round((daysRemaining % this.DAYS_IN_YEAR) / this.DAYS_IN_WEEK);
            
            return {
                total: daysRemaining,
                formatted: `${yearsRemaining} lat i ${weeksRemaining} tygodni`
            };
        },

        calculateDaily(value, daysRemaining) {
            return value * daysRemaining;
        },

        calculateWeekly(value, daysRemaining) {
            return (value / this.DAYS_IN_WEEK) * daysRemaining;
        },

        calculateMonthly(value, daysRemaining) {
            return (value / this.DAYS_IN_MONTH) * daysRemaining;
        },

        formatTimeResult(hours) {
            const years = Math.floor(hours / 8760);
            const remainingHoursAfterYears = hours % 8760;
            const weeks = Math.floor(remainingHoursAfterYears / 168);
            const days = Math.floor((remainingHoursAfterYears % 168) / 24);

            let result = [];
            if (years > 0) {
                result.push(`${years} ${this.pluralize(years, 'rok', 'lata', 'lat')}`);
            }
            if (weeks > 0) {
                result.push(`${weeks} ${this.pluralize(weeks, 'tydzień', 'tygodnie', 'tygodni')}`);
            }
            if (days > 0 && years === 0) { // pokazuj dni tylko jeśli nie ma lat
                result.push(`${days} ${this.pluralize(days, 'dzień', 'dni', 'dni')}`);
            }

            return result.join(' i ') || '0 dni';
        },

        formatTimeVersions(hours) {
            const minutes = Math.round(hours * 60);
            const days = Math.round(hours / 24);
            const weeks = Math.round(hours / (24 * 7));
            const years = Math.round(hours / (24 * 365));
            
            let versions = [];
            
            // Dokładna wersja w minutach
            versions.push(`${formatter.format(minutes)} minut`);
            
            // Przybliżona wersja w godzinach
            if (hours >= 1) {
                versions.push(`${formatter.format(Math.round(hours))} godzin`);
            }
            
            // Przybliżona wersja w dniach
            if (days >= 1) {
                versions.push(`${formatter.format(days)} dni`);
            }
            
            // Przybliżona wersja w tygodniach
            if (weeks >= 1) {
                versions.push(`${formatter.format(weeks)} tygodni`);
            }
            
            // Przybliżona wersja w latach
            if (years >= 1) {
                versions.push(`${formatter.format(years)} lat`);
            }
            
            return versions;
        },

        formatMoneyResult(amount) {
            const millions = Math.floor(amount / 1000000);
            const thousands = Math.floor((amount % 1000000) / 1000);
            const remainder = Math.floor(amount % 1000);

            let result = [];
            if (millions > 0) {
                result.push(`${millions} ${this.pluralize(millions, 'milion', 'miliony', 'milionów')}`);
            }
            if (thousands > 0) {
                result.push(`${thousands} ${this.pluralize(thousands, 'tysiąc', 'tysiące', 'tysięcy')}`);
            }
            if (remainder > 0 && millions === 0 && thousands === 0) { // pokazuj złotówki tylko jeśli nie ma większych jednostek
                result.push(`${remainder} ${this.pluralize(remainder, 'złoty', 'złote', 'złotych')}`);
            }

            return result.join(' i ') + ' zł';
        },

        formatMoneyVersions(amount) {
            let versions = [];
            
            // Dokładna wersja w złotówkach
            versions.push(`${formatter.format(Math.round(amount))} zł`);
            
            // Przybliżona wersja w tysiącach
            if (amount >= 1000) {
                const thousands = Math.round(amount / 1000);
                versions.push(`${formatter.format(thousands)} tysięcy złotych`);
            }
            
            // Przybliżona wersja w milionach
            if (amount >= 1000000) {
                const millions = (amount / 1000000).toFixed(1);
                versions.push(`${millions} milionów złotych`);
            }
            
            return versions;
        },

        calculateYearsLeft(age) {
            return this.LIFE_EXPECTANCY - age;
        },

        pluralize(number, one, few, many) {
            if (number === 1) return one;
            if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) return few;
            return many;
        }
    };

    // Formatowanie liczb
    const formatter = new Intl.NumberFormat('pl-PL');

    // Animowane pokazywanie wyników
    function showResults(results) {
        const resultsSection = document.getElementById('results');
        const resultsGrid = document.querySelector('.results-grid');
        const daysText = document.querySelector('.life-remaining');
        
        resultsGrid.innerHTML = '';
        daysText.textContent = results.daysText;
        
        resultsSection.classList.remove('hidden');
        setTimeout(() => resultsSection.classList.add('visible'), 100);
        
        // Karta z wynikami
        const card = document.createElement('div');
        card.className = `result-card ${results.type}`;
        
        // Tworzenie HTML dla wszystkich wersji wyniku
        const versionsHTML = results.versions.map((version, index) => `
            ${index > 0 ? '<p class="version-separator">czyli:</p>' : ''}
            <div class="result-version">
                <div class="result-value">${version}</div>
            </div>
        `).join('');
        
        card.innerHTML = `
            <h3>${results.activityName}</h3>
            <div class="versions-container">
                ${versionsHTML}
            </div>
            <div class="result-label">${results.label}</div>
            ${results.warning ? `<div class="result-warning">${results.warning}</div>` : ''}
        `;
        
        resultsGrid.appendChild(card);
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }

    // Obsługa formularza z nowymi formatami wyników
    calculator.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const age = parseInt(formData.get('age'));
        const yearsLeft = calculations.calculateYearsLeft(age);
        const timeLeft = calculations.calculateDaysRemaining(age);
        
        let results = {
            daysText: `W ciągu pozostałych ${yearsLeft} ${calculations.pluralize(yearsLeft, 'roku', 'lat', 'lat')} życia:`
        };

        switch(selectedActivity) {
            case 'tiktok':
                const tiktokMinutes = parseInt(formData.get('tiktok'));
                const tiktokHours = calculations.calculateDaily(tiktokMinutes, timeLeft.total) / 60;
                results = {
                    ...results,
                    activityName: 'TikTok zabierze Ci',
                    type: 'time',
                    versions: calculations.formatTimeVersions(tiktokHours),
                    label: 'zmarnowanego czasu'
                };
                break;

            case 'smoking':
                const smokingCost = parseFloat(formData.get('smoking'));
                const totalSmokingCost = calculations.calculateWeekly(smokingCost, timeLeft.total);
                results = {
                    ...results,
                    activityName: 'Na papierosy wydasz',
                    type: 'money',
                    versions: calculations.formatMoneyVersions(totalSmokingCost),
                    label: 'wydanych pieniędzy',
                    warning: 'Uwaga: wynik zakłada dożycie 80 lat, ale regularne palenie znacząco skraca życie, więc realna kwota będzie mniejsza...'
                };
                break;

            case 'fastfood':
                const fastfoodCost = parseFloat(formData.get('fastfood'));
                const totalFastfoodCost = calculations.calculateMonthly(fastfoodCost, timeLeft.total);
                results = {
                    ...results,
                    activityName: 'Na fast food wydasz',
                    type: 'money',
                    versions: calculations.formatMoneyVersions(totalFastfoodCost),
                    label: 'wydanych pieniędzy',
                    warning: 'Uwaga: wynik zakłada dożycie 80 lat, ale niezdrowe odżywianie może skrócić życie, więc realna kwota będzie mniejsza...'
                };
                break;

            case 'games':
                const gamesMinutes = parseInt(formData.get('games'));
                const gamesHours = calculations.calculateDaily(gamesMinutes, timeLeft.total) / 60;
                results = {
                    ...results,
                    activityName: 'Gry zabiorą Ci',
                    type: 'time',
                    versions: calculations.formatTimeVersions(gamesHours),
                    label: 'zmarnowanego czasu'
                };
                break;
        }
        
        showResults(results);
    });
});