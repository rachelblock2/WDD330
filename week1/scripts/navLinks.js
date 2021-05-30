const links = [
    {
    label: "Week1 notes",
    url: "../week1/index.html"
    }, 
    {
    label: "Week2 notes",
    url: "../week2/index.html"
    },
    {
    label: "Week3 notes",
    url: "../week3/index.html"
    },
    {
    label: "Week4 notes",
    url: "../week4/index.html"
    },
    {
    label: "Week5 notes",
    url: "../week5/index.html"
    },
    {
    label: "Week2 Team Assignment",
    url: "../week2/team-act1.html"
    },
    {
    label: "Week4 Team Assignment",
    url: "../week4/teamassignment.html"
    },
    {
    label: "Week5 Team Assignment",
    url: "../week5/hiking-start.html"
    },
    {
    label: "To Do App Project",
    url: "../week6/todo.html"
    }
]

// SELECT UL TAG IN THE DOM
let ul = document.querySelector("ul:first-child");

// GOOD
for (let i = 0; i < links.length; i++) {
    // DO SOMETHING
}

// BETTER
links.forEach(
    link => {
        ul.innerHTML += 
        `
        <li>
            <a href="${link.url}">${link.label}</a>
        </li>
        `;
    }
);