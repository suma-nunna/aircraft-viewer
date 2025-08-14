import { createSelector, createFeatureSelector } from '@ngrx/store';

const selectAircraftState = createFeatureSelector<import('./aircraft.reducer').AircraftState>('aircraft');

export const selectLoading = createSelector(selectAircraftState, state => state.loading);
export const selectResults = createSelector(selectAircraftState, state => state.results);