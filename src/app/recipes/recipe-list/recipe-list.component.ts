import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;

  constructor(private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getReceipes();
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.router.navigate(['/recipes']);
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
