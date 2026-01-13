import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CreateAccount } from './pages/create-account/create-account';
import { Appointments } from './pages/appointments/appointments';
import { authGuard } from './guards/auth-guard';

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
    path: 'appointments',
    component: Appointments,
    canActivate: [authGuard],
  },
];
