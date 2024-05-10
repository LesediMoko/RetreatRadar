import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DbService } from '../../services/db.service';
import { EMPTY, catchError, concatMap, exhaustMap, map, mergeMap, of, switchAll, switchMap } from 'rxjs';
import * as ItemsActions from '../Actions/items.actions';
import { ICurrencyExchangeAPIResponse, IItem } from '../../modules/common/types/app-types';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from '../../services/api.service';

@Injectable()
export class ItemsEffects {
  constructor(
    private actions$: Actions,
    private db: DbService,
    private nzNotify: NzNotificationService,
    private api: ApiService,
  ) {}

  fetchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItems),
      switchMap(({ tripId }) =>
        this.db.fetchTripItems(tripId).pipe(
          map(items => {
            console.log('loading items');
            const itemsData = items.docs.map(doc => {
              const docData = doc.data() as IItem;
              return { ...docData, id: doc.id };
            });
            return ItemsActions.loadItemsSuccess({ items: itemsData });
          }),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.addItem),
      switchMap(({ item }) =>
        this.db.addItem(item).pipe(
          map(newItem => {
            return ItemsActions.addItemSuccess({
              item: newItem,
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

  fetchConversionRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.fetchConversionRate),
      switchMap(({ currencyFrom, currencyTo }) =>
        this.api.getConversionRate(currencyFrom, currencyTo).pipe(
          map((apiResponse: ICurrencyExchangeAPIResponse) => {
            console.log('apiResponse', apiResponse);
            const rate = apiResponse.data[currencyTo].value;
            return ItemsActions.fetchConversionRateSuccess({ rate: rate });
          }),
          catchError(error => {
            this.nzNotify.error('Error', error.toString());
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.deleteItem),
      switchMap(({ id }) =>
        this.db.deleteItem(id).pipe(
          map(() => {
            return ItemsActions.deleteItemSuccess();
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
