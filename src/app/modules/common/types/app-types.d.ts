export interface IUser {
  name: string;
  surname: string;
  username: string;
}

export interface ITrip {
  id: string;
  name: string;
  userId: string;
  startDate: Date;
  endDate: Date;
}

export interface IItem {
  id: string;
  tripId: string;
  name: string;
  tags: string[];
  startTime: Date;
  endTime: Date;
  costEstimate: number;
  currency: string;
  startLocation: { lat: number; lon: number };
  endLocation: { lat: number; lon: number };
  notes: string;
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
}

export interface UsersCollection {
  Identifier: string;
  providers: string[];
  Created: Date;
  'Signed In': Date;
  'User UID': string;
}
