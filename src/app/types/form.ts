import { Signal } from '@angular/core';

export interface FormState {
  submitted: Signal<boolean>;
  submitting: Signal<boolean>;
}
