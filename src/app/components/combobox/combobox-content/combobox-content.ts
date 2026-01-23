/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DropdownPanel } from '../../dropdown/types/dropdown-panel';
import { twMerge } from 'tailwind-merge';
import { ComboboxController } from '../controllers/combobox-controller';

@Component({
  selector: 'ui-combobox-content',
  imports: [],
  templateUrl: './combobox-content.html',
})
export class ComboboxContent implements DropdownPanel {
  private controller = inject(ComboboxController);
  @ViewChild(TemplateRef)
  public templateRef!: TemplateRef<any>;
  public class = input('');
  public open = signal(false);
  public closed = new EventEmitter<void>();

  public constructor() {
    effect(() => {
      this.controller.setOpen(this.open());
    });
  }

  public get mergedClass() {
    return twMerge(
      'rounded-md overflow-auto max-h-[500px] bg-secondary animate-dropdown overflow-x-hidden w-full',
      this.class(),
    );
  }

  public setOpen(value: boolean) {
    this.open.set(value);
  }
}
