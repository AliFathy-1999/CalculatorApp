let InputPlace= document.querySelector("#Inputvalue");
let mybtn = document.querySelectorAll("button");
let InputDot= document.getElementById("dot");
let clear =document.getElementById("clear-btn");
let FirstValue = 0;
let OperatorValue = '';
let NextValue = false;

var audio = new Audio("/Calculator JS Project1/Click on the calculator buttons.mp3");

function sendNumbers(Numbers){
    // Replace current display value if first value is entered
if(NextValue){
    InputPlace.textContent = Numbers;
    NextValue = false;
}else{
    // If current display value is 0, replace it, if not add number to display value
    let inputValue = InputPlace.textContent; 
    InputPlace.textContent = inputValue === '0' ? Numbers: inputValue + Numbers ;
}
}
function AddDecimal(){
    // If operator pressed, don't add decimal
    if(NextValue)
    return;
    // If no decimal, add one
    if(!InputPlace.textContent.includes(".")){
        InputPlace.textContent = `${InputPlace.textContent}.`;
    }
}
// Calculate first and second values depending on operator
let calculate = {
    '+': (firstNum, secondNum) => firstNum + secondNum,
  
    '-': (firstNum, secondNum) => firstNum - secondNum,
  
    '*': (firstNum, secondNum) => firstNum * secondNum,
  
    '/': (firstNum, secondNum) => firstNum / secondNum,
  
    '=':(firstNum, secondNum) => secondNum,
  };
function AddOperator(operator){
    let currentValue = Number(InputPlace.textContent);
    // Prevent multiple operators
    if(OperatorValue && NextValue){
    OperatorValue = operator;
        return;
    }// Assign firstValue if no value
    if(!FirstValue){
        FirstValue = currentValue;
    }else{
        let calculation = calculate[OperatorValue](FirstValue,currentValue);
        FirstValue = calculation;
        InputPlace.textContent = calculation;
    }// Ready for next value, store operator
    NextValue = true;
    OperatorValue = operator;
}
// Add Event Listeners for numbers, operators, decimal
mybtn.forEach((btn)=>{
    if(btn.classList.length === 0){
        btn.addEventListener("click", ()=> sendNumbers(btn.value));
    }
    else if(btn.classList.contains('operator')){
        btn.addEventListener("click", ()=> AddOperator(btn.value)); 
    }else if(btn.classList.contains('dot')){
        btn.addEventListener("click", ()=> AddDecimal()); 
    }
    //If the user clicked on button , click sound is happened 
    btn.onclick = function() {
        audio.play();
      }
});
// Reset all values, display
clear.onclick = ()=>{
    FirstValue = 0;
    OperatorValue = '';
    NextValue = false;    
    InputPlace.textContent = FirstValue;
}
