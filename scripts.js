let availableDecimals = 5;
let history = new Array();

let isDigit = true;
let isOperator = false;
let isResult = false;
let isDecimal = false;
let isDecimalNumber = false;


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
    if(_digit == '.')
    {
        isDecimal = true;
        screen.textContent += _digit;
        isDigit = false;
        return;
    }

    if (isDigit)
    {
        screen.textContent = _digit;
        history.push(_digit);
        isDigit = false;
        
    }
    else if(isDecimal)
    {
        if(countDecimals(screen.textContent) >= availableDecimals)
        {
            return;
        }

        screen.textContent += _digit;
        let number = parseFloat(screen.textContent);
        
        history.pop();
    
        history.push(number);
        isDecimalNumber = true;
    }
    else if(!isResult)
    {
        let number = history.pop();
        if(number < 0)
        {
            number = number * 10 - _digit;
        }
        else
        {
            number = number * 10 + _digit;
        }
        
        history.push(number);
        screen.textContent = number;
    }
    isOperator = true;

    showHistory();
}

function addOperator(_operator)
{

    if(isDecimalNumber === true)
    {
        isDecimalNumber = false;
        isDecimal = false;
        isDigit = true;
    }
    if(history.length === 0 || isDecimal)
        return;

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
    if(history.length === 1)
    {
        return;
    }

    let history_str = "";
    for(let i = 0; i < history.length; i++)
    {
        history_str += history[i];
    }
    history_span.textContent = history_str;
}

function calculate()
{
    if(history.length === 0 || isDecimal)
        return;
    let result = 0;
    if(history.length <= 2)
    {
         result = history[0];
    }
    else
    {
         result = operate(history[0], history[1], history[2]);
    }
    screen.textContent = result;
    history_span.textContent = "";
    history = new Array();

    isDigit = true;
    isResult = false;
}

function deleteLast()
{
    if(history.length > 0)
    {
        history.pop();
        screen.textContent = "";
        showHistory();
        isDigit = true;
    }
}

function countDecimals(numStr) {
    
    
    // Check if the number contains a decimal point
    if (numStr.includes('.')) {
        // Split the number by the decimal point and return the length of the part after the decimal
        return numStr.split('.')[1].length;
    } else {
        // If there's no decimal point, return 0
        return 0;
    }
}

function changeSign()
{
    if (screen.textContent === "" || !isOperator)
        return;
    let number = parseFloat(screen.textContent);
    number = -number;

    screen.textContent = number;
    history.pop();
    history.push(number);

}


