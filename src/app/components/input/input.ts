import {
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  signal,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
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
})
export class Input implements ControlValueAccessor, AfterViewInit {
  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  public class = input('');
  public name = input('');
  public type = input('');
  public id = input('');
  public placeholder = input('');
  public autocomplete = input('on');
  public disabled = signal(false);
  public value = signal('');
  public onChange = (_: string) => {};
  public onTouched = () => {};

  public get mergedClass() {
    return twMerge(
      'border rounded-md py-2 px-2 block w-full focus-visible:ring-2 ring-ring outline-none border-border bg-input text-sm aria-invalid:border-danger',
      this.class(),
    );
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
    const v = (event.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
  }

  public handleBlur() {
    this.onTouched();
  }

  public ngAfterViewInit() {
    const input = this.host.nativeElement.querySelector('input');
    if (!input) return;

    Array.from(this.host.nativeElement.attributes).forEach((attr) => {
      if (attr.name.startsWith('aria-')) {
        this.renderer.setAttribute(input, attr.name, attr.value);
      }
    });
  }
}
