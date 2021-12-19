import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      'http://localhost:3000/api/v1/categories'
    );
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.httpClient.get<Category>(`http://localhost:3000/api/v1/categories/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(
      'http://localhost:3000/api/v1/categories',
      category
    );
  }

  deleteCategory(categoryId: string): Observable<Object> {
    return this.httpClient.delete<Object>(
      `http://localhost:3000/api/v1/categories/${categoryId}`
    );
  }

   editCategory(category: Category):Observable<Category>{
    return this.httpClient.put<Category>(`http://localhost:3000/api/v1/categories/`+category.id,category);
  }  
}
