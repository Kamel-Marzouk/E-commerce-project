import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addProduct(data: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, data);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${productId}`,);
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get<Product>(`${this.baseUrl}/products/${productId}`);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${product.id}`, product);
  }

  popularProducts(): Observable<any> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?limit=3`);
  }

  getTrendyProducts(): Observable<any> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?limit=8`);
  }

}
