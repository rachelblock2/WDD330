import {Car} from './car.js';

let car1 = new Car('Toyota', 'Tundra', '2007', 'Gold'); //INSTANCE OF A CLASS
// new creates an object in memory
let car2 = new Car('Ford', 'F-150', '2021', 'Silver');

car1.Available = false;

cars.push(car1);
cars.push(car2);

// Be sure to add a new car and then serialize it, aka add it to the JSON file
localStorage.setItem('cars', JSON.stringify(cars))

let cars = [];

if (localStorage.getItem('cars')) {
    cars = JSON.parse(localStorage.getItem('cars'))

    print();
}

document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    let newCar = new Car (
        document.querySelector('#make').value,
    );
    cars.push(newCar);
    localStorage.setItem('cars', JSON.stringify('cars'));
    print();

    document.forms[0].reset(); //clears the form after submission
});

// cars.forEach(
//     car => {
//         if (car.Color) { //checks for empty string, null, or undefined
//             console.log(car.Color)
//         } else {
//             console.log('This car color is unknown')
//         }
//     }
// )

// Remember to serialize the array, then deserialize so that it comes out as an object

localStorage.setItem('cars', cars); //Doesn't work, shows as object object
localStorage.setItem('cars', JSON.stringify(cars)); //Changes the object into a string, use JSON.parse to create objects from the strings

let ul= document.querySelector('ul');

cars.forEach (
    car => {
        ul.innerHtml +=
            `<li>${car.Make}</li>`
    }
)

// let make = 'Toyota';
// let model = 'Tundra';
// let year = '2007';
// let color = 'Gold';

// // Group them

// let newcar = {
//     make: 'Toyota',
//     model: 'Tundra',
//     year: '2007',
//     color: 'Gold'
// }

// function print(car){
//     console.log(car.make);
//     console.log(car.model);
//     console.log(car.year),
//     console.log(car.color)
// }

// print(newcar)

// let cars = [];
// cars.push(car);

// A class defines an object



// Chapter 8: Forms

const form = document.forms[0]; //Or identify by name attribute
// If name matches with any part of document.forms object, it won't work unless using [] notation

const [input,button] = form.elements; // All elements in a collection, or access by name attribute

form.submit(); // submits form automatically
form.action = '/an/other.url'; //sends to a different url

// occurs when element is focused on by clicking, tapping, or navigating
const input = form.elements.searchInput;
input.addEventListener('focus', () => alert('focused'), false);

// occurs when focus is moved away, will fire even if no changes
input.addEventListener('blur', () => alert('blurred'), false);

// occurs when element value is changed after moving away
input.addEventListener('change', () => alert('changed'), false);


// Submitting a form

const form = document.forms['search'];
form.addEventListener('submit', search, false);
function search(e) {
    alert(`You searched for: ${input.value}`);
    e.preventDefault();
}



const form = document.forms['hero'];
form.addEventListener('submit', makeHero, false);

function makeHero(event) {
    event.preventDefault(); // prevent the form from being submitted
    const hero = {}; // create an empty object
    hero.name = form.heroName.value; // create a name property based on the input field's value
    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    
    hero.category = form.category.value;
    hero.origin = form.origin.value;
    hero.age = form.age.value; // Value of the number input
    
    hero.powers = [];
    for (let i=0; i < form.powers.length; i++) {
        if (form.powers[i].checked) {
            hero.powers.push(form.powers[i].value);
        }
    }
    return hero;
}

hero.powers = [...form.powers].filter(box => box.checked).map(box => box.value); // Does the same thing

form.powers; //All checkbox elements with name of powers

document.forms.hero.powers[0].checked = true; // Checks a box initially

form.category; //All radio elements with name of powers, [input, input, input, value: "Antihero"]

form.type[2].checked = true; //Checks the 3rd button and unchecks others

form.city.options[form.city.selectedIndex].text; //Gets the value of selected value

const firstLetter = form.heroName.value[0]; //Gets the first letter

const label = form.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);

function validateInline() {
    const heroName = this.value.toUpperCase();
    if(heroName.startsWith('X')){
    error.style.display = 'block';
    } else {
    error.style.display = 'none';
    }
}

// Disabled also property of button element


// Chapter 12: Object Oriented Programming

