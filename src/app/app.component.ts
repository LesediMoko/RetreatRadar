import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './modules/register/components/register/register.component';
import { SplashComponent } from './modules/splash/components/splash/splash.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { TripPanelComponent } from './modules/trips/components/trip-panel/trip-panel.component';
import { ItemFormComponent } from './modules/items/components/item-form/item-form.component';
import { tablerCalendarPlus } from '@ng-icons/tabler-icons';
import { ionPersonSharp } from '@ng-icons/ionicons';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet],
})
export class AppComponent {}
