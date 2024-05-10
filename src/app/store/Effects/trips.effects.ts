import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DbService } from '../../services/db.service';
import { EMPTY, Observable, catchError, concatMap, exhaustMap, from, map, mergeMap, of, switchMap } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import * as TripsActions from '../Actions/trips.actions';
import * as ItemsActions from '../Actions/items.actions';
import { ITrip } from '../../modules/common/types/app-types';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { profileConverter } from '../../modules/utils/model-converters';
import { getFirestore } from '@firebase/firestore';
import { getApp } from '@firebase/app';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ItineraryItemsState, TripsState } from '../Types/states';
import { selectViewingTrip } from '../Selectors/trips.selector';

@Injectable()
export class TripsEffects {
  constructor(
    private actions$: Actions,
    private db: DbService,
    private nzNotify: NzNotificationService,
    private router: Router,
    private ItemsStore: Store<ItineraryItemsState>,
    private tripStore: Store<TripsState>,
  ) {}

  fetchTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActions.loadTrips),
      switchMap(({ uid }) =>
        this.db.fetchUserTrips(uid).pipe(
          map(queryResults => {
            if (queryResults.empty)
              return TripsActions.loadTripsSuccess({
                trips: [],
              });
            const tripIDs = queryResults.docs.map(doc => doc.id);
            const tripsData = queryResults.docs.map(doc => {
              const docData = doc.data() as ITrip;

              return { ...docData, id: doc.id };
            });
            this.ItemsStore.dispatch(ItemsActions.loadItems({ tripId: tripIDs }));
            return TripsActions.loadTripsSuccess({ trips: tripsData });
          }),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  addTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActions.addTrip),
      switchMap(({ trip }) =>
        this.db.addTrip(trip).pipe(
          map(newTrip => {
            return TripsActions.addTripSuccess({
              trip: newTrip,
            });
          }),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  editTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActions.updateTrip),
      switchMap(({ trip }) =>
        this.db.editTrip(trip).pipe(
          map(updatedTrip => {
            this.tripStore.dispatch(TripsActions.viewTrip({ trip: updatedTrip }));
            this.ItemsStore.dispatch(ItemsActions.setViewingTripId({ tripId: updatedTrip.id }));
            return TripsActions.updateTripSuccess({
              trip: updatedTrip,
            });
          }),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  deleteTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActions.deleteTrip),
      switchMap(({ id }) =>
        this.db.deleteTrip(id).pipe(
          map(() => {
            return TripsActions.deleteTrip({ id: id });
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