class Dice {
    constructor(sides=6) {
        this.sides = sides;
    }
    roll() {
        return Math.floor(this.sides * Math.random() + 1)
    }
    static description() { //method only referenced by dice class, not by new objects
        return 'A way of choosing random numbers'
    }
}

const constructedArray = [1,2,3];
// Alternative way
const newconstructedArray = new Array(1,2,3);
// Error if only argument supplied, sets length property instead, use literal instead

const blueDice = new Dice(20); //Dice {sides: 20}

blueDice.constructor; //[Function: Dice], returns constructor function that created it

const literalObject = {};
// {}
literalObject.constructor
// [Function: Object]

const greenDice = new redDice.constructor(10); // Copy of object


class Turtle {
    constructor(name) {
        this.name = name;
        this.weapon = 'hands';
    }
    sayHi() {
        return `Hi dude, my name is ${this.name}`;
    }
    attack(){
        return `Feel the power of my ${this.weapon}!`;
    }
}

// Prototypes

Turtle.prototype; //not possible to overwrite the prototype
// Turtle {}

Turtle.prototype.weapon = 'Hands'; //Add new properties, live so all instances have access
// 'Hands'
Turtle.prototype.attack = function(){ //Add new methods, live so all instances have access
    return `Feel the power of my ${this.weapon}!`;
    }
// [Function]

const raph = new Turtle('Raphael');

raph.constructor.prototype; 
Object.getPrototypeOf(raph); //finding the prototype
//  Turtle { attack: [Function], weapon: 'Hands' }

Turtle.prototype.isPrototypeOf(raph);

don.weapon = 'Bo Staff';
// 'Bo Staff', this takes precedence over prototype

// Never use arrays or objects as a default value in prototype
// use _ for private methods for only constructor scope in class

this.setColor = (color) => {
    if(typeof color === 'string'){
        return _color = color;
        } else {
            throw new Error('Color must be a string');
        }
    }
    
raph.setColor(4);
//  Error: Color must be a string

// Prototype chain
Object.getPrototypeOf(Object.getPrototypeOf(raph))
// {}, The prototype of the Object constructor function has a large number of methods that are inherited by all objects

// Properties of objects in JavaScript are said to be enumerable or non-enumerable. If they aren't enumerable, 
// this means they will not show up when a for-in loop is used to loop through an object’s properties and methods.

// All properties and methods that are created by assignment are enumerable
Turtle.prototype.propertyIsEnumerable('eat');
// true



// Inheritance

class NinjaTurtle extends Turtle {
    constructor(name) {
        super(name); //from parent class
        this.weapon = 'hands';
    }
    attack() { return `Feel the power of my ${this.weapon}!` } 
}

// The concept of polymorphism means that different objects can have the same method, but implement it in different ways
// Polymorphism means that objects are able to override this method with a more specific implementation

[1,2,3].toString()
// '1,2,3'

2..toString;
// '2'

// Constructors of primitive values return objects
// new Number(2) === 2 is false

class Turtle {
    // other turtle methods here
    toString() { //rewritten built in method
        return `A turtle called ${this.name}`;
    }
}
raph.toString();
//  'A turtle called Raphael'

// Creating new methods w/ built-in objects = monkey-patching
// Should be avoided unless very good reason, cause problems if native methods exist

Array.prototype.first = function() {
    return this[0];
}

Array.prototype.last = function() {
    return this[this.length -1];
}

String.prototype.trim = String.prototype.trim || function() { 
    return this.replace(/^\s+|\s+$/,''); 
}
' hello '.trim();
// 'hello'


// Property Attributes and Descriptors

// value ― This is the value of the property and is undefined by default

// writable ― This boolean value shows whether a property can be changed or not, and is false by default

// enumerable ― this boolean value shows whether a property will show up when the object is displayed in a for in loop, and is false by default

// configurable ― this boolean value shows whether you can delete a property or change any of its attributes, and is false by default.

// More control for property assignment
// Basically read-only
Object.defineProperty(me, 'eyeColor', { value: 'blue', writable: false, enumerable: true });


// Getters and setters, should be used sparingly and with care
me.age = 21;
me.retirementAge = 65;

