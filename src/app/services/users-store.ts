import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersStore {
  public users = new BehaviorSubject<User[]>([]);
  public data = this.users.asObservable();
}
