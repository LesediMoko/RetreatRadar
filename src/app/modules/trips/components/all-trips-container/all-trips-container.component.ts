import { Component } from '@angular/core';
import { AllTripsComponent } from '../all-trips/all-trips.component';
import { ItineraryItemsState, TripsState } from '../../../../store/Types/states';
import { Store } from '@ngrx/store';
import { selectSelectedTrip, selectTrips } from '../../../../store/Selectors/trips.selector';
import { selectChosenCurrency, selectItems } from '../../../../store/Selectors/items.selector';
import { AsyncPipe } from '@angular/common';
import { IItem, ITrip } from '../../../common/types/app-types';
import { deleteTrip, selectTrip, viewTrip } from '../../../../store/Actions/trips.actions';
import { deleteItem, setSelectedTripId, setViewingTripId } from '../../../../store/Actions/items.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-trips-container',
  standalone: true,
  imports: [AllTripsComponent, AsyncPipe],
  templateUrl: './all-trips-container.component.html',
  styleUrl: './all-trips-container.component.css',
})
export class AllTripsContainerComponent {
  allTripsList$ = this.tripStore.select(selectTrips);
  allItemsList$ = this.itemStore.select(selectItems);
  selectedTrip$ = this.tripStore.select(selectSelectedTrip);
  selectCurrency$ = this.itemStore.select(selectChosenCurrency);

  onClickSelectTrip(event: ITrip | null) {
    if (!event) return;
    this.tripStore.dispatch(selectTrip({ trip: event }));
    this.itemStore.dispatch(setSelectedTripId({ tripId: event.id }));
  }

  onClickViewTrip(event: ITrip | null) {
    if (!event) return;
    this.tripStore.dispatch(viewTrip({ trip: event }));
    this.itemStore.dispatch(setViewingTripId({ tripId: event.id }));
    this.router.navigate([`/app/trip/${event.id}`]);
  }

  onClickDeleteTrip(event: [ITrip | null, IItem[] | []] | null) {
    if (!event) return;
    if (!event[0]) return;
    const filteredItems = event[1].filter(item => item.tripId !== event[0]?.id);
    for (const item of filteredItems) {
      this.itemStore.dispatch(deleteItem({ id: item.id }));
    }
    this.tripStore.dispatch(deleteTrip({ id: event[0].id }));
    this.itemStore.dispatch(setSelectedTripId({ tripId: null }));
    this.itemStore.dispatch(setViewingTripId({ tripId: null }));
    this.tripStore.dispatch(selectTrip({ trip: null }));
  }

  constructor(
    private tripStore: Store<TripsState>,
    private itemStore: Store<ItineraryItemsState>,
    private router: Router,
  ) {}
}
