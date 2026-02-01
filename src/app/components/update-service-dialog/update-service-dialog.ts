import { Component, computed, inject } from '@angular/core';
import { Label } from '../label/label';
import { Input } from '../input/input';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import Decimal from 'decimal.js';
import { FormatCurrencyPipe } from '../../core/format-currency-pipe';
import { Button } from '../button/button';
import { DialogFooter } from '../dialog/dialog-footer/dialog-footer';
import { DialogContent } from '../dialog/dialog-content/dialog-content';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

type DialogData = {
  basePrice: number;
  quantity: number;
  description: string;
};

@Component({
  selector: 'update-service-dialog',
  standalone: true,
  imports: [
    Label,
    Input,
    FormatCurrencyPipe,
    Button,
    DialogFooter,
    DialogContent,
    ReactiveFormsModule,
  ],
  templateUrl: './update-service-dialog.html',
})
export class UpdateServiceDialog {
  private fb = inject(FormBuilder);
  public data: DialogData = inject(DIALOG_DATA);
  public form = this.fb.group({
    quantity: [this.data.quantity, [Validators.required]],
  });
  public quantitySignal = toSignal(
    this.form.controls.quantity.valueChanges.pipe(startWith(this.form.controls.quantity.value)),
    { initialValue: this.form.controls.quantity.value },
  );
  public totalValue = computed(() => {
    const decimalQuantity = new Decimal(this.quantitySignal() || 0);
    const decimalBasePrice = new Decimal(this.data.basePrice);

    return decimalBasePrice.mul(decimalQuantity).toNumber();
  });

  public changeQuantity(value: string) {
    this.form.controls.quantity.setValue(Number(value));
  }

  public submit() {
    console.log(this.form.value);
  }
}
