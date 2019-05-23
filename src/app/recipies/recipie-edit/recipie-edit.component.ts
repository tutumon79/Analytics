import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipieService } from 'src/app/services/recipie.service';


@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrls: ['./recipie-edit.component.css']
})
export class RecipieEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipieForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipieService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipie(this.id, this.recipieForm.value);
    } else {
      this.recipeService.addRecipie(this.recipieForm.value);
    }
    this.onCancel();
  }

  getControls() {
    return (<FormArray>this.recipieForm.get('ingradients')).controls;
  }

  onAddIngradient() {
    (<FormArray>this.recipieForm.get('ingradients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngradient(index: number) {
    (<FormArray>this.recipieForm.get('ingradients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipieName = '';
    let recipieImagePath = '';
    let recipieDescription = '';
    let recipieIngradients = new FormArray([]);

    if (this.editMode) {
      const recipie = this.recipeService.getRecipie(this.id);
      recipieName = recipie.name;
      recipieImagePath = recipie.imagePath;
      recipieDescription = recipie.description;
      if (recipie['ingradients']) {
        for (let ingradient of recipie.ingradients) {
          recipieIngradients.push(
            new FormGroup({
              'name': new FormControl(ingradient.name, Validators.required),
              'amount': new FormControl(ingradient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipieForm = new FormGroup({
      'name': new FormControl(recipieName, Validators.required),
      'imagePath': new FormControl(recipieImagePath, Validators.required),
      'description': new FormControl(recipieDescription, Validators.required),
      'ingradients': recipieIngradients
    });
  }

}
