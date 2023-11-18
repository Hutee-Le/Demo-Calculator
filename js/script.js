const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentInput = '';
let operator = '';
let result = '';
let shouldClearDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

clearButton.addEventListener('click', clearDisplay);
equalsButton.addEventListener('click', performCalculation);

function handleButtonClick(value) {
    if (shouldClearDisplay) {
        display.value = '';
        shouldClearDisplay = false;
    }
    if (value >= '0' && value <= '9') {
        currentInput += value;
        display.value += value; // Thêm giá trị số vào màn hình
    } else if (value === '.' && !currentInput.includes('.')) {
        currentInput += value;
        display.value += value; // Thêm dấu chấm vào màn hình
    } else if (value === 'C') {
        clearDisplay();
    } else if (value === '=') {
        performCalculation();
    } else if (value === '+/-') {
        handleToggleSign();
    } else if (value === '%') {
        handlePercentage();
    } else {
        if (currentInput !== '') {
            if (operator !== '') {
                performCalculation();
            } else {
                result = currentInput;
            }
            operator = value;
            currentInput = '';
        }
        display.value += value; // Thêm toán tử vào màn hình
    }
}


function handleToggleSign() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        display.value = currentInput;
    }
}

function handlePercentage() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        display.value = currentInput;
    }
}

function performCalculation() {
    if (currentInput !== '') {
        if (operator === '+') {
            result = (parseFloat(result) + parseFloat(currentInput)).toString();
        } else if (operator === '-') {
            result = (parseFloat(result) - parseFloat(currentInput)).toString();
        } else if (operator === '*') {
            result = (parseFloat(result) * parseFloat(currentInput)).toString();
        } else if (operator === '/') {
            if (parseFloat(currentInput) === 0) {
                display.value = "Error";
                shouldClearDisplay = true;
                return;
            } else {
                result = (parseFloat(result) / parseFloat(currentInput)).toString();
            }
        }
    }
    currentInput = '';
    operator = '';
    display.value = result;
    shouldClearDisplay = true;
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    result = '';
    display.value = '';
    shouldClearDisplay = false;
}
