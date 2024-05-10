import { Component } from '@angular/core';
import { AddTripFormComponent } from '../add-trip-form/add-trip-form.component';
import { Store } from '@ngrx/store';
import { TripsState, UserState } from '../../../../store/Types/states';
import { selectUserID } from '../../../../store/Selectors/user.selector';
import { AsyncPipe } from '@angular/common';
import { IAddTripForm } from '../../../common/types/app-types';
import { addTrip } from '../../../../store/Actions/trips.actions';

@Component({
  selector: 'app-add-trip-form-container',
  standalone: true,
  imports: [AddTripFormComponent, AsyncPipe],
  templateUrl: './add-trip-form-container.component.html',
  styleUrl: './add-trip-form-container.component.css',
})
export class AddTripFormContainerComponent {
  selectCurrentUser$ = this.userStore.select(selectUserID);

  constructor(
    private userStore: Store<UserState>,
    private tripStore: Store<TripsState>,
  ) {}
  addTripSubmit($event: IAddTripForm) {
    this.tripStore.dispatch(addTrip({ trip: $event }));
  }
}
