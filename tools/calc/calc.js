document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('.btn');
    const backButton = document.getElementById('back-to-home');
    const historyList = document.querySelector('.history-list');
    const clearHistoryBtn = document.getElementById('clear-history');

    let currentExpression = '';
    let shouldResetScreen = false;
    let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

    // Back to home functionality
    backButton.addEventListener('click', () => {
        window.location.href = '../../index.html';
    });

    // Update history display
    function updateHistoryDisplay() {
        historyList.innerHTML = '';
        history.slice().reverse().forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <span class="history-expression">${item.expression}</span>
                <span class="history-result">${item.result}</span>
            `;
            historyItem.addEventListener('click', () => {
                currentExpression = item.result.toString();
                result.value = currentExpression;
            });
            historyList.appendChild(historyItem);
        });
    }

    // Initialize history display
    updateHistoryDisplay();

    // Clear history
    clearHistoryBtn.addEventListener('click', () => {
        history = [];
        localStorage.setItem('calcHistory', JSON.stringify(history));
        updateHistoryDisplay();
    });

    // Calculator functionality
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('clear')) {
                clear();
            } else if (button.classList.contains('equals')) {
                calculate();
            } else {
                appendValue(value);
            }
        });
    });

    function appendValue(value) {
        if (shouldResetScreen) {
            currentExpression = '';
            shouldResetScreen = false;
        }

        // Handle special cases for operators
        if ('×÷+-^'.includes(value)) {
            const lastChar = currentExpression.slice(-1);
            if ('×÷+-^'.includes(lastChar)) {
                currentExpression = currentExpression.slice(0, -1);
            }
        }

        // Handle square root
        if (value === '√') {
            currentExpression += 'sqrt(';
            result.value = currentExpression;
            return;
        }

        // Prevent multiple decimal points in a number
        if (value === '.') {
            const parts = currentExpression.split(/[\+\-\×\÷\(\)]/);
            const lastNumber = parts[parts.length - 1];
            if (lastNumber.includes('.')) return;
        }

        currentExpression += value;
        result.value = currentExpression;
    }

    function calculate() {
        try {
            // Replace operators with JavaScript operators
            let expression = currentExpression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/\^/g, '**')
                .replace(/sqrt\(/g, 'Math.sqrt(');

            // Validate the expression
            if (!/^[0-9+\-*/(). sqrt]*$/.test(expression)) {
                throw new Error('Invalid expression');
            }

            // Check for balanced parentheses
            if ((expression.match(/\(/g) || []).length !== (expression.match(/\)/g) || []).length) {
                throw new Error('Unbalanced parentheses');
            }

            const answer = eval(expression);

            // Check for division by zero and invalid results
            if (!isFinite(answer)) {
                throw new Error('Nie można dzielić przez zero!');
            }

            // Add to history
            history.push({
                expression: currentExpression,
                result: answer
            });
            if (history.length > 10) history.shift(); // Keep only last 10 calculations
            localStorage.setItem('calcHistory', JSON.stringify(history));
            updateHistoryDisplay();

            currentExpression = answer.toString();
            result.value = currentExpression;
            shouldResetScreen = true;
        } catch (error) {
            alert(error.message === 'Invalid expression' ? 'Nieprawidłowe wyrażenie!' : error.message);
            clear();
        }
    }

    function clear() {
        currentExpression = '';
        result.value = '';
        shouldResetScreen = false;
    }

    // Keyboard support
    document.addEventListener('keydown', (event) => {
        if (event.key >= '0' && event.key <= '9' || event.key === '.') {
            appendValue(event.key);
        } else if (event.key === '+' || event.key === '-') {
            appendValue(event.key);
        } else if (event.key === '*') {
            appendValue('×');
        } else if (event.key === '/') {
            event.preventDefault();
            appendValue('÷');
        } else if (event.key === '^') {
            appendValue('^');
        } else if (event.key === '(' || event.key === ')') {
            appendValue(event.key);
        } else if (event.key === 'Enter' || event.key === '=') {
            calculate();
        } else if (event.key === 'Escape') {
            clear();
        }
    });
});