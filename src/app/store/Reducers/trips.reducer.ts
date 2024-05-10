import { TripsState } from '../Types/states';
import { createReducer, on } from '@ngrx/store';
import * as TripsActions from '../Actions/trips.actions';

export const initialTripsState: TripsState = {
  trips: [],
  selectedTrip: null,
  viewingTrip: null,
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
  on(TripsActions.selectTrip, (state, { trip }) => ({
    ...state,
    selectedTrip: trip,
  })),
  on(TripsActions.viewTrip, (state, { trip }) => ({
    ...state,
    viewingTrip: trip,
  })),
  on(TripsActions.clearTripState, state => ({
    ...state,
    viewingTrip: null,
    selectedTrip: null,
    trips: [],
  })),
  on(TripsActions.updateTripSuccess, (state, { trip }) => {
    const newTrips = state.trips.map(currentTrip => (currentTrip.id === trip.id ? trip : currentTrip));
    return {
      ...state,
      trips: newTrips,
    };
  }),
  on(TripsActions.deleteTripSuccess, (state, { id }) => ({
    ...state,
    trips: state.trips.filter(trip => trip.id !== id),
  })),
);
