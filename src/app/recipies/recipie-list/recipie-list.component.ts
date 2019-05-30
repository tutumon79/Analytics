import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Recipie } from 'src/app/model/recipie.model';
import { RecipieService } from 'src/app/services/recipie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css']
})
export class RecipieListComponent implements OnInit {
  recipies: Recipie[];
  colors: any;
  sub: Subscription;
  color: any;
  constructor(private recipieService: RecipieService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.color = [];
    if(this.color.length === 0) {
      this.router.navigate(['/recipies']);
    }
    this.colors = [{color:'yellow',isChecked:false},
    {color:'pink',isChecked:false},
    {color:'blue', isChecked:false}];
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

  radioClicked(radioObj) {
    this.color = [];
    this.colors.forEach(rad => {
      if (rad.color === radioObj.color) {
        rad.isChecked = !rad.isChecked;
      }
      if (rad.isChecked) {
        if ((this.color.toString().search(rad.color) === -1)) {
          this.color.push([rad.color]);
        }
        this.router.navigate(['/recipies'], { queryParams: { color: this.color } });
      } else {
        if ((this.color.toString().search(rad.color) !== -1)) {
          this.color.splice(this.color.indexOf([rad.color]), 1);
        }
        if (this.color.length !== 0) {
          this.router.navigate(['/recipies'], { queryParams: { color: this.color } });
        } else {
          this.router.navigate(['/recipies']);
        }
      }
    });
    console.log(this.color);
    console.log(location.href);
  }
}
