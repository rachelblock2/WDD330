import {Ingredient} from './ingredient.js';
import {Recipe} from './recipe.js';

let ingredientList = []; //list of ingredients in a recipe
let recipesList = []; //list of all recipes

// Selectors for Recipe Home page

if (document.querySelector('#homeMain')) {
    if (JSON.parse(localStorage.getItem(`Recipes`))) {
        let recipesList = JSON.parse(localStorage.getItem(`Recipes`));
        showMiniRecipeCard(recipesList);
        
        let allRecipeCards = document.querySelectorAll('.miniRecipeCard');
        switchRecipeCards(allRecipeCards);
        showFullRecipe(allRecipeCards);
    };
};


// Selectors for Recipe Title page
let userTitleInput = document.querySelector('#recipeTitle'); //input for recipe title
let recipeSideDish = document.querySelector('#recipeSide'); //input for recipe side
let addRecipeTitle = document.querySelector('#nextIngredients'); //Goes to next page and adds to localStorage

if (addRecipeTitle) {
    addRecipeTitle.addEventListener('touchend', () => {
        let recipe = new Recipe(userTitleInput.value, ingredientList, '', '', recipeSideDish.value);
        recipesList.push(recipe);
        localStorage.setItem(`Recipes`, JSON.stringify(recipesList));
    });
};

if (JSON.parse(localStorage.getItem(`Recipes`))) {
    let allRecipes = JSON.parse(localStorage.getItem(`Recipes`));
    recipesList = allRecipes;
}

// Selectors for Recipe Ingredients page
let userIngredientInput = document.querySelector('#recipeIngredient'); //input for recipe ingredient
let ingredientAmt = document.querySelector('#ingredientAmount'); //input for recipe ingredient amount
let addNewIngredient = document.querySelector('#addNewIngredient'); //Adds the ingredient to recipe object

if (userIngredientInput) {
    addNewIngredient.addEventListener('touchend', () => {
            let allRecipes = JSON.parse(localStorage.getItem(`Recipes`));
            let latestRecipe = allRecipes[allRecipes.length - 1];
            addIngredientstoRecipe(latestRecipe.IngredientList);
    });

};


function addIngredientstoRecipe(ingredientList) {
    let ingredient = new Ingredient(userIngredientInput.value, ingredientAmt.value); //Creates new ingredient
    ingredientList.push(ingredient);

    let recipesList = JSON.parse(localStorage.getItem(`Recipes`));

    recipesList.forEach(recipe => {
        if (recipe === recipesList[recipesList.length - 1]) { //Adds new ingredient and amount to last entered recipe
            recipe.IngredientList = ingredientList;
        }
    });

    showIngredients(recipesList[recipesList.length - 1]);
    addDeleteBtns(recipesList[recipesList.length - 1]);
    
    localStorage.setItem('Recipes', JSON.stringify(recipesList));
    
    userIngredientInput.value = '';
    ingredientAmt.value = '';
}


// Selectors for Recipe Instructions page
let userInstructionsInput = document.querySelector('#recipeInstructions'); //input for recipe ingredient
let addInstructions = document.querySelector('#nextAddImg'); //Adds ingredients and asks for a recipe image

if (userInstructionsInput) {
    addInstructions.addEventListener('touchend', () => {
        let recipesList = JSON.parse(localStorage.getItem(`Recipes`));
        recipesList.forEach(recipe => {
            if (recipesList[recipe] === recipesList[-1]) { //Adds new ingredient and amount to last entered recipe
                recipe.Instructions = userInstructionsInput.value;
            };
        });
        localStorage.setItem('Recipes', JSON.stringify(recipesList));
    });
};

let cardDisplay = document.querySelector('#cardMain');

if (cardDisplay) {
    let allRecipes = JSON.parse(localStorage.getItem(`Recipes`));
    recipesList = allRecipes;
    showRecipeCard(recipesList, recipesList[recipesList.length - 1]);

    document.addEventListener('DOMContentLoaded', () => {
        const recipesList = JSON.parse(localStorage.getItem(`Recipes`));
    
        if (recipesList) {
            if (recipesList[recipesList.length - 1].RecipeImage) {
                if (document.querySelector('#recipeImgDisplay')) {
                    document.querySelector('#recipeImgDisplay').setAttribute('src', recipesList[recipesList.length - 1].RecipeImage);
                }
            };
        }
    });

};

let currentCardDisplay = document.querySelector('#currentCardMain');
if (currentCardDisplay) {
    let chosenRecipe = JSON.parse(localStorage.getItem(`chosenRecipe`));
    showRecipeCard(recipesList, chosenRecipe);
    document.addEventListener('DOMContentLoaded', () => {
        if (chosenRecipe) {
            console.log(chosenRecipe.RecipeImage);
            if (document.querySelector('#recipeImgDisplay')) {
                document.querySelector('#recipeImgDisplay').setAttribute('src', chosenRecipe.RecipeImage);
            }
        
        }
    });
    addDeleteBtns(chosenRecipe);
};


if (document.querySelector(`#recipeImg`)) {
    document.querySelector('#recipeImg').addEventListener('change', function() {
        const reader = new FileReader();

        reader.addEventListener('load', ()=> {
            let recipesList = JSON.parse(localStorage.getItem(`Recipes`));
                recipesList.forEach(recipe => {
                    if (recipe === recipesList[recipesList.length - 1]) {
                        recipesList[recipesList.length - 1].RecipeImage = reader.result;
                    };
                });
            localStorage.setItem('Recipes', JSON.stringify(recipesList));
        });

        reader.readAsDataURL(this.files[0]);
    });
};

