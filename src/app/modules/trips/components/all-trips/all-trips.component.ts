import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem, ITrip } from '../../../common/types/app-types';
import { AllTripsCardComponent } from '../all-trips-card/all-trips-card.component';
import { ionAddSharp } from '@ng-icons/ionicons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AddTripFormContainerComponent } from '../add-trip-form-container/add-trip-form-container.component';

@Component({
  selector: 'app-all-trips',
  standalone: true,
  imports: [AllTripsCardComponent, NgIconComponent, AddTripFormContainerComponent],
  templateUrl: './all-trips.component.html',
  styleUrl: './all-trips.component.css',
  viewProviders: [provideIcons({ ionAddSharp })],
})
export class AllTripsComponent {
  @Input() allTripsList: ITrip[] = [];
  @Input() allItemsList: IItem[] = [];
  @Input() selectedTrip: ITrip | null = null;
  @Input() selectedCurrency = 'ZAR';
  @Output() onTripClick = new EventEmitter<ITrip | null>();
  @Output() onTripViewClick = new EventEmitter<ITrip | null>();
  @Output() onTripDeleteClick = new EventEmitter<[ITrip | null, IItem[] | []] | null>();

  handleTripClick(trip: ITrip) {
    this.onTripClick.emit(trip);
  }

  handleTripViewClick(trip: ITrip) {
    this.onTripViewClick.emit(trip);
  }
  handleTripDeleteClick($event: [ITrip | null, IItem[] | []] | null) {
    this.onTripDeleteClick.emit($event);
  }
}
