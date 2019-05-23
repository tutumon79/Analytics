import { Recipie } from 'src/app/model/recipie.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipieService } from './recipie.service';

@Injectable()
export class DataStorageService {
  constructor(private http:Http, private recipieService: RecipieService){
  }

  storeData() {
    return this.http.put('https://angular-dipu.firebaseio.com/recipies.json',
    this.recipieService.getRecipies());
  }

  getRecipies() {
    this.http.get('https://angular-dipu.firebaseio.com/recipies.json')
    .subscribe(
      (response: Response) => {
        const recipies: Recipie[] = response.json();
        this.recipieService.setRecipies(recipies);
      }
    );
  }
}
