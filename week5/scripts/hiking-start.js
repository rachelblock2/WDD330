import {Hike} from './hikes.js';
//create an array of hikes
let hikeList = []

let hike1 = new Hike("Bechler Falls", "falls.jpg", "Image of Bechler Falls", "3 miles", "Easy", "Beautiful short hike along the Bechler river to Bechler Falls", "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.")
let hike2 = new Hike("Teton Canyon", "falls.jpg", "Image of Bechler Falls", "3 miles", "Easy", "Beautiful short (or long) hike through Teton Canyon.", "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.")
let hike3 = new Hike("Denanda Falls", "falls.jpg", "Image of Bechler Falls", "7 miles", "Moderate", "Beautiful hike through Bechler meadows river to Denanda Falls", "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.")


hikeList.push(hike1);
hikeList.push(hike2);
hikeList.push(hike3);

const imgBasePath = "//byui-cit.github.io/cit261/examples/";
//on load grab the array and insert it into the page
window.addEventListener("load", () => {
  showHikeList();
});

function showHikeList() {
  const hikeListElement = document.getElementById("hikes");
  hikeListElement.innerHTML = "";
  renderHikeList(hikeList, hikeListElement);
}

function renderHikeList(hikes, parent) {
  hikes.forEach(hike => {
    parent.appendChild(renderOneHike(hike));
    addHikeListener(hike);
  });
}
function renderOneHike(hike) {
  const item = document.createElement("li");
  
  item.innerHTML = ` <h2>${hike.name}</h2>
  <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
  <div>
  <div>
  <h3>Distance</h3>
  <p>${hike.distance}</p>
  </div>
  <div>
  <h3>Difficulty</h3>
  <p>${hike.difficulty}</p>
  </div>
  </div>`;
  
  return item;
}

let ul = document.querySelector('ul');

// in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
function addHikeListener() {
  // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
    const childrenArray = Array.from(ul.children);
    childrenArray.forEach(child => {
        child.addEventListener('touchend', e => {
      //       // why currentTarget instead of target?
            this.showOneHike(e.currentTarget.dataset.name);
          });
        });
      }


// let listItems = Array.from(ul.children)
// console.log(ul.children)
// console.log(listItems)

// listItems.forEach(
//   listItem => {
//     listItem.addEventListener('touchend click', (e) => {
//       console.log('hi')
//   })
//   })