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
  selector: 'ui-textarea',
  imports: [],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => Textarea),
    },
  ],
  templateUrl: './textarea.html',
})
export class Textarea implements ControlValueAccessor, AfterViewInit {
  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  public class = input('');
  public name = input('');
  public id = input('');
  public placeholder = input('');
  public autocomplete = input('on');
  public rows = input('2');
  public disabled = signal(false);
  public value = signal<string | null>(null);
  public onChange = (_: string) => {};
  public onTouched = () => {};

  public get mergedClass() {
    return twMerge(
      'border rounded-md py-2 px-2 block w-full focus-visible:ring-2 ring-ring outline-none border-border bg-input text-sm aria-invalid:border-danger resize-none',
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
    const textarea = this.host.nativeElement.querySelector('textarea');
    if (!textarea) return;

    Array.from(this.host.nativeElement.attributes).forEach((attr) => {
      if (attr.name.startsWith('aria-')) {
        this.renderer.setAttribute(textarea, attr.name, attr.value);
      }
    });
  }
}
