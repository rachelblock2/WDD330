// Truthy Falsy Practice

// * "" // double quoted empty string literal
// * '' // single quoted empty string literal
// * `` // empty template literal
// * 0
// * -0 // considered different to 0 by JavaScript!
// * NaN
// * false
// * null
// * undefined

// use !! to find out if value is truthy or falsy

let a = 0; // declare the variable a and assign the value of 0
// 0
false && (a = 1); // (a = 1) is truthy, but it won't be evaluated, since the first operand is false
// false
a // the value of a is still 0
// 0
false || (a = 1); // this will evaluate both operands, so a will be assigned the value of 1, which is returned
// 1

let myName = "" //This value is falsy

if (myName) { //If myName is true/has a value
    console.log(myName)
} else if (!myName) {
    console.log("Name doesn't exist in Javascript file")
}

// Local Storage Practice

let age = 53;

localStorage.setItem("age", age);

if (localStorage.getItem("age")) {
    let yourAge = localStorage.getItem("age");
    console.log(yourAge);
}

// Chapter 2 Notes
Number.isInteger(3.142); //Returns false

5..toExponential(); //Returns 5e+0

const PI = 3.1415926;
PI.toFixed(3); //Returns 3.142

/* NaN is an error value that is short for "Not a Number". 
It is used when an operation is attempted and the result 
isn’t numerical, like if you try to multiply a string by a number, for example: */

'hello' * 5; //Returns NaN

Number('23');
String(3)

// Undefined is the value given to declared variables that have not been assigned a value. 
// Null means 'no value'. It can be thought of as a placeholder that JavaScript uses to say "there should be a value here, but there isn’t at the moment."

10 + null; // null behaves like zero
10 + undefined; // undefined is not a number

Number.isNaN(NaN);
//true
Number.isNaN(5);
//false


// Object Practice

// let student1 = {
//     firstName: "Rachel",
//     lastName: "Lofgran",
//     iNumber: "9587065"
// }

// let student2 = {
//     firstName: "Scott",
//     lastName: "Collier",
//     iNumber: "3928475"
// }

// log(student1.firstName);

// // let firstName = "Rachel"
// // let lastName = "Lofgran"
// // let iNumber = "9587065"

// // log(firstName)

// let students = [];

// students.push(student1)
// students.push(student2)

// function log(variableName) { //Hoisting: all functions are loaded before code read top to bottom
//     console.log(variableName)
// }

// localStorage.setItem("students", JSON.stringify(students)); //Turns objects into JSON so it's portable and readable in the console

let students = []

if (localStorage.getItem("students")) {
    students = (JSON.parse(localStorage.getItem("students")));
}

let student3 = {
    firstName: "Bill",
    lastName: "Squires",
    iNumber: "3029384"
}

students.push(student3)
console.log(students);

// Code for HTML page

function getName() {
    let name = document.querySelector("input").value; //Similar to how CSS selects the tag, but only selects first one
    let outputDiv = document.querySelector("#output");
    outputDiv.textContent = name;
}

// Instead of doing "onclick" in HTML, do this

let button = document.querySelector("button");
// button.addEventListener("click", (e) => {
//     e.preventDefault();
// })

button.addEventListener("click", getName) //Don't add parantheses if you don't want it to execute when the page loads




// Chapter 3 notes

let myArray = []
myArray[0] = 'Superman';
myArray[0] = 'Batman';
myArray[1] = 'Wonder Woman';
myArray[2] = 'Flash';
myArray[5] = 'Aquaman';
// ['Batman', 'Wonder Woman', 'Flash', undefined, undefined, 'Aquaman']
delete myArray[3]; //Removes value at index and replaces with undefined, same as changing length
myArray.pop // Removes last item
myArray.shift //Removes first item
myArray.push //Adds new item on end
myArray.unshift //Adds new item on beginning
myArray.concat(['Hulk','Hawkeye', 'Black Widow']); //Reassigns array with additional values
myArray = [ ...myArray, ...['Hulk','Hawkeye', 'Black Widow'] ];
myArray.join();
myArray.slice(2,4) //Starts at index 2 and finishes at fourth (fourth index not included), non-destructive
myArray.splice(3, 1, 'Scarlett Witch') //Removes one item, at index 3, replaces with new string (can remove 0 items as well), destructive
myArray.reverse();
myArray.sort(); //Alpha order
myArray.includes('Iron Man')
myArray.indexOf('Wonder Woman')

