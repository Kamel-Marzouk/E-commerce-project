import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../models/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = '';
  sellerName: string = '';
  searchReasult: undefined | Product[];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.setMenuType();
  }

  private setMenuType(): void {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        if (localStorage.getItem('seller') && event.url.includes('seller')) {
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        } else this.menuType = 'default';
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  searchProducts(query: KeyboardEvent): void {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService
        .searchProducts(element.value)
        .subscribe((result: any) => {
          if (result.length > 5) result.length = 5;
          this.searchReasult = result;
        });
    }
  }

  hideSearch(): void {
    this.searchReasult = undefined;
  }

  redirectToDetails(productId:number):void{
    this.router.navigate([`details/${productId}`]);
  }

  submitSearch(value:string):void{
    this.router.navigate([`search/${value}`]);
  }

}
