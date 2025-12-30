import { Component, HostBinding, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-container',
  imports: [],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container {
  public class = input('');

  @HostBinding('class')
  get mergedClass() {
    return twMerge('mx-auto container max-w-5xl', this.class());
  }
}
