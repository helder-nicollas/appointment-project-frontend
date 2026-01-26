import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CreateAccount } from './pages/create-account/create-account';
import { Appointments } from './pages/appointments/appointments';
import { authGuard } from './guards/auth-guard';
import { CreateAppointment } from './pages/create-appointment/create-appointment';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'create-account',
    component: CreateAccount,
  },
  {
    path: 'create-appointment',
    component: CreateAppointment,
  },
  {
    path: 'appointments',
    component: Appointments,
    canActivate: [authGuard],
  },
];
