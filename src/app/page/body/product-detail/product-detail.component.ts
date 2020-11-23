import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  product_id: number;

  constructor(private productService: ProductService, private cartService: CartService, 
    private activationRoute: ActivatedRoute) {  }

  ngOnInit(): void {
    this.activationRoute.params.subscribe(params=>{
      this.product_id = params['id'];
    });
    this.getProductById(this.product_id);
    window.scroll(0,0);
  }
  getProductById(id) {
   this.productService.getById(id).then(response=>{
     this.product = <any>response;
   })
   .catch(err=>{
     console.log(err)
   })
  }

  addProductToCart(){
    this.cartService.addProductToCart(this.product);
    this.cartService.changeMessage("added");
  }
}
