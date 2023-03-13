import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Seller } from 'src/app/models/seller';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit{
  constructor(private sellerService: SellerService, private router: Router) {}

  ngOnInit():void{
    this.sellerService.reloadSeller();
  }

  signUp(data: Seller): void {
    this.sellerService.addSeller(data);
  }
}
