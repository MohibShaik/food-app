import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AboutComponent } from './components/about/about.component';
import { CateringComponent } from './components/catering/catering.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { CoreModule } from '../core.module';

@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    LandingPageComponent,
    HomeComponent,
    MenuComponent,
    CateringComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule, CoreModule],
  exports: [LayoutComponent, FooterComponent],
})
export class LayoutModule {}
