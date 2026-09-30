let currentInput = '';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

function updateDisplay(value) {
    display.value = value;
}

function appendNumber(number) {
    // After pressing '=', start a fresh number instead of appending to the result
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    // Prevent multiple decimal points
    if (number === '.' && currentInput.includes('.')) return;

    // Prevent leading zeros (allow "0." but not "007")
    if (number === '0' && currentInput === '0') return;
    if (number !== '.' && currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay(currentInput);
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay('0');
}

function backspace() {
    if (shouldResetDisplay) {
        // After pressing '=', backspace acts like clear
        clearDisplay();
        return;
    }

    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
}

async function setOperator(op) {
    if (currentInput === '' && previousInput === '') return;

    // If there's already a pending calculation, resolve it first
    if (previousInput !== '' && currentInput !== '') {
        await calculateResult();
    }

    shouldResetDisplay = false;
    operator = op;
    previousInput = currentInput || previousInput;
    currentInput = '';
}

async function calculateResult() {
    if (currentInput === '' || previousInput === '' || operator === null) return;

    try {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                num1: previousInput,
                num2: currentInput,
                operator: operator
            })
        });

        const data = await response.json();

        if (data.error) {
            updateDisplay(data.error);
            currentInput = '';
        } else {
            updateDisplay(data.result);
            currentInput = data.result.toString();
            shouldResetDisplay = true;
        }
    } catch (error) {
        updateDisplay('Error');
        currentInput = '';
    }

    previousInput = '';
    operator = null;
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
 
    if ((key >= '0' && key <= '9')||key === '.') {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        event.preventDefault(); // '/' opens quick-find in some browsers
        setOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        backspace();
    }
});
