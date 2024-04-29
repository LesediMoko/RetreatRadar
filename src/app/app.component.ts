import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './modules/register/components/register/register.component';
import { SplashComponent } from './modules/splash/components/splash/splash.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, RegisterComponent, SplashComponent],
})
export class AppComponent {}
