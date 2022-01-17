import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { SharedModule } from "../shared/shared.module";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports : [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'recipe', component: RecipesComponent, canActivate:[AuthGuard],  
                children: [
                {path: '', component: RecipeStartComponent},
                {path: 'new', component: RecipeEditComponent},  
                {path: ':id', component: RecipeDetailComponent},
                {path: ':id/edit', component: RecipeEditComponent}
            ]}
        ]),
        SharedModule
    ]

})
export class RecipesModule{

}