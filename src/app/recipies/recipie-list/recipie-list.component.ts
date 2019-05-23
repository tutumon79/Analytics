import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Recipie } from 'src/app/model/recipie.model';
import { RecipieService } from 'src/app/services/recipie.service';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css']
})
export class RecipieListComponent implements OnInit {
  recipies: Recipie[];
  constructor(private recipieService: RecipieService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.recipieService.recipiedChanged.subscribe(
      (recipies: Recipie[]) => {
        this.recipies = recipies;
      }
    );
    this.recipies = this.recipieService.getRecipies();
  }
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
