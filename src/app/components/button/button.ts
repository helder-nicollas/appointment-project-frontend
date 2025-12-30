import { Component, input, output } from '@angular/core';
import { twMerge } from 'tailwind-merge';

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
  public class = input('');

  public get mergedClass() {
    return twMerge(
      'bg-emerald-500 h-10 py-2 px-3 rounded text-white cursor-pointer hover:bg-emerald-800 transition-colors disabled:pointer-events-none disabled:bg-emerald-800',
      this.class(),
    );
  }

  public handleClick() {
    this.clicked.emit();
  }
}
