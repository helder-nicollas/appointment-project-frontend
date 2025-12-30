import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Feedback } from '../feedback/feedback';
import { Api } from '../../services/api';

@Component({
  selector: 'template-driven-form',
  imports: [FormsModule, Button, Input, Feedback],
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
