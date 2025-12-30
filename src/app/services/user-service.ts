import { inject, Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = inject(Api);

  public createUser(body: unknown) {
    return this.api.post('/users', body);
  }

  public getUsers() {
    return this.api.get<User[]>('/users');
  }
}
