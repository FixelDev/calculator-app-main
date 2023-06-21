import {Parser} from window.location.href + '/node_modules/expr-eval/dist/index.mjs';

const calculatorDisplay = document.querySelector('#calculator-display-input');
const parser = new Parser();

let expressionArray = [];

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
    checkIfExpressionContainsErrors();

    if(expressionArray[getCurrentExpressionElementIndex()] == null || isNaN(expressionArray[getCurrentExpressionElementIndex()] ))
        expressionArray.push(number);
    else
        expressionArray[getCurrentExpressionElementIndex()] += number;


    display();
}

function checkIfExpressionContainsErrors()
{
    if(expressionArray[getCurrentExpressionElementIndex()] == 'ERR' || expressionArray[getCurrentExpressionElementIndex()] == 'Infinity')
    {
        reset();
    }
}

function chooseMathOperator(mathOperator)
{
    if(mathOperator === 'x')
        mathOperator = '*';

    if(isNaN(expressionArray[getCurrentExpressionElementIndex()]))
    {
        expressionArray[getCurrentExpressionElementIndex()] = mathOperator;
    }
    else
    {
        expressionArray.push(mathOperator);
    }

    display();
}

function createFloatNumber()
{
    if(expressionArray[getCurrentExpressionElementIndex()].includes('.'))
        return;

    addClickedNumberToCalculations('.');
}

function calculate()
{
    let expression = '';

    try
    {
        expression = parser.parse(expressionArray.join('')).evaluate().toString();
    }
    catch(err)
    {
        expression = 'ERR';
    }


    clearExpressionArray();
    addClickedNumberToCalculations(expression);

}

function reset()
{
    clearExpressionArray();
    display();
}

function deleteLastSymbol()
{   
    if(expressionArray.length === 0)
        return;

    expressionArray[getCurrentExpressionElementIndex()] = expressionArray[getCurrentExpressionElementIndex()].slice(0, -1);

    if(expressionArray[getCurrentExpressionElementIndex()] == '')
    {
        expressionArray.pop();
    }
        

    display();
}

function display()
{
    calculatorDisplay.value = expressionArray.join('');
}

function clearExpressionArray()
{
    expressionArray = [];
}

function getCurrentExpressionElementIndex()
{
    return expressionArray.length - 1;
}