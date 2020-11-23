import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  active = 'overView'
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.active = 'overView'
    this.router.navigate(['/admin/chung'])
  }
  logout(){
    localStorage.removeItem("admin");
    this.router.navigate(['/shared/login']);
    alert("Đăng xuất thành công");
    location.reload;
  }
  changeSelected(intemSelected) {
    this.active = intemSelected
    console.log(this.active)
  }
}
