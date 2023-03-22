import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResult: undefined | Product[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getSearchResult();
  }

  getSearchResult(): void {
    const query: null | string = this.route.snapshot.paramMap.get('query');
    if (query) this.productService.searchProducts(query) .subscribe((result: Product[]) => this.searchResult = result);
  }

}
