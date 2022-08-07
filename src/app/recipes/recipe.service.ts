import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Pasta',
      'Good pasta',
      'https://images.immediate.co.uk/production/volatile/sites/30/2021/04/Pasta-alla-vodka-f1d2e1c.jpg',
      [new Ingredient('Pasta', 1), new Ingredient('Vodka', 2)]
    ),
    new Recipe(
      'Soup',
      'Soup with spinach',
      'https://static.onecms.io/wp-content/uploads/sites/44/2021/05/28/spaghetti-squash-soup.jpg',
      [
        new Ingredient('Spinach', 2),
        new Ingredient('Carrot', 3),
        new Ingredient('Potato', 5),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index:number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  updateRecipe(id:number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe:Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
