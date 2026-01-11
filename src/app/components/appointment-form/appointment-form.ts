import { Component, inject, signal } from '@angular/core';
import { Input } from '../input/input';
import { Button } from '../button/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { Api } from '../../services/api';
import { map, startWith } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from '../select/select';
import { SelectOption } from '../select-option/select-option';
import { FormState } from '../../types/form';
import { Feedback } from '../feedback/feedback';
import { FormErrorPipe } from '../../core/form-error-pipe';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'appointment-form',
  imports: [Input, Button, ReactiveFormsModule, Select, SelectOption, Feedback, FormErrorPipe],
  templateUrl: './appointment-form.html',
})
export class AppointmentForm implements FormState {
  private api = inject(Api);
  private fb = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  public submitted = signal(false);
  public submitting = signal(false);
  public query = toSignal(
    this.api.get<User[]>('/users').pipe(
      map((data) => ({ loading: false, data })),
      startWith({ loading: true, data: [] }),
    ),
    {
      initialValue: {
        loading: true,
        data: [],
      },
    },
  );
  public form = this.fb.group({
    startDate: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    description: ['', [Validators.required]],
    clientId: ['', [Validators.required]],
    ownerId: ['', [Validators.required]],
  });

  public close() {
    this.dialogRef.close();
  }

  public submit() {
    this.submitted.set(true);

    if (this.form.invalid) return;

    this.submitting.set(true);

    let [year, month, day] = this.form.value.startDate!.split('-').map(Number);

    const startDate = new Date(year, month - 1, day);
    startDate.setHours(
      Number(this.form.value.startTime!.split(':')[0]),
      Number(this.form.value.startTime!.split(':')[1]),
    );

    [year, month, day] = this.form.value.endDate!.split('-').map(Number);

    const endDate = new Date(year, month - 1, day);
    endDate.setHours(
      Number(this.form.value.endTime!.split(':')[0]),
      Number(this.form.value.endTime!.split(':')[1]),
    );
    const data = {
      ...this.form.value,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    this.api.post('/appointments', data).subscribe({
      next: () => {
        this.submitting.set(false);
        this.submitted.set(false);
        this.form.reset();
      },
      error: () => {
        this.submitting.set(false);
        this.submitted.set(false);
      },
    });
  }
}
