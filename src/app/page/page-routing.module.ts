import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './page.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  { path: '',component: PageComponent ,
  children:[
    {
      path: 'home',
      pathMatch: 'full',
      loadChildren: () => import('../page/body/home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'detail/:id',
      loadChildren: () => import('../page/body/product-detail/product-detail.module').then(m => m.ProductDetailModule)
    },
    {
      path: 'cart',
      loadChildren: () => import('../page/body/cart/cart.module').then(m => m.CartModule)
    },
    {
      path: 'order',
      loadChildren: () => import('../page/body/order/order.module').then(m => m.OrderModule)
    },
    {
      path: 'orderDetail/:id',
      loadChildren: () => import('../page/body/order-detail/order-detail.module').then(m => m.OrderDetailModule)
    }
  ]
}
  ];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
