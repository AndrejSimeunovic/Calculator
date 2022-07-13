const btnNumbers = document.querySelectorAll("[data-number]");
const btnOperations = document.querySelectorAll("[data-operation]");
const btnEquals = document.querySelector("[data-equals]");
const btnAllClear = document.querySelector("[data-all-clear]");
const btnDelete = document.querySelector("[data-delete]");
let result = document.querySelector(".result");
let screen = document.querySelector(".screen");
let subValue = document.querySelector(".operator");

let operator = "";
let number;
let subResult;
let deleted = false;
let sub = [];
const selection = ["+", "-", "÷", "*"];
let operations = [];
let numPressed = false;
let numbers = [];

btnNumbers.forEach((button) => button.addEventListener("click", displayNbr));
btnOperations.forEach((button) => button.addEventListener("click", displayOp));
btnEquals.addEventListener("click", getEquals);
btnAllClear.addEventListener("click", clearAll);
btnDelete.addEventListener("click", deleteNbr);

function displayNbr(event) {
  let nbrClicked = event.target.innerText;
  checkOperation(nbrClicked);
}

function displayOp(event) {
  let a = result.innerText.split("");
  if (!result.innerText) {
    number = result.innerText;
    return;
  }
  if (selection.indexOf(a[a.length - 1]) !== -1) {
    return;
  }
  if (subResult) {
    number = subResult;
  }
  operator = event.target.innerText;
  operations.push(operator);
  result.innerText = result.innerText + operator;
}

function checkOperation(nbrClicked) {
  result.innerText = result.innerText + nbrClicked;
  if (!operator) {
    checkIfZeroBefore(nbrClicked);
    number = result.innerText;
  } else {
    checkIfZeroBefore(nbrClicked);
    updateResult();
  }
}

function checkIfZeroBefore(nbrClicked) {
  let array = result.innerText.split("");
  let a = array.slice(
    array.lastIndexOf(operations[operations.length - 1]) + 1,
    array.lastIndexOf(nbrClicked)
  );
  if (nbrClicked === "0" && (a[0] !== "0" || a.length === 0)) {
    return;
  }
  if (checkDot(array)) {
    let index = array.lastIndexOf(nbrClicked);
    if ((a[0] === "0" || a.length === 0) && array[index - 1]) {
      if (array[index - 1] === operator) {
        return;
      }
      let zeroIndex = index - 1;
      array.splice(zeroIndex, 1);
      result.innerText = array.join("");
    }
  }
}

function updateResult() {
  numbers.push(number);
  if (deleted) {
    number = numbers.pop();
  }

  beginOp();
  deleted = false;
}

function checkDot(array) {
  if (
    !array.includes(".") ||
    array.lastIndexOf(operator) > array.lastIndexOf(".")
  ) {
    return true;
  }
}

function getEquals() {
  let e = result.innerText.split(operator);
  let checkZ = e[e.length - 1];
  if (
    (+checkZ === 0 || checkZ === ".") &&
    operations[operations.length - 1] === "÷"
  ) {
    alert("You cannot divide by zero or dot");
    return;
  }
  result.innerText = subResult;
  subValue.innerText = "";
  number = subResult;
  operator = "";
  subResult = "";
}

function clearAll() {
  console.clear();
  result.innerText = "";
  subValue.innerText = "";
  subResult = "";
  number = "";
  operator = "";
  sub = [];
  operations = [];
  numbers = [];
}

function deleteNbr() {
  let arr = result.innerText.split("");
  if (!operator) {
    result.innerText = result.innerText.slice(0, -1);
    return;
  }
  if (arr.length === 1) {
    clearAll();
    return;
  }
  if (selection.indexOf(arr[arr.length - 1]) !== -1) {
    result.innerText = result.innerText.slice(0, -1);
    operations.pop();
    numbers.pop();
    number = numbers[numbers.length - 1];
    beginOp();
    deleted = false;
  } else {
    deleted = true;
    result.innerText = result.innerText.slice(0, -1);
    updateResult();
  }
}

function beginOp() {
  let secondNbr = result.innerText.split(operator).pop();
  subResult = operate(number, secondNbr, operator);
  sub.push(subResult);
  subValue.innerText = subResult;
}

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
  a = +a;
  b = +b;
  let result;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = substract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "÷":
      result = divide(a, b);
      break;

    default:
      break;
  }
  return result;
}

// function checkIfZeroBefore(nbrClicked) {
//   let array = result.innerText.split("");
//   if (checkDot(array)) {
//     let index = array.lastIndexOf(nbrClicked);
//     if (array[index - 1] === "0") {
//       let zeroIndex = index - 1;
//       array.splice(zeroIndex, 1);
//       result.innerText = array.join("");
//     }
//   }
// }

// function updateBackwards() {
//   let arr = result.innerText.split("");
//   if (arr.length === 1) {
//     clearAll();
//     return;
//   }
//   if (selection.indexOf(arr[arr.length - 1]) !== -1) {
//     console.log("if1: " + "\n---------");
//     operations.pop();
//     number = subResult;

//     console.log("sub1: " + subResult);
//   } else if (
//     sub.length === 1 &&
//     selection.indexOf(arr[arr.length - 1]) === -1
//   ) {
//     console.log("if2: " + "\n---------");
//     sub.pop();
//     subValue.innerText = "";
//     subResult = subValue.innerText;
//     number = subResult;
//     console.log("sub2: " + subResult);
//   } else if (sub.length > 1) {
//     console.log("if3: " + "\n---------");
//     sub.pop();
//     subValue.innerText = sub[sub.length - 1];
//     subResult = subValue.innerText;
//     number = subResult;
//     console.log("sub3: " + subResult);
//   } else {
//     console.log("else: " + "\n---------");
//     subValue.innerText = "";
//     console.log("sub4: " + subResult);
//     result.innerText = result.innerText.slice(0, -1);
//     number = result.innerText;
//     return;
//   }
//   //console.log("numberrrrrr: " + number);
//   result.innerText = result.innerText.slice(0, -1);
//   console.log("subafter: " + sub);
//   if (!number) {
//     number = result.innerText.split(operator).join("");
//     subResult = number;
//   }
//   deleted = true;
//   console.log("numberrrrrr: " + number);
// }
