import { isDevMode } from '@angular/core';
import { MetaReducer } from '@ngrx/store';
import { AppState } from './Types/states';

export const retreatRadarStoreUserFeatureKey = 'retreatRadarUserStore';
export const retreatRadarStoreTripsFeatureKey = 'retreatRadarTripsStore';
export const retreatRadarStoreEventsFeatureKey = 'retreatRadarEventsStore';

const initialState = {};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
