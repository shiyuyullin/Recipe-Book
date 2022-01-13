import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientAdded = new Subject<Ingredient>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ];

    getIngredients(){
        return this.ingredients;
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
    }

    updateIngredient(index: number, ingredient: Ingredient){
        this.ingredients[index] = ingredient;
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
    }
    
}