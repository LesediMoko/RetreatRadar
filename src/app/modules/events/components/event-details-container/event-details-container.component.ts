import { Component } from '@angular/core';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { Store } from '@ngrx/store';
import { EventsState, ItineraryItemsState } from '../../../../store/Types/states';
import { selectSelectedEvent } from '../../../../store/Selectors/events.selector';
import { AsyncPipe } from '@angular/common';
import {
  selectChosenCurrency,
  selectItemIdsBySelectedTripId,
  selectSelectedTripId,
} from '../../../../store/Selectors/items.selector';
import { selectSelectedTrip } from '../../../../store/Selectors/trips.selector';
import { TripsState } from '../../../../store/Types/states';
import { IItem } from '../../../common/types/app-types';

@Component({
  selector: 'app-event-details-container',
  standalone: true,
  imports: [EventDetailsComponent, AsyncPipe],
  templateUrl: './event-details-container.component.html',
  styleUrl: './event-details-container.component.css',
})
export class EventDetailsContainerComponent {
  eventInfo$ = this.eventStore.select(selectSelectedEvent);
  selectedCurrency$ = this.itemStore.select(selectChosenCurrency);
  selectedTripId$ = this.tripStore.select(selectSelectedTripId);
  selectedTripItemsIds$ = this.itemStore.select(selectItemIdsBySelectedTripId);
  constructor(
    private eventStore: Store<EventsState>,
    private itemStore: Store<ItineraryItemsState>,
    private tripStore: Store<TripsState>,
  ) {}
  // addEventSubmit($event: IItem) {
  //   this.itemStore.dispatch(addItem({ item: $event }));
  // }
}
