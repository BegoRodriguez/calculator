
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

let firstNumber = "";
let secondNumber = "";
let operator = "";

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