import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  allProducts: undefined | Product[];
  productMessage: undefined | string;
  icon = faTrash;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts() {
    this.productService.getAllProducts().subscribe((result: Product[]) => {
      this.allProducts = result;
    });
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe((result: any) => {
      if (result) this.productMessage = 'Product is successfully deleted';
      this.getAllProducts();
      setTimeout(() => {
        this.productMessage = undefined;
      }, 3000);
    });
  }
}
