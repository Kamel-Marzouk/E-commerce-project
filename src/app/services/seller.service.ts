import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seller } from './../models/seller';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addSeller(data: Seller): Observable<any> {
    return this.http.post(`${this.baseUrl}/seller`, data);
  }
}
