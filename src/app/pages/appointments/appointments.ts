import { Component, inject } from '@angular/core';
import { AppointmentForm } from '../../components/appointment-form/appointment-form';
import { MatDialog } from '@angular/material/dialog';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-appointments',
  imports: [Button],
  standalone: true,
  templateUrl: './appointments.html',
})
export class Appointments {
  private dialog = inject(MatDialog);

  public openDialog() {
    this.dialog.open(AppointmentForm);
  }
}
