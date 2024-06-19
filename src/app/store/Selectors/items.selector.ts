import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItineraryItemsState } from '../Types/states';
import { retreatRadarStoreItemsFeatureKey } from '..';
import { state } from '@angular/animations';
import { convertFSTimestampToJSDate, getTripPanelMonthDay } from '../../modules/common/helpers/conversion-helpers';
import { IItem } from '../../modules/common/types/app-types';
export const selectItemsFeature = createFeatureSelector<ItineraryItemsState>(retreatRadarStoreItemsFeatureKey);

export const selectItems = createSelector(selectItemsFeature, state => {
  let items: IItem[] = [];
  for (const item of state.items) {
    items.push({ ...item, cost: item.cost * state.conversionRate });
  }
  for (const item of items) {
    item.cost = item.cost * state.conversionRate;
  }
  return items;
});

export const selectSelectedItem = createSelector(selectItemsFeature, state => state.selectedItem);

export const selectSelectedTripId = createSelector(selectItemsFeature, state => state.selectedTripId);

export const selectItemsBySelectedTripId = createSelector(selectItemsFeature, state => {
  let items: IItem[] = [];
  for (const item of state.items) {
    if (item.tripId === state.selectedTripId) items.push({ ...item, cost: item.cost * state.conversionRate });
  }
  for (const item of items) {
    item.cost = item.cost * state.conversionRate;
  }
  return items;
});

export const selectSelectedItemsGroupedByDay = createSelector(selectItemsFeature, state => {
  let items: IItem[] = [];
  for (const item of state.items) {
    if (item.tripId === state.viewingTripId) items.push({ ...item, cost: item.cost * state.conversionRate });
  }
  for (const item of items) {
    item.cost = item.cost * state.conversionRate;
  }
  const itemAndDayArray = items.map(item => {
    const startDateJS = convertFSTimestampToJSDate(item.startTime.seconds, item.startTime.nanoseconds).toDateString();
    return { ...item, startDateJS };
  });
  const uniqueDays = [...new Set(itemAndDayArray.map(item => item.startDateJS))];
  const groupedItems = uniqueDays.map(day => {
    return {
      day,
      items: itemAndDayArray.filter(item => item.startDateJS === day),
    };
  });
  return groupedItems;
});

export const selectSelctedItemsDaysList = createSelector(selectItemsFeature, state => {
  const items = [...state.items.filter(item => item.tripId === state.selectedTripId)];
  const itemAndDayArray = items.map(item => {
    const startDateJS = convertFSTimestampToJSDate(item.startTime.seconds, item.startTime.nanoseconds);
    const dayMonth = getTripPanelMonthDay(startDateJS);
    return { ...item, dayMonth };
  });
  const uniqueDays = [...new Set(itemAndDayArray.map(item => item.dayMonth))];
  return uniqueDays;
});

export const selectSelectedTripPanelDay = createSelector(selectItemsFeature, state => state.selectedTripPanelDay);

export const selectSelectedTripPanelDayItems = createSelector(selectItemsFeature, state => {
  let itemsUnsorted = [];
  for (const item of state.items) {
    if (item.tripId === state.selectedTripId) itemsUnsorted.push({ ...item, cost: item.cost * state.conversionRate });
  }
  const items = itemsUnsorted.sort((a, b) => {
    const aDate = convertFSTimestampToJSDate(a.startTime.seconds, a.startTime.nanoseconds);
    const bDate = convertFSTimestampToJSDate(b.startTime.seconds, b.startTime.nanoseconds);
    return aDate.getTime() - bDate.getTime();
  });
  for (const item of items) {
    item.cost = item.cost * state.conversionRate;
  }
  if (state.selectedTripPanelDay === 'All') return items;
  return items.filter(item => {
    const startDateJS = convertFSTimestampToJSDate(item.startTime.seconds, item.startTime.nanoseconds);
    const dayMonth = getTripPanelMonthDay(startDateJS);
    return dayMonth === state.selectedTripPanelDay;
  });
});

export const selectTotalCostOfSelectedTrip = createSelector(selectItemsFeature, state => {
  const items = [...state.items.filter(item => item.tripId === state.selectedTripId)];
  return items.reduce((acc, item) => acc + item.cost * state.conversionRate, 0);
});
export const selectTotalCostOfViewingTrip = createSelector(selectItemsFeature, state => {
  const items = [...state.items.filter(item => item.tripId === state.viewingTripId)];
  return items.reduce((acc, item) => acc + item.cost * state.conversionRate, 0);
});

export const selectChosenCurrency = createSelector(selectItemsFeature, state => state.currentCurrency);

export const selectConversionRate = createSelector(selectItemsFeature, state => state.conversionRate);
