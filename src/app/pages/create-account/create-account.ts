import { Component } from '@angular/core';
import { ReactiveForm } from '../../components/reactive-form/reactive-form';
import { Container } from '../../components/container/container';

@Component({
  selector: 'create-account-page',
  imports: [ReactiveForm, Container],
  templateUrl: './create-account.html',
})
export class CreateAccount {}
