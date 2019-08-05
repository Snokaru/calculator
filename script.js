let firstNumber = 0, secondNumber = 0, operator = undefined, pointWasPressed = false, pointPower = 10, grandTotal = 0;
window.addEventListener("load", () => {
    let buttonArray = makeCalculatorButtons();
});

function makeCalculatorButtons() {
    let buttonsContainer = document.querySelector('.buttons');
    let buttonClass = [
        'GRANDTOTAL',
        'BACKSPACE',
        'CLEAR',
        'N/A', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'
    ];
    let buttonArray = [];
    for(let i = 0; i < 20; i++) {
        let button = document.createElement('button');
        button.setAttribute('class', buttonClass[i]);
        if(buttonClass[i] == 'GRANDTOTAL') {
            button.textContent = 'GT';
        }
        else if(buttonClass[i] == 'BACKSPACE') {
            button.textContent = 'DEL';
        }
        else if(buttonClass[i] == 'CLEAR') {
            button.textContent = 'C';
        }
        else {
            button.textContent = buttonClass[i];
        }
        buttonsContainer.appendChild(button);
        button.addEventListener('click', assignHandlerFunction(button));
        buttonArray[i] = button;
    }
    return buttonArray;
}
function assignHandlerFunction(button) {
    let buttonClass = button.className;
    if(buttonClass == 'GRANDTOTAL') {
        return handleGrandTotal;
    }
    else if(buttonClass == 'BACKSPACE') {
        return handleBackspace;
    }
    else if(buttonClass == 'CLEAR') {
        return handleClear;
    }
    else if(buttonClass == '/') {
        return handleDivision;
    }
    else if(buttonClass == '*') {
        return handleMultiplication;
    }
    else if(buttonClass == '-') {
        return handleSubtraction;
    }
    else if(buttonClass == '.') {
        return handlePoint;
    }
    else if(buttonClass == '=') {
        return handleEqual;
    }
    else if(buttonClass == '+') {
        return handleAddition;
    }
    else if(buttonClass == 'N/A') {
        ;   
    }
    else {
        return () => {
            handleNumber(buttonClass);
        }
    }
}

function handleGrandTotal() {
    updateDisplay(grandTotal);
}
function handleBackspace() {
    if(!pointWasPressed) {
        if(operator == undefined) {
            firstNumber = parseInt(firstNumber / 10);
            updateDisplay(firstNumber);
        }
        else {
            secondNumber = parseInt(secondNumber / 10);
            updateDisplay(secondNumber);
        }
    }
    else {
        if(operator == undefined) {
            firstNumber = parseInt(firstNumber);
            pointWasPressed = false;
            pointPower = 10;
            updateDisplay(firstNumber);
        }
        else {
            secondNumber = parseInt(secondNumber);
            pointWasPressed = false;
            pointPower = 10;
            updateDisplay(secondNumber);
        }
    }
}
function handleClear() {
    firstNumber = 0;
    secondNumber = 0;
    operator = undefined;
    updateDisplay(firstNumber);
    pointWasPressed = false;
    pointPower = 10;
    grandTotal = 0;
}
function handleDivision() {
    operator = '/';
    updateDisplay(operator);
    pointWasPressed = false;
    pointPower = 10;
}
function handleMultiplication() {
    operator = '*';
    updateDisplay(operator);
    pointWasPressed = false;
    pointPower = 10;
}
function handleAddition() {
    operator = '+';
    updateDisplay(operator);
    pointWasPressed = false;
    pointPower = 10;
}
function handleSubtraction() {
    operator = '-';
    updateDisplay(operator);
    pointWasPressed = false;
    pointPower = 10;
}
function handlePoint() {
    let pointString = "";
    if(operator == undefined)
        pointString = firstNumber.toString();
    else
        pointString = secondNumber.toString();

    pointString += '.';
    pointWasPressed = true;
    updateDisplay(pointString);
}
function handleEqual() {
    let result = operate(firstNumber, secondNumber, operator);
    if(result != parseInt(result)) {
        result = result.toFixed(2);
    }
    updateDisplay(result);
    pointWasPressed = false;
    pointPower = 10;
    grandTotal += parseInt(result);
    console.log(grandTotal);
    firstNumber = 0;
    secondNumber = 0;
    operator = undefined;
}

function handleNumber(numberString) {
    let number = parseInt(numberString);
    if(!pointWasPressed) {
        if(operator == undefined) {
            firstNumber = firstNumber * 10 + number;
            updateDisplay(firstNumber);
        }

        else {
            secondNumber = secondNumber * 10 + number;
            updateDisplay(secondNumber);
        }
    }
    else if(pointWasPressed && pointPower < 100){
        if(operator == undefined) {
            firstNumber = firstNumber + number / pointPower;
            pointPower *= 10;
            if(number == 0)
                updateDisplay(firstNumber.toString() + '0');
            else
                updateDisplay(firstNumber);
        }
        else {
            secondNumber = secondNumber + number / pointPower;
            pointPower *= 10;
            if(number == 0)
                updateDisplay(secondNumber.toString() + '0');
            else
                updateDisplay(secondNumber);

        }
    }
}

function updateDisplay(text) {
    let displayedText = document.querySelector('.resultContainer');
    displayedText.textContent = text;   
}



function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}
function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}
function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}
function divide(firstNumber, secondNumber) {
    if(secondNumber != 0) {
        return firstNumber / secondNumber;
    }
    else {
        return "Can't divide by 0!";
    }
}
function operate(firstNumber, secondNumber, operator) {
    if(operator == '+') {
        return add(firstNumber, secondNumber);
    }
    if(operator == '-') {
        return subtract(firstNumber, secondNumber);
    }
    if(operator == '*') {
        return multiply(firstNumber, secondNumber);
    }
    if(operator == '/') {
        return divide(firstNumber, secondNumber);
    }
}
