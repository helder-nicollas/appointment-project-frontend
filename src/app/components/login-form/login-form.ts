import { Component, inject, OnInit, signal } from '@angular/core';
import { Input } from '../input/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { Button } from '../button/button';
import { GradientCard } from '../gradient-card/gradient-card';

@Component({
  selector: 'login-form',
  imports: [Input, FormsModule, ReactiveFormsModule, Button, GradientCard],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private api = inject(Api);
  public form!: FormGroup;
  public submitted = signal(false);
  public submitting = signal(false);

  public ngOnInit() {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  public submit() {
    this.submitted.set(true);
    if (this.form.invalid) return;

    this.api.post('/login', this.form.value).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
