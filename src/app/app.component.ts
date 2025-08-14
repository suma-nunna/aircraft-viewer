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
import { search } from './store/aircraft.actions';

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
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .results {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 16px;
        margin-top: 20px;
      }
      .photo {
        max-width: 100%;
        height: auto;
        margin-bottom: 16px;
      }
      .error {
        color: red;
      }
    `,
  ],
})
export class AppComponent {
  private store = inject(Store);

  searchType: SearchType = 'aircraft';
  queries = '';

  loading = toSignal(this.store.select(selectLoading), { initialValue: false });
  results = toSignal(this.store.select(selectResults), { initialValue: [] });

  onSubmit() {
    console.log('Submitting search:', this.searchType, this.queries);
    if (!this.queries.trim()) return;
    const queryList = this.queries
      .split(',')
      .map((q) => q.trim())
      .filter((q) => q);
    this.store.dispatch(
      search({ searchType: this.searchType, queries: queryList })
    );
    this.queries = ''; // Optional: clear input
  }

  get aircraftResults() {
    return this.results().filter((result) => result.type === 'aircraft');
  }

  get flightRouteResults() {
    return this.results().filter((result) => result.type === 'callsign');
  }
}
