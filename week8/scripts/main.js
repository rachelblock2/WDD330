let canvas = document.getElementById("myCanvas1");

// WebGl - new API with Canvas to make 3d
// Support - Chrome 18+, Internet Explorer 11+, and iOS 8+, and partially supported in Firefox 4+, Safari 5.1, Opera 12+, and Chrome 37+ for Android

// Set up context/where drawing is rendered
let context = canvas.getContext("2d"); //Only wide support for 2D
context.strokeStyle = "red";
context.fillStyle = "rgba(0, 0, 255, 0.5)";

// X and Y coords (top left is 0,0) of start, + width and height
context.fillRect(10, 10, 100, 100);
context.strokeRect(10, 10, 100, 100);

// Call createPattern to create a CanvasPattern(image to create pattern, repeat?)

function drawPattern() {
    let canvas = document.getElementById("myCanvas2");
    let context = canvas.getContext("2d");
    context.strokeStyle = "red";
    let img = new Image();
    img.src = "../week6/images/canvas_demo_image.jpg";
    img.onload = function () {
        //Creates pattern once image is loaded
        let pattern = context.createPattern(img, "repeat");
        context.fillStyle = pattern;
        context.fillRect(10, 10, 100, 100);
        context.strokeRect(10, 10, 100, 100);
    };
}

// CanvasGradient - createLinearGradient()(start coords, end coords) or createRadialGradient()

function drawGradient() {
    let canvas = document.getElementById("myCanvas3");
    let context = canvas.getContext("2d");
    context.strokeStyle = "red";
    let gradient = context.createLinearGradient(0, 0, 0, 200); //start at top left, end at bottom left
    gradient.addColorStop(0, "blue"); //Start as blue
    gradient.addColorStop(1, "white"); //Blend into white halfway
    context.fillStyle = gradient;
    context.fillRect(10, 10, 100, 100);
    context.strokeRect(10, 10, 100, 100);
}

// Other shapes - layout path, stroke path, fill path
function drawCircle() { //anticlockwise as optional arg
    let canvas = document.getElementById("myCanvas4");
    let context = canvas.getContext("2d");
    context.beginPath(); //resets path for new shape
    context.arc(50, 50, 30, 0, Math.PI * 2, true); //arc(x, y, radius, startAngle, endAngle, anticlockwise), circle is 2 PI radians or 360 degrees
    context.closePath();
    context.strokeStyle = "red";
    context.fillStyle = "blue";
    context.lineWidth = 3;
    context.fill();
    context.stroke();
}

function drawSaveCircle() { //anticlockwise as optional arg
    let canvas = document.getElementById("myCanvas5");
    let context = canvas.getContext("2d");
    context.beginPath(); //resets path for new shape
    context.arc(50, 50, 30, 0, Math.PI * 2, true); //arc(x, y, radius, startAngle, endAngle, anticlockwise), circle is 2 PI radians or 360 degrees
    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "green";
    context.lineWidth = 3;
    context.fill();
    context.stroke();
}

drawPattern();
drawGradient();
drawCircle();
drawSaveCircle();

function saveDrawing() { //not working yet
    let canvas = document.getElementById("myCanvas5");
    window.open(canvas.toDataURL("image/png")); //Allows for image to be saved as png or jpeg
}

let button = document.getElementById("saveButton");
button.addEventListener("click", saveDrawing, false);

window.addEventListener("load", drawImageToCanvas, false); //run image creation once element loaded

function drawImageToCanvas() {
    let canvas = document.getElementById("myCanvas6");
    let context = canvas.getContext("2d");
    let image = document.getElementById("b&w");
    context.drawImage(image, 68, 68); //canvas 200x200, image 64x64, so center 68x68
    let imageData = context.getImageData(0, 0, 1, 1); //security concern? getting the size of one px on canvas
    let pixelData = imageData.data;
    console.log(pixelData.length);
}

drawImageToCanvas();

// Manipulating canvas images
// getImageData(four corners) returns ImageData object (width: height: data: ), data has rgba value

function manipulateImage() {
    let canvas = document.getElementById("myCanvas7");
    let context = canvas.getContext("2d");
    let image = document.getElementById("b&w");
    context.drawImage(image, 68, 68);
    let imageData = context.getImageData(0, 0, 200, 200);
    
    let red, green, blue, grayscale;
    
    for (let i = 0; i < imageData.data.length; i += 4) {
        red = imageData.data[i];
        green = imageData.data[i + 1];
        blue = imageData.data[i + 2];
        grayscale = red * 0.3 + green * 0.59 + blue * 0.11;

        imageData.data[i] = grayscale; 
        imageData.data[i + 1] = grayscale;  
        imageData.data[i + 2] = grayscale; 
    }
    context.putImageData(imageData, 0, 0);
}

