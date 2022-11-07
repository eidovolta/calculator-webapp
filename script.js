const display = document.getElementById("display");
let currentNumber = null;
let previousNumber = null;
let operator = null;

/**
 * If the display is not full, add a digit to the end of the current number
 */
function writeDigit() {
    if (display.textContent.length < 8) {
        display.textContent += this.textContent;
        currentNumber = parseFloat(display.textContent);
    }
}

/**
 * If the display is not full and there already is a number, add a zero at the end of the current number
 */
 function writeZero() {
    if (display.textContent.length < 8 && display.textContent >= 1) {
        display.textContent += this.textContent;
        currentNumber = parseFloat(display.textContent);
    }
}

/**
 * Clear all memory and numbers on display of the calculator
 */
function clearCalculator() {
    display.textContent = "";
    currentNumber = null;
    previousNumber = null;
    operator = null;
}

/**
 * Universal function for the operator buttons to process calculation
 */
function processOperator() {
    if (currentNumber && previousNumber && operator) {
        const swap = currentNumber;
        currentNumber = operate(previousNumber, currentNumber, operator);
        display.textContent = currentNumber;
        /* Make sure it can fit on the display */
        if (display.textContent.length > 8) {
            display.textContent = display.textContent.substring(0, 8);
            currentNumber = parseFloat(display.textContent);
        }
        previousNumber = swap;
        operator = this.textContent;
    } else {
        previousNumber = currentNumber;
        currentNumber = null;
        display.textContent = "";
        operator = this.textContent;
    }
}

/**
 * Similar to processOperator, if it is possible, display the result of the input numbers and operators
 */
function processEquals() {
    if (currentNumber && previousNumber && operator) {
        const swap = currentNumber;
        currentNumber = operate(previousNumber, currentNumber, operator);
        display.textContent = currentNumber;
        /* Make sure it can fit on the display */
        if (display.textContent.length > 8) {
            display.textContent = display.textContent.substring(0, 8);
            currentNumber = parseFloat(display.textContent);
        }
        previousNumber = swap;
    }
}

/**
 * Add event listeners to all buttons and nodes
 */
function initPage() {
    const numberButtons = document.getElementsByClassName("number");

    const operatorButtons = document.getElementsByClassName("operator");
    const clearButton = document.getElementById("clear");
    const equalsButton = document.getElementById("equals");
    /* Add number button functions to put digits on the calculators screen */
    for (let numberButton of numberButtons) {
        if (numberButton.textContent === "0") {
            numberButton.addEventListener("click", writeZero);
        }
        else {
            numberButton.addEventListener("click", writeDigit);
        }
    }
    /* Add functions for operators */
    for (let operatorButton of operatorButtons) {
        operatorButton.addEventListener("click", processOperator);
    }
    /* Add clear button function to erase everything from the calculator memory and screen */
    clearButton.addEventListener("click", clearCalculator);
    /* Add equals functionality to display a result */
    equalsButton.addEventListener("click", processEquals);
}

/**
 * Add two numbers
 * @param {number} num1 
 * @param {number} num2 
 * @returns result number of both numbers added together
 */
function add (num1, num2) {
    return num1 + num2;
}

/**
 * Subtract num2 from num1
 * @param {number} num1 
 * @param {number} num2 
 * @returns result number of num2 subtracted from num1
 */
function subtract (num1, num2) {
    return num1 - num2;
}

/**
 * Multiply both numbers together
 * @param {number} num1 
 * @param {number} num2 
 * @returns result number of both numbers multiplied together
 */
function multiply (num1, num2) {
    return num1 * num2;
}

/**
 * Divide num1 by num2
 * @param {number} num1 
 * @param {number} num2 
 * @returns result number of num1 divided by num2
 */
function divide (num1, num2) {
    return num1 / num2;
}

/**
 * Chooses the correct operation based on arguments given
 * @param {number} num1 
 * @param {number} num2 
 * @param {string} operator 
 * @returns result number of the correctly chosen operation or null if operator is invalid
 */
function operate (num1, num2, operator) {
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return multiply(num1, num2);
        case "/": return divide(num1, num2);
        default: return null;
    }
}

initPage();