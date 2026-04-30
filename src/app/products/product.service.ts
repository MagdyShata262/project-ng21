import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, map } from 'rxjs';
import { Product, ProductsResponse } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>(this.apiUrl).pipe(map((response) => response.products));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  async fetchProducts(): Promise<Product[]> {
    return firstValueFrom(this.getProducts());
  }

  async fetchProductById(id: number): Promise<Product> {
    return firstValueFrom(this.getProductById(id));
  }
}
