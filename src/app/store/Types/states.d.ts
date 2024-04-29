import { IUser } from '../../modules/common/types/app-types';

export interface AppState {
  trips: TripsState;
  itineraryItems: ItineraryItemsState;
  preferences: PreferencesState;
  user: UserState;
}

export interface TripsState {
  trips: Trip[];
  selectedTripId: string | null;
}

export interface ItineraryItemsState {
  items: ItineraryItem[];
  selectedItemId: string | null;
}

export interface PreferencesState {
  currency: string;
  interests: string[];
  theme: string;
}

export interface UserState {
  currentUserProfile: IUser | null;
  isAuthenticated: boolean;
  uid: string | null;
}
