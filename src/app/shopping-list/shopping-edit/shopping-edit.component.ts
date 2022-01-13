import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') shoppingListForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editingItemIndex: number; 
  editingItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editingItemIndex = index;
        this.editingItem = this.shoppingListService.getIngredient(this.editingItemIndex);
        this.shoppingListForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        })
      }
    );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    const formValue = form.value;
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editingItemIndex, new Ingredient(formValue.name, formValue.amount))
      this.editMode = false;
    }
    else{
      this.shoppingListService.addIngredient(new Ingredient(formValue.name, formValue.amount));
    }
    this.shoppingListForm.reset();
  }

  onClear(){
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editingItemIndex);
    this.onClear();
  }

}
