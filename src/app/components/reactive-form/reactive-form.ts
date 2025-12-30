import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Feedback } from '../feedback/feedback';
import { Input } from '../input/input';
import { Button } from '../button/button';
import { Api } from '../../services/api';
import { finalize } from 'rxjs';
import { UsersStore } from '../../services/users-store';

@Component({
  selector: 'reactive-form',
  imports: [ReactiveFormsModule, Feedback, Input, Button],
  standalone: true,
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm implements OnInit {
  private api = inject(Api);
  private formBuilder = inject(FormBuilder);
  private store = inject(UsersStore);
  public form!: FormGroup;
  public submitted = signal(false);
  public submitting = signal(false);

  public ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
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

          this.submitted.set(false);
        },
      });
  }
}
