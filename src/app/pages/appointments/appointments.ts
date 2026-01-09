import { Component, inject } from '@angular/core';
import { Container } from '../../components/container/container';
import { toSignal } from '@angular/core/rxjs-interop';
import { Api } from '../../services/api';
import { map, startWith } from 'rxjs';
import { FormatDate } from '../../core/format-date';
import { LucideAngularModule, Delete } from 'lucide-angular';
import { Button } from '../../components/button/button';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { AppointmentForm } from '../../components/appointment-form/appointment-form';

@Component({
  selector: 'app-appointments',
  imports: [Container, FormatDate, LucideAngularModule, Button, DialogModule],
  standalone: true,
  templateUrl: './appointments.html',
})
export class Appointments {
  private api = inject(Api);
  public readonly Delete = Delete;
  public dialog = inject(Dialog);
  public query = toSignal(
    this.api.get<Appointment[]>('/appointments').pipe(
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

  public deleteAppointment(id: string) {
    this.api.delete(`/appointments/${id}`).subscribe();
  }

  public openModal() {
    console.log('log');
    this.dialog.open(AppointmentForm);
  }
}
