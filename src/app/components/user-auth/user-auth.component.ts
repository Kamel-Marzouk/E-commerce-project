import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp, Login } from 'src/app/models/seller';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/models/product';
import { Cart } from 'src/app/models/cart';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = false;
  authError: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private productService: ProductService
  ) {}

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
    this.userService.invalidUserAuth.subscribe((result: boolean) => {
      if (result) this.authError = 'Please enter valid user details';
      else this.localCartToRemoteCart();
    });
  }

  private localCartToRemoteCart(): void {
    let data = localStorage.getItem('localCart');
    setTimeout(() => {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user)[0].id;
      if (data) {
        let cartDataList: Product[] = JSON.parse(data);
        cartDataList.forEach((product: Product, index: number) => {
          let cartData: Cart = {
            ...product,
            productId: product.id,
            userId,
          };
          delete cartData.id;
          setTimeout(() => {
            this.productService.addToCart(cartData).subscribe((result: any) => {
              if (result) console.log('Item stored in DB');
            });
            if (cartDataList.length === index + 1)
              localStorage.removeItem('localCart');
          }, 500);
        });
      }
      this.productService.getCartList(userId);
    }, 100);
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
