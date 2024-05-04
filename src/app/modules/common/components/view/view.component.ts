import { Component, Input, input } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ItemFormComponent } from '../../../items/components/item-form/item-form.component';
import { TripPanelComponent } from '../../../trips/components/trip-panel/trip-panel.component';
import { ionPersonSharp } from '@ng-icons/ionicons';
import { tablerCalendarPlus } from '@ng-icons/tabler-icons';
import { IUser } from '../../types/app-types';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent, TripPanelComponent, ItemFormComponent, RouterLink],
  viewProviders: [provideIcons({ ionPersonSharp, tablerCalendarPlus })],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  @Input() userProfile: IUser | null = null;
  constructor() {}
}
