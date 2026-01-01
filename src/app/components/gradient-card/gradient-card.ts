import { Component, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-gradient-card',
  imports: [],
  templateUrl: './gradient-card.html',
  styleUrl: './gradient-card.css',
})
export class GradientCard {
  public class = input('');

  get mergedClass() {
    return twMerge('gradient-card bg-slate-800', this.class());
  }
}
