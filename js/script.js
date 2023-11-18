// Lấy các phần tử từ DOM
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

// Khai báo biến để lưu trữ dữ liệu đầu vào hiện tại, toán tử được chọn và kết quả
let currentInput = '';
let operator = '';
let result = '';

// Thêm sự kiện click cho mỗi nút
buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

// Xử lý khi nút clear (C) và equals (=) được nhấn
clearButton.addEventListener('click', clearDisplay);
equalsButton.addEventListener('click', performCalculation);

// Xử lý sự kiện nhấn nút
function handleButtonClick(value) {
    switch(value) {
        case 'C':
            clearDisplay();
            break;
        case '+/-':
            if (currentInput !== '') {
                currentInput = String(-parseFloat(currentInput));
            }
            break;
        case '%':
            if (currentInput !== '') {
                currentInput = String(parseFloat(currentInput) / 100);
            }
            break;
        case '.':
            if (!currentInput.includes('.')) {
                currentInput += value;
            }
            break;
        case '=':
            performCalculation();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            setOperator(value);
            break;
        default:
            if (value >= '0' && value <= '9') {
                currentInput += value;
            }
            break;
    }
    updateDisplay();
}

// Thiết lập toán tử cho phép tính
function setOperator(op) {
    if (currentInput === '' && result) {
        operator = op;
    } else if (currentInput !== '') {
        if (operator) {
            performCalculation();
        } else {
            result = currentInput;
        }
        operator = op;
        currentInput = '';
    }
}

// Cập nhật hiển thị
function updateDisplay() {
    display.value = `${result} ${operator} ${currentInput}`;
}

// Thực hiện tính toán
function performCalculation() {
    if (currentInput !== '' && operator && result) {
        switch(operator) {
            case '+':
                result = String(parseFloat(result) + parseFloat(currentInput));
                break;
            case '-':
                result = String(parseFloat(result) - parseFloat(currentInput));
                break;
            case '*':
                result = String(parseFloat(result) * parseFloat(currentInput));
                break;
            case '/':
                result = String(parseFloat(result) / parseFloat(currentInput));
                break;
        }
        currentInput = '';
        operator = '';
    }
}

// Xóa hiển thị
function clearDisplay() {
    currentInput = '';
    operator = '';
    result = '';
    updateDisplay();
}
