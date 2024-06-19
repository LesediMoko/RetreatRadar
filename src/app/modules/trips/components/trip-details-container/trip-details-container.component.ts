import { Component } from '@angular/core';
import { TripDetailsComponent } from '../trip-details/trip-details.component';
import { Store } from '@ngrx/store';
import { ItineraryItemsState, TripsState } from '../../../../store/Types/states';
import {
  selectSelectedTrip,
  selectSelectedTripDuration,
  selectViewingTrip,
} from '../../../../store/Selectors/trips.selector';
import { AsyncPipe } from '@angular/common';
import {
  selectChosenCurrency,
  selectSelectedItemsGroupedByDay,
  selectTotalCostOfViewingTrip,
} from '../../../../store/Selectors/items.selector';
import { ActivatedRoute } from '@angular/router';
import { setViewingTripId } from '../../../../store/Actions/items.actions';
import { viewTrip } from '../../../../store/Actions/trips.actions';
import { ITrip } from '../../../common/types/app-types';

@Component({
  selector: 'app-trip-details-container',
  standalone: true,
  imports: [TripDetailsComponent, AsyncPipe],
  templateUrl: './trip-details-container.component.html',
  styleUrl: './trip-details-container.component.css',
})
export class TripDetailsContainerComponent {
  tripDuration$ = this.tripStore.select(selectSelectedTripDuration);
  selectedTrip$ = this.tripStore.select(selectViewingTrip);
  selectGroupedItems$ = this.itemStore.select(selectSelectedItemsGroupedByDay);
  totalCostViewingTrip$ = this.itemStore.select(selectTotalCostOfViewingTrip);
  selectedCurrency$ = this.itemStore.select(selectChosenCurrency);

  constructor(
    private tripStore: Store<TripsState>,
    private itemStore: Store<ItineraryItemsState>,
  ) {}
}
