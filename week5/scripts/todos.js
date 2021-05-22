import { Todo } from './todo.js';

let toDoList = [];

let todo1 = new Todo('Do this')
let todo2 = new Todo('Do that') 
let todo3 = new Todo('Do more')

let ul = document.querySelector('ul');

toDoList.push(todo1);
toDoList.push(todo2);
toDoList.push(todo3);

toDoList.forEach(
    todoItem => {
        ul.innerHTML += `<li id="taskItem">
                            <input type="checkbox" id="checkbox" name="checkbox">
                            ${todoItem.Content}
                            <input type="image" src="images/trash_png.png" id="trash" name="trash">
                        </li>`;
    }
)