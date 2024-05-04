import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DbService } from '../../services/db.service';
import { EMPTY, Observable, catchError, concatMap, exhaustMap, from, map, of, switchMap } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import * as UserActions from '../Actions/user.actions';
import { IUser } from '../../modules/common/types/app-types';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { profileConverter } from '../../modules/utils/model-converters';
import { getFirestore } from '@firebase/firestore';
import { getApp } from '@firebase/app';
import { defaultUserAvatar } from '../../modules/common/defaults/defaultUser';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private db: DbService,
    private nzNotify: NzNotificationService,
    private router: Router,
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      switchMap(action =>
        this.db.emailRegister(action.email, action.password).pipe(
          concatMap(credentials => {
            const actions = [
              UserActions.registerSuccess({ uid: credentials.user.uid }),
              UserActions.saveProfile({ uid: credentials.user.uid, profile: action.userProfile }),
            ];

            return from(actions);
          }),

          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  registerGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerGoogle),
      exhaustMap(() =>
        this.db.googleRegister().pipe(
          map(credentials => {
            return UserActions.registerGoogleSuccess({ uid: credentials.user.uid });
          }),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  registerGit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerGit),
      exhaustMap(() =>
        this.db.gitRegister().pipe(
          map(credentials => UserActions.registerGitSuccess({ uid: credentials.user.uid })),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  saveProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.saveProfile),
      switchMap(({ uid, profile }) =>
        this.db.saveProfile(uid, profile).pipe(
          concatMap(profile => {
            const actions = [
              UserActions.saveProfileSuccess({ profile: profile! }),
              UserActions.fetchProfile({ uid: uid }),
            ];
            return from(actions);
          }),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      exhaustMap(action =>
        this.db.emailLogin(action.email, action.password).pipe(
          concatMap(user => {
            const actions = [
              UserActions.loginSuccess({ uid: user.user.uid }),
              UserActions.fetchProfile({ uid: user.user.uid }),
            ];
            this.router.navigate(['/app/home']);
            console.log(user.user.uid);
            return from(actions);
          }),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  loginGit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginGit),
      exhaustMap(() =>
        this.db.gitLogin().pipe(
          concatMap(user => {
            const actions = [
              UserActions.loginGitSuccess({ uid: user.user.uid }),
              UserActions.fetchProfile({ uid: user.user.uid }),
            ];
            return from(actions);
          }),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  loginGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginGoogle),
      exhaustMap(() =>
        this.db.googleLogin().pipe(
          concatMap(user => {
            const actions = [
              UserActions.loginGoogleSuccess({ uid: user.user.uid }),
              UserActions.fetchProfile({ uid: user.user.uid }),
            ];
            return from(actions);
          }),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  fetchProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchProfile),
      switchMap(({ uid }) =>
        this.db.fetchProfile(uid).pipe(
          map(profile => {
            if (profile.empty)
              return UserActions.fetchProfileSuccess({
                profile: { username: '', name: '', surname: '', avatar: defaultUserAvatar },
              });

            return UserActions.fetchProfileSuccess({ profile: profile.docs[0].data() as IUser });
          }),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );
}
