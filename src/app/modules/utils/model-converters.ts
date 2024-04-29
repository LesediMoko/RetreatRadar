import { DocumentSnapshot, SnapshotOptions } from '@firebase/firestore';
import { IUser } from '../common/types/app-types';

class Profile {
  uid: string;
  username: string;
  name: string;
  surname: string;

  constructor(uid: string, profileInfo: IUser) {
    this.uid = uid;
    this.username = profileInfo.username;
    this.name = profileInfo.name;
    this.surname = profileInfo.surname;
  }
  toString() {
    return this.uid + ', ' + this.username + ', ' + this.name + ', ' + this.surname;
  }
}

export const profileConverter = {
  toFirestore: (uid: string, profile: IUser) => {
    return {
      uid: uid,
      name: profile.name,
      surname: profile.surname,
      username: profile.username,
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options) as { uid: string; profile: IUser };
    if (!data) {
      return { uid: '', name: '', surname: '', username: '' };
    }
    return new Profile(data.uid, data.profile);
  },
};
