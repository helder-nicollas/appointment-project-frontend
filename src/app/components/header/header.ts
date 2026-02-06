import { Component } from '@angular/core';
import { Container } from '../container/container';
import { ButtonDirective } from '../../core/button-directive';
import { User, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'ui-header',
  imports: [Container, ButtonDirective, LucideAngularModule],
  templateUrl: './header.html',
})
export class Header {
  public userIcon = User;
}
