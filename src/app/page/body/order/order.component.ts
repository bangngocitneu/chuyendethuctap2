import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  listOrders;
  listOrderCurrent;
  currentPage = 1;

  constructor(private orderService: OrderService, private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.getListOrders();
  }
  getListOrders() {
    this.orderService.getByCustomerId(+localStorage.getItem("idCustomer")).then(response=>{
      this.listOrders = response;
      this.paging();
    })
  }
  detail(id){
    this.productService.changeMessage(id);
    this.router.navigate(['/page/orderDetail/'+id]);
  }
  paging(event?) {
    if(event) {
      this.currentPage = event;
    }
    this.listOrderCurrent = this.listOrders.slice(6*(this.currentPage-1), 6*(this.currentPage));
  }

}
