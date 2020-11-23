import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customer: Customer;
  roleAdmin = 'Admin';
  alertLogin = false;
  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  LoginForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })

  submitLogin(){
    this.customerService.getByUsername(this.LoginForm.value.username).then(response=>{
      this.customer = <any>response;
      if(this.customer.password == this.LoginForm.value.password && this.customer.role == this.roleAdmin){
        console.log("login success");
        localStorage.setItem('admin','admin')
        this.router.navigate(['/admin']);
        alert("Admin đã đăng nhập!");

      }
      else{
        console.log("login failse");
        this.alertLogin = true;
      }
    })
    .catch(err=>{
      console.log(err);
      this.alertLogin = true;
    })
  }
}
