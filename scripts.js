let availableDecimals = 5;
let history = new Array();

let isDigit = true;
let isOperator = false;
let isResult = false;

const screen = document.querySelector(".operation");
const history_span = document.querySelector(".top-row");

function clearDisplay() {
    screen.textContent = "";
    history_span.textContent = "";
    history = new Array();
    isDigit = true;
    isOperator = false;
    console.log("clearDisplay");
}

function addNumber(_digit)
{  
    if (isDigit)
    {
        screen.textContent = _digit;
        history.push(_digit);
        isDigit = false;
        
    }
    else if(!isResult)
    {
        let number = history.pop();
        number = number * 10 + _digit;
        history.push(number);
        screen.textContent = number;
    }
    isOperator = true;

    

    showHistory();
}

function addOperator(_operator)
{
    if(history.length > 2)
    {
        let result = operate(history[0], history[1], history[2]);
        history = new Array();
        history.push(result);
    }

    if (isOperator)
    {
        history.push(_operator);
        screen.textContent = _operator;
        isDigit = true;
        isOperator = false;
    }
    else 
    {
        history.pop();
        history.push(_operator);
        screen.textContent = _operator;
        isDigit = true;
        isOperator = false;
    }

    

    showHistory();
    isResult = false;
}

function operate(_num1, _operator, _num2)
{
    let result = 0;
    switch(_operator)
    {
        case "+":
            result = _num1 + _num2;
            break;
        case "-":
            result = _num1 - _num2;
            break;
        case "*":
            result = _num1 * _num2;
            break;
        case "/":
            result = _num1 / _num2;
            break;
    }
    isResult = true;
    result = result.toFixed(availableDecimals);
    result = parseFloat(result);
    return result;
    
}

function showHistory()
{
    let history_str = "";
    for(let i = 0; i < history.length; i++)
    {
        history_str += history[i];
    }
    history_span.textContent = history_str;
}

function calculate()
{
    let result = operate(history[0], history[1], history[2]);
    screen.textContent = result;
    history_span.textContent = "";
    history = new Array();

}

