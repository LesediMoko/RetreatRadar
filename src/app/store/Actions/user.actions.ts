import { createAction, props } from '@ngrx/store';
import { IUser } from '../../modules/common/types/app-types';

// export const login = createAction('[User] Login');
// export const loginSuccess = createAction('[User] LoginSuccess', props<{ email: string; password: string }>());

// export const logout = createAction('[User] Logout');

// export const register = createAction('[User] Register');
// export const registerSuccess = createAction('[User] RegisterSuccess', props<{ email: string; password: string }>());

// export const setSelectedUser = createAction('[User] SetSelectedUser', props<{ user: IUser }>());

export const register = createAction(
  '[User] Register',
  props<{ userProfile: IUser; password: string; email: string }>(),
);
export const registerSuccess = createAction('[User] Register Success', props<{ uid: string }>());

export const registerGoogle = createAction('[User] RegisterGoogle');
export const registerGoogleSuccess = createAction('[User] Register Google Success', props<{ uid: string }>());

export const registerGit = createAction('[User] Register Git');
export const registerGitSuccess = createAction('[User] Register Git Success', props<{ uid: string }>());

export const saveProfile = createAction('[User] Save Profile', props<{ uid: string; profile: IUser }>());
export const saveProfileSuccess = createAction('[User] Save Profile Success', props<{ profile: IUser }>());

export const login = createAction('[User] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[User] Login Success', props<{ uid: string }>());

export const loginGit = createAction('[User] Login Git');
export const loginGitSuccess = createAction('[User] Login Git Success', props<{ uid: string }>());

export const loginGoogle = createAction('[User] Login Google');
export const loginGoogleSuccess = createAction('[User] Login Google Success', props<{ uid: string }>());

export const logout = createAction('[User] Logout');

export const fetchProfile = createAction('[User] Fetch Profile', props<{ uid: string }>());
export const fetchProfileSuccess = createAction('[User] Fetch Profile Success', props<{ profile: IUser }>());
