import { Subject } from 'rxjs';
import { Recipie } from '../model/recipie.model';
import { Injectable, Output } from '@angular/core';
import { Ingradient } from '../model/ingradient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipieService {
  @Output() recipiedChanged = new Subject<Recipie[]>();
  private recipies: Recipie[] = [
    new Recipie(
      'First Recipie',
      'First Test Recipie',
      'https://www.dinneratthezoo.com/wp-content/uploads/2018/01/steak-bites-2.jpg',
      [new Ingradient('Meat', 6), new Ingradient ('Cheese', 6)]),
    new Recipie(
      'Second Recipie',
      'Second Test Recipie',
      'https://images.101cookbooks.com/simple-sauteed-zucchini-recipe-h.jpg?w=680&auto=format',
      [new Ingradient('Fish', 4), new Ingradient ('Suzhini', 2)])
  ];

  constructor(private shoppingListService: ShoppingListService ) {}

  getRecipies() {
    return this.recipies.slice();
  }

  getRecipie(index: number) {
    return this.recipies.slice()[index];
  }

  addIngrediantsToShoppingList(ingrediants: Ingradient[]) {
    this.shoppingListService.addIngrediants(ingrediants);
  }

  addRecipie(recipie: Recipie) {
    this.recipies.push(recipie);
    this.recipiedChanged.next(this.recipies.slice());
  }

  updateRecipie(index: number, newRecipie: Recipie) {
    this.recipies[index] = newRecipie;
    this.recipiedChanged.next(this.recipies.slice());
  }

  deleteRecipie(index: number) {
    this.recipies.splice(index, 1);
    this.recipiedChanged.next(this.recipies.slice());
  }

  setRecipies(recipies: Recipie[]) {
    this.recipies = recipies;
    this.recipiedChanged.next(this.recipies.slice());
  }

}

