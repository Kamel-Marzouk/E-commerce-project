import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/models/seller';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  constructor(private userService: UserService, private router: Router) {}

  signUp(data: SignUp): void {
    this.userService.userSignup(data).subscribe((result: any) => {
      if (result ) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    });
  }

}
