import { Component, inject, signal } from '@angular/core';
import { Input } from '../input/input';
import { Button } from '../button/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { Api } from '../../services/api';
import { map, startWith } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormState } from '../../types/form';
import { Feedback } from '../feedback/feedback';
import { FormErrorPipe } from '../../core/form-error-pipe';
import { Textarea } from '../textarea/textarea';
import { Label } from '../label/label';

type Service = {
  id: string;
  description: string;
  basePrice: number;
};

@Component({
  selector: 'appointment-form',
  imports: [Input, Button, ReactiveFormsModule, Feedback, FormErrorPipe, Textarea, Label],
  templateUrl: './appointment-form.html',
})
export class AppointmentForm implements FormState {
  private api = inject(Api);
  private fb = inject(FormBuilder);
  public submitted = signal(false);
  public submitting = signal(false);
  public formServices: Service[] = [];

  public services = [
    {
      id: 'srv-001',
      description: 'Manutenção preventiva de sistemas',
      basePrice: 150.0,
    },
    {
      id: 'srv-002',
      description: 'Instalação de software corporativo',
      basePrice: 300.0,
    },
    {
      id: 'srv-003',
      description: 'Suporte técnico remoto',
      basePrice: 120.0,
    },
    {
      id: 'srv-004',
      description: 'Consultoria em infraestrutura de TI',
      basePrice: 450.0,
    },
    {
      id: 'srv-005',
      description: 'Backup e recuperação de dados',
      basePrice: 200.0,
    },
    {
      id: 'srv-006',
      description: 'Auditoria de segurança da informação',
      basePrice: 600.0,
    },
    {
      id: 'srv-007',
      description: 'Monitoramento de servidores',
      basePrice: 180.0,
    },
    {
      id: 'srv-008',
      description: 'Desenvolvimento de funcionalidade sob demanda',
      basePrice: 800.0,
    },
    {
      id: 'srv-009',
      description: 'Treinamento técnico para equipes',
      basePrice: 350.0,
    },
    {
      id: 'srv-010',
      description: 'Otimização de performance de aplicações',
      basePrice: 400.0,
    },
  ];
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
