import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from './services/toast-service';
import { Toast } from './components/toast/toast';
import { ComboboxContent } from './components/combobox/combobox-content/combobox-content';
import { ComboboxOption } from './components/combobox/combobox-option/combobox-option';
import { DropdownTriggerForDirective } from './core/dropdown-trigger-directive';
import { ComboboxSearch } from './components/combobox/combobox-search/combobox-search';
import { ComboboxTrigger } from './components/combobox/combobox-trigger/combobox-trigger';
import { MultipleCombobox } from './components/combobox/multiple-combobox';
import { Container } from './components/container/container';

type User = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Toast,
    ComboboxOption,
    DropdownTriggerForDirective,
    ComboboxContent,
    ComboboxSearch,
    ComboboxTrigger,
    MultipleCombobox,
    Container,
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public toastService = inject(ToastService);
  protected readonly title = signal('appointment-project');
  public toasts = this.toastService.toasts;
  public selectedUser!: User | undefined;
  public counter = 0;

  public users: User[] = [
    { id: 1, name: 'Ana Silva' },
    { id: 2, name: 'Bruno Costa' },
    { id: 3, name: 'Carla Mendes' },
    { id: 4, name: 'Daniel Rocha' },
    { id: 5, name: 'Eduarda Lima' },
    { id: 6, name: 'Felipe Santos' },
    { id: 7, name: 'Gabriela Nunes' },
    { id: 8, name: 'Henrique Alves' },
    { id: 9, name: 'Isabela Pereira' },
    { id: 10, name: 'João Ribeiro' },
  ];

  public search = signal('');
  public filtered = computed(() =>
    this.users.filter((user) =>
      user.name.toLowerCase().includes(this.search().toLocaleLowerCase()),
    ),
  );

  public searched(value: string) {
    this.search.set(value);
  }

  public selectUser(value: string[]) {
    this.counter = value.length;
  }
}