const [x,y] = [1,2];

for (let i=0, max=myArray.length; i < max; i++) { //Using max saves time and speed
    console.log(myArray[i])
}


const list = new Set([1,2,3]);
list.add(1); //Use for words, otherwise words will be broken into individual letters
// list.size();
list.has('Captain America') //Delete and clear too
// Can loop over set, but not weak set. No duplicate values

// Convert sets into arrays, these methods work for maps too
const newList = [...list]
const newerList = Array.from(list);

// Weak sets and weak maps garbage collect references to dead objects, cannot add primitive datatypes to it

// Maps work like dictionaries
// romanNumerals.set(1, 'I'); //Use get with the key to find the value


// for (const key of romanNumerals.keys()) { // Or values
//     console.log(key)
// }

const n = 5
n > 2 ? console.log('N is greater than 2') : console.log('N is less than 2') // ternary operator
// Also if else, switch, do while(does at least once, repeats upon correct condition), and while statements available


// Chapter 4 notes

// Function declaration
function hello(){
    return 'Hello you!'
}

// Function Expression (assign to a variable)
const newFunction = function() {
    // DO STUFF
}; //This must have a semicolon since not a block

// Use () to call function, no () to assign to new variable or just reference it
const message = hello() //'Hello you!'

// If parameter not provided as argument, function called, but parameter undefined
// If extra arguments, they will be ignored

// GOOD

function arguments() { //Array like object with every function, but no methods like slice, join, forEach, etc.
    return arguments;
}

arguments('hello', NaN); // Returns index and content

// BETTER
function rest(...args) { //Actual array, and allows for acceptance of any number of values for iteration
    return args;
}

// Default parameters
function greeting (saying=`How are you?`) {
    console.log(`Hello! ${saying}`)
}

greeting() //No argument, uses default parameter. Default parameters always should come after non-default parameters

// Arrow functions
const yourName = (name) => console.log(name) //No parameters, use () still

// Callbacks. Better to use separate functions instead

function sing(song, callback) {
    console.log(`It's still rock and roll to me is a great ${song}.`)
    callback(); //Links to the dance function because it was passed in
}

if (typeof(callback) === `function`) {
    callback();
}

function dance() {
    console.log(`Dancing every single day`)
}

sing('Billy Joel', dance); //The dance function is called through the sing function so both will show
// Shows both console logs of sing and dance


function numerically(a,b) {
    return a-b;
}

[1,3,12,5,23,18,7].sort(numerically);

myArray.forEach((hero, index) => console.log(`Hero at position ${index} is ${hero}`));

const square = x => x*x;

let numberList = [1,2,3]
numberList.map(square) //Different from forEach because it returns a new array with the previous values replaced by the calculations

// Using map with anonymous functions
numberList.map(x => 2 * x);
[`red`,`green`,`blue`].map(color => `<p>${color.toUpperCase()}</p>`); //Could also have index and array as parameters

//Reduce
// [1,2,3,4,5].reduce((currentTotal, currentValue) => prev + currentValue); //15

const sentence = `The quick brown fox jumped over the lazy dog.`
const words = sentence.split()
const total = words.reduce((currentTotal, word) => currentTotal + word.length, 0)
const avg = total/words.length;

const moreNumbers = [2,7,6,5,11,23,12]
moreNumbers.filter(x => x%2 === 0); //Is the number even?

moreNumbers.filter(x => !x) //Finds all falsy values

// Complex combination of iterators

// 1. Returns new array of squared values [1,4,9]. 2. "reduces" the new array to just one number by adding everything together 
numberList.map(x => x*x).reduce((currentTotal, x) => currentTotal + x);

// Final update of current book quiz

// const quiz = [
//     [`What is Superman's real name?`, `Clark Kent`]
//     [`What is Wonder Woman's real name?`, `Diana Prince`]
//     [`What is Batman's real name?`, `Bruce Wayne`]
// ]

// function start(quiz) {
//     let score = 0

//     for (const [question, answer] of quiz) {
//         const response = ask(question)
//         check(response, answer);
//     }
//     // End of main game loop

//     gameOver();

//     // Function declarations
//     function ask(question){
//         return prompt(question);
//     }

//     function check(response, answer) {
//         if (response === answer) {
//             alert(`Correct`)
//             score++
//         } else {
//             alert(`Wrong! The correct answer was ${answer}.`)
//         }
//     }

//     function gameOver() {
//         alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
//     }
// }

// start(quiz);