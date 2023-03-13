import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login, Seller } from 'src/app/models/seller';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  showLogin: boolean = false;
  authError: string = '';
  constructor(private sellerService: SellerService, private router: Router) {}

  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  signUp(data: Seller): void {
    this.sellerService.addSeller(data);
  }

  login(data: Login): void {
    this.resetAuthError();
    this.sellerService.loginSeller(data);
    this.sellerService.isLoginError.subscribe((isError: boolean) => {
      if (isError) this.setAuthError('Email Or password is not correct');
    });
  }

  private setAuthError(errorMessage: string): void {
    this.authError = errorMessage;
  }

  private resetAuthError(): void {
    this.authError = '';
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
