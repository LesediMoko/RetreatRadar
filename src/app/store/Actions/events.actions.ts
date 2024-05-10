import { createAction, props } from '@ngrx/store';
import { IEventItem } from '../../modules/common/types/app-types';

export const loadEvents = createAction('[Events] LoadEvents');
export const loadEventsSuccess = createAction('[Events] LoadEventsSuccess', props<{ events: IEventItem[] }>());

export const setSelectedEvent = createAction('[Events] SetSelectedEvent', props<{ event: IEventItem }>());
