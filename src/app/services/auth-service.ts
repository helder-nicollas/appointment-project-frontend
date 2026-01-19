import { inject, Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public api = inject(Api);

  public me() {
    return this.api.get<User>('/me');
  }

  public refresh() {
    return this.api.post('/refresh');
  }

  public logout() {
    return this.api.get('/logout');
  }
}
