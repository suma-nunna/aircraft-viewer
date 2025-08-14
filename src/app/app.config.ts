import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { aircraftReducer } from './store/aircraft.reducer';
import { AircraftEffects } from './store/aircraft.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideHttpClient(),
    provideStore({ aircraft: aircraftReducer }),
    provideEffects([AircraftEffects]),
    provideStoreDevtools({ maxAge: 25 }),
  ]
};