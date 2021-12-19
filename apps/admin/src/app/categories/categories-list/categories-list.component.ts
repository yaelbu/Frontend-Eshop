import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@yael-org/products';
import {
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'yael-org-categories-list',
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private confirmationService: ConfirmationService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories().subscribe((cats: any) => {
      this.categories = cats;
    });
  }

  DeleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this category?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          (response) => {
            this.getCategories();
            this.messageService.add({
              key: 'myKey1',
              severity: 'success',
              summary: 'Success',
              detail: 'Cateogry is deleted!',
            });
            timer(2000)
              .toPromise()
              .then((done) => {
                //after 2s, we go back to categories-list page
              });
          },
          (error) => {
            this.messageService.add({
              key: 'myKey1',
              severity: 'error',
              summary: 'Error',
              detail: 'Cateogry is not deleted!',
            });
          }
        );
      },
      reject: (type: any) => {
      },
    });
  }

  EditCategory(categoryId:string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }
}
