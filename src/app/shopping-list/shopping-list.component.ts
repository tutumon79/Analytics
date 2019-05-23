import { ShoppingListService } from './../services/shopping-list.service';
import { Ingradient } from './../model/ingradient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingradients: Ingradient[] ;
  private subscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingradients = this.shoppingListService.getIngradients();
    this.subscription = this.shoppingListService.ingradientsAdded.subscribe(
      (ingradients: Ingradient[]) => {
        this.ingradients = ingradients;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
