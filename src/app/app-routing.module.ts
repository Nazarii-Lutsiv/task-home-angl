import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {EmployeeComponent} from './employee/employee.component';

const routes: Routes = [
  {path: 'regist', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'employee', component: EmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
