import { Component, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-productlist',
  standalone:true,
  imports: [CommonModule,DragDropModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent {
  
@Output() edit=new EventEmitter<Product>();
  constructor(private productService:ProductService){}

  get products() {
  return this.productService.products;
}

delete(id:number){
  this.productService.deleteproduct(id);
}

editproduct(product:Product){
  this.edit.emit(product);
}

clearall() {
  if (confirm('Are you sure you want to delete all products?')) {
    this.productService.clearallproducts(); 
  }
}

drop(event: CdkDragDrop<Product[]>) {
  const current = this.productService._products();
  moveItemInArray(current, event.previousIndex, event.currentIndex);
  this.productService.savetostorage();
}


}
