import { effect, inject, Injectable, resource, signal } from '@angular/core';
import { Api } from './api';
import { httpResource } from '@angular/common/http';

type State = {
  loading: boolean;
  data: User[];
};

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  private api = inject(Api);
  public refreshTrigger = signal(1);
  public state = signal<State>({ data: [], loading: true });

  public constructor() {
    effect(() => {
      this.refreshTrigger();

      this.api.get<User[]>('/users').subscribe({
        next: (data) => this.state.set({ loading: false, data }),
        error: () =>
          this.state.set({
            loading: false,
            data: [],
          }),
      });
    });
  }

  public refresh() {
    this.refreshTrigger.update((v) => v + 1);
  }
}
