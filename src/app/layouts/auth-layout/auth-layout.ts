import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
