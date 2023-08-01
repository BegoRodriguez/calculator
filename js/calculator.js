
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

/*You should round answers with long decimals so that they don’t overflow the screen.
I will round to 4 decimals */
function round(num){
   return Math.round(num*100000)/100000;
};

/* A calculator operation will consist of a number, an operator, and another number. 
For example, 3 + 5. Create three variables for each of the parts of a calculator operation. 
Create a variable for the first number, the operator, and the second number. You’ll use these variables 
to update your display later. */

let operation = {};

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
      case '=':
         return num1;
      default:
         return "error";
   }
}

/* Create the functions that populate the display when you click the number buttons. 
You should be storing the ‘display value’ in a variable somewhere for use in the next step. */
const display = document.querySelector('#display');
const decimal = document.querySelector('#decimal');

let aux = "";

/* Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. 
Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. 
It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)*/
function checkDecimal() {
   if (aux.includes(".")){
      decimal.setAttribute("disabled", "disabled");
      return true;
   }
   
   else {
      decimal.removeAttribute("disabled");
      return false;
   }
}

const number = document.querySelectorAll('.number');
number.forEach(button=>button.addEventListener('click', function(e) {
   checkDecimal();
   aux = aux + this.value;
   display.textContent = round(parseFloat(aux));
}));

/* Make the calculator work! You’ll need to store the first number that is input 
into the calculator when a user presses an operator, and also save which operation 
has been chosen and then operate() on them when the user presses the “=” key. */

const operator = document.querySelectorAll('.operator');
operator.forEach(button=>button.addEventListener('click', function(e) {

   checkDecimal();

   if (this.value === '.') {
      console.log("I pressed the point");
      if (!checkDecimal()){
         aux = aux + ".";
         display.textContent = aux;
      }
   }
   
   else if (!operation.hasOwnProperty("operator")){
       
      if (this.value !== '=') {
         if (aux !== ""){ // Not to allow to crash after they tried to divide by zero
            operation.num1 = parseFloat(aux);
            aux = "" ; 
            operation.operator = this.value;
         }
      }
      
   }
   
   else {
      if (aux !== ""){
         operation.num2 = parseFloat(aux);

         /* Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator! */
         if ((operation.num2 === 0) && (operation.operator === '/')){
            display.textContent = "Good Try!";
            operation = {};
            aux = "";
         }
         else {
            let result = operate(operation.operator,operation.num1,operation.num2);
            display.textContent = round(result);
            aux = "" +result;  
            
            // I should clean the object and prepare for next operation
            operation = {};
         
            if (this.value !== "=") {
               operation.num1 = parseFloat(aux);
               operation.operator = this.value;
               aux = "";
            };
         }
        
      }
   }

}));

/* Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear" */
const clean = document.querySelector('#clean');
clean.addEventListener('click', function(e) {
   operation = {};
   aux = "";
   display.textContent = 0;
   decimal.removeAttribute("disabled");
});

const cleanOne = document.querySelector('#cleanOne');
cleanOne.addEventListener('click', function(e) {
   aux = aux.slice(0,aux.length-1);
   display.textContent = aux;
});

