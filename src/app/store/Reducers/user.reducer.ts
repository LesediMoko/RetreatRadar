import { UserState } from '../Types/states';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../Actions/user.actions';

export const initialUserState: UserState = {
  currentUserProfile: null,
  isAuthenticated: false,
  uid: null,
};

export const userReducer = createReducer(
  initialUserState,

  on(UserActions.registerSuccess, (state, { uid }) => ({
    ...state,
    isAuthenticated: true,
    uid,
  })),

  on(UserActions.registerGoogleSuccess, (state, { uid }) => ({
    ...state,
    isAuthenticated: true,
    uid,
  })),

  on(UserActions.registerGitSuccess, (state, { uid }) => ({
    ...state,
    isAuthenticated: true,
    uid,
  })),

  on(UserActions.saveProfileSuccess, (state, { profile }) => ({
    ...state,
    currentUser: profile,
  })),

  on(UserActions.loginSuccess, (state, { uid }) => ({
    ...state,
    isAuthenticated: true,
    uid,
  })),

  on(UserActions.loginGitSuccess, (state, { uid }) => ({
    ...state,
    isAuthenticated: true,
    uid,
  })),

  on(UserActions.loginGoogleSuccess, (state, { uid }) => ({
    ...state,
    isAuthenticated: true,
    uid,
  })),

  on(UserActions.fetchProfileSuccess, (state, { profile }) => ({
    ...state,
    currentUserProfile: profile,
  })),
);
