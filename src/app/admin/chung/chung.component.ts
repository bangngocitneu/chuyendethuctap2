import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { CustomerService } from 'src/app/service/customer.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-chung',
  templateUrl: './chung.component.html',
  styleUrls: ['./chung.component.css']
})
export class ChungComponent implements OnInit {

  constructor(private category: CategoryService, private product: ProductService, private customer: CustomerService, private oder: OrderService) { }


  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProduct();
    this.getAllCustomer();
    this.getAllOrder();
    window.scroll(0,0);
  }

  countCategory: number;
  listCategory;
  countProduct: number;
  listProduct;
  countCustomer: number;
  listCustomer;
  countOrder: number;
  listOrder;

  getAllOrder() {
    this.listOrder = [];
    this.oder.get().then(response=>{
      this.listOrder = response;
      this.countOrder =  this.listOrder.length;
    })
    .catch(err=>{
      console.log(err)
    })
  }
  getAllCustomer() {
    this.listCustomer = [];
    this.customer.get().then(response=>{
      this.listCustomer = response;
      this.countCustomer =  this.listCustomer.length;
    })
    .catch(err=>{
      console.log(err)
    })
  }
  getAllProduct() {
    this.listProduct = [];
    this.product.get().then(response=>{
      this.listProduct = response;
      this.countProduct =  this.listProduct.length;
    })
    .catch(err=>{
      console.log(err)
    })
  }
  getAllCategory() {
    this.listCategory = [];
    this.category.get().then(response=>{
      this.listCategory = response;
      this.countCategory =  this.listCategory.length;
    })
    .catch(err=>{
      console.log(err)
    })
  }

}
