export class Ingredient {
    constructor(food, amount) {
        this.Food = food;
        this.Amount = amount || 1;
        this.Id = Date.now();
    }
}