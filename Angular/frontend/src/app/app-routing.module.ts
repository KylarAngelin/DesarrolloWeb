import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes

import { ProductsComponent } from './components/products/products.component'
import { PrivateProductsComponent } from './components/private-products/private-products.component'
import { SigninComponent } from './components/signin/signin.component'
import { SignupComponent } from './components/signup/signup.component'
import { AddProductsComponent } from './components/add-products/add-products.component'
import { SigninAdminComponent } from './components/signin-admin/signin-admin.component'
import { MyOrdersComponent } from './components/my-orders/my-orders.component'


import { AuthGuard } from './auth.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'private',
    component: PrivateProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'add-products',
    component: SigninAdminComponent
  },
  {
    path: 'products-to-add',
    component: AddProductsComponent
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
