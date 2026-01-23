import { signal } from '@angular/core';
import { SelectionStrategy } from './selection-strategy';

export class SingleSelectionStrategy implements SelectionStrategy {
  private readonly _value = signal<string | null>(null);
  public readonly value = this._value.asReadonly();

  public select(value: string) {
    this._value.set(value);
  }

  public isSelected(value: string) {
    return this._value() == value;
  }

  public clear() {
    this._value.set(null);
  }
}
