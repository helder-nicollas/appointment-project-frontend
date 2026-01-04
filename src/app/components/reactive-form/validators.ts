import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;

  if (!password || !confirm) return null;

  return password === confirm ? null : { passwordsMismatch: true };
};
