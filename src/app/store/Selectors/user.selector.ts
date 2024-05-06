import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, UserState } from '../Types/states';
import { retreatRadarStoreUserFeatureKey } from '..';

export const selectUserFeature = createFeatureSelector<UserState>(retreatRadarStoreUserFeatureKey);

export const selectUserProfile = createSelector(selectUserFeature, userState => {
  return userState.currentUserProfile;
});
export const selectUserID = createSelector(selectUserFeature, userState => userState.uid);
export const selectIsAuthenticated = createSelector(selectUserFeature, userState => userState.isAuthenticated);
