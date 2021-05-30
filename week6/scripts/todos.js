import {
    Todo
} from './todo.js';

let toDoList = []; //The list that holds the task objects

let addNewTask = document.querySelector('#addNewTask');
let taskInput = document.querySelector('#task_input')

// Load saved tasks into the webpage if there are any that exist
if (localStorage.getItem("Tasks")) {
    toDoList = JSON.parse(localStorage.getItem("Tasks"));
    displayTasks(toDoList);
}

// When user enters a string into the input, add it to the list of tasks
addNewTask.addEventListener('touchend', (e) => {
    if (taskInput.value !== '' || null) {
        let newTodo = new Todo(taskInput.value);
        toDoList.push(newTodo);
        localStorage.setItem(`Tasks`, JSON.stringify(toDoList));
        taskInput.value = '' //Clear the input field
        displayTasks(toDoList)
    }
})

// Show the list of tasks on the webpage
function displayTasks(toDoList) {
    let ul = document.querySelector('ul');
    ul.innerHTML = ''

    toDoList.forEach(
        todoItem => {
            ul.innerHTML += `<li data-id="taskItem_${todoItem.Id}">
                                <input type="checkbox" data-id="${todoItem.Id}" name="checkbox${todoItem.Id}" ${todoItem.Completed ? 'checked' : ''}>
                                <span class=${todoItem.Completed ? "strikethrough" : ""}>${todoItem.Content}</span>
                                <input type="image" src="images/trash_png.png" data-id="${todoItem.Id}" name="${todoItem.Id}">
                            </li>`;
        }
    );

    checkBox();
    addDeleteBtns();
    createAllTaskBtn();
    createActiveBtn();
    createCompletedBtn();
};

// Add functionality to delete buttons created with the tasks
function addDeleteBtns() {
    let deleteTasks = document.querySelectorAll('input[type="image"]');

    deleteTasks.forEach(
        task => {
            task.addEventListener('click', (e) => {
                let selectedId = e.target.dataset.id; //Select trash image id that was clicked
                let selectedTask = toDoList.findIndex(todo => todo.Id === parseInt(selectedId)); //Find the index of the selected id in the list of task objects
                toDoList.splice(selectedTask, 1); //Remove that object

                displayTasks(toDoList);
                localStorage.setItem('Tasks', JSON.stringify(toDoList));
            });
        }
    );
}

// Add functionality to checkbox buttons created with the tasks
function checkBox() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(
        checkbox => {
            checkbox.addEventListener('click', (e) => {
                let selectedId = e.target.dataset.id; //Select checkbox id that was clicked
                let selectedTask = toDoList.find(todo => todo.Id === parseInt(selectedId));
                selectedTask.Completed = !selectedTask.Completed; //Change task to completed status 

                let checkedIndex = toDoList.findIndex(todo => todo.Id === parseInt(selectedId));
                crossOutTask(checkedIndex); //Cross out completed task
                localStorage.setItem(`Tasks`, JSON.stringify(toDoList));
            });
        }
    );
};

// Cross out completed task
function crossOutTask(checkboxIndex) {
    let taskNames = document.querySelectorAll('span');

    let checkedTask = taskNames[checkboxIndex];

    checkedTask.classList.toggle('strikethrough');
    localStorage.setItem(`Tasks`, JSON.stringify(toDoList));
}

// Show all tasks
function createAllTaskBtn () {
    let allTaskBtn = document.querySelector('#all_tasks')
    allTaskBtn.addEventListener('click', (e) => {
        displayTasks(toDoList);
    });
};

// Show all uncompleted tasks
function createActiveBtn () {
    let activeBtn = document.querySelector('#active_tasks')
    activeBtn.addEventListener('click', (e) => {
        let filter = toDoList.filter(todo => todo.Completed === false)
        displayTasks(filter);
    });
};

// Show all completed tasks
function createCompletedBtn () {
    let completeBtn = document.querySelector('#complete_tasks')
    completeBtn.addEventListener('click', (e) => {
        let filter = toDoList.filter(todo => todo.Completed === true)
        displayTasks(filter);
    });
};