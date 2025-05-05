// Rozbudowana pula skinów
const ITEMS = [
    // COMMON
    { name: 'P250 | Valence', icon: 'placeholder.png', minValue: 5, maxValue: 15, rarity: 'common' },
    { name: 'MP9 | Ruby Poison Dart', icon: 'placeholder.png', minValue: 3, maxValue: 10, rarity: 'common' },
    { name: 'Galil AR | Shattered', icon: 'placeholder.png', minValue: 4, maxValue: 12, rarity: 'common' },
    { name: 'Nova | Koi', icon: 'placeholder.png', minValue: 2, maxValue: 8, rarity: 'common' },
    { name: 'Tec-9 | Sandstorm', icon: 'placeholder.png', minValue: 3, maxValue: 11, rarity: 'common' },
    // UNCOMMON
    { name: 'Glock-18 | Water Elemental', icon: 'placeholder.png', minValue: 20, maxValue: 60, rarity: 'uncommon' },
    { name: 'USP-S | Cortex', icon: 'placeholder.png', minValue: 15, maxValue: 40, rarity: 'uncommon' },
    { name: 'MAC-10 | Neon Rider', icon: 'placeholder.png', minValue: 25, maxValue: 70, rarity: 'uncommon' },
    { name: 'Five-SeveN | Monkey Business', icon: 'placeholder.png', minValue: 18, maxValue: 55, rarity: 'uncommon' },
    { name: 'CZ75-Auto | Xiangliu', icon: 'placeholder.png', minValue: 22, maxValue: 65, rarity: 'uncommon' },
    // RARE
    { name: 'FAMAS | Mecha Industries', icon: 'placeholder.png', minValue: 30, maxValue: 80, rarity: 'rare' },
    { name: 'M4A4 | Desolate Space', icon: 'placeholder.png', minValue: 60, maxValue: 180, rarity: 'rare' },
    { name: 'Desert Eagle | Code Red', icon: 'placeholder.png', minValue: 90, maxValue: 220, rarity: 'rare' },
    { name: 'AK-47 | Redline', icon: 'placeholder.png', minValue: 80, maxValue: 200, rarity: 'rare' },
    { name: 'AUG | Stymphalian', icon: 'placeholder.png', minValue: 50, maxValue: 140, rarity: 'rare' },
    // VERY RARE
    { name: 'AWP | Asiimov', icon: 'placeholder.png', minValue: 300, maxValue: 700, rarity: 'very-rare' },
    { name: 'Desert Eagle | Blaze', icon: 'placeholder.png', minValue: 400, maxValue: 1200, rarity: 'very-rare' },
    { name: 'AK-47 | Fire Serpent', icon: 'placeholder.png', minValue: 1200, maxValue: 3500, rarity: 'very-rare' },
    { name: 'M4A4 | Howl', icon: 'placeholder.png', minValue: 2500, maxValue: 8000, rarity: 'very-rare' },
    { name: 'Butterfly Knife | Fade', icon: 'placeholder.png', minValue: 4000, maxValue: 12000, rarity: 'very-rare' }
];

const RARITY = {
    'common':    { color: '#b0b0b0', chance: 0.75 },
    'uncommon':  { color: '#4f8cff', chance: 0.17 },
    'rare':      { color: '#a259ff', chance: 0.07 },
    'very-rare': { color: '#ffd700', chance: 0.01 }
};

const CASE_PRICE = 100;
const HISTORY_LIMIT = 10;

// LocalStorage helpers
function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

function loadData(key, def) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : def;
    } catch (e) {
        console.error('Failed to load from localStorage:', e);
        return def;
    }
}

// Stan gry
let balance = loadData('case_balance', 0);
let history = loadData('case_history', []);
let stats = loadData('case_stats', { spent: 0, totalValue: 0 });

