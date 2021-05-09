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