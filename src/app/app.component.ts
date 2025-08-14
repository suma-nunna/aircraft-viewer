import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectLoading, selectResults } from './store/aircraft.selectors';
import { AircraftActions, search } from './store/aircraft.actions';

type SearchType = 'aircraft' | 'callsign';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDividerModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Injects the NgRx store for state management.
  private store = inject(Store);

  searchType: SearchType = 'aircraft';
  searchValue = 'aircraft';
  queries = '';

  loading = toSignal(this.store.select(selectLoading), { initialValue: false });
  results = toSignal(this.store.select(selectResults), { initialValue: [] });

  /**
   * switching between 'aircraft' and 'callsign'
   * @param newType The new search type ('aircraft' or 'callsign').
   */
  onSearchTypeChange(newType: 'aircraft' | 'callsign') {
    this.searchType = newType;
    this.store.dispatch(AircraftActions.clearSearch());
  }

  /**
   * Submitting of query(search)
   * Processes the input queries, removes duplicates, and search.
   * Clears the input field after submission.
   */
  onSubmit() {
    console.log('Submitting search:', this.searchType, this.queries);
    this.searchValue = this.searchType;
    if (!this.queries.trim()) return;
    const queryList = Array.from(
      new Set(
        this.queries
          .split(',')
          .map((q) => q.trim())
          .filter((q) => q)
      )
    );
    this.store.dispatch(
      search({ searchType: this.searchType, queries: queryList })
    );
    this.queries = ''; // clear input
  }

  /**
   * Getter is used to filter the results to include only those with the search type, which we will use in the UI.
   */
  get aircraftResults() {
    return this.results().filter((result) => result.type === 'aircraft');
  }

  get flightRouteResults() {
    return this.results().filter((result) => result.type === 'callsign');
  }
}
