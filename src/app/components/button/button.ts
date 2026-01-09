import { Component, computed, input, output } from '@angular/core';
import { ButtonVariants, buttonVariants } from './button-variants';

@Component({
  selector: 'ui-button',
  imports: [],
  standalone: true,
  templateUrl: './button.html',
})
export class Button {
  public clicked = output<void>();
  public disabled = input(false);
  public type = input<'button' | 'reset' | 'submit'>('button');
  public class = input('');
  public variant = input<ButtonVariants['variant'] | undefined>(undefined);
  public size = input<ButtonVariants['size'] | undefined>(undefined);

  public mergedClass = computed(() =>
    buttonVariants({
      variant: this.variant(),
      size: this.size(),
      class: this.class(),
    }),
  );

  public handleClick() {
    this.clicked.emit();
  }
}
