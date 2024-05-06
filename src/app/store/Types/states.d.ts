import { IEventItem, IUser } from '../../modules/common/types/app-types';

export interface AppState {
  trips: TripsState;
  itineraryItems: ItineraryItemsState;
  preferences: PreferencesState;
  user: UserState;
}

export interface TripsState {
  trips: Trip[];
  selectedTrip: Trip | null;
}

export interface ItineraryItemsState {
  items: ItineraryItem[];
  selectedItem: Trip | null;
}

export interface PreferencesState {
  currency: string;
  interests: string[];
  theme: string;
}

export interface UserState {
  currentUserProfile?: IUser;
  isAuthenticated: boolean;
  uid: string | null;
}

export interface EventsState {
  events: IEventItem[];
  selectedEvent: IEventItem | null;
}
