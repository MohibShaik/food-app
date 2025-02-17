import { AfterViewInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('header');
    if (header) {
      if (window.scrollY > 50) {
        // Adjust scroll position threshold as needed
        header.classList.add('lafka-sticksy');
      } else {
        header.classList.remove('lafka-sticksy');
      }
    }
  }

  links = [
    { name: 'Home', route: '/home', disabled: false },
    { name: 'Menu', route: '/menu', disabled: false },
    { name: 'About', route: '/about', disabled: false },
    { name: 'Contact', route: '/contact', disabled: false },
  ];

  isCollapsed = true; // For toggling the navbar on smaller screens

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
