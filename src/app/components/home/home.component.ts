import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  popularProducts: undefined | Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getPopularProducts();
  }

  private getPopularProducts(): void {
    this.productService.popularProducts().subscribe((data: Product[]) => {
      this.popularProducts = data;
    });
  }

}
