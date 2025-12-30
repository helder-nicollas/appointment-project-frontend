import { Component, resource } from '@angular/core';

const getUsers = async () => {
  const response = await fetch('http://localhost:8080/users');
  return (await response.json()) as User[];
};

@Component({
  selector: 'users-list',
  imports: [],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList {
  public query = resource({
    loader: () => getUsers(),
  });
}
