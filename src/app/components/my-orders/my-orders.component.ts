import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/cart';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orderData: Order[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  private getAllOrders(): void {
    this.productService.getOrdersList().subscribe((result: any) => {
      this.orderData = result;
    });
  }

  cancelOrder(orderId: number | undefined): void {
    orderId &&
      this.productService.deleteOrder(orderId).subscribe((result: any) => {
        if (result) this.getAllOrders();
      });
  }
}
