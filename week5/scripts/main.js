// Chapter 10: Testing and Debugging

// Exception: an error that produces a return value that can then be used by the program to deal with the error
// unicorn();

// Stack traces work backward to identify the original function/method that started the sequence

// Warning: can occur if there’s an error in the code that isn't enough to cause the program to crash
pi = 3.142;
// JavaScript Warning: assignment to undeclared variable

'use strict';
// Placing 'use strict' at the beginning of a file will enforce strict mode on all the JavaScript in the file.

// JS Lint,JS Hint,and ES Lint test for quality

// Using feature detection to avoid exceptions
if (window.holoDeck) {
    virtualReality.activate();
}

// Alerts
function amIOldEnough(age){
    if (age = 12) { //bug here
        alert(age);
        return 'No, sorry.';
    } else if (age < 18) {
        return 'Only if you are accompanied by an adult.';
    }
    else {
        return 'Yep, come on in!';
    }
}

console.trace(); //interactive stack trace
debugger; //breakpoint

// Error Objects, can use args to customize
const error = new Error('Oops, something went wrong');

// EvalError - not used in the current standards, only for backwards compatibility.
// RangeError - a number is outside an allowable range of values.
//  ReferenceError - reference is made to an item that doesn’t exist. For example, calling a function that hasn't been defined.
//  SyntaxError - error in the code’s syntax.
//  TypeError - error in the type of value used; for example, a string is used when a number is expected.
//  URIError - problem encoding or decoding the URI.
//  InternalError - non-standard error, when error occurs in the JavaScript engine. A common cause of this too much recursion.
// Properties - name, message, stack(not safe for prod)

// throw halts program
// throw 2;
// throw 'Up';
// throw { toys: 'out of pram' };
// throw new ReferenceError('Something has gone badly wrong!'); //best

// Try, catch and finally
function imaginarySquareRoot(number) {
    'use strict';
    try {
        return String(squareRoot(number));
    } catch(error) { //Only works if error thrown
        return squareRoot(-number)+'i';
    } finally { //Always executed after try or catch block
        return `+ or - ${answer}`;
    }
}


// Tests and test driven development
function itSquareRoots4() {
    return squareRoot(4) === 2; //Returns correct number? This should return true
}

// Write tests (that initially fail)
// Write code to pass the tests
// Refactor the code
// Test refactored code
// Write more tests for new features