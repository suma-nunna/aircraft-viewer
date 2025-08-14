import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AircraftActions = createActionGroup({
  source: 'Aircraft',
  events: {
    search: props<{ searchType: 'aircraft' | 'callsign'; queries: string[] }>(),
    searchSuccess: props<{ results: Result[] }>(),
    clearSearch: emptyProps()
  },
});

export const { search, searchSuccess, clearSearch } = AircraftActions;

export interface AircraftResults {
  query: string;
  type: 'aircraft';
  data?: Aircraft;
  error?: string;
}

export interface FlightRouteResults {
  query: string;
  type: 'callsign';
  data?: FlightRoute;
  error?: string;
}

export type Result = AircraftResults | FlightRouteResults;

// original
// export interface Result {
//   query: string;
//   type: 'aircraft' | 'callsign';
//   data?: Aircraft | FlightRoute;
//   error?: string;
// }

// export type Result =
//   | { query: string; type: 'aircraft'; data: Aircraft; error?: string }
//   | { query: string; type: 'callsign'; data: FlightRoute; error?: string };

export interface Aircraft {
  type: string;
  icao_type: string;
  manufacturer: string;
  mode_s: string;
  registration: string;
  registered_owner_country_iso_name: string;
  registered_owner_country_name: string;
  registered_owner_operator_flag_code: string | null;
  registered_owner: string;
  url_photo: string | null;
  url_photo_thumbnail: string | null;
}

export interface FlightRoute {
  callsign: string;
  callsign_icao: string | null;
  callsign_iata: string | null;
  airline: Airline | null;
  origin: Airport;
  midpoint: Airport | null;
  destination: Airport;
}

export interface Airport {
  country_iso_name: string;
  country_name: string;
  elevation: number;
  iata_code: string;
  icao_code: string;
  latitude: number;
  longitude: number;
  municipality: string;
  name: string;
}

export interface Airline {
  name: string;
  icao: string;
  iata: string | null;
  country: string;
  country_iso: string;
  callsign: string | null;
}
