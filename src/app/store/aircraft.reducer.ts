import { createReducer, on } from '@ngrx/store';
import { AircraftActions } from './aircraft.actions';


/**
 * - loading: Indicates if a search operation is in progress.
 * - results: An array of search results.
 */
export interface AircraftState {
  loading: boolean;
  results: import('./aircraft.actions').Result[];
}

const initialState: AircraftState = {
  loading: false,
  results: [],
};


/**
 * Reducer function for handling aircraft-related actions.
 * Manages state transitions for search, success, and clearing.
 */
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
