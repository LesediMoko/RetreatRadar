import { IEventItem, IItem, ITrip, IUser } from '../../modules/common/types/app-types';

export interface AppState {
  trips: TripsState;
  itineraryItems: ItineraryItemsState;
  preferences: PreferencesState;
  user: UserState;
}

export interface TripsState {
  trips: ITrip[];
  selectedTrip: ITrip | null;
  viewingTrip: ITrip | null;
}

export interface ItineraryItemsState {
  items: IItem[];
  selectedItem: IItem | null;
  selectedTripId: string | null;
  viewingTripId: string | null;
  selectedTripPanelDay: string | null;
  currentCurrency: string;
  previousCurrency: string | null;
  conversionRate: number;
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
