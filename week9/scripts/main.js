// Chapter 9: The Window Object

// Global Object = window object, or browser window
// BOM - Broswer Object Model - properties and methods, contains info about browser and screen
// No let, const, or var = global vars, properties of window object


// Node.js, global object is "global"
// from within the global scope
// const global = this;

// Methods of window object, usually called without "window"
window.parseInt(4.2);
// 4
window.isNaN(4.2);
// false

//Use with caution, stops program, could be issue with callback 
window.alert('Hello');
// undefined
window.confirm('Do you wish to continue?'); //stops program, ok clicked = True, cancel clicked = False
// undefined
window.prompt('Please enter your name:'); //stops program, ok clicked = text returned, cancel clicked = Null

window.location.href; //current page, but can be reassigned
// "https://www.sitepoint.com/premium/books/javascript-novice-to-ninja"
window.location.protocol; 
//  "https:"
window.location.host; //Domain and port number, hostname just returns domain
//  "www.sitepoint.com"
window.location.port; //empty if port not stated in URL
// ""
window.location.pathname;
//  "/premium/books/javascript-novice-to-ninja"

window.location.search //?, query string or empty string if not params
/* "?q=javascript&limit=24&offset=0&page=1&
content_types[]=All&slugs[]=all&states[]=available&order=" */

window.location.hash //Fragment Identifier
// ""

window.location.origin //read only, or reload(true) force browser reload
//  "https://www.sitepoint.com"

// window.location.assign('https://www.sitepoint.com/') //loads another resource from another URL into page
// replace() same, but not stored in session history, so unable to navigate back to it

window.location.toString();
//  "https://www.sitepoint.com/javascript/"

window.history.length //how many pages visited before current page arrival

// window.history.go(1); // goes forward 1 page
// window.history.go(0); // reloads the current page
// window.history.go(-1); // goes back 1 page
// forward() and back() methods


// Controlling Windows

// 1st is URL, 2nd is window title, 3rd is attr. list
// const popup = window.open('https://sitepoint.com',
// 'SitePoint','width=400,height=400,resizable=yes');
// popup.close();

window.moveTo(0,0); // will move the window to the top-left corner of the screen
// window.resizeTo(600,400);

// Screen Information, what the browser is displayed on, can turn off the device’s screen, detect a change in its orientation or lock it in a specific orientation.
// Use carefully, often media queries are better

window.screen.height
// 1024
window.screen.width
// 1280

// height and width of screen excluding operating system menus
window.screen.availWidth
// 1280
window.screen.availHeight
// 995

// The Document Object
// document.write('Hello, world!'); //can use with HTML, but better ways and this rarely used

// Cookies - small files saved locally, like info entered, page settings, user preferences
// Can only be read by a web page from same domain that set them, aka no access to info about other sites the user has visited, also up to 4kb of data, 20 cookies allowed per domain

// In a text file with key/value pairs = "name=Superman; hero=true; city=Metropolis"

// Adding to js "cookie jar", reassign by keeping key but changing value
document.cookie = 'name=Superman';
document.cookie = 'city=Metropolis';

document.cookie = 'name=Batman';
document.cookie = 'city=Gotham';

document.cookie //returns current contents
// "name=Batman; hero=true; city=Gotham"

const cookies = document.cookie.split("; "); //splits by ; into array of values
for (crumb of cookies){
    const [key,value] = crumb.split("="); //separates key and values
    console.log(`The value of ${key} is ${value}`);
}
// The value of name is Batman
// The value of hero is true
// The value of city is Gotham

// Cookie Expiry Date - deleted once browser session is finished, shouldn't rely on this for sensitive info

// Persistent cookies - sets a cookie to expire in one day's time
// const expiryDate = new Date(); 
// const tomorrow = expiryDate.getTime() + 1000 * 60 * 60 * 24;
// expiryDate.setTime(tomorrow);
// document.cookie = `name=Batman; expires=${ expiryDate.toUTCString()}`;

// Or use this, but no support before IE10 - document.cookie = 'name=Batman; max-age=86400' // 86400 secs = 1 day

// Allows all subdomains of the website to read the cookie
document.cookie = 'name=Batman; path=/' //Allows any page in root directory to read cookie
// document.cookie = 'name=Batman; domain=sitepoint.com'; sets domain

document.cookie = 'name=Batman; secure';

// Deleting cookie by putting it in the past
// document.cookie = 'name=Batman; expires=Thu, 01 Jan 1970 00:00:01 GMT';


// Timing Functions - what's available in the window object

// accepts a callback to a function as its first parameter and a number of milliseconds as its second parameter
window.setTimeout( () => alert("Time's Up!"), 3000); //shows an alert after 3 seconds
//4 = id used to referece this particulary timeout
// window.clearTimeout(4); //alert is prevented
//  undefined

// repeatedly invoke callback every given number of seconds
function chant(){ console.log('Beetlejuice'); } //can used a named and anonymous function for timing functions
const summon = window.setInterval(chant,1000);
// 6
window.clearInterval(summon);

// Be careful of using "this" in these methods
// const person = {
//     name: 'Superman',
//     introduce() { 
//         console.log(`Hi, I'm ${this.name}`); //this set to the window object, but there is no window.name, reset this inside method instead
//     }
// };
                
// setTimeout(person.introduce, 50);
// //  Hi, I'm


// Animation

// const squareElement = document.getElementById('square');
// let angle = 0;
// setInterval( () => {
//     angle = (angle + 2) % 360; //resets to 0 at 360 degrees
//     squareElement.style.transform = `rotate(${angle}deg)`
// }, 1000/60); //60 frames per second

// requestAnimationFrame
const squareElement = document.getElementById('square');
let angle = 0;
function rotate() {
    angle = (angle + 2)%360;
    squareElement.style.transform = `rotate(${angle}deg)`
    window.requestAnimationFrame(rotate); //calls rotate function recursively, can't set frame rate
}
const id = requestAnimationFrame(rotate); //starts the rotation

// cancelAnimationFrame(id); unique id is returned from call above so it can be cancelled
// Or just use css animations 