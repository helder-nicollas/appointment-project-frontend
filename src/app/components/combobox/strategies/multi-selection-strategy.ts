import { signal } from '@angular/core';
import { SelectionStrategy } from './selection-strategy';

export class MultiSelectionStrategy implements SelectionStrategy {
  private readonly _value = signal<string[]>([]);
  public readonly value = this._value.asReadonly();

  public select(value: string) {
    const current = this._value();
    this._value.set(
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    );
  }

  public isSelected(value: string) {
    return this._value().includes(value);
  }

  public clear(): void {
    this._value.set([]);
  }
}
