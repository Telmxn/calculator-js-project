const display = document.getElementById('#calculator__display');
display.target.dataset.value = 0;
let firstNumber = null;
let operator = null;
let secondNumber = null;
let hasDecimal = false; // Flag to track if a decimal point has been used

const buttons = document.querySelectorAll('.calculator__keys button');

buttons.forEach(button => {
  button.addEventListener('click', handleClick);
});

function handleClick(event) {
  const action = event.target.dataset.action;
  const value = event.target.dataset.value;

  switch (action) {
    case 'number':
      appendNumber(value);
      break;
    case 'operator':
      appendOperator(value);
      break;
    case 'decimal':
      appendDecimal(value);
      break;
    case 'clear':
      clearDisplay();
      break;
    case 'calculate':
      calculate();
      break;
  }
}

function appendNumber(number) {
  if (display.value === '0' || operator) {
    display.value = number;
  } else {
    display.value += number;
  }
}

function appendOperator(op) {
  firstNumber = parseFloat(display.value);
  operator = op;
  display.value = '0';
  hasDecimal = false; // Reset decimal flag for next number
}

function appendDecimal(decimal) {
  if (!hasDecimal) {
    display.value += decimal;
    hasDecimal = true;
  }
}

function clearDisplay() {
  display.value = '0';
  firstNumber = null;
  operator = null;
  secondNumber = null;
  hasDecimal = false; // Reset decimal flag
}

function calculate() {
  if (operator) {
    secondNumber = parseFloat(display.value);
    let result;
    switch (operator) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case '*':
        result = firstNumber * secondNumber;
        break;
      case '/':
        if (secondNumber === 0) {
          result = 'Error: Division by zero';
        } else {
          result = firstNumber / secondNumber;
        }
        break;
    }
    display.value
  }
}