import { Component, input, ViewEncapsulation } from '@angular/core';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
  encapsulation: ViewEncapsulation.None,
})
export class Table {
  public class = input('');

  public get mergedClass() {
    return twMerge('ui-table', this.class());
  }
}
