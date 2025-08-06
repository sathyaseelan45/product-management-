import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private readonly STORAGE_KEY='products';
  public _products=signal<Product[]>(this.loadproducts());

  readonly products = this._products.asReadonly(); 

  private loadproducts():Product[]{
    const data=localStorage.getItem(this.STORAGE_KEY);
    return data?JSON.parse(data):[];
  }

  public savetostorage(){
    localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this._products()))
  }


  addproduct(product:Product){
    const newproducts={...product,id:Date.now()};
    this._products.update(prev=>[...prev,newproducts]);
    this.savetostorage();
  }

  updateproduct(updated:Product){
    this._products.update(prev=>
      prev.map((p)=>(p.id===updated.id?updated:p))
    )
    this.savetostorage();
  }
  deleteproduct(id:number){
    this._products.update((prev)=>prev.filter((p)=>p.id!==id));
    this.savetostorage();
  }

  clearallproducts() {
  this._products.set([]);
  this.savetostorage();
}


}
