import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Cart, Order } from 'src/app/models/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: undefined | number;
  constructor(private productService:ProductService) {}

  ngOnInit(): void {
    this.getCurrentCart();
  }

  private getCurrentCart(): void {
    this.productService.getCurrentCart().subscribe((result: any) => {
      let price : number =0
      result.forEach((item: Cart) => {
        if (item.quantity) price += (+item.price * +item.quantity);
      });
      this.totalPrice = price + (price / 10 + 100) - (price / 10);;
    });
  }

  orderNow(data: {email:string,address:string,contact:string}): void {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if(this.totalPrice){
      let orderData : Order = {
        ...data,
        totalPrice:this.totalPrice,
        userId
      }
      this.productService.orderNow(orderData).subscribe((result:any)=>{
       if(result) alert('Order placed')

      })

    }
  }
}
