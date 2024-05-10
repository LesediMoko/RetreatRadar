import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ItemFormComponent } from '../../../items/components/item-form/item-form.component';
import { TripPanelComponent } from '../../../trips/components/trip-panel/trip-panel.component';
import { ionPersonSharp } from '@ng-icons/ionicons';
import { tablerCalendarPlus } from '@ng-icons/tabler-icons';
import { IUser } from '../../types/app-types';
import { TripPanelContainerComponent } from '../../../trips/components/trip-panel-container/trip-panel-container.component';
import { ItemFormContainerComponent } from '../../../items/components/item-form-container/item-form-container.component';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent, TripPanelContainerComponent, ItemFormContainerComponent, RouterLink],
  viewProviders: [provideIcons({ ionPersonSharp, tablerCalendarPlus })],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  @Input() userProfile: IUser | null = null;
  @Input() currentCurrency: string = 'ZAR';
  @Output() onClickLogout = new EventEmitter<void>();
  @Output() onCurrencyChange = new EventEmitter<Event>();
  constructor() {}
}
