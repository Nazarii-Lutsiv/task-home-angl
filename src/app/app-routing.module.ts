import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeDetailsComponent} from './employee-details/employee-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'regist', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'detail/:id', component: EmployeeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
