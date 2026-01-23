/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  input,
  Output,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DropdownPanel } from './types/dropdown-panel';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown implements DropdownPanel {
  @ViewChild(TemplateRef)
  public templateRef!: TemplateRef<any>;
  @Output()
  public closed = new EventEmitter();
  public class = input('');
  public open = signal(false);

  public get mergedClass() {
    return twMerge('', this.class());
  }

  public setOpen(value: boolean) {
    this.open.set(value);
  }
}
