/* eslint-disable no-unused-vars */
import { Signal } from '@angular/core';

export interface SelectionStrategy {
  readonly value: Signal<string | string[] | null>;
  select(value: string): void;
  clear(): void;
  isSelected(value: string): boolean;
}
