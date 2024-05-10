import { Component } from '@angular/core';
import { EditTripFormComponent } from '../edit-trip-form/edit-trip-form.component';
import { TripsState, UserState } from '../../../../store/Types/states';
import { Store } from '@ngrx/store';
import { selectUserID } from '../../../../store/Selectors/user.selector';
import { IAddTripForm, ITrip } from '../../../common/types/app-types';
import { selectViewingTrip } from '../../../../store/Selectors/trips.selector';
import { AsyncPipe } from '@angular/common';
import { updateTrip } from '../../../../store/Actions/trips.actions';

@Component({
  selector: 'app-edit-trip-form-container',
  standalone: true,
  imports: [EditTripFormComponent, AsyncPipe],
  templateUrl: './edit-trip-form-container.component.html',
  styleUrl: './edit-trip-form-container.component.css',
})
export class EditTripFormContainerComponent {
  selectCurrentUser$ = this.userStore.select(selectUserID);
  selectCurrentViewingTrip$ = this.tripStore.select(selectViewingTrip);

  constructor(
    private userStore: Store<UserState>,
    private tripStore: Store<TripsState>,
  ) {}
  editTripSubmit($event: ITrip) {
    this.tripStore.dispatch(updateTrip({ trip: $event }));
  }
}
