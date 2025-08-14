import { createReducer, on } from '@ngrx/store';
import { AircraftActions } from './aircraft.actions';

export interface AircraftState {
  loading: boolean;
  results: import('./aircraft.actions').Result[];
}

const initialState: AircraftState = {
  loading: false,
  results: [],
};

export const aircraftReducer = createReducer(
  initialState,
  on(AircraftActions.search, (state) => ({
    ...state,
    loading: true,
    results: [],
  })),
  on(AircraftActions.searchSuccess, (state, { results }) => ({
    ...state,
    loading: false,
    results,
  })),
  on(AircraftActions.clearSearch, (state) => ({
    ...state,
    loading: false,
    results: [],
  }))
);
