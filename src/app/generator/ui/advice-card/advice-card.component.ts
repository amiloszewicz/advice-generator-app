import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Advice } from '../../../shared/data-access/interfaces/advice';

@Component({
  selector: 'app-advice-card',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <p>{{ advice.number }}</p>
    <p>{{ advice.name }}</p>
    <button (click)="generate.emit()">random</button>
  `,
  styleUrl: './advice-card.component.scss',
})
export class AdviceCardComponent {
  @Input({ required: true }) advice!: Advice;
  @Output() generate = new EventEmitter<void>();
}
