import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }

  private getProductById(): void {
    const productId: null | string =
      this.route.snapshot.paramMap.get('productId');
    if (productId)this.productService.getProductById(productId).subscribe((result: Product) => (this.productData = result));
    let cartData = localStorage.getItem('localCart');
    if (productId && cartData) {
      let items = JSON.parse(cartData).filter((item: Product) => productId === item.id.toString());
      if (items.length) this.setRemoveCart(true);
      else this.setRemoveCart(false);
    }
  }

  handleQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'plus')this.productQuantity += 1;
    if (this.productQuantity > 1 && value === 'min') this.productQuantity -= 1;
  }

  addToCart(): void {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.setRemoveCart(true);
      }else{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData:Cart = {
          ...this.productData,
          userId,
          productId:this.productData.id
        };
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((result:Cart)=>{
         if(result) alert("Product is added in cart succussfully")
        })

      }
    }
  }

  removeFromCart(productId: number): void {
    this.productService.removeFromCart(productId);
    this.setRemoveCart(false);
  }

  private setRemoveCart(value: boolean): void {
    this.removeCart = value;
  }
}
