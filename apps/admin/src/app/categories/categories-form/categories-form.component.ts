import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@yael-org/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'yael-org-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit {
  formCategory: FormGroup;
  idSubmitted: boolean = false; //it means that the form has never been submitted when it's false
  editmode = false; //equal to false when I wnat to add category and not update
  currentCategoryID:string;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formCategory = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });

    this._checkEditMode();
  }

   private _checkEditMode() {
    //function to check if there is categoryId in the url, if yes it's for edit the category, else its to create a new category
    this.route.params.subscribe((params) => {
      if (params.id) {
        //if there is categoryid param
        this.editmode=true;
        this.currentCategoryID=params.id;
        this.categoriesService.getCategory(params.id).subscribe(category=>{
          this.CategoryForm.name.setValue(category.name);
          this.CategoryForm.icon.setValue(category.icon);
          this.CategoryForm.color.setValue(category.color);
        })

      }
    });
  } 

  onSubmit() {
    this.idSubmitted = true;
    if (this.formCategory.invalid) {
      return;
    }
    const category: Category = {
      id:this.currentCategoryID,
      name: this.CategoryForm.name.value,
      icon: this.CategoryForm.icon.value,
      color: this.CategoryForm.color.value,
    };

    if(this.editmode){
      this._updateCategory(category)
    }else{
      this._addCategory(category);
    }
  }

  private _addCategory(category:Category)
  {
    this.categoriesService.createCategory(category).subscribe(
      (response) => {
        this.messageService.add({
          key: 'myKey1',
          severity: 'success',
          summary: 'Success',
          detail: 'Cateogry is created!',
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            //after 2s, we go back to categories-list page
            this.location.back();
          });
      },
      (error) => {
        this.messageService.add({
          key: 'myKey1',
          severity: 'error',
          summary: 'Error',
          detail: 'Cateogry is not created!',
        });
      }
    );
  }

  private _updateCategory(category:Category){
    this.categoriesService.editCategory(category).subscribe(
      (response) => {
        this.messageService.add({
          key: 'myKey1',
          severity: 'success',
          summary: 'Success',
          detail: 'Cateogry is updated!',
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            //after 2s, we go back to categories-list page
            this.location.back();
          });
      },
      (error) => {
        this.messageService.add({
          key: 'myKey1',
          severity: 'error',
          summary: 'Error',
          detail: 'Cateogry is not updated!',
        });
      }
    );
  }

  

  get CategoryForm() {
    return this.formCategory.controls;
  }
}
