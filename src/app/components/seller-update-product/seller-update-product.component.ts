import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }

  private getProductById(): void {
    const productId: string | null = this.route.snapshot.paramMap.get('id');
    productId &&
      this.productService
        .getProductById(productId)
        .subscribe((product: Product) => {
          this.productData = product;
        });
  }

  submit(data: Product) {
   console.log(data);
  }

}
