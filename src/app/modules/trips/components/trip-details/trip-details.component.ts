import { Component, Input } from '@angular/core';
import { GroupedItem, ITrip } from '../../../common/types/app-types';
import { FSTimestampPipe } from '../../../common/pipes/fs-timestamp.pipe';
import { DatePipe } from '@angular/common';
import { ViewingTripDayComponent } from '../viewing-trip-day/viewing-trip-day.component';
import { ionPencil } from '@ng-icons/ionicons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { EditTripFormContainerComponent } from '../edit-trip-form-container/edit-trip-form-container.component';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css',
  imports: [FSTimestampPipe, DatePipe, ViewingTripDayComponent, NgIconComponent, EditTripFormContainerComponent],
  viewProviders: [provideIcons({ ionPencil })],
})
export class TripDetailsComponent {
  @Input() trip: ITrip | null = null;
  @Input() tripDuration: number | null = null;
  @Input() groupedItems: GroupedItem[] | null = null;
  @Input() totalCost: number | null = null;
  constructor() {
    console.log(this.groupedItems);
  }
}
