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


// Chapter 14: HTML5 APIs

// data- attribute
// Embeds data in web page, uses custom attributes that are ignored by browser, private to a page, so only used by js
// data-, lowercase letters, numbers, hyphens, dots, colons or underscores, optional string value

// Could filter through all attributes and values, can use getAttribute for older browsers
// data-powers = 'flight superSpeed'
// data-rating = '5' 
// data-dropdown 
// data-user = 'DAZ' 
// data-max-length = '32'

const superman = document.getElementById('hero');
const powers = superman.dataset.powers;
// 'flight superSpeed'

// data-max-length = dataset.maxLength

// Conversion into a number
// const maxLength = Number(element.dataset.maxLength);

// Web Storage API - key/value storage, fewer restrictions, more storage capacity, and is generally easier to use
// Info not shared with server on every request
// Info available in multiple windows of browser if domain is same
// Data does not automatically expire like cookies do

// localStorage.name = 'Heisenberg'; 
// console.log(localStorage.name); 
// "Heisenberg";

// localStorage.removeItem('name');
// delete localStorage.name;
// localStorage.clear();

// Won't work locally, needs a server
// addEventListener('storage', (event) => {
//     console.log(`The ${event.key} was updated from ${event.oldValue} to ${event.newValue} and saved in 
//     ${event.storageArea}`) }, false);

// Geolocation, user must share permission

navigator.geolocation.getCurrentPosition(youAreHere); //returns "position" object to youAreHere()
// coords prop with lat and lang props

function youAreHere(position) {
    console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`); 
}

// position properties
// position.speed returns ground speed of device in mtrs/s
// position.altitude property returns an estimate of the device’s altitude in meters above theWGS84ellipsoid, which is a standard measurement for the center of the Earth.
//  position.heading property returns the direction the device is moving in. This is measured as a bearing in degrees, clockwise from North.
// position.timestamp property returns the time that the position information was recorded.

// Calculate accuracy of measurements
// position.accuracy returns acc. of lat and long in meters, lower value the better
// Use position.altitudeAccuracy for altitude accuracy

// When device moves, position updated with this
// const id = navigator.geolocation.watchPosition(youAreHere); returns an ID, can use clearWatch(id) to stop it


// Web Workers - allow processes to run in background
// const worker = new Worker('task.js'); normally can't be a local file, internet file needed? Or relative path?
// Downloaded async, starts once downloaded
// Uses messages to communicate between worker and main script

// worker.postMessage('Hello'); //post message to worker from main
// self.postMessage('Finished') //post message to main from worker

// Log data from the worker to main's console
// worker.addEventListener('message', (event) => {
//     console.log(event.data); //data stored in data prop of event object 'message'
// }, false);

// worker.terminate(); //used inside main
// self.close(); //used inside worker

// Factorizes form and changes background color
const btn = document.getElementById('rainbow');
const rainbow = ['red','orange','yellow','green','blue','rebeccapurple','violet'];
function change() {      
    document.body.style.background = rainbow[Math.floor(7*
    Math.random())]; //gets the lower integer of 7 * floating point number
}
btn.addEventListener('click', change);


const form = document.forms[0];
form.addEventListener('submit', factorize, false);
function factorize(event) {
    // prevent the form from being submitted
    event.preventDefault();   
    document.getElementById('output').innerHTML = '<p>This could take a while ...</p>';
    const number = Number(form.number.value);
    if(window.Worker) { //are web workers supported?
        const worker = new Worker('scripts/factors.js');
        worker.postMessage(number);
        worker.addEventListener('message', (event) => {
        document.getElementById('output').innerHTML = event.data; //inserts data from web worker into the HTML that calc is finished
        }, false);
    }
}

// Dedicated Web Workers = worker only works with script that loaded it, vs Shared Web Workers = allow lots of different scripts on same domain to access same worker object

// Service Workers - allows for worker to run in background, and also intercept network requests
// Basically app-like offline experience
// Allow access to push notifs and background syncing
// Requires secure network on HTTPS



// WebSocket - a protocol that allows two-way communication with a server, aka connection is kept open, responses are pushed to client as soon as they are received


// Code Example: Echo Chamber

// const URL = 'wss://echo.websocket.org/'; //secure protocol by websockets instead of HTTP
// const outputDiv = document.getElementById('output');
// const form = document.forms[0];
// const connection = new WebSocket(URL); //stores reference to websocket object, creates instance when run and tries to connect to url
// Successful = event "open" fired

// connection.addEventListener('open', () => {
//     output('CONNECTED');
// }, false);

// Creates a constant stream of messages in the div
// function output(message) {
//     const para = document.createElement('p');
//     para.innerHTML = message;
//     outputDiv.appendChild(para);
// }

// Adding messages
// form.addEventListener('submit', message, false);

// function message(event) {
//     event.preventDefault();
//     const text = form.message.value;
//     output(`SENT: ${text}`);
//     connection.send(text); //sends message to url, receives, processes, sends response back, when response is received, message event fires
// }

// connection.addEventListener('message', (event) => {
//     output(`RESPONSE: ${event.data}`);
// }, false);

// close event fires when connection closed, error when error occurs
// connection.addEventListener('close', () => {
//     output('DISCONNECTED');
// }, false);

// connection.addEventListener('error', (event) => {
// output(`<span style='color: red;'>ERROR: ${event.data}</span>`);
// }, false);



// Notifications - allows you to show messages using the system's notifications, usually a popup
// Get permission first
if(window.Notification) {
    Notification.requestPermission()
    .then((permission) => {
        if(Notification.permission === 'granted') {
        new Notification('Hello JavaScript!'); //1st param is title, 2nd is object of options
        }
    });
}

// const notification = new Notification('JavaScript: Novice to Ninja',{
//     body: 'The new book from SitePoint', //any text below title
//     icon: 'sitepointlogo.png' //image link
// });

// notification.close();
// notif events: click, show, close

// notification.addEventListener('click', () => {
//     window.open('https://sitepoint.com')
//     }, false);



// Multimedia

// const video = document.getElementsByTagName('video')[0];
// video.play(),.pause(), .volume(), .muted() (boolean), .currentTime() += 10 aka jump 10 sec forward
// video.playbackRate() (fast forward or rewind by speed change), .loop (boolean), .duration() (how long of clip)

// fires once metadata loaded so props are available
// video.addEventListener('loadedmetadata', () => { console.log(video.duration); });

// Audio and Video events - play, fires at start + after resume
// pause
// volumechange
// loadmetadata, fires when all metadata loaded


// Canvas Review
const canvasElement = document.getElementById('canvas');
const context = canvasElement.getContext('2d');
context.fillStyle = "#0000cc"; // a blue fill color 
context.strokeStyle = "#ccc"; // a gray stroke color

context.beginPath();
context.moveTo(130, 50);
context.lineTo(180, 50);
context.moveTo(155, 50);
context.lineTo(155, 90);
context.strokeStyle = '#c00';
context.lineWidth = 15;
context.stroke();

context.beginPath();
context.arc(200, 200, 30, 0, Math.PI * 2, false);
context.strokeStyle = '#ff0';
context.lineWidth = 4;
context.stroke();

context.fillStyle = '#0c0'; // a blue fill color
context.font = 'bold 26px sans-serif';
context.fillText('Hello', 20, 200);

// Be careful with newer APIs and security concerns

// Shims and Polyfills - for when the user doesn't have the most up to date browser
// Libraries of code that allow for usual use of API
// Shim = piece of code that adds some missing functionality to a browser, implemented slightly different
// Polyfill = shim that acheives same functionality, while also using the normal API commands as if they were supported