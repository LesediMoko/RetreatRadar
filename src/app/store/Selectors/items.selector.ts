import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItineraryItemsState } from '../Types/states';
import { retreatRadarStoreItemsFeatureKey } from '..';
import { state } from '@angular/animations';
import { convertFSTimestampToJSDate, getTripPanelMonthDay } from '../../modules/common/helpers/conversion-helpers';

export const selectItemsFeature = createFeatureSelector<ItineraryItemsState>(retreatRadarStoreItemsFeatureKey);

export const selectItems = createSelector(selectItemsFeature, state => state.items);

export const selectSelectedItem = createSelector(selectItemsFeature, state => state.selectedItem);

export const selectSelectedTripId = createSelector(selectItemsFeature, state => state.selectedTripId);

export const selectItemsBySelectedTripId = createSelector(selectItemsFeature, state =>
  state.items.filter(item => item.tripId === state.selectedTripId),
);

export const selectSelectedItemsGroupedByDay = createSelector(selectItemsFeature, state => {
  console.log(state.selectedTripId);
  const items = state.items.filter(item => item.tripId === state.viewingTripId);
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
  console.log(groupedItems);
  return groupedItems;
});

export const selectSelctedItemsDaysList = createSelector(selectItemsFeature, state => {
  const items = state.items.filter(item => item.tripId === state.selectedTripId);
  const itemAndDayArray = items.map(item => {
    const startDateJS = convertFSTimestampToJSDate(item.startTime.seconds, item.startTime.nanoseconds);
    const dayMonth = getTripPanelMonthDay(startDateJS);
    console.log(dayMonth);
    return { ...item, dayMonth };
  });
  const uniqueDays = [...new Set(itemAndDayArray.map(item => item.dayMonth))];
  return uniqueDays;
});

export const selectSelectedTripPanelDay = createSelector(selectItemsFeature, state => state.selectedTripPanelDay);

export const selectSelectedTripPanelDayItems = createSelector(selectItemsFeature, state => {
  const itemsUnsorted = state.items.filter(item => item.tripId === state.selectedTripId);
  const items = itemsUnsorted.sort((a, b) => {
    const aDate = convertFSTimestampToJSDate(a.startTime.seconds, a.startTime.nanoseconds);
    const bDate = convertFSTimestampToJSDate(b.startTime.seconds, b.startTime.nanoseconds);
    return aDate.getTime() - bDate.getTime();
  });
  if (state.selectedTripPanelDay === 'All') return items;
  return items.filter(item => {
    const startDateJS = convertFSTimestampToJSDate(item.startTime.seconds, item.startTime.nanoseconds);
    const dayMonth = getTripPanelMonthDay(startDateJS);
    return dayMonth === state.selectedTripPanelDay;
  });
});

export const selectTotalCostOfSelectedTrip = createSelector(selectItemsFeature, state => {
  const items = state.items.filter(item => item.tripId === state.selectedTripId);
  return items.reduce((acc, item) => acc + item.cost, 0);
});
export const selectTotalCostOfViewingTrip = createSelector(selectItemsFeature, state => {
  const items = state.items.filter(item => item.tripId === state.viewingTripId);
  return items.reduce((acc, item) => acc + item.cost, 0);
});

export const selectChosenCurrency = createSelector(selectItemsFeature, state => state.currentCurrency);

export const selectConversionRate = createSelector(selectItemsFeature, state => state.conversionRate);
