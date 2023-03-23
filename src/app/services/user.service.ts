import { Injectable } from '@angular/core';
import { SignUp } from './../models/seller';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  userSignup(data: SignUp): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, data, {
      observe: 'response',
    });
  }
}
