import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './models/product';
import { CommonModule } from '@angular/common';
import { ProductformComponent } from './components/productform/productform.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,CommonModule,ProductformComponent,ProductlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {

  selectedproduct?:Product;



  constructor(private productService:ProductService){}

  seteditproduct(product:Product){
    this.selectedproduct=product;
  }
  onsave(product:Product){
     if (product.id === 0) {
    this.productService.addproduct(product);
  } else {
    this.productService.updateproduct(product);
  }
    this.selectedproduct=undefined;
  }
}
