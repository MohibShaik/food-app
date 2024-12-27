import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  links = [
    { name: 'Dashboard', route: '/admin/dashboard', disabled: false },
    { name: 'Menu', route: '/admin/menu', disabled: false },
    { name: 'Orders', route: '/admin/orders', disabled: false },
    { name: 'Customers', route: '/admin/customers', disabled: false },
    { name: 'Analytics', route: '/admin/analytics', disabled: false },
    { name: 'Settings', route: '/admin/settings', disabled: false },
  ];
}
