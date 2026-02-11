import { Component } from '@angular/core';
import { Container } from '../container/container';
import { ButtonDirective } from '../../core/button-directive';
import { User, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-header',
  imports: [Container, ButtonDirective, LucideAngularModule, RouterLink],
  templateUrl: './header.html',
})
export class Header {
  public userIcon = User;
}
