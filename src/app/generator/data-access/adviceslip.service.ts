import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, EMPTY, map } from 'rxjs';
import {
  Advice,
  AdviceSlipResponse,
} from '../../shared/data-access/interfaces/advice';

@Injectable({
  providedIn: 'root',
})
export class AdviceslipService {
  http = inject(HttpClient);
  constructor() {}

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
