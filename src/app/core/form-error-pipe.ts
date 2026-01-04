import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const messages: Record<string, string> = {
  required: 'Required field',
  minlength: 'Value too short',
  maxlength: 'Value too long',
  email: 'Invalid e-mail',
};

@Pipe({ name: 'formError', standalone: true })
export class FormErrorPipe implements PipeTransform {
  public transform(errors: ValidationErrors | null | undefined) {
    if (!errors) return '';

    const errorKey = Object.keys(errors)[0];

    return messages[errorKey] || 'Invalid field';
  }
}
