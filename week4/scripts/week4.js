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

Turtle.prototype;
// Turtle {}