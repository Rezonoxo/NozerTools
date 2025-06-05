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

    // Stałe do obliczeń
    const LIFE_CONSTANTS = {
        LIFE_EXPECTANCY: 80,
        DAYS_IN_YEAR: 365.2425, // Dokładna liczba dni w roku (uwzględnia lata przestępne)
        DAYS_IN_WEEK: 7,
        DAYS_IN_MONTH: 30.44,
        HOURS_IN_DAY: 24,
        BREATHS_PER_MINUTE: 12,
        WATER_PER_DAY_LITERS: 2.5,
        GLASSES_PER_LITER: 4,
        MOON_CYCLE_DAYS: 29.5,
        FRIDAY_13_PER_YEAR: 1.7,
        HEARTBEATS_PER_MINUTE: 75,
        BLINKS_PER_MINUTE: 15,
        STEPS_PER_DAY: 7500,
        HAIR_GROWTH_PER_DAY_MM: 0.35,
        NAIL_GROWTH_PER_DAY_MM: 0.1,
        SMOKING_LIFE_REDUCTION: 10,
        FASTFOOD_LIFE_REDUCTION: 5,
        SMOKING_COST_PER_PACK: 20,
        CIGARETTES_PER_PACK: 20,
        SMOKING_TIME_PER_CIGARETTE: 5,
        FASTFOOD_CALORIES_PER_MEAL: 800,
        DAILY_CALORIE_NEED: 2000,
        TIKTOK_AVG_VIDEO_LENGTH: 30,
        TIKTOK_ADS_PER_VIDEO: 0.2,
        TIKTOK_AD_LENGTH: 15,
        TIKTOK_ENGAGEMENT_RATE: 0.3,
        TIKTOK_INTERACTION_TIME: 10
    };

    // Kalkulator z nowymi metodami zaokrąglania
    const calculations = {
        calculateAge(birthdate) {
            const today = new Date();
            const birth = new Date(birthdate);
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            
            return age;
        },

        calculateDaysLived(birthdate) {
            const today = new Date();
            const birth = new Date(birthdate);
            const diffTime = Math.abs(today - birth);
            return Math.floor(diffTime / (1000 * 60 * 60 * 24));
        },

        calculateDaysRemaining(birthdate, activity = null) {
            const age = this.calculateAge(birthdate);
            let lifeExpectancy = LIFE_CONSTANTS.LIFE_EXPECTANCY;
            
            if (activity === 'smoking') {
                lifeExpectancy -= LIFE_CONSTANTS.SMOKING_LIFE_REDUCTION;
            } else if (activity === 'fastfood') {
                lifeExpectancy -= LIFE_CONSTANTS.FASTFOOD_LIFE_REDUCTION;
            }
            
            const today = new Date();
            const birth = new Date(birthdate);
            const expectedDeath = new Date(birth);
            expectedDeath.setFullYear(birth.getFullYear() + lifeExpectancy);
            
            const diffTime = Math.abs(expectedDeath - today);
            const daysRemaining = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const yearsRemaining = Math.floor(daysRemaining / LIFE_CONSTANTS.DAYS_IN_YEAR);
            const weeksRemaining = Math.round((daysRemaining % LIFE_CONSTANTS.DAYS_IN_YEAR) / LIFE_CONSTANTS.DAYS_IN_WEEK);
            
            return {
                total: daysRemaining,
                formatted: `${yearsRemaining} lat i ${weeksRemaining} tygodni`,
                lifeExpectancy
            };
        },

        calculateDaily(value, daysRemaining) {
            return value * daysRemaining;
        },

        calculateWeekly(value, daysRemaining) {
            return (value / LIFE_CONSTANTS.DAYS_IN_WEEK) * daysRemaining;
        },

        calculateMonthly(value, daysRemaining) {
            return (value / LIFE_CONSTANTS.DAYS_IN_MONTH) * daysRemaining;
        },

        formatNumber(number) {
            return new Intl.NumberFormat('pl-PL').format(Math.round(number));
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
            if (days > 0 && years === 0) {
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
            
            versions.push(`${this.formatNumber(minutes)} minut`);
            
            if (hours >= 1) {
                versions.push(`${this.formatNumber(Math.round(hours))} godzin`);
            }
            
            if (days >= 1) {
                versions.push(`${this.formatNumber(days)} dni`);
            }
            
            if (weeks >= 1) {
                versions.push(`${this.formatNumber(weeks)} tygodni`);
            }
            
            if (years >= 1) {
                versions.push(`${this.formatNumber(years)} lat`);
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
            if (remainder > 0 && millions === 0 && thousands === 0) {
                result.push(`${remainder} ${this.pluralize(remainder, 'złoty', 'złote', 'złotych')}`);
            }

            return result.join(' i ') + ' zł';
        },

        formatMoneyVersions(amount) {
            let versions = [];
            
            versions.push(`${this.formatNumber(Math.round(amount))} zł`);
            
            if (amount >= 1000) {
                const thousands = Math.round(amount / 1000);
                versions.push(`${this.formatNumber(thousands)} tysięcy złotych`);
            }
            
            if (amount >= 1000000) {
                const millions = (amount / 1000000).toFixed(1);
                versions.push(`${millions} milionów złotych`);
            }
            
            return versions;
        },

        calculateTikTokStats(minutesPerDay, daysRemaining) {
            const videosPerDay = (minutesPerDay * 60) / LIFE_CONSTANTS.TIKTOK_AVG_VIDEO_LENGTH;
            const totalVideos = videosPerDay * daysRemaining;
            const totalAds = totalVideos * LIFE_CONSTANTS.TIKTOK_ADS_PER_VIDEO;
            const totalInteractions = totalVideos * LIFE_CONSTANTS.TIKTOK_ENGAGEMENT_RATE;
            
            return {
                totalVideos: Math.round(totalVideos),
                totalAds: Math.round(totalAds),
                totalInteractions: Math.round(totalInteractions),
                adTime: (totalAds * LIFE_CONSTANTS.TIKTOK_AD_LENGTH) / 60,
                interactionTime: (totalInteractions * LIFE_CONSTANTS.TIKTOK_INTERACTION_TIME) / 60
            };
        },

        calculateSmokingStats(costPerWeek, daysRemaining) {
            const cigarettesPerWeek = (costPerWeek / LIFE_CONSTANTS.SMOKING_COST_PER_PACK) * LIFE_CONSTANTS.CIGARETTES_PER_PACK;
            const totalCigarettes = (cigarettesPerWeek / LIFE_CONSTANTS.DAYS_IN_WEEK) * daysRemaining;
            const smokingTime = (totalCigarettes * LIFE_CONSTANTS.SMOKING_TIME_PER_CIGARETTE) / 60;
            
            return {
                totalCigarettes: Math.round(totalCigarettes),
                smokingTime,
                packsPerWeek: costPerWeek / LIFE_CONSTANTS.SMOKING_COST_PER_PACK
            };
        },

        calculateFastFoodStats(costPerMonth, daysRemaining) {
            const mealsPerMonth = costPerMonth / 30;
            const totalMeals = (mealsPerMonth / LIFE_CONSTANTS.DAYS_IN_MONTH) * daysRemaining;
            const totalCalories = totalMeals * LIFE_CONSTANTS.FASTFOOD_CALORIES_PER_MEAL;
            const dailyCalories = (totalCalories / daysRemaining);
            
            return {
                totalMeals: Math.round(totalMeals),
                totalCalories: Math.round(totalCalories),
                dailyCalories: Math.round(dailyCalories),
                excessCalories: Math.max(0, dailyCalories - LIFE_CONSTANTS.DAILY_CALORIE_NEED)
            };
        },

        pluralize(number, one, few, many) {
            if (number === 1) return one;
            if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) return few;
            return many;
        }
    };

    const ALTERNATIVE_SPENDINGS = {
        // Zdrowie i uroda
        BRACES_FULL: { cost: 12000, name: 'aparat na cały łuk zębowy' },
        BRACES_PARTIAL: { cost: 8000, name: 'aparat na jeden łuk zębowy' },
        LASIK: { cost: 12000, name: 'zabieg laserowej korekcji wzroku' },
        GYM_YEARLY_PREMIUM: { cost: 2400, name: 'roczny karnet na siłownię premium' },
        GYM_YEARLY_STANDARD: { cost: 1800, name: 'roczny karnet na siłownię standard' },
        PERSONAL_TRAINER: { cost: 15000, name: 'roczny trening z osobistym trenerem' },
        SPA_WEEKEND: { cost: 2000, name: 'weekend w spa' },
        
        // Edukacja i rozwój
        LANGUAGE_COURSE_PREMIUM: { cost: 3000, name: 'roczny kurs językowy premium' },
        LANGUAGE_COURSE_STANDARD: { cost: 2000, name: 'roczny kurs językowy standard' },
        DRIVING_LICENSE: { cost: 3500, name: 'prawo jazdy kategorii B' },
        UNIVERSITY_SEMESTER: { cost: 2500, name: 'semestr na studiach' },
        ONLINE_COURSE: { cost: 500, name: 'kurs online' },
        
        // Dom i mieszkanie
        ROOM_RENOVATION_FULL: { cost: 15000, name: 'kompleksowy remont pokoju' },
        ROOM_RENOVATION_BASIC: { cost: 8000, name: 'podstawowy remont pokoju' },
        KITCHEN_RENOVATION_FULL: { cost: 30000, name: 'kompleksowy remont kuchni' },
        KITCHEN_RENOVATION_BASIC: { cost: 15000, name: 'podstawowy remont kuchni' },
        BATHROOM_RENOVATION_FULL: { cost: 25000, name: 'kompleksowy remont łazienki' },
        BATHROOM_RENOVATION_BASIC: { cost: 12000, name: 'podstawowy remont łazienki' },
        NEW_FURNITURE_PREMIUM: { cost: 15000, name: 'komplet mebli premium do pokoju' },
        NEW_FURNITURE_STANDARD: { cost: 10000, name: 'komplet mebli standard do pokoju' },
        
        // Elektronika i technologia
        GAMING_PC_PREMIUM: { cost: 12000, name: 'komputer gamingowy premium (RTX 4070, i7)' },
        GAMING_PC_MID: { cost: 8000, name: 'komputer gamingowy średni (RTX 4060, i5)' },
        GAMING_PC_BUDGET: { cost: 5000, name: 'komputer gamingowy budżetowy (RTX 3050, i3)' },
        SMARTPHONE_PREMIUM: { cost: 5000, name: 'smartfon premium (iPhone 15/ Samsung S24)' },
        SMARTPHONE_MID: { cost: 3000, name: 'smartfon średni (Samsung A54/ Xiaomi 13)' },
        SMARTPHONE_BUDGET: { cost: 1500, name: 'smartfon budżetowy (Xiaomi Redmi/ Samsung A34)' },
        LAPTOP_PREMIUM: { cost: 8000, name: 'laptop premium (MacBook Pro/ Dell XPS)' },
        LAPTOP_MID: { cost: 5000, name: 'laptop średni (Lenovo ThinkPad/ HP Envy)' },
        LAPTOP_BUDGET: { cost: 3000, name: 'laptop budżetowy (Lenovo IdeaPad/ HP Pavilion)' },
        TV_PREMIUM: { cost: 5000, name: 'telewizor premium 55" (Samsung QLED/ LG OLED)' },
        TV_MID: { cost: 3000, name: 'telewizor średni 50" (Samsung/ LG)' },
        TV_BUDGET: { cost: 2000, name: 'telewizor budżetowy 43" (TCL/ Xiaomi)' },
        
        // Transport
        CAR_PREMIUM: { cost: 150000, name: 'nowe auto premium (BMW 3/ Audi A4)' },
        CAR_MID: { cost: 100000, name: 'nowe auto średnie (VW Golf/ Toyota Corolla)' },
        CAR_BUDGET: { cost: 60000, name: 'nowe auto budżetowe (Dacia/ Suzuki)' },
        MOTORCYCLE_PREMIUM: { cost: 50000, name: 'motocykl premium (Kawasaki/ Yamaha)' },
        MOTORCYCLE_MID: { cost: 30000, name: 'motocykl średni (Honda/ Suzuki)' },
        MOTORCYCLE_BUDGET: { cost: 15000, name: 'motocykl budżetowy (Kawasaki/ Yamaha)' },
        E_BIKE_PREMIUM: { cost: 12000, name: 'elektryczny rower premium' },
        E_BIKE_STANDARD: { cost: 8000, name: 'elektryczny rower standard' },
        
        // Nieruchomości
        APARTMENT_PREMIUM: { cost: 800000, name: 'mieszkanie premium w centrum' },
        APARTMENT_STANDARD: { cost: 600000, name: 'mieszkanie standard' },
        APARTMENT_BUDGET: { cost: 400000, name: 'mieszkanie budżetowe' },
        HOUSE_PREMIUM: { cost: 1500000, name: 'dom premium' },
        HOUSE_STANDARD: { cost: 1000000, name: 'dom standard' },
        HOUSE_BUDGET: { cost: 700000, name: 'dom budżetowy' },
        
        // Podróże
        EUROPE_TRIP_PREMIUM: { cost: 8000, name: 'tygodniowa podróż premium po Europie' },
        EUROPE_TRIP_STANDARD: { cost: 5000, name: 'tygodniowa podróż standard po Europie' },
        ASIA_TRIP_PREMIUM: { cost: 15000, name: 'dwutygodniowa podróż premium po Azji' },
        ASIA_TRIP_STANDARD: { cost: 10000, name: 'dwutygodniowa podróż standard po Azji' },
        CRUISE_PREMIUM: { cost: 12000, name: 'rejs wycieczkowy premium' },
        CRUISE_STANDARD: { cost: 8000, name: 'rejs wycieczkowy standard' },
        
        // Rozrywka
        GAMING_CONSOLE_PREMIUM: { cost: 3000, name: 'konsola do gier premium (PS5/ Xbox Series X)' },
        GAMING_CONSOLE_STANDARD: { cost: 2500, name: 'konsola do gier standard (PS5 Digital/ Xbox Series S)' },
        MUSIC_INSTRUMENT_PREMIUM: { cost: 5000, name: 'instrument muzyczny premium' },
        MUSIC_INSTRUMENT_STANDARD: { cost: 3000, name: 'instrument muzyczny standard' },
        CAMERA_PREMIUM: { cost: 8000, name: 'aparatu fotograficzny premium (Canon R6/ Sony A7)' },
        CAMERA_MID: { cost: 5000, name: 'aparatu fotograficzny średni (Canon R50/ Sony A6400)' },
        CAMERA_BUDGET: { cost: 3000, name: 'aparatu fotograficzny budżetowy (Canon R100/ Sony ZV-E10)' },
        
        // Inwestycje
        STOCKS_PREMIUM: { cost: 15000, name: 'inwestycja w akcje premium' },
        STOCKS_STANDARD: { cost: 10000, name: 'inwestycja w akcje standard' },
        CRYPTO_PREMIUM: { cost: 10000, name: 'inwestycja w kryptowaluty premium' },
        CRYPTO_STANDARD: { cost: 5000, name: 'inwestycja w kryptowaluty standard' },
        GOLD_PREMIUM: { cost: 30000, name: 'inwestycja w złoto premium' },
        GOLD_STANDARD: { cost: 20000, name: 'inwestycja w złoto standard' }
    };

    function getAlternativeSpending(amount) {
        let alternatives = [];
        
        // Sprawdzamy wszystkie możliwe alternatywy
        for (const [key, item] of Object.entries(ALTERNATIVE_SPENDINGS)) {
            if (amount >= item.cost) {
                const count = Math.floor(amount / item.cost);
                alternatives.push({
                    text: `${count}x ${item.name}`,
                    value: item.cost * count
                });
            }
        }
        
        // Sortujemy według wartości (koszt * ilość)
        alternatives.sort((a, b) => b.value - a.value);
        
        // Ograniczenie do 5 najlepszych alternatyw
        alternatives = alternatives.slice(0, 5).map(item => item.text);
        
        if (alternatives.length > 0) {
            return `Za te pieniądze mógłbyś kupić: ${alternatives.join(' lub ')}`;
        }
        return null;
    }

    // Animowane pokazywanie wyników
    function showResults(results) {
        const resultsSection = document.getElementById('results');
        const resultsGrid = document.querySelector('.results-grid');
        const daysText = document.querySelector('.life-remaining');
        
        resultsGrid.innerHTML = '';
        
        // Zmiana nagłówka w zależności od wybranej aktywności
        if (selectedActivity === 'life') {
            daysText.textContent = `W ciągu swojego życia:`;
        } else {
            daysText.textContent = results.daysText;
        }
        
        resultsSection.classList.remove('hidden');
        setTimeout(() => resultsSection.classList.add('visible'), 100);
        
        if (results.cards) {
            // Wyświetlanie kart dla kalkulatora życia
            results.cards.forEach(cardData => {
                const card = document.createElement('div');
                card.className = `result-card ${cardData.type}`;
                
                card.innerHTML = `
                    <h3>${cardData.title}</h3>
                    <div class="versions-container">
                        <div class="result-version">
                            <div class="result-value">${cardData.past}</div>
                            <div class="result-label">${cardData.pastLabel}</div>
                        </div>
                        <p class="version-separator">a przed Tobą:</p>
                        <div class="result-version">
                            <div class="result-value">${cardData.future}</div>
                            <div class="result-label">${cardData.label}</div>
                        </div>
                    </div>
                `;
                
                resultsGrid.appendChild(card);
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s, transform 0.5s';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            });
        } else {
            // Wyświetlanie karty dla kalkulatorów marnotrawstwa
            const card = document.createElement('div');
            card.className = `result-card ${results.type}`;
            
            const versionsHTML = results.versions.map((version, index) => `
                ${index > 0 ? '<p class="version-separator">czyli około:</p>' : ''}
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
                ${results.alternatives ? `<div class="result-alternatives">${results.alternatives}</div>` : ''}
                ${results.details ? `<div class="result-details">${results.details}</div>` : ''}
            `;
            
            resultsGrid.appendChild(card);
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s, transform 0.5s';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Obsługa formularza
    calculator.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const birthdate = formData.get('birthdate');
        const timeLeft = calculations.calculateDaysRemaining(birthdate, selectedActivity);
        const daysLived = calculations.calculateDaysLived(birthdate);
        
        let results = {
            daysText: `W ciągu pozostałych ${timeLeft.formatted} życia:`
        };

        switch(selectedActivity) {
            case 'tiktok':
                const tiktokMinutes = parseInt(formData.get('tiktok'));
                const tiktokHours = calculations.calculateDaily(tiktokMinutes, timeLeft.total) / 60;
                const tiktokStats = calculations.calculateTikTokStats(tiktokMinutes, timeLeft.total);
                
                results = {
                    ...results,
                    activityName: 'TikTok zabierze Ci',
                    type: 'time',
                    versions: calculations.formatTimeVersions(tiktokHours),
                    label: 'zmarnowanego czasu',
                    details: `
                        <p>Szczegóły:</p>
                        <ul>
                            <li>Obejrzysz około ${calculations.formatNumber(tiktokStats.totalVideos)} filmików</li>
                            <li>Zobaczysz około ${calculations.formatNumber(tiktokStats.totalAds)} reklam</li>
                            <li>Wykonasz około ${calculations.formatNumber(tiktokStats.totalInteractions)} interakcji</li>
                            <li>Spędzisz ${calculations.formatTimeResult(tiktokStats.adTime / 60)} na oglądaniu reklam</li>
                            <li>Spędzisz ${calculations.formatTimeResult(tiktokStats.interactionTime / 60)} na interakcjach</li>
                        </ul>
                    `
                };
                break;

            case 'smoking':
                const smokingCost = parseFloat(formData.get('smoking'));
                const totalSmokingCost = calculations.calculateWeekly(smokingCost, timeLeft.total);
                const smokingAlternatives = getAlternativeSpending(totalSmokingCost);
                const smokingStats = calculations.calculateSmokingStats(smokingCost, timeLeft.total);
                
                results = {
                    ...results,
                    activityName: 'Na papierosy wydasz',
                    type: 'money',
                    versions: calculations.formatMoneyVersions(totalSmokingCost),
                    label: 'wydanych pieniędzy',
                    warning: `Uwaga: wynik zakłada dożycie ${timeLeft.lifeExpectancy} lat, ale regularne palenie znacząco skraca życie, więc realna kwota będzie mniejsza...`,
                    alternatives: smokingAlternatives,
                    details: `
                        <p>Szczegóły:</p>
                        <ul>
                            <li>Wypalisz około ${calculations.formatNumber(smokingStats.totalCigarettes)} papierosów</li>
                            <li>Spędzisz ${calculations.formatTimeResult(smokingStats.smokingTime)} na paleniu</li>
                            <li>Kupisz około ${calculations.formatNumber(smokingStats.packsPerWeek)} paczek tygodniowo</li>
                            <li>Twoje życie może skrócić się o ${LIFE_CONSTANTS.SMOKING_LIFE_REDUCTION} lat</li>
                        </ul>
                    `
                };
                break;

            case 'fastfood':
                const fastfoodCost = parseFloat(formData.get('fastfood'));
                const totalFastfoodCost = calculations.calculateMonthly(fastfoodCost, timeLeft.total);
                const fastfoodAlternatives = getAlternativeSpending(totalFastfoodCost);
                const fastfoodStats = calculations.calculateFastFoodStats(fastfoodCost, timeLeft.total);
                
                results = {
                    ...results,
                    activityName: 'Na fast food wydasz',
                    type: 'money',
                    versions: calculations.formatMoneyVersions(totalFastfoodCost),
                    label: 'wydanych pieniędzy',
                    warning: `Uwaga: wynik zakłada dożycie ${timeLeft.lifeExpectancy} lat, ale niezdrowe odżywianie może skrócić życie, więc realna kwota będzie mniejsza...`,
                    alternatives: fastfoodAlternatives,
                    details: `
                        <p>Szczegóły:</p>
                        <ul>
                            <li>Zjesz około ${calculations.formatNumber(fastfoodStats.totalMeals)} posiłków</li>
                            <li>Przyjmiesz około ${calculations.formatNumber(fastfoodStats.totalCalories)} kalorii</li>
                            <li>Dziennie przyjmiesz średnio ${calculations.formatNumber(fastfoodStats.dailyCalories)} kalorii</li>
                            <li>Dziennie przekroczysz zapotrzebowanie o ${calculations.formatNumber(fastfoodStats.excessCalories)} kalorii</li>
                            <li>Twoje życie może skrócić się o ${LIFE_CONSTANTS.FASTFOOD_LIFE_REDUCTION} lat</li>
                        </ul>
                    `
                };
                break;

            case 'life':
                const sleepHours = parseFloat(formData.get('sleep'));
                const age = calculations.calculateAge(birthdate);
                results = {
                    ...results,
                    cards: [
                        {
                            title: 'Sen',
                            type: 'time',
                            past: calculations.formatTimeResult(sleepHours * daysLived),
                            future: calculations.formatTimeResult(sleepHours * timeLeft.total),
                            pastLabel: 'przespałeś/aś już',
                            label: 'prześpisz'
                        },
                        {
                            title: 'Woda',
                            type: 'life',
                            past: `${calculations.formatNumber(daysLived * LIFE_CONSTANTS.WATER_PER_DAY_LITERS * LIFE_CONSTANTS.GLASSES_PER_LITER)} szklanek`,
                            future: `${calculations.formatNumber(timeLeft.total * LIFE_CONSTANTS.WATER_PER_DAY_LITERS * LIFE_CONSTANTS.GLASSES_PER_LITER)} szklanek`,
                            pastLabel: 'wypiłeś/aś już',
                            label: 'wypijesz'
                        },
                        {
                            title: 'Oddechy',
                            type: 'life',
                            past: `${calculations.formatNumber(daysLived * LIFE_CONSTANTS.HOURS_IN_DAY * 60 * LIFE_CONSTANTS.BREATHS_PER_MINUTE)} oddechów`,
                            future: `${calculations.formatNumber(timeLeft.total * LIFE_CONSTANTS.HOURS_IN_DAY * 60 * LIFE_CONSTANTS.BREATHS_PER_MINUTE)} oddechów`,
                            pastLabel: 'wykonałeś/aś już',
                            label: 'wykonasz'
                        },
                        {
                            title: 'Wiosny',
                            type: 'life',
                            past: `${age} wiosen`,
                            future: `${timeLeft.lifeExpectancy - age} wiosen`,
                            pastLabel: 'przeżyłeś/aś już',
                            label: 'zobaczysz'
                        },
                        {
                            title: 'Pełnie Księżyca',
                            type: 'life',
                            past: `${calculations.formatNumber(daysLived / LIFE_CONSTANTS.MOON_CYCLE_DAYS)} pełni`,
                            future: `${calculations.formatNumber(timeLeft.total / LIFE_CONSTANTS.MOON_CYCLE_DAYS)} pełni`,
                            pastLabel: 'zobaczyłeś/aś już',
                            label: 'zobaczysz'
                        },
                        {
                            title: 'Piątki 13',
                            type: 'life',
                            past: `${calculations.formatNumber(age * LIFE_CONSTANTS.FRIDAY_13_PER_YEAR)} piątków`,
                            future: `${calculations.formatNumber((timeLeft.lifeExpectancy - age) * LIFE_CONSTANTS.FRIDAY_13_PER_YEAR)} piątków`,
                            pastLabel: 'przeżyłeś/aś już',
                            label: 'przeżyjesz'
                        },
                        {
                            title: 'Bicie Serca',
                            type: 'life',
                            past: `${calculations.formatNumber(daysLived * LIFE_CONSTANTS.HOURS_IN_DAY * 60 * LIFE_CONSTANTS.HEARTBEATS_PER_MINUTE)} uderzeń`,
                            future: `${calculations.formatNumber(timeLeft.total * LIFE_CONSTANTS.HOURS_IN_DAY * 60 * LIFE_CONSTANTS.HEARTBEATS_PER_MINUTE)} uderzeń`,
                            pastLabel: 'wykonało już',
                            label: 'wykonasz'
                        },
                        {
                            title: 'Mruganie',
                            type: 'life',
                            past: `${calculations.formatNumber(daysLived * LIFE_CONSTANTS.HOURS_IN_DAY * 60 * LIFE_CONSTANTS.BLINKS_PER_MINUTE)} mrugnięć`,
                            future: `${calculations.formatNumber(timeLeft.total * LIFE_CONSTANTS.HOURS_IN_DAY * 60 * LIFE_CONSTANTS.BLINKS_PER_MINUTE)} mrugnięć`,
                            pastLabel: 'wykonałeś/aś już',
                            label: 'wykonasz'
                        },
                        {
                            title: 'Kroki',
                            type: 'life',
                            past: `${calculations.formatNumber(daysLived * LIFE_CONSTANTS.STEPS_PER_DAY)} kroków`,
                            future: `${calculations.formatNumber(timeLeft.total * LIFE_CONSTANTS.STEPS_PER_DAY)} kroków`,
                            pastLabel: 'zrobiłeś/aś już',
                            label: 'zrobisz'
                        },
                        {
                            title: 'Wzrost Włosów',
                            type: 'life',
                            past: `${calculations.formatNumber(daysLived * LIFE_CONSTANTS.HAIR_GROWTH_PER_DAY_MM)} mm`,
                            future: `${calculations.formatNumber(timeLeft.total * LIFE_CONSTANTS.HAIR_GROWTH_PER_DAY_MM)} mm`,
                            pastLabel: 'urosły Ci już',
                            label: 'urosną Ci włosy'
                        },
                        {
                            title: 'Wzrost Paznokci',
                            type: 'life',
                            past: `${calculations.formatNumber(daysLived * LIFE_CONSTANTS.NAIL_GROWTH_PER_DAY_MM)} mm`,
                            future: `${calculations.formatNumber(timeLeft.total * LIFE_CONSTANTS.NAIL_GROWTH_PER_DAY_MM)} mm`,
                            pastLabel: 'urosły Ci już',
                            label: 'urosną Ci paznokcie'
                        }
                    ]
                };
                break;
        }
        
        showResults(results);
    });
});