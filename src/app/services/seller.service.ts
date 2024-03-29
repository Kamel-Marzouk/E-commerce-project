import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp, Login } from './../models/seller';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  baseUrl: string = 'http://localhost:3000';
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  addSeller(data: SignUp): void {
    this.http
      .post(`${this.baseUrl}/seller`, data, { observe: 'response' })
      .subscribe((result: any) => {
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }

  reloadSeller(): void {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  loginSeller(data: Login) {
    this.http
      .get(
        `${this.baseUrl}/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          this.isLoginError.emit(true);
        }
      });
  }
}
