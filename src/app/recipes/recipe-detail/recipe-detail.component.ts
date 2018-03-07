import { RecipeService } from './../recipe.service';
import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RouterStateSnapshot, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  //@Input() recipe: Recipe;
  recipe: Recipe;
  id: Number;

  constructor(private route: ActivatedRoute, private recipesService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipesService.getReceipe(this.id);
      }
    );
    console.log(this.id);
  }

  onAddToShoppingList(){

  }

}
