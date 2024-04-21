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
import { Observable, from } from 'rxjs';
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
    const documentInfo = { username: profile.username, name: profile.name, surname: profile.surname };
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
}
