import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Api } from '../../services/api';
import { map, startWith } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormState } from '../../types/form';
import { ToolCase, LucideAngularModule, Trash, Pencil, Check, Printer } from 'lucide-angular';
import { availabilityDates, services, timeSlots } from './utils';
import { Label } from '../label/label';
import { Textarea } from '../textarea/textarea';
import { FormatCurrencyPipe } from '../../core/format-currency-pipe';
import Decimal from 'decimal.js';
import { ButtonDirective } from '../../core/button-directive';
import { Input } from '../input/input';
import { Table } from '../table/table';
import { FormatDate } from '../../core/format-date-pipe';

@Component({
  selector: 'appointment-form',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    Label,
    Textarea,
    FormatCurrencyPipe,
    ButtonDirective,
    Input,
    Table,
    FormatDate,
  ],
  templateUrl: './appointment-form.html',
})
export class AppointmentForm implements FormState {
  private api = inject(Api);
  private fb = inject(FormBuilder);
  private search = signal('');

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
  public filteredServices = computed(() =>
    this.services.filter((service) =>
      service.description.toLowerCase().includes(this.search().toLowerCase()),
    ),
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

  public toolCaseIcon = ToolCase;
  public trashIcon = Trash;
  public pencilIcon = Pencil;
  public checkIcon = Check;
  public currentDate = new Date(Date.now()).toISOString();
  public printerIcon = Printer;

  public setSearch(value: string) {
    this.search.set(value);
  }

  public selectDate(date: string) {
    this.form.controls.date.setValue(date);
    this.page = 1;
  }

  public selectService(service: Service) {
    this.form.controls.services.controls[0].setValue(service);
  }

  public selectTime(time: string) {
    this.form.controls.time.setValue(time);
    this.page = 3;
  }

  public decreasePage() {
    this.page = this.page - 1;
  }

  public increasePage() {
    this.page = this.page + 1;
  }

  public submit() {
    this.submitted.set(true);

    if (this.form.invalid) return;

    this.submitting.set(true);
  }
}
