import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { BarangListComponent } from './pages/barang/barang-list/barang-list.component';
import { AuthGuard, PreventGuard } from './guards/auth-guard.guard';
import { MainComponent } from './pages/main/main/main.component';
import { BarangDetailComponent } from './pages/barang/barang-detail/barang-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BarangCreateComponent } from './pages/barang/barang-create/barang-create.component';
import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderCreateComponent } from './pages/orders/order-create/order-create.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
    canActivate: [PreventGuard],
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'barang',
        component: BarangListComponent,
      },
      {
        path: 'barang/new',
        component: BarangCreateComponent,
      },
      {
        path: 'customer',
        component: CustomerListComponent,
      },
      {
        path: 'order',
        component: OrderListComponent,
      },
      {
        path: 'order/new',
        component: OrderCreateComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
