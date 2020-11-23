import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, { path: 'page',
 loadChildren: () => import('./page/page.module').then(m => m.PageModule) },
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) }, 
  { path: 'cart', loadChildren: () => import('./page/body/cart/cart.module').then(m => m.CartModule) },
   { path: 'home', loadChildren: () => import('./page/body/home/home.module').then(m => m.HomeModule) },
    { path: 'product-detail', loadChildren: () => import('./page/body/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
     { path: 'product-detail', loadChildren: () => import('./page/body/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
      { path: 'order', loadChildren: () => import('./page/body/order/order.module').then(m => m.OrderModule) }, 
      { path: 'order-detail', loadChildren: () => import('./page/body/order-detail/order-detail.module').then(m => m.OrderDetailModule) }
      
    ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
