import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Feedback } from '../feedback/feedback';
import { Input } from '../input/input';
import { Button } from '../button/button';
import { Api } from '../../services/api';
import { finalize } from 'rxjs';

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
  public form!: FormGroup;
  public submitted = false;
  public submitting = false;

  public ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public submit() {
    this.submitted = true;
    this.submitting = true;
    if (this.form.invalid) return;

    this.api
      .post('/users', this.form.value)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe();

    console.log(this.form.value);
  }
}
