import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, distinctUntilChanged, EMPTY, map } from 'rxjs';
import {
  Advice,
  AdviceSlipResponse,
} from '../../shared/data-access/interfaces/advice';

export interface AdviceState {
  advice: Advice;
  error: string | null;
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AdviceslipService {
  http = inject(HttpClient);

  // state
  state = signal<AdviceState>({
    advice: {
      name: null,
      number: null,
    },
    error: null,
    loading: true,
  });

  // selectors
  advice = computed(() => this.state().advice);
  loading = computed(() => this.state().loading);

  // sources
  loadAdvice$ = this.fetchFromAdviceSlip();

  constructor() {
    // reducers
    this.loadAdvice$.pipe(takeUntilDestroyed()).subscribe({
      next: (advice) =>
        this.state.update((state) => ({
          ...state,
          advice: advice,
          loading: false,
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });
  }

  fetchFromAdviceSlip() {
    return this.http
      .get<AdviceSlipResponse>('https://api.adviceslip.com/advice')
      .pipe(
        catchError((err) => EMPTY),
        distinctUntilChanged((prev, curr) => prev.slip.id === curr.slip.id),
        map((response) => this.convertAdviceSlipToAdvice(response))
      );
  }

  private convertAdviceSlipToAdvice(response: AdviceSlipResponse): Advice {
    return { name: response.slip.advice, number: response.slip.id };
  }
}
