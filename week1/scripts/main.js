// Property is a variable in an object
// JSON has quotes around properties and values, but JS objects only have it around values

let students = [];

let student1 = {
    firstName: "Little",
    lastName: "Timmy"
}

console.log(student1.firstName)

let student2 = {
    firstName: "Tiny",
    lastName: "Sammy"
}

students.push(student1);
students.push(student2);


// PRACTICE FROM "DOING STUFF WITH WEB THINGS"

// Displays written story as HTML upon user click input
function displayStory() {
    let storyHTML = document.querySelector("#story_editor").value
    document.querySelector("#story_display").innerHTML = storyHTML
}

// Finds saved story upon user name entry and click input
function loadStory() {
    let storyName = document.querySelector("#name_input").value
    let storyHTML = localStorage.getItem(storyName) //Finds the story bc of the key reference
    document.querySelector("#story_editor").value = storyHTML
}

// Saves the story upon user click input
function saveStory() { 
    let storyName = document.querySelector("#name_input").value
    let storyHTML = document.querySelector("#story_editor").value
    localStorage.setItem(storyName, storyHTML) // Stores the name and story as key/value pair
}