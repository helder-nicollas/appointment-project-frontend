import { Component, HostBinding, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-dialog-header',
  imports: [],
  standalone: true,
  template: '<ng-content/>',
})
export class DialogHeader {
  public class = input('');

  @HostBinding('class')
  public get mergedClass() {
    return twMerge('block pt-4 px-6', this.class());
  }
}
