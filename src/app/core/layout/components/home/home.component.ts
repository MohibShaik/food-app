import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Carousel } from 'bootstrap';

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

  @ViewChild('carouselExampleSlidesOnly')
  carouselElement!: ElementRef<HTMLElement>;

  carouselRef!: Carousel;

  ngAfterViewInit() {
    this.carouselRef = new Carousel(this.carouselElement.nativeElement, {
      interval: 2000,
    });

    // this.startSlide()
  }

  startSlide() {
    this.carouselRef.cycle();
  }

  stopSlide() {
    this.carouselRef.pause();
  }

  nextSlide() {
    this.carouselRef.next();
  }

  prevSlide() {
    this.carouselRef.prev();
  }
}
