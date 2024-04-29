import { createAction, props } from '@ngrx/store';
import { IPreferences } from '../../modules/common/types/app-types';

export const loadPreferences = createAction('[Preferences] LoadPreferences');
export const loadPreferencesSuccess = createAction(
  '[Preferences] LoadPreferencesSuccess',
  props<{ preferences: IPreferences }>(),
);
export const loadPreferencesFailure = createAction(
  '[Preferences] LoadPreferencesFailure',
  props<{ message: string }>(),
);

export const updatePreferences = createAction(
  '[Preferences] UpdatePreferences',
  props<{ preferences: IPreferences }>(),
);
export const updatePreferencesSuccess = createAction(
  '[Preferences] UpdatePreferencesSuccess',
  props<{ preferences: IPreferences }>(),
);
export const updatePreferencesFailure = createAction(
  '[Preferences] UpdatePreferencesFailure',
  props<{ message: string }>(),
);
