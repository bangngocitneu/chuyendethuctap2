import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component';
import { ChungComponent } from './chung/chung.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [{ path: '', component: AdminComponent,
children:[
  { path: 'chung', component: ChungComponent },
    { path: 'product', component: ProductComponent },
    { path: 'order', component: OrderComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'orderDetail/:id', component: OrderDetailComponent}
  
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
