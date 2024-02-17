const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operand");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");
const backspace = document.querySelector("#backspace");

let displayValue = "";
let number1 = null;
let number2 = null;
let operator = null;
let hasCalculated = false;
let typingNumber2 = false;

numbers.forEach((numberInput) => {
  numberInput.addEventListener("click", (e) => {
    appendToDisplay(e.target.value);
  });
});
equal.addEventListener("click", (e) => {
  calculate();
});
clear.addEventListener("click", (e) => {
  clearDisplay();
  enableDecimalButton();
});
decimal.addEventListener("click", (e) => {
  appendToDisplay(".");
});
backspace.addEventListener("click", (e) => {
  backSpace();
});

window.onkeydown = function (e) {
  if (e.key === "Enter") {
    calculate();
    return;
  }
  if (e.key === "Backspace") {
    backSpace();
    return;
  }
  if (
    [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].includes(
      e.key
    )
  ) {
    appendToDisplay(e.key);
  } else if (["-", "+", "*", "/"].includes(e.key)) {
    operatorClicked(e.key);
  }
};

function operatorClicked(value) {
  if (number1 === null) {
    number1 = parseFloat(displayValue);
    operator = value;
  } else if (number1 !== null && operator !== null && typingNumber2) {
    number2 = parseFloat(displayValue);
    number1 = operate(number1, number2, operator);
    display.value = number1;
    number2 = null;
    typingNumber2 = false;
  }
  operator = value;
  updateDisplay(operator)
  document.querySelectorAll(".operand").forEach((operand) => {
    operand.classList.remove("active");
  });
  document
    .querySelector(`.operand[value='${operator}']`)
    .classList.add("active");
  decimal.disabled = false;
}

function updateDisplay(symbol) {
  display.value += " " + symbol + " ";
}

operators.forEach((operatorInput) => {
  operatorInput.addEventListener("click", (e) => {
    if (e.target.value === "=") return;

    operatorClicked(e.target.value);
  });
});

function calculate() {
  if (number1 !== null && operator !== null) {
    number2 = parseFloat(displayValue);
    const result = operate(number1, number2, operator);
    if (result) {
      display.value = result;
      number1 = result;
      number2 = null;
      operator = null;
      displayValue = "";
      typingNumber2 = false;
    } else {
      number1 = null;
    }
  }
}

function appendToDisplay(value) {
  if (number1 !== null && !typingNumber2) {
    display.value = "";
    displayValue = "";
    typingNumber2 = true;
  }

  if (value === "." && displayValue.includes(".")) {
    return;
  }

  const limit = 26;
  if (display.value.length <= limit) {
    if (display.value === "0" && value === "0") {
      display.value = "0";
      displayValue = "0";
    } else {
      display.value += value;
      displayValue = display.value;
    }
  }

  if (value === ".") {
    decimal.disabled = true;
  }
}

function enableDecimalButton() {
  decimal.disabled = false;
}

function clearDisplay() {
  display.value = "";
  displayValue = "";
  number1 = null;
  number2 = null;
  operator = null;
  typingNumber2 = false;
  enableDecimalButton();
  document.querySelectorAll(".operand").forEach((operand) => {
    operand.classList.remove("active");
  });
}

function backSpace() {
  if (displayValue) {
    displayValue = displayValue.substring(0, displayValue.length - 1);
    document.getElementById("display").value = displayValue;
  }
}

function add(number1, number2) {
  let add = number1 + number2;
  return add;
}
function subtract(number1, number2) {
  let sub = number1 - number2;
  return sub;
}
function multiply(number1, number2) {
  let mul = number1 * number2;
  return mul;
}
function divide(number1, number2) {
  let div = number1 / number2;
  return div;
}

function operate(number1, number2, operator) {
  document.querySelectorAll(".operand").forEach((operand) => {
    operand.classList.remove("active");
  });
  switch (operator) {
    case "+":
      return add(number1, number2);
    case "-":
      return subtract(number1, number2);
    case "*":
      return multiply(number1, number2);
    case "/":
      if (number2 === 0) {
        clearDisplay();
        return "Error! ";
      }
      return divide(number1, number2);
    default:
      return number1;
  }
}
