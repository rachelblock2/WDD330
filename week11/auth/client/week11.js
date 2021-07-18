import {makeRequest} from "./authHelpers.js";
import Auth from "./auth.js";

makeRequest('login', 'POST', {
    password: 'user1',
    email: 'user1@email.com'
    });

document.querySelector('#submit').addEventListener('click', (event) => {
    event.preventDefault();
    let login = new Auth();
    login.login();
});