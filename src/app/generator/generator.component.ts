import { Component, inject } from '@angular/core';
import { Advice } from '../shared/data-access/interfaces/advice';
import { AdviceslipService } from './data-access/adviceslip.service';
import { AdviceCardComponent } from './ui/advice-card/advice-card.component';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [AdviceCardComponent],
  template: `
    @if (adviceslipService.loading()) {
    <div><span>loading</span></div>
    } @else {
    <app-advice-card
      [advice]="adviceslipService.advice()"
      (generate)="generateAdvice()"
    ></app-advice-card>
    }
  `,
  styleUrl: './generator.component.scss',
})
export class GeneratorComponent {
  adviceslipService = inject(AdviceslipService);

  generateAdvice() {
    this.updateLoadingState(true);

    this.adviceslipService.fetchFromAdviceSlip().subscribe((advice: Advice) => {
      if (this.adviceslipService.advice().number === advice.number) {
        this.updateLoadingState(false);
        return;
      }

      this.adviceslipService.state.update((state) => ({
        ...state,
        advice: advice,
        loading: false,
      }));
    });
  }

  private updateLoadingState(status: boolean) {
    this.adviceslipService.state.update((state) => ({
      ...state,
      loading: status,
    }));
  }
}
