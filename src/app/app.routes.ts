import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ProductsComponent } from './pages/products.component';
import { ProductDetailComponent } from './pages/product-detail.component';
import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';
import { DashboardComponent } from './pages/dashboard.component';
import { AdminProductsComponent } from './pages/admin-products.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
