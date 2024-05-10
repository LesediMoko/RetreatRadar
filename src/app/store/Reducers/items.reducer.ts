import { ItineraryItemsState } from '../Types/states';
import { createReducer, on } from '@ngrx/store';
import * as ItemsActions from '../Actions/items.actions';

export const initialItemsState: ItineraryItemsState = {
  items: [],
  selectedItem: null,
  selectedTripId: null,
  viewingTripId: null,
  selectedTripPanelDay: null,
  currentCurrency: 'ZAR',
  previousCurrency: null,
  conversionRate: 1,
};

export const itemsReducer = createReducer(
  initialItemsState,
  on(ItemsActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    items,
  })),
  on(ItemsActions.setSelectedItem, (state, { item }) => ({
    ...state,
    selectedItem: item,
  })),
  on(ItemsActions.setSelectedTripId, (state, { tripId }) => ({
    ...state,
    selectedTripId: tripId,
  })),
  on(ItemsActions.setViewingTripId, (state, { tripId }) => ({
    ...state,
    viewingTripId: tripId,
  })),
  on(ItemsActions.clearItemState, state => ({
    ...state,
    selectedItem: null,
    selectedTripId: null,
    viewingTripId: null,
    items: [],
  })),
  on(ItemsActions.selectTripPanelDay, (state, { day }) => ({
    ...state,
    selectedTripPanelDay: day,
  })),
  on(ItemsActions.addItemSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
  })),
  on(ItemsActions.updateCurrency, (state, { currency }) => ({
    ...state,
    previousCurrency: state.currentCurrency,
    currentCurrency: currency,
  })),
  on(ItemsActions.fetchConversionRateSuccess, (state, { rate }) => ({
    ...state,
    conversionRate: rate,
  })),
  on(ItemsActions.deleteItemSuccess, state => ({
    ...state,
    items: state.items.filter(item => item.id !== state.selectedItem?.id),
    selectedItem: null,
  })),
);
