import { Component, inject } from '@angular/core';
import { DialogHeader } from '../dialog/dialog-header/dialog-header';
import { DialogContent } from '../dialog/dialog-content/dialog-content';
import { DialogRef } from '@angular/cdk/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { Api } from '../../services/api';
import { map, startWith } from 'rxjs';
import { Input } from '../input/input';
import { FormatCurrencyPipe } from '../../core/format-currency-pipe';

@Component({
  selector: 'add-service-dialog',
  imports: [DialogHeader, DialogContent, FormatCurrencyPipe, Input],
  standalone: true,
  templateUrl: './add-service-dialog.html',
})
export class AddServiceDialog {
  private api = inject(Api);
  private dialogRef = inject(DialogRef);
  public query = toSignal(
    this.api.get<Service[]>('/services').pipe(
      map((data) => ({ loading: false, data })),
      startWith({ loading: true, data: [] }),
    ),
    { initialValue: { loading: true, data: [] } },
  );

  public selectService(service: Service) {
    this.dialogRef.close(service);
  }
}
