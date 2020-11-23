import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailService } from 'src/app/service/order-detail.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  listOrderDetail;
  orderId: number;
  constructor(private sharedService: SharedService,private orderDetailService: OrderDetailService,private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params=>this.orderId = params['id']);
    console.log(this.orderId);
    this.getListOrderById(this.orderId);
  }
  getListOrderById(id) {
    this.orderDetailService.getByOrderId(id).then(response=>{
      this.listOrderDetail = response
    })
    .catch(err=>{
      console.log(err)
    })
  }

}
