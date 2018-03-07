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
  
  constructor(private slService: ShoppinglistService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.newIngForm);
    const ingName = this.newIngForm.value.ingName;
    const ingAmount = this.newIngForm.value.ingAmount;
    const newIng = new Ingredient(ingName, ingAmount);
    this.slService.addIngredient(newIng);
  }

}
