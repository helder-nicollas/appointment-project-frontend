import { Component, effect, inject, output } from '@angular/core';
import { ComboboxController } from '../controllers/combobox-controller';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'ui-combobox-search',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './combobox-search.html',
})
export class ComboboxSearch {
  public searched = output<string>();
  public controller = inject(ComboboxController);
  public searchIcon = Search;

  public constructor() {
    effect(() => {
      if (!this.controller.open()) this.reset();
    });
  }

  private reset() {
    this.controller.setSearch('');
    this.searched.emit(this.controller.search());
  }

  public onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.controller.setSearch(target.value);
    this.searched.emit(this.controller.search());
  }
}
