import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'formatCurrency',
})
export class FormatCurrencyPipe implements PipeTransform {
  public transform(value?: number) {
    if (!value) return (0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }
}
