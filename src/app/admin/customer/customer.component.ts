import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @ViewChild('closeButtonAdd') closeButtonAdd;
  @ViewChild('closeButtonEdit') closeButtonEdit;

  addForm = new FormGroup ({
    fullname: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
    role: new FormControl('',[Validators.required])
  })

  editForm = new FormGroup ({
    fullname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    role: new FormControl(''),
  })

  customers;
  listCustomer;
  selectedCustomer;
  roleUser="User";

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getListCustomer();
  }

  // get
  getListCustomer() {
    this.listCustomer = []
    this.customerService.get().then(res => {
      this.listCustomer = res;
      this.paging();
      console.log(this.listCustomer);
      
    }) 
    .catch(err => {
      console.log(err)
    })
  }

  //delete
  delete(id?) {
    let result = window.confirm("Bạn có chắc chắn xóa?");
    if(result){
      this.customerService.delete(id).then( res => {
        // Success
       this.getListCustomer();
      })
    }
    
  }

  //add
  addCustomer(){
    let customer =  {
      fullname: this.addForm.value.fullname,
      username: this.addForm.value.username,
      password: this.addForm.value.password,
      email: this.addForm.value.email,
      phone: this.addForm.value.phone,
      address: this.addForm.value.address,
      role: this.roleUser
    }
    this.customerService.add(customer).then(res => {
      this.getListCustomer();
    });
    this.closeModal("add");
    this.addForm.reset();
  };

  public closeModal(check): void {
    if(check == "add"){
      this.closeButtonAdd.nativeElement.click();
    }else
    this.closeButtonEdit.nativeElement.click();
  }

  //edit
  openForm(list?){
    this.selectedCustomer=list;
    this.editForm.setValue({
      fullname: list.fullname,
      username: list.username,
      password: list.password,
      email: list.email,
      phone: list.phone,
      address: list.address,
      role: list.role,
    })
  }

  editCustomer(){
    let customer =  {
      id: this.selectedCustomer.id,
      fullname: this.editForm.value.fullname,
      username: this.editForm.value.username,
      password: this.editForm.value.password,
      email: this.editForm.value.email,   
      phone: this.editForm.value.phone,
      address: this.editForm.value.address,
      role: this.editForm.value.role,
    }
    this.customerService.update(customer).then(res => {
      this.getListCustomer();
    })
    this.closeModal("edit");
  }

  listCustomerCurrent; //listCurrent
  currentPage = 1;

  paging(event?){
    if(event) {
      this.currentPage = event;
    }
    this.listCustomerCurrent = this.listCustomer.slice(5*(this.currentPage-1), 5*(this.currentPage));
  }

}
