import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipesService } from "../recipes/recipes.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{

    constructor(private httpClient: HttpClient, private recipeService: RecipesService) {}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.httpClient
        .put('https://recipe-book-55835-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        });
    }


    fetchRecipes(){
        this.httpClient
        .get<Recipe[]>('https://recipe-book-55835-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }))
        .subscribe(recipes => {
            this.recipeService.setRecipes(recipes);
        });
    }


}