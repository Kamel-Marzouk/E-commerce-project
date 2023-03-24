import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp, Login } from 'src/app/models/seller';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signUp(data: SignUp): void {
    this.userService.userSignup(data).subscribe((result: any) => {
      if (result ) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    });
  }

  login(data: Login): void {
    this.userService.userLogin(data);
  }

  openLogin(): void {
    this.setShowLogin(true);
  }

  openSignUp(): void {
    this.setShowLogin(false);
  }

  private setShowLogin(showLogin: boolean): void {
    this.showLogin = showLogin;
  }
}
