const DISPLAY = document.querySelector('.calculator__display');
const BUTTONS = document.querySelectorAll('.calculator__keys button');

const ADD = '+';
const SUBTRACT = '-';
const MULTIPLY = 'x';
const DIVIDE = '÷';
const CALCULATE = '=';
const DECIMAL = '.';
const CLEAR = 'AC';

const MAX_DISPLAY_LENGTH = 10;

let operator = '';
let firstValue = '';
let secondValue = '';
let hasDecimal = false;


BUTTONS.forEach(button => {
    button.addEventListener('click', handleClick);
})
console.log(BUTTONS)
console.log(DISPLAY.textContent)

function handleClick(event) {
    let buttonClicked = event.target.innerHTML;
    console.log('button clicked: ' + buttonClicked);

    if (buttonClicked  === DECIMAL) {
        if (!hasDecimal) {
            console.log('button clicked is DECIMAL')
            if (secondValue === '') {
                hasDecimal = true;
                firstValue += DECIMAL;
                updateDisplay(firstValue); 
            } else {
                hasDecimal = true;
                secondValue += DECIMAL;
                updateDisplay(`${firstValue} ${operator} ${secondValue}`); 
            }
        }
    } else if (buttonClicked === CLEAR) {
        console.log('the display is cleared!')
        clearDisplay();
    } else  if (buttonClicked === CALCULATE) {
        console.log('equal calculating...')
        if (!firstValue && !operator && !secondValue) {
            updateDisplay('Error');

        }
        firstValue = operate(operator, firstValue, secondValue).toString();
        operator = '';
        secondValue = '';
        updateDisplay(truncateDisplay(firstValue));
        console.log(`after equals, firstvalue is now ${firstValue}, operator is ${operator} and secondvalue ${secondValue}`)
        if (containsDecimal(firstValue)) {
            hasDecimal = true
            console.log('First value contains a decimal.');
        } else {
            hasDecimal = false;
            console.log('First value does not contain a decimal.');
        }
    } else {
        createSum(buttonClicked);
    }
}

function clearDisplay() {
    operator = '';
    firstValue = '';
    secondValue = '';
    hasDecimal = false;
    return updateDisplay('0');
}

function containsDecimal(value) {
    for (let i = 0; i < value.length; i++) {
        if (value[i] === DECIMAL) {
            return true;
        }
    }
    return false;
}

function truncateDisplay(value) {
    if (value.length > MAX_DISPLAY_LENGTH) {
        return value.substring(0, MAX_DISPLAY_LENGTH);
    }
    return value;
}

function isNumber(number) {
    return !isNaN(number);
}

function updateDisplay(value) {
    DISPLAY.innerHTML = value;
}

function createSum(value) {
    if (isNumber(value) && operator === '') {
        firstValue += value;
        console.log('first value is: ' + firstValue);
        updateDisplay(firstValue); 
    } else {
        checkOperator(value)
        console.log('operator is: ' + operator);
        updateDisplay(`${firstValue} ${operator}`);
    }

    if (isNumber(value) && operator && firstValue) {
        hasDecimal = false;
        secondValue += value;
        updateDisplay(`${firstValue} ${operator} ${secondValue}`);
    }
}

function checkOperator(value) {
    if (value === ADD) {
        return operator = '+'
    } else if (value === SUBTRACT) {
        return operator = '-'
    } else if (value === MULTIPLY) {
        return operator = 'x'
    } else if (value === DIVIDE) {
        return operator = '÷'
    }
}

function operate(operator, firstValue, secondValue) {
    switch (operator) {
        case ADD:
            return Number(firstValue) + Number(secondValue)
        case SUBTRACT:
            return Number(firstValue) - Number(secondValue)
        case MULTIPLY:
            return Number(firstValue) * Number(secondValue)
        case DIVIDE:
            if (secondValue === '0') {
                return 'Error';
            }
            return Number(firstValue) / Number(secondValue)
        default:
            return 'Error'
    }    
}

