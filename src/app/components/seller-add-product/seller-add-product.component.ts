import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../models/product';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;

  constructor(private productService: ProductService) {}

  submit(data: Product) {
    this.productService.addProduct(data).subscribe((result) => {
      if (result) this.addProductMessage = 'Product is successfuly added';
      setTimeout(() => {this.addProductMessage = undefined}, 3000);
    });
  }
}
