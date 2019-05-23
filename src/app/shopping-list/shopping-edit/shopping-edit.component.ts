import { Ingradient } from './../../model/ingradient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') seForm: NgForm;
  editMode = false;
  editedIndex: number;
  subscription: Subscription;
  editedItem: Ingradient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIndex = index;
        this.editedItem = this.shoppingListService.getIngrediant(index);
        this.seForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
          }
        );
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingradient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingListService.updateIngrediant(this.editedIndex, newIngredient);
    } else {
      this.shoppingListService.addIngradient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.editMode = false;
    this.seForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngrediant(this.editedIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
