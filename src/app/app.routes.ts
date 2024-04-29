import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/register/components/register/register.component';
import { SplashComponent } from './modules/splash/components/splash/splash.component';
import { LoginComponent } from './modules/login/components/login/login.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { authGuardGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuardGuard] },
];
