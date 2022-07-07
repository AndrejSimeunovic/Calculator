function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
function operate(a, b, operator) {
    let result;
    switch (operator) {
        case '+':
            result = add(a,b)
            break;
        case '-':
            result = substract(a,b)
            break;
        case '*':
            result = multiply(a,b)
            break;
        case '÷':
            result = divide(a,b)
            break;
    
        default:
            break;
    }
    return result;
}

console.log(document.querySelectorAll('[data-number]'))

// 1

// Create the functions that populate the display when
// you click the number buttons. You should be storing 
// the ‘display value’ in a variable somewhere for use 
// in the next step.

let btnNumbers = document.querySelectorAll('[data-number]')

btnNumbers.forEach(button => 
    button.addEventListener('click',display)
    )

function display(event){
    let number = event.target.innerText
    let screen = document.querySelector('.result')
    screen.innerText = screen.innerText + number
}    

// 2

// Make the calculator work! You’ll need to store the 
// first number that is input into the calculator when 
// a user presses an operator, and also save which operation 
// has been chosen and then operate() on them when the user 
// presses the “=” key.

// a 
// You should already have the code that can populate the display, 
// so once operate() has been called, update the display with the 
// ‘solution’ to the operation.

// b
//This is the hardest part of the project. You need to figure out 
// how to store all the values and call the operate function with 
//them. Don’t feel bad if it takes you a while to figure out the logic.