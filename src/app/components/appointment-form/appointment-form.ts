import { Component, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { Input } from '../input/input';
import { Button } from '../button/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { Api } from '../../services/api';
import { map, startWith } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from '../select/select';

@Component({
  selector: 'appointment-form',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    Input,
    Button,
    ReactiveFormsModule,
    Select,
  ],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.css',
})
export class AppointmentForm {
  public dialogRef: MatDialogRef<AppointmentForm> = inject(MatDialogRef<AppointmentForm>);
  private api = inject(Api);
  private fb = inject(FormBuilder);
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
    startTime: [''],
    endTime: [''],
    endDate: [''],
    description: [''],
    clientId: [''],
    ownerId: [''],
  });

  public submit() {
    const startDate = new Date(this.form.value.startDate!);
    console.log(this.form.value.startTime?.split(':'));
    startDate.setHours(
      Number(this.form.value.startTime!.split(':')[0]),
      Number(this.form.value.startTime!.split(':')[1]),
    );

    console.log(startDate.toISOString());
    const data = { ...this.form.value, startDate };
  }
}
