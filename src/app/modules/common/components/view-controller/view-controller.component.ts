import { Component, OnDestroy } from '@angular/core';
import { ItineraryItemsState, TripsState, UserState } from '../../../../store/Types/states';
import { Store } from '@ngrx/store';
import { selectUserID, selectUserProfile } from '../../../../store/Selectors/user.selector';
import { ViewComponent } from '../view/view.component';
import { AsyncPipe } from '@angular/common';
import { fetchProfile, logout } from '../../../../store/Actions/user.actions';
import { Subscription, map, pipe, take, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { clearItemState, fetchConversionRate, updateCurrency } from '../../../../store/Actions/items.actions';
import { clearTripState } from '../../../../store/Actions/trips.actions';
import { selectChosenCurrency } from '../../../../store/Selectors/items.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-controller',
  standalone: true,
  imports: [ViewComponent, AsyncPipe],
  templateUrl: './view-controller.component.html',
  styleUrl: './view-controller.component.css',
})
export class ViewControllerComponent implements OnDestroy {
  userProfileInfo$ = this.userStore.select(selectUserProfile);
  selectedCurrency$ = this.itemStore.select(selectChosenCurrency);
  selectedCurrencySubscription$ = new Subscription();
  constructor(
    private userStore: Store<UserState>,
    private tripStore: Store<TripsState>,
    private itemStore: Store<ItineraryItemsState>,
    private router: Router,
  ) {
    this.userProfileInfo$ = this.userStore.select(selectUserProfile);
  }
  logoutUser() {
    this.itemStore.dispatch(clearItemState());
    this.tripStore.dispatch(clearTripState());
    this.userStore.dispatch(logout());
    this.router.navigate([`/login`]);
  }
  chooseCurrency($event: Event) {
    const currencyOption = ($event.target as HTMLSelectElement).value;
    const currencyCode = currencyOption.split(' ')[1];
    this.selectedCurrencySubscription$ = this.selectedCurrency$.pipe(take(1)).subscribe(currency => {
      console.log(`from: ${currency} to: ${currencyCode}`);
      this.itemStore.dispatch(fetchConversionRate({ currencyFrom: currency, currencyTo: currencyCode }));
    });
    this.itemStore.dispatch(updateCurrency({ currency: currencyCode }));
  }
  ngOnDestroy() {
    this.selectedCurrencySubscription$.unsubscribe();
  }
}
