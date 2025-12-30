import { Component, inject } from '@angular/core';
import { UsersStore } from '../../services/users-store';

@Component({
  selector: 'users-list',
  imports: [],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList {
  private store = inject(UsersStore);
  public state = this.store.state;
}
