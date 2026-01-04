import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { twMerge } from 'tailwind-merge';

type OnTouchedFunction = () => void;
type OnChangeFunction = (_value: string) => void;

@Component({
  selector: 'ui-select',
  imports: [],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => Select),
    },
  ],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select implements ControlValueAccessor {
  public class = input('');
  public placeholder = input('');
  public name = input('');
  public id = input('');
  public disabled = signal(false);
  public value = signal('');
  public onChange = (_: string) => {};
  public onTouched = () => {};

  public get mergedClass() {
    return twMerge('border rounded py-2 px-2 block w-full', this.class());
  }

  public writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  public registerOnChange(fn: OnChangeFunction): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: OnTouchedFunction): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  public handleInput(event: Event) {
    const v = (event.target as HTMLSelectElement).value;
    this.value.set(v);
    this.onChange(v);
  }

  public handleBlur() {
    this.onTouched();
  }
}
