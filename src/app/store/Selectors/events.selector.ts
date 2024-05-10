import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, EventsState } from '../Types/states';
import { retreatRadarStoreEventsFeatureKey } from '..';

export const selectEventsFeature = createFeatureSelector<EventsState>(retreatRadarStoreEventsFeatureKey);

export const selectEvents = createSelector(selectEventsFeature, state => state.events);

export const selectSelectedEvent = createSelector(selectEventsFeature, state => state.selectedEvent);
