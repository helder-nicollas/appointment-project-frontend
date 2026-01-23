import { Component, effect, inject, input, output } from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { ComboboxController } from './controllers/combobox-controller';
import { MultipleComboboxController } from './controllers/multiple-combobox-controller';

@Component({
  selector: 'ui-multiple-combobox',
  standalone: true,
  template: '<ng-content>',
  imports: [],
  providers: [{ provide: ComboboxController, useClass: MultipleComboboxController }],
})
export class MultipleCombobox {
  public class = input('');
  public selected = output<string[]>();
  public controller = inject(ComboboxController);

  public constructor() {
    effect(() => {
      const value = this.controller.value();
      if (Array.isArray(value)) {
        this.selected.emit(value);
      }
    });
  }

  public get mergedClass() {
    return twMerge('', this.class());
  }
}
