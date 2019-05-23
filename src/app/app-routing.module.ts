import { RecipieEditComponent } from './recipies/recipie-edit/recipie-edit.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipieStartComponent } from './recipies/recipie-start/recipie-start.component';
import { RecipieDetailComponent } from './recipies/recipie-detail/recipie-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipies', pathMatch: 'full' },
  { path: 'recipies', component: RecipiesComponent, children: [
    { path: '', component: RecipieStartComponent },
    { path: 'new', component: RecipieEditComponent },
    { path: ':id', component: RecipieDetailComponent },
    { path: ':id/edit', component: RecipieEditComponent }
  ] },
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
