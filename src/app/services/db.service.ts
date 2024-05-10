import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Observable, Subject, from, fromEvent } from 'rxjs';
import { IAddItemForm, IAddTripForm, IItem, ITrip, IUser } from '../modules/common/types/app-types';
import { Firestore, doc, setDoc, addDoc } from '@angular/fire/firestore';
import {
  collection,
  getFirestore,
  DocumentData,
  where,
  query,
  getDocs,
  QuerySnapshot,
  documentId,
  deleteDoc,
} from '@firebase/firestore';
import { FirestoreCollections } from '../modules/utils/firestore-collections';
import { initializeApp } from '@firebase/app';
import { environment } from '../../environments/environment.development';
import { debounceTime, distinctUntilChanged, map, switchMap, debounce } from 'rxjs/operators';
import { deleteItem } from '../store/Actions/items.actions';
import { deleteTrip } from '../store/Actions/trips.actions';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(public afAuth: Auth) {}

  firebaseConfig = environment;
  app = initializeApp(this.firebaseConfig);
  db = getFirestore(this.app);

  emailRegister(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.afAuth, email.trim(), password.trim()));
  }

  googleRegister(): Observable<UserCredential> {
    return from(signInWithPopup(this.afAuth, new GoogleAuthProvider()));
  }

  fetchProfile(uid: string): Observable<QuerySnapshot<DocumentData>> {
    const profilesRef = collection(this.db, FirestoreCollections.PROFILES);
    const fetchQuery = query(profilesRef, where(documentId(), '==', uid));
    return from(getDocs(fetchQuery));
  }

  saveProfile(uid: string, profile: IUser) {
    const documentInfo = {
      username: profile.username,
      name: profile.name,
      surname: profile.surname,
      avatar: profile.avatar,
    };
    return from(setDoc(doc(this.db, FirestoreCollections.PROFILES, uid), documentInfo));
  }

  gitRegister(): Observable<UserCredential> {
    return from(signInWithPopup(this.afAuth, new GithubAuthProvider()));
  }

  emailLogin(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.afAuth, email.trim(), password.trim()));
  }

  gitLogin(): Observable<UserCredential> {
    return from(signInWithPopup(this.afAuth, new GithubAuthProvider()));
  }

  googleLogin(): Observable<UserCredential> {
    return from(signInWithPopup(this.afAuth, new GoogleAuthProvider()));
  }

  findProfileByUsername(username: string): Observable<IUser | null> {
    const profilesRef = collection(this.db, FirestoreCollections.PROFILES);
    const usernameQuery = query(profilesRef, where('username', '==', username));
    return from(getDocs(usernameQuery)).pipe(
      map(querySnapshot => {
        if (querySnapshot.empty) {
          return null;
        } else {
          const profile = querySnapshot.docs[0].data();
          return profile as IUser;
        }
      }),
    );
  }

  fetchAllEvents(): Observable<QuerySnapshot<DocumentData>> {
    const eventsRef = collection(this.db, FirestoreCollections.EVENTS);
    const fetchQuery = query(eventsRef);
    return from(getDocs(fetchQuery));
  }

  fetchUserTrips(uid: string): Observable<QuerySnapshot<DocumentData>> {
    const tripsRef = collection(this.db, FirestoreCollections.TRIPS);
    const fetchQuery = query(tripsRef, where('uid', '==', uid));
    return from(getDocs(fetchQuery));
  }

  fetchTripItems(tripID: string | string[]): Observable<QuerySnapshot<DocumentData>> {
    if (tripID instanceof Array) {
      const itemsRef = collection(this.db, FirestoreCollections.ITEMS);
      const fetchQuery = query(itemsRef, where('tripId', 'in', tripID));
      return from(getDocs(fetchQuery));
    }
    const itemsRef = collection(this.db, FirestoreCollections.ITEMS);
    const fetchQuery = query(itemsRef, where('tripId', '==', tripID));
    return from(getDocs(fetchQuery));
  }

  addTrip(trip: IAddTripForm): Observable<ITrip> {
    return from(
      addDoc(collection(this.db, FirestoreCollections.TRIPS), trip).then(documentRef => {
        return { ...trip, id: documentRef.id };
      }),
    );
  }

  addItem(item: IAddItemForm): Observable<IItem> {
    return from(
      addDoc(collection(this.db, FirestoreCollections.ITEMS), item).then(documentRef => {
        return { ...item, id: documentRef.id };
      }),
    );
  }

  editTrip(trip: ITrip): Observable<ITrip> {
    return from(
      setDoc(doc(this.db, FirestoreCollections.TRIPS, trip.id), trip).then(() => {
        return trip;
      }),
    );
  }

  deleteItem(itemId: string): Observable<void> {
    return from(deleteDoc(doc(this.db, FirestoreCollections.ITEMS, itemId)));
  }

  deleteTrip(tripId: string): Observable<void> {
    return from(deleteDoc(doc(this.db, FirestoreCollections.TRIPS, tripId)));
  }

  fetchUserPreferences(uid: string): Observable<QuerySnapshot<DocumentData>> {
    const preferencesRef = collection(this.db, FirestoreCollections.PREFERENCES);
    const fetchQuery = query(preferencesRef, where('userId', '==', uid));
    return from(getDocs(fetchQuery));
  }
}
