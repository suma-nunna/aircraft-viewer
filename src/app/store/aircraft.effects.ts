import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Aircraft, AircraftActions, AircraftResults, FlightRouteResults, Result } from './aircraft.actions';

interface ApiResponse {
  response: {
    aircraft?: import('./aircraft.actions').Aircraft;
    flightroute?: import('./aircraft.actions').FlightRoute;
  };
}

@Injectable()
export class AircraftEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  private readonly BASE_URL = 'https://api.adsbdb.com/v0';

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AircraftActions.search),
      switchMap(({ searchType, queries }) => {
        const observables = queries.map((query) =>
          this.http
            .get<ApiResponse>(`${this.BASE_URL}/${searchType}/${query}`)
            .pipe(
              map((res) => {
               if(searchType === 'aircraft') {
                 return { 
                  query,
                  data: res.response.aircraft,
                  type: 'aircraft',
                 } as AircraftResults;
                } else {
                 return { 
                  query,
                  data: res.response.flightroute,
                  type: 'callsign',
                 } as FlightRouteResults;
                }
              }),
              catchError((err) =>
                of({
                  query,
                  error:
                    err.status === 404
                      ? `No data found for ${query}`
                      : `Error fetching ${query}: ${err.message}`,
                  type: searchType,
                } as Result)
              )
            )
        );
        return forkJoin(observables).pipe(
          map((results: Result[]) => 
            AircraftActions.searchSuccess({ results })
        )
        );
      })
    )
  );
}


//  query,
//                 data:
//                   searchType === 'aircraft'
//                     ? res.response.aircraft
//                     : res.response.flightroute,
//                 type: searchType,
