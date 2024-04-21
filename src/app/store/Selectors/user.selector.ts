import { createSelector } from '@ngrx/store';
import { AppState, UserState } from '../Types/states';

export const selectUserFeature = (state: UserState) => state;

export const selectUserProfile = createSelector(selectUserFeature, userState => userState.currentUserProfile);
export const selectUserID = createSelector(selectUserFeature, userState => userState.uid);
export const selectIsAuthenticated = createSelector(selectUserFeature, userState => userState.isAuthenticated);