// document.addEventListener('DOMContentLoaded', () => {
//     const recipesList = JSON.parse(localStorage.getItem(`Recipes`));

//     if (recipesList) {
//         if (recipesList[recipesList.length - 1].RecipeImage) {
//             if (document.querySelector('#recipeImgDisplay')) {
//                 document.querySelector('#recipeImgDisplay').setAttribute('src', recipesList[recipesList.length - 1].RecipeImage);
//             }
//         };
//     }
// });



function showRecipeCard(recipesList, recipe) {
    let ul = document.querySelector('#displayIngredients');
    let p = document.querySelector('#instructions');
    let h2 = document.querySelector('h2');
    
    if (ul && p && h2) {
        ul.innerHTML = '';
        p.innerHTML = 'Instructions: ';
        h2.innerHTML = recipe.RecipeTitle;
    }


    if (recipe.SideDish) {
        if (document.querySelector('h3')) {
            document.querySelector('h3').innerHTML = `with ${recipe.SideDish}`;
        };
    };

    showIngredients(recipe);
    
    if (document.querySelector('#instructions')) {
        document.querySelector('#instructions').innerHTML += recipe.Instructions;
    };

    addDeleteBtns(recipe);
};

function showMiniRecipeCard(recipesList) {
    document.querySelector('#cardHolder').innerHTML = '';

    recipesList.forEach(
        recipe => {
            let card = document.createElement('div');
            card.setAttribute('class', 'miniRecipeCard');
            card.setAttribute('id', recipe.RecipeTitle);
            
            let cardImage = document.createElement('img');
            cardImage.setAttribute('src', recipe.RecipeImage);
            cardImage.setAttribute('class', 'miniCardImg');

            let imgHolder = document.createElement('div');
            imgHolder.setAttribute('class', 'imgHolder');
            imgHolder.append(cardImage);

            let link = document.createElement('a');
            link.setAttribute('href', 'currentRecipeCard.html');
            link.setAttribute('class', 'imageLink');
            link.append(imgHolder);

            let cardTitle = document.createElement('h2');
            cardTitle.innerHTML = recipe.RecipeTitle;

            let cardRecipeSide = document.createElement('h3');
            cardRecipeSide.innerHTML = `with ${recipe.SideDish}`;

            card.append(link);
            card.append(cardTitle);
            card.append(cardRecipeSide);

            document.querySelector('#cardHolder').append(card);
        }
    );
}

function showFullRecipe (recipeDivs) {
    const recipesList = JSON.parse(localStorage.getItem(`Recipes`));

    recipeDivs.forEach( 
        recipeCard => {
            recipeCard.addEventListener('touchend', (e) => {
                let recipeTitle = recipeCard.id;
                let selectedRecipe = recipesList.find(recipe => recipe.RecipeTitle === recipeTitle);

                if (JSON.parse(localStorage.getItem(`chosenRecipe`))) {
                    localStorage.removeItem('chosenRecipe');
                }

                localStorage.setItem('chosenRecipe', JSON.stringify(selectedRecipe));
                
                // console.log(selectedRecipe);
                // console.log(recipeTitle);
                
                // showRecipeCard(recipesList, selectedRecipe);
            });
        }
    );
}

function showIngredients(recipe) {
    let ul = document.querySelector('#displayIngredients');
    ul.innerHTML = '';

    recipe.IngredientList.forEach(
        ingredient => {
            if (ul) {
                ul.innerHTML += `<li>
                            <span>${ingredient.Food} - ${ingredient.Amount}</span>
                            <input type="image" src="images/trash_png.png" data-id="${ingredient.Id}" name="${ingredient.Id}">
                            </li>`;
            };
        });
}

function addDeleteBtns(recipe) {
    let deleteBtns = document.querySelectorAll('input[type="image"]');

    deleteBtns.forEach(
        btn => {
            btn.addEventListener('touchend', (e) => {
                let selectedId = e.target.dataset.id; //Select trash image id that was clicked
                let selectedIngredient = recipe.IngredientList.findIndex(ingredient => ingredient.Id === parseInt(selectedId)); //Find the index of the selected id in the list of task objects
                recipe.IngredientList.splice(selectedIngredient, 1); //Remove that object

                showRecipeCard(recipesList);
                localStorage.setItem('Recipes', JSON.stringify(recipesList));
            });
        }
    );
}


function switchRecipeCards(recipeDivs) {
    let prevBtn = document.querySelector('#previousRecipe');
    let nextBtn = document.querySelector('#nextRecipe');
    
    let slideIndex = 1;
    
    nextBtn.addEventListener('touchend', () => {
        plusSlides(1)
    });
    
    prevBtn.addEventListener('touchend', () => {
        plusSlides(-1)
    });
    
    showSlides(slideIndex);
    
    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    
    // // Thumbnail image controls
    // function currentSlide(n) {
        //   showSlides(slideIndex = n);
        // }
        
    function showSlides(n) {
        let i;
        // let slideIndex = 1;
        let slides = recipeDivs;
        //   let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            slideIndex = 1;
        } else if (n < 1) {
            slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        //   for (i = 0; i < dots.length; i++) {
        //       dots[i].className = dots[i].className.replace(" active", "");
        //   }
        slides[slideIndex-1].style.display = "block";
        //   dots[slideIndex-1].className += " active";
    }
}