import { Component, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Api } from '../../services/api';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'ui-delete-appointment',
  imports: [],
  templateUrl: './delete-appointment.html',
})
export class DeleteAppointment {
  private data = inject<{ id: string }>(DIALOG_DATA);
  private api = inject(Api);
  private dialogRef = inject(DialogRef);
  private toastService = inject(ToastService);
  public isLoading = signal(false);

  public deleteAppointment() {
    this.isLoading.set(true);
    this.api.delete(`/appointments/${this.data.id}`).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.dialogRef.close();
        this.toastService.push('Agendamento deletado com sucesso');
      },
      error: () => {
        this.isLoading.set(false);
        this.dialogRef.close();
        this.toastService.push('Algo deu errado ao tentar deletar este agendamento');
      },
    });
  }
}
