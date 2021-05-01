function printInput() {
    let userInput = document.querySelector("#aNumber").value
    document.querySelector("#output").innerHTML += `<p>${userInput}</p>`
}

function sumNumber() {
    let userInput = document.querySelector("#aNumber").value
    totalNum = 0
    for (let num = 0; num <= userInput; num++) {
        totalNum = totalNum + num
        
    }
    document.querySelector("#output").innerHTML += `<p>${totalNum}</p>`
}

function addNumbers(){
    let userInput = document.querySelector("#aNumber").value
    let secondInput = document.querySelector("#a2ndNumber").value
    document.querySelector("#output").innerHTML += `<p>${parseInt(userInput) + parseInt(secondInput)}</p>`
}

function subtractNumbers(){
    let userInput = document.querySelector("#aNumber").value
    let secondInput = document.querySelector("#a2ndNumber").value
    document.querySelector("#output").innerHTML += `<p>${parseInt(userInput) - parseInt(secondInput)}</p>`
}

function multiplyNumbers(){
    let userInput = document.querySelector("#aNumber").value
    let secondInput = document.querySelector("#a2ndNumber").value
    document.querySelector("#output").innerHTML += `<p>${parseInt(userInput) * parseInt(secondInput)}</p>`
}

function divideNumbers(){
    let userInput = document.querySelector("#aNumber").value
    let secondInput = document.querySelector("#a2ndNumber").value
    document.querySelector("#output").innerHTML += `<p>${parseInt(userInput) / parseInt(secondInput)}</p>`
}
  

let button = document.querySelector("#range")
button.addEventListener("click", sumNumber)

let buttonPrint = document.querySelector("#print")
buttonPrint.addEventListener("click", printInput)

let buttonAdd = document.querySelector("#add")
buttonAdd.addEventListener("click", addNumbers)

let buttonSubtract = document.querySelector("#subtract")
buttonSubtract.addEventListener("click", subtractNumbers)

let buttonMultiply = document.querySelector("#multiply")
buttonMultiply.addEventListener("click", multiplyNumbers)

let buttonDivide = document.querySelector("#divide")
buttonDivide.addEventListener("click", divideNumbers)