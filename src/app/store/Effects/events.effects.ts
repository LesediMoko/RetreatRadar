import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DbService } from '../../services/db.service';
import { EMPTY, catchError, map, of, switchMap } from 'rxjs';
import * as EventsActions from '../Actions/events.actions';
import { IEventItem } from '../../modules/common/types/app-types';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class EventsEffects {
  constructor(
    private actions$: Actions,
    private db: DbService,
    private nzNotify: NzNotificationService,
  ) {}

  fetchEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.loadEvents),
      switchMap(() =>
        this.db.fetchAllEvents().pipe(
          map(events => {
            const eventsData = events.docs.map(doc => {
              const docData = doc.data() as IEventItem;
              return { ...docData, id: doc.id };
            });
            return EventsActions.loadEventsSuccess({ events: eventsData });
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
