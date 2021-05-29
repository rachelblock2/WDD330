import {
    Todo
} from './todo.js';

let toDoList = [];

let addNewTask = document.querySelector('#addNewTask');
let taskInput = document.querySelector('#task_input')


if (localStorage.getItem("Tasks")) {
    toDoList = JSON.parse(localStorage.getItem("Tasks"));
    displayTasks(toDoList);
}

addNewTask.addEventListener('touchend', (e) => {
    if (taskInput.value !== '' || null) {
        let newTodo = new Todo(taskInput.value);
        toDoList.push(newTodo);
        localStorage.setItem(`Tasks`, JSON.stringify(toDoList));
        taskInput.value = ''
        displayTasks(toDoList)
    }
})


function displayTasks(toDoList) {
    let ul = document.querySelector('ul');
    ul.innerHTML = ''
    console.log(ul)

    toDoList.forEach(
        todoItem => {
            ul.innerHTML += `<li data-id="taskItem_${todoItem.Id}">
                                <input type="checkbox" data-id="${todoItem.Id}" name="checkbox${todoItem.Id}" ${todoItem.Completed ? 'checked' : ''}>
                                <span class=${todoItem.Completed ? "strikethrough" : ""}>${todoItem.Content}</span>
                                <input type="image" src="images/trash_png.png" data-id="${todoItem.Id}" name="${todoItem.Id}">
                            </li>`;
            console.log(ul.innerHTML)
        }
    );
    console.log(ul.innerHTML)
    console.log(ul)

    checkBox();
    addDeleteBtns();
    createAllTaskBtn();
    createActiveBtn();
    createCompletedBtn(); //BUG HERE
};


function addDeleteBtns() {
    let deleteTasks = document.querySelectorAll('input[type="image"]');

    deleteTasks.forEach(
        task => {
            task.addEventListener('click', (e) => {
                let selectedId = e.target.dataset.id; //Select trash image id that was clicked
                let selectedTask = toDoList.findIndex(todo => todo.Id === parseInt(selectedId)); //Find the index of the selected id in the list
                toDoList.splice(selectedTask, 1); 

                console.log(toDoList)
                displayTasks(toDoList);
                localStorage.setItem('Tasks', JSON.stringify(toDoList));
            });
        }
    );
}


function checkBox() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(
        checkbox => {
            checkbox.addEventListener('click', (e) => {
                let selectedId = e.target.dataset.id;
                let selectedTask = toDoList.find(todo => todo.Id === parseInt(selectedId));
                selectedTask.Completed = !selectedTask.Completed;

                let checkedIndex = toDoList.findIndex(todo => todo.Id === parseInt(selectedId));
                crossOutTask(checkedIndex);
                localStorage.setItem(`Tasks`, JSON.stringify(toDoList));
            });
        }
    );
};


function crossOutTask(checkboxIndex) {
    let taskNames = document.querySelectorAll('span');

    let checkedTask = taskNames[checkboxIndex];

    checkedTask.classList.toggle('strikethrough');
    localStorage.setItem(`Tasks`, JSON.stringify(toDoList));
}

function createAllTaskBtn () {
    let allTaskBtn = document.querySelector('#all_tasks')
    allTaskBtn.addEventListener('click', (e) => {
        displayTasks(toDoList);
    });
};

function createActiveBtn () {
    let activeBtn = document.querySelector('#active_tasks')
    activeBtn.addEventListener('click', (e) => {
        let filter = toDoList.filter(todo => todo.Completed === false)
        displayTasks(filter);
    });
};

function createCompletedBtn () {
    let completeBtn = document.querySelector('#complete_tasks')
    completeBtn.addEventListener('click', (e) => {
        console.log('clicked complete')
        let filter = toDoList.filter(todo => todo.Completed === true)
        displayTasks(filter);
    });
};