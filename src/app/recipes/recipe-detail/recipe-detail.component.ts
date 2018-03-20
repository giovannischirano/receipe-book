import { ShoppinglistService } from './../../shopping-list/shoppinglist.service';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RouterStateSnapshot, ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  //@Input() recipe: Recipe;
  recipe: Recipe;
  id: number;
  isAuthent: boolean = false;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private recipesService: RecipeService, 
    private slService: ShoppinglistService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipesService.getRecipe(this.id);
      }
    );

    this.subscription = this.recipesService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipe = this.recipesService.getRecipe(this.id);
        //this.router.navigate(['/recipes']);
      }
    );

    this.authService.isAuthenticated()
      .subscribe(
        (user) => {
          if(user) {
            this.isAuthent = true;
          } else {
            this.isAuthent = false;
          }
        }
      );
  }

  onAddToShoppingList(){
    this.slService.addIngredients(this.recipesService.getRecipe(this.id).ingredients);
  }

  onDelete() {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