document.addEventListener('DOMContentLoaded', function() {
    // Elementy DOM muszą być pobierane po załadowaniu DOM!
    const balanceEl = document.getElementById('balance');
    const openCaseBtn = document.getElementById('open-case');
    const casePriceEl = document.getElementById('case-price');
    const historyList = document.getElementById('history-list');
    const spentEl = document.getElementById('spent');
    const totalValueEl = document.getElementById('total-value');
    const profitEl = document.getElementById('profit');
    const caseAnimation = document.getElementById('case-animation');
    const setBalanceBtn = document.getElementById('set-balance');
    const setBalanceInput = document.getElementById('set-balance-input');
    const resetProgressBtn = document.getElementById('reset-progress');
    const rewardPanel = document.getElementById('reward-panel');
    const quickAddBtns = document.querySelectorAll('.quick-add');

    // Dźwięki
    const openSound = new Audio('https://raw.githubusercontent.com/SteamDatabase/GameTracking-CSGO/master/csgo/sound/ui/csgo_ui_crate_open.wav');
    const itemSound = new Audio('https://raw.githubusercontent.com/SteamDatabase/GameTracking-CSGO/master/csgo/sound/ui/csgo_ui_crate_item_awarded.wav');
    let isAnimating = false;

    function updateUI() {
        balanceEl.textContent = balance;
        casePriceEl.textContent = CASE_PRICE;
        spentEl.textContent = stats.spent;
        totalValueEl.textContent = stats.totalValue;
        
        const profit = stats.totalValue - stats.spent;
        profitEl.textContent = profit;
        profitEl.className = profit >= 0 ? 'profit' : 'loss';
        
        // Historia
        historyList.innerHTML = '';
        for (let i = 0; i < history.length; i++) {
            const item = history[i];
            const li = document.createElement('li');
            li.className = `rarity-${item.rarity}`;
            li.innerHTML = `
                <img class="item-icon" src="${item.icon}" alt="${item.name}">
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-value">${item.value} ₱</span>
                    <span class="item-float">Float: ${item.float.toFixed(3)}</span>
                    <div class="item-float-bar">
                        <div class="item-float-bar-inner" style="width:${(1-item.float)*100}%"></div>
                        <div class="float-marker" style="left:${item.float*100}%"></div>
                    </div>
                </div>
                <button class="sell-btn" data-index="${i}">Sprzedaj</button>
            `;
            historyList.appendChild(li);
        }

        // Dodajemy event listenery do przycisków sprzedaży
        document.querySelectorAll('.sell-btn').forEach(btn => {
            btn.onclick = (e) => {
                const index = parseInt(e.target.dataset.index);
                if (isNaN(index) || index < 0 || index >= history.length) return;
                
                const item = history[index];
                balance += item.value;
                stats.totalValue -= item.value;
                history.splice(index, 1);
                
                updateUI();
                saveAll();
            };
        });
    }

    function saveAll() {
        saveData('case_balance', balance);
        saveData('case_history', history);
        saveData('case_stats', stats);
    }

    quickAddBtns.forEach(btn => {
        btn.onclick = () => {
            const add = parseInt(btn.dataset.add, 10);
            if (!isNaN(add)) {
                balance += add;
                updateUI();
                saveAll();
            }
        };
    });

    setBalanceBtn.onclick = () => {
        const val = parseInt(setBalanceInput.value, 10);
        if (!isNaN(val) && val >= 0) {
            balance = val;
            updateUI();
            saveAll();
        } else {
            alert('Podaj poprawną wartość salda!');
        }
    };

    resetProgressBtn.onclick = () => {
        if (confirm('Na pewno zresetować cały postęp?')) {
            balance = 0;
            history = [];
            stats = { spent: 0, totalValue: 0 };
            localStorage.removeItem('case_balance');
            localStorage.removeItem('case_history');
            localStorage.removeItem('case_stats');
            updateUI();
            saveAll();
        }
    };

    function showReward(drop) {
        if (!drop || Object.keys(drop).length === 0) {
            rewardPanel.innerHTML = ''; // bezpieczne czyszczenie
            return;
        }

        const defaultIcon = 'https://raw.githubusercontent.com/SteamDatabase/GameTracking-CSGO/master/csgo/pak01_dir/resource/flash/econ/weapons/base_weapons/weapon_';
        const iconUrl = drop.icon.replace('https://wiki.cs.money/', defaultIcon);

        rewardPanel.innerHTML = `
            <div class="reward-skin rarity-${drop.rarity}">
                <img class="item-icon" src="${iconUrl}" alt="${drop.name}" onerror="this.src='https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxH5rd9eDAjcFyv45SRYAFMQkKL_PArgVSL403ulRUXFvaVOe-0vDQGFhLMApTibipJBJx0vHEcDR94N2kk4XFxaOmNrjTxWgH6sN02LnC8Y6n0AXs-UJoNmr6d9CRcA47YgrQrlG_lenpjYj84soGaJkkgw'">
                <div class="item-info">
                    <span class="item-name">${drop.name}</span>
                    <span class="item-value">${drop.value} ₱</span>
                    <span class="item-float">Float: ${drop.float.toFixed(3)}</span>
                    <div class="item-float-bar"><div class="item-float-bar-inner" style="width:${(1-drop.float)*100}%"></div></div>
                </div>
            </div>
        `;
        rewardPanel.classList.add('active');
        setTimeout(() => rewardPanel.classList.remove('active'), 1200);
    }

    openCaseBtn.onclick = () => {
        if (balance < CASE_PRICE || openCaseBtn.disabled || isAnimating) {
            if (isAnimating) return; // Cicha blokada podczas animacji
            alert('Za mało środków!');
            return;
        }
        
        isAnimating = true;
        openCaseBtn.disabled = true;
        quickAddBtns.forEach(b => b.disabled = true);
        setBalanceBtn.disabled = true;
        resetProgressBtn.disabled = true;
        
        balance -= CASE_PRICE;
        stats.spent += CASE_PRICE; // Tylko wydatki na skrzynki są liczone
        showReward({});

        // Odtwórz dźwięk otwierania
        openSound.currentTime = 0;
        openSound.play().catch(() => {}); // Ignoruj błędy dźwięku

        rollCaseAnimation().then(drop => {
            history.unshift(drop);
            if (history.length > HISTORY_LIMIT) history.length = HISTORY_LIMIT;
            stats.totalValue += drop.value;
            
            // Odtwórz dźwięk przedmiotu
            itemSound.currentTime = 0;
            itemSound.play().catch(() => {});
            
            updateUI();
            showReward(drop);
            saveAll();
            
            // Odblokuj interfejs
            openCaseBtn.disabled = false;
            quickAddBtns.forEach(b => b.disabled = false);
            setBalanceBtn.disabled = false;
            resetProgressBtn.disabled = false;
            isAnimating = false;
        });
        updateUI();
        saveAll();
    };

    function getRandomItem() {
        // Losowanie rarity
        const r = Math.random();
        let acc = 0;
        let rarity = 'common';
        for (const [key, val] of Object.entries(RARITY)) {
            acc += val.chance;
            if (r < acc) {
                rarity = key;
                break;
            }
        }
        // Losowanie przedmiotu z tej rarity
        const pool = ITEMS.filter(i => i.rarity === rarity);
        const item = pool[Math.floor(Math.random()*pool.length)];
        // Losowanie wartości i floata
        const float = +(Math.random().toFixed(3));
        const value = Math.round(item.minValue + (item.maxValue-item.minValue)*(1-float));
        return {
            name: item.name,
            icon: item.icon,
            value,
            float,
            rarity
        };
    }

    function rollCaseAnimation() {
        return new Promise(resolve => {
            const ITEM_WIDTH = 120; // stała szerokość elementu
            const ITEM_MARGIN = 20; // całkowity margines (10px z każdej strony)
            const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_MARGIN;
            const ANIMATION_WIDTH = 600; // szerokość kontenera animacji
            const CENTER_POSITION = 290; // pozycja wskaźnika (taka sama jak w CSS)
            
            // Tworzymy listę 30 losowych itemów, ostatni to nasz drop
            const items = [];
            for (let i = 0; i < 27; ++i) items.push(getRandomItem());
            const drop = getRandomItem();
            items.push(drop);
            // Dodajemy 2 dodatkowe itemy za dropem dla efektu nieskończoności
            items.push(getRandomItem());
            items.push(getRandomItem());
            
            // Render animacji
            const list = document.createElement('div');
            list.className = 'case-animation-list';
            for (const it of items) {
                const el = document.createElement('div');
                el.className = `case-animation-item rarity-${it.rarity}`;
                el.innerHTML = `
                    <img class="item-icon" src="${it.icon}" alt="${it.name}">
                    <span class="item-float">${it.float.toFixed(3)}</span>
                    <div class="item-float-bar"><div class="item-float-bar-inner" style="width:${(1-it.float)*100}%"></div></div>
                `;
                list.appendChild(el);
            }
            caseAnimation.innerHTML = '';
            caseAnimation.appendChild(list);

            // Obliczamy dokładną pozycję końcową
            const targetPosition = CENTER_POSITION - (TOTAL_ITEM_WIDTH / 2);
            const totalScroll = (items.length - 2) * TOTAL_ITEM_WIDTH - targetPosition;

            // Animacja
            list.style.transition = 'none';
            list.style.transform = 'translateX(0px)';
            
            requestAnimationFrame(() => {
                list.style.transition = 'transform 4s cubic-bezier(0.15, 0.85, 0.35, 1.0)';
                list.style.transform = `translateX(-${totalScroll}px)`;
            });

            setTimeout(() => resolve(drop), 4100);
        });
    }

    // Inicjalizacja
    updateUI();
});