const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-screen');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        if (!action) {
            if (displayNum === '0' || previousKeyType === 'operator' || previousKeyType === 'equal-sign') {
                display.textContent = keyContent;
            }
            else {
                display.textContent = displayNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayNum;
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'equal-sign') {
                const calculateValue = calculate(firstValue, operator, secondValue);
                display.textContent = calculateValue;
                calculator.dataset.firstValue = calculateValue;
            }
            else {
                calculator.dataset.firstValue = displayNum;
            }
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }
        if (action === 'plus-minus') {
            let value = displayNum;
            if (value[0] === '-') {
                value = value.substring(1);
            }
            else {
                value = '-' + value;
            }
            display.textContent = value;
            calculator.dataset.previousKeyType = 'plus-minus';
        }
        if (action === 'decimal') {
            if (!displayNum.includes('.')) {
                display.textContent = displayNum + '.';
            }
            else if(previousKeyType === 'operator' || previousKeyType === 'equal-sign'){
                display.textContent = '0';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        if (action === 'all-clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.secondValue = '';
                calculator.dataset.previousKeyType = '';
            }
            else {
                key.textContent = 'AC';
            }
            display.textContent = 0;
            calculator.dataset.previousKeyType = 'all-clear';
        }
        
        if (action !== 'all-clear') {
            const clearButton = calculator.querySelector('.all-clear');
            clearButton.textContent = 'CE';
        }
        if (action === 'equal-sign') {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayNum;
            
            if (firstValue) {
                if (previousKeyType === 'equal-sign') {
                    firstValue = displayNum;
                    secondValue = calculator.dataset.modValue;
                }
                display.textContent = calculate(firstValue, operator, secondValue).toFixed(4);
            }
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'equal-sign';
        }
        if (action === 'load') {
            loadJSON();
        }
        changeFontSize();
    }
})

function changeFontSize(){
    if (display.textContent.length > 13) {
        display.style.fontSize = '3rem';
    }
    else
        display.style.fontSize = '5rem';
}



function loadJSON() {
    const list = document.querySelector(".jsonList");
    let selectedIndex = list.selectedIndex;
    let selected = list.options[selectedIndex].value;
    
    fetch('http://www2021.csie.io:82/api/v0/json?name=' + selected) 
        .then(res=>{
            return res.json();
        })
        .then(json => {
            let data = json;
            let n1 = '';
            let op = '';
            let n2 = '';
            let result = data[0]['value'];
            
            for (let i = 0; i < data.length-2; i+=2){
                n1 = result;
                op = data[i + 1]['value'];
                n2 = data[i + 2]['value'];
                result = calculate(n1, op, n2);
            }
            display.textContent = result.toFixed(4);
        });
}
const calculate = (n1, op, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (op === 'add' || op === '+') {
        return (firstNum + secondNum);
    }
    if (op === 'subtract' || op === '-') {
        return (firstNum - secondNum);
    }
    if (op === 'multiply' || op === '*') {
        return (firstNum * secondNum);
    }
    if (op === 'divide' || op === '/') {
        if (n2 === '0') return 'Err';
        else return (firstNum / secondNum);
    }
}