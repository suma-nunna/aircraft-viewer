import { createSelector, createFeatureSelector } from '@ngrx/store';

const selectAircraftState = createFeatureSelector<import('./aircraft.reducer').AircraftState>('aircraft');

/**
 * Retrieves the entire State from the store.
 */

export const selectLoading = createSelector(selectAircraftState, state => state.loading);

export const selectResults = createSelector(selectAircraftState, state => state.results);