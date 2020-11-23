import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/service/cart.service';
import { OrderDetailService } from 'src/app/service/order-detail.service';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = [];
  constructor(private cartService: CartService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private router: Router) { }

  ngOnInit(): void {
    this.setCountProduct();
  }

  customerId: number;
  countNum: number = 0;
  products = [];
  total: number = 0;
  payment = "Thanh toán khi nhận hàng";
  status = "Chưa thanh toán";
  arr = [];
  address;
  phone;

  setCountProduct() {
    let items = this.cartService.getCart();
    let selected = {};
    this.countNum = items.length;
    for(let object of items){
      if(selected[object.id]){
        selected[object.id].count++;
      }
      else{
        selected[object.id] = {...object, count: 1};
      }
    }
    this.products = Object.keys(selected).map(key =>selected[key])
    // this.total = this.products.reduce(a,b) => a + (b.count * b.price,0);
    console.log(this.products);
    
    this.products.forEach(item=>{
      let od = {
          product_name: item.name,
          quantity: item.count,
          price: item.price
      };

      console.log(od);
      this.arr.push(od);
    });
    console.log(this.arr);
  }

  addToCart(product: Product){
    this.total = this.total + Number(product.price);
    this.cartService.addProductToCart(product.name);
    this.setCountProduct();
  }
  deleteProductToCart(product: Product){
    this.total = this.total - Number(product.price);
    this.cartService.deleteProductToCart(product.name);
    this.setCountProduct();
  }

  removeProduct(product){
    this.cartService.removeProduct(product.name, product.count);
    this.setCountProduct();
  }

  order(){
    this.customerId = +localStorage.getItem('idCustomer');
    let orders ={
      create_date: Date.now(),
      id_customer: this.customerId,
      address: this.address,
      phone : this.phone,
      total_money: this.total,
      status: this.status,
      payment: this.payment
     
    }
    let resutl = window.confirm("Bạn có chắc chắn muốn đặt hàng?");
    if(resutl){
      this.orderService.add(orders).then(()=>{
          this.orderDetailService.add(this.arr).then(()=>{
            sessionStorage.removeItem("productCart");
            this.router.navigate(['/public/order']);
          })
      })
    }
  }
}
