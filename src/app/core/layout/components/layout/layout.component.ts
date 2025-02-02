import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  links = [
    { name: 'Home', route: '/home', disabled: false },
    { name: 'Menu', route: '/menu', disabled: false },
    { name: 'About', route: '/about', disabled: false },
    { name: 'Contact', route: '/contact', disabled: false }
  ];
}
