import { Component, input } from '@angular/core';
import { twMerge } from 'tailwind-merge';
import { ChevronsUpDown, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ui-combobox-trigger',
  imports: [LucideAngularModule],
  templateUrl: './combobox-trigger.html',
})
export class ComboboxTrigger {
  public class = input('');
  public chevronsUpDown = ChevronsUpDown;

  public get mergedClass() {
    return twMerge(
      'border border-border rounded-md w-full shadow-md px-3 py-2 flex justify-between shadow-md drop-shadow-border outline-none text-sm ring-ring focus-visible:ring-2 transition-colors cursor-pointer bg-input hover:bg-input/75 font-semibold',
      this.class(),
    );
  }
}
