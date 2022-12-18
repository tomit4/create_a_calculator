const calculator= document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator_keys')
const display = calculator.querySelector('.calculator_display')
const operatorKeys = document.querySelectorAll('[data-type="operator"]')

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
        // const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
        operatorKeys.forEach(el => { el.dataset.state = '' })
        key.dataset.state = 'selected'
        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
    }

    if (type === 'equal') {
        // Perform a calculation
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        display.textContent =  calculate(firstNumber, operator, secondNumber)
    }

    if (type === 'clear') {
        display.textContent = '0'
        delete calculator.dataset.firstNumber
        delete calculator.dataset.operator
    }

    calculator.dataset.previousKeyType = type
})

function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber)
    secondNumber = parseInt(secondNumber)

    if (operator === 'plus') return firstNumber + secondNumber
    if (operator === 'minus') return firstNumber - secondNumber
    if (operator === 'times') return firstNumber * secondNumber
    if (operator === 'divide') return firstNumber / secondNumber
}

/* *********************
* TESTING
* *********************/

function clearCalculator() {
    // Press the clear key
    const clearKey = document.querySelector('[data-type="clear"]')
    clearKey.click()
    // Clear operator states
    operatorKeys.forEach(el => { el.dataset.state = '' })
}

function testClearKey() {
    clearCalculator()
        console.assert(display.textContent === '0', 'Clear key. Display should be 0')
        console.assert(!calculator.dataset.firstNumber, 'Clear key. No firstNumber remains')
        console.assert(!calculator.dataset.operator, 'Clear key. No operator remains')
}


const one = document.querySelector('[data-key="1"]')
const five = document.querySelector('[data-key="5"]')
const nine = document.querySelector('[data-key="9"]')

function testKeySequence(test) {
    // Press keys
    test.keys.forEach(key => {
        document.querySelector(`[data-key="${key}"]`).click()
    })

    // Assertion
    console.assert(display.textContent === test.value, test.message)
    clearCalculator()
    testClearKey()
}

const tests = [{
    keys: ['1'],
    value: '1',
    message: 'Click 1'
},{
    keys: ['1', '5'],
    value: '15',
    message: 'Click 15'
}, {
    keys: ['1', '5', '9'],
    value: '159',
    message: 'Click 159'
}, {
    keys: ['2', '4', 'plus', '7', 'equal'],
    value: '31',
    message: '24 plus 7 should be 31'
}, {
    keys: ['3', 'minus', '7', '0', 'equal'],
    value: '-67',
    message: '3 minus 7 should be -67'
}, {
    keys: ['9', 'divide', '3', 'equal'],
    value: '3',
    message: '9 divided by 3 should be 3'
}, {
    keys: ['1', '5', 'times', '9', 'equal'],
    value: '135',
    message: 'Calculation with 15 times 9'
}]

tests.forEach(test => testKeySequence(test))
