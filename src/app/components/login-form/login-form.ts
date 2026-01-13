import { Component, inject, OnInit, signal } from '@angular/core';
import { Input } from '../input/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Api } from '../../services/api';
import { Button } from '../button/button';
import { GradientCard } from '../gradient-card/gradient-card';
import { Feedback } from '../feedback/feedback';
import { FormState } from '../../types/form';
import { FormErrorPipe } from '../../core/form-error-pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [Input, FormsModule, ReactiveFormsModule, Button, GradientCard, Feedback, FormErrorPipe],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm implements OnInit, FormState {
  private formBuilder = inject(FormBuilder);
  private api = inject(Api);
  private router = inject(Router);
  public form!: FormGroup;
  public submitted = signal(false);
  public submitting = signal(false);

  public ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public submit() {
    this.submitted.set(true);
    if (this.form.invalid) return;

    this.submitting.set(true);

    this.api.post('/login', this.form.value).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/appointments']);
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }
}
