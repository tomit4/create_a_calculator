// Start writing JavaScript here!
const calculator= document.querySelector('.calculator')
/* selects only within the parent element, saves on resources
 instead of quering the entire DOM */
const keys = calculator.querySelector('.calculator_keys')
const display = calculator.querySelector('.calculator_display')

keys.addEventListener('click', event => {
    if (!event.target.closest('button')) return

    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const { type } = key.dataset
    const { previousKeyType } = calculator.dataset

    if (type === 'number') {
        if (displayValue === '0') {
            display.textContent = keyValue
        } else if (previousKeyType === 'operator') {
            display.textContent = keyValue
        } else {
            display.textContent = displayValue + keyValue
        }
    }

    if (type === 'operator') {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => { el.dataset.state = '' })
        key.dataset.state = 'selected'
        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
    }

    if (type === 'clear') {
        display.textContent = '0'
        calculator.dataset.firstNumber = '0'
    }

    if (type === 'equal') {
        // Perform a calculation
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        display.textContent =  calculate(firstNumber, operator, secondNumber)
    }

    calculator.dataset.previousKeyType = type
})

function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber)
    secondNumber = parseInt(firstNumber)

    /* note how this version doesn't store the data in a variable, result,
     instead it just returns the data */
    // if (operator === 'plus') return firstNumber + secondNumber
    // if (operator === 'minus') return firstNumber - secondNumber
    // if (operator === 'times') return firstNumber * secondNumber
    // if (operator === 'divide') return  firstNumber / secondNumber

    /* same as above, but with switch/case */
    /* note that if you have a use for result after the switch case is done, and
     not if you just return it*/

    let result = ''
    switch(operator) {
        case 'plus':  result = firstNumber + secondNumber; break;
        case 'minus':  result = firstNumber - secondNumber; break;
        case 'times':  result = firstNumber * secondNumber; break;
        case 'divide':  result = firstNumber / secondNumber; break;
    }

    return result
}
