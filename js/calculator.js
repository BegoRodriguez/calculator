
/* start by creating functions for the following items and testing them in your browser’s console. */
function add(num1, num2){
   return num1+num2;
}

function substract(num1, num2){
   return num1-num2;
}

function multiply(num1, num2){
   return num1*num2;
}

function divide(num1, num2){ // I will have to check for 0 outside
   return num1/num2;
}

/* A calculator operation will consist of a number, an operator, and another number. 
For example, 3 + 5. Create three variables for each of the parts of a calculator operation. 
Create a variable for the first number, the operator, and the second number. You’ll use these variables 
to update your display later. */

let firstNumber = 0.0;
let secondNumber = 0.0;
let operator = "";
let isSecondNumber = false;
let isSecondOperation = false;   /* I need this one to see if I am concatenating operations */

/* Create a new function operate that takes an operator and 2 numbers and then calls one of 
the above functions on the numbers. */
function operate(operator,num1,num2) {
   switch(operator){
      case '+':
         return add(num1,num2);
      case '-':
         return substract(num1,num2);
      case '*':
      case 'x':
         return multiply(num1,num2);
      case '/':
         return divide(num1,num2);
      default:
         return "error";
   }
}

/* Create the functions that populate the display when you click the number buttons. 
You should be storing the ‘display value’ in a variable somewhere for use in the next step. */
const number = document.querySelectorAll('.number');
const display = document.querySelector('#display');
//const smallDisplay = document.querySelector('#smallDisplay');

let aux = "";
number.forEach(button=>button.addEventListener('click', function(e) {
   aux = aux + this.value;
   display.textContent = aux;
}));

/* Make the calculator work! You’ll need to store the first number that is input 
into the calculator when a user presses an operator, and also save which operation 
has been chosen and then operate() on them when the user presses the “=” key. */
const operation = document.querySelectorAll('.operator');
operation.forEach(button=>button.addEventListener('click', function(e) {
  
   /* Si es la segunda operación no quiero tratarlo como un primer numero 
      Introduzco primer numero
      Se pulsa una operación (que es lo que ocurre aquí)
   */
    
   if (operator === ""){
      firstNumber = parseFloat(aux);
      aux = "";
      operator = this.value;
      display.textContent = firstNumber;
   } 
   
   else if (this.value === '='){
      secondNumber = parseFloat(aux);
      let result = operate(operator,firstNumber,secondNumber);
      display.textContent = result;
      aux = "" +result;  
      isSecondOperation = false;
   }
   else { 
      secondNumber = parseFloat(aux);
      let result = operate(operator,firstNumber,secondNumber);
      operator = this.value;
      isSecondOperation = true;
      display.textContent = result;
      
      /* I need to check if it is the second time that I am pressing an operation for concatenating right
      otherwise it kept adding numbers to result without operating */
      if (isSecondOperation) {
         firstNumber = result;
         aux="";
      }
      else {
         aux = ""+result;
      }
   }
   
}));

/* Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear" */
const clean = document.querySelector('#clean');
clean.addEventListener('click', function(e) {
   firstNumber = 0.0;
   secondNumber = 0.0;
   operator = "";
   aux = "";
   isSecondNumber = false;
   isSecondOperation = false;
   display.textContent = 0;
});

const cleanOne = document.querySelector('#cleanOne');
cleanOne.addEventListener('click', function(e) {
   aux = aux.slice(0,aux.length-1);
   display.textContent = aux;
});

