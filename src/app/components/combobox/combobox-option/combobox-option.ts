import { Component, HostBinding, inject, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { ComboboxController } from '../controllers/combobox-controller';
import { Check, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ui-combobox-option',
  imports: [LucideAngularModule],
  host: {
    '(click)': 'controller.select(value())',
    role: 'option',
  },
  template:
    '<ng-content/> @if(controller.isSelected(value())) {<lucide-icon [img]="checkIcon" class="w-4 h-4" />}',
})
export class ComboboxOption {
  public value = input('');
  public class = input('');
  public controller = inject(ComboboxController);
  public checkIcon = Check;

  @HostBinding('class')
  public get mergedClass() {
    return twMerge(
      'flex items-center justify-between cursor-pointer py-2 px-4 z-10 hover:bg-background/75 text-sm',
      this.class(),
    );
  }
}
