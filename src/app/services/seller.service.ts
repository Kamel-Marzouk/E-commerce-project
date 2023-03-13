import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seller } from './../models/seller';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  baseUrl: string = 'http://localhost:3000';
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,private router:Router) {}

  addSeller(data: Seller): void {
   this.http.post(`${this.baseUrl}/seller`, data,{observe:"response"}).subscribe((result:any)=>{
    this.isSellerLoggedIn.next(true);
    localStorage.setItem('seller',JSON.stringify(result.body));
   });
  }

  reloadSeller():void{
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-auth'])
    };
  }
}
