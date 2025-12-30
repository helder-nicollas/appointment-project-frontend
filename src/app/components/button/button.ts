import { Component, input, output } from '@angular/core';

@Component({
  selector: 'ui-button',
  imports: [],
  standalone: true,
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  public clicked = output<void>();
  public disabled = input(false);
  public type = input<'button' | 'reset' | 'submit'>('button');

  public handleClick() {
    this.clicked.emit();
  }
}
