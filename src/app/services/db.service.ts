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
import { IUser } from '../modules/common/types/app-types';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import {
  collection,
  getFirestore,
  DocumentData,
  where,
  query,
  getDocs,
  QuerySnapshot,
  documentId,
} from '@firebase/firestore';
import { FirestoreCollections } from '../modules/utils/firestore-collections';
import { initializeApp } from '@firebase/app';
import { environment } from '../../environments/environment.development';
import { debounceTime, distinctUntilChanged, map, switchMap, debounce } from 'rxjs/operators';

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
      avater: profile.avatar,
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
}
