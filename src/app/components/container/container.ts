import { Component, HostBinding, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-container',
  imports: [],
  standalone: true,
  templateUrl: './container.html',
})
export class Container {
  public class = input('');

  @HostBinding('class')
  get mergedClass() {
    return twMerge('mx-auto container max-w-5xl min-h-screen block', this.class());
  }
}
