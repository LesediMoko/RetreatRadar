import { createAction, props } from '@ngrx/store';
import { IItem } from '../../modules/common/types/app-types';

export const loadItems = createAction('[Items] LoadItems');
export const loadItemsSuccess = createAction('[Items] LoadItemsSuccess', props<{ items: IItem[] }>());
export const loadItemsFailure = createAction('[Items] LoadItemsFailure', props<{ message: string }>());

export const addItem = createAction('[Items] AddItem', props<{ item: IItem }>());
export const addItemSuccess = createAction('[Items] AddItemSuccess', props<{ item: IItem }>());
export const addItemFailure = createAction('[Items] AddItemFailure', props<{ message: string }>());

export const updateItem = createAction('[Items] UpdateItem', props<{ item: IItem }>());
export const updateItemSuccess = createAction('[Items] UpdateItemSuccess', props<{ item: IItem }>());
export const updateItemFailure = createAction('[Items] UpdateItemFailure', props<{ message: string }>());

export const deleteItem = createAction('[Items] DeleteItem', props<{ id: number }>());
export const deleteItemSuccess = createAction('[Items] DeleteItemSuccess', props<{ id: number }>());
export const deleteItemFailure = createAction('[Items] DeleteItemFailure', props<{ message: string }>());

export const selectItem = createAction('[Items] SelectItem', props<{ id: number }>());
