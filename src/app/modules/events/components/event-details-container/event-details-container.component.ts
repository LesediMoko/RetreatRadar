import { Component } from '@angular/core';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { Store } from '@ngrx/store';
import { EventsState, ItineraryItemsState } from '../../../../store/Types/states';
import { selectSelectedEvent } from '../../../../store/Selectors/events.selector';
import { AsyncPipe } from '@angular/common';
import { selectChosenCurrency } from '../../../../store/Selectors/items.selector';

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
  constructor(
    private eventStore: Store<EventsState>,
    private itemStore: Store<ItineraryItemsState>,
  ) {}
}
