// Chapter 11: Further Functions

// Functions - 1st class objects, properties and methods included
// Custom = square.description = 'Squares a number'
function square(x) {
    return x*x;
}

square.length //1

// Call() - set value of 'this' to object inserted in as 1st argument, more parameters passed in secondly
function sayHello(greeting='Hello'){
    return `${ greeting }, my name is ${ this.name }`;
}

const clark = { name: 'Clark' };
const bruce = { name: 'Bruce' };

sayHello.call(clark, 'How do you do');
// 'How do you do, my name is Clark'
sayHello.call(bruce);
//  'Hello, my name is Bruce'

// If a function doesn’t refer to an object as this in its body, 
// it can still be called using the call() method, 
// but you need provide null as its first argument.

square.call(null, 4) //.apply passes in arguments as [4]
// 16

// Memoization - stores results so huge computations don't need repetition
function square(x){
    square.cache = square.cache || {};
    if (!square.cache[x]) {
        square.cache[x] = x*x;
    }
    return square.cache[x]
}

// Immediately Invoked Function Expression– IIFE – anonymous function invoked as soon as defined.
// Helpful bc temp variable, no messy scope
(function(){
    const temp = 'World';
    console.log(`Hello ${temp}`);
    })();
    //  'Hello World'

// Destructuring
let [a,b] = [1,2];
[a,b] = [b,a];

// Useful for setup, or for 'use strict' wrapped around your code
{ // Or could use (function() {
    const name = 'Peter Parker'; // This might be obtained from a cookie in reality
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday', 'Friday','Saturday'];
    const date = new Date(),today = days[date.getDay()];
    console.log(`Welcome back ${name}. Today is ${today}`);
} //})()
//  'Welcome back Peter Parker. Today is Tuesday'

// Just simply place into blocks instead
(function() {
    // block A
    const name = 'Block A';
    console.log(`Hello from ${name}`);
    }());

(function() {
    // block B
    const name = 'Block B';
    console.log(`Hello from ${name}`);
}());
// Hello from Block A
// Hello from Block B

// Functions redefining themselves
// Properties are lost when function is redefined
function party(){
    console.log('Wow this is amazing!'); //1st time run
    party = function(){
        console.log('Been there, got the T-Shirt'); //Any times after
    }
}

function party(){
    console.log('Wow this is amazing!');
    party = function(){
        console.log('Been there, got the T-Shirt');
    }
}

const beachParty = party; // note that the party function has not been invoked

beachParty(); // the party() function has now been redefined, even though it hasn't been called explicitly
// 'Wow this is amazing!'

party(); 
//  'Been there, got the T-Shirt'

beachParty(); // but this function hasn't been redefined
// 'Wow this is amazing!'

beachParty(); // no matter how many times this is called it will remain the same
// This is because the original function is assigned to a variable, 
// then within the function, a variable with the same name as the function is assigned to a different function.
// 'Wow this is amazing!'

function party() {
    console.log('Wow this is amazing!');
    party = function(){
    console.log('Been there, got the T-Shirt');
    }
}
party.music = 'Classical Jazz'; // set a property of the function
party();
// "Wow this is amazing!"
party.music; // function has now been redefined (redefined inside function with no properties), so the property doesn't exist
// undefined

// Useful for feature detection
function ride(){
    if (window.unicorn) { //If this feature exists, redefine the function
        ride = function(){
        // some code that uses the brand new and sparkly unicorn methods
        return 'Riding on a unicorn is the best!';
        }
    } else {
        ride = function(){ //If not, redefine the function to this
        // some code that uses the older pony methods
        return 'Riding on a pony is still pretty good';
        }
    }
    return ride();
}

// Recursive Function - invokes itself until a certain condition is met

