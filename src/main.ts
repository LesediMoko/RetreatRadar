import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { getAllDataFromLocalForage, default as localForage } from 'ngrx-store-persist';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  retreatRadarStoreEventsFeatureKey,
  retreatRadarStoreItemsFeatureKey,
  retreatRadarStoreTripsFeatureKey,
  retreatRadarStoreUserFeatureKey,
} from './app/store';

getAllDataFromLocalForage({
  driver: localForage.INDEXEDDB,
  keys: [
    retreatRadarStoreEventsFeatureKey,
    retreatRadarStoreItemsFeatureKey,
    retreatRadarStoreTripsFeatureKey,
    retreatRadarStoreUserFeatureKey,
  ],
}).then(() => {
  bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
});
