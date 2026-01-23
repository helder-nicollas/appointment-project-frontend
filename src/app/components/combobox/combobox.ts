import { Component, effect, inject, input, output } from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { ComboboxController } from './controllers/combobox-controller';
import { SingleComboboxCotroller } from './controllers/single-combobox-controller';

@Component({
  selector: 'ui-combobox',
  standalone: true,
  template: '<ng-content>',
  imports: [],
  providers: [{ provide: ComboboxController, useClass: SingleComboboxCotroller }],
})
export class Combobox {
  public class = input('');
  public selected = output<string>();
  public multiple = input(false);
  public controller = inject(ComboboxController);

  public constructor() {
    effect(() => {
      if (this.controller.value()) {
        this.selected.emit(String(this.controller.value()));
      }
    });
  }

  public get mergedClass() {
    return twMerge('', this.class());
  }
}
