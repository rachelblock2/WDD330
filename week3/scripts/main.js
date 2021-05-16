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
Math.exp(1) //raise a number to power of Euler's constant
Math.pow(3,2) //9, could do 1/3 for a cube root
Math.sqrt(121) //11
Math.cbrt(8) //2
// Min and max for biggest and smallest numbers

6 * Math.random(); //Generates random number
Math.floor(6 * Math.random()); //Generates random integer, not 6 bc of rounding down

//Dates

const today = new Date();
today.toString('2021 05 11'); //Default current date and time if no arguments
today.getDay(); //Returns number of the day of the week
today.getDate(); //Returns number of date of the month
today.getFullYear(); //2021
// Setter methods: setDate(), setMonth(), setFullYear(), use toString() afterwards


// Regex
const pattern = /[a-zA-Z]+ing$/; //or new RexExp('[a-zA-Z]+ing'), the 2nd allows for a variable added in

pattern.test('joke'); //false
pattern.test('joking');

//Use exec to return an array with first match found
const vowels = /[aeiou]/ //Any one of the characters can be used, use ^ to negate expressions
//global(g) returns all matches
//ignoreCase(i) makes pattern case insensitive, change back to false by redefining pattern
//multiline(m) makes pattern multiline

// . = any character except line breaks
// \w = any word character
// \W = any non-word character
// \d = any digit
// \D = any non-digit
// \s = any whitespace character
// \S = any non-whitespace character
// ? = preceding token optional
// * = matches one of more occurances of preceding token
// {n} = matches n occurances of the pattern, adding , matches at least n occurances
// {,m} = matches at m occurances of preceding token
// {n,m} = range
// ^ = marks position right before first character
// $ = marks position right after last character
// Special characters can be escaped with a backslash /\?/

// Greedy and Lazy patterns

const word = 'abracadabra';

const greedyPattern = /a.+a/; //Use /a.+?a to get the lazy string 'abra'
greedyPattern.exec(word); //Returns abracadabra at index 0

const pdf = /.*\.pdf$/; //Looks for 0+ occurences of any character, followed by a period, with pdf extension

// match() method returns array of all matches in the regex arguments, search returns the position
'Javascript'.match(/[aeiou]/); //['a']
'Javascript'.search(/java/i); // 13
'Javascript'.replace(/[aeiou]/ig, '*'); //J*v*scr*pt

const link = `<a href='https://www.sitepoint.com' title='Oh Yeah!'>Awesome Web Resources</a>`

const mdLink = link.replace(/<a href='(.*?)'.*?>(.*?)<\/a>/g, `[$2]($1)`);
// First group captures text inside href
// Second captures text in anchor tags



// Chapter 6: Document Object Model

const body = document.body;
typeof body; //object
body.nodeType; //1
body.nodeName; //BODY
// 1 = element
// 2 = attribute
// 3 = text
// 8 = comment
// 9 = body

// Works like arrays with indexes (and length property), but not actually arrays, use Array.from to create
document.images; //Returns node list of all images
document.links; //Returns node list of all <a> and <area> with href
document.forms; //Returns node list of all forms

const heroes = document.querySelector('#roster')
heroes.childNodes; //Returns all children, including white space, also id and class are two separate children
heroes.children; //Returns only child element nodes, no text nodes
// firstChild and lastChild will return next node, or whitespace, also nextSibling and previousSibling

const wonderWoman = document.querySelector('ul#roster li:last-child');
const textNode = wonderWoman.firstChild;
textNode.nodeValue; // or .textContent, Wonder Woman

wonderWoman.setAttribute('class','villian'); //Changes the class name, can add new attributes too

wonderWoman.id; // Returns id
wonderWoman.className // Returns class name, use classList (all classes assigned to that element) instead to not override other elements with that class
wonderWoman.classList.add('something');
wonderWoman.classList.remove('something');
wonderWoman.classList.toggle('something');
wonderWoman.classList.contains('something');

function createElement(tag,text) {
  const el = document.createElement(tag);
  el.textContent = text;
  return el
}

