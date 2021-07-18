export class Recipe {
    constructor(recipeTitle, ingredientList, instructions, recipeImage, sideDish = ''){
        this.Id = Date.now();
        this.RecipeTitle = recipeTitle;
        this.IngredientList = ingredientList;
        this.Instructions = instructions;
        this.RecipeImage = recipeImage;
        this.SideDish = sideDish 
    }
}