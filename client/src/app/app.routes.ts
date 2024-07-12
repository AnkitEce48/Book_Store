import { Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders.component';
import HomeComponent from './pages/home/home.component';
import RegisterComponent from './pages/register/register.component';
import LoginComponent from './pages/login/login.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ViewdetailsComponent } from './pages/viewdetails/viewdetails.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { CartComponent } from './pages/cart/cart.component';
import { AccountComponent } from './pages/account/account.component';
import { Error404Component } from './pages/error404/error404.component';
import { AuthguardService } from './services/authguard.service';

export const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'home', component:HomeComponent},
  { path: 'orders', component:OrdersComponent, canActivate: [AuthguardService]},
  { path: 'checkout', component:CheckoutComponent, canActivate: [AuthguardService]},
  { path: 'viewdetails/:id', component:ViewdetailsComponent},
  { path: 'aboutus', component:AboutusComponent},
  { path: 'cart', component:CartComponent, canActivate: [AuthguardService]},
  { path: 'account', component:AccountComponent, canActivate: [AuthguardService]},
  { path: 'error', component:Error404Component},

];
