import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { getAllDataFromLocalForage, default as localForage } from 'ngrx-store-persist';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

getAllDataFromLocalForage({ driver: localForage.INDEXEDDB, keys: ['user'] }).then(() => {
  bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
});
