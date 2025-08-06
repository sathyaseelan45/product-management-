import { Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productform',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './productform.component.html',
  styleUrl: './productform.component.css'
})
export class ProductformComponent implements OnChanges {

  @Input() editproduct?:Product;
  @Output() saveproduct = new EventEmitter<Product>();
  form:FormGroup;

  constructor(private productService:ProductService,private fb:FormBuilder){
    this.form=this.fb.group({
      id:[0],
      name:['',Validators.required],
      price:[0,Validators.required],
      category:['',Validators.required]
    });

  }

  ngOnChanges(): void {
    if(this.editproduct){
       this.form.patchValue(this.editproduct)
    }
  }

  save(){
     if (this.form.invalid) {
    this.form.markAllAsTouched();
    return; 
  }
    const product=this.form.value as Product;
    this.form.reset({id:0,name:'',price:0,category:''});
    this.saveproduct.emit(product);
  }
}
