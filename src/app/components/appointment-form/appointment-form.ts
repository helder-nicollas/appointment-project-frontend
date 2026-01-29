import { Component, computed, inject, signal } from '@angular/core';
import { Input } from '../input/input';
import { Button } from '../button/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { Api } from '../../services/api';
import { map, startWith } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormState } from '../../types/form';
import { Feedback } from '../feedback/feedback';
import { FormErrorPipe } from '../../core/form-error-pipe';
import { Textarea } from '../textarea/textarea';
import { Label } from '../label/label';
import { AddServiceDialog } from '../add-service-dialog/add-service-dialog';
import { Dialog } from '@angular/cdk/dialog';
import { ToolCase, LucideAngularModule, Trash } from 'lucide-angular';
import { FormatCurrencyPipe } from '../../core/format-currency-pipe';
import { Decimal } from 'decimal.js';

type FormService = {
  id: string;
  basePrice: number;
  description: string;
  quantity: number;
};

@Component({
  selector: 'appointment-form',
  imports: [
    Input,
    Button,
    ReactiveFormsModule,
    Feedback,
    FormErrorPipe,
    Textarea,
    Label,
    LucideAngularModule,
    FormatCurrencyPipe,
  ],
  templateUrl: './appointment-form.html',
})
export class AppointmentForm implements FormState {
  private api = inject(Api);
  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);

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
    services: this.fb.array<FormControl<FormService>[]>([], { validators: [Validators.required] }),
  });
  public toolCaseIcon = ToolCase;
  public trashIcon = Trash;
  public formServices = toSignal(
    this.form.controls.services.valueChanges.pipe(startWith(this.form.controls.services.value)),
    { initialValue: this.form.controls.services.value },
  );
  public totalValue = computed(() => {
    let total = new Decimal(0);
    for (const service of this.formServices()) {
      total = total.add(new Decimal(service!.basePrice));
    }

    return total;
  });

  private addService(service: Service | null) {
    if (service?.id) {
      this.form.controls.services.push(
        new FormControl({
          id: service.id,
          basePrice: service.basePrice,
          description: service.description,
          quantity: 1,
        }),
      );
    }
  }

  public removeService(index: number) {
    this.form.controls.services.removeAt(index);
  }

  public openAddServiceDialog() {
    const dialogRef = this.dialog.open<FormService | null>(AddServiceDialog);

    dialogRef.closed.subscribe((result) => this.addService(result || null));
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
