//Create Calculator class - put a constructor that takes all the inputs and fundtions for the calculator. Takes previous and current operand elements.
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
      }

      //defininig functions

      clear () {

      }

      delete () {

      }

      appendNumber (number) {

      }

      compute () {

      }

updateDisplay() {

}

}

//Our constant variables
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data--current-operand]')
