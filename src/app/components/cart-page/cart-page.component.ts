import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Cart, PriceSummary } from 'src/app/models/cart';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: undefined | Cart[];
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCurrentCart();
  }

  private getCurrentCart(): void {
    this.productService.getCurrentCart().subscribe((result: any) => {
      this.cartData = result;
      result.forEach((item: Cart) => {
        if (item.quantity) this.priceSummary.price += (+item.price * +item.quantity);
      });
      this.priceSummary.discount = this.priceSummary.price / 10;
      this.priceSummary.tax = this.priceSummary.price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = this.priceSummary.price + (this.priceSummary.price / 10 + 100) - (this.priceSummary.price / 10);
    });
  }
}
