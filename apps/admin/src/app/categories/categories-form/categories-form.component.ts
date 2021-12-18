import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'yael-org-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  formCategory: FormGroup;
  idSubmitted:boolean=false;//it means that the form has never been submitted when it's false

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.formCategory = this.formBuilder.group({
      name: ['',Validators.required],
      icon: ['',Validators.required],
    });
  }

  onSubmit() {
    this.idSubmitted=true;
    if(this.formCategory.invalid)
    {
      return;
    }
    console.log(this.CategoryForm.name.value)

  }

  get CategoryForm(){
    return this.formCategory.controls;
  }
}
