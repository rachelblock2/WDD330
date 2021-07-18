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
    label: "Week5-6 notes",
    url: "../week5/index.html"
    },
    // Week 5, 6 and 7 may have some overlap which is why week 6 notes are technically missing, however I did take notes on it
    {
    label: "Week6-7 notes",
    url: "../week7/index.html"
    },
    {
    label: "Week8 notes",
    url: "../week8/index.html"
    },
    {
    label: "Week9 notes",
    url: "../week9/index.html"
    },
    {
    label: "Week10 notes",
    url: "../week10/index.html"
    },
    {
    label: "Week11 notes",
    url: "../week11/index.html"
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
    label: "Week7 Team Assignment",
    url: "../week7/hikes5/hiking-complete.html"
    },
    {
    label: "Week8 Team Assignment",
    url: "../week8/team_activity.html"
    },
    {
    label: "Week9 Team Assignment",
    url: "../week9/javascript30-drums/index-START.html"
    },
    {
    label: "Week10 Team Assignment",
    url: "../week10/teamAssignment.html"
    },
    {
    label: "Week11 Team Assignment",
    url: "../week11/auth/client/week11.html"
    },
    {
    label: "To Do App Project",
    url: "../week6/todo.html"
    },
    {
    label: "Recipes Final App Project",
    url: "../final_project/recipesHome.html"
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