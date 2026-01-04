import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Feedback } from '../feedback/feedback';
import { Input } from '../input/input';
import { Button } from '../button/button';
import { Api } from '../../services/api';
import { finalize } from 'rxjs';
import { UsersStore } from '../../services/users-store';
import { GradientCard } from '../gradient-card/gradient-card';
import { Router } from '@angular/router';
import { passwordsMatchValidator } from './validators';
import { FormErrorPipe } from '../../core/form-error-pipe';
import { FormState } from '../../types/form';

@Component({
  selector: 'reactive-form',
  imports: [ReactiveFormsModule, Feedback, Input, Button, GradientCard, FormErrorPipe],
  standalone: true,
  templateUrl: './reactive-form.html',
})
export class ReactiveForm implements OnInit, FormState {
  private api = inject(Api);
  private formBuilder = inject(FormBuilder);
  private store = inject(UsersStore);
  private router = inject(Router);
  public form!: FormGroup;
  public submitted = signal(false);
  public submitting = signal(false);

  public ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [passwordsMatchValidator],
      },
    );
  }

  public submit() {
    this.submitted.set(true);
    if (this.form.invalid) return;

    this.submitting.set(true);

    this.api
      .post('/users', this.form.value)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.store.refresh();
          this.form.reset();
          this.router.navigate(['login']);

          this.submitted.set(false);
        },
      });
  }
}