manipulateImage();


function makeVideoOldTimey() {
    let video = document.getElementById("video");
    let canvas = document.getElementById("canvasOverlay");
    let context = canvas.getContext("2d");

    video.addEventListener("play", function() { //using anon function bc can't pass params to named ones in eventlist. without wrapping in another function
        draw(video,context,canvas);               
        }, false); 
}

function draw(video, context, canvas) {
    if (video.paused || video.ended) return false;
    
    drawOneFrame(video, context, canvas);

    // Start over! 
    setTimeout(function(){ draw(video, context, canvas); }, 0); //0 for continous repeat
}

function drawOneFrame(video, context, canvas){
    // draw the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    try {
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        let pixelData = imageData.data; 
        // Loop through the red, green and blue pixels, 
        // turning them grayscale
        
        let red, green, blue, grayscale;  
        for (let i = 0; i < pixelData.length; i += 4) { //using pixelData for a loop saves performance
        red = pixelData[i];
        green = pixelData[i + 1];
        blue = pixelData[i + 2];
        //we'll ignore the alpha value, which is in position i+3
            
        grayscale = red * 0.3 + green * 0.59 + blue * 0.11;
            
        pixelData[i] = grayscale;
        pixelData[i + 1] = grayscale;
        pixelData[i + 2] = grayscale;
        }

        imageData.data = pixelData;
        context.putImageData(imageData, 0, 0); 
    } catch (err) {
        // clears canvas and adds explaining error
        context.clearRect(0,0,canvas.width,canvas.height);
        canvas.style.backgroundColor = "transparent"; 
        context.fillStyle = "white";
        context.textAlign = "left"; //before adding text

        context.font = "18px LeagueGothic, Tahoma, Geneva, sans-serif";
        context.fillText("There was an error rendering ", 10, 20);  
        context.fillText("the video to the canvas.", 10, 40);
        context.fillText("Perhaps you are viewing this page from", 10, 70);
        context.fillText("a file on your computer?", 10, 90);
        context.fillText("Try viewing this page online instead.", 10, 130); 
        return false; //if exception thrown, exit draw function
    }
            
}

// Drawing in SVG - file format that allows you to describe vector graphics using XML, accessible/readable in DOM
// XML = markup metalanguage aka annotation of text like HTML tags give text meaning, so SVG is text based


// Raphaël’s Container
function determineLocation() {
    if (navigator.onLine) {
        if (Modernizr.geolocation) {
            navigator.geolocation.getCurrentPosition(displayOnMap);
        
            let container = Raphael(document.getElementById("spinner"), 125, 125);
            let spinner = container.image("../week6/images/spinner.png", 0, 0, 125, 125); //shows spinner until map loads
            let attrsToAnimate = { transform: "r720" };
            spinner.animate(attrsToAnimate, 60000); //run for 60 seconds
        };
    }
}

function displayOnMap(position) {
    document.getElementById("spinner").style.display = "none";
}

// Canvas or SVG?
// Canvas - pixel manipulation, immediate mode aka no access to modify shape after drawn, no accessibility to DOM, faster, game w/ animations
// SVG - path manipulation, retained mode aka preserved access in XML, tools in libraries, can't manipulate SVG like Canvas


// Drag and Drop - not supported in andriod or IOS
// draggable attr. on html elements
// add event listener on element with dragstart event
// add event listener on element with dragover and drop event to accept dropped items

let mice = document.querySelectorAll("#mouseContainer img");

let mouse = null;
for (let i=0; i < mice.length; i++) {
    mouse = mice[i];
    mouse.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData("text/plain", this.id); //saves id of the mouse image in object so dropped with same id
    });
}

// DataTransfer objects in drag and drop api, set and get data about elements dragged

let cat = document.getElementById("cat");
cat.addEventListener("dragover", function(event) {
    event.preventDefault(); //ensures that mouse can be dragged over cat
});

cat.addEventListener("drop", function(event) {
    var mouseHash = {
        mouse1: 'NOMNOMNOM',
        mouse2: 'Meow',
        mouse3: 'Purrrrrr ...'
    };
    let catHeading = document.getElementById('catHeading');
    let mouseID = event.originalEvent.dataTransfer.getData("text/plain"); //retrieves the id of the mouse dragged stored in object
    catHeading.innerHTML = mouseHash[mouseID]; //uses the id from for loop stored to pick key to show value
})