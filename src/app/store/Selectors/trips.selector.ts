import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TripsState } from '../Types/states';
import { retreatRadarStoreTripsFeatureKey } from '..';
import { getDuration, convertFSTimestampToJSDate } from '../../modules/common/helpers/conversion-helpers';

export const selectTripsFeature = createFeatureSelector<TripsState>(retreatRadarStoreTripsFeatureKey);

export const selectTrips = createSelector(selectTripsFeature, state => state.trips);

export const selectSelectedTrip = createSelector(selectTripsFeature, state => state.selectedTrip);

export const selectViewingTrip = createSelector(selectTripsFeature, state => state.viewingTrip);

export const selectSelectedTripDuration = createSelector(selectTripsFeature, state => {
  const trip = state.viewingTrip;
  if (!trip) {
    return null;
  }
  const startDateJS = convertFSTimestampToJSDate(trip.startDate.seconds, trip.startDate.nanoseconds);
  const endDateJS = convertFSTimestampToJSDate(trip.endDate.seconds, trip.endDate.nanoseconds);
  return getDuration(startDateJS, endDateJS);
});
