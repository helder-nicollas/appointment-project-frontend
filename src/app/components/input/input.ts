import { Component, forwardRef, HostBinding, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { twMerge } from 'tailwind-merge';

type OnTouchedFunction = () => void;
type OnChangeFunction = (_value: string) => void;

@Component({
  selector: 'ui-input',
  imports: [],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => Input),
    },
  ],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input implements ControlValueAccessor {
  public class = input('');
  public name = input('');
  public type = input('');
  public placeholder = input('');
  public disabled = signal(false);
  public value = '';
  public onChange = (_: string) => {};
  public onTouched = () => {};

  @HostBinding('class')
  get mergedClass() {
    return twMerge('border rounded block', this.class());
  }

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: OnChangeFunction): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFunction): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
