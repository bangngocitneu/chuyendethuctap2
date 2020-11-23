import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = [];
  constructor() { 
    this.cart = JSON.parse(sessionStorage.getItem("productCart"));
    if(this.cart == null)
    this.cart = [];
  }
  private messageSource = new BehaviorSubject("chuaAdd");
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string){
    this.messageSource.next(message);
  }

  getCart(){
    return this.cart;
  }
  addProductToCart(product){
    this.cart.push(product);
    sessionStorage.setItem("productCart", JSON.stringify(this.cart));
    this.changeMessage("added");
  }
  deleteProductToCart(nameProduct: string){
    let index: number = this.cart.findIndex(x => x.name === nameProduct)
    this.cart.splice(index,1);
    sessionStorage.setItem("productCart", JSON.stringify(this.cart));
    this.changeMessage("removed");
  }
  removeProduct(nameProduct: String, count: number){
    let length = this.cart.length
    for(let i=0; i< length;){
      if(this.cart[i].name === nameProduct){
        this.cart.splice(i,1);
        length--;
      }
      else{
        i++;
      }
    }
    sessionStorage.setItem("productCart",JSON.stringify(this.cart));
    for(let i=0;i<count;i++){
      this.changeMessage("removed");
    }
  }
}
