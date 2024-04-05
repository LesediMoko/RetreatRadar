import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"retreat-radar","appId":"1:271718171858:web:c7f6de6bd7b62ff575990b","storageBucket":"retreat-radar.appspot.com","apiKey":"AIzaSyDQNrD11pGYvPxqELyI97areXrB8az2aDA","authDomain":"retreat-radar.firebaseapp.com","messagingSenderId":"271718171858","measurementId":"G-9M0EDD1D1Y"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
