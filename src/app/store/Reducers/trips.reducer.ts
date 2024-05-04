import { TripsState } from '../Types/states';
import { createReducer, on } from '@ngrx/store';
import * as TripsActions from '../Actions/trips.actions';

export const initialTripsState: TripsState = {
  trips: [],
  selectedTrip: null,
};

export const tripsReducer = createReducer(
  initialTripsState,
  on(TripsActions.addTripSuccess, (state, { trip }) => ({
    ...state,
    trips: [...state.trips, trip],
  })),
  on(TripsActions.loadTripsSuccess, (state, { trips }) => ({
    ...state,
    trips,
  })),
);
