import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ManagementComponentComponent } from './management-component/management-component.component';
import { UserManagementComponentComponent } from './user-management-component/user-management-component.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ExitComponentComponent } from './exit-component/exit-component.component';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';
import { MENUS, PRODUCTS } from './home-component/data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';





const mgtChildrenRoutes: Routes = [
  { path: 'user', component: UserManagementComponentComponent },
  { path: 'product', component: ProductComponentComponent },
  { path: 'exit', component: ExitComponentComponent },
  { path: '', redirectTo: 'user', pathMatch: 'full' }
  ];
  const routes: Routes = [
  { path: 'home', component: HomeComponentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'management', component: ManagementComponentComponent, 
  children:mgtChildrenRoutes ,
    canActivate:[LoginGuard],
 } // <--- 增加嵌套路由
  ];
  
@NgModule({
  bootstrap: [AppComponent],
  providers:[LoginGuard,AuthService],
  declarations: [
    AppComponent,
    HomeComponentComponent,
    LoginComponentComponent,
    ManagementComponentComponent,
    UserManagementComponentComponent,
    ProductComponentComponent,
    ExitComponentComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // <---引入路由模块
  ],
  
  
})
export class AppModule {
  menus = MENUS;
  products = PRODUCTS;
 }