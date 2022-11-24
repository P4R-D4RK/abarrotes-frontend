import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

import { ClientsFormComponent } from './components/clients/clients-form/clients-form.component';
import { ClientsListComponent } from './components/clients/clients-list/clients-list.component';
import { ProductsFormComponent } from './components/products/products-form/products-form.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { EmployeesFormComponent } from './components/employees/employees-form/employees-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/orders/shopping-cart/shopping-cart.component';
import { OrderFormComponent } from './components/orders/order-form/order-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsFormComponent,
    ClientsListComponent,
    ProductsFormComponent,
    ProductsListComponent,
    NavbarComponent,
    HomeComponent,
    EmployeesListComponent,
    EmployeesFormComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingCartComponent,
    OrderFormComponent
  ],
  imports: [
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
