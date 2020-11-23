import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/service/cart.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
    isAuthenticated = false; // đăng nhập thành công sẽ set = true
    @ViewChild('closeButton') closeButton;
    @ViewChild('modal') modal;
  
    customer: Customer;
    customerLogined: Customer;
    roleUser = 'User'
    emailCustomer: string;
    message: string;
    countProductInCart: number;
    alertLogin = false;
  
    //a:any;
  
    constructor(private router: Router,private customerService: CustomerService, private cartService: CartService) { 
      this.cartService.currentMessage.subscribe(
        message => {
          if(message == "added"){
            this.countProductInCart++;
          } else if(message == "removed"){
            this.countProductInCart--;
          }
          else{
            this.checkCart();
          }
        }
      )
    }
    checkCart() {
     this.countProductInCart = this.cartService.getCart().length;
    }
  
    ngDoCheck(): void{
      this.customerLogined = JSON.parse(localStorage.getItem("customerLogined"));
      this.emailCustomer = localStorage.getItem("email");
      if("user" == localStorage.getItem("user")){
        this.isAuthenticated = true;
      }else 
      this.isAuthenticated = false;
    }
  
    RegisterForm = new FormGroup({
      fullname : new FormControl('',[Validators.required]),
      username : new FormControl('',[Validators.required]),
      passWord : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
      phone : new FormControl('',[Validators.required]),
      address : new FormControl('',[Validators.required]),
      role : new FormControl('',[Validators.required]),
    })
  
    LoginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
  
    public closeModal(): void{
      this.closeButton.nativeElement.click();
      
    }
    public openModal(): void{
      this.modal.nativeElement.click();
    }
  
    submitLogin(){
      this.customerService.getByUsername(this.LoginForm.value.username).then(response=>{
        this.customer = <any>response;
        if(this.customer.password == this.LoginForm.value.password && this.customer.role == this.roleUser){
          console.log("Đăng nhập thành công")
          localStorage.setItem("customerLogined",JSON.stringify(this.customer));
          localStorage.setItem('user','user');
          localStorage.setItem('username',this.customer.username);
          localStorage.setItem('idCustomer',this.customer.id.toString());
          this.closeModal();
        } else{
          console.log("Đăng nhập thất bại");
          this.alertLogin = true;
        }
      })
      .catch(err=>{
        console.log(err);
        this.alertLogin = true;
    })
    }
  
    submitRegister(){
      let customer = {
        fullname: this.RegisterForm.value.fullname,
        username: this.RegisterForm.value.username,
        password: this.RegisterForm.value.password,
        email: this.RegisterForm.value.email,
        phone: this.RegisterForm.value.phone,
        address: this.RegisterForm.value.address,
        role: this.roleUser
      }
      this.customerService.add(customer);
      this.closeModal();
      this.RegisterForm.reset();
      console.log("Đăng kí thành công!");
    }
  
    logout(){
      localStorage.removeItem("user");
      localStorage.removeItem("username");
      localStorage.removeItem("idCustomer");
      localStorage.removeItem("customerLogined");
      localStorage.removeItem("productCart");
      this.countProductInCart = 0;
      this.router.navigate(['/page/home']);
      console.log("logout success");
      alert('Đã đăng xuất')
      location.reload()
    }
   
    logined = "modalLRForm";
    toCart(){
      if("user" == localStorage.getItem("user")){
        this.router.navigate(['/public/cart']);
      }
      else {
        this.openModal();
      }
    }
    ngOnInit(): void {
    }
  
    close(){
      this.LoginForm.reset();
      this.RegisterForm.reset();
    }
  }

