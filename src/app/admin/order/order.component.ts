import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @ViewChild('closeButton') closeButton;

  listOrders;
  selectedOrder;
  editForm = new FormGroup({
    status: new FormControl(''),
    payment: new FormControl('')
  })
  constructor(private orderService: OrderService, private sharedService: SharedService, private router: Router) {
    this.getListOrder();
   }
   public closeModal(){
     this.closeButton.nativeElement.click();
   }
  getListOrder() {
    this.orderService.get().then(response=>{
      this.listOrders = response;
      this.paging();
    })
  }
  // delete
  delete(id?){
    let result = window.confirm("Bạn có chắc chắn xóa?");
    if(result) {
      this.orderService.delete(id).then( response => {
        // thành công
       this.getListOrder();
      })
    }
  }
  //edit
  openForm(list?){
    this.selectedOrder=list;
    this.editForm.setValue({
      status: list.status,
      payment: list.payment
    
    })
    
  }
  editOrder(){
    let order =  {
      id: this.selectedOrder.id,
      create_date: this.selectedOrder.create_date,
      customer_id: this.selectedOrder.customer_id,
      name: this.selectedOrder.customer.name,
      address:  this.selectedOrder.customer.address,
      phone:  this.selectedOrder.customer.phone,
      total_money: this.selectedOrder.total_money,
      status: this.editForm.value.status,
      payment: this.editForm.value.payment,
      
    }
    this.orderService.update(order).then(res => {
      this.getListOrder();
    })
    this.closeModal();
  }

  orderDetail(id?){
    this.sharedService.changeMessage(id);
    this.router.navigate(['/admin/orderDetail' + id]);
  }
  listOrderCurrent;
  currentPage;
  paging(event?) {
    if(event){
      this.currentPage =  event;
    }
    this.listOrderCurrent = this.listOrders.slice(5*(this.currentPage-1),5*(this.currentPage));
  }

  ngOnInit(): void {
  }

}
