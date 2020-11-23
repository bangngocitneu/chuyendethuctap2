import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listProduct;
  listProductByCategory;
  listCategory;
  listProductCurrent;
  currentCategory: number;
  currentPage = 1;
  message: number;

  constructor(private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getListProduct();
    this.getListCategory();
    this.productService.currentMessage.subscribe(message => this.message = this.message);
  }
  getListCategory() {
    this.categoryService.get().then(response=>{
      this.listCategory = response;
    })
  }
  getListProduct() {
    this.listProduct = [];
    this.productService.get().then(response=>{
      this.listProduct = response;
      this.paging();
      console.log(this.listProduct);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  countListProductByCategory(){
    let temp = [];
    for(let i=0;i<this.listProduct.length;i++){
      let element = this.listProduct[i];
      if(element.category_id == this.currentCategory){
        temp.push(element)
      }
    }
    this.listProductCurrent = temp;
  }
  countListProductCurrent() {
    let temp = []
    for(let i=0; i < this.listProduct.length; i++){
      let element = this.listProduct[i];
      if(element.product_id == this.currentCategory) {
        temp.push(element)
      }
    }
    this.listProductCurrent = temp
  }

  selectCategory(id){
    if(id==0){
      this.getListProduct();
    }
    this.currentCategory=id;
    this.countListProductCurrent();
    console.log(this.listProductCurrent);

  }

   detail(id?){
    this.productService.changeMessage(id);
    this.router.navigate([`/page/product-detail/${id}`]);
   }

   addProductToCart(product: Product){
     this.cartService.addProductToCart(product);
   }
  paging(event?) {
    if(event) {
      this.currentPage = event;
    }
    this.listProductCurrent = this.listProduct.slice(9*(this.currentPage-1), 9*(this.currentPage));

}
search(event?){
  if(event){
    this.listProductCurrent =  event;
  }
}
}
