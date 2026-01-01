import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  selector: 'login',
  imports: [LoginForm],
  templateUrl: './login.html',
})
export class Login {}
