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
import { NotFoundComponent } from './modules/common/components/not-found/not-found.component';
import { EventDetailsContainerComponent } from './modules/events/components/event-details-container/event-details-container.component';
import { AllTripsContainerComponent } from './modules/trips/components/all-trips-container/all-trips-container.component';
import { TripDetailsContainerComponent } from './modules/trips/components/trip-details-container/trip-details-container.component';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: ViewControllerComponent,
    canActivate: [authGuardGuard],
    children: [
      { path: 'home', component: HomeContainerComponent },
      { path: 'event-details/:id', component: EventDetailsContainerComponent },
      { path: 'trips', component: AllTripsContainerComponent },
      { path: 'trip/:id', component: TripDetailsContainerComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
