import { Component } from '@angular/core';
import { SignUp } from 'src/app/models/seller';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {



  signUp(data:SignUp):void{
    console.log(data);

  }
}