// Creates yearstoRetirement property
Object.defineProperty(me, 'yearsToRetirement',{
    get() {
        if(this.age > this.retirementAge) { 
            return 0; 
        } else { 
            return this.retirementAge - this.age; 
        }
    },
    set(value) {
        this.age = this.retirementAge - value;
        return value;
    }
});

// Will always return 21, no new assisgnment
Object.defineProperty(me, 'age', { 
    get() {
        return 21;
    },
    set(value) {
        return value;
    }
});


// property definition using get and set in a class
class Dice {
constructor(sides=6){    
    Object.defineProperty(this, 'sides', {
        get() {
        return `This dice has ${sides} sides`;
        },
        set(value) {
        if(value > 0) {
            sides = value;
            return sides;
        } else {
            throw new Error('The number of sides must be positive');
        }
        }
    });
    this.roll = function() {
        return Math.floor(sides * Math.random() + 1)
    }
    }
}

// Creating Objects from Other Objects

const Human = {
    arms: 2,
    legs: 2,
    walk() { console.log('Walking'); }
}

const lois = Object.create(Human); //instance of human object, inherits everything
// Add more properties by assignment, prototype, any changes affect all instances

// "Superclasses"

const Superhuman = Object.create(Human);

// Change to new object instance instead of human object, can overwrite super properties
Superhuman.change = function() {
    return `${this.realName} goes into a phone box and comes out as ${this.name}!`;
};

// Custom properties by constructor function
Superhuman.init = function(name,realName) {
    this.name = name;
    this.realName = realName;
    this.init = undefined; // this line removes the init function, so it can only be called once
    return this;
}

// new object using init method
const aquaman = Object.create(Superhuman).init('Aquaman', 'Arthur Curry');
aquaman.change();
// 'Arthur Curry goes into a phone box and comes out as Aquaman!'

// Object Prototype Chain

Human.isPrototypeOf(Superhuman);
// true


// Mixins - adding properties and methods of some objects to another object without using inheritance

const a = {};
const b = { name: 'JavaScript' };
Object.assign(a,b);
// { name: 'JavaScript' }
a.name
// 'JavaScript'

// Any changes to either object will affect both
const a = {};
const b = { numbers: [1,2,3] };
Object.assign(a,b);
//  { numbers: [1,2,3] }

// Add multiple properties all at once
const wonderWoman = Object.create(Superhuman);
mixin(wonderWoman,{ name: 'Wonder Woman', realName: 'Diana Prince' });
wonderWoman.change()
// 'Diana Prince goes into a phone box and comes out as Wonder Woman'

// Makes an exact deep copy of an object, so new changes to origial or new object won't affect each other
function copy(target) {
    const object =  Object.create(Object.getPrototypeOf(target));
    mixin(object,target);
    return object;
}

// Factory functions
// Creates a copy of superhuman and adds whatever properties and methods passed in
function createSuperhuman(...mixins) {
    const object = copy(Superhuman);
    return mixin(object,...mixins);
}


// Prototype = a tank is a vehicle inherited from vehicle
// Mixin = a tank could have a gun (mixin)

const flash = createSuperhuman({ name: 'Flash', realName: 'Barry Allen' }, superSpeed); //mixins as arguments

// If method returns "this", chain functions, can be hard to debug
superman.fly().move().xray();
// Up, up and away! Superman soars through the air!
// Superman can move faster than a speeding bullet!
// Superman can see right through you!

// Set this to that so you can reference it in a nested function
// or bind it
superman.findFriends = function() {
    this.friends.forEach(function(friend) {
        console.log(`${friend.name} is friends with ${this.name}`);
    }.bind(this));
}

// this still bound to object with for-of
superman.findFriends = function() {
    for(const friend of this.friends) {
        console.log(`${friend.name} is friends with ${this.name}`);
    };
}

// Same here
superman.findFriends = function() {
    this.friends.forEach((friend) => {
        console.log(`${friend.name} is friends with ${this.name}`);
    }
    );
}

// Borrowing methods
const fly = superman.fly; //prototypes
fly.call(batman);
// Up, up and away! Batman soars through the air!

const slice = Array.prototype.slice; //arrays
slice.call(arguments, 1, 3);
// or
[].slice.call(arguments, 1, 3)

// Composition over inheritance = classes skinny, smallre objects instead of huge classes