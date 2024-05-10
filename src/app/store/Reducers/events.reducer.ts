import { EventsState } from '../Types/states';
import { createReducer, on } from '@ngrx/store';
import * as EventsActions from '../Actions/events.actions';

export const initialEventsState: EventsState = {
  events: [],
  selectedEvent: null,
};

export const eventsReducer = createReducer(
  initialEventsState,
  on(EventsActions.loadEventsSuccess, (state, { events }) => ({
    ...state,
    events,
  })),
  on(EventsActions.setSelectedEvent, (state, { event }) => ({
    ...state,
    selectedEvent: event,
  })),
);
