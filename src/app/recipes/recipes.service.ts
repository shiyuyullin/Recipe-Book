import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipesService{

    private recipes: Recipe[] = [
        new Recipe(
            "Salmon Dish", "Nice salmon dish", "https://www.saveur.com/uploads/2020/11/20/Y7RZPFZEERAZVHJ2VHC2RXMEEY.jpg?quality=85&width=540", [new Ingredient('Simon', 3)]),
            new Recipe(
                "Big Burger", "Tasty burger", "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80", [new Ingredient('Beef', 1), new Ingredient('Bread', 2)])    
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes(){
        return this.recipes;
    }

    getRecipeAtIndex(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
    }

    updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
    }



}