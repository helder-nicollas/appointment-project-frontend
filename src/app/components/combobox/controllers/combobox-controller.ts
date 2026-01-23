import { signal } from '@angular/core';
import { SelectionStrategy } from '../strategies/selection-strategy';

export abstract class ComboboxController {
  private searchSignal = signal('');
  private openSignal = signal(false);
  public search = this.searchSignal.asReadonly();
  public open = this.openSignal.asReadonly();
  protected readonly selection: SelectionStrategy;

  protected constructor(selection: SelectionStrategy) {
    this.selection = selection;
  }

  public setSearch(value: string) {
    this.searchSignal.set(value);
  }

  public select(value: string) {
    this.selection.select(value);
  }

  public isSelected(value: string) {
    return this.selection.isSelected(value);
  }

  public setOpen(value: boolean) {
    this.openSignal.set(value);
  }

  public value() {
    return this.selection.value();
  }
}
