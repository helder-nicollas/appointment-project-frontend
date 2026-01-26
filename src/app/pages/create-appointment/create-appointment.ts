import { Component } from '@angular/core';
import { Container } from '../../components/container/container';
import { AppointmentForm } from '../../components/appointment-form/appointment-form';

@Component({
  selector: 'create-appointment',
  templateUrl: './create-appointment.html',
  imports: [Container, AppointmentForm],
})
export class CreateAppointment {}