const aquaman = createElement('li','Aquaman')
heroes.insertBefore(aquaman,wonderWoman); // method called on parent node
// Only one reference to an element can exist, aka using appendChild for wonderWoman just moves it to the end of the element
heroes.removeChild('aquaman')
heroes.replaceChild(newElement, oldElement)
heroes.innerHTML // Returns all child elements as a string of HTML

document.getElementsByClassName() // Live collection
document.getElementsByTagName() // Live collection

// Style properties become camel case

getComputedStyle(superman); // Lists out all CSS properties in a read only property
getComputedStyle(superman).getPropertyCSSValue('color').cssText; //rgb(0, 0, 0)

// It is better to add a class with style properties than add styles in javascript itself




// Chapter 7: Events

// Click works with click, tap, or enter key

addEventListener('click', () => alert('You clicked!'));

// OR

function doSomething() {
  alert('You clicked!');
}

addEventListener('click', doSomething) //No parentheses

// .type property tells what event
// .target property returns reference to the node in the HTML that fired the event
// .screenX and .screenY show pixel number from top and left of screen
// .clientX and .clientY show pixel number from top and left of client, such as a browser window
// .pageX and .pageY show pixel number from top and left of document, takes scrolling into account

// mousedown and mouseup occur before a click if coded in
// mouseover and mousedown: hover over and move away
// mousemove occurs when mouse moves over element it is applied to
// dblclick and click on same element is something to be cautious about

// keydown = key pressed and continues if key held down, shift, ctrl, alt, meta/cmd
// keypress = occurs after keydown before keyup, only for input and delete keys
// keyup = key released, shift, ctrl, alt, meta/cmd

// Checks if c key was pressed while holding down ctrl key
addEventListener('keydown', (event) => {
  if (event.key === 'c' && event.ctrlKey) {
    console.log('Action canceled!')
  }
});

// Checks if shift key held down when click
addEventListener('click', (event) => {
  if (event.shiftKey) {
    console.log('A shifty click!');
  }
});

// Touch events

// Careful with touchstart, safer to use click

addEventListener('touchend', () => console.log('Touch stopped.'));

// touchmove = after screen touch and move around without leaving
// touchenter = already touching and passes over element with this event listener
// touchleave = still touching screen but leaves element
// touchcancel = touch even interrupted or too many fingers

// touches = list of touch objects, has a .length property to show many touch points in contact with surface
// touch.screenX and touch.screenY = coordinates
// touch.radiusX and touch.screenY = radius of touch
// touch.force = 0-1 force
// touch.identifier = unique id to each touch


// Adds a click event to the paragraph, but only works once then deleted
const onceParagraph = document.getElementById('once');
onceParagraph.addEventListener('click', remove);

function remove(event) {
  console.log('Enjoy this while it lasts!');
  onceParagraph.style.backgroundColor = 'pink';
  onceParagraph.removeEventListener('click', remove);
}



const brokenLink = document.getElementById('broken');
brokenLink.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Broken link!');
});

// Event propagation
// Click on a li, you are clicking on elements it is nested inside, like ul, body, and html
// Propagates by moving from one element to another

// Bubbling = event fires on the element clicked on first, bubbles up document tree firing until reaches root node
let ulElement = document.getElementById('list');
let liElement = document.querySelector('#list li');

ulElement.addEventListener('click', (e) => 
  console.log('Clicked on ul')
);

// This shows first, then "bubbles" up to show the other one
liElement.addEventListener('click', (e) =>
  console.log('Clicked on li')
);

// Click on 2nd or 3rd li, will still see 'Clicked on ul' because event bubbles upward

// Stopping bubbling, only shows li message, be careful to avoid stopping other event listeners from firing
liElement.addEventListener('click', (event) => {
  console.log('clicked on li');
  event.stopPropagation(); }, false
)

// Capturing = event fires on root element, propagates downwards to each child element until clicked element is reached

// 3rd parameter of addEventListener(), boolean specifies whether capturing should be used, default is false or bubbling

ulElement.addEventListener('click', (e) => 
  console.log('Clicked on ul'), true
);

liElement.addEventListener('click', (e) =>
  console.log('Clicked on li'), true
);


// Event Delegation
// Instead of attaching 3 event listeners for each li, attach to parent, and use target property