import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDate', standalone: true })
export class FormatDate implements PipeTransform {
  public transform(date: string) {
    const formatted = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(Date.parse(date));

    return formatted;
  }
}
