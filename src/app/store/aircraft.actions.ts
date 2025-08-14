import { createActionGroup, emptyProps, props } from '@ngrx/store';


/**
 * Actions are used to trigger searches, handle successful responses, and clear search results.
 * used union type to restricts the searchType property to one of two possible string values: 'aircraft' or 'callsign'
 */ 
export const AircraftActions = createActionGroup({
  source: 'Aircraft',
  events: {
    search: props<{ searchType: 'aircraft' | 'callsign'; queries: string[] }>(),
    searchSuccess: props<{ results: Result[] }>(),
    clearSearch: emptyProps()
  },
});

export const { search, searchSuccess, clearSearch } = AircraftActions;


/**
 * AircraftResults, FlightRouteResults - Interface representing the result of an aircraft search query.
 * Includes the original query, type, data if successful, or an error message.
 */
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


/**
 * Interface for aircraft details retrieved from a search.
 */
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

/**
 * Interface for flight route details based on a callsign.
 */
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
