import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { CreateAccount } from './pages/create-account/create-account';
import { CreateAppointment } from './pages/create-appointment/create-appointment';
import { MyAppointments } from './pages/my-appointments/my-appointments';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  {
    path: 'app',
    component: AuthLayout,
    children: [
      {
        path: 'create-appointment',
        component: CreateAppointment,
      },
      {
        path: 'my-appointments',
        component: MyAppointments,
      },
      {
        path: 'profile',
        component: Profile,
      },
    ],
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'create-account',
    component: CreateAccount,
  },
];
