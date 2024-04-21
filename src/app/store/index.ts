import { isDevMode } from '@angular/core';
import { MetaReducer } from '@ngrx/store';
import { AppState } from './Types/states';

export const retreatRadarStoreFeatureKey = 'retreatRadarStore';

const initialState = {};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