// Pass 5 in, returns 5 * (4), passes in 4, and keeps going down until 0
function factorial(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

// Collatz Conjecture - number even? / 2, number odd? * 3 + 1, ends with 4,2,1 forever
function collatz(n, sequence=[n]) {
    if (n === 1){
        return `Sequence took ${sequence.length} steps. It was ${sequence}`;
    }
    if (n%2 === 0) {
        n = n/2;
    } else { 
        n = 3*n + 1;
    }
    return collatz(n,[...sequence,n]);
}

collatz(18);
//  'Sequence took 21 steps. It was 18,9,28,14,7,22,11,34,17,52,26,13,40,20,10,5,16,8,4,2,1'

// Event Driven Asynchronous Programming
// Instead of waiting for an event to occur, a callback can be created that’s invoked when the event happens.

function wait(message, callback, seconds){
    setTimeout(callback,seconds * 1000);
    console.log(message);
}

function selfDestruct(){
    console.log('BOOOOM!');
}

wait('This tape will self-destruct in five seconds ... ', selfDestruct, 5);
console.log('Hmmm, should I accept this mission or not ... ?');
// 'This tape will self-destruct in five seconds ... '
// 'Hmmm, should I accept this mission or not ... ? ' //Control handed back to program
// 'BOOOOM!' //After 5 seconds, callback is retrieved and revoked

// Even if 0 seconds, current execution stack executes first


// Callback heck - nested callbacks = spaghetti code
// login(userName, function(error,user) {
//     if(error){ //error first callback style
//         throw error;
//     } else {  
//         getPlayerInfo(user.id, function(error,info){
//         if(error){
//         throw error;
//         } else {
//             loadGame(info, function(error,game) {
//                 if(error){
//                         throw error;
//                     } else {
//                     // code to run game
//                 }
//             });
//         }
//         });
//     }
// });

// A better way 
// login(userName)
// .then(user => getPlayerInfo(user.id))
// .then(info => loadGame(info))
// .catch(throw error)

// Promises and Asynchronous Operations

// Promise - future result of an asynchronous operation, simplification of callback heck

// Pending - promise while operation is taking place, unsettled
// Completed - promise is settled, resolved or rejected


// const promise = new Promise( (resolve, reject) => {
//     // initialization code goes here
//     if (success) {
//         resolve(value);
//     } else {
//         reject(error);
//     }
// });

const dice = {
    sides: 6,
    roll() {
        return Math.floor(this.sides * Math.random()) + 1;
    }
}

const promise = new Promise( (resolve,reject) => {
    const n = dice.roll();
    setTimeout(() => {
        (n > 1) ? resolve(n) : reject(n);
    }, n*1000);
});

// .then has 2 args, 1st if promise calls the resolved function, 2nd if promise calls the rejected function
promise.then( 
    result => console.log(`Yes! I rolled a ${result}`), 
    result => console.log(`Drat! ... I rolled a ${result}`) 
);

// Or use try/catch
// promise.then( 
//  result => console.log(`I rolled a ${result}`) )
//  .catch( result => console.log(`Drat! ... I rolled a ${result}`) );

// const dice = {
// sides: 6,
//     roll() {
//         return Math.floor(this.sides * Math.random()) + 1;
//     }
// }
// console.log('Before the roll');
// const roll = new Promise( (resolve,reject) => {
//     const n = dice.roll();
//     if(n > 1){
//         setTimeout(()=>{resolve(n)},n*200);
//     } else {
//         setTimeout(()=>reject(n),n*200);
//     }
// });
// roll.then(result => console.log(`I rolled a ${result}`) )
// .catch(result => console.log(`Drat! ... I rolled a ${result}`) );
// console.log('After the roll');


// Async Functions, asynchronous functions in synchrony, awaits for line of code to execute before moving to the next
// async function loadGame(userName) {
//     try {
//         const user = await login(userName);
//         const info = await getPlayerInfo (user.id);
//         // load the game using the returned info
//     }
//     catch (error){
//         throw error;
//     }
// }

function random(a,b,callback) {
    if (b === undefined) b = a, a = 1; // if only one argument is supplied, assume the lower limit is 1
        const result = Math.floor((b-a+1) * Math.random()) + a
    if(callback) {
        result = callback(result);
    }
    return result;
}

function square(n) {
    return n*n;
}

random(1,10,square);
// 49

// Functions that return functions
function returnHello() {
    console.log('returnHello() called');
    return function() { //To make use of this function, assign it to a new variable
        console.log('Hello World!');
    }
}
returnHello();
const hello = returnHello();

// Invoke by adding ()
hello();

function greeter(greeting = 'Hello') {
    return function() {
        console.log(greeting);
    }
}

// Custom greetings based on basic function
const englishGreeter = greeter(); //No greeting, so default 'hello'
englishGreeter();
//  Hello

const frenchGreeter = greeter('Bonjour');
frenchGreeter();
// Bonjour

const germanGreeter = greeter('Guten Tag');
germanGreeter();
// Guten Tag



// Closures - Accessing/keeping alive variables with function scope outside of function
function outer() {
    const outside = 'Outside!';
    function inner() { //This has access to outside variable
        const inside = 'Inside!';
        console.log(outside);
        console.log(inside);
    }
    console.log(outside);
    inner();
}

function outer() {
    const outside = 'Outside!';
    function inner() {
        const inside = 'Inside!';
        console.log(outside);
        console.log(inside);
    }
    return inner; //Allows access to variables in inner function outside out function scope when assigned to variable
}

const closure = outer();


// function closure() {
//     const a = 1.8;
//     const b = 32;
//     return c => c * a + b; //Still has access to these vars after function scope end
// }

// const toFahrenheit = closure(); //Value of return, aka the function and the a and b vars
// toFahrenheit(30);
// // 86

// How to change variables in a closure
function counter(start){
    let i = start;
    return function() {
        return i++;
    }
}

const count = counter(1); //Now when count() is invoked, increases i by 1


// Generator Functions
function* exampleGenerator() {
    // code for the generator goes here
}

// Calling a generator function doesn’t actually run any of the code in the function; 
// it returns a Generator object that can be used to create an iterator that implements a next() method 
// that returns a value every time the next() method is called.

function* fibonacci(a,b) {
    let [ prev,current ] = [ a,b ];
    while(true) {
        [prev, current] = [current, prev + current];
        yield current; //Difference from yield bc it saves value and 'stops' function until next called again
    }
}

const sequence = fibonacci(1,1); //Inherits the 'next()' method
sequence.next();
// 2
sequence.next();
// 3
sequence.next();
// 5

for (n of sequence) {
    // stop the sequence after it reaches 100
    if (n > 100) break;
    console.log(n);
}
// << 8
// << 13
// << 21
// << 34
// << 55
// << 89


// Pure Functions
// - Only depends on parameters and local scope vars, not elsewhere in program
// - Non-destructive data transformations and returns new values, doesn't change values or data anywhere else
// - Always return same result with same args
// - At least 1 arg
// - Return value

// Example

function reverse(string) {
    return string.split('').reverse().join('');
}

const message = 'Hello JavaScript';
reverse(message);
// 'tpircSavaJ olleH'
message // hasn't changed
// 'Hello JavaScript'


// Impure function
// let number = 42;
// let result = 0;
// function impureAdd(x) {
//     result = number + x; //Requires var that is not arg outside of scope, also changes var outside of scope, and same args passed in again = different result
// }
// impureAdd(10);
// result;
// // 52

// Refactored
const number = 42;
function pureAdd(x,y) {
    return x + y; //Outside vars not changed, same vars passed in = same result
}
result = pureAdd(number,10);
// 52


// Another example
function hypotenuse(a,b) {
    return Math.sqrt(square(a) + square(b));
}
hypotenuse(3,4);
// 5

function sum(array, callback) {
    if(callback) {
        array = array.map(callback);
    }
    return array.reduce((a,b) => a + b );
}

sum([1,2,3]); // returns 1 + 2 + 3
// 6

sum([1,2,3], square); // returns 1^2 + 2^2 + 3^2
// 14


// Higher Order Functions - accept another function as an argument, or return another function as a result, or both.

// Generic Function that returns a more specific function by closure around args to keep them 'alive'
function multiplier(x){
    return function(y){
        return x*y;
    }
}

doubler = multiplier(2);
doubler(10); //20
tripler = multiplier(3);
tripler(10); //30


function power(x) {
    return function(power) {
        return Math.pow(x,power);
    }
}

twoExp = power(2); //powers of 2
// function (power) {
    // return Math.pow(x,power);
// }
twoExp(5);
// 32

// Example of a curry function
power(3)(5); //Returns a function, an arg is immediately passed to it
// 243


// Currying
// Not all arguments have been supplied to the function, so it returns another function that retains the arguments already provided
// Expects the remaining arguments that were omitted when the original function was called
// A final result is only returned once all the expected arguments have eventually been provided

// Currying multiplier function
function multiplier(x,y) {
    if (y === undefined) {
        return function(z) { //Parameter passed in after function is returned and assigned to var
        return x * z;
        }
    } else {
        return x * y;
    }
}

calcTax = multiplier(0.22);
//  function (z){
    // return x * z;
// }

calcTax(400);
// 88

// General Curry function

function curry(func,...oldArgs) {
    return function(...newArgs) {
        const allArgs = [...oldArgs,...newArgs];
        return func(...allArgs);
    }
}

const divider = (x,y) => x/y;
divider(10,5);
// 2
const reciprocal = curry(divider,1);
reciprocal(2);
// 0.5