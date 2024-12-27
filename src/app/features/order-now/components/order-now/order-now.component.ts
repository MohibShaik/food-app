import { Component } from '@angular/core';
import { AuthService } from 'src/app/features/admin/state/auth.service';

@Component({
  selector: 'app-order-now',
  templateUrl: './order-now.component.html',
  styleUrls: ['./order-now.component.scss'],
})
export class OrderNowComponent {
  constructor(private authService: AuthService) {}
  links = [
    { name: 'Menu', route: 'menu', disabled: false },
    { name: 'Orders', route: 'list', disabled: false },
    { name: 'Settings', route: 'settings', disabled: false },
  ];

  public onLogoutClick() {
    this.authService.logout();
  }
}
