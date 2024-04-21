import { createAction, props } from '@ngrx/store';
import { ITrip } from '../../modules/common/types/app-types';

export const loadTrips = createAction('[Trips] LoadTrips');
export const loadTripsSuccess = createAction('[Trips] LoadTripsSuccess', props<{ trips: ITrip[] }>());
export const loadTripsFailure = createAction('[Trips] LoadTripsFailure', props<{ message: string }>());

export const addTrip = createAction('[Trips] AddTrip', props<{ trip: ITrip }>());
export const addTripSuccess = createAction('[Trips] AddTripSuccess', props<{ trip: ITrip }>());
export const addTripFailure = createAction('[Trips] AddTripFailure', props<{ message: string }>());

export const updateTrip = createAction('[Trips] UpdateTrip', props<{ trip: ITrip }>());
export const updateTripSuccess = createAction('[Trips] UpdateTripSuccess', props<{ trip: ITrip }>());
export const updateTripFailure = createAction('[Trips] UpdateTripFailure', props<{ message: string }>());

export const deleteTrip = createAction('[Trips] DeleteTrip', props<{ id: number }>());
export const deleteTripSuccess = createAction('[Trips] DeleteTripSuccess', props<{ id: number }>());
export const deleteTripFailure = createAction('[Trips] DeleteTripFailure', props<{ message: string }>());

export const selectTrip = createAction('[Trips] SelectTrip', props<{ id: number }>());
