import {Parser} from '../node_modules/expr-eval/dist/index.mjs';

const calculatorDisplay = document.querySelector('#calculator-display-input');
const parser = new Parser();

let usedNumbers = [];
let currentNumberIndex = 0;
let expression = '';

let wasMathOperatorPreviouslyChosen = false;


document.querySelectorAll('.btn').forEach(button => 
{
    button.addEventListener('click', () => addClickedNumberToCalculations(button.textContent)); 
});

document.querySelectorAll('.math-operator-btn').forEach(button => 
{
    button.addEventListener('click', () => chooseMathOperator(button.textContent)); 
});

document.querySelector('.dot-btn').addEventListener('click', createFloatNumber)

document.querySelector('#equals-btn').addEventListener('click', calculate);

document.querySelector('#reset-btn').addEventListener('click', reset);

document.querySelector('#delete-btn').addEventListener('click', deleteLastSymbol);

function addClickedNumberToCalculations(number)
{
    usedNumbers[currentNumberIndex] += number;
    expression += number;

    wasMathOperatorPreviouslyChosen = false;
    
    display();
}

function display()
{
    calculatorDisplay.value = expression;
}

function chooseMathOperator(mathOperator)
{
    if(mathOperator === 'x')
        mathOperator = '*';

    if(wasMathOperatorPreviouslyChosen)
    {
        expression = expression.slice(0, -1) + mathOperator;
    }
    else
    {
        expression += mathOperator;
        currentNumberIndex++;
    }
 
    wasMathOperatorPreviouslyChosen = true;
    display();
}

function createFloatNumber()
{
    if(usedNumbers[currentNumberIndex].includes('.'))
        return;

    addClickedNumberToCalculations('.');
}

function calculate()
{
    if(expression === '')
        return;

    expression = parser.parse(expression).evaluate();
    usedNumbers = [];
    usedNumbers.push(expression);
    currentNumberIndex = 0;
    display();
}

function reset()
{
    expression = '';
    currentNumberIndex = 0;
    usedNumbers = [];

    display();
}

function deleteLastSymbol()
{
    expression = expression.slice(0, -1);

    if(wasMathOperatorPreviouslyChosen)
        wasMathOperatorPreviouslyChosen = false;

    display();
}