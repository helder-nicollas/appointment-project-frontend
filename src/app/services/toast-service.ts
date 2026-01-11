import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly BASE_BOTTOM = 40;
  private readonly GAP = 100;
  public toasts = signal<Toast[]>([]);

  public push(message: string, ms: number = 3000) {
    const toast: Toast = {
      id: crypto.randomUUID(),
      message,
    };

    this.toasts.update((toasts) => [...toasts, toast]);
    setTimeout(() => {
      this.dismiss(toast.id);
    }, ms);
  }

  public dismiss(id: string) {
    this.toasts.update((toasts) => toasts.filter((toast) => toast.id != id));
  }

  public getBottom(index: number): number {
    return this.BASE_BOTTOM + index * this.GAP;
  }
}
