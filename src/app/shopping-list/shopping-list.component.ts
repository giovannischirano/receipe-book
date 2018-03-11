import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model'
import { ShoppinglistService } from './shoppinglist.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  ingredientsSize : number;

  constructor(private shoppingListService: ShoppinglistService) { }

  ngOnInit() {
    this.ingredients =  this.shoppingListService.getIngredients();
    this.ingredientsSize = this.ingredients.length;
    this.shoppingListService.ingredientsChanged
      .subscribe(
        () => {
          this.ingredients = this.shoppingListService.getIngredients();
        }
      );
  };

  onEdit(index: number){
    this.shoppingListService.editIngredientIndex.next(index);
  }

}
