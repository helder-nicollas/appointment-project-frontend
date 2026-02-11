import { Component } from '@angular/core';
import { Container } from '../../components/container/container';
import { ButtonDirective } from '../../core/button-directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'my-appointments',
  imports: [Container, ButtonDirective, RouterLink],
  templateUrl: './my-appointments.html',
})
export class MyAppointments {}
