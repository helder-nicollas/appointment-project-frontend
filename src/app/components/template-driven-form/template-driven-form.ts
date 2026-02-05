import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Input } from '../input/input';
import { Feedback } from '../feedback/feedback';
import { Api } from '../../services/api';
import { ButtonDirective } from '../../core/button-directive';

@Component({
  selector: 'template-driven-form',
  imports: [FormsModule, Input, Feedback, ButtonDirective],
  templateUrl: './template-driven-form.html',
  host: {
    class: 'col-span-3',
  },
  styleUrl: './template-driven-form.css',
})
export class TemplateDrivenForm {
  private api = inject(Api);
  public model = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  public submit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.api.post('/users', form.value).subscribe();
  }
}
