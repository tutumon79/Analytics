import { Ingradient } from '../model/ingradient.model';
import { Output } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
  @Output() ingradientsAdded = new Subject<Ingradient[]>();
  startedEditing = new Subject<number>();
  private ingradients: Ingradient[] = [
    new Ingradient('Apples', 5),
    new Ingradient('Tomatos', 15)
  ];

  getIngrediant(index: number) {
    return this.ingradients[index];
  }

  getIngradients() {
    return this.ingradients.slice();
  }
  addIngradient(ingradient: Ingradient) {
    this.ingradients.push(ingradient);
    this.ingradientsAdded.next(this.ingradients.slice());
  }

  addIngrediants(ingrediants: Ingradient[]) {
    this.ingradients.push(...ingrediants);
    this.ingradientsAdded.next(this.ingradients.slice());
  }

  updateIngrediant(index: number, newIngrediant: Ingradient){
    this.ingradients[index] = newIngrediant;
    this.ingradientsAdded.next(this.ingradients.slice());
  }

  deleteIngrediant(index: number) {
    this.ingradients.splice(index, 1);
    this.ingradientsAdded.next(this.ingradients.slice());
  }

}
