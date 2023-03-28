import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Cart, Order } from 'src/app/models/cart';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:3000';
  cartData = new EventEmitter<Product[] | []>();

  constructor(private http: HttpClient) {}

  addProduct(data: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, data);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${productId}`);
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

  searchProducts(query: string): Observable<any> {
    return this.http.get<Product[]>(`${this.baseUrl}/products?q=${query}`);
  }

  localAddToCart(data: Product): void {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeFromCart(productId: number): void {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData).filter(
        (item: Product) => productId !== item.id
      );
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: Cart): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart`, cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<Product[]>(`${this.baseUrl}/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((result: any) => {
        if (result && result.body) this.cartData.emit(result.body);
      });
  }

  removeFromCartList(cartId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/${cartId}`);
  }

  getCurrentCart(): Observable<any> {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(`${this.baseUrl}/cart?userId=${userData[0].id}`);
  }

  orderNow(orderData: Order): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, orderData);
  }
}
