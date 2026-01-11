import { Component, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-select-option',
  imports: [],
  templateUrl: './select-option.html',
})
export class SelectOption {
  public value = input<string | number>('');
  public class = input('');
  public disabled = input(false);
  public default = input(false);

  public get mergedClass() {
    return twMerge('bg-background', this.class());
  }
}
