import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Container } from './components/container/container';
import { UsersList } from './components/users-list/users-list';
import { ReactiveForm } from './components/reactive-form/reactive-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Container, UsersList, ReactiveForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('appointment-project');
}
