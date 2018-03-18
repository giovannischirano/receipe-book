import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppinglistService } from '../shoppinglist.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') newIngForm: NgForm;
  
  editMode = false;
  deleteMode = false;
  ingredientEdit: Ingredient;
  indexIngredientEdit: number;

  constructor(private slService: ShoppinglistService) { }

  ngOnInit() {
    this.slService.editIngredientIndex.subscribe(
      (index: number) => {
        this.indexIngredientEdit = index;
        this.editMode = true;
        this.deleteMode = true;
        this.ingredientEdit = this.slService.getIngredient(index);
        this.newIngForm.form.patchValue({
          ingName: this.ingredientEdit.name,
          ingAmount: this.ingredientEdit.amount
        });
      }
    );
  }

  onSubmit(){
    const ingName = this.newIngForm.value.ingName;
    const ingAmount = this.newIngForm.value.ingAmount;
    const newIng = new Ingredient(ingName, ingAmount);
    if(this.editMode){
      this.slService.updateIngredient(this.indexIngredientEdit, new Ingredient(ingName, ingAmount));
      this.onClear();
    }else {
      this.slService.addIngredient(newIng);
      this.onClear();
    }
  }

  onClear(){
    this.newIngForm.reset();
    this.editMode = false;
    this.deleteMode = false;
  }

  onDelete(){
    if(this.deleteMode){
      this.slService.deleteIngredient(this.indexIngredientEdit);
      this.onClear();
    }
  }

}
