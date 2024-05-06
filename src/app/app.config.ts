import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment.development';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UsersEffects } from './store/Effects/users.effects';
import {
  retreatRadarStoreTripsFeatureKey,
  retreatRadarStoreUserFeatureKey,
  retreatRadarStoreEventsFeatureKey,
} from './store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './store/Reducers/user.reducer';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { tripsReducer } from './store/Reducers/trips.reducer';
import { eventsReducer } from './store/Reducers/events.reducer';
import { EventsEffects } from './store/Effects/events.effects';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: environment.projectId,
          appId: environment.appId,
          storageBucket: environment.storageBucket,
          apiKey: environment.apiKey,
          authDomain: environment.authDomain,
          messagingSenderId: environment.messagingSenderId,
          measurementId: environment.measurementId,
          databaseURL: environment.databaseURL,
        }),
      ),
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideStore(),
    provideState({ name: retreatRadarStoreUserFeatureKey, reducer: userReducer }),
    provideState({ name: retreatRadarStoreTripsFeatureKey, reducer: tripsReducer }),
    provideState({ name: retreatRadarStoreEventsFeatureKey, reducer: eventsReducer }),
    provideEffects(UsersEffects, EventsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
