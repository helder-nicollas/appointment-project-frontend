import { Component, HostBinding, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-dialog-footer',
  imports: [],
  standalone: true,
  template: '<ng-content/>',
})
export class DialogFooter {
  public class = input('');

  @HostBinding('class')
  public get mergedClass() {
    return twMerge('block px-6 pb-4', this.class());
  }
}
