import { computed, Directive, input } from '@angular/core';
import { buttonVariants, ButtonVariants } from './button-variants';

@Directive({
  selector: '[uiButton]',
  standalone: true,
  host: {
    '[class]': 'mergedClass()',
  },
})
export class ButtonDirective {
  public variant = input<ButtonVariants['variant']>();
  public size = input<ButtonVariants['size']>();
  public class = input('');

  public mergedClass = computed(() =>
    buttonVariants({
      variant: this.variant(),
      size: this.size(),
      class: this.class(),
    }),
  );
}
