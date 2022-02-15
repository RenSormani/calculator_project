//Create Calculator class - put a constructor that takes all the inputs and fundtions for the calculator. Takes previous and current operand elements.
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
    
    //defining functions

    // In the clear function, need to remove all values
    // ie.currentOperand, previousOperand and operation, defaulting first two to empty strings and Op to undefined
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    // take current operand and set it equal to currentoperand convert to string use slice to delete the last digit
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
//convert currentOperand and number to Strings so it's easy to append numbers instead of "adding" numbers
// Only allow one decimal point to be added or if it includes a decimal point, simply return
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
//Set the operation. Recycle the current value to the previous operand and type in a new value
// If currentOperand is equal to an empty string set to return. If previous Operand doesn't eayal empty string, then compute
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
// Set the variables computation, prev and current (converting strings to numbers). If the user presses = with no number, we want a return that cancels the function
// Add if statements using switch for the operations. so set computation variable to prev and current with desired operation
// add else statement defined as default - so if other values aren't executed set return for nothing returned
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '×':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
// Outside the switch statement set currentOperand to the result of the computation, the operation to undefined, and previous operand to empty string.
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    // this function returns number but converted to the display value
    // convert number to a string so we can split string from the decimal character
    // Get integer numbers, convert to string and split from the decimal point. Turns into an array. Get first part of array.
    // With decimal digits we want 2nd portion of the array ie numbers after the decimal point
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]

       // If integers isn't a number then display to empty string. But if a value is entered, use Locale String(english) and maximumfractiondigits ensures no more decimals after the first decimal.
       //If theere are decimal digits concatanate integerDisplay and decimalDigits
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    // If the operation isn't equal to null then it makes the previous operand concatenate with the operation
    // else sets previousoperand to an empty string when presses equals
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  //Our constant variables
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  const firstLastSquares = document.querySelectorAll(".span-two")

  //create a calculator and pass everything from the constructor into it (ie the previousOperand and currentOperand text elements)
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  //select numberButtons and add forEach and event listeners to make buttons add number of whatever is in the innerText of the buttons and relay to display.
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  //select operationButtons and add forEach and event listeners to make buttons add operation of whatever is in the innerText of the buttons and relay to display.
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  //equals function calls the compute function and update display
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  //allClear function calls the clear function and update display
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
//delete function calls the clear function and update display
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })

//makes the AC and = squares orange
 firstLastSquares.forEach((square) => {
    square.style.backgroundColor = "orange";
  });