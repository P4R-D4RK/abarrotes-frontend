import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClientsListComponent } from './components/clients/clients-list/clients-list.component';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/orders/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'products', component: ProductsListComponent, canActivate:[AuthGuard] },
  { path: 'clients', component: ClientsListComponent, canActivate:[AuthGuard] },
  { path: 'employees', component: EmployeesListComponent, canActivate:[AuthGuard] },
  { path: 'shoppingCart', component: ShoppingCartComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
