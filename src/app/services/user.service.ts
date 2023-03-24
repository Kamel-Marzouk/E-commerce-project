import { Injectable } from '@angular/core';
import { SignUp } from './../models/seller';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient,private router : Router) {}

  userSignup(data: SignUp): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, data, {
      observe: 'response',
    });
  }

  userAuthReload():void{
    if (localStorage.getItem('user')) this.router.navigate(['/']);
  }

}
