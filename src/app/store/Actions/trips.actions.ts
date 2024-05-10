import { createAction, props } from '@ngrx/store';
import { IAddTripForm, ITrip } from '../../modules/common/types/app-types';

export const loadTrips = createAction('[Trips] LoadTrips', props<{ uid: string }>());
export const loadTripsSuccess = createAction('[Trips] LoadTripsSuccess', props<{ trips: ITrip[] }>());

export const addTrip = createAction('[Trips] AddTrip', props<{ trip: IAddTripForm }>());
export const addTripSuccess = createAction('[Trips] AddTripSuccess', props<{ trip: ITrip }>());

export const updateTrip = createAction('[Trips] UpdateTrip', props<{ trip: ITrip }>());
export const updateTripSuccess = createAction('[Trips] UpdateTripSuccess', props<{ trip: ITrip }>());

export const deleteTrip = createAction('[Trips] DeleteTrip', props<{ id: string }>());
export const deleteTripSuccess = createAction('[Trips] DeleteTripSuccess', props<{ id: string }>());

export const selectTrip = createAction('[Trips] SelectTrip', props<{ trip: ITrip | null }>());
export const viewTrip = createAction('[Trips] ViewTrip', props<{ trip: ITrip }>());

export const clearTripState = createAction('[Trips] ClearTripState');
