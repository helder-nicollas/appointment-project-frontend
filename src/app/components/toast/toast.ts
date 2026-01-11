import { Component, computed, inject, input } from '@angular/core';
import { ToastService } from '../../services/toast-service';
import { toastVariants, ToastVariants } from './toast-variants';
import { twMerge } from 'tailwind-merge';

@Component({
  selector: 'ui-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  private toastService = inject(ToastService);
  public message = input('');
  public id = input('');
  public bottom = input(0);
  public variant = input<ToastVariants['variant'] | undefined>(undefined);
  public class = input('');
  public mergedClass = computed(() =>
    twMerge(
      toastVariants({
        variant: this.variant(),
        class: this.class(),
      }),
    ),
  );

  public handleDismiss() {
    this.toastService.dismiss(this.id());
  }
}
