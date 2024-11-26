import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('mainHeader');
    if (header) {
      if (window.scrollY > 50) {
        // Adjust scroll position threshold as needed
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  }
}
