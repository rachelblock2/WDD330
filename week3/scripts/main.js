// Calling a method

let user = {
    name: "John",
    age: 30
};

user.sayHi = function() {
alert("Hello!");
};

user.sayHi(); // Hello!


// these objects do the same
user = {
    sayHi: function() {
      alert("Hello");
    }
  };
  
  // method shorthand looks better, right?
  user = {
    sayHi() { // same as "sayHi: function(){...}"
      alert("Hello");
    }
  };


// Using "this" in methods
  let user = {
    name: "John",
    age: 30,
  
    sayHi() {
      // "this" is the "current object"
      alert(this.name); //Use "this" instead of saying "user.name", as could be problems if "user" is reassigned to a new variable
    }
  
  };
  
  user.sayHi(); // John


// "this" is not bound

let user = { name: "John" };
let admin = { name: "Admin" };

// When a function is declared, it may use this, but that this has no value until the function is called.
function sayHi() {
  alert( this.name ); //"this" is not referencing the sayHi function, rather the object that is passed in (user or admin)
}

// use the same function in two objects
// Assigning the functions
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
// Calling the functions
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)

/* If you come from another programming language, then you are probably used to the 
idea of a "bound this", where methods defined in an object always have this referencing that object.
In JavaScript this is “free”, its value is evaluated at call-time and does not depend 
on where the method was declared, but rather on what object is “before the dot”. */

let user = {
    firstName: "Ilya",
    sayHi() {
      let arrow = () => alert(this.firstName);
      arrow();
    }
  };
  
  user.sayHi(); // Ilya

// Using "this" in different context

// Global
console.log(this) // Window

// Object Construction - refers to the instance of the Human class (greg or thomas), think attributes of the instance

// class Human {
//     constructor(age) {
//         this.age = age;
//     }
// }

function Human (age) {
    this.age = age
}
  
let greg = new Human(22)
let thomas = new Human(24)

console.log(greg) // this.age = 22
console.log(thomas) // this.age = 24

// Object Methods - refers to the object itself, methods instead of attributes

let o = {
    sayThis () {
      console.log(this)
    }
}

o.sayThis() // o

function Human (name) {
    return {
      name,
      getName() {
        return this.name
      }
    }
  }
  
  const zell = new Human('Zell')
  const vincy = new Human('Vincy')
  
  console.log(zell.getName()) // Zell

// Simple Functions - this refers to the window object

function simpleFunction () {
    console.log(this)
  }
  
  const o = {
    sayThis () {
      simpleFunction()
    }
  }
  
  simpleFunction() // Window
  o.sayThis() // Window

//   const o = {
//     doSomethingLater () {
//       setTimeout(function() {
//         this.speakLeet() // Error, bc this is set to window, and window doesn't have a "speakLeet" function
//       }, 1000)
//     },
//     speakLeet() {
//       console.log(`1337 15 4W350M3`)
//     }
//   }

const o = {
    doSomethingLater () {
      const self = this
      setTimeout(function() {
        self.speakLeet()
      }, 1000)
    },
    speakLeet() {
      console.log(`1337 15 4W350M3`)
    }
}

// Using an arrow function to accomplish the task

const o = {
    doSomethingLater () {
      setTimeout(() => this.speakLeet(), 1000)
    },
    speakLeet() {
      console.log(`1337 15 4W350M3`)
    }
  }


// this in an event is set to the element that fired the event

let button = document.querySelector('button')

button.addEventListener('click', function() {
  console.log(this) // button
})

// Activating another method using a reference to the object, bc this refers to the event listener

function LeetSpeaker (elem) {
    return {
      listenClick () {
        const self = this
        elem.addEventListener('click', function () {
          self.speakLeet()
        })
      },
      speakLeet() { console.log(`1337 15 4W350M3`) }
    }
  }

// Removes an event listener

function someFunction () {
    console.log('do something')
  
    // Removes the event listener.
    document.removeEventListener('click', someFunction)
  }
  
  document.addEventListener('click', someFunction)

// Changing this with bind

function sayThis () {
    console.log(this)
  }
const boundFunc = sayThis.bind({hippy: 'hipster'}) //hippy: 'hipster' becomes this in a bound function
boundFunc()

// Object {hippy: 'hipster'}

//Other arguments are passed into the original function
function sayParams (...args) {
    console.log(...args)
  }
  const boundFunc = sayParams.bind(null, 1, 2, 3, 4, 5)
  boundFunc()



// Chapter 5: Objects in Javascript

// Object literal, create objects quickly without creating a class, can also contain nested objects
// Objects ARE assigned by reference, if an object is created as a "clone" of the first object, any
// changes to the duplicate WILL effect the first
const superman = {
    name: 'Superman',
    'real name': 'Clark Kent', //Quoted since there's a space, use camelcase or underscore instead
    height: 75,
    weight: 235,
    hero: true,
    villan: false,
    allies: ['Batman', 'Supergirl'],

    fly() {
      return 'Up, up and away.'
    }
}

const heroName = 'Iron Man';
const realName = 'Tony Stark';

//short ES6 way
const ironMan = {heroName, realName}

// Can use . notation or [''] notation to access properties or methods of an object
superman['real' + '' + 'name'] //[] can use concatenation to access properties or create them in the object literal

// Can also use javascript expression for a property's value, such as ?

//Checks if this property exists in this object, these return false
'city' in superman;
superman.city !== undefined;
// Use to check if property specific to this object, not inherited
superman.hasOwnProperty('city');

for (const key in superman) { //Iterates over these properties
  console.log(key + ': ' + superman[key]);
}

for (const key of Object.keys(superman)) { // Returns array of properties, Object.values iterates over values, Object.entries iterates over both
  console.log(key);
}

// New properties, properties don't always appear in order of declaration
superman.city = 'Metropolis';

// Changing properties
superman['real name'] = 'Kal-El'

// Removing properties
delete superman.fly

// Objects as parameters to functions, don't need to keep exact order

function greet({greeting='Hello', name, age}) { //Uses default greeting if one isn't provided, but can be overridden
    return `${greeting}! My name is ${name} and I am ${age} years old.`;
}

const dice = {
    sides: 6,
    roll() {
      return Math.floor(this.sides * Math.random()) + 1
    }
}

// Prevent naming collisions in large amounts of code or library usage by creating a object for them, use to reference methods within

const myMaths = {
    square(x) {
        return x * x;
    },
    mean(array,callback) {
      if (callback) {
          array.map(callback);
      }
      const total = array.reduce((a,b) => a + b);
      return total/array.length;
    }
};

/* JSON: string representation of objects. Rules: */
// Property names ""
// Can use strings, numbers, true/false, null, arrays, and objects, cannot use functions

// JSON.parse(batman) takes a string of data in JSON format and returns a Javascript object
// JSON.stringify(wonderwoman) takes a javascript object and returns a string, can use spaces in between arguments to add new lines when displayed

// Math object
Math.PI;
Math.SQRT2; // square root of 2
Math.SQRT1_2 // 1/square root of 2
Math.E // Euler's constant
Math.LN2 // Log 2
Math.LN10 // Log 10
Math.LOG2E // Log base 2 of Euler's constant
Math.LOG10E // Log base 10 of Euler's constant
Math.abs // Absolute value
Math.ceil // Round up to next closest whole integer
Math.floor // The opposite
Math.round // Round to next nearest integer
Math.trunc // Only returns integer part of number