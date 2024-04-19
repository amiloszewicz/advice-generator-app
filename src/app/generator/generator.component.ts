import { Component, inject } from '@angular/core';
import { AdviceslipService } from './data-access/adviceslip.service';
import { AdviceCardComponent } from './ui/advice-card/advice-card.component';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [AdviceCardComponent],
  template: `
    <app-advice-card
      [advice]="adviceslipService.advice()"
      (generate)=""
    ></app-advice-card>
  `,
  styles: ``,
})
export class GeneratorComponent {
  adviceslipService = inject(AdviceslipService);

  constructor() {}
}
