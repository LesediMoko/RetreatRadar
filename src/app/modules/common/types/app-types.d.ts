import { Timestamp } from '@angular/fire/firestore';
export interface IUser {
  name: string;
  surname: string;
  username: string;
  avatar: string;
}

export interface ITrip {
  id: string;
  title: string;
  uid: string;
  startDate: { seconds: number; nanoseconds: number };
  endDate: { seconds: number; nanoseconds: number };
}

export interface IItem {
  id: string;
  tripId: string;
  name: string;
  tags: string[];
  startTime: { seconds: number; nanoseconds: number };
  endTime: { seconds: number; nanoseconds: number };
  cost: number;
  currency: string;
}

export interface IPreferences {
  userId: string;
  currency: string;
  interests: string[];
  theme: string;
}

export interface ProfileCollection {
  uid: string;
  username: string;
  name: string;
  surname: string;
  avatar: string;
}

export interface UsersCollection {
  Identifier: string;
  providers: string[];
  Created: Date;
  'Signed In': Date;
  'User UID': string;
}

export interface IEventItem {
  id: string;
  attendees: { avatar: string; id: string }[];
  cost: number;
  currency: string;
  endTime: { seconds: number; nanoseconds: number };
  name: string;
  startTime: { seconds: number; nanoseconds: number };
  tags: string[];
  description: string;
  location: string;
  photo: string;
}

interface IFSTimestamp {
  seconds: number;
  nanoseconds: number;
}

interface ItemForGroup {
  startDateJS: string;
  id: string;
  tripId: string;
  name: string;
  tags: string[];
  startTime: IFSTimestamp;
  endTime: IFSTimestamp;
  cost: number;
  currency: string;
}

export interface GroupedItem {
  day: string;
  items: ItemForGroup[];
}

export interface IAddTripForm {
  title: string;
  startDate: Timestamp;
  endDate: Timestamp;
  uid: string;
}

export interface IAddItemForm {
  tripId: string;
  name: string;
  tags: string[];
  startTime: Timestamp;
  endTime: Timestamp;
  cost: number;
  currency: string;
}

interface ICurrencyData {
  code: string;
  value: number;
}
export interface ICurrencyExchangeAPIResponse {
  meta: {
    last_updated_at: string;
  };
  data: { [key: string]: ICurrencyData };
}
