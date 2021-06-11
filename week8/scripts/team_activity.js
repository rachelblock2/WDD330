let list = document.querySelector('#fetchUl');
let next;
let prev;

getUrl('http://swapi.dev/api/people/');

function getUrl(url) {
    fetch(url)
        .then((response) => response.json())
        .then((jsonData) => {
            console.log(jsonData)
            list.innerHTML = ''
            if (jsonData.next) {
                next = jsonData.next;
                document.querySelector('#next').disabled = false;
                document.querySelector('#prev').classList.remove('notAvailable')
            } else {
                document.querySelector('#next').disabled = true;
                document.querySelector('#next').classList.toggle('notAvailable')
            }

            if (jsonData.previous) {
                prev = jsonData.previous;
                document.querySelector('#prev').disabled = false;
                document.querySelector('#prev').classList.remove('notAvailable')
            } else {
                document.querySelector('#prev').disabled = true;
                document.querySelector('#prev').classList.toggle('notAvailable')
            }

            jsonData.results.forEach((person) => {
                list.innerHTML += `<li>${person.name}</li>`;
                getDetail(person); //Doesn't work, need the list item, but the list item doesn't have the JSON data
            });

        });
}

document.querySelector('#next').addEventListener('touchend', () => {
    getUrl(next);
})

document.querySelector('#prev').addEventListener('touchend', () => {
    getUrl(prev);
})

function getDetail(person) {
    person.addEventListener('touchend', () => {
        let main = document.querySelector('main');
        let description = document.createElement('p');
        main.append(description);
        console.log(person.name);
        for (let key of Object.keys(person)) {
            console.log('hi');
            description.textContent += person[key];
        }
    })
}