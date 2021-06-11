let canvas = document.getElementById("myCanvas");

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
    let canvas = document.getElementById("demo2");
    let context = canvas.getContext("2d");
    context.strokeStyle = "red";
    let img = new Image();
    img.src = "../images/bg-bike.png";
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
    let canvas = document.getElementById("demo3");
    let context = canvas.getContext("2d");
    context.strokeStyle = "red";
    let gradient = context.createLinearGradient(0, 0, 0, 200); //start at top left, end at bottom left
    gradient.addColorStop(0, "blue"); //Start as blue
    gradient.addColorStop(1, "white"); //Blend into white halfway
    context.fillStyle = gradient; 
    context.fillRect(10, 10, 100, 100); 
    context.strokeRect(10, 10, 100, 100);
}