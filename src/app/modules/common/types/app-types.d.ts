export interface IUser {
  name: string;
  surname: string;
  username: string;
  avatar: string;
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
  attendees: string[];
  cost: number;
  currency: string;
  endTime: Date;
  name: string;
  startTime: Date;
  tags: string[];
  description: string;
  location: string;
  photo: string;
}
