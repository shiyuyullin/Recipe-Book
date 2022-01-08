import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientAdded = new EventEmitter<Ingredient>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ];

    getIngredients(){
        return this.ingredients;
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
    }
    
}