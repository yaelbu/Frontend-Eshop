import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@yael-org/products';
//import {CategoriesService,Category} from '@yael-org/products';

@Component({
  selector: 'yael-org-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {
  categories:Category[]=[];
  constructor(private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((cats:any)=>{
      this.categories=cats;
    })
  }

}
