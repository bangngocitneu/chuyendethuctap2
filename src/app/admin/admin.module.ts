import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ChungComponent } from './chung/chung.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order/order.component';


@NgModule({
  declarations: [AdminComponent, ProductComponent, CustomerComponent, CategoryComponent,OrderComponent, OrderDetailComponent, ChungComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminModule { }
