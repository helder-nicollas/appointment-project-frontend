import { Component, HostBinding, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-dialog-content',
  imports: [],
  standalone: true,
  template: '<ng-content/>',
})
export class DialogContent {
  public class = input('');

  @HostBinding('class')
  public get mergedClass() {
    return twMerge('block px-6 py-4', this.class());
  }
}
