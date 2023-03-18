import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product;
  productMessage: undefined | string;

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
    if (this.productData) data.id = this.productData.id;
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) this.productMessage = 'Product has updated successfuly';
      setTimeout(() => {
        this.productMessage = undefined;
      }, 3000);
    });
  }

}
