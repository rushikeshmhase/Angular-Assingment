import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './home/login/login.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { RegisterComponent } from './home/register/register.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './home/verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';
import { ViewtrainingComponent } from './home/viewtraining/viewtraining.component';
import { TrainingComponent } from './home/training/training.component';
import { UserdashboardComponent } from './home/userdashboard/userdashboard.component';
import { AssociatelistComponent } from './home/associatelist/associatelist.component';




const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'viewtraining', component: ViewtrainingComponent },
  { path: 'training', component: TrainingComponent },
  
  { path: 'userdashboard', component: UserdashboardComponent },
  { path: 'associate', component: AssociatelistComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

