import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListCheck, LucideAngularModule, UserRound, Users } from 'lucide-angular';
import { ButtonDirective } from '../../core/button-directive';

@Component({
  selector: 'sidebar',
  imports: [LucideAngularModule, RouterLink, ButtonDirective],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public routes = [
    {
      path: '/my-appointments',
      label: 'Meus agendamentos',
      icon: ListCheck,
    },
    {
      path: '/profile',
      label: 'Usuários',
      icon: UserRound,
    },
    {
      path: '/users',
      label: 'Usuários',
      icon: Users,
    },
  ];
}
