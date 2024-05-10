import { Component } from '@angular/core';
import { TripPanelComponent } from '../trip-panel/trip-panel.component';
import { Store } from '@ngrx/store';
import { ItineraryItemsState, TripsState, UserState } from '../../../../store/Types/states';
import { selectSelectedTrip } from '../../../../store/Selectors/trips.selector';
import {
  selectItemsBySelectedTripId,
  selectSelctedItemsDaysList,
  selectSelectedTripPanelDay,
  selectSelectedTripPanelDayItems,
  selectTotalCostOfSelectedTrip,
} from '../../../../store/Selectors/items.selector';
import { AsyncPipe } from '@angular/common';
import { selectTripPanelDay } from '../../../../store/Actions/items.actions';
import { selectChosenCurrency } from '../../../../store/Selectors/items.selector';

@Component({
  selector: 'app-trip-panel-container',
  standalone: true,
  imports: [TripPanelComponent, AsyncPipe],
  templateUrl: './trip-panel-container.component.html',
  styleUrl: './trip-panel-container.component.css',
})
export class TripPanelContainerComponent {
  selectedTrip$ = this.tripStore.select(selectSelectedTrip);
  selectedTripItems$ = this.itemStore.select(selectItemsBySelectedTripId);
  selectedTripDays$ = this.itemStore.select(selectSelctedItemsDaysList);
  selectedTripItemsByDay$ = this.itemStore.select(selectSelectedTripPanelDayItems);
  selectedTripDay$ = this.itemStore.select(selectSelectedTripPanelDay);
  selectTotalCostSelectedTrip$ = this.itemStore.select(selectTotalCostOfSelectedTrip);
  selectCurrency$ = this.itemStore.select(selectChosenCurrency);
  constructor(
    private tripStore: Store<TripsState>,
    private itemStore: Store<ItineraryItemsState>,
    private userStore: Store<UserState>,
  ) {}

  selectClickedDay($event: string | null) {
    if (!$event) return;
    console.log('day clicked:', $event);
    this.itemStore.dispatch(selectTripPanelDay({ day: $event }));
  }
}
