import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './pages/signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { BarangListComponent } from './pages/barang/barang-list/barang-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { PagingComponent } from './components/paging/paging.component';
import { BarangCreateComponent } from './pages/barang/barang-create/barang-create.component';
import { MainComponent } from './pages/main/main/main.component';
import { BarangDetailComponent } from './pages/barang/barang-detail/barang-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WidgetBarangDetailComponent } from './widgets/widget-barang-detail/widget-barang-detail.component';
import { MenuComponent } from './components/menu/menu.component';
import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component';
import { CustomerCreateComponent } from './pages/customers/customer-create/customer-create.component';

import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { WidgetsCustomerCreateComponent } from './widgets/widgets-customer-create/widgets-customer-create.component';
import { WidgetCustomerDetailComponent } from './widgets/widget-customer-detail/widget-customer-detail.component';
import { OrderCreateComponent } from './pages/orders/order-create/order-create.component';
import { ValidationComponent } from './components/validation/validation.component';
import { WidgetBarangCreateComponent } from './widgets/widget-barang-create/widget-barang-create.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SigninComponent,
    BarangListComponent,
    ErrorMessageComponent,
    PagingComponent,
    BarangCreateComponent,
    MainComponent,
    BarangDetailComponent,
    NotFoundComponent,
    WidgetBarangDetailComponent,
    MenuComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    WidgetsCustomerCreateComponent,

    OrderListComponent,
    OrderCreateComponent,
    WidgetCustomerDetailComponent,
    ValidationComponent,
    WidgetBarangCreateComponent,
    CategoryListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
