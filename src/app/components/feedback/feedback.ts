import { Component, HostBinding, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-feedback',
  imports: [],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback {
  public class = input('');
  public message = input('');
  public show = input(false);

  @HostBinding('class')
  get mergedClass() {
    return twMerge('text-red-500 text-sm', this.class());
  }
}
