import { createAction, props } from '@ngrx/store';
import { IAddItemForm, IItem, ITrip } from '../../modules/common/types/app-types';

export const loadItems = createAction('[Items] LoadItems', props<{ tripId: string | string[] }>());
export const loadItemsSuccess = createAction('[Items] LoadItemsSuccess', props<{ items: IItem[] }>());

export const addItem = createAction('[Items] AddItem', props<{ item: IAddItemForm }>());
export const addItemSuccess = createAction('[Items] AddItemSuccess', props<{ item: IItem }>());
export const updateItem = createAction('[Items] UpdateItem', props<{ item: IItem }>());
export const updateItemSuccess = createAction('[Items] UpdateItemSuccess', props<{ item: IItem }>());

export const deleteItem = createAction('[Items] DeleteItem', props<{ id: string }>());
export const deleteItemSuccess = createAction('[Items] DeleteItemSuccess');

export const setSelectedTripId = createAction('[Items] SetSelectedTripId', props<{ tripId: string | null }>());
export const setViewingTripId = createAction('[Items] SetViewingTripId', props<{ tripId: string | null }>());
export const setSelectedItem = createAction('[Items] SetSelectedItem', props<{ item: IItem }>());
export const selectTripPanelDay = createAction('[Items] SelectTripPanelDay', props<{ day: string }>());

export const updateCurrency = createAction('[Items] Update Currency', props<{ currency: string }>());
export const fetchConversionRate = createAction(
  '[Items] Fetch Conversion Rate',
  props<{ currencyFrom: string; currencyTo: string }>(),
);
export const fetchConversionRateSuccess = createAction('[Items] FetchConversionRateSuccess', props<{ rate: number }>());

export const clearItemState = createAction('[Items] ClearItemState');
