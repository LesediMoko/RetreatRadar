import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem, ITrip } from '../../../common/types/app-types';
import { TripPanelDaysBadgesComponent } from '../trip-panel-days-badges/trip-panel-days-badges.component';
import { FSTimestampPipe } from '../../../common/pipes/fs-timestamp.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-trip-panel',
  standalone: true,
  templateUrl: './trip-panel.component.html',
  styleUrl: './trip-panel.component.css',
  imports: [TripPanelDaysBadgesComponent, FSTimestampPipe, DatePipe, CurrencyPipe],
})
export class TripPanelComponent {
  @Input() selectedTrip: ITrip | null = null;
  @Input() selectedTripItems: IItem[] = [];
  @Input() selectedTripDays: string[] = [];
  @Input() selectedTripItemsByDay: IItem[] = [];
  @Input() selectedTripDay: string | null = null;
  @Input() totalCostSelectedTrip: number = 0;
  @Input() selectedCurrency: string = 'ZAR';
  @Output() dayClick = new EventEmitter<string | null>();

  dayClicked(day: string) {
    this.dayClick.emit(day);
  }
}
