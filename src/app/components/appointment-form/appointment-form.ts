import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Api } from '../../services/api';
import { map, startWith } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormState } from '../../types/form';
import { Dialog } from '@angular/cdk/dialog';
import { ToolCase, LucideAngularModule, Trash, Pencil, ArrowLeft } from 'lucide-angular';
import { availabilityDates, services, timeSlots } from './utils';
import { Label } from '../label/label';
import { Textarea } from '../textarea/textarea';
import Decimal from 'decimal.js';
import { FormatCurrencyPipe } from '../../core/format-currency-pipe';

@Component({
  selector: 'appointment-form',
  imports: [ReactiveFormsModule, LucideAngularModule, Label, Textarea, FormatCurrencyPipe],
  templateUrl: './appointment-form.html',
})
export class AppointmentForm implements FormState {
  private api = inject(Api);
  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);

  public page = 0;
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
    date: ['', [Validators.required]],
    services: this.fb.array<FormControl<Service | null>>(
      [new FormControl({ basePrice: 0, description: '', disabled: false, id: '' })],
      {
        validators: [Validators.required],
      },
    ),
    time: ['', [Validators.required]],
    description: [''],
  });
  public formServices = toSignal(
    this.form.controls.services.valueChanges.pipe(startWith(this.form.controls.services.value)),
    { initialValue: this.form.controls.services.value },
  );
  public totalValue = computed(() => {
    let total = new Decimal(0);
    for (const service of this.formServices()) {
      total = total.add(new Decimal(service!.basePrice));
    }

    return total.toNumber();
  });

  public dates = availabilityDates;
  public services = services;
  public timeSlots = timeSlots;
  public arrowIcon = ArrowLeft;

  public toolCaseIcon = ToolCase;
  public trashIcon = Trash;
  public pencilIcon = Pencil;

  public selectDate(date: string) {
    this.form.controls.date.setValue(date);
    this.page = 1;
  }

  public selectService(service: Service) {
    this.form.controls.services.controls[0].setValue(service);
    this.page = 2;
  }

  public selectTime(time: string) {
    this.form.controls.time.setValue(time);
    this.page = 3;
  }

  public decreasePage() {
    this.page = this.page - 1;
  }

  public submit() {
    this.submitted.set(true);

    if (this.form.invalid) return;

    this.submitting.set(true);
  }
}
