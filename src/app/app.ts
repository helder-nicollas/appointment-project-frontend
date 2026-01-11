import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from './services/toast-service';
import { Toast } from './components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public toastService = inject(ToastService);
  protected readonly title = signal('appointment-project');
  public toasts = this.toastService.toasts;
}
