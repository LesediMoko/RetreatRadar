import { Routes } from '@angular/router';
import { RegisterComponent } from './modules/register/components/register/register.component';
import { SplashComponent } from './modules/splash/components/splash/splash.component';
import { LoginComponent } from './modules/login/components/login/login.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { AppComponent } from './app.component';
import { ViewComponent } from './modules/common/components/view/view.component';
import { ViewControllerComponent } from './modules/common/components/view-controller/view-controller.component';
import { HomeContainerComponent } from './modules/home/components/home-container/home-container.component';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app', component: ViewControllerComponent, children: [{ path: 'home', component: HomeContainerComponent }] },
];
