import { Component, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-label',
  imports: [],
  host: {
    class: 'block',
  },
  templateUrl: './label.html',
})
export class Label {
  public class = input('');
  public for = input('');

  public get mergedClass() {
    return twMerge('text-sm font-semibold', this.class());
  }
}
