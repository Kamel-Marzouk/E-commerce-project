import { Injectable } from '@angular/core';
import { SignUp } from './../models/seller';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/seller';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  userSignup(data: SignUp): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, data, {
      observe: 'response',
    });
  }

  userLogin(data: Login): void {
    this.http
      .get<SignUp[]>(
        `${this.baseUrl}/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }

  userAuthReload(): void {
    if (localStorage.getItem('user')) this.router.navigate(['/']);
  }

}
